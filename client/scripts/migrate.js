import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sharedModules = [
  {
    id: "fundamentals",
    topics: [
      { id: "navigation-user-interface", title: "Navigation & User Interface" },
      { id: "lists-forms-filters", title: "Lists, Forms, Filters" },
      { id: "users-groups-roles", title: "Users, Groups, Roles" },
      { id: "tables-and-records", title: "Tables and Records" },
      { id: "service-catalog", title: "Service Catalog" },
      { id: "knowledge-base", title: "Knowledge Base" },
      { id: "incident-management", title: "Incident Management" }
    ]
  },
  {
    id: "itsm-module",
    topics: [
      { id: "incident-management", title: "Incident Management" },
      { id: "problem-management", title: "Problem Management" },
      { id: "change-management", title: "Change Management" },
      { id: "request-management", title: "Request Management" },
      { id: "cmdb-basics", title: "CMDB Basics" },
      { id: "asset-management", title: "Asset Management" }
    ]
  },
  {
    id: "administration",
    topics: [
      { id: "user-role-management", title: "User & Role Management" },
      { id: "access-control-rules", title: "Access Control Rules (ACLs)" },
      { id: "notifications", title: "Notifications" },
      { id: "email-configuration", title: "Email Configuration" },
      { id: "import-sets", title: "Import Sets" },
      { id: "data-sources", title: "Data Sources" },
      { id: "update-sets", title: "Update Sets" },
      { id: "system-properties", title: "System Properties" },
      { id: "scheduled-jobs", title: "Scheduled Jobs" }
    ]
  },
  {
    id: "development",
    topics: [
      { id: "client-scripts", title: "Client Scripts" },
      { id: "business-rules", title: "Business Rules" },
      { id: "ui-policies", title: "UI Policies" },
      { id: "ui-actions", title: "UI Actions" },
      { id: "script-includes", title: "Script Includes" },
      { id: "gliderecord", title: "GlideRecord" },
      { id: "scheduled-jobs", title: "Scheduled Jobs" },
      { id: "fix-scripts", title: "Fix Scripts" }
    ]
  },
  {
    id: "workflow-automation",
    topics: [
      { id: "flow-designer", title: "Flow Designer" },
      { id: "integration-hub", title: "Integration Hub" },
      { id: "workflow-editor", title: "Workflow Editor" },
      { id: "approvals", title: "Approvals" },
      { id: "automated-tasks", title: "Automated Tasks" },
      { id: "sla-management", title: "SLA Management" },
      { id: "escalations-notifications", title: "Escalations & Notifications" }
    ]
  },
  {
    id: "cmdb-discovery",
    topics: [
      { id: "cmdb-design", title: "CMDB Design" },
      { id: "ci-relationships", title: "CI Relationships" },
      { id: "discovery", title: "Discovery" },
      { id: "service-mapping", title: "Service Mapping" },
      { id: "mid-server-configuration", title: "MID Server Configuration" },
      { id: "reconciliation-rules", title: "Reconciliation Rules" },
      { id: "identification-sensors", title: "Identification & Sensors" }
    ]
  },
  {
    id: "integrations",
    topics: [
      { id: "rest-api", title: "REST API" },
      { id: "soap-api", title: "SOAP API" },
      { id: "ldap-integration", title: "LDAP Integration" },
      { id: "azure-ad-integration", title: "Azure AD Integration" },
      { id: "sccm-integration", title: "SCCM Integration" },
      { id: "monitoring-tool-integrations", title: "Monitoring Tool Integrations" },
      { id: "outbound-inbound-integrations", title: "Outbound & Inbound Integrations" },
      { id: "event-management", title: "Event Management" }
    ]
  },
  {
    id: "advanced-development",
    topics: [
      { id: "service-portal", title: "Service Portal" },
      { id: "catalog-item-development", title: "Catalog Item Development" },
      { id: "record-producers", title: "Record Producers" },
      { id: "widgets", title: "Widgets" },
      { id: "scripted-rest-apis", title: "Scripted REST APIs" },
      { id: "scoped-applications", title: "Scoped Applications" },
      { id: "application-menus", title: "Application Menus" },
      { id: "custom-tables-modules", title: "Custom Tables & Modules" }
    ]
  },
  {
    id: "security-governance",
    topics: [
      { id: "access-control-lists", title: "Access Control Lists (ACLs)" },
      { id: "data-security", title: "Data Security" },
      { id: "domain-separation", title: "Domain Separation" },
      { id: "audit-compliance", title: "Audit & Compliance" },
      { id: "instance-security", title: "Instance Security" },
      { id: "security-best-practices", title: "Security Best Practices" },
      { id: "roles-permissions-strategy", title: "Roles & Permissions Strategy" }
    ]
  }
];

const contentDir = path.join(__dirname, '..', 'src', 'content', 'learn');

function stripFrontmatter(content) {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  if (match) {
    return match[1].trim();
  }
  return content.trim();
}

sharedModules.forEach(mod => {
  const modDir = path.join(contentDir, mod.id);
  
  if (!fs.existsSync(modDir)) {
    fs.mkdirSync(modDir, { recursive: true });
  }

  mod.topics.forEach(topic => {
    const filePath = path.join(modDir, `${topic.id}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const stripped = stripFrontmatter(content);
      // Optional: Add an H1 if missing so content has a title
      let finalContent = stripped;
      if (!finalContent.startsWith('# ')) {
         finalContent = `# ${topic.title}\n\n` + finalContent;
      }
      fs.writeFileSync(filePath, finalContent, 'utf-8');
      console.log(`Processed existing: ${mod.id}/${topic.id}.md`);
    } else {
      const emptyContent = `# ${topic.title}\n\nThe lesson you're looking for is currently being updated. Please select another module from the sidebar.\n`;
      fs.writeFileSync(filePath, emptyContent, 'utf-8');
      console.log(`Created placeholder: ${mod.id}/${topic.id}.md`);
    }
  });
});
