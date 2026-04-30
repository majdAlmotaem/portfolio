# Password Manager

<!-- LOGO PLACEHOLDER -->
<p align="center">
  <img src="https://github.com/user-attachments/assets/a8bcccaa-3241-4cc6-9653-1470c7a43a17" alt="icon" width="128"/>
</p>

A modern, secure, and user-friendly password manager built with Python and Tkinter.

<!-- LIVE DEMO PLACEHOLDER -->
<p align="center">
  <b>Live Demo:</b><br>
  <img src="https://github.com/user-attachments/assets/7a7788f3-7275-4800-a2c8-efd7e1070bc2" alt="Live Demo GIF" width="600"/>
</p>

## Features

- Modern UI/UX: Dark theme, accent colors, and responsive dialogs.
- Secure Storage: All passwords are encrypted using your master password.
- Master Password Security: Master password is hashed (PBKDF2) and never stored in plain text.
- Registration: Sign up with username, email, and password (with confirmation and email validation).
- Password Vault: Add, view (with decryption), and delete passwords for different services.
- Password Strength: Responsive checklist for password strength during creation.
- Notes: Store additional notes with each password entry.
- Logout: Securely log out and return to the login screen.



## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository:

2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

### Database Setup

- The app will create a SQLite database (`data/vault.db`) on first run.

### Running the App

```sh
python main.py
```

## Security Notes

- Master password is never stored in plain text.
- All vault entries are encrypted with the master password.
- Passwords are only decrypted in memory when needed.

## Customization

- You can further enhance email validation or add more advanced registration features as needed.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

## lessons learned/new technologies used

the goal from this project to learn more about security and hashing for users information and data. the technologies i used are python and tkinter and sqlite 


<div align="center">
  <h1>Lazy Controller</h1>
  <p align="center">
  <img src="PcServerApp\icon.ico" alt="icon" width="128"/>
  </p>
  <p>A futuristic, seamless way to control your PC directly from your Android phone.</p>
</div>

## 📋 What is this app?

**Lazy Controller** is a remote control application that transforms your Android smartphone into a wireless mouse, keyboard, and media controller for your Windows PC.

Whether you are watching a movie from bed, giving a presentation, or just want to navigate your computer without sitting at the desk, you can easily control your PC over your local Wi-Fi network.

### ✨ Features

- **Mouse Control:** Move the cursor, scroll, and click with a highly responsive trackpad.
- **Keyboard Navigation:** Arrow keys for quick media or presentation control.
- **Media & System:** Adjust your PC's volume or even shut down your computer remotely.
- **Modern UI:** A clean, futuristic dark/neon cyber-design for both mobile and desktop.

---

## 📸 Screenshots

<p align="center">
  <img src="androidApp.jpg" alt="Android App Preview" width="250"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="desktopApp.png" alt="Desktop Server Preview" width="450"/>
</p>

---

## 🚀 Download & Install

We have created a simple, dedicated webpage where you can download the latest versions of both the Android App and the Windows Server.

**📥 [CLICK HERE TO VISIT THE DOWNLOAD PAGE](https://majdAlmotaem.github.io/mouseApp/)**

### How to use:

1. **Download the Windows Server (`.exe`)** from the website and run it on your PC.
2. Click **"Start Server"** on the PC app. It will display your local IP address.
3. **Download and install the Android App (`.apk`)** on your phone.
4. Open the mobile app, enter the IP address shown on your PC, and tap Connect!

_(Note: Both your phone and PC must be connected to the same Wi-Fi network. Ensure your Windows Firewall allows the application to communicate over the network on port 9999 ._

---

## 📄 License

This project is open-source and available under the **MIT License**. See the [LICENSE](LICENSE) file for more details.


## lessons learned/new technologies used
how to develop an android app and a desktop app and how to make them communicate with each other using sockets and how to make a website to host my app and download it.
the technologies i used are python and tkinter and sqlite and android studio and github pages


# Memory Game 🎮

<p align="center">
  <img src="https://github.com/user-attachments/assets/62c24c08-c13c-41c9-99ea-4c5b20187b04" alt="memorygame-round-192">
</p>



A fun and challenging memory card matching game built with Python and Toga. Test your memory skills across multiple levels while enjoying a sleek dark-themed interface.

## Features ✨

- 🎯 Multiple difficulty levels
- 💖 Lives system with 3 hearts
- 🌙 Modern dark theme interface
- 🎨 Colorful card symbols
- ⏱️ Preview period for memorizing cards
- 🔄 Reset game functionality

## How to Play 🎲

1. Click "Start Game" to begin
2. You'll see all cards revealed for 5 seconds - memorize their positions!
3. Cards will flip face down after the preview
4. Click pairs of cards to find matches
5. Match all pairs to complete the level
6. Be careful! You lose a heart for each wrong match
7. Complete levels to progress and increase difficulty

## Screenshots 📸

<p align="center">
  <img src="https://github.com/user-attachments/assets/b989def0-1d36-4b14-8844-f118d186fef0" alt="Screenshot_20250108-140921" width="25%">   

  <img src="https://github.com/user-attachments/assets/d8826c65-8ca5-4e4b-9b38-c646652281fb" alt="Screenshot_20250108-140913" width="25%" >
</p>



## Controls 🎮

- Click "Start Game" to begin a new game
- Click "Reset Game" to start over
- Click on cards to flip them
- Match pairs to progress

## Lives System ❤️

- Start with 3 hearts
- Lose a heart for each wrong match
- Game over when all hearts are lost
- Hearts reset when starting a new level

## Levels 🏆

Progress through challenging levels:

- Level 1: Basic matching
- Each level increases difficulty
- Maximum level: 10
- More symbols and combinations in higher levels

## Tips for Success 💡

1. Take full advantage of the preview period
2. Focus on remembering card positions
3. Take your time - there's no timer pressure
4. Try to remember multiple card positions at once

## Technical Requirements 🔧

- Python 3.x
- Toga library
- BeeWare toolkit

Enjoy the game and challenge your memory skills! 🎉


## lessons learned/new technologies used
somtimes it's fun to make a game, i used the toga library to make a game and it was a good experience, i also learned how to use the BeeWare toolkit to make a game.

# 🗣️ Real-Time Speech-to-Command (Voice Control App)

<p align="center">
  <img src="https://github.com/user-attachments/assets/c2da5d98-2f75-4d11-b663-35ba9ac9727d" alt="logo" width="200"/>
</p>



Welcome to the **Real-Time Speech-to-Command** project — a voice control application that transcribes spoken commands in real-time and executes corresponding actions on your computer.

---

## 🚀 Project Overview

This project started as an experiment to explore **live speech-to-text** using AI models, and evolved into a desktop assistant that could control apps using voice commands like:

- **"Open notepad"**
- **"Scroll down"**
- **"Start typing"**

It was designed with a **focus on responsiveness**, aiming for low-latency transcription and accurate command recognition.

---

## 🧑‍💻 Features

- Real-time speech recognition
- Execute common system commands via voice
- Typing mode for dictating text
- Fuzzy matching for flexible command interpretation
- Multi-language support with switchable AI models

---

## 📸 Screenshot

![Screenshot 2025-03-21 234039](https://github.com/user-attachments/assets/5452855d-18d6-4331-b830-96c58b21c934)


---

## 📜 Development Journey

### 🌀 Initial Version: **Whisper by OpenAI**

The project began using **OpenAI’s Whisper** for speech recognition. Whisper offered **excellent transcription quality**, especially for longer audio files.

However, it came with significant drawbacks for live use:

- **High latency** for real-time transcription.
- **External dependency on FFmpeg**, which complicated installation and portability.
- Heavy CPU usage with larger models.

---

### ⚡ Transition to Faster-Whisper

To improve speed and reduce system resource usage, the project migrated to **Faster-Whisper**, a faster implementation with GPU support.

> 🎯 **Goal:** Real-time command execution without noticeable delays.

**Improvements:**
- Lower latency.
- Lighter system load.

But... despite these improvements, **Whisper (even Faster-Whisper)** proved **unreliable for real-time voice command recognition** due to its design for batch processing rather than streaming audio.

---

## 🧠 Lessons Learned

- Gained **deep insight into Whisper models**, their performance trade-offs, and deployment requirements.
- Learned **how to choose the best AI model** based on application needs: 
  - Large models = high accuracy, slow
  - Small models = fast, less accurate
- Understood the limitations of general-purpose ASR (automatic speech recognition) in **live control scenarios**.


---

## ❌ Project Status: Canceled

---

## 📄 License

This project is licensed under the **MIT License** — free for both personal and commercial use. See the [LICENSE](LICENSE) file for details.

lessons learned:

the hard truth about real-time speech recognition: the models are not designed for real-time voice command recognition, they are designed for batch processing of audio files.


# DiscordBot-GithubIssues

A Discord bot that helps bridge the gap between Discord conversations and GitHub issue tracking. This bot allows users to create GitHub issues directly from Discord and view existing issues in repositories.

## Features

### Current Functionality

- **Create GitHub Issues**: Generate links to create new issues in GitHub repositories directly from Discord
- **View Open Issues**: Display a list of open issues for a specific GitHub repository
- **Command Help**: Built-in help system to guide users on available commands

### Commands

- `!hilfe` - Displays help information about the bot
- `!issue [username/repository] [issue title]` - Creates a link to open a new GitHub issue
- `!show_issues [username/repository]` - Shows up to 10 open issues from a GitHub repository

## Screenshots

### Help Command

![image](https://github.com/user-attachments/assets/b0729fbf-5edf-45f9-a12f-2466dd61b527)


### Issue Creation

![image](https://github.com/user-attachments/assets/7b61c193-f1f2-492b-9454-c3a0978759e8)


### Viewing Repository Issues

![image](https://github.com/user-attachments/assets/b754044f-1846-40b1-a61d-9a47f5ee4f80)


## Current State

This bot is currently in a functional prototype state. It provides basic GitHub issue management capabilities but has room for expansion. The bot currently:

- Uses Discord.py for bot functionality
- Interacts with GitHub's API to fetch issue data
- Provides formatted embeds for better user experience

## Future Development Opportunities

The bot could be enhanced with:

1. **Authentication**: Add GitHub authentication to allow creating issues directly instead of just links
2. **Issue Details**: Allow users to add descriptions, labels, and assignees when creating issues
3. **Issue Comments**: Enable viewing and adding comments to existing issues
4. **Webhook Integration**: Set up notifications in Discord when GitHub issues are updated
5. **Repository Management**: Add commands to manage repositories and view repository statistics
6. **User Settings**: Allow users to set default repositories for quicker issue creation
7. **Slash Commands**: Implement Discord's slash command functionality for better user experience
8. **Error Handling**: Improve error messages and validation for better user feedback

## Installation

1. Clone this repository:

```bash
git clone https://github.com/majdAlmotaem/DiscordBot-GithubIssues.git
```

2. Install required dependencies:

```bash
pip install discord.py requests
```

3. Configure your Discord bot token in the code

4. Run the bot:

```bash
python discord_bot.py
```

## Usage

1. Invite the bot to your Discord server
2. Use `!hilfe` to see available commands
3. Create issues with `!issue [username/repository] [issue title]`
4. View repository issues with `!show_issues [username/repository]`

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

Majd Almotaem


## lessons learned/new technologies used:

how to develop a discord bot and how to use the discord.py library and how to use the github api.


# Loky AI

![Loky AI](https://img.shields.io/badge/Loky-AI%20Image%20Generator-purple)
![License](https://img.shields.io/badge/license-MIT-blue)

Loky AI is a locally-hosted AI image generation application that allows you to create images from text descriptions using state-of-the-art diffusion models. The application features a chat-like interface for a seamless user experience.

<img src="https://github.com/user-attachments/assets/75874fd0-2cf9-4914-8485-65079f1f968f" alt="Loky AI Screenshot" />


## Features

- **Text-to-Image Generation**: Create images from textual descriptions
- **Multiple Models**: Choose between high-quality (SDXL) or faster generation (Realistic Vision)
- **Chat Interface**: Intuitive chat-like experience for generating images
- **Image History**: Keep track of your generated images
- **Local Execution**: All processing happens on your local machine for privacy

## System Requirements

### Minimum Requirements

- **CPU**: Modern multi-core processor (Intel i5/i7 or AMD Ryzen 5/7)
- **RAM**: 16GB
- **Storage**: 20GB free space
- **OS**: Windows 10/11, macOS, or Linux

### Recommended Requirements

- **GPU**: NVIDIA GPU with at least 6GB VRAM (GTX 1660 or better)
- **CUDA**: CUDA 11.8 or newer
- **RAM**: 32GB
- **Storage**: 50GB SSD

## Installation

### Prerequisites

- Python 3.10 or newer
- Git
- CUDA Toolkit (for GPU acceleration)

### Step 1: Clone the Repository

```bash
git clone https://github.com/majdAlmotaem/Loky.git
cd Loky
```

### Step 2: Create a Virtual Environment

```bash
python -m venv venv
```

### Step 3: Activate the Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

macOS/Linux:

```bash
source venv/bin/activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Run the Application

Start the backend server:

```bash
python backend/app.py
```

Open `frontend/index.html` in your web browser, or serve it using a simple HTTP server:

```bash
cd frontend
python -m http.server
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

1. Select a model from the dropdown menu (Stable Diffusion XL for higher quality or Realistic Vision for faster generation)
2. Type your image description in the text input
3. Press Enter or click the send button
4. Wait for the AI to generate your image
5. Continue the conversation with more image requests

### Example Prompts

- "A serene lakeside cabin at sunset with mountains in the background"
- "Portrait of a middle-aged man with salt and pepper beard, wearing a business suit"
- "A bustling city street in Tokyo at night with neon signs and rain-slicked pavement"
- "Close-up of a monarch butterfly on a purple flower with dew drops"

## Troubleshooting

### Common Issues

1. **"CUDA out of memory" error**

   - Try using a smaller model or reducing the image resolution
   - Close other GPU-intensive applications

2. **Slow generation times**

   - Ensure you're using GPU acceleration
   - Try the Realistic Vision model which is faster
   - Reduce the number of inference steps in the backend code

3. **"xformers not available" warning**

   - Install xformers with `pip install xformers`
   - Ensure your PyTorch and CUDA versions are compatible with xformers

4. **Images not displaying**
   - Check browser console for errors
   - Ensure the backend server is running
   - Check network tab in developer tools for response errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hugging Face Diffusers](https://github.com/huggingface/diffusers) for the diffusion models
- [Stable Diffusion XL](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0) by Stability AI
- [Realistic Vision](https://huggingface.co/SG161222/Realistic_Vision_V5.1_noVAE) by SG161222

## Contact

Majd Almotaem - [GitHub](https://github.com/majdAlmotaem)

````

LICENSE
MIT License

Copyright (c) 2024 Majd Almotaem

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## lessons learned/new technologies used:

how to develop a local AI image generation application and how to use the diffusers library and how to use the stable diffusion xl model and how to use the realistic vision model and how to use the 


# Stock API - Crypto Live Data & Power BI Dashboard

A Python script that fetches live cryptocurrency prices (Bitcoin, Ethereum, Solana) in EUR from the CoinGecko API, logs them to a CSV file, and serves as a continuous data source for live, interactive diagrams in Power BI.

## Features
* Fetches real-time prices for Bitcoin, Ethereum, and Solana in EUR.
* **Power BI Integration:** Acts as a live data feed to visualize price trends and market movements in Power BI dashboards.
* Displays prices in a formatted pandas DataFrame within the console.
* Continuously saves and appends data to `crypto_live_data.csv`.
* Includes a timestamp of the last update for precise time-series tracking.
* Built-in error handling for API requests.

## Requirements
* Python 3.7 or higher
* `requests` library
* `pandas` library
* **Power BI Desktop** (to build and view the live diagrams)

## Installation
1. Clone or download this repository:
   
```bash
   git clone <repository-url>
   cd Stock_API

## lessons learned/new technologies used:

how to fetch real-time cryptocurrency prices and how to use the coin gecko api and how to use the pandas library and how to use the power bi desktop.

# clickShare

**Project Status: In Progress** 🚀

## Overview

clickShare is a modern web application that allows users to create, manage, and share posts across multiple social media platforms. Built with Node.js and Express, it provides a centralized dashboard for content creators to draft, schedule, and publish content to their connected social accounts.

## Features

- **User Authentication**: Secure registration and login with email/password
- **Social Account Integration**: Connect Google and Facebook accounts via OAuth 2.0
- **Post Management**: Create, edit, delete, and manage posts
- **Draft System**: Save posts as drafts before publishing
- **Multi-Platform Publishing**: Share posts to connected social accounts
- **User Dashboard**: Centralized view of all posts and account activity
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL
- **Authentication**: Passport.js with OAuth 2.0
- **Session Management**: express-session
- **Templating**: EJS

### Frontend
- **Template Engine**: EJS
- **Styling**: CSS

### Additional Libraries
- **File Upload**: Multer
- **Password Encryption**: bcryptjs
- **Environment Config**: dotenv

## Project Structure

```
clickShare/
├── config/              # Configuration files
│   ├── db.js           # Database connection
│   └── passport.js     # Passport authentication setup
├── controllers/         # Route controllers
│   ├── authController.js
│   ├── pageController.js
│   └── postController.js
├── middleware/         # Custom middleware
│   └── authMiddleware.js
├── models/            # Database models
│   └── user.js
├── public/            # Static assets
│   ├── css/
│   ├── images/
│   └── uploads/
├── routes/            # Route definitions
│   ├── authRoutes.js
│   ├── pageRoutes.js
│   └── postRoutes.js
├── views/             # EJS templates
│   ├── partials/      # Reusable components
│   └── [page templates]
├── server.js          # Application entry point
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/majdAlmotaem/clickShare.git
   cd clickShare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/clickshare
   SESSION_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   ```

4. **Initialize the database**
   ```bash
   node server.js
   ```

### Running the Application

**Development Mode** (with auto-restart):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-restart on file changes)

## Features in Development

- [ ] Post scheduling
- [ ] Analytics dashboard
- [ ] Multiple language support
- [ ] Advanced post filtering
- [ ] User profile customization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License - See LICENSE file for details

## Author

Majd Al-Motaem

## Support

For issues and feature requests, please visit [GitHub Issues](https://github.com/majdAlmotaem/clickShare/issues)

## lessons learned/new technologies used:

how to develop a web application and how to use the node.js library and how to use the express.js library and how to use the postgresql database and how to use the passport.js library and how to use the ejs library.
