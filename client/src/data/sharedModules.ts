export type TrackItemType = 'topic' | 'project' | 'mock-interview' | 'milestone' | 'pdf';

export interface TrackItem {
  type: TrackItemType;
  id: string;
  title: string;
  description?: string;
  pdfUrl?: string;
};

export type Module = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description: string;
  keyTakeaway: string;
  color: string;
  icon: string;
  items: TrackItem[];
};

export type Track = {
  id: string;
  slug: string;
  title: string;
  modules: Module[];
};

const csaModules: Module[] = [
  {
    id: "it-basics",
    title: "IT Basics",
    level: "Beginner",
    description: "Understand basic IT concepts before touching ServiceNow. Written by Md Afan Khan. (Updated: August 6, 2026)",
    keyTakeaway: "Written by Md Afan Khan",
    color: "from-emerald-600 to-emerald-900",
    icon: "LifeBuoy",
    items: [
      { type: "topic", id: "what-is-itsm", title: "What is ITSM?" },
      { type: "topic", id: "incident", title: "Incident Management" },
      { type: "topic", id: "problem", title: "Problem Management" },
      { type: "topic", id: "change", title: "Change Management" },
      { type: "topic", id: "sla", title: "SLA (Service Level Agreement)" },
      { type: "topic", id: "service-request", title: "Service Request" },
      { type: "topic", id: "knowledge-base", title: "Knowledge Base" }
    ]
  }
];

const itomModules: Module[] = [
  {
    id: "cmdb-discovery-fundamentals",
    title: "CMDB & Discovery Fundamentals",
    level: "Beginner",
    description: "Learn the foundational concepts of CMDB, CI Relationships, and basic Discovery setups.",
    keyTakeaway: "Understand the building blocks of ServiceNow ITOM.",
    color: "from-cyan-600 to-cyan-900",
    icon: "Database",
    items: [
      { type: "topic", id: "cmdb-introduction", title: "CMDB Introduction" },
      { type: "topic", id: "ci-relationships", title: "CI Relationships" },
      { type: "topic", id: "cmdb-tools", title: "CMDB Tools" },
      { type: "topic", id: "mid-server-setup", title: "MID Server Setup" },
      { type: "topic", id: "discovery-fundamentals", title: "Discovery Fundamentals" },
      { type: "project", id: "project-1", title: "Project 1", description: "Apply CMDB and CI relationship concepts by building and validating a small CMDB structure in your developer instance." },
      { type: "mock-interview", id: "mock-interview-1", title: "Mock Interview 1", description: "Practice foundational CMDB & Discovery interview questions to lock in core concepts." }
    ]
  },
  {
    id: "advanced-discovery",
    title: "Advanced Discovery",
    level: "Intermediate",
    description: "Dive deep into Discovery processes, custom patterns, and Cloud Discovery integrations.",
    keyTakeaway: "Automate complex infrastructure discovery across on-prem and cloud.",
    color: "from-emerald-600 to-emerald-900",
    icon: "Server",
    items: [
      { type: "topic", id: "discovery-basics", title: "Discovery Basics" },
      { type: "topic", id: "advanced-discovery", title: "Advanced Discovery" },
      { type: "topic", id: "cloud-discovery", title: "Cloud Discovery" },
      { type: "project", id: "project-2", title: "Project 2", description: "Configure Discovery schedules and build a custom pattern for a proprietary application." },
      { type: "mock-interview", id: "mock-interview-2", title: "Mock Interview 2", description: "Tackle advanced technical scenarios and pattern-building questions." }
    ]
  },
  {
    id: "final-project-career-prep",
    title: "Final Project & Career Prep",
    level: "Advanced",
    description: "Master Service Mapping, complete a comprehensive capstone, and prepare for the job market.",
    keyTakeaway: "Map complex business services and polish your career profile.",
    color: "from-indigo-600 to-indigo-900",
    icon: "Target",
    items: [
      { type: "topic", id: "service-mapping", title: "Service Mapping" },
      { type: "project", id: "final-project-3", title: "Final Project 3", description: "Capstone project: Architect and deploy a complete top-down Service Map for a multi-tier business application." },
      { type: "milestone", id: "one-to-one-mock", title: "One-2-One Mock", description: "A simulated real-world technical interview covering the full ITOM suite." },
      { type: "milestone", id: "resume-prep", title: "Resume Prep", description: "Get guided help structuring your resume to highlight ServiceNow ITOM skills for real job applications." },
      { type: "milestone", id: "linkedin-prep", title: "LinkedIn Prep", description: "Optimize your LinkedIn profile to attract ServiceNow recruiters and hiring managers." }
    ]
  }
];

const sdkModules: Module[] = [
  {
    id: "getting-started",
    title: "Getting Started with SDK",
    level: "Beginner",
    description: "Learn about the new code-first tooling ecosystem, ServiceNow Studio vs SDK, and environment setup.",
    keyTakeaway: "Set up the ServiceNow SDK and Claude Code environment successfully.",
    color: "from-purple-600 to-purple-900",
    icon: "Rocket",
    items: [
      { type: "topic", id: "tooling-ecosystem", title: "The New Tooling Ecosystem" },
      { type: "topic", id: "environment-setup", title: "Development Environment Setup" },
      { type: "topic", id: "project-creation", title: "Project Creation and Credentials" }
    ]
  },
  {
    id: "core-workflow",
    title: "Core Workflow & Context",
    level: "Intermediate",
    description: "Understand the Fluent metadata language, providing context to AI agents, and debugging issues.",
    keyTakeaway: "Master prompting patterns and write Fluent code efficiently.",
    color: "from-blue-600 to-blue-900",
    icon: "BrainCircuit",
    items: [
      { type: "topic", id: "project-structure", title: "Project Structure & Fluent" },
      { type: "topic", id: "providing-context", title: "Providing Context to AI (PRD/GDD)" },
      { type: "topic", id: "prompting-patterns", title: "Prompting Patterns & Execution" },
      { type: "topic", id: "debugging-runtime", title: "Debugging Runtime Issues" }
    ]
  },
  {
    id: "version-control",
    title: "Version Control & Deployment",
    level: "Advanced",
    description: "Use GitHub natively with ServiceNow, handle Pull Requests, rollback code, and manage deployments.",
    keyTakeaway: "Implement robust CI/CD practices with the ServiceNow SDK.",
    color: "from-emerald-600 to-emerald-900",
    icon: "GitBranch",
    items: [
      { type: "topic", id: "git-workflow", title: "Git Workflow & Branching" },
      { type: "topic", id: "pull-requests", title: "Pull Requests & Rollbacks" },
      { type: "topic", id: "building-deploying", title: "Building and Deploying" }
    ]
  },
  {
    id: "custom-tooling",
    title: "Custom Tooling & Orchestration",
    level: "Expert",
    description: "Move beyond simple vibe coding to creating autonomous pipelines with custom workflow commands.",
    keyTakeaway: "Orchestrate AI agents for complex, parallel ServiceNow development tasks.",
    color: "from-rose-600 to-rose-900",
    icon: "Workflow",
    items: [
      { type: "topic", id: "vibe-coding", title: "Vibe Coding vs. Orchestration" },
      { type: "topic", id: "workflow-commands", title: "Workflow Commands (Skills)" },
      { type: "topic", id: "automated-pipeline", title: "Automated Pipeline Example" }
    ]
  },
  {
    id: "leveling-up",
    title: "Leveling Up",
    level: "Expert",
    description: "Apply SDK concepts to brownfield development and use agents for automated stakeholder communication.",
    keyTakeaway: "Scale AI development across large, legacy applications.",
    color: "from-amber-600 to-amber-900",
    icon: "TrendingUp",
    items: [
      { type: "topic", id: "brownfield-development", title: "Brownfield Development" },
      { type: "topic", id: "automated-communication", title: "Automated Communication" },
    ]
  }
];

const javascriptModules: Module[] = [
  {
    id: "js-getting-started",
    title: "Getting Started & Syntax",
    level: "Beginner",
    description: "Learn the basics of JavaScript syntax, variables, operators, and debugging.",
    keyTakeaway: "Write and debug basic scripts in the Now Platform.",
    color: "from-yellow-500 to-yellow-700",
    icon: "Rocket",
    items: [
      { type: "topic", id: "lesson-1-getting-started", title: "Getting Started" },
      { type: "topic", id: "lesson-2-statements-and-syntax", title: "Statements and Syntax" },
      { type: "topic", id: "lesson-3-variables", title: "Variables" },
      { type: "topic", id: "lesson-4-arithmetic", title: "Simple Arithmetic Operators" },
      { type: "topic", id: "lesson-5-error-messages", title: "Common Error Messages" },
      { type: "project", id: "lab-2", title: "Arithmetic" },
      { type: "topic", id: "lesson-9-commenting", title: "Commenting" }
    ]
  },
  {
    id: "js-data-types",
    title: "Data Types & Strings",
    level: "Beginner",
    description: "Understand strings, special characters, data type conversions, and string methods.",
    keyTakeaway: "Manipulate strings and handle data type conversions.",
    color: "from-yellow-600 to-yellow-800",
    icon: "FileText",
    items: [
      { type: "topic", id: "lesson-6-strings", title: "Strings" },
      { type: "topic", id: "lesson-7-special-characters", title: "Special Characters" },
      { type: "topic", id: "lesson-8-data-type-conversions", title: "Data Type Conversions" },
      { type: "project", id: "lab-3", title: "Strings" },
      { type: "topic", id: "lesson-31-more-string-methods", title: "More String Methods" }
    ]
  },
  {
    id: "js-logic",
    title: "Logic & Flow Control",
    level: "Intermediate",
    description: "Control script flow using conditions and loops.",
    keyTakeaway: "Use if/else, switch, and loops to build logic.",
    color: "from-yellow-500 to-yellow-700",
    icon: "Workflow",
    items: [
      { type: "topic", id: "lesson-10-comparisons", title: "Comparisons" },
      { type: "topic", id: "lesson-11-if-statements", title: "The If Statement and Boolean Logic" },
      { type: "topic", id: "lesson-12-ternary", title: "The Ternary Operator" },
      { type: "topic", id: "lesson-13-switch", title: "The Switch Statement" },
      { type: "topic", id: "lesson-14-truthy-falsy", title: "Truthy/Falsy" },
      { type: "project", id: "lab-4", title: "Translation" },
      { type: "topic", id: "lesson-15-while-loop", title: "The While Loop" },
      { type: "topic", id: "lesson-16-for-loop", title: "The For Loop" },
      { type: "topic", id: "lesson-17-do-while", title: "The Do-While Loop" },
      { type: "topic", id: "lesson-18-nested-loops", title: "Nested Loops" },
      { type: "project", id: "lab-5", title: "Nested Loops" }
    ]
  },
  {
    id: "js-functions",
    title: "Functions & Scope",
    level: "Intermediate",
    description: "Write reusable functions, understand scope, and handle errors.",
    keyTakeaway: "Build modular code and catch runtime errors.",
    color: "from-yellow-600 to-yellow-800",
    icon: "Code",
    items: [
      { type: "topic", id: "lesson-19-functions", title: "Functions" },
      { type: "topic", id: "lesson-20-try-catch", title: "Try/Catch/Finally Statements" },
      { type: "topic", id: "lesson-32-recursion", title: "Recursion" }
    ]
  },
  {
    id: "js-arrays-objects",
    title: "Arrays & Objects",
    level: "Advanced",
    description: "Manage collections of data using arrays and objects.",
    keyTakeaway: "Utilize arrays, objects, and JSON in ServiceNow.",
    color: "from-yellow-500 to-yellow-700",
    icon: "Box",
    items: [
      { type: "topic", id: "lesson-21-simple-db-query", title: "Simple Database Query" },
      { type: "topic", id: "lesson-22-intro-arrays", title: "Introduction to Arrays" },
      { type: "topic", id: "lesson-23-array-foreach", title: "Array forEach" },
      { type: "topic", id: "lesson-24-common-array-methods", title: "Common Array Methods" },
      { type: "topic", id: "lesson-25-servicenow-arrayutil", title: "ServiceNow ArrayUtil" },
      { type: "project", id: "lab-6", title: "Arrays" },
      { type: "topic", id: "lesson-26-intro-objects", title: "Introduction to Objects" },
      { type: "topic", id: "lesson-27-checking-properties", title: "Checking if an Object has a Property" },
      { type: "topic", id: "lesson-28-finding-properties", title: "Finding All Properties in an Object" },
      { type: "topic", id: "lesson-29-arrays-of-objects", title: "Arrays of Objects" },
      { type: "topic", id: "lesson-30-json-stringify-parse", title: "JSON Stringify and Parse" },
      { type: "project", id: "lab-7", title: "JSON" }
    ]
  },
  {
    id: "js-advanced",
    title: "Advanced Concepts",
    level: "Expert",
    description: "Build custom classes and scripted REST APIs.",
    keyTakeaway: "Architect scalable code using OOP and APIs.",
    color: "from-yellow-600 to-yellow-800",
    icon: "Cloud",
    items: [
      { type: "topic", id: "lesson-33-classes", title: "Classes" },
      { type: "topic", id: "lesson-34-passing-objects", title: "Passing objects to functions" },
      { type: "topic", id: "lesson-35-class-inheritance", title: "Class Inheritance" },
      { type: "topic", id: "lesson-36-scripted-rest-apis", title: "Scripted REST APIs" },
      { type: "project", id: "lab-8", title: "REST APIs" }
    ]
  }
];

const aesModules: Module[] = [
  {
    id: "aes-intro",
    title: "App Engine Studio (AES)",
    level: "Intermediate",
    description: "Build custom applications rapidly using App Engine Studio.",
    keyTakeaway: "Learn low-code app development in ServiceNow.",
    color: "from-blue-500 to-blue-700",
    icon: "Layout",
    items: [
      { type: "topic", id: "introduction", title: "Getting Started with AES" }
    ]
  }
];

const vaModules: Module[] = [
  {
    id: "va-intro",
    title: "Virtual Agent (VA)",
    level: "Intermediate",
    description: "Design conversational interfaces to automate support.",
    keyTakeaway: "Create powerful chatbot flows to deflect common incidents.",
    color: "from-purple-500 to-purple-700",
    icon: "Mic",
    items: [
      { type: "topic", id: "setup-virtual-agent", title: "Setup Basics" },
      { type: "topic", id: "setup-virtual-agent-branding", title: "Branding & Greetings" },
      { type: "topic", id: "setup-virtual-agent-topic", title: "Creating & Testing Topics" },
      { type: "topic", id: "virtual-agent-setup-flows", title: "Flows & KnowledgeBase" },
      { type: "topic", id: "create-incident-topic", title: "Incident Topic Block" },
      { type: "topic", id: "nlu-intent-utterances", title: "NLU & Intents" }
    ]
  }
];

const aiModules: Module[] = [
  {
    id: "ai-essentials",
    title: "1. AI Essentials",
    level: "Beginner",
    description: "Learn the foundational concepts of Artificial Intelligence, Machine Learning, and Large Language Models.",
    keyTakeaway: "Master core AI terminology and architectures.",
    color: "from-pink-600 to-pink-900",
    icon: "BrainCircuit",
    items: [
      { type: "topic", id: "what-is-ai", title: "What is AI?" },
      { type: "topic", id: "machine-learning", title: "Machine Learning" },
      { type: "topic", id: "generative-ai", title: "Generative AI" },
      { type: "topic", id: "llm-fundamentals", title: "LLM Fundamentals" },
      { type: "topic", id: "prompt-engineering", title: "Prompt Engineering" },
      { type: "topic", id: "rag", title: "RAG" },
      { type: "topic", id: "ai-agents-intro", title: "AI Agents" }
    ]
  },
  {
    id: "servicenow-ai-platform",
    title: "2. ServiceNow AI Platform",
    level: "Beginner",
    description: "Discover how ServiceNow integrates AI across its platform.",
    keyTakeaway: "Understand the ServiceNow AI ecosystem.",
    color: "from-purple-600 to-purple-900",
    icon: "Monitor",
    items: [
      { type: "topic", id: "sn-ai-platform", title: "ServiceNow AI Platform" },
      { type: "topic", id: "now-assist-intro", title: "Now Assist" },
      { type: "topic", id: "ai-skills-intro", title: "AI Skills" },
      { type: "topic", id: "sn-ai-agents", title: "AI Agents" },
      { type: "topic", id: "agentic-workflows-intro", title: "Agentic Workflows" }
    ]
  },
  {
    id: "now-assist",
    title: "3. Now Assist",
    level: "Intermediate",
    description: "Deep dive into Now Assist capabilities and configurations.",
    keyTakeaway: "Configure and leverage Now Assist for daily operations.",
    color: "from-blue-600 to-blue-900",
    icon: "Bot",
    items: [
      { type: "topic", id: "now-assist-fundamentals", title: "Now Assist Fundamentals" },
      { type: "topic", id: "now-assist-itsm", title: "Now Assist for ITSM" },
      { type: "topic", id: "ai-search", title: "AI Search" },
      { type: "topic", id: "now-assist-center", title: "Now Assist Center" }
    ]
  },
  {
    id: "generative-ai-deep-dive",
    title: "4. Generative AI",
    level: "Intermediate",
    description: "Understand how Generative AI models operate and how to ground them.",
    keyTakeaway: "Master prompt engineering and grounding techniques.",
    color: "from-indigo-600 to-indigo-900",
    icon: "Sparkles",
    items: [
      { type: "topic", id: "llms-deep-dive", title: "LLMs" },
      { type: "topic", id: "prompting-techniques", title: "Prompting" },
      { type: "topic", id: "grounding", title: "Grounding" },
      { type: "topic", id: "summarization", title: "Summarization" },
      { type: "topic", id: "gen-ai-skills", title: "AI Skills" }
    ]
  },
  {
    id: "gen-ai-controller",
    title: "5. Generative AI Controller",
    level: "Intermediate",
    description: "Integrate and manage external LLMs using the Generative AI Controller.",
    keyTakeaway: "Connect external AI models to ServiceNow workflows.",
    color: "from-cyan-600 to-cyan-900",
    icon: "Settings",
    items: [
      { type: "topic", id: "external-llms", title: "External LLMs" },
      { type: "topic", id: "openai-integration", title: "OpenAI" },
      { type: "topic", id: "azure-openai", title: "Azure OpenAI" },
      { type: "topic", id: "google-ai", title: "Google AI" },
      { type: "topic", id: "aws-bedrock", title: "Bedrock" },
      { type: "topic", id: "genai-workflows", title: "GenAI + Workflows" }
    ]
  },
  {
    id: "ai-agents-deep-dive",
    title: "6. AI Agents",
    level: "Advanced",
    description: "Explore the architecture and capabilities of autonomous AI Agents.",
    keyTakeaway: "Understand the components that make an AI Agent autonomous.",
    color: "from-teal-600 to-teal-900",
    icon: "Cpu",
    items: [
      { type: "topic", id: "ai-agent-fundamentals", title: "AI Agent Fundamentals" },
      { type: "topic", id: "agent-architecture", title: "Agent Architecture" },
      { type: "topic", id: "agent-tools", title: "Tools" },
      { type: "topic", id: "agent-skills", title: "Skills" },
      { type: "topic", id: "agent-knowledge", title: "Knowledge" },
      { type: "topic", id: "agent-security", title: "Security" }
    ]
  },
  {
    id: "ai-agent-studio",
    title: "7. AI Agent Studio",
    level: "Advanced",
    description: "Build, configure, and test custom AI Agents using Agent Studio.",
    keyTakeaway: "Create production-ready AI Agents.",
    color: "from-emerald-600 to-emerald-900",
    icon: "Wrench",
    items: [
      { type: "topic", id: "create-agent", title: "Create Agent" },
      { type: "topic", id: "configure-agent", title: "Configure Agent" },
      { type: "topic", id: "add-tools", title: "Add Tools" },
      { type: "topic", id: "test-agent", title: "Test Agent" },
      { type: "topic", id: "debug-agent", title: "Debug Agent" }
    ]
  },
  {
    id: "agentic-workflows",
    title: "8. Agentic Workflows",
    level: "Expert",
    description: "Design multi-agent systems and complex agentic workflows.",
    keyTakeaway: "Orchestrate multiple agents to solve complex business problems.",
    color: "from-amber-600 to-amber-900",
    icon: "Workflow",
    items: [
      { type: "topic", id: "agentic-workflow-fundamentals", title: "Fundamentals" },
      { type: "topic", id: "build-workflow", title: "Build Workflow" },
      { type: "topic", id: "multi-agent-orchestration", title: "Multi-Agent" },
      { type: "topic", id: "human-in-the-loop", title: "Human Approval" },
      { type: "topic", id: "workflow-monitoring", title: "Monitoring" }
    ]
  },
  {
    id: "ai-for-developers",
    title: "9. AI for Developers",
    level: "Advanced",
    description: "Leverage AI to accelerate ServiceNow development and testing.",
    keyTakeaway: "Write code and generate flows faster using AI.",
    color: "from-orange-600 to-orange-900",
    icon: "Code",
    items: [
      { type: "topic", id: "ai-code-generation", title: "AI Code Generation" },
      { type: "topic", id: "ai-flow-generation", title: "AI Flow Generation" },
      { type: "topic", id: "ai-ui-generation", title: "AI UI Generation" },
      { type: "topic", id: "ai-testing", title: "AI Testing" }
    ]
  },
  {
    id: "ai-and-itsm",
    title: "10. AI + ITSM",
    level: "Advanced",
    description: "Apply AI specifically to IT Service Management processes.",
    keyTakeaway: "Automate incident, problem, and change management with AI.",
    color: "from-red-600 to-red-900",
    icon: "Briefcase",
    items: [
      { type: "topic", id: "ai-incident-management", title: "AI Incident Management" },
      { type: "topic", id: "ai-problem-management", title: "AI Problem Management" },
      { type: "topic", id: "ai-change-management", title: "AI Change Management" },
      { type: "topic", id: "ai-knowledge-management", title: "AI Knowledge" }
    ]
  },
  {
    id: "ai-integrations",
    title: "11. AI Integrations",
    level: "Expert",
    description: "Integrate external AI services using REST and IntegrationHub.",
    keyTakeaway: "Build custom AI integrations securely.",
    color: "from-rose-600 to-rose-900",
    icon: "Link",
    items: [
      { type: "topic", id: "rest-ai", title: "REST + AI" },
      { type: "topic", id: "integrationhub-ai", title: "IntegrationHub + AI" },
      { type: "topic", id: "external-llm-apis", title: "External LLM APIs" },
      { type: "topic", id: "ai-integration-security", title: "AI Security" }
    ]
  },
  {
    id: "enterprise-ai-governance",
    title: "12. Enterprise AI Governance",
    level: "Intermediate",
    description: "Establish policies for responsible and secure AI usage.",
    keyTakeaway: "Manage AI risk and ensure compliance.",
    color: "from-slate-600 to-slate-900",
    icon: "ShieldCheck",
    items: [
      { type: "topic", id: "responsible-ai", title: "Responsible AI" },
      { type: "topic", id: "enterprise-ai-security", title: "AI Security" },
      { type: "topic", id: "ai-privacy", title: "Privacy" },
      { type: "topic", id: "ai-governance", title: "Governance" },
      { type: "topic", id: "ai-risk-management", title: "Risk Management" }
    ]
  },
  {
    id: "ai-real-world-projects",
    title: "13. Real-World Projects",
    level: "Expert",
    description: "Apply your knowledge to build end-to-end AI solutions.",
    keyTakeaway: "Build production-ready AI applications.",
    color: "from-yellow-600 to-yellow-900",
    icon: "FolderGit2",
    items: [
      { type: "project", id: "project-ai-incident-agent", title: "AI Incident Agent", description: "Build an autonomous agent to resolve incoming incidents." },
      { type: "project", id: "project-it-support-agent", title: "IT Support Agent", description: "Create a conversational support agent with tool access." },
      { type: "project", id: "project-knowledge-agent", title: "Knowledge Agent", description: "Develop an agent that automatically drafts knowledge articles from resolved tickets." },
      { type: "project", id: "project-multi-agent-itsm", title: "Multi-Agent ITSM", description: "Orchestrate multiple agents to handle an end-to-end IT service request." }
    ]
  },
  {
    id: "ai-interview-prep",
    title: "14. AI Interview",
    level: "Expert",
    description: "Prepare for AI-specific ServiceNow roles and interviews.",
    keyTakeaway: "Ace your next ServiceNow AI job interview.",
    color: "from-fuchsia-600 to-fuchsia-900",
    icon: "Users",
    items: [
      { type: "topic", id: "ai-interview-fundamentals", title: "Fundamentals" },
      { type: "topic", id: "ai-scenario-questions", title: "Scenario Questions" },
      { type: "topic", id: "ai-architecture-questions", title: "Architecture" },
      { type: "mock-interview", id: "ai-mock-interview", title: "Mock Interview", description: "Practice a live technical interview focusing on AI Agents and Generative AI." }
    ]
  }
];

const uiBuilderModules: Module[] = [
  {
    id: "uib-intro",
    title: "1. Introduction to UI Builder",
    level: "Beginner",
    description: "Learn what UI Builder is and how it compares to Service Portal and App Engine Studio.",
    keyTakeaway: "Understand UI Builder use cases.",
    color: "from-teal-500 to-teal-700",
    icon: "Layout",
    items: [
      { type: "topic", id: "what-is-ui-builder", title: "What is UI Builder" },
      { type: "topic", id: "uib-vs-sp-vs-aes", title: "UI Builder vs Service Portal vs App Engine Studio" }
    ]
  },
  {
    id: "uib-core-concepts",
    title: "2. Core Concepts",
    level: "Beginner",
    description: "Understand the fundamental building blocks of UI Builder.",
    keyTakeaway: "Master Pages, Components, and Data Brokers.",
    color: "from-cyan-500 to-cyan-700",
    icon: "Box",
    items: [
      { type: "topic", id: "pages-components-data", title: "Pages, Components, and Data" },
      { type: "topic", id: "component-config-panel", title: "Component Configuration Panel" },
      { type: "topic", id: "data-brokers", title: "Data Brokers (fetching/binding data)" }
    ]
  },
  {
    id: "uib-building-pages",
    title: "3. Building Pages",
    level: "Intermediate",
    description: "Get hands-on with creating and organizing pages in UI Builder.",
    keyTakeaway: "Create robust pages with mobile variants.",
    color: "from-blue-500 to-blue-700",
    icon: "Layout",
    items: [
      { type: "topic", id: "creating-page", title: "Creating a Page" },
      { type: "topic", id: "adding-arranging-components", title: "Adding & Arranging Components" },
      { type: "topic", id: "page-variants", title: "Page Variants (Desktop/Mobile)" }
    ]
  },
  {
    id: "uib-data-logic",
    title: "4. Data & Logic",
    level: "Advanced",
    description: "Implement dynamic behavior using data resources and client-side scripting.",
    keyTakeaway: "Bind data and create interactive UI behaviors.",
    color: "from-indigo-500 to-indigo-700",
    icon: "Code",
    items: [
      { type: "topic", id: "client-scripting-uib", title: "Client-side Scripting in UI Builder" },
      { type: "topic", id: "events-actions", title: "Events and Actions" },
      { type: "topic", id: "data-resources", title: "Data Resources (REST/Table)" }
    ]
  },
  {
    id: "uib-experiences",
    title: "5. Experiences",
    level: "Intermediate",
    description: "Explore built-in and custom workspace experiences.",
    keyTakeaway: "Understand how UI Builder powers Employee Center and custom portals.",
    color: "from-violet-500 to-violet-700",
    icon: "Layout",
    items: [
      { type: "topic", id: "employee-center", title: "Employee Center" },
      { type: "topic", id: "custom-portals-workspaces", title: "Custom Portals/Workspaces built with UI Builder" }
    ]
  },
  {
    id: "uib-advanced",
    title: "6. Advanced Topics",
    level: "Expert",
    description: "Dive deep into Now Experience framework customization.",
    keyTakeaway: "Build custom components and apply branding.",
    color: "from-purple-500 to-purple-700",
    icon: "Settings",
    items: [
      { type: "topic", id: "custom-components-now", title: "Custom Components (Now Experience Framework)" },
      { type: "topic", id: "reusable-fragments", title: "Reusable Fragments" },
      { type: "topic", id: "theming-branding", title: "Theming & Branding" }
    ]
  },
  {
    id: "uib-best-practices",
    title: "7. Best Practices",
    level: "Advanced",
    description: "Learn how to optimize your UI Builder applications.",
    keyTakeaway: "Ensure performance and accessibility compliance.",
    color: "from-emerald-500 to-emerald-700",
    icon: "Shield",
    items: [
      { type: "topic", id: "performance-optimization", title: "Performance optimization" },
      { type: "topic", id: "accessibility-considerations", title: "Accessibility considerations" }
    ]
  }
];

const csaCertificationModules: Module[] = [
  {
    id: "csa-intro-setup",
    title: "1. Introduction & Setup",
    level: "Beginner",
    description: "Learn what ServiceNow is, how to get a Personal Developer Instance, and navigate the UI.",
    keyTakeaway: "Get started with the ServiceNow platform.",
    color: "from-blue-600 to-blue-900",
    icon: "Rocket",
    items: [
      { type: "topic", id: "ch1-servicenow-intro", title: "Chapter 1: ServiceNow Introduction" },
      { type: "topic", id: "ch2-creating-pdi", title: "Chapter 2: Creating PDI (Personal Developer Instance)" },
      { type: "topic", id: "ch3-user-interface", title: "Chapter 3: User Interface" }
    ]
  },
  {
    id: "csa-forms-lists",
    title: "2. Forms & Lists",
    level: "Beginner",
    description: "Master the design and layout of forms, formatters, and list views.",
    keyTakeaway: "Configure how data is displayed and interacted with.",
    color: "from-teal-600 to-teal-900",
    icon: "Layout",
    items: [
      { type: "topic", id: "ch4-form-design", title: "Chapter 4: Form Design, Form Layout, Form Builder" },
      { type: "topic", id: "ch5-formatters", title: "Chapter 5: Formatters" },
      { type: "topic", id: "ch6-list-view", title: "Chapter 6: List View" }
    ]
  },
  {
    id: "csa-database-architecture",
    title: "3. Database & Architecture",
    level: "Intermediate",
    description: "Understand the underlying tables and how to extend functionality with plugins.",
    keyTakeaway: "Manage plugins and database tables.",
    color: "from-purple-600 to-purple-900",
    icon: "Database",
    items: [
      { type: "topic", id: "ch7-plugins", title: "Chapter 7: Plugins" },
      { type: "topic", id: "ch8-tables", title: "Chapter 8: Tables" }
    ]
  },
  {
    id: "csa-admin-policies",
    title: "4. Administration & Policies",
    level: "Intermediate",
    description: "Manage users and enforce data integrity and UI behavior through policies.",
    keyTakeaway: "Control user access and enforce field-level policies.",
    color: "from-emerald-600 to-emerald-900",
    icon: "Users",
    items: [
      { type: "topic", id: "ch9-user-admin", title: "Chapter 9: User Administration" },
      { type: "topic", id: "ch10-ui-policies", title: "Chapter 10: UI Policies" },
      { type: "topic", id: "ch11-data-policies", title: "Chapter 11: Data Policies" }
    ]
  },
  {
    id: "csa-task-mgmt",
    title: "5. Task Management",
    level: "Intermediate",
    description: "Handle assignment rules, related lists, and service level management.",
    keyTakeaway: "Automate task routing and track service levels.",
    color: "from-amber-600 to-amber-900",
    icon: "CheckSquare",
    items: [
      { type: "topic", id: "ch12-assignment-rules", title: "Chapter 12: Assignment Rules" },
      { type: "topic", id: "ch13-metrics", title: "Chapter 13: Metrics" },
      { type: "topic", id: "ch14-related-lists", title: "Chapter 14: Related Lists" },
      { type: "topic", id: "ch15-slm-sla", title: "Chapter 15: SLM and SLA" }
    ]
  },
  {
    id: "csa-service-catalog-automation",
    title: "6. Service Catalog & Automation",
    level: "Advanced",
    description: "Build catalog items and automate business processes with Workflows and Flow Designer.",
    keyTakeaway: "Automate service requests and repetitive tasks.",
    color: "from-indigo-600 to-indigo-900",
    icon: "Workflow",
    items: [
      { type: "topic", id: "ch16-service-catalog", title: "Chapter 16: Service Catalog" },
      { type: "topic", id: "ch17-workflow", title: "Chapter 17: Workflow and Workflow Editor" },
      { type: "topic", id: "ch18-flow-designer", title: "Chapter 18: Flow Designer and Flows" }
    ]
  },
  {
    id: "csa-communications-security",
    title: "7. Communications & Security",
    level: "Advanced",
    description: "Configure email notifications, inbound actions, and secure records using ACLs.",
    keyTakeaway: "Secure the platform and automate email communication.",
    color: "from-rose-600 to-rose-900",
    icon: "Shield",
    items: [
      { type: "topic", id: "ch19-email-notifications", title: "Chapter 19: Email Notifications" },
      { type: "topic", id: "ch20-inbound-email", title: "Chapter 20: Inbound Email Actions" },
      { type: "topic", id: "ch21-access-control-list", title: "Chapter 21: Access Control List" }
    ]
  },
  {
    id: "csa-data-analytics",
    title: "8. Data Management & Analytics",
    level: "Advanced",
    description: "Import data, migrate configurations with update sets, and build reports.",
    keyTakeaway: "Manage platform data and visualize metrics.",
    color: "from-cyan-600 to-cyan-900",
    icon: "BarChart",
    items: [
      { type: "topic", id: "ch22-import-sets", title: "Chapter 22: Import Sets" },
      { type: "topic", id: "ch23-update-sets", title: "Chapter 23: Update Sets" },
      { type: "topic", id: "ch24-reports-dash-boards", title: "Chapter 24: Reports & Dash Boards" }
    ]
  }
];

const cadCertificationModules: Module[] = [
  {
    id: "cad-glide-apis-1",
    title: "1. Glide APIs - Part 1",
    level: "Beginner",
    description: "Learn the core Glide APIs including GlideRecord, GlideForm, GlideUser, GlideSystem, and GlideSession.",
    keyTakeaway: "Master the fundamental ServiceNow APIs.",
    color: "from-blue-600 to-blue-900",
    icon: "Code",
    items: [
      { type: "topic", id: "topic-1-glide-api-gliderecord", title: "1. Glide API and Glide Record" },
      { type: "topic", id: "topic-2-glide-form", title: "2. Glide Form" },
      { type: "topic", id: "topic-3-glide-user", title: "3. Glide User" },
      { type: "topic", id: "topic-4-glide-system", title: "4. Glide System" },
      { type: "topic", id: "topic-5-glide-session", title: "5. Glide Session" }
    ]
  },
  {
    id: "cad-glide-apis-2",
    title: "2. Glide APIs - Part 2",
    level: "Intermediate",
    description: "Deep dive into Date, Time, and Aggregation APIs.",
    keyTakeaway: "Handle dates, times, and complex data aggregations.",
    color: "from-teal-600 to-teal-900",
    icon: "Database",
    items: [
      { type: "topic", id: "topic-6-glide-date", title: "6. Glide Date" },
      { type: "topic", id: "topic-7-glide-date-time", title: "7. Glide Date and Time" },
      { type: "topic", id: "topic-8-glide-aggregation", title: "8. Glide Aggregation" }
    ]
  },
  {
    id: "cad-client-scripts-ui",
    title: "3. Client Scripts & UI Actions",
    level: "Intermediate",
    description: "Implement client-side logic, UI Actions, and Scheduled Jobs.",
    keyTakeaway: "Control user interface behavior and schedule background tasks.",
    color: "from-purple-600 to-purple-900",
    icon: "Layout",
    items: [
      { type: "topic", id: "topic-9-client-scripts", title: "9. Client Scripts" },
      { type: "topic", id: "topic-10-ui-actions", title: "10. UI Actions" },
      { type: "topic", id: "topic-11-scheduled-jobs", title: "11. Scheduled Jobs" }
    ]
  },
  {
    id: "cad-business-rules-1",
    title: "4. Business Rules - Core",
    level: "Intermediate",
    description: "Understand the fundamentals of Business Rules, including Before and After rules.",
    keyTakeaway: "Execute server-side logic based on database operations.",
    color: "from-emerald-600 to-emerald-900",
    icon: "Settings",
    items: [
      { type: "topic", id: "topic-12-business-rules", title: "12. Business Rules" },
      { type: "topic", id: "topic-13-before-business-rules", title: "13. Before Business Rules" },
      { type: "topic", id: "topic-14-after-business-rules", title: "14. After Business Rules" }
    ]
  },
  {
    id: "cad-business-rules-2",
    title: "5. Business Rules - Advanced",
    level: "Advanced",
    description: "Master Async and Display Business Rules, and learn to transfer data from server to client.",
    keyTakeaway: "Optimize performance with async logic and display rules.",
    color: "from-amber-600 to-amber-900",
    icon: "Workflow",
    items: [
      { type: "topic", id: "topic-15-async-business-rules", title: "15. Async Business Rules" },
      { type: "topic", id: "topic-16-display-business-rules", title: "16. Display Business Rules" },
      { type: "topic", id: "topic-17-data-transferring", title: "17. Data Transferring Server to Client" }
    ]
  },
  {
    id: "cad-script-include-ajax",
    title: "6. Script Includes & GlideAjax",
    level: "Advanced",
    description: "Build reusable server-side code with Script Includes and call them asynchronously using GlideAjax.",
    keyTakeaway: "Create modular code and improve client-server communication.",
    color: "from-indigo-600 to-indigo-900",
    icon: "Server",
    items: [
      { type: "topic", id: "topic-18-script-include", title: "18. Script Include" },
      { type: "topic", id: "topic-19-glide-ajax", title: "19. Glide Ajax" },
      { type: "topic", id: "topic-20-interview-questions-br", title: "20. Interview Questions on BR" }
    ]
  },
  {
    id: "cad-flow-designer-knowledge",
    title: "7. Flow Designer & Knowledge",
    level: "Advanced",
    description: "Automate processes using Flow Designer and manage articles with Knowledge Management.",
    keyTakeaway: "Design flows without code and structure organizational knowledge.",
    color: "from-rose-600 to-rose-900",
    icon: "BookOpen",
    items: [
      { type: "topic", id: "topic-21-flow-designer", title: "21. Flow Designer" },
      { type: "topic", id: "topic-22-interview-questions-flow", title: "22. Interview Questions on Flow Designer" },
      { type: "topic", id: "topic-23-knowledge-management", title: "23. Knowledge Management" }
    ]
  }
];

const csFundamentalsModules: Module[] = [
  {
    id: "cs-basics",
    title: "1. Computer Science Basics",
    level: "Beginner",
    description: "Learn the core concepts of computing, hardware, and software logic.",
    keyTakeaway: "Understand how computers process and store information.",
    color: "from-slate-600 to-slate-900",
    icon: "Cpu",
    items: [
      { type: "topic", id: "computer-science-basics", title: "Computer Science Basics" }
    ]
  },
  {
    id: "oop",
    title: "2. Object-Oriented Programming",
    level: "Beginner",
    description: "Master the four pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    keyTakeaway: "Design scalable applications using object-oriented principles.",
    color: "from-blue-600 to-blue-900",
    icon: "Box",
    items: [
      { type: "topic", id: "java-oops-notes", title: "Java OOPs Notes" }
    ]
  },
  {
    id: "dsa",
    title: "3. Data Structures & Algorithms",
    level: "Intermediate",
    description: "Learn how to organize data efficiently and write optimized algorithms.",
    keyTakeaway: "Solve complex problems with optimal time and space complexity.",
    color: "from-emerald-600 to-emerald-900",
    icon: "Database",
    items: [
      { type: "topic", id: "introduction-to-dsa", title: "Introduction to DSA" },
      { type: "topic", id: "arrays-and-strings", title: "Arrays & Strings" },
      { type: "topic", id: "linked-lists-trees-graphs", title: "Linked Lists, Trees & Graphs" },
      { type: "topic", id: "sorting-and-searching", title: "Sorting & Searching" }
    ]
  },
  {
    id: "operating-systems",
    title: "4. Operating Systems",
    level: "Intermediate",
    description: "Understand process management, memory allocation, and OS architectures.",
    keyTakeaway: "Learn how an OS bridges the gap between hardware and software.",
    color: "from-purple-600 to-purple-900",
    icon: "Monitor",
    items: [
      { type: "topic", id: "os-basics", title: "OS Basics" },
      { type: "topic", id: "process-and-memory-management", title: "Process & Memory Management" },
      { type: "topic", id: "linux-fundamentals", title: "Linux Fundamentals" }
    ]
  },
  {
    id: "computer-networks",
    title: "5. Computer Networks",
    level: "Intermediate",
    description: "Learn the OSI model, TCP/IP, and how data moves across the internet.",
    keyTakeaway: "Understand network topologies, protocols, and security basics.",
    color: "from-cyan-600 to-cyan-900",
    icon: "Server",
    items: [
      { type: "topic", id: "complete-notes", title: "Complete Notes" }
    ]
  },
  {
    id: "dbms",
    title: "6. DBMS",
    level: "Intermediate",
    description: "Master database management systems, ACID properties, and relational design.",
    keyTakeaway: "Design robust, normalized database schemas.",
    color: "from-orange-600 to-orange-900",
    icon: "Database",
    items: [
      { type: "topic", id: "dbms-fundamentals", title: "DBMS Fundamentals" },
      { type: "topic", id: "acid-properties", title: "ACID Properties" },
      { type: "topic", id: "normalization", title: "Normalization" }
    ]
  },
  {
    id: "sql",
    title: "7. SQL",
    level: "Beginner",
    description: "Learn Structured Query Language to interact with relational databases.",
    keyTakeaway: "Write queries to retrieve, insert, and analyze data.",
    color: "from-yellow-600 to-yellow-900",
    icon: "Code",
    items: [
      { type: "topic", id: "sql-interview-notes", title: "SQL Interview Notes" }
    ]
  },
  {
    id: "software-engineering",
    title: "8. Software Engineering",
    level: "Beginner",
    description: "Explore the SDLC, Agile methodologies, and software design patterns.",
    keyTakeaway: "Understand the lifecycle of modern software development.",
    color: "from-indigo-600 to-indigo-900",
    icon: "Briefcase",
    items: [
      { type: "topic", id: "sdlc", title: "SDLC (Software Development Life Cycle)" },
      { type: "topic", id: "agile-and-scrum", title: "Agile & Scrum" },
      { type: "topic", id: "design-patterns", title: "Design Patterns" }
    ]
  },
  {
    id: "web-api-fundamentals",
    title: "9. Web & API Fundamentals",
    level: "Intermediate",
    description: "Learn how the web works, HTTP methods, and RESTful APIs.",
    keyTakeaway: "Build scalable web services using REST APIs.",
    color: "from-rose-600 to-rose-900",
    icon: "Globe",
    items: [
      { type: "topic", id: "how-the-web-works", title: "How the Web Works" },
      { type: "topic", id: "http-and-rest", title: "HTTP & REST" },
      { type: "topic", id: "api-integration", title: "API Integration" }
    ]
  },
  {
    id: "git-github",
    title: "10. Git & GitHub",
    level: "Beginner",
    description: "Master version control, branching strategies, and collaborative coding.",
    keyTakeaway: "Manage code securely and collaborate using Git.",
    color: "from-gray-600 to-gray-900",
    icon: "GitBranch",
    items: [
      { type: "topic", id: "git-basics", title: "Git Basics" },
      { type: "topic", id: "branching-and-merging", title: "Branching & Merging" },
      { type: "topic", id: "github-collaboration", title: "GitHub Collaboration" }
    ]
  }
];

export const tracks: Track[] = [
  {
    id: "itsm-track",
    slug: "it-basics",
    title: "IT Basics",
    modules: csaModules
  },
  {
    id: "csa-certification-track",
    slug: "csa-certification",
    title: "Certified System Administrator (CSA)",
    modules: csaCertificationModules
  },
  {
    id: "javascript-track",
    slug: "javascript",
    title: "Javascript Developer",
    modules: javascriptModules
  },
  {
    id: "cad-certification-track",
    slug: "cad-certification",
    title: "Certified Application Developer (CAD)",
    modules: cadCertificationModules
  },
  {
    id: "ai-track",
    slug: "servicenow-ai",
    title: "ServiceNow AI",
    modules: aiModules
  },
  {
    id: "sdk-track",
    slug: "sdk",
    title: "ServiceNow SDK Developer",
    modules: sdkModules
  },
  {
    id: "itom-track",
    slug: "itom",
    title: "ITOM Specialist",
    modules: itomModules
  },
  {
    id: "cs-fundamentals-track",
    slug: "cs-fundamentals",
    title: "CS Fundamentals",
    modules: csFundamentalsModules
  }
];

export const sharedModules = csaModules;
