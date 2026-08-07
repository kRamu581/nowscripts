<p align="center">
<a href="https://nowscripts.in" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; color: #1f2937; font-family: sans-serif;">
  <img 
    src="client/public/logo.png" 
    alt="NowScripts Banner" 
    style="width: 160px; margin-right: 12px;"
  />
</a>
</p>

<h1 align="center">AI-Powered Personalized ServiceNow Ecosystem</h1>

<p align="center">
  <strong>Learn → Practice → Build → Get Certified → Crack Interviews → Get Jobs → Freelance</strong>
  <br />
  <br />
  <a href="https://nowscripts.in"><strong>Website</strong></a> ·
  <a href="https://github.com/kRamu81/nowscripts/wiki"><strong>Documentation</strong></a> ·
  <a href="https://discord.gg/nowscripts"><strong>Join our Discord Community</strong></a> ·
  <a href="https://github.com/kRamu81/nowscripts/issues"><strong>Report a Bug</strong></a>
</p>

---

**NowScripts** is an open-source, AI-powered educational ecosystem designed exclusively for the ServiceNow platform. Move beyond static documentation and fragmented learning by utilizing our end-to-end interactive modules, simulators, and AI companions that guide you from beginner concepts to advanced architectural scripting.

This repository contains the full source code for the NowScripts platform, allowing you to self-host, customize, and extend its capabilities. Whether you are an aspiring administrator, developer, or an enterprise looking to train your team, NowScripts provides the tools to do it efficiently.

NowScripts is proudly developed by **Kanam Ramu** and the NowScripts Community.

## ✨ Core Features

- 📚 **End-to-End Structured Learning**: Step-by-step guides and industry roadmaps tailored for varying expertise levels (CSA, CAD, and advanced implementations).
- 🧠 **NowScripts AI Copilot**: A highly specialized AI assistant integrated into the learning dashboard that answers technical questions, debugs scripts, and explains core ServiceNow APIs in real-time.
- 💻 **Interactive Simulators**: Practice configurations, workflows, and UI Policies in safe, browser-based environments without needing a live Personal Developer Instance (PDI).
- 🎙️ **AI Interview Platform (Upcoming)**: Prepare for rigorous technical interviews using our voice-conversational AI interviewer that asks dynamic scenario questions and evaluates your responses.
- 🚀 **Real-World Projects**: Build agile sprint projects and large-scale architectural implementations to mimic real-world enterprise development cycles.
- 🏆 **Certification Prep**: Over 1,000 curated mock questions simulating the ServiceNow CSA and CAD exams.
- 🔌 **Containerized Architecture**: Fully Dockerized (Nginx/PM2) providing lightning-fast rendering and perfect environment isolation.
- 🎨 **Premium UI/UX**: Built with React, Vite, Tailwind CSS, and Framer Motion to ensure an accessible, engaging, and premium SaaS experience.

## 🚀 Quick Start (Docker)

Get up and running in minutes using Docker for maximum performance and isolation.

### Prerequisites

- [Docker](https://docker.com) & Docker Compose
- [Git](https://git-scm.com)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/kRamu81/nowscripts.git
    cd nowscripts
    ```

2.  **Configure Environment Variables**
    Before starting, you must create `.env` files in both the `client` and `server` directories.
    ```bash
    cp client/.env.example client/.env
    cp server/.env.example server/.env
    ```
    Now, edit the `.env` files to add your necessary API keys (e.g., MongoDB URI, JWT secrets, and AI API keys).

3.  **Start with Docker Compose**
    ```bash
    # Start all services in the background (Frontend Nginx & Backend Node PM2)
    docker-compose up -d --build

    # To view live logs from all services
    docker-compose logs -f
    ```

4.  **Access the Application**
    - **Frontend UI**: `http://localhost:80`
    - **Backend API**: `http://localhost:5000`

---

## 🛠️ Local Development Setup (Without Docker)

For manual development without Docker, you can run the services using Node.js directly.

### Prerequisites
- Node.js (v20+)
- MongoDB Instance (local or Atlas)

### Starting the Servers

1. **Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

2. **Backend**
   ```bash
   cd server
   npm install
   npm run dev
   ```

---

## 🗺 Roadmap

- [x] **Phase 1**: Core learning platform, CSA/CAD prep, sprint projects, and Docker architecture.
- [ ] **Phase 2**: AI Personalized Roadmaps, AI Voice Interviews, Resume Analysis.
- [ ] **Phase 3**: Direct ServiceNow Integration, PDI Connection, AI Code Review.
- [ ] **Phase 4**: Full AI ServiceNow Development Assistant.

## 🤝 Contributing

We believe in the power of open source. Whether it's reporting a bug, suggesting a feature, or submitting a pull request, your contributions are always welcome! Ensure all contributions align with our core Design Principles: **Premium SaaS UI**, **Enterprise Quality**, and **User-Centric**.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<br/>
<p align="center">
  Built with ❤️ by Kanam Ramu and the NowScripts Community.
</p>
