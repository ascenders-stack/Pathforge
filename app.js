// --- 1. RESTORED ORIGINAL 8 COGNITIVE QUESTIONS ---
const quizData = [
    {
        question: "What excites you most about engineering?",
        options: [
            "Designing the final form, layout, and human experience of a product",
            "Building the core infrastructure, structural foundations, and underlying systems",
            "Analyzing complex data, running simulations, and finding hidden patterns",
            "Working directly with physical hardware, circuits, materials, and machinery",
            "Stress-testing materials, hunting for system vulnerabilities, or debugging logic"
        ]
    },
    {
        question: "How do you prefer to build and experiment?",
        options: [
            "Visually — I want to see immediate 2D/3D renders, UI, or visual models",
            "Structurally — I like organizing blueprints, system architectures, and workflows",
            "Mathematically — I like applying formulas, algorithms, and statistical logic",
            "Physically — I like hands-on prototyping with materials, wiring, or lab tools",
            "Analytically — I like running diagnostics, inspecting logs, and tracing errors"
        ]
    },
    {
        question: "How do you handle open-ended tasks?",
        options: [
            "I want clear, step-by-step instructions",
            "I want a clear goal but freedom in how I get there",
            "I like researching and experimenting in a lab or IDE to find a solution",
            "I like reverse-engineering things (teardowns, code reviews) to see how they work",
            "I like being handed a broken system or structure to fix and optimize"
        ]
    },
    {
        question: "How do you view the core technology you work with?",
        options: [
            "A medium for creative design and human interaction",
            "An infrastructure for moving energy, data, or resources safely",
            "A high-powered engine for running simulations and complex math",
            "An intelligent system capable of making autonomous decisions",
            "A bridge to control physical forces, materials, and machinery"
        ]
    },
    {
        question: "What is your actual experience with project building?",
        options: [
            "None — I am starting completely from scratch",
            "1–2 minor scripts, school lab practicals, or basic CAD models",
            "1–2 independent multi-part projects",
            "3+ complex projects using external datasets, microcontrollers, or advanced simulations",
            "Production-grade apps, published research, or real-world deployed physical models"
        ]
    },
    {
        question: "What is your comfort level with technical execution?",
        options: [
            "I have absolutely no practical experience yet",
            "I know the absolute basics but struggle to combine them into a working project",
            "Comfortable with standard tools, writing basic logic, or building modular components",
            "Regularly use advanced modeling software, microcontrollers, APIs, or complex architectures",
            "I design custom architectures, custom algorithms, or advanced system pipelines"
        ]
    },
    {
        question: "How often do you actively build or practice technical skills?",
        options: [
            "I'm completely new to this",
            "Only when required for school or exams",
            "A few times a month, out of curiosity or for hobby projects",
            "Multiple times a week — it's part of my routine",
            "I maintain long-term projects that require ongoing work and updates"
        ]
    },
    {
        question: "What's your main goal right now?",
        options: [
            "Build a strong portfolio of projects for my resume",
            "Do well academically — clear the syllabus, labs, and exams",
            "Add cross-disciplinary tech/AI skills to my core degree",
            "Learn to prototype fast and launch a startup idea",
            "Deeply understand the fundamentals of how things actually work under the hood"
        ]
    }
];

// --- 2. STATE LOGIC TRACKERS ---
let currentQuestionIndex = 0;
const userAnswers = [];
const letters = ['A', 'B', 'C', 'D', 'E'];

const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const questionCounter = document.getElementById('questionCounter');
const leftBottomCounter = document.getElementById('leftBottomCounter');
const progressFill = document.getElementById('progressFill');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsIndicator = document.getElementById('dotsIndicator');

function loadQuestion() {
    const currentQ = quizData[currentQuestionIndex];
    questionText.innerText = currentQ.question;
    questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    const answeredCount = userAnswers.filter(x => x !== undefined).length;
    leftBottomCounter.innerText = `${answeredCount}/${quizData.length} answered`;
    progressFill.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    
    backBtn.style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
    nextBtn.innerText = currentQuestionIndex === quizData.length - 1 ? 'Generate Roadmap ✨' : 'Next \u2192';
    nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;

    optionsContainer.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.className = `option-btn ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}`;
        btn.innerHTML = `<div class="option-letter">${letters[index]}</div><div>${option}</div>`;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    renderDots();
}

function selectOption(index) {
    userAnswers[currentQuestionIndex] = index;
    loadQuestion(); 
}

function renderDots() {
    dotsIndicator.innerHTML = '';
    for (let i = 0; i < quizData.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot-item';
        if (i === currentQuestionIndex) {
            dot.classList.add('active');
        } else if (userAnswers[i] !== undefined) {
            dot.classList.add('completed');
        }
        dotsIndicator.appendChild(dot);
    }
}

backBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        startLoadingSequence();
    }
});

loadQuestion();

// --- 3. COLOR-CHANGING COFFEE BREWING ENGINE ---
function startLoadingSequence() {
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'flex';

    const loadingText = document.getElementById('loadingText');
    const liquidLevelGroup = document.getElementById('liquidLevelGroup');
    const liquidFill = document.getElementById('liquidFill');
    const spoon = document.getElementById('stirringSpoon');
    
    localStorage.setItem('pathforgeAnswers', JSON.stringify(userAnswers));

    // Initial setup: 1/4 filled with boiling blue water
    liquidLevelGroup.style.transform = "translateY(38px)";
    liquidFill.style.fill = "#38BDF8"; 

    const timeline = [
        { 
            time: 10000, 
            text: "🫘 Grinding coffee beans... Analyzing your stream and interest profiles", 
            translateY: "28px", 
            fill: "#3b1a18", // Ground Dark Espresso Brown
            spoon: false 
        },
        { 
            time: 20000, 
            text: "💧 Filtering... Curating high-impact skills matching your career goal", 
            translateY: "18px", 
            fill: "#29180c" , // Traditional Dark Filtered Coffee
            spoon: false
        },
        { 
            time: 30000, 
            text: "🥛 Frothing... Selecting beginner-friendly, resume-worthy project blueprints", 
            translateY: "8px", 
            fill: "#bf9178", // Shifting to light brownish/latte tone
            spoon: false
        },
        { 
            time: 40000, 
            text: "✨ Stirring the blend... Translating roadmap data into chronological milestones", 
            translateY: "2px", 
            fill: "#6a331c", // Beautifully mixed blend
            spoon: true // Displays the spoon model
        },
        { 
            time: 50000, 
            text: "🍽️ Serving hot! Your personalized path is ready.", 
            translateY: "-6px", // Fully filled up 
            fill: "#81460a", // Rich Creamy Gold finish
            spoon: false
        }
    ];

    timeline.forEach(step => {
        setTimeout(() => {
            // Text transition
            loadingText.style.animation = 'none';
            loadingText.offsetHeight; 
            loadingText.style.animation = 'fadeText 0.8s ease-in-out';
            loadingText.innerText = step.text;

            // Liquid state modifications
            liquidLevelGroup.style.transform = `translateY(${step.translateY})`;
            liquidFill.style.fill = step.fill;
            
            // Spoon management
            if (step.spoon) {
                spoon.style.display = 'block';
                spoon.style.animation = 'spoonStir 1s infinite linear';
            } else {
                spoon.style.display = 'none';
                spoon.style.animation = 'none';
            }
        }, step.time);
    });

    // Final redirection to the dashboard page at the 60 second mark
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 60000);
}