export const portfolioData = {
    projects: [
        {
            id: 1,
            title: "Password Manager",
            image: "assets/images/password-manager-demo.gif",
            images: ["assets/images/password-manager-demo.gif"],
            description: "A modern, secure, and user-friendly password manager built with Python and Tkinter.",
            techStack: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "Tkinter", iconClass: "fa-solid fa-window-maximize" },
                { name: "SQLite", iconClass: "fa-solid fa-database" },
                { name: "Security", iconClass: "fa-solid fa-shield-halved" }
            ],
            status: "completed",
            link: "https://github.com/majdAlmotaem/PasswordManager",
            githubLink: "https://github.com/majdAlmotaem/PasswordManager",
            problem: "Managing multiple passwords securely without relying on third-party cloud services.",
            solution: "Built a local, fully encrypted desktop application with a modern UI to securely store and manage passwords using PBKDF2 hashing.",
            lessonsLearned: "Gained deep insights into security protocols, data hashing, and building desktop UIs with Python.",
            newTechLearned: ["Security", "Hashing", "Data Encryption"]
        },
        {
            id: 2,
            title: "Lazy Controller",
            image: "assets/images/lazyController.jpg",
            images: ["assets/images/lazyController.jpg", "assets/images/mouse-app-desktopApp.png", "assets/images/mouse-app-androidApp.jpg"],
            description: "A futuristic, seamless way to control your PC directly from your Android phone.",
            techStack: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "Android Studio", iconClass: "fa-brands fa-android" },
                { name: "Sockets", iconClass: "fa-solid fa-network-wired" }
            ],
            status: "completed",
            link: "https://majdAlmotaem.github.io/mouseApp/",
            githubLink: "https://github.com/majdAlmotaem/mouseApp",
            problem: "Wanted a seamless way to control a PC from bed without a physical wireless mouse/keyboard.",
            solution: "Developed a cross-platform system (Android app + Windows server) that communicates via local Wi-Fi sockets to simulate mouse and keyboard inputs.",
            lessonsLearned: "Learned Android app development, desktop app integration, and real-time socket communication.",
            newTechLearned: ["Android App Development", "Desktop App Communication", "Sockets"]
        },
        {
            id: 3,
            title: "Crypto Live Data & Dashboard",
            image: "assets/images/stock_API.png",
            images: ["assets/images/stock_API.png"],
            description: "A script that fetches live crypto prices, logs them to CSV, and serves as a data source for Power BI.",
            techStack: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "Pandas", iconClass: "fa-solid fa-table" },
                { name: "Power BI", iconClass: "fa-solid fa-chart-line" },
                { name: "API", iconClass: "fa-solid fa-cloud-arrow-down" }
            ],
            status: "completed",
            link: "https://github.com/majdAlmotaem/Stock_API",
            githubLink: "https://github.com/majdAlmotaem/Stock_API",
            problem: "Needed an automated way to track and visualize real-time cryptocurrency market trends.",
            solution: "Wrote a Python script to fetch live prices via CoinGecko API, log them to CSV, and feed them into a live Power BI dashboard.",
            lessonsLearned: "Mastered fetching real-time data from APIs, data manipulation with pandas, and live data visualization in Power BI.",
            newTechLearned: ["CoinGecko API", "Pandas", "Power BI Desktop"]

        },
        {
            id: 4,
            title: "Memory Game",
            image: "assets/images/memoryGame.png",
            images: ["assets/images/memoryGame.png", "assets/images/memoryGame2.png"],
            description: "A fun and challenging memory card matching game built with Python and Toga.",
            techStack: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "Toga", iconClass: "fa-solid fa-gamepad" },
                { name: "BeeWare", iconClass: "fa-brands fa-python" }
            ],
            status: "completed",
            link: "https://github.com/majdAlmotaem/MemoryGame",
            githubLink: "https://github.com/majdAlmotaem/MemoryGame",
            problem: "Needed a fun, interactive way to learn cross-platform Python GUI development.",
            solution: "Created a fully functional memory card game with a dark theme, multiple difficulty levels, and a life system.",
            lessonsLearned: "Mastered the Toga library and BeeWare toolkit for building cross-platform games in Python.",
            newTechLearned: ["Toga Library", "BeeWare Toolkit", "Game Development"]
        },
        {
            id: 5,
            title: "DiscordBot-GithubIssues",
            image: "assets/images/Mr.IssuesApp.png",
            images: ["assets/images/Mr.IssuesApp.png"],
            description: "A Discord bot that helps bridge the gap between Discord conversations and GitHub issue tracking.",
            techStack: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "Discord.py", iconClass: "fa-brands fa-discord" },
                { name: "GitHub API", iconClass: "fa-brands fa-github" }
            ],
            status: "in-progress",
            link: "https://github.com/majdAlmotaem/DiscordBot-GithubIssues",
            githubLink: "https://github.com/majdAlmotaem/DiscordBot-GithubIssues",
            problem: "Bridging the gap between Discord community conversations and GitHub issue tracking.",
            solution: "Built a Discord bot that fetches open issues and generates links to create new issues directly from chat commands.",
            lessonsLearned: "Gained experience in developing Discord bots and interacting securely with external REST APIs (GitHub).",
            newTechLearned: ["Discord Bots", "GitHub API Integration"]
        },
        {
            id: 6,
            title: "Loky AI Image Generator",
            image: "assets/images/LokyAi.png",
            images: ["assets/images/LokyAi.png"],
            description: "A locally-hosted AI image generation application using state-of-the-art diffusion models.",
            techStack: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "Stable Diff", iconClass: "fa-solid fa-image" },
                { name: "Diffusers", iconClass: "fa-solid fa-code-merge" }
            ],
            status: "completed",
            link: "https://github.com/majdAlmotaem/LokyAi",
            githubLink: "https://github.com/majdAlmotaem/LokyAi",
            problem: "Wanted a private, locally-hosted AI image generation tool with a simple chat interface.",
            solution: "Developed a local backend using Hugging Face diffusers to run SDXL models, connected to a modern web frontend.",
            lessonsLearned: "Learned how to deploy and optimize local AI models, manage VRAM, and use the diffusers library.",
            newTechLearned: ["Diffusers Library", "Stable Diffusion XL", "Realistic Vision Model", "Local AI Deployment"]
        },
        {
            id: 7,
            title: "clickShare",
            image: "assets/images/project_ecommerce_1777468167512.png",
            images: ["assets/images/project_ecommerce_1777468167512.png"],
            description: "A modern web application to create, manage, and share posts across multiple social media platforms.",
            techStack: [
                { name: "Node.js", iconClass: "fa-brands fa-node-js" },
                { name: "Express", iconClass: "fa-brands fa-node-js" },
                { name: "PostgreSQL", iconClass: "fa-solid fa-database" },
                { name: "Passport.js", iconClass: "fa-solid fa-passport" }
            ],
            status: "in-progress",
            link: "https://github.com/majdAlmotaem/clickShare",
            githubLink: "https://github.com/majdAlmotaem/clickShare",
            problem: "Content creators needed a dashboard to draft, schedule, and publish to multiple platforms.",
            solution: "Developing a full-stack web app with OAuth 2.0 integration, a robust database, and a centralized post management system.",
            lessonsLearned: "Learned full-stack development, handling OAuth, configuring PostgreSQL, and working with EJS templates.",
            newTechLearned: ["Node.js", "Express.js", "PostgreSQL", "Passport.js", "EJS Library"]
        },
        {
            id: 8,
            title: "Voice Control App",
            image: "assets/images/voiceControlAppLogo.png",
            images: ["assets/images/voiceControlAppLogo.png", "assets/images/voiceControlApp.png"],
            description: "A voice control application that transcribes spoken commands in real-time and executes corresponding actions.",
            techStack: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "Whisper AI", iconClass: "fa-solid fa-microphone-lines" },
                { name: "Speech-to-Text", iconClass: "fa-solid fa-language" }
            ],
            status: "canceled",
            link: "https://github.com/majdAlmotaem/Speechy",
            githubLink: "https://github.com/majdAlmotaem/Speechy",
            problem: "Exploring real-time voice control for desktop applications and typing dictation.",
            solution: "Integrated OpenAI's Whisper (and later Faster-Whisper) to transcribe live audio into executable system commands.",
            lessonsLearned: "Learned the hard truth about real-time speech recognition: existing models are optimized for batch processing, not zero-latency streaming.",
            newTechLearned: ["Real-time Speech Recognition", "AI Models", "Faster-Whisper"]
        }
    ],
    skills: [
        {
            category: "Programming Languages",
            items: [
                { name: "Python", iconClass: "fa-brands fa-python" },
                { name: "JavaScript", iconClass: "fa-brands fa-js" },
                { name: "SQL", iconClass: "fa-solid fa-database" },
                { name: "C#", iconClass: "fa-brands fa-microsoft" },
                { name: "HTML/CSS", iconClass: "fa-brands fa-html5" }
            ]
        },
        {
            category: "Web & Frameworks",
            items: [
                { name: "Vue.js", iconClass: "fa-brands fa-vuejs" },
                { name: "React", iconClass: "fa-brands fa-react" },
                { name: "WordPress", iconClass: "fa-brands fa-wordpress" },
                { name: "REST APIs", iconClass: "fa-solid fa-network-wired" }
            ]
        },
        {
            category: "Cloud & Infrastructure",
            items: [
                { name: "AWS", iconClass: "fa-brands fa-aws" },
                { name: "Docker", iconClass: "fa-brands fa-docker" },
                { name: "Linux", iconClass: "fa-brands fa-linux" }
            ]
        },
        {
            category: "AI & Automation",
            items: [
                { name: "Prompt Engineering", iconClass: "fa-solid fa-brain" },
                { name: "n8n", iconClass: "fa-solid fa-robot" }
            ]
        },
        {
            category: "Project Management & Tools",
            items: [
                { name: "Scrum / Agile", iconClass: "fa-solid fa-users" },
                { name: "Git & GitHub", iconClass: "fa-brands fa-github" }
            ]
        }
    ],
    certificates: [
        {
            title: "Fachinformatiker für Anwendungsentwicklung",
            issuer: "IHK Duisburg-Wesel-Kleve",
            iconClass: "fa-solid fa-graduation-cap"
        },
        {
            title: "AWS Certified Solutions Architect - Associate",
            issuer: "Amazon Web Services",
            iconClass: "fa-brands fa-aws"
        },
        {
            title: "Grundwissen Generative KI",
            issuer: "LinkedIn Learning & Microsoft",
            iconClass: "fa-solid fa-brain"
        },
        {
            title: "Data Science – Grundlagen",
            issuer: "LinkedIn Learning",
            iconClass: "fa-solid fa-chart-line"
        },
        {
            title: "Prompt Engineering - Grundlagen",
            issuer: "LinkedIn Learning",
            iconClass: "fa-solid fa-comment-dots"
        },
        {
            title: "Klassendiagramme mit UML",
            issuer: "LinkedIn Learning",
            iconClass: "fa-solid fa-diagram-project"
        },
        {
            title: "Networking Basics",
            issuer: "CISCO Academy",
            iconClass: "fa-solid fa-network-wired"
        },
        {
            title: "Programming for Everybody (Python)",
            issuer: "University of Michigan / Coursera",
            iconClass: "fa-brands fa-python"
        }
    ],
    blogs: [
        {
            id: 1,
            title: "IT Tutoring & Job Search",
            date: "2026",
            excerpt: "Aktuell gebe ich über Discord Nachhilfe bzw. Prüfungsvorbereitung für angehende FIAE...",
            content: "<p>Aktuell gebe ich über Discord Nachhilfe bzw. Prüfungsvorbereitung für angehende FIAE — inzwischen sind wir über 15 Personen.</p><p>Wir behandeln Themen wie UML, SQL und weitere Inhalte aus der Ausbildung.</p><p>Für mich ist das eine super Möglichkeit, mein eigenes Wissen immer frisch zu halten und gleichzeitig an andere weiterzugeben.<br>Nebenbei bin ich aktuell auch aktiv auf der Suche nach einer passenden Stelle im IT-Bereich.</p>",
            image: "assets/images/DiscordNachhilfe.jpg",
            tags: ["FIAE", "Nachhilfe", "ITKarriere", "SQL", "UML", "Jobsuche"]
        },
        {
            id: 2,
            title: "Graduation Milestone",
            date: "Jan 2026",
            excerpt: "Endlich offiziell: Fachinformatiker für Anwendungsentwicklung! 🎓✅",
            content: "<p>Endlich offiziell: Fachinformatiker für Anwendungsentwicklung! 🎓✅</p><p>Was für eine Reise! 🚀 Der Januar 2026 markiert für mich einen wichtigen Meilenstein: Ich habe meine Abschlussprüfung zum Fachinformatiker (Anwendungsentwicklung) bestanden.</p><p>Rückblickend bin ich besonders stolz darauf, wie ich die Zeit genutzt habe. Ich wollte nicht nur programmieren lernen, sondern das \"große Ganze\" verstehen. Wie interagieren Cloud-Strukturen? Wie setzen wir KI sinnvoll ein? Deshalb habe ich jede freie Minute genutzt, um Zertifikate zu sammeln (u.a. AWS & Data Science) und dieses Wissen direkt in echten Projekten zu testen.</p><p>Ich bin super zufrieden mit dem Ergebnis und gehe hochmotiviert in den nächsten Karriereabschnitt.<br>Auf geht's! 💪</p>",
            image: "assets/images/OffizielFachinformatiker.jpg",
            tags: ["Fachinformatiker", "Ausbildung2026", "Karrierestart", "CloudNative", "AI", "PassionForTech"]
        },
        {
            id: 3,
            title: "2025 Year in Review",
            date: "Dec 2025",
            excerpt: "Mein Rückblick auf 2025. Im täglichen 'Tunnelblick' verliert man schnell das Gefühl dafür, was man eigentlich alles leistet.",
            content: "<p>Mein Rückblick auf 2025.</p><p>Im täglichen \"Tunnelblick\" verliert man schnell das Gefühl dafür, was man eigentlich alles leistet. Weil ich seit Jahren datenbasiert mit To-Do-Listen arbeite, habe ich mir die Fakten angesehen.</p><p>Die Analyse zeigt: 150 Stunden Training, über 100 Stunden Fokuszeit für den Ausbildungsabschluss und parallel die AWS-Zertifizierung.</p><p>Was ich daraus lerne? Erfolg ist kein einzelnes Event, sondern die Summe vieler kleiner, oft unsichtbarer Aufgaben. Wer die kleinen Schritte meistert, erreicht am Ende die großen Meilensteine.<br>Stolz auf dieses Fundament für meine Karriere als Fachinformatiker. 💻💪</p>",
            image: "assets/images/RückblickAuf2025.jpg",
            tags: ["CareerGrowth", "Fachinformatiker", "CloudComputing", "Discipline", "Review2025"]
        },
        {
            id: 4,
            title: "ITCS Cologne Networking",
            date: "2025",
            excerpt: "Today I visited the ITCS IT in Cologne – and it was a really great experience.",
            content: "<p>Today I visited the ITCS IT in Cologne – and it was a really great experience.</p><p>I used the chance to connect with as many companies as possible and shared the QR card I created, which links directly to my CV and more about me. It was nice to see that many people found this idea creative and useful. 😄</p><p>I also joined some of the tech talks, which were very interesting and gave me new insights.</p><p>Events like this show how valuable it is to meet companies in person, exchange ideas, and build real connections.</p>",
            image: "assets/images/ITCS.jpg",
            tags: ["ITCS", "Networking", "TechConference", "CareerGrowth", "Cologne"]
        },
        {
            id: 5,
            title: "n8n and AI Workshop",
            date: "2025",
            excerpt: "Today, I had the opportunity to participate in a highly informative workshop on Automation with n8n and AI Agents...",
            content: "<p>Today, I had the opportunity to participate in a highly informative workshop on Automation with n8n and AI Agents, led by Elias Jelinek from Place Beyond Bytes.</p><p>It was impressive to see how complex processes can be automated using tools like n8n and local AI models (Ollama). The practical use cases were especially helpful and sparked many new ideas.</p><p>I can highly recommend this workshop to anyone looking to dive deeper into this field.</p><p>A big thank you for the valuable insights!</p>",
            image: "assets/images/workshopAI.jpg",
            tags: ["Automation", "n8n", "AI", "ArtificialIntelligence", "WorkflowAutomation", "Ollama"]
        },
        {
            id: 6,
            title: "Mindset on AI",
            date: "2025",
            excerpt: "🤖 Don’t fear AI. Learn it. Use it. Grow with it. Many people are still saying...",
            content: "<p>🤖 Don’t fear AI. Learn it. Use it. Grow with it.</p><p>Many people are still saying:<br>“AI is going to take our jobs…”</p><p>But maybe the better question is:<br>“How can I use AI to do my job better, faster, and smarter?”</p><p>💡 The truth is:<br>AI isn’t here to replace you.<br>It’s here to support you, to upgrade your workflow, and to free you from repetitive tasks so you can focus on what really matters — creativity, decision-making, innovation.</p><p>✅ If you work in design, code, marketing, writing, sales…<br>AI can be your best assistant — not your enemy.<br>But only if you’re open to learning it.</p><p>The ones who grow in this new era won’t be those who resist change, but those who adapt with it.</p><p>🔁 So don’t be afraid.<br>Get curious.<br>Explore tools.<br>Try things.<br>Ask questions.</p><p>The future isn’t AI vs. Humans.<br>It’s Humans + AI working together.</p>",
            image: "assets/images/dontFearAI.jpg",
            tags: ["AI", "Mindset", "FutureOfWork", "Productivity", "Growth", "ArtificialIntelligence", "WorkSmarter"]
        },
        {
            id: 7,
            title: "Digital Wellness & Short-Form Content",
            date: "2025",
            excerpt: "⚠️ The Most Addictive Trap of Our Time: Reels, Shorts & Endless Scrolling⚠️",
            content: "<p>⚠️ The Most Addictive Trap of Our Time: Reels, Shorts & Endless Scrolling⚠️</p><p>Let’s be real for a second.<br>Reels, TikToks, Shorts — they’re not just fun.<br>They’re dangerous. Not physically, but mentally. 🧠</p><p>You open the app to “just check something.”<br>30 minutes later, you’ve watched 50 random clips. You laughed, maybe got inspired, maybe not.<br>But what did you really gain?</p><p>The truth is:<br>👉 You didn’t go in to learn<br>👉 You didn’t go in with a goal<br>👉 You just fell into the loop — like millions do, every day</p><p>And the scariest part?<br>You didn’t even notice how fast that time disappeared.<br>That’s exactly how these platforms are designed — to steal your attention without permission.</p><p>🧠 What it does to your brain:<br>- Trains you to crave constant, fast stimulation<br>- Destroys focus and deep thinking<br>- Replaces quality information with noise<br>- Builds a habit of escaping life instead of improving it</p><p>People say “it’s just for fun.”<br>But when it becomes a habit — hours a day, every day — it’s not fun anymore.<br>It’s a trap.</p><p>This isn’t about being anti-tech or anti-social media.<br>It’s about being aware.<br>Because once you’re aware, you can choose what you consume — and stop being consumed by it.</p><p>📵 Ask yourself next time:<br>“Is this helping me grow, or just helping me waste time?”</p>",
            image: "assets/images/endlessScrolling.jpg",
            tags: ["DigitalWellness", "Mindset", "Focus", "ReelsTrap", "AttentionEconomy", "Productivity", "SelfAwareness"]
        },
        {
            id: 8,
            title: "Avoiding FOMO and Trends",
            date: "2025",
            excerpt: "💭 Ever feel like you have to follow the latest trend? 💭 Every time you open social media...",
            content: "<p>💭 Ever feel like you have to follow the latest trend? 💭<br>Every time you open social media, it’s like everyone’s doing the same thing —<br>And you start thinking: “Should I be doing this too?”<br>That’s the power of FOMO (Fear of Missing Out) — it makes us want to join in, even when we’re not sure why.</p><p>But here’s something I’ve been asking myself lately:<br>Do I really want to follow this trend, or am I just doing it because everyone else is?</p><p>Here’s what I realized:<br>🔸 People often show off online just to feel accepted or get likes.<br>🔸 Some do it to feel like they belong, even if it’s not “their thing.”<br>🔸 Others treat it like a flex — to stand out or look cool.</p><p>But the truth is:<br>The strongest flex is being yourself.<br>Doing what you love. Sharing what really matters to you.<br>Not just copying what everyone else is doing!</p><p>Before following any trend, ask yourself:<br>👉 Is this really me?<br>👉 Do I enjoy this?<br>👉 Or am I just doing it because everyone else is?</p><p>This doesn’t mean I’m against trends or think they’re bad.<br>Some trends are fun, creative, and inspiring.<br>I just think it’s important to stop and think — before following the crowd. 🙌</p><p>What do you think? Do you follow trends because they excite you — or just not to feel left out?<br>Let’s talk 👇</p>",
            image: "assets/images/FOMO.jpg",
            tags: ["FOMO", "Authenticity", "Mindset", "Trends", "BeYourself", "ThinkBeforeYouFollow"]
        },
        {
            id: 10,
            title: "Digital Balance & Mental Health",
            date: "2025",
            excerpt: "🧠 Schützt euer Gehirn: Weniger Smartphone, mehr echtes Leben!",
            content: "<p>🧠 Schützt euer Gehirn: Weniger Smartphone, mehr echtes Leben!</p><p>Wusstest du, dass wir oft mehr Zeit am Smartphone verbringen als im echten Leben? Egal ob Kinder, Jugendliche oder Erwachsene – überall sieht man Menschen aufs Display starren: in der Bahn, im Wartezimmer beim Arzt, in Schulen und sogar in Bibliotheken.</p><p>Ich will Smartphones nicht schlechtreden – sie bieten viele Vorteile. Aber wir dürfen nicht vergessen, dass ein übermäßiger Gebrauch unserem Gehirn schaden kann. Konzentration, Kreativität und Motivation leiden darunter. Der Schlüssel liegt darin, eine Balance zwischen digitaler und echter Welt zu finden.</p><p>💡 Wie erreicht man die Balance?<br>✅ Setze Limits für Apps ⏳<br>✅ Versuche, wenn du mit Freunden unterwegs bist, nicht ständig auf dein Handy zu schauen 👥<br>✅ Stelle dein Handy auf lautlos, wenn du keinen dringenden Anruf erwartest 🔕<br>✅ Finde ein Hobby – Sport, Musik oder Lesen 📚🏋️‍♂️🎶<br>✅ Vermeide das Handy eine Stunde vor und nach dem Schlafen 😴</p><p>Ich mache das seit Langem – und es hat mein Leben positiv verändert! Mehr Fokus, mehr Energie, weniger Demotivation. Probier es aus! 💙🔥</p><p>Ich bin gespannt auf eure Meinungen! Wie geht ihr mit dem Thema um, und wie schafft ihr es, die Balance zu halten? 🤔👇</p>",
            image: "assets/images/WenigerSmartphones.jpg",
            tags: ["DigitalDetox", "Mindfulness", "Produktivität", "MentalHealth", "Technologie"]
        }
    ]
};
