document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. RETRIEVE PERSONALIZED USER DATA
    // ==========================================
    const rawUser = localStorage.getItem("pathforgeUser");
    const rawAnswers = localStorage.getItem("pathforgeAnswers");

    if (!rawUser) { window.location.href = "index.html"; return; }

    const user = JSON.parse(rawUser);
    const answers = rawAnswers ? JSON.parse(rawAnswers) : [0,0,0,0,0,0,0,0];

    const heroName = document.getElementById("heroName");
    if (heroName) heroName.innerText = user.name || "Student";
    
    const navName = document.getElementById("navName");
    if (navName) navName.innerText = user.name || "Student";
    
    const navAvatar = document.getElementById("navAvatar");
    if (navAvatar && user.name) navAvatar.innerText = user.name.charAt(0).toUpperCase();

    // ==========================================
    // 2. SCORE ANALYTICAL CALCULATOR CORE
    // ==========================================
    let logicScore = 42, archScore = 38, practicalScore = 32;
    answers.forEach(ans => {
        if (ans === 2 || ans === 4) logicScore += 7;
        if (ans === 1 || ans === 3) archScore += 7;
        if (ans === 0 || ans === 3) practicalScore += 7;
    });

    logicScore = Math.min(logicScore, 95);
    archScore = Math.min(archScore, 95);
    practicalScore = Math.min(practicalScore, 95);

    setTimeout(() => {
        const barLogic = document.getElementById("barLogic");
        const barArch = document.getElementById("barArch");
        const barPractical = document.getElementById("barPractical");

        if (barLogic) barLogic.style.width = `${logicScore}%`;
        if (barArch) barArch.style.width = `${archScore}%`;
        if (barPractical) barPractical.style.width = `${practicalScore}%`;
        
        const skillLogicVal = document.getElementById("skillLogicVal");
        const skillArchVal = document.getElementById("skillArchVal");
        const skillPracticalVal = document.getElementById("skillPracticalVal");

        if (skillLogicVal) skillLogicVal.innerText = `${logicScore}%`;
        if (skillArchVal) skillArchVal.innerText = `${archScore}%`;
        if (skillPracticalVal) skillPracticalVal.innerText = `${practicalScore}%`;
    }, 150);

    // ==========================================
    // 3. DYNAMIC "A READ ON YOU" ENGINE
    // ==========================================
    const readBoxElement = document.getElementById("aiPersonalRead");
    let highestScore = Math.max(logicScore, archScore, practicalScore);
    let dynamicReadText = "";

    if (highestScore === logicScore) {
        dynamicReadText = "You have a sharp, logical mind. Your quiz answers show that you naturally focus on solving puzzles and figuring out how things work under the hood. Your biggest strength will be writing clean, efficient code that solves tricky problems.";
    } else if (highestScore === archScore) {
        dynamicReadText = "You are a big-picture thinker. Your quiz answers show that you like to understand how all the different parts of a project connect together before you start building. You have the natural mindset of a system designer.";
    } else {
        dynamicReadText = "You are a hands-on builder. Your quiz answers show that you learn best by actually making things rather than just reading theory. You want to see your projects working on the screen or in your hands as quickly as possible.";
    }
    if (readBoxElement) readBoxElement.innerText = dynamicReadText;

    // ==========================================
    // 4. THE MASSIVELY EXPANDED DATABASE
    // Hierarchy: Year > Interest > Stream
    // ==========================================
    
    const db = {
        courses: {
            "1st Year": {
                "CSE": [
                    { title: "Intro to Python Programming", desc: "Master basic loops, variables, and data structures.", weeks: "3 Weeks", diff: "Beginner" },
                    { title: "HTML & CSS Web Design", desc: "Build and style your first static webpages.", weeks: "4 Weeks", diff: "Beginner" },
                    { title: "C++ Fundamentals", desc: "Learn memory management and object-oriented basics.", weeks: "5 Weeks", diff: "Beginner" },
                    { title: "Command Line & Linux Basics", desc: "Navigate your computer without a mouse like a pro.", weeks: "2 Weeks", diff: "Beginner" },
                    { title: "Discrete Mathematics for CS", desc: "The core math behind algorithms and logic gates.", weeks: "4 Weeks", diff: "Beginner" }
                ],
                "ELECTRICAL": [
                    { title: "Intro to C Programming", desc: "The core language for physical hardware and microchips.", weeks: "4 Weeks", diff: "Beginner" },
                    { title: "Basic Logic Design", desc: "Understand how binary signals move through circuits.", weeks: "3 Weeks", diff: "Beginner" },
                    { title: "Physics of Electronics", desc: "Understand voltage, current, and resistance.", weeks: "4 Weeks", diff: "Beginner" },
                    { title: "MATLAB Basics", desc: "Use software to solve complex engineering math.", weeks: "3 Weeks", diff: "Beginner" },
                    { title: "Circuit Theory 101", desc: "Analyzing nodes, meshes, and basic electronic components.", weeks: "5 Weeks", diff: "Beginner" }
                ],
                "DEFAULT": [
                    { title: "Computing Fundamentals", desc: "A friendly introduction to how computers process information.", weeks: "3 Weeks", diff: "Beginner" },
                    { title: "Problem Solving Logic", desc: "Breaking down complex real-world problems into steps.", weeks: "4 Weeks", diff: "Beginner" },
                    { title: "Digital Literacy & Ethics", desc: "Understanding the impact of technology on society.", weeks: "3 Weeks", diff: "Beginner" },
                    { title: "Intro to Data Analysis", desc: "Using basic tools to find patterns in information.", weeks: "4 Weeks", diff: "Beginner" },
                    { title: "Technical Communication", desc: "Learning how to write clear, professional emails and docs.", weeks: "2 Weeks", diff: "Beginner" }
                ]
            },
            "2nd Year": {
                "CSE": [
                    { title: "Data Structures & Algorithms", desc: "Learn to store and search data efficiently.", weeks: "6 Weeks", diff: "Intermediate" },
                    { title: "Interactive JavaScript", desc: "Make your static websites interactive with the DOM.", weeks: "4 Weeks", diff: "Intermediate" },
                    { title: "Java & Object-Oriented Design", desc: "Build large-scale, modular software systems.", weeks: "5 Weeks", diff: "Intermediate" },
                    { title: "Relational Databases (SQL)", desc: "Store, query, and manage user data securely.", weeks: "4 Weeks", diff: "Intermediate" },
                    { title: "Computer Networks Basics", desc: "How packets travel across the internet.", weeks: "4 Weeks", diff: "Intermediate" }
                ],
                "ELECTRICAL": [
                    { title: "Microcontroller Basics", desc: "Upload code to an Arduino to control sensors.", weeks: "4 Weeks", diff: "Intermediate" },
                    { title: "Signal Processing Fundamentals", desc: "How software reads physical data like sound.", weeks: "5 Weeks", diff: "Intermediate" },
                    { title: "Analog Circuit Design", desc: "Working with amplifiers, filters, and real-world signals.", weeks: "5 Weeks", diff: "Intermediate" },
                    { title: "Digital Electronics", desc: "Building complex logic gates and memory registers.", weeks: "4 Weeks", diff: "Intermediate" },
                    { title: "Electromagnetic Fields", desc: "Understanding the physics of wireless transmission.", weeks: "6 Weeks", diff: "Intermediate" }
                ],
                "DEFAULT": [
                    { title: "Intermediate System Logic", desc: "Connecting distinct software models safely.", weeks: "4 Weeks", diff: "Intermediate" },
                    { title: "Project Management Basics", desc: "Organizing timelines, resources, and team goals.", weeks: "5 Weeks", diff: "Intermediate" },
                    { title: "Data Privacy Fundamentals", desc: "Learning how to protect user information online.", weeks: "3 Weeks", diff: "Intermediate" },
                    { title: "Intro to UI/UX Design", desc: "Understanding how humans interact with technology.", weeks: "4 Weeks", diff: "Intermediate" },
                    { title: "Agile Methodologies", desc: "Working in dynamic, fast-paced team environments.", weeks: "3 Weeks", diff: "Intermediate" }
                ]
            },
            "3rd Year": {
                "CSE": [
                    { title: "Backend Server Architecture (Node.js)", desc: "Build the engines that power web applications.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Operating System Concepts", desc: "Learn how kernels, memory, and CPU scheduling work.", weeks: "6 Weeks", diff: "Advanced" },
                    { title: "Introduction to Artificial Intelligence", desc: "Search algorithms, heuristics, and basic ML.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Cloud Foundations (AWS/GCP)", desc: "Deploying applications to global server farms.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "Software Engineering & Agile", desc: "Working in teams using industry-standard sprints.", weeks: "3 Weeks", diff: "Advanced" }
                ],
                "ELECTRICAL": [
                    { title: "Embedded Systems Integration", desc: "Writing complex C code for custom hardware boards.", weeks: "6 Weeks", diff: "Advanced" },
                    { title: "Control Systems Theory", desc: "Automating physical machines using feedback loops.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Power Electronics", desc: "Managing high-voltage conversions and power grids.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Communication Systems", desc: "AM/FM, digital modulation, and data transmission.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "VLSI Design Basics", desc: "Designing actual silicon chips at the transistor level.", weeks: "6 Weeks", diff: "Advanced" }
                ],
                "DEFAULT": [
                    { title: "Systems Fundamentals", desc: "A deeper look into how technological projects are planned.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "Cross-Platform Troubleshooting", desc: "Finding solutions to complex bugs across systems.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Automation Basics", desc: "Scripting repetitive tasks to save time and resources.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "Product Lifecycle Management", desc: "Taking an idea from concept to final retirement.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Advanced Research Methods", desc: "Gathering and synthesizing deep technical data.", weeks: "4 Weeks", diff: "Advanced" }
                ]
            },
            "4th Year": {
                "CSE": [
                    { title: "Machine Learning & Deep Learning", desc: "Building neural networks and training models.", weeks: "6 Weeks", diff: "Advanced" },
                    { title: "Cybersecurity & Cryptography", desc: "Protecting systems from attacks and encrypting data.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Distributed Systems", desc: "Building apps that run on thousands of computers at once.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Advanced System Design", desc: "Architecting systems like Netflix or Uber.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "Capstone Project Launch", desc: "Planning, building, and deploying your final year project.", weeks: "8 Weeks", diff: "Advanced" }
                ],
                "ELECTRICAL": [
                    { title: "IoT Network Protocols", desc: "How hardware devices talk to servers securely via WiFi/Bluetooth.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "Smart Grid Technologies", desc: "Modernizing electrical grids with software and data.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Robotics & Kinematics", desc: "Programming physical robot movement and spatial awareness.", weeks: "6 Weeks", diff: "Advanced" },
                    { title: "Wireless Communications", desc: "5G, RF engineering, and advanced antenna design.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Hardware Capstone Deployment", desc: "Building a production-ready physical prototype.", weeks: "8 Weeks", diff: "Advanced" }
                ],
                "DEFAULT": [
                    { title: "Capstone Deployment", desc: "Getting your final projects off your computer and onto the live internet.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "Tech Leadership & Strategy", desc: "Managing teams and making high-level architectural choices.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Industry Standards & Compliance", desc: "Ensuring your products meet legal and safety requirements.", weeks: "4 Weeks", diff: "Advanced" },
                    { title: "Scalable Architecture Overview", desc: "Designing solutions that can handle millions of users.", weeks: "5 Weeks", diff: "Advanced" },
                    { title: "Professional Portfolio Prep", desc: "Polishing your work and preparing for technical interviews.", weeks: "4 Weeks", diff: "Advanced" }
                ]
            }
        },

        skills: {
            "1st Year": {
                "software": [
                    { title: "Basic Error Reading", desc: "Learning not to panic when the compiler throws red text." },
                    { title: "Folder Organization", desc: "Keeping your workspace clean so you never lose files." },
                    { title: "IDE Navigation", desc: "Learning the shortcuts for VS Code or PyCharm." },
                    { title: "Touch Typing", desc: "Increasing your coding speed and muscle memory." },
                    { title: "Markdown Documentation", desc: "Writing clear README files for your projects." },
                    { title: "Effective Googling", desc: "Learning exactly what to type to find the right StackOverflow answer." },
                    { title: "Variable Naming", desc: "Writing readable code that makes sense to others." },
                    { title: "Basic Git Commits", desc: "Saving versions of your code locally." }
                ],
                "hardware": [
                    { title: "Component Safety", desc: "Understanding power flow to avoid burning out sensors." },
                    { title: "Multimeter Basics", desc: "Testing continuity, voltage, and resistance on a board." },
                    { title: "Wire Stripping & Splicing", desc: "Making clean, secure physical connections." },
                    { title: "Breadboard Layout", desc: "Keeping prototype wiring neat and traceable." },
                    { title: "Schematic Reading", desc: "Translating a drawing into a physical circuit." },
                    { title: "Basic Soldering", desc: "Fusing components safely onto a perfboard." },
                    { title: "Lab Notebooking", desc: "Documenting physical experiments and anomalies." },
                    { title: "Unit Conversions", desc: "Switching quickly between milli, micro, and nano units." }
                ],
                "default": [
                    { title: "Basic Troubleshooting", desc: "Learning how to Google your tech problems effectively." },
                    { title: "Time Management", desc: "Balancing multiple assignments and learning goals." },
                    { title: "Active Listening", desc: "Absorbing key details during lectures and team meetings." },
                    { title: "Note-taking Strategies", desc: "Documenting processes so you don't have to relearn them." },
                    { title: "Basic Searching", desc: "Using advanced search operators to find specific documentation." }
                ]
            },
            "2nd Year": {
                "software": [
                    { title: "Git Branching", desc: "Working on new features without breaking the main code." },
                    { title: "DOM Manipulation", desc: "Making webpages react to user clicks dynamically." },
                    { title: "API Fetching", desc: "Pulling data from external sources into your app." },
                    { title: "Regex Basics", desc: "Searching for complex text patterns in strings." },
                    { title: "JSON Parsing", desc: "Reading and formatting standard web data." },
                    { title: "Code Linting", desc: "Using tools to automatically format your messy code." },
                    { title: "Unit Testing", desc: "Writing small scripts to test if your functions work." },
                    { title: "Agile Sprints", desc: "Breaking massive projects into 1-week goals." }
                ],
                "hardware": [
                    { title: "Datasheet Navigation", desc: "Finding the exact pinout specs in a 50-page manual." },
                    { title: "Oscilloscope Basics", desc: "Viewing electrical signals over time to find noise." },
                    { title: "Surface Mount Soldering", desc: "Working with tiny, modern PCB components." },
                    { title: "PCB Design (EAGLE/KiCad)", desc: "Drawing custom circuit boards on the computer." },
                    { title: "Interrupt Handling", desc: "Writing C code that responds instantly to physical buttons." },
                    { title: "I2C/SPI Communication", desc: "Making two microchips talk to each other." },
                    { title: "Power Budgeting", desc: "Calculating exactly how much battery your project needs." },
                    { title: "Heat Sinking", desc: "Managing thermal loads so components don't melt." }
                ],
                "default": [
                    { title: "Process Mapping", desc: "Drawing out how a project should work before you build it." },
                    { title: "Critical Thinking", desc: "Evaluating multiple solutions before writing any code." },
                    { title: "Team Collaboration", desc: "Using tools like Trello or Jira to coordinate work." },
                    { title: "Technical Reading", desc: "Skimming thick documentation to find the one API you need." },
                    { title: "Adaptive Learning", desc: "Quickly picking up new tools as project scopes change." }
                ]
            },
            "3rd Year": {
                "software": [
                    { title: "API Creation", desc: "Building your own endpoints for others to use." },
                    { title: "Docker Basics", desc: "Packaging your app so it runs identically everywhere." },
                    { title: "Database Indexing", desc: "Making slow SQL queries run 10x faster." },
                    { title: "Auth Protocols (JWT/OAuth)", desc: "Creating secure login systems." },
                    { title: "Asynchronous Logic", desc: "Managing multiple events happening at once." },
                    { title: "WebSockets", desc: "Building real-time features like chat rooms." },
                    { title: "CI/CD Pipelines", desc: "Automating your testing and deployment process." },
                    { title: "Peer Code Review", desc: "Reading and critiquing other people's logic." }
                ],
                "hardware": [
                    { title: "Real-Time OS (RTOS)", desc: "Running multiple tasks reliably on a microcontroller." },
                    { title: "Signal Filtering", desc: "Removing hardware noise from sensor data." },
                    { title: "Impedance Matching", desc: "Ensuring high-frequency signals don't reflect back." },
                    { title: "Motor Tuning (PID)", desc: "Writing math that makes a robot move smoothly." },
                    { title: "Low-Power States", desc: "Putting chips to sleep to save battery." },
                    { title: "Logic Analyzers", desc: "Debugging digital signals step-by-step." },
                    { title: "Custom PCB Ordering", desc: "Generating Gerber files and ordering from fabs." },
                    { title: "EMI Reduction", desc: "Stopping your circuit from interfering with radios." }
                ],
                "default": [
                    { title: "Analytical Tracing", desc: "Tracking down complex bugs across multiple files." },
                    { title: "Conflict Resolution", desc: "Managing disagreements within a technical team." },
                    { title: "Public Speaking", desc: "Presenting your technical projects to non-technical audiences." },
                    { title: "Advanced Debugging", desc: "Using specialized tools to find memory leaks and crashes." },
                    { title: "Cross-functional Comm", desc: "Talking effectively to designers, managers, and clients." }
                ]
            },
            "4th Year": {
                "software": [
                    { title: "Microservice Architecture", desc: "Breaking one huge app into smaller, independent apps." },
                    { title: "Kubernetes (K8s)", desc: "Managing thousands of Docker containers." },
                    { title: "Threat Modeling", desc: "Thinking like a hacker to secure your app." },
                    { title: "Load Balancing", desc: "Distributing traffic so your server doesn't crash." },
                    { title: "Performance Profiling", desc: "Finding exactly which line of code is slowing the app down." },
                    { title: "Caching Strategies (Redis)", desc: "Storing frequent data in memory for instant access." },
                    { title: "Technical Writing", desc: "Writing documentation good enough for external users." },
                    { title: "Mentoring", desc: "Explaining complex concepts to junior developers." }
                ],
                "hardware": [
                    { title: "Hardware Debugging (JTAG)", desc: "Stepping through C code directly on the silicon." },
                    { title: "Antenna Tuning", desc: "Optimizing range for IoT wireless modules." },
                    { title: "Compliance Testing", desc: "Understanding FCC regulations for electronics." },
                    { title: "Failure Mode Analysis", desc: "Predicting exactly how and when a device will break." },
                    { title: "BGA Reworking", desc: "Replacing complex chips using hot air stations." },
                    { title: "Firmware OTA Updates", desc: "Updating hardware code over the internet securely." },
                    { title: "Supply Chain Sourcing", desc: "Finding reliable manufacturers for bulk components." },
                    { title: "DFM (Design for Mfg)", desc: "Designing prototypes that can actually be mass-produced." }
                ],
                "default": [
                    { title: "Code Refactoring", desc: "Cleaning up messy code before you submit your final project." },
                    { title: "Project Estimation", desc: "Accurately predicting how long a feature will take to build." },
                    { title: "Mentorship", desc: "Guiding underclassmen and juniors through their technical blocks." },
                    { title: "Strategic Planning", desc: "Aligning your technical decisions with business goals." },
                    { title: "Negotiation Basics", desc: "Advocating for resources, time, or salary in a professional setting." }
                ]
            }
        },

        projects: {
            "CSE": {
                "software": {
                    "1st Year": [
                        { title: "Personal Portfolio Webpage", desc: "A static HTML/CSS resume website.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "CLI Number Guesser", desc: "A Python game using loops and random numbers.", weeks: "1 Week", diff: "Beginner" },
                        { title: "Markdown Previewer", desc: "Converts text syntax into formatted HTML.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Basic Calculator App", desc: "A JS web calculator with standard operations.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Local To-Do List", desc: "Tasks saved to local browser storage.", weeks: "3 Weeks", diff: "Beginner" },
                        { title: "Terminal Password Generator", desc: "Script that outputs secure randomized strings.", weeks: "1 Week", diff: "Beginner" },
                        { title: "ASCII Art Generator", desc: "Turns text inputs into blocky ASCII art.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Study Flashcard UI", desc: "A visual deck of flippable HTML/CSS cards.", weeks: "3 Weeks", diff: "Beginner" },
                        { title: "Pomodoro Timer", desc: "A web clock that counts down 25-minute intervals.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Basic Web Scraper", desc: "A Python script that extracts text from a URL.", weeks: "3 Weeks", diff: "Beginner" }
                    ],
                    "2nd Year": [
                        { title: "Live Weather Dashboard", desc: "Fetches and displays data from a public weather API.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Movie Search Engine", desc: "React/JS app querying the OMDB movie database.", weeks: "4 Weeks", diff: "Intermediate" },
                        { title: "Expense Tracker", desc: "App with charts summarizing monthly spending.", weeks: "4 Weeks", diff: "Intermediate" },
                        { title: "Sorting Visualizer", desc: "Webpage animating how Bubble/Merge sort works.", weeks: "5 Weeks", diff: "Intermediate" },
                        { title: "Simple Blog Platform", desc: "Create, edit, and delete text posts using a basic DB.", weeks: "5 Weeks", diff: "Intermediate" },
                        { title: "Regex Validator Tool", desc: "UI to test regular expressions against sample text.", weeks: "2 Weeks", diff: "Intermediate" },
                        { title: "Typing Speed Tester", desc: "Calculates WPM and accuracy using Javascript events.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Memory Match Game", desc: "A grid-based JS logic puzzle.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Crypto Price Ticker", desc: "Pulls live JSON data for Bitcoin/Ethereum.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Basic REST API", desc: "A Node/Express server serving custom JSON data.", weeks: "4 Weeks", diff: "Intermediate" }
                    ],
                    "3rd Year": [
                        { title: "Full-Stack Task Manager", desc: "React + Node + MongoDB app with user login.", weeks: "6 Weeks", diff: "Advanced" },
                        { title: "Real-Time Chat Room", desc: "Multiplayer chat using WebSockets/Socket.io.", weeks: "5 Weeks", diff: "Advanced" },
                        { title: "E-Commerce Cart System", desc: "Product database with secure Stripe payment integration.", weeks: "7 Weeks", diff: "Advanced" },
                        { title: "Dockerized Web Scraper", desc: "A data pipeline running inside a Docker container.", weeks: "4 Weeks", diff: "Advanced" },
                        { title: "Automated Twitter Bot", desc: "A Python script that posts scheduled updates.", weeks: "3 Weeks", diff: "Advanced" },
                        { title: "JWT Auth Microservice", desc: "A standalone login server issuing secure tokens.", weeks: "5 Weeks", diff: "Advanced" },
                        { title: "Stock Portfolio Tracker", desc: "Full-stack app tracking user investments over time.", weeks: "6 Weeks", diff: "Advanced" },
                        { title: "Custom Markdown Blog", desc: "A fast, static-generated blog reading MD files.", weeks: "4 Weeks", diff: "Advanced" },
                        { title: "Pathfinding Visualizer", desc: "React app demonstrating Dijkstra/A* algorithms.", weeks: "5 Weeks", diff: "Advanced" },
                        { title: "CI/CD Deployment Pipeline", desc: "GitHub Actions setup auto-deploying to Heroku/AWS.", weeks: "4 Weeks", diff: "Advanced" }
                    ],
                    "4th Year": [
                        { title: "Scalable Cloud Video Transcoder", desc: "AWS Lambda function processing uploaded video files.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Machine Learning Fraud Detector", desc: "Python model trained on CSV data to flag anomalies.", weeks: "7 Weeks", diff: "Expert" },
                        { title: "Distributed Key-Value Store", desc: "Building a custom, basic version of Redis.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Zero-Trust Secure File Vault", desc: "End-to-end encrypted file sharing web app.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Real-time Multi-player Game", desc: "Node server managing game state for multiple clients.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Kubernetes Cluster Deployment", desc: "Hosting an app across multiple self-healing nodes.", weeks: "6 Weeks", diff: "Expert" },
                        { title: "AI Chatbot Interface", desc: "Integrating LLM APIs with a custom UI and memory.", weeks: "6 Weeks", diff: "Expert" },
                        { title: "Log Aggregation Dashboard", desc: "Visualizing server health and errors via ElasticSearch.", weeks: "7 Weeks", diff: "Expert" },
                        { title: "P2P Video Calling App", desc: "Using WebRTC to connect two browsers directly.", weeks: "7 Weeks", diff: "Expert" },
                        { title: "Capstone Open Source Package", desc: "Publishing a complete NPM or Pip utility library.", weeks: "8 Weeks", diff: "Expert" }
                    ]
                }
            },
            "ELECTRICAL": {
                "hardware": {
                    "1st Year": [
                        { title: "Arduino Traffic Light", desc: "C code controlling 3 LEDs with logic timers.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Ohm's Law Calculator CLI", desc: "Python script solving basic V=IR physics problems.", weeks: "1 Week", diff: "Beginner" },
                        { title: "Resistor Color Code Parser", desc: "App that tells you resistance based on colors.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Celsius/Fahrenheit Converter", desc: "Basic terminal program for lab data.", weeks: "1 Week", diff: "Beginner" },
                        { title: "Logic Gate Simulator Array", desc: "Script simulating AND/OR/NOT outputs.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Binary to Hex Converter", desc: "Script parsing machine language strings.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Blinking SOS Signal", desc: "Arduino arrays playing morse code via LED.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Simple Voltage Divider Math", desc: "Terminal app to calculate node voltages.", weeks: "1 Week", diff: "Beginner" },
                        { title: "Lab Data CSV Reader", desc: "Python script that calculates averages from lab files.", weeks: "3 Weeks", diff: "Beginner" },
                        { title: "ASCII Circuit Drawer", desc: "Terminal program mapping basic components.", weeks: "2 Weeks", diff: "Beginner" }
                    ],
                    "2nd Year": [
                        { title: "IoT Temperature Logger", desc: "NodeMCU sending temp data to a cloud database.", weeks: "4 Weeks", diff: "Intermediate" },
                        { title: "Automated Fan Controller", desc: "Arduino reading a thermistor to trigger a relay.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Ultrasonic Distance Radar", desc: "Using sound waves to print distances to serial monitor.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "MATLAB Signal Plotter", desc: "Graphing sine waves and noise interference.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Stepper Motor Sequence", desc: "Precise C code moving a motor specific degrees.", weeks: "4 Weeks", diff: "Intermediate" },
                        { title: "IR Remote Decoder", desc: "Reading raw hex signals from a TV remote.", weeks: "4 Weeks", diff: "Intermediate" },
                        { title: "Light-Tracking Solar Panel", desc: "Servos moving based on photoresistor data.", weeks: "5 Weeks", diff: "Intermediate" },
                        { title: "Digital Stopwatch UI", desc: "Multiplexing an LCD display with a microcontroller.", weeks: "4 Weeks", diff: "Intermediate" },
                        { title: "Battery Charge Monitor", desc: "Calculating voltage drop to estimate battery life.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Basic Audio Synthesizer", desc: "Generating PWM frequencies to play musical notes.", weeks: "4 Weeks", diff: "Intermediate" }
                    ],
                    "3rd Year": [
                        { title: "Smart Home Relay Web Dashboard", desc: "Controlling physical AC outlets from a smartphone.", weeks: "6 Weeks", diff: "Advanced" },
                        { title: "Custom PCB Weather Node", desc: "Designing a board with an ESP32 and sensors.", weeks: "7 Weeks", diff: "Advanced" },
                        { title: "PID Line Following Robot", desc: "Smooth motor math using proportional/integral feedback.", weeks: "6 Weeks", diff: "Advanced" },
                        { title: "RFID Access Control System", desc: "Scanning keycards and validating via a database.", weeks: "5 Weeks", diff: "Advanced" },
                        { title: "Bluetooth Low Energy Mesh", desc: "Making 3 microcontrollers talk to each other directly.", weeks: "6 Weeks", diff: "Advanced" },
                        { title: "Audio FFT Spectrum Analyzer", desc: "Using Fourier Transforms to visualize sound frequencies.", weeks: "6 Weeks", diff: "Advanced" },
                        { title: "Biometric Heart Rate Monitor", desc: "Filtering pulse noise from optical sensors.", weeks: "5 Weeks", diff: "Advanced" },
                        { title: "Automated Greenhouse System", desc: "Managing soil moisture, light, and temp automatically.", weeks: "7 Weeks", diff: "Advanced" },
                        { title: "CanSat Payload Simulator", desc: "Logging barometric and GPS data to an SD card.", weeks: "5 Weeks", diff: "Advanced" },
                        { title: "Wireless Power Transfer Coil", desc: "Simulating and building inductive charging.", weeks: "6 Weeks", diff: "Advanced" }
                    ],
                    "4th Year": [
                        { title: "Autonomous Drone Flight Controller", desc: "Writing IMU stabilization math from scratch.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "AI Computer Vision Sorting Arm", desc: "Using a camera and ML to sort physical objects.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "LoRaWAN Agricultural Network", desc: "Transmitting sensor data miles away without WiFi.", weeks: "7 Weeks", diff: "Expert" },
                        { title: "Smart Grid Power Converter", desc: "Building a high-efficiency inverter for solar panels.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Biomedical Prosthetic Control", desc: "Reading EMG muscle signals to actuate servo motors.", weeks: "8 Weeks", diff: "Expert" }
                    ]
                }
            },
            "DEFAULT": {
                "default": {
                    "1st Year": [
                        { title: "Basic Presentation Outline", desc: "Drafting a solid slideshow on a technical topic.", weeks: "1 Week", diff: "Beginner" },
                        { title: "Time Tracker App", desc: "A simple interface to log daily study hours.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Simple Static Website", desc: "Building a basic homepage for your hobbies.", weeks: "2 Weeks", diff: "Beginner" },
                        { title: "Data Survey Form", desc: "Creating a functional web form to collect user inputs.", weeks: "1 Week", diff: "Beginner" },
                        { title: "Weekly Planner Script", desc: "A basic script to print out your weekly schedule.", weeks: "1 Week", diff: "Beginner" }
                    ],
                    "2nd Year": [
                        { title: "Interactive Dashboard", desc: "A clean UI that visualizes mock JSON data.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Group Project Organizer", desc: "A shared digital board mimicking Trello.", weeks: "4 Weeks", diff: "Intermediate" },
                        { title: "Web API Integration", desc: "Fetching and displaying data from a public API.", weeks: "3 Weeks", diff: "Intermediate" },
                        { title: "Mini Research Paper", desc: "Writing a 5-page report on an emerging technology.", weeks: "2 Weeks", diff: "Intermediate" },
                        { title: "Basic Budgeting Tool", desc: "A localized app to calculate monthly expenses.", weeks: "3 Weeks", diff: "Intermediate" }
                    ],
                    "3rd Year": [
                        { title: "Process Automation Script", desc: "Writing code to handle repetitive daily computer tasks.", weeks: "4 Weeks", diff: "Advanced" },
                        { title: "Mock Startup Pitch", desc: "Creating a technical prototype and business presentation.", weeks: "5 Weeks", diff: "Advanced" },
                        { title: "Medium-scale Web App", desc: "A full-stack application addressing a local community problem.", weeks: "6 Weeks", diff: "Advanced" },
                        { title: "Data Visualization Project", desc: "Cleaning and graphing a large real-world dataset.", weeks: "4 Weeks", diff: "Advanced" },
                        { title: "Community Tech Solution", desc: "Building a digital tool for a local club or organization.", weeks: "5 Weeks", diff: "Advanced" }
                    ],
                    "4th Year": [
                        { title: "Comprehensive Capstone", desc: "A full end-to-end technical project solving a specific issue.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Open Source Contribution", desc: "Submitting a meaningful pull request to a major repository.", weeks: "6 Weeks", diff: "Expert" },
                        { title: "Industry Research Thesis", desc: "A deep dive into a niche technical standard or protocol.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Freelance Client Project", desc: "Delivering a functional tech product to a real-world client.", weeks: "8 Weeks", diff: "Expert" },
                        { title: "Product Launch Strategy", desc: "Planning the deployment, marketing, and scaling of an app.", weeks: "5 Weeks", diff: "Expert" }
                    ]
                }
            }
        }
    };

    // Any standard DOM population logic for rendering db contents goes here below.

    // ==========================================
    // 5. BULLETPROOF PARSING OF USER DATA
    // ==========================================
    
    const rawYear = String(user.year || "").toLowerCase();
    const rawStream = String(user.stream || "").toLowerCase();
    const rawInterest = String(user.interest || "").toLowerCase();

    let studentYear = "1st Year";
    if (rawYear.includes("2")) studentYear = "2nd Year";
    else if (rawYear.includes("3")) studentYear = "3rd Year";
    else if (rawYear.includes("4")) studentYear = "4th Year";

    let studentStream = "DEFAULT";
    if (rawStream.includes("computer") || rawStream.includes("cse") || rawStream.includes("it") || rawStream.includes("software")) {
        studentStream = "CSE";
    } else if (rawStream.includes("electric") || rawStream.includes("ece") || rawStream.includes("electronic") || rawStream.includes("power")) {
        studentStream = "ELECTRICAL";
    }

    let studentInterest = "default";
    if (rawInterest.includes("software") || rawInterest.includes("code") || rawInterest.includes("web") || rawInterest.includes("app")) {
        studentInterest = "software";
    } else if (rawInterest.includes("hardware") || rawInterest.includes("circuit") || rawInterest.includes("machine")) {
        studentInterest = "hardware";
    }

    // ==========================================
    // 6. BUILD THE FINAL ACTIVE DATA OBJECT
    // ==========================================
    
    const activeData = {
        courses: (db.courses[studentYear]?.[studentStream]) 
                 || (db.courses[studentYear]?.["DEFAULT"]) 
                 || db.courses["1st Year"]["DEFAULT"],
                 
        skills: (db.skills[studentYear]?.[studentInterest]) 
                || (db.skills[studentYear]?.["default"]) 
                || db.skills["1st Year"]["default"],
                
        projects: (db.projects[studentStream]?.[studentInterest]?.[studentYear]) 
                  || (db.projects["DEFAULT"]["default"][studentYear]) 
                  || db.projects["DEFAULT"]["default"]["1st Year"],
                  
        roadmap: `Welcome to your ${studentYear}! Because your background is in ${studentStream} and your primary interest is ${studentInterest}, we have tailored a full academic year of projects, courses, and technical skills specifically for you. Stay consistent and build your portfolio week by week.`
    };

    let nodeLabels = ["Basics", "Logic", "Scripts"];
    if (studentYear === "2nd Year") nodeLabels = ["Data", "Interactive", "Integrations"];
    if (studentYear === "3rd Year") nodeLabels = ["Servers", "Databases", "APIs"];
    if (studentYear === "4th Year") nodeLabels = ["Deployment", "Security", "Capstone"];

    const node2 = document.getElementById("node2Label");
    const node3 = document.getElementById("node3Label");
    const node4 = document.getElementById("node4Label");

    if (node2) node2.innerText = nodeLabels[0];
    if (node3) node3.innerText = nodeLabels[1];
    if (node4) node4.innerText = nodeLabels[2];

    // ==========================================
    // 7. INTERACTIVE MODAL FRAMEWORK PROCESSING
    // ==========================================
    const modal = document.getElementById("contentModal");
    const closeModal = document.getElementById("closeModal");
    const menuCards = document.querySelectorAll(".menu-card");

    if (modal && closeModal) {
        menuCards.forEach(card => {
            card.addEventListener("click", () => {
                const type = card.getAttribute("data-target");
                buildModalContent(type, activeData);
                modal.classList.add("active");
            });
        });

        closeModal.addEventListener("click", () => modal.classList.remove("active"));
        modal.addEventListener("click", (e) => { 
            if (e.target === modal) modal.classList.remove("active"); 
        });
    }

    function buildModalContent(type, data) {
        const body = document.getElementById("modalBody");
        const title = document.getElementById("modalTitle");
        
        if (!body || !title) return;
        body.innerHTML = ""; 

        if (type === "courses") {
            title.innerText = "Courses to Start";
            const items = data.courses || [];
            if (items.length === 0) body.innerHTML = "<p style='color:#888;'>No courses loaded.</p>";
            items.forEach(c => {
                body.innerHTML += `
                    <div class="content-block">
                        <h4>${c.title}</h4><p>${c.desc}</p>
                        <div class="meta-row"><span>⏳ ${c.weeks}</span><span>🎯 ${c.diff}</span></div>
                    </div>`;
            });
        } 
        else if (type === "skills") {
            title.innerText = "Skills to Focus On";
            const items = data.skills || [];
            if (items.length === 0) body.innerHTML = "<p style='color:#888;'>No skills loaded.</p>";
            items.forEach(s => {
                body.innerHTML += `<div class="content-block"><h4>${s.title}</h4><p>${s.desc}</p></div>`;
            });
        } 
        else if (type === "roadmap") {
            title.innerText = "Roadmap to Follow";
            body.innerHTML = `<div class="content-block"><h4 style="color:var(--text-light)">Strategy Overview</h4><p>${data.roadmap}</p></div>`;
        } 
        else if (type === "projects") {
            title.innerText = "Projects Recommended";
            const items = data.projects || [];
            if (items.length === 0) body.innerHTML = "<p style='color:#888;'>No projects loaded.</p>";
            items.forEach(p => {
                body.innerHTML += `
                    <div class="content-block">
                        <h4>${p.title}</h4><p>${p.desc}</p>
                        <div class="meta-row"><span>⏳ ${p.weeks}</span><span>🎯 ${p.diff}</span></div>
                    </div>`;
            });
        }
    }

    // ==========================================
    // 8. RETAKE / WIPE SESSION DATA TRIGGER
    // ==========================================
    const retakeBtn = document.getElementById("retakeQuizBtn");
    if (retakeBtn) {
        retakeBtn.addEventListener("click", () => {
            localStorage.removeItem("pathforgeAnswers");
            window.location.href = "index.html";
        });
    }
});