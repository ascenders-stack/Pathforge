import os
import logging
from typing import Dict, List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # Enables serving frontend files
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from google import genai
from google.genai import types

# 1. Initialize Security Environment and Logging
load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("PathForgeBackend")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.critical("CRITICAL CONFIG ERROR: GEMINI_API_KEY is missing from environment variables.")
    raise RuntimeError("GEMINI_API_KEY environment variable is required.")

# 2. Spin up FastAPI Application Instance
app = FastAPI(
    title="Pathforge Navigator API Engine",
    description="Secure, high-performance middleware powering the AI student roadmap generator.",
    version="1.0.0"
)

# 3. Defeat the CORS Security Wall
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Initialize Modern Google GenAI Client
try:
    ai_client = genai.Client(api_key=GEMINI_API_KEY)
    logger.info("Secure communication channel established with Gemini API.")
except Exception as e:
    logger.critical(f"Failed to initialize Gemini Client: {str(e)}")
    raise e


# ==========================================
# PYDANTIC DATA SCHEMAS
# ==========================================

class ContentBlock(BaseModel):
    title: str = Field(description="The formal title of the recommendation.")
    short: str = Field(description="A single, impactful, high-level introductory sentence summarizing this recommendation.")
    details: str = Field(description="A concise but thorough paragraph detailing specific technologies, concepts, tools, and platforms to utilize.")

class GraphPoint(BaseModel):
    week: str = Field(enum=["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"], description="Chronological milestone step identifier.")
    milestone: str = Field(description="A very short 2-3 word label representing the primary goal of this week.")

# Schema for Gemini structured JSON generation
class RoadmapResponse(BaseModel):
    tier: str = Field(enum=["Beginner", "Intermediate", "Advanced"], description="The student's classified experience bracket.")
    courses: ContentBlock = Field(description="Tailored academic resource recommendations.")
    skills: ContentBlock = Field(description="Core industry skills requiring rigorous focus.")
    roadmap: ContentBlock = Field(description="The structural timeline strategy to execute.")
    projects: ContentBlock = Field(description="A practical project blueprint optimized for their portfolio.")
    graphPoints: List[GraphPoint] = Field(description="A chronological sequence of exactly 5 milestones for the roadmap visual graph.")

# Diagnostic quiz payload from frontend
class QuizSubmission(BaseModel):
    name: str = Field(..., examples=["Ananya Sharma"])
    year: str = Field(..., examples=["Btech 3"])
    stream: str = Field(..., examples=["Computer science/IT"])
    interest: str = Field(..., examples=["Software & Intelligent Systems (Apps, AI, Cybersecurity)"])
    answers: Dict[str, str] = Field(
        ..., 
        description="A key-value dictionary of the 8 quiz diagnostic questions and the user's chosen options.",
        examples=[{"Q1": "A", "Q2": "D", "Q3": "B", "Q4": "D", "Q5": "B", "Q6": "C", "Q7": "C", "Q8": "A"}]
    )


# ==========================================
# API ENDPOINT ROUTING
# ==========================================

@app.get("/health", status_code=status.HTTP_200_OK)
def system_health_check():
    """Lightweight endpoint for AWS health check cycles."""
    return {"status": "healthy", "engine": "FastAPI (Python)"}

@app.post("/api/generate-roadmap", response_model=RoadmapResponse)
async def generate_student_roadmap(payload: QuizSubmission):
    """
    Primary API Pipeline: Receives student telemetry, engineers the prompt, 
    requests structured content from Gemini, and returns clean JSON.
    """
    logger.info(f"Processing new roadmap request for student: {payload.name} ({payload.stream})")
    
    system_instruction = (
        "You are an elite, world-class Academic Advisor and Technical Career Planner. "
        "Your task is to review a student's profile and diagnostic quiz results, classifiying their skill tier, "
        "and curating a highly personalized learning path.\n\n"
        "Ensure recommendations are direct, practical, highly customized to their chosen engineering stream, "
        "and immediately applicable for building resume-worthy portfolios.\n"
        "Avoid vague generalities. Suggest actual modern technologies and tools.\n"
        "You must output structured data matching the requested schema fields exactly."
    )

    user_telemetry_prompt = f"""
    --- Student Demographic Profile ---
    Name: {payload.name}
    Academic Year Level: {payload.year}
    Engineering Stream: {payload.stream}
    Primary Area of Interest: {payload.interest}

    --- Diagnostic Quiz Responses ---
    Q1 (What excites most about engineering?): {payload.answers.get('Q1', 'N/A')}
    Q2 (Preferred build and experimentation style?): {payload.answers.get('Q2', 'N/A')}
    Q3 (Handling of open-ended tasks?): {payload.answers.get('Q3', 'N/A')}
    Q4 (View on the core technology of choice?): {payload.answers.get('Q4', 'N/A')}
    Q5 (Actual project building experience?): {payload.answers.get('Q5', 'N/A')}
    Q6 (Practical technical execution comfort level?): {payload.answers.get('Q6', 'N/A')}
    Q7 (Activity frequency of skill building?): {payload.answers.get('Q7', 'N/A')}
    Q8 (Primary goal right now?): {payload.answers.get('Q8', 'N/A')}

    Analyze these indicators carefully. Synthesize the results to determine if they are a "Beginner", "Intermediate", or "Advanced" student.
    Construct the recommended courses, target skills to master, sequential timeline roadmap details, and a modular project blueprint.
    """

    try:
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=user_telemetry_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=RoadmapResponse,
                temperature=0.3,
            )
        )

        raw_text = response.text
        logger.info(f"Successfully generated structured roadmap response for {payload.name}.")
        return RoadmapResponse.model_validate_json(raw_text)

    except Exception as err:
        logger.error(f"Failed to compile AI roadmap guidance: {str(err)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI compilation pipeline failure: {str(err)}"
        )


# ==========================================
# STATIC FILE SERVING (Serves index.html, CSS, JS)
# ==========================================

# Handlers all HTML/CSS/JS requests for AWS deployment automatically
app.mount("/", StaticFiles(directory=".", html=True), name="static")


# ==========================================
# DEVELOPMENT SERVER LAUNCHER
# ==========================================

if __name__ == "__main__":
    import uvicorn
    logger.info("Initializing Uvicorn execution loop...")
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)