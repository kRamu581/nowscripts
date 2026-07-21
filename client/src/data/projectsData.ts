export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectAuthor {
  name: string;
  avatarUrl: string;
  badge: string;
}

export interface ProjectStats {
  likes: number;
  views: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  background: string;
  objective: string;
  elements: string[];
  module: string;
  industry: string;
  difficulty: ProjectDifficulty;
  thumbnailUrl: string;
  heroUrl: string;
  estimatedTime: string;
  author: ProjectAuthor;
  stats: ProjectStats;
}

export const projectsData: Project[] = [
  {
    id: "project-2",
    title: "Citizen Services Portal for Local Government \u2013 Permit & Complaint Management",
    shortDescription: "Design a ServiceNow citizen services portal for local government that gives residents a single digital channel to submit all service requests,  tra...",
    background: "Local government offices receive thousands of citizen requests annually for building permits, zoning inquiries, noise complaints, pothole reports,  business license applications, and public records requests. These are currently handled through phone calls, paper forms, emails to individual  departments, and disconnected web forms, leading to lost requests, long processing times, inconsistent communications, and no transparency  for citizens tracking their request status. Municipal staff in different departments use different systems, making inter-departmental coordination  for complex requests difficult and time-consuming.",
    objective: "Design a ServiceNow citizen services portal for local government that gives residents a single digital channel to submit all service requests,  track real-time status, and receive proactive updates. Internally, the system should route requests intelligently to the appropriate departments,  enforce SLAs, facilitate inter-departmental collaboration on complex requests, and provide city leadership with performance dashboards.",
    elements: ["Citizen Service Portal: Mobile-responsive self-service interface for submitting and tracking all service requests"],
    module: "CSM, Government Digital Services",
    industry: "Government / Public Sector",
    difficulty: "Advanced",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    heroUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    estimatedTime: "15 Hours",
    author: {
      name: "Rahul Sharma",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      badge: "PRO"
    },
    stats: {
      likes: 142,
      views: "3.5k"
    }
  },
  {
    id: "project-3",
    title: "Refugee & Immigrant Services Navigation & Case Management Platform",
    shortDescription: "Design a ServiceNow refugee and immigrant services case management platform that enables community organizations to manage client  intake, coordina...",
    background: "Community organizations supporting newly arrived refugees and immigrants navigate complex service ecosystems including housing  assistance, employment services, language programs, healthcare enrollment, legal aid, and school enrollment. Case managers juggle large  client caseloads with paper files, email communications, and disconnected service referral processes. Clients have language barriers and no  digital tools to understand available services or track their case progress. Service coordination between multiple agencies serving the same  family is entirely manual, leading to duplication, gaps in care, and client frustration.",
    objective: "Design a ServiceNow refugee and immigrant services case management platform that enables community organizations to manage client  intake, coordinate multi-agency service delivery, track case progress and milestones, manage compliance with resettlement agency reporting  requirements, and measure outcomes across the service population.",
    elements: ["Multilingual Client Portal: Service discovery interface with translation support for common languages"],
    module: "CSM, Service Portal",
    industry: "Nonprofit / Government / Social Services",
    difficulty: "Advanced",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    heroUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    estimatedTime: "20 Hours",
    author: {
      name: "Priya Patel",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      badge: "PRO+"
    },
    stats: {
      likes: 256,
      views: "4.2k"
    }
  },
  {
    id: "project-5",
    title: "Volunteer Management & Community Engagement Platform for Nonprofits",
    shortDescription: "Build a ServiceNow-based volunteer management platform that enables nonprofits to recruit volunteers digitally, manage service opportunities,  auto...",
    background: "Nonprofit organizations and community service programs rely heavily on volunteers but struggle to recruit, schedule, manage, and recognize  them effectively. Volunteer coordinators juggle spreadsheets, email chains, and manual phone follow-ups to match volunteer availability with  service opportunities, track hours, and maintain compliance with background check requirements. Volunteers themselves have no visibility into  available opportunities, their personal contribution history, or recognition for service milestones. This disorganized approach results in high  volunteer churn, unfilled service slots, and administrative overload for nonprofit staff.",
    objective: "Build a ServiceNow-based volunteer management platform that enables nonprofits to recruit volunteers digitally, manage service opportunities,  automate scheduling and communications, track volunteer hours and certifications, and recognize contributions. The platform should reduce  administrative burden, improve volunteer retention, and provide leadership with data to measure community impact.",
    elements: ["Service Portal: Volunteer self-service hub for browsing opportunities, registering, and tracking hours"],
    module: "Service Portal, Flow Designer",
    industry: "Community Service",
    difficulty: "Advanced",
    thumbnailUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800",
    heroUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800",
    estimatedTime: "30 Hours",
    author: {
      name: "Aarav Gupta",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
      badge: "PRO"
    },
    stats: {
      likes: 189,
      views: "2.1k"
    }
  }
];

export const projectTags = [
  "All",
  "App Engine Studio",
  "CSM",
  "Flow Designer",
  "Government Digital Services",
  "HR Service Delivery (HRSD)",
  "HRSD & Employee Experience",
  "IT Service Management",
  "ITAM/CMDB + App Engine Studio",
  "Integrated Risk Management (IRM)",
  "Legal Service Delivery",
  "Security Operations (SecOps)",
  "Service Portal",
];
