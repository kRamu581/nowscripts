# NowScripts Software Architecture (Phase 1)

This document outlines the **modular software architecture** for NowScripts Phase 1. By structuring the platform into distinct, decoupled modules, we ensure high scalability and simplify task allocation across distributed teams of contributors.

---

## 1. Modular Breakdown (Phase 1)

The platform is divided into **9 independent modules**. This structure isolates domains, making it easier to assign each module to different contributors while keeping the system scalable for future freelance phases.

```mermaid
mindmap
  root((NowScripts Phase 1))
    Auth[🔒 1. Authentication]
      Login
      Register
      Google Auth
      User Roles
    Learn[📚 2. Learning]
      Roadmaps
      Course Modules
      Lesson Viewer
      Markdown Content
      PDFs & Notes
    Dash[📊 3. User Dashboard]
      Profile
      Learning Progress
      Skill Badges
      Activity History
    AI[🤖 4. AI Module]
      Learning Companion
      Roadmap Generator
      Doubt Solver
      AI Recommendations
    Proj[🚀 5. Projects]
      Sprint Projects
      Tasks
      Assignments
      Submission & Eval
    Comm[💬 6. Community]
      Discussions
      Feedback
      Announcements
      Leaderboard
    Prep[🎯 7. Interview Prep]
      CSA Questions
      CAD Questions
      Mock Tests
      Scenarios
    Admin[⚙️ 8. Admin]
      User Mgmt
      Course Mgmt
      Content Mgmt
      Project Mgmt
      Analytics
    Sys[🛠️ 9. System]
      Notifications
      Search
      Settings
      Logs
```

---

## 2. Contributor Allocation

Mapping the 9 modules to specific engineering and content roles to parallelize development.

| Module | Primary Role | Secondary Role |
| :--- | :--- | :--- |
| **Authentication** | Full Stack Developer | Security Engineer |
| **Learning** | ServiceNow Developer | Content Creator |
| **Dashboard** | Frontend Developer | UI/UX Designer |
| **AI** | AI/ML Engineer | Backend Developer |
| **Projects** | ServiceNow Developer | Content Creator |
| **Community** | Full Stack Developer | Community Manager |
| **Interview Prep**| Content Creator | ServiceNow Architect |
| **Admin** | Full Stack Developer | Data Analyst |
| **System Services**| Backend Developer | DevOps Engineer |

---

## 3. Technology Allocation

The technology stack supporting Phase 1, categorized by domain.

```mermaid
graph LR
    subgraph Frontend
        React[React]
        TS[TypeScript]
        TW[Tailwind CSS]
        UI[ShadCN UI]
        FM[Framer Motion]
    end

    subgraph Backend
        Node[Node.js]
        Exp[Express]
        DB[(MongoDB)]
        JWT[JWT Auth]
    end

    subgraph AI [Artificial Intelligence]
        Sarvam[Sarvam APIs]
        LLM[OpenAI / LLMs]
        RAG[RAG Architecture]
        Voice[Voice AI]
    end

    subgraph DevOps [DevOps & Infra]
        Render[Render Cloud]
        CICD[GitHub Actions]
        Storage[(Cloud Storage)]
    end

    Frontend -.-> Backend
    Backend -.-> AI
    Backend -.-> DevOps
```

---

## 4. Phase 1 Component Architecture

The flow of data and interaction between the core system components. 

```mermaid
graph TD
    Client((Client: React)) --> Auth{Authentication}
    Auth --> Dash[Dashboard]
    
    Dash --> Learn[Learning Module]
    Dash --> AI[AI Companion]
    Dash --> Comm[Community]
    
    Learn --> Proj[Sprint Projects]
    Learn --> Prep[Interview Prep]
    
    Proj --> Prog[Progress & Badges]
    Prep --> Prog
    
    Prog --> Admin[Admin Panel]
    
    Admin --> DB[(MongoDB + AI APIs)]
    
    %% Styling
    style Client fill:#f8fafc,stroke:#3b82f6,stroke-width:2px,color:#0f172a
    style Auth fill:#eff6ff,stroke:#2563eb,stroke-width:2px
    style Dash fill:#f1f5f9,stroke:#64748b,stroke-width:2px
    style Learn fill:#fdf4ff,stroke:#d946ef,stroke-width:2px
    style AI fill:#fdf4ff,stroke:#d946ef,stroke-width:2px
    style Comm fill:#fdf4ff,stroke:#d946ef,stroke-width:2px
    style Proj fill:#fff1f2,stroke:#f43f5e,stroke-width:2px
    style Prep fill:#fff1f2,stroke:#f43f5e,stroke-width:2px
    style Prog fill:#ecfeff,stroke:#06b6d4,stroke-width:2px
    style Admin fill:#fffbeb,stroke:#d97706,stroke-width:2px
    style DB fill:#f0fdf4,stroke:#22c55e,stroke-width:2px
```

> [!NOTE]
> This architecture ensures that as the platform matures from an EdTech learning hub into a dual-sided Freelance marketplace, the core micro-frontends and backend services remain completely decoupled and easily extensible.
