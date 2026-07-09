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
      { type: "topic", id: "rest-api", title: "REST API" },
      { type: "topic", id: "soap-api", title: "SOAP API" },
      { type: "topic", id: "ldap-integration", title: "LDAP Integration" },
      { type: "topic", id: "azure-ad-integration", title: "Azure AD Integration" },
      { type: "topic", id: "sccm-integration", title: "SCCM Integration" },
      { type: "topic", id: "monitoring-tool-integrations", title: "Monitoring Tool Integrations" },
      { type: "topic", id: "outbound-inbound-integrations", title: "Outbound & Inbound Integrations" },
      { type: "topic", id: "event-management", title: "Event Management" }
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

export const tracks: Track[] = [
  {
    id: "csa-track",
    slug: "csa",
    title: "ServiceNow Developer (CSA/CAD)",
    modules: csaModules
  },
  {
    id: "itom-track",
    slug: "itom",
    title: "ITOM Specialist",
    modules: itomModules
  }
];

export const sharedModules = csaModules;
