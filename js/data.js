export const portfolioData = {
    en: {
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
                title: "AI News Digest Automation",
                image: "assets/images/n8n.mp4",
                images: ["assets/images/n8n.mp4"],
                description: "A smart automation workflow built with n8n that delivers a daily AI-summarized tech news digest to your inbox and to-do list.",
                techStack: [
                    { name: "n8n", iconClass: "fa-solid fa-robot" },
                    { name: "AI", iconClass: "fa-solid fa-brain" },
                    { name: "Automation", iconClass: "fa-solid fa-gears" },
                    { name: "Productivity", iconClass: "fa-solid fa-bolt" }
                ],
                status: "completed",
                link: "#",
                githubLink: "#",
                problem: "Staying updated with AI and tech news is time-consuming. I needed a way to consolidate and summarize the most important information daily.",
                solution: "Developed a smart automation with n8n! Now, I get a daily digest of the latest AI and tech news straight to my inbox, summarized by AI. Plus, it adds a quick reminder to my to-do list so I don't miss anything.",
                lessonsLearned: "It was awesome to see how easily n8n handles fetching, processing, and delivering information. It's a truly powerful tool for automating tasks and improving productivity. Highly recommend exploring n8n if you're into smart workflows!",
                newTechLearned: ["n8n", "AI-Driven Automation", "Productivity Workflows"]
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
            },
            {
                id: 9,
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
                title: "IT Specialist in Application Development",
                issuer: "IHK Duisburg-Wesel-Kleve",
                iconClass: "fa-solid fa-graduation-cap"
            },
            {
                title: "AWS Certified Solutions Architect - Associate",
                issuer: "Amazon Web Services",
                iconClass: "fa-brands fa-aws"
            },
            {
                title: "Introduction to Generative AI",
                issuer: "LinkedIn Learning & Microsoft",
                iconClass: "fa-solid fa-brain"
            },
            {
                title: "Data Science Foundations",
                issuer: "LinkedIn Learning",
                iconClass: "fa-solid fa-chart-line"
            },
            {
                title: "Prompt Engineering Foundations",
                issuer: "LinkedIn Learning",
                iconClass: "fa-solid fa-comment-dots"
            },
            {
                title: "Class Diagrams with UML",
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
                excerpt: "Currently, I am giving tutoring and exam preparation via Discord for aspiring IT Specialists in Application Development...",
                content: "<p>Currently, I am giving tutoring and exam preparation via Discord for aspiring IT Specialists in Application Development (FIAE) — we have grown to over 15 people.</p><p>We cover topics such as UML, SQL, and other course contents from the vocational training.</p><p>For me, this is a great opportunity to keep my own knowledge fresh and give back to others at the same time.<br>On the side, I am also actively looking for a suitable position in the IT sector.</p>",
                image: "assets/images/DiscordNachhilfe.jpg",
                tags: ["FIAE", "Tutoring", "ITCareer", "SQL", "UML", "JobHunt"]
            },
            {
                id: 2,
                title: "Graduation Milestone",
                date: "Jan 2026",
                excerpt: "Finally official: IT Specialist in Application Development! 🎓✅",
                content: "<p>Finally official: IT Specialist in Application Development! 🎓✅</p><p>What a journey! 🚀 January 2026 marks a major milestone for me: I passed my final exam to become a certified IT Specialist (Application Development).</p><p>Looking back, I am particularly proud of how I spent my time. I didn't just want to learn programming, I wanted to understand the \"big picture.\" How do cloud structures interact? How do we use AI in a meaningful way? That's why I used every free minute to collect certifications (including AWS & Data Science) and test this knowledge directly in real-world projects.</p><p>I am super satisfied with the result and highly motivated to start the next chapter of my career.<br>Let's go! 💪</p>",
                image: "assets/images/OffizielFachinformatiker.jpg",
                tags: ["ITSpecialist", "VocationalTraining2026", "CareerStart", "CloudNative", "AI", "PassionForTech"]
            },
            {
                id: 3,
                title: "2025 Year in Review",
                date: "Dec 2025",
                excerpt: "My review of 2025. In the daily 'tunnel vision', you quickly lose track of everything you actually achieve.",
                content: "<p>My review of 2025.</p><p>In the daily \"tunnel vision\", you quickly lose track of everything you actually achieve. Because I have been working data-driven with to-do lists for years, I looked at the facts.</p><p>The analysis shows: 150 hours of training, over 100 hours of focus time for graduation preparation, and AWS certification in parallel.</p><p>What do I learn from this? Success is not a single event, but the sum of many small, often invisible tasks. Those who master the small steps will eventually reach the big milestones.<br>Proud of this foundation for my career as an IT specialist. 💻💪</p>",
                image: "assets/images/RückblickAuf2025.jpg",
                tags: ["CareerGrowth", "ITSpecialist", "CloudComputing", "Discipline", "Review2025"]
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
                excerpt: "🧠 Protect your brain: Less smartphone, more real life!",
                content: "<p>🧠 Protect your brain: Less smartphone, more real life!</p><p>Did you know that we often spend more time on our smartphones than in real life? Whether children, teenagers, or adults – you see people staring at screens everywhere: on the train, in the doctor's waiting room, in schools, and even in libraries.</p><p>I don't want to talk bad about smartphones – they offer many advantages. But we must not forget that excessive use can damage our brain. Concentration, creativity, and motivation suffer. The key is to find a balance between the digital and the real world.</p><p>💡 How to achieve balance?<br>✅ Set limits for apps ⏳<br>✅ Try not to constantly look at your phone when you are out with friends 👥<br>✅ Put your phone on silent if you are not expecting an urgent call 🔕<br>✅ Find a hobby – sports, music, or reading 📚🏋️‍♂️🎶<br>✅ Avoid the phone an hour before and after sleep 😴</p><p>I have been doing this for a long time – and it has changed my life positively! More focus, more energy, less demotivation. Try it out! 💙🔥</p><p>I'm looking forward to your opinions! How do you deal with the topic, and how do you manage to keep the balance? 🤔👇</p>",
                image: "assets/images/WenigerSmartphones.jpg",
                tags: ["DigitalDetox", "Mindfulness", "Productivity", "MentalHealth", "Technology"]
            }
        ]
    },
    de: {
        projects: [
            {
                id: 1,
                title: "Passwort-Manager",
                image: "assets/images/password-manager-demo.gif",
                images: ["assets/images/password-manager-demo.gif"],
                description: "Ein moderner, sicherer und benutzerfreundlicher Passwort-Manager, entwickelt mit Python und Tkinter.",
                techStack: [
                    { name: "Python", iconClass: "fa-brands fa-python" },
                    { name: "Tkinter", iconClass: "fa-solid fa-window-maximize" },
                    { name: "SQLite", iconClass: "fa-solid fa-database" },
                    { name: "Security", iconClass: "fa-solid fa-shield-halved" }
                ],
                status: "completed",
                link: "https://github.com/majdAlmotaem/PasswordManager",
                githubLink: "https://github.com/majdAlmotaem/PasswordManager",
                problem: "Sichere Verwaltung mehrerer Passwörter, ohne auf Cloud-Dienste von Drittanbietern angewiesen zu sein.",
                solution: "Entwicklung einer lokalen, vollständig verschlüsselten Desktop-Anwendung mit moderner Benutzeroberfläche zur sicheren Speicherung und Verwaltung von Passwörtern mittels PBKDF2-Hashing.",
                lessonsLearned: "Tiefere Einblicke in Sicherheitsprotokolle, Daten-Hashing und die Erstellung von Desktop-UIs mit Python gewonnen.",
                newTechLearned: ["Sicherheit", "Hashing", "Datenverschlüsselung"]
            },
            {
                id: 2,
                title: "Lazy Controller",
                image: "assets/images/lazyController.jpg",
                images: ["assets/images/lazyController.jpg", "assets/images/mouse-app-desktopApp.png", "assets/images/mouse-app-androidApp.jpg"],
                description: "Eine futuristische, nahtlose Möglichkeit, Ihren PC direkt von Ihrem Android-Telefon aus zu steuern.",
                techStack: [
                    { name: "Python", iconClass: "fa-brands fa-python" },
                    { name: "Android Studio", iconClass: "fa-brands fa-android" },
                    { name: "Sockets", iconClass: "fa-solid fa-network-wired" }
                ],
                status: "completed",
                link: "https://majdAlmotaem.github.io/mouseApp/",
                githubLink: "https://github.com/majdAlmotaem/mouseApp",
                problem: "Es wurde ein nahtloser Weg gesucht, um einen PC vom Bett aus ohne eine physische kabellose Maus oder Tastatur zu steuern.",
                solution: "Entwicklung eines plattformübergreifenden Systems (Android-App + Windows-Server), das über lokale Wi-Fi-Sockets kommuniziert, um Maus- und Tastatureingaben zu simulieren.",
                lessonsLearned: "Erfahrung gesammelt in der Android-App-Entwicklung, Desktop-App-Integration und Echtzeit-Socket-Kommunikation.",
                newTechLearned: ["Android-App-Entwicklung", "Desktop-App-Kommunikation", "Sockets"]
            },
            {
                id: 3,
                title: "KI-News-Digest Automatisierung",
                image: "assets/images/n8n.mp4",
                images: ["assets/images/n8n.mp4"],
                description: "Ein intelligenter Automatisierungs-Workflow, der mit n8n erstellt wurde und täglich einen KI-zusammengefassten Tech-News-Digest in den Posteingang und die To-Do-Liste liefert.",
                techStack: [
                    { name: "n8n", iconClass: "fa-solid fa-robot" },
                    { name: "AI", iconClass: "fa-solid fa-brain" },
                    { name: "Automation", iconClass: "fa-solid fa-gears" },
                    { name: "Productivity", iconClass: "fa-solid fa-bolt" }
                ],
                status: "completed",
                link: "#",
                githubLink: "#",
                problem: "Es ist zeitaufwendig, über KI- und Tech-News auf dem Laufenden zu bleiben. Ich brauchte einen Weg, die wichtigsten Informationen täglich zu konsolidieren und zusammenzufassen.",
                solution: "Eine intelligente Automatisierung mit n8n entwickelt! Jetzt erhalte ich eine tägliche Zusammenfassung der neuesten KI- und Tech-News direkt in meinen Posteingang, zusammengefasst von einer KI. Zudem wird eine kurze Erinnerung zu meiner To-Do-Liste hinzugefügt, damit ich nichts verpasse.",
                lessonsLearned: "Es war großartig zu sehen, wie einfach n8n das Abrufen, Verarbeiten und Ausliefern von Informationen handhabt. Es ist ein wirklich mächtiges Tool zur Automatisierung von Aufgaben und zur Steigerung der Produktivität. Ich empfehle n8n wärmstens für smarte Workflows!",
                newTechLearned: ["n8n", "KI-gestützte Automatisierung", "Produktivitäts-Workflows"]
            },
            {
                id: 4,
                title: "Memory-Spiel",
                image: "assets/images/memoryGame.png",
                images: ["assets/images/memoryGame.png", "assets/images/memoryGame2.png"],
                description: "Ein unterhaltsames und herausforderndes Memory-Kartenspiel, entwickelt mit Python und Toga.",
                techStack: [
                    { name: "Python", iconClass: "fa-brands fa-python" },
                    { name: "Toga", iconClass: "fa-solid fa-gamepad" },
                    { name: "BeeWare", iconClass: "fa-brands fa-python" }
                ],
                status: "completed",
                link: "https://github.com/majdAlmotaem/MemoryGame",
                githubLink: "https://github.com/majdAlmotaem/MemoryGame",
                problem: "Ein spielerischer Weg gesucht, um die plattformübergreifende Python-GUI-Entwicklung zu erlernen.",
                solution: "Erstellung eines voll funktionsfähigen Memory-Kartenspiels mit dunklem Design, mehreren Schwierigkeitsgraden und einem Lebenssystem.",
                lessonsLearned: "Die Toga-Bibliothek und das BeeWare-Toolkit zur Erstellung plattformübergreifender Spiele in Python gemeistert.",
                newTechLearned: ["Toga-Bibliothek", "BeeWare-Toolkit", "Spieleentwicklung"]
            },
            {
                id: 5,
                title: "DiscordBot-GithubIssues",
                image: "assets/images/Mr.IssuesApp.png",
                images: ["assets/images/Mr.IssuesApp.png"],
                description: "Ein Discord-Bot, der hilft, die Lücke zwischen Discord-Unterhaltungen und der GitHub-Issue-Verfolgung zu schließen.",
                techStack: [
                    { name: "Python", iconClass: "fa-brands fa-python" },
                    { name: "Discord.py", iconClass: "fa-brands fa-discord" },
                    { name: "GitHub API", iconClass: "fa-brands fa-github" }
                ],
                status: "in-progress",
                link: "https://github.com/majdAlmotaem/DiscordBot-GithubIssues",
                githubLink: "https://github.com/majdAlmotaem/DiscordBot-GithubIssues",
                problem: "Schließen der Lücke zwischen Unterhaltungen in der Discord-Community und der GitHub-Issue-Verfolgung.",
                solution: "Entwicklung eines Discord-Bots, der offene Issues abruft und Links generiert, um neue Issues direkt über Chat-Befehle zu erstellen.",
                lessonsLearned: "Erfahrung gesammelt in der Entwicklung von Discord-Bots und der sicheren Interaktion mit externen REST-APIs (GitHub).",
                newTechLearned: ["Discord-Bots", "GitHub-API-Integration"]
            },
            {
                id: 6,
                title: "Loky KI-Bildgenerator",
                image: "assets/images/LokyAi.png",
                images: ["assets/images/LokyAi.png"],
                description: "Eine lokal gehostete Anwendung zur KI-Bildgenerierung unter Verwendung modernster Diffusionsmodelle.",
                techStack: [
                    { name: "Python", iconClass: "fa-brands fa-python" },
                    { name: "Stable Diff", iconClass: "fa-solid fa-image" },
                    { name: "Diffusers", iconClass: "fa-solid fa-code-merge" }
                ],
                status: "completed",
                link: "https://github.com/majdAlmotaem/LokyAi",
                githubLink: "https://github.com/majdAlmotaem/LokyAi",
                problem: "Ein privates, lokal gehostetes KI-Bildgenerierungstool mit einer einfachen Chat-Oberfläche gesucht.",
                solution: "Entwicklung eines lokalen Backends unter Verwendung von Hugging Face Diffusern zur Ausführung von SDXL-Modellen, verbunden mit einem modernen Web-Frontend.",
                lessonsLearned: "Gelernt, wie man lokale KI-Modelle bereitstellt, optimiert, den VRAM verwaltet und die Diffuser-Bibliothek nutzt.",
                newTechLearned: ["Diffusers-Bibliothek", "Stable Diffusion XL", "Realistic Vision Modell", "Lokaler KI-Einsatz"]
            },
            {
                id: 7,
                title: "clickShare",
                image: "assets/images/project_ecommerce_1777468167512.png",
                images: ["assets/images/project_ecommerce_1777468167512.png"],
                description: "Eine moderne Webanwendung zum Erstellen, Verwalten und Teilen von Beiträgen auf mehreren Social-Media-Plattformen.",
                techStack: [
                    { name: "Node.js", iconClass: "fa-brands fa-node-js" },
                    { name: "Express", iconClass: "fa-brands fa-node-js" },
                    { name: "PostgreSQL", iconClass: "fa-solid fa-database" },
                    { name: "Passport.js", iconClass: "fa-solid fa-passport" }
                ],
                status: "in-progress",
                link: "https://github.com/majdAlmotaem/clickShare",
                githubLink: "https://github.com/majdAlmotaem/clickShare",
                problem: "Content-Ersteller benötigten ein Dashboard, um Entwürfe zu erstellen, zu planen und auf mehreren Plattformen zu veröffentlichen.",
                solution: "Entwicklung einer Full-Stack-Web-App mit OAuth 2.0-Integration, einer robusten Datenbank und einem zentralen Beitragsverwaltungssystem.",
                lessonsLearned: "Full-Stack-Entwicklung erlernt, Umgang mit OAuth, Konfiguration von PostgreSQL und Arbeit mit EJS-Vorlagen.",
                newTechLearned: ["Node.js", "Express.js", "PostgreSQL", "Passport.js", "EJS-Bibliothek"]
            },
            {
                id: 8,
                title: "Sprachsteuerungs-App",
                image: "assets/images/voiceControlAppLogo.png",
                images: ["assets/images/voiceControlAppLogo.png", "assets/images/voiceControlApp.png"],
                description: "Eine Sprachsteuerungsanwendung, die gesprochene Befehle in Echtzeit transkribiert und entsprechende Aktionen ausführt.",
                techStack: [
                    { name: "Python", iconClass: "fa-brands fa-python" },
                    { name: "Whisper AI", iconClass: "fa-solid fa-microphone-lines" },
                    { name: "Speech-to-Text", iconClass: "fa-solid fa-language" }
                ],
                status: "canceled",
                link: "https://github.com/majdAlmotaem/Speechy",
                githubLink: "https://github.com/majdAlmotaem/Speechy",
                problem: "Erforschung der Echtzeit-Sprachsteuerung für Desktop-Anwendungen und Schriftdiktat.",
                solution: "Integration von OpenAIs Whisper (und später Faster-Whisper), um Live-Audio in ausführbare Systembefehle zu transkribieren.",
                lessonsLearned: "Die harte Wahrheit über Echtzeit-Spracherkennung gelernt: Bestehende Modelle sind für die Stapelverarbeitung und nicht für Streaming mit Null-Latenz optimiert.",
                newTechLearned: ["Echtzeit-Spracherkennung", "KI-Modelle", "Faster-Whisper"]
            },
            {
                id: 9,
                title: "Crypto Live-Daten & Dashboard",
                image: "assets/images/stock_API.png",
                images: ["assets/images/stock_API.png"],
                description: "Ein Skript, das Live-Kryptopreise abruft, in CSV protokolliert und als Datenquelle für Power BI dient.",
                techStack: [
                    { name: "Python", iconClass: "fa-brands fa-python" },
                    { name: "Pandas", iconClass: "fa-solid fa-table" },
                    { name: "Power BI", iconClass: "fa-solid fa-chart-line" },
                    { name: "API", iconClass: "fa-solid fa-cloud-arrow-down" }
                ],
                status: "completed",
                link: "https://github.com/majdAlmotaem/Stock_API",
                githubLink: "https://github.com/majdAlmotaem/Stock_API",
                problem: "Es wurde ein automatisierter Weg benötigt, um Echtzeit-Trends auf dem Kryptowährungsmarkt zu verfolgen und zu visualisieren.",
                solution: "Schrieb ein Python-Skript zum Abrufen von Live-Preisen über die CoinGecko-API, zur Protokollierung in einer CSV-Datei und zur Einspeisung in ein Live-Power-BI-Dashboard.",
                lessonsLearned: "Erfolgreiches Abrufen von Echtzeitdaten aus APIs, Datenmanipulation mit Pandas und Live-Datenvisualisierung in Power BI gemeistert.",
                newTechLearned: ["CoinGecko-API", "Pandas", "Power BI Desktop"]
            }
        ],
        skills: [
            {
                category: "Programmiersprachen",
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
                category: "Cloud & Infrastruktur",
                items: [
                    { name: "AWS", iconClass: "fa-brands fa-aws" },
                    { name: "Docker", iconClass: "fa-brands fa-docker" },
                    { name: "Linux", iconClass: "fa-brands fa-linux" }
                ]
            },
            {
                category: "KI & Automatisierung",
                items: [
                    { name: "Prompt Engineering", iconClass: "fa-solid fa-brain" },
                    { name: "n8n", iconClass: "fa-solid fa-robot" }
                ]
            },
            {
                category: "Projektmanagement & Tools",
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
                title: "IT-Nachhilfe & Jobsuche",
                date: "2026",
                excerpt: "Aktuell gebe ich über Discord Nachhilfe bzw. Prüfungsvorbereitung für angehende FIAE...",
                content: "<p>Aktuell gebe ich über Discord Nachhilfe bzw. Prüfungsvorbereitung für angehende FIAE — inzwischen sind wir über 15 Personen.</p><p>Wir behandeln Themen wie UML, SQL und weitere Inhalte aus der Ausbildung.</p><p>Für mich ist das eine super Möglichkeit, mein eigenes Wissen immer frisch zu halten und gleichzeitig an andere weiterzugeben.<br>Nebenbei bin ich aktuell auch aktiv auf der Suche nach einer passenden Stelle im IT-Bereich.</p>",
                image: "assets/images/DiscordNachhilfe.jpg",
                tags: ["FIAE", "Nachhilfe", "ITKarriere", "SQL", "UML", "Jobsuche"]
            },
            {
                id: 2,
                title: "Abschluss-Meilenstein",
                date: "Jan 2026",
                excerpt: "Endlich offiziell: Fachinformatiker für Anwendungsentwicklung! 🎓✅",
                content: "<p>Endlich offiziell: Fachinformatiker für Anwendungsentwicklung! 🎓✅</p><p>Was für eine Reise! 🚀 Der Januar 2026 markiert für mich einen wichtigen Meilenstein: Ich habe meine Abschlussprüfung zum Fachinformatiker (Anwendungsentwicklung) bestanden.</p><p>Rückblickend bin ich besonders stolz darauf, wie ich die Zeit genutzt habe. Ich wollte nicht nur programmieren lernen, sondern das \"große Ganze\" verstehen. Wie interagieren Cloud-Strukturen? Wie setzen wir KI sinnvoll ein? Deshalb habe ich jede freie Minute genutzt, um Zertifikate zu sammeln (u.a. AWS & Data Science) und dieses Wissen direkt in echten Projekten zu testen.</p><p>Ich bin super zufrieden mit dem Ergebnis und gehe hochmotiviert in den nächsten Karriereabschnitt.<br>Auf geht's! 💪</p>",
                image: "assets/images/OffizielFachinformatiker.jpg",
                tags: ["Fachinformatiker", "Ausbildung2026", "Karrierestart", "CloudNative", "AI", "PassionForTech"]
            },
            {
                id: 3,
                title: "Jahresrückblick 2025",
                date: "Dec 2025",
                excerpt: "Mein Rückblick auf 2025. Im täglichen 'Tunnelblick' verliert man schnell das Gefühl dafür, was man eigentlich alles leistet.",
                content: "<p>Mein Rückblick auf 2025.</p><p>Im täglichen \"Tunnelblick\" verliert man schnell das Gefühl dafür, was man eigentlich alles leistet. Weil ich seit Jahren datenbasiert mit To-Do-Listen arbeite, habe ich mir die Fakten angesehen.</p><p>Die Analyse zeigt: 150 Stunden Training, über 100 Stunden Fokuszeit für den Ausbildungsabschluss und parallel die AWS-Zertifizierung.</p><p>Was ich daraus lerne? Erfolg ist kein einzelnes Event, sondern die Summe vieler kleiner, oft unsichtbarer Aufgaben. Wer die kleinen Schritte meistert, erreicht am Ende die großen Meilensteine.<br>Stolz auf dieses Fundament für meine Karriere als Fachinformatiker. 💻💪</p>",
                image: "assets/images/RückblickAuf2025.jpg",
                tags: ["CareerGrowth", "Fachinformatiker", "CloudComputing", "Discipline", "Review2025"]
            },
            {
                id: 4,
                title: "ITCS Köln Networking",
                date: "2025",
                excerpt: "Heute habe ich die ITCS IT-Messe in Köln besucht – und es war eine wirklich großartige Erfahrung.",
                content: "<p>Heute habe ich die ITCS IT-Messe in Köln besucht – und es war eine wirklich großartige Erfahrung.</p><p>Ich habe die Chance genutzt, mich mit so vielen Unternehmen wie möglich zu vernetzen und habe die von mir erstellte QR-Karte geteilt, die direkt zu meinem Lebenslauf und mehr über mich verlinkt. Es war schön zu sehen, dass viele diese Idee kreativ und nützlich fanden. 😄</p><p>Ich habe auch an einigen Tech-Vorträgen teilgenommen, die sehr interessant waren und mir neue Einblicke gaben.</p><p>Events wie dieses zeigen, wie wertvoll es ist, Unternehmen persönlich zu treffen, Ideen auszutauschen und echte Verbindungen aufzubauen.</p>",
                image: "assets/images/ITCS.jpg",
                tags: ["ITCS", "Networking", "TechConference", "CareerGrowth", "Cologne"]
            },
            {
                id: 5,
                title: "n8n und KI-Workshop",
                date: "2025",
                excerpt: "Heute hatte ich die Gelegenheit, an einem äußerst informativen Workshop zum Thema Automatisierung mit n8n und KI-Agenten teilzunehmen...",
                content: "<p>Heute hatte ich die Gelegenheit, an einem äußerst informativen Workshop zum Thema Automatisierung mit n8n und KI-Agenten teilzunehmen, der von Elias Jelinek von Place Beyond Bytes geleitet wurde.</p><p>Es war beeindruckend zu sehen, wie komplexe Prozesse mit Tools wie n8n und lokalen KI-Modellen (Ollama) automatisiert werden können. Die praktischen Anwendungsfälle waren besonders hilfreich und haben viele neue Ideen angestoßen.</p><p>Ich kann diesen Workshop jedem wärmstens empfehlen, der tiefer in dieses Thema einsteigen möchte.</p><p>Ein großes Dankeschön für die wertvollen Einblicke!</p>",
                image: "assets/images/workshopAI.jpg",
                tags: ["Automation", "n8n", "AI", "ArtificialIntelligence", "WorkflowAutomation", "Ollama"]
            },
            {
                id: 6,
                title: "Einstellung zu KI",
                date: "2025",
                excerpt: "🤖 Habt keine Angst vor KI. Lernt sie. Nutzt sie. Wachst mit ihr. Viele Menschen sagen immer noch...",
                content: "<p>🤖 Habt keine Angst vor KI. Lernt sie. Nutzt sie. Wachst mit ihr.</p><p>Viele Menschen sagen immer noch:<br>„KI wird uns die Arbeitsplätze wegnehmen…“</p><p>Aber vielleicht ist die bessere Frage:<br>„Wie kann ich KI nutzen, um meine Arbeit besser, schneller und intelligenter zu machen?“</p><p>💡 Die Wahrheit ist:<br>KI ist nicht hier, um dich zu ersetzen.<br>Sie ist hier, um dich zu unterstützen, deinen Workflow zu verbessern und dich von sich wiederholenden Aufgaben zu befreien, damit du dich auf das konzentrieren kannst, was wirklich zählt – Kreativität, Entscheidungsfindung, Innovation.</p><p>✅ Wenn du in Design, Code, Marketing, Schreiben, Vertrieb arbeitest…<br>Kann KI dein bester Assistent sein – nicht dein Feind.<br>Aber nur, wenn du bereit bist, sie zu lernen.</p><p>Diejenigen, die in dieser neuen Ära wachsen, werden nicht diejenigen sein, die sich dem Wandel widersetzen, sondern diejenigen, die sich mit ihm anpassen.</p><p>🔁 Also hab keine Angst.<br>Sei neugierig.<br>Erkunde Tools.<br>Probiere Dinge aus.<br>Stelle Fragen.</p><p>Die Zukunft ist nicht KI vs. Mensch.<br>Es ist Mensch + KI, die zusammenarbeiten.</p>",
                image: "assets/images/dontFearAI.jpg",
                tags: ["AI", "Mindset", "FutureOfWork", "Productivity", "Growth", "ArtificialIntelligence", "WorkSmarter"]
            },
            {
                id: 7,
                title: "Digitales Wohlbefinden & Kurzvideos",
                date: "2025",
                excerpt: "⚠️ Die süchtig machendste Falle unserer Zeit: Reels, Shorts & endloses Scrollen ⚠️",
                content: "<p>⚠️ Die süchtig machendste Falle unserer Zeit: Reels, Shorts & endloses Scrollen ⚠️</p><p>Lass uns für eine Sekunde ehrlich sein.<br>Reels, TikToks, Shorts – sie machen nicht nur Spaß.<br>Sie sind gefährlich. Nicht physisch, sondern mental. 🧠</p><p>Du öffnest die App, um „nur kurz nachzuschauen“.<br>30 minute später hast du 50 zufällige Clips gesehen. Du hast gelacht, dich vielleicht inspirieren lassen, vielleicht auch nicht.<br>Aber was hast du wirklich gewonnen?</p><p>Die Wahrheit ist:<br>👉 Du bist nicht reingegangen, um zu lernen<br>👉 Du bist nicht mit einem Ziel reingegangen<br>👉 Du bist einfach in die Schleife geraten – wie Millionen jeden Tag</p><p>Und der gruseligste Teil?<br>Du hast gar nicht gemerkt, wie schnell diese Zeit verschwunden ist.<br>Genau so sind diese Plattformen konzipiert – um deine Aufmerksamkeit ohne Erlaubnis zu stehlen.</p><p>🧠 Was es mit deinem Gehirn macht:<br>- Trainiert dich, sich nach ständiger, schneller Stimulation zu sehnen<br>- Zerstört Fokus und tiefes Nachdenken<br>- Ersetzt qualitativ hochwertige Informationen durch Lärm<br>- Baut eine Gewohnheit auf, dem Leben zu entfliehen, anstatt es zu verbessern</p><p>Die Leute sagen „es ist nur zum Spaß“.<br>Aber wenn es zur Gewohnheit wird – Stunden am Tag, jeden Tag – ist es kein Spaß mehr.<br>Es ist eine Falle.</p><p>Hier geht es nicht darum, technologiefeindlich oder gegen soziale Medien zu sein.<br>Es geht darum, sich dessen bewusst zu sein.<br>Denn sobald du dir dessen bewusst bist, kannst du wählen, was du konsumierst – und aufhören, davon konsumiert zu werden.</p><p> 📵 Frage dich das nächste Mal:<br>„Hilft mir das, zu wachsen, oder hilft es mir nur, Zeit zu verschwenden?“</p>",
                image: "assets/images/endlessScrolling.jpg",
                tags: ["DigitalWellness", "Mindset", "Focus", "ReelsTrap", "AttentionEconomy", "Productivity", "SelfAwareness"]
            },
            {
                id: 8,
                title: "FOMO und Trends vermeiden",
                date: "2025",
                excerpt: "💭 Hast du jemals das Gefühl, dem neuesten Trend folgen zu müssen? 💭 Jedes Mal, wenn du Social Media öffnest...",
                content: "<p>💭 Hast du jemals das Gefühl, dem neuesten Trend folgen zu müssen? 💭<br>Jedes Mal, wenn du Social Media öffnest, ist es, als würden alle dasselbe tun –<br>Und du fängst an zu denken: „Sollte ich das auch tun?“<br>Das ist die Kraft von FOMO (Fear of Missing Out / Angst, etwas zu verpassen) – sie bringt uns dazu, mitmachen zu wollen, selbst wenn wir nicht wissen, warum.</p><p>Aber hier ist etwas, das ich mich in letzter Zeit gefragt habe:<br>Will ich diesem Trend wirklich folgen, oder tue ich es nur, weil es alle anderen tun?</p><p>Hier ist, was mir klar wurde:<br> 🔸 Menschen zeigen sich online oft nur, um akzeptiert zu werden oder Likes zu bekommen.<br>🔸 Einige tun es, um das Gefühl zu haben, dazuzugehören, selbst wenn es nicht „ihr Ding“ ist.<br>🔸 Andere betrachten es als Flex – um aufzufallen oder cool zu wirken.</p><p>Aber die Wahrheit ist:<br>Der stärkste Flex ist, man selbst zu sein.<br>Das zu tun, was man liebt. Zu teilen, was einem wirklich wichtig ist.<br>Nicht einfach nur zu kopieren, was alle anderen tun!</p><p>Bevor du einem Trend folgst, frage dich:<br>👉 Bin das wirklich ich?<br>👉 Macht mir das Spaß?<br>👉 Oder tue ich es nur, weil es alle anderen tun?</p><p>Das bedeutet nicht, dass ich gegen Trends bin oder sie schlecht finde.<br>Einige Trends sind lustig, kreativ und inspirierend.<br>Ich denke nur, es ist wichtig, innezuhalten und nachzudenken – bevor man der Masse folgt. 🙌</p><p>Was denkst du? Folgst du Trends, weil sie dich begeistern – oder nur, um nicht außen vor zu sein?<br>Lass uns in den Kommentaren sprechen 👇</p>",
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
    }
};
