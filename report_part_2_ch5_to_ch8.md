# NowScripts: AI-Powered Personalized ServiceNow Ecosystem
## B.Tech Final Year Project Report - Part 2 (Chapters 5 - 8)

---

# Chapter 5 – Database Design

## 5.1 Introduction to Database Architecture
NowScripts relies on MongoDB, a NoSQL, document-oriented database. Unlike traditional relational databases (like MySQL) that use rigid tables, MongoDB uses flexible, JSON-like documents. This is uniquely suited for an EdTech platform where the structure of courses, question banks, and AI conversation histories can vary greatly. To ensure data integrity, we implemented Mongoose as an Object Data Modeling (ODM) library within the Node.js environment.

## 5.2 ER Diagram (Conceptual)
*(In the physical report, include a graphical Entity-Relationship Diagram here. Textual representation below)*
- **Entity: User**
  - Attributes: UserID (PK), Name, Email, PasswordHash, Role, CreatedAt.
  - Relationships: Has one `Profile`, has many `ProgressMetrics`.
- **Entity: Course**
  - Attributes: CourseID (PK), Title, Category, Difficulty.
  - Relationships: Contains many `Modules`.
- **Entity: QuestionBank**
  - Attributes: QuestionID (PK), Category (e.g., CSA, Scenario), Type, Text, Options, Answer.
  - Relationships: Accessed by many `Users` during practice tests.

## 5.3 Database Schema & Table Design

### 5.3.1 User Schema
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (Unique, Indexed)",
  "password": "String (Hashed)",
  "role": "String (Enum: ['student', 'admin'])",
  "badges": ["Array of Strings"],
  "progress": {
    "csa_completed": "Number",
    "cad_completed": "Number"
  },
  "created_at": "Date"
}
```
*Design Justification*: Embedding progress metrics directly within the User schema avoids expensive JOIN operations (or `$lookup` in MongoDB) when loading the user's dashboard, ensuring high performance.

### 5.3.2 QuestionBank Schema
```json
{
  "_id": "ObjectId",
  "category": "String (e.g., 'csa', 'scenario')",
  "question_text": "String",
  "question_type": "String (Enum: ['multiple_choice', 'short_answer'])",
  "options": ["Array of Strings"],
  "correct_options": ["Array of Strings"],
  "explanation": "String"
}
```
*Design Justification*: Storing options as an array of strings allows frontend components to dynamically map over the array and render radio buttons or checkboxes. The `explanation` field is crucial for the educational aspect of the platform.

## 5.4 Data Normalization vs. Denormalization
In traditional SQL databases, Third Normal Form (3NF) is strictly applied to minimize redundancy. However, in MongoDB, data that is frequently accessed together is typically embedded (denormalized). For example, rather than storing a user's earned badges in a separate collection, they are embedded in the User document. This heavily optimizes the read performance for the `User Dashboard` module.

---

# Chapter 6 – Module Design

## 6.1 Authentication Module
The authentication system is the security gateway of NowScripts. 
- **Registration**: Accepts user details, validates email format, hashes the password using `bcrypt.js`, and stores the document.
- **Login**: Compares the provided password against the hash. If successful, signs a JSON Web Token (JWT) with the user's `_id` and `role`.
- **Authorization**: The frontend stores the JWT (in local storage or secure cookies) and attaches it as a Bearer token in the `Authorization` header of subsequent API calls. Backend middleware (`protectRoute`) intercepts and validates this token.

## 6.2 User Dashboard Module
The central hub for logged-in users. It aggregates data from the user profile and renders progress rings and skill badges. It provides quick navigation links to resume the last accessed learning module or practice test.

## 6.3 Learning & Roadmaps Module
This module renders the educational content. Roadmaps are hierarchical: `Track -> Course -> Module -> Topic`. The frontend parses JSON-based content trees and renders an interactive sidebar (Table of Contents) alongside the main reading area. Markdown support is built-in to render code blocks correctly.

## 6.4 Practice Module (CSA, CAD, Scenarios)
A critical feature of Phase 1. Users navigate to `/interview-prep/:category`.
- The React component queries the `/public/content/interview-prep/index.json` registry.
- It dynamically loads the specific JSON data file (e.g., the 71-page scenario question bank).
- The UI presents questions with "Check Answer" and "Show Explanation" toggles. This immediate feedback loop is essential for mastery.

## 6.5 Projects Module
Bridges the gap between theory and practice. The module presents Agile "Sprints". Each project includes a scenario (e.g., "Build an HR Onboarding App in App Engine Studio"), specific business requirements, and acceptance criteria. Users can mark sprints as complete, advancing their progress bar.

## 6.6 Admin Panel Module
Restricted to users with `role === 'admin'`. It provides a dashboard to monitor total platform users, recent signups, and allows the admin to edit course data without directly interacting with the MongoDB command line.

---

# Chapter 7 – AI Features

## 7.1 Introduction to NowScripts AI Ecosystem
The differentiator for NowScripts is its specialized, multi-layered Artificial Intelligence. Rather than relying on generic bots, NowScripts employs strictly prompt-engineered models designed exclusively for ServiceNow.

## 7.2 NowScripts Copilot (Platform Assistant)
- **Purpose**: To assist users in navigating the NowScripts platform itself.
- **Functionality**: If a user asks "Where can I find CSA questions?", the Copilot responds with direct links to the Practice module.
- **Implementation**: The LLM is provided a system prompt containing a map of the platform's routes and features.

## 7.3 AI Learning Assistant (ServiceNow Expert)
- **Purpose**: To provide deep, technical ServiceNow mentorship.
- **Functionality**: Users can ask complex architectural questions (e.g., "Why is my async Business Rule not triggering?").
- **System Prompt Design**: The AI is instructed: "You are a Senior Technical Architect for ServiceNow. You must prioritize ServiceNow best practices. Never recommend querying the database from a Client Script; always suggest GlideAjax." This level of specific prompt engineering ensures the AI provides enterprise-grade advice, not beginner mistakes.
- **UI Integration**: A floating chatbot interface implemented using Framer Motion for smooth opening/closing animations, providing an omnipresent tutor throughout the application.

## 7.4 AI Interview Platform (Architecture for Phase 2)
The most ambitious AI feature is the Interview Simulator.
- **Audio Capture**: The browser's `MediaRecorder` API captures user audio.
- **Speech-to-Text (STT)**: Audio is sent via WebSocket to a transcription service (e.g., Whisper API).
- **LLM Evaluation**: The transcribed text is fed to the LLM, which compares the user's spoken answer against the technical standard for the scenario question.
- **Text-to-Speech (TTS)**: The LLM's follow-up question is converted back to audio and played for the user.
- **Scorecard**: Post-interview, the system generates a JSON object representing the user's performance metrics (Technical Accuracy, Communication, Best Practices).

---

# Chapter 8 – Implementation

## 8.1 Frontend Implementation
The frontend is built on **React 18** using **Vite** as the build tool. Vite provides significantly faster Hot Module Replacement (HMR) than traditional Create React App (Webpack), drastically speeding up developer velocity.
- **Styling**: **Tailwind CSS** is utilized for utility-first styling. This allowed the creation of a design system with consistent primary colors, dark mode support, and glassmorphism effects (e.g., `backdrop-blur-md`, `bg-opacity-50`).
- **Icons**: `lucide-react` is used for lightweight, consistent SVG iconography.
- **SEO**: `react-helmet-async` is implemented to dynamically change the `<title>`, meta descriptions, and JSON-LD schema markup per page, ensuring Google indexing compatibility.

## 8.2 Backend Implementation
The backend is an **Express.js** application running on **Node.js**. 
- **Routing**: Routes are compartmentalized (e.g., `userRoutes.js`, `courseRoutes.js`).
- **Middleware**: `cors` allows cross-origin requests from the React frontend. `express.json()` parses incoming request bodies.

## 8.3 State Management
React's inherent state management (`useState`, `useEffect`, `useContext`) was sufficient for Phase 1. A global context provider (`AuthContext`) wraps the application to provide user session data to any nested component without prop drilling.

## 8.4 Security Implementation
- Passwords are never stored in plain text.
- API endpoints dealing with user-specific data require a valid JWT.
- CORS is configured to only allow requests from the trusted frontend origin.

*(End of Part 2)*
