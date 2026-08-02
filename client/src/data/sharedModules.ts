export type TrackItemType = 'topic' | 'project' | 'mock-interview' | 'milestone';

export type TrackItem = {
  type: TrackItemType;
  id: string;
  title: string;
  description?: string;
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
    id: "fundamentals",
    title: "ServiceNow Fundamentals",
    level: "Beginner",
    description: "Understand what ServiceNow is and its architecture. Learn the platform basics and navigation. Explore core application building blocks.",
    keyTakeaway: "Understand the platform and how things work in ServiceNow.",
    color: "from-blue-600 to-blue-900",
    icon: "BookOpen",
    items: [
      { type: "topic", id: "navigation-user-interface", title: "Navigation & User Interface" },
      { type: "topic", id: "lists-forms-filters", title: "Lists, Forms, Filters" },
      { type: "topic", id: "users-groups-roles", title: "Users, Groups, Roles" },
      { type: "topic", id: "tables-and-records", title: "Tables and Records" },
      { type: "topic", id: "service-catalog", title: "Service Catalog" },
      { type: "topic", id: "knowledge-base", title: "Knowledge Base" },
      { type: "topic", id: "incident-management", title: "Incident Management" }
    ]
  },
  {
    id: "itsm-module",
    title: "ITSM Module",
    level: "Intermediate",
    description: "Focus on core IT Service Management processes including Incident, Problem, Change, and Request management.",
    keyTakeaway: "Learn and configure ITSM processes end-to-end.",
    color: "from-emerald-600 to-emerald-900",
    icon: "LifeBuoy",
    items: [
      { type: "topic", id: "incident-management", title: "Incident Management" },
      { type: "topic", id: "problem-management", title: "Problem Management" },
      { type: "topic", id: "change-management", title: "Change Management" },
      { type: "topic", id: "request-management", title: "Request Management" },
      { type: "topic", id: "cmdb-basics", title: "CMDB Basics" },
      { type: "topic", id: "asset-management", title: "Asset Management" }
    ]
  },
  {
    id: "administration",
    title: "Administration",
    level: "Intermediate",
    description: "Learn essential administration and platform configuration including security and data management.",
    keyTakeaway: "Manage users, secure data, and maintain the platform.",
    color: "from-amber-600 to-amber-900",
    icon: "Settings",
    items: [
      { type: "topic", id: "user-role-management", title: "User & Role Management" },
      { type: "topic", id: "access-control-rules", title: "Access Control Rules (ACLs)" },
      { type: "topic", id: "notifications", title: "Notifications" },
      { type: "topic", id: "email-configuration", title: "Email Configuration" },
      { type: "topic", id: "import-sets", title: "Import Sets" },
      { type: "topic", id: "data-sources", title: "Data Sources" },
      { type: "topic", id: "update-sets", title: "Update Sets" },
      { type: "topic", id: "system-properties", title: "System Properties" },
      { type: "topic", id: "scheduled-jobs", title: "Scheduled Jobs" }
    ]
  },
  {
    id: "development",
    title: "ServiceNow Development",
    level: "Intermediate",
    description: "Learn scripting and customization to extend ServiceNow, covering client and server side.",
    keyTakeaway: "Customize and build solutions using scripts.",
    color: "from-rose-600 to-rose-900",
    icon: "Code",
    items: [
      { type: "topic", id: "client-scripts", title: "Client Scripts" },
      { type: "topic", id: "business-rules", title: "Business Rules" },
      { type: "topic", id: "ui-policies", title: "UI Policies" },
      { type: "topic", id: "ui-actions", title: "UI Actions" },
      { type: "topic", id: "script-includes", title: "Script Includes" },
      { type: "topic", id: "gliderecord", title: "GlideRecord" },
      { type: "topic", id: "scheduled-jobs", title: "Scheduled Jobs" },
      { type: "topic", id: "fix-scripts", title: "Fix Scripts" }
    ]
  },
  {
    id: "workflow-automation",
    title: "Workflow & Automation",
    level: "Intermediate",
    description: "Automate processes and approvals using modern tools without writing heavy code.",
    keyTakeaway: "Automate business processes and improve efficiency.",
    color: "from-purple-600 to-purple-900",
    icon: "Workflow",
    items: [
      { type: "topic", id: "flow-designer", title: "Flow Designer" },
      { type: "topic", id: "integration-hub", title: "Integration Hub" },
      { type: "topic", id: "workflow-editor", title: "Workflow Editor" },
      { type: "topic", id: "approvals", title: "Approvals" },
      { type: "topic", id: "automated-tasks", title: "Automated Tasks" },
      { type: "topic", id: "sla-management", title: "SLA Management" },
      { type: "topic", id: "escalations-notifications", title: "Escalations & Notifications" }
    ]
  },
  {
    id: "cmdb-discovery",
    title: "CMDB & Discovery",
    level: "Advanced",
    description: "Learn Configuration Management Database and discovery capabilities.",
    keyTakeaway: "Build a strong CMDB and discover infrastructure automatically.",
    color: "from-cyan-600 to-cyan-900",
    icon: "Database",
    items: [
      { type: "topic", id: "cmdb-design", title: "CMDB Design" },
      { type: "topic", id: "ci-relationships", title: "CI Relationships" },
      { type: "topic", id: "discovery", title: "Discovery" },
      { type: "topic", id: "service-mapping", title: "Service Mapping" },
      { type: "topic", id: "mid-server-configuration", title: "MID Server Configuration" },
      { type: "topic", id: "reconciliation-rules", title: "Reconciliation Rules" },
      { type: "topic", id: "identification-sensors", title: "Identification & Sensors" }
    ]
  },
  {
    id: "integrations",
    title: "Integrations",
    level: "Advanced",
    description: "Integrate ServiceNow with other tools and platforms.",
    keyTakeaway: "Connect ServiceNow with enterprise systems and external tools.",
    color: "from-pink-600 to-pink-900",
    icon: "Globe",
    items: [
      { type: "topic", id: "what-is-integration", title: "What is integration?" },
      { type: "topic", id: "type-of-integration", title: "Type of Integration" },
      { type: "topic", id: "basic-requirements", title: "Basic Requirements for Integrate any system" },
      { type: "topic", id: "integration-testing-tools", title: "Integration Testing Tools" },
      { type: "topic", id: "integration-module", title: "Integration Module" },
      { type: "topic", id: "inbound-integration", title: "Inbound Integration" },
      { type: "topic", id: "soap-vs-rest", title: "SOAP VS REST API" },
      { type: "topic", id: "table-api-rest", title: "Table API Web Service – REST" },
      { type: "topic", id: "direct-web-services-soap", title: "Direct web services – SOAP" },
      { type: "topic", id: "import-set-soap", title: "Import Set Web Service – SOAP" },
      { type: "topic", id: "import-set-rest", title: "Import Set API – REST" },
      { type: "topic", id: "scripted-web-services-soap", title: "Scripted Web Services – SOAP" },
      { type: "topic", id: "scripted-web-services-rest", title: "Scripted Web Services – REST" },
      { type: "topic", id: "soap-message-outbound", title: "SOAP Message – Outbound" },
      { type: "topic", id: "rest-message-outbound", title: "REST Message – Outbound" },
      { type: "topic", id: "sn-to-sn-incident", title: "ServiceNow to ServiceNow Incident Integration" },
      { type: "topic", id: "oauth-2-authentication", title: "OAuth 2.0 Authentication" },
      { type: "topic", id: "sn-oauth-connect", title: "ServiceNow – OAuth application connect" },
      { type: "topic", id: "access-vs-refresh-token", title: "Access Token VS Refresh Token" }
    ]
  },
  {
    id: "advanced-development",
    title: "Advanced Development",
    level: "Expert",
    description: "Build advanced applications and user experiences like Service Portal.",
    keyTakeaway: "Build advanced solutions and improve user experience.",
    color: "from-indigo-600 to-indigo-900",
    icon: "Layers",
    items: [
      { type: "topic", id: "service-portal", title: "Service Portal" },
      { type: "topic", id: "catalog-item-development", title: "Catalog Item Development" },
      { type: "topic", id: "record-producers", title: "Record Producers" },
      { type: "topic", id: "widgets", title: "Widgets" },
      { type: "topic", id: "scripted-rest-apis", title: "Scripted REST APIs" },
      { type: "topic", id: "scoped-applications", title: "Scoped Applications" },
      { type: "topic", id: "application-menus", title: "Application Menus" },
      { type: "topic", id: "custom-tables-modules", title: "Custom Tables & Modules" }
    ]
  },
  {
    id: "security-governance",
    title: "Security & Governance",
    level: "Expert",
    description: "Ensure data security, compliance and governance across the platform.",
    keyTakeaway: "Ensure data security, compliance, and governance.",
    color: "from-slate-600 to-slate-900",
    icon: "Shield",
    items: [
      { type: "topic", id: "access-control-lists", title: "Access Control Lists (ACLs)" },
      { type: "topic", id: "data-security", title: "Data Security" },
      { type: "topic", id: "domain-separation", title: "Domain Separation" },
      { type: "topic", id: "audit-compliance", title: "Audit & Compliance" },
      { type: "topic", id: "instance-security", title: "Instance Security" },
      { type: "topic", id: "security-best-practices", title: "Security Best Practices" },
      { type: "topic", id: "roles-permissions-strategy", title: "Roles & Permissions Strategy" }
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
      { type: "topic", id: "introduction", title: "Virtual Agent Basics" }
    ]
  }
];

const aiModules: Module[] = [
  {
    id: "servicenow-ai",
    title: "ServiceNow AI",
    level: "Beginner",
    description: "Learn the fundamentals of Artificial Intelligence and how it powers intelligent automation in ServiceNow.",
    keyTakeaway: "Understand AI concepts and explore ServiceNow's AI capabilities.",
    color: "from-pink-500 to-pink-700",
    icon: "Monitor",
    items: [
      { type: "topic", id: "ai-essentials", title: "AI Essentials" },
      { type: "topic", id: "ai-essentials-for-it-professionals", title: "AI Essentials for IT Professionals" },
      { type: "topic", id: "ai-agents-and-automation", title: "AI Agents and Automation in Workflows" },
      { type: "topic", id: "enterprise-ai-governance", title: "How do I Build an Enterprise AI Governance Plan" },
      { type: "topic", id: "future-of-agentic-ai", title: "The Future of Agentic AI" },
      { type: "topic", id: "gen-ai-power-intelligent-automation", title: "How does Generative AI Power Intelligent Automation" },
      { type: "topic", id: "what-is-machine-learning", title: "What is Machine Learning" },
      { type: "topic", id: "nlu-fundamentals", title: "Natural Language Understanding Fundamentals" },
      { type: "topic", id: "what-is-ai", title: "What is Artificial Intelligence" },
      { type: "topic", id: "what-is-servicenow-instance", title: "What is a ServiceNow Instance" },
      { type: "topic", id: "what-is-servicenow-platform-workspace", title: "What is a ServiceNow Platform Workspace" },
      { type: "topic", id: "what-is-servicenow-ai-platform-dashboard", title: "What is ServiceNow AI Platform Dashboard" },
      { type: "topic", id: "what-is-a-chatbot", title: "What is a Chatbot" },
      { type: "topic", id: "what-is-a-help-desk", title: "What is a Help Desk" },
      { type: "topic", id: "servicenow-user-interface-overview", title: "ServiceNow User Interface Overview" },
      { type: "topic", id: "platform-analytics-overview", title: "Platform Analytics Overview" },
      { type: "topic", id: "get-started-with-predictive-intelligence", title: "Get Started with Predictive Intelligence" },
      { type: "topic", id: "creator-studio-fundamentals", title: "Creator Studio Fundamentals" }
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

export const tracks: Track[] = [
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
    id: "itsm-track",
    slug: "itsm",
    title: "ITSM",
    modules: csaModules
  },
  {
    id: "aes-track",
    slug: "app-engine-studio",
    title: "App Engine Studio",
    modules: aesModules
  },
  {
    id: "uibuilder-track",
    slug: "ui-builder",
    title: "UI Builder",
    modules: uiBuilderModules
  },
  {
    id: "va-track",
    slug: "virtual-agent",
    title: "Virtual Agent",
    modules: vaModules
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
    id: "cad-certification-track",
    slug: "cad-certification",
    title: "Certified Application Developer (CAD)",
    modules: cadCertificationModules
  }
];

export const sharedModules = csaModules;
