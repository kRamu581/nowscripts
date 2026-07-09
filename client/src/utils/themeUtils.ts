import React from "react";
import { 
  Laptop, Cloud, Settings, Code, Server, 
  Workflow, Shield, Award, Layout, Box, BookOpen
} from "lucide-react";

export const MODULE_THEMES: Record<string, { bg: string, text: string, border: string, lightBg: string, Icon: React.FC<any> }> = {
  "Fundamentals": { bg: "bg-now-primary", text: "text-now-primary", border: "border-now-primary", lightBg: "bg-orange-50", Icon: Laptop },
  "ITSM Module": { bg: "bg-gray-800", text: "text-gray-800", border: "border-gray-800", lightBg: "bg-gray-50", Icon: Cloud },
  "Workflow & Automation": { bg: "bg-now-primary", text: "text-now-primary", border: "border-now-primary", lightBg: "bg-orange-50", Icon: Workflow },
  "Administration": { bg: "bg-gray-800", text: "text-gray-800", border: "border-gray-800", lightBg: "bg-gray-50", Icon: Settings },
  "Advanced ITSM": { bg: "bg-now-primary", text: "text-now-primary", border: "border-now-primary", lightBg: "bg-orange-50", Icon: Layout },
  "Development": { bg: "bg-gray-800", text: "text-gray-800", border: "border-gray-800", lightBg: "bg-gray-50", Icon: Code },
  "CMDB & Discovery": { bg: "bg-now-primary", text: "text-now-primary", border: "border-now-primary", lightBg: "bg-orange-50", Icon: Server },
  "Integrations": { bg: "bg-gray-800", text: "text-gray-800", border: "border-gray-800", lightBg: "bg-gray-50", Icon: Box },
  "Security & Governance": { bg: "bg-now-primary", text: "text-now-primary", border: "border-now-primary", lightBg: "bg-orange-50", Icon: Shield },
  "Certifications": { bg: "bg-gray-800", text: "text-gray-800", border: "border-gray-800", lightBg: "bg-gray-50", Icon: Award }
};

export const getModuleTheme = (category: string) => {
  return MODULE_THEMES[category] || { bg: "bg-now-primary", text: "text-now-primary", border: "border-now-primary", lightBg: "bg-now-primary/10", Icon: BookOpen };
}
