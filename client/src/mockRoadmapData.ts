import { tracks } from "./data/sharedModules";

export const mockRoadmaps = [
  {
    id: "1",
    title: "ServiceNow Developer / CSA",
    slug: "csa",
    description: "The complete, linear learning path to master ServiceNow from scratch to advanced development and security.",
    difficulty: "Comprehensive",
    estimatedDuration: "12 Weeks",
    certification: "Certified System Administrator (CSA)",
    prerequisites: "None",
    careerOutcome: "ServiceNow Developer",
    salaryRange: "$80k - $140k",
    phase: 1,
    unlocks: ["Certified Application Developer (CAD)"],
    learningObjectives: "Master the ServiceNow platform, learn to develop applications, automate workflows, discover infrastructure, integrate with other systems, and secure the instance.",
    color: "from-blue-600 to-blue-900",
    iconName: "Map",
    order: 1,
    modules: tracks.find(t => t.slug === 'csa')?.modules.map((mod, i) => ({
      id: mod.id,
      title: mod.title,
      description: mod.description,
      estimatedTime: mod.level,
      completed: false,
      items: mod.items
    }))
  },
  {
    id: "2",
    title: "ITOM Specialist",
    slug: "itom",
    description: "Master Configuration Management Database (CMDB), infrastructure discovery, and service mapping.",
    difficulty: "Advanced",
    estimatedDuration: "6 Weeks",
    certification: "Certified Implementation Specialist - IT Service Management (CIS-ITSM)",
    prerequisites: "CSA Certification",
    careerOutcome: "ITOM Implementer",
    salaryRange: "$100k - $160k",
    phase: 2,
    unlocks: ["Service Mapping Specialist"],
    learningObjectives: "Master the ServiceNow ITOM suite including CMDB configuration, MID Server setup, Discovery patterns, and top-down Service Mapping.",
    color: "from-cyan-600 to-cyan-900",
    iconName: "Database",
    order: 2,
    modules: tracks.find(t => t.slug === 'itom')?.modules.map((mod, i) => ({
      id: mod.id,
      title: mod.title,
      description: mod.description,
      estimatedTime: mod.level,
      completed: false,
      items: mod.items
    }))
  }
];
