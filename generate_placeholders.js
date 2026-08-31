const fs = require('fs');
const path = require('path');

const modules = [
  {
    id: "itsm-foundation",
    items: [
      { id: "what-is-itsm", title: "1. What is ITSM" },
      { id: "why-companies-use-itsm", title: "2. Why companies use ITSM" },
      { id: "what-is-itil", title: "3. What is ITIL" },
      { id: "itsm-vs-itil", title: "4. ITSM vs ITIL" }
    ]
  },
  {
    id: "incident-management-basics",
    items: [
      { id: "what-is-incident", title: "5. What is Incident" },
      { id: "incident-management", title: "6. Incident Management" },
      { id: "incident-lifecycle", title: "7. Incident Lifecycle" },
      { id: "incident-priority", title: "8. Incident Priority" },
      { id: "escalation", title: "9. Escalation" },
      { id: "functional-vs-hierarchical-escalation", title: "10. Functional vs Hierarchical Escalation" }
    ]
  },
  {
    id: "major-incident-management",
    items: [
      { id: "major-incident", title: "11. Major Incident" },
      { id: "major-incident-management", title: "12. Major Incident Management" }
    ]
  },
  {
    id: "service-request-catalog",
    items: [
      { id: "service-request", title: "13. Service Request" },
      { id: "service-catalog", title: "14. Service Catalog" },
      { id: "service-catalog-vs-service-request", title: "15. Service Catalog vs Service Request" },
      { id: "incident-vs-service-request", title: "16. Incident vs Service Request" }
    ]
  },
  {
    id: "problem-management",
    items: [
      { id: "what-is-problem", title: "17. What is Problem" },
      { id: "problem-management-process", title: "18. Problem Management Process" },
      { id: "rca", title: "19. RCA" },
      { id: "known-error", title: "20. Known Error" },
      { id: "kedb", title: "21. KEDB" }
    ]
  },
  {
    id: "change-management-basics",
    items: [
      { id: "what-is-change", title: "22. What is Change" },
      { id: "change-management", title: "23. Change Management" },
      { id: "change-request", title: "24. Change Request" },
      { id: "types-of-changes", title: "25. Types of Changes" },
      { id: "change-lifecycle", title: "26. Change Lifecycle" },
      { id: "cab", title: "27. CAB" },
      { id: "role-of-cab", title: "28. Role of CAB" }
    ]
  },
  {
    id: "configuration-management",
    items: [
      { id: "configuration-management", title: "29. Configuration Management" },
      { id: "ci", title: "30. CI" },
      { id: "cmdb", title: "31. CMDB" },
      { id: "ci-vs-cmdb", title: "32. CI vs CMDB" }
    ]
  },
  {
    id: "asset-management-basics",
    items: [
      { id: "asset-management", title: "33. Asset Management" },
      { id: "asset-vs-ci", title: "34. Asset vs CI" }
    ]
  },
  {
    id: "service-level-management",
    items: [
      { id: "service-level-management", title: "35. Service Level Management" },
      { id: "sla", title: "36. SLA" },
      { id: "how-sla-is-measured", title: "37. How SLA is measured" },
      { id: "sla-vs-ola-vs-uc", title: "38. SLA vs OLA vs UC" }
    ]
  }
];

const basePath = path.join(__dirname, 'client', 'src', 'content', 'learn');

modules.forEach(mod => {
  const dir = path.join(basePath, mod.id);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  mod.items.forEach(topic => {
    const filePath = path.join(dir, `${topic.id}.md`);
    const content = `---
title: "${topic.title}"
description: "Content coming soon."
lastUpdated: "2026-08-31"
---

# ${topic.title}

*Content for this section will be added later.*
`;
    fs.writeFileSync(filePath, content);
  });
});

console.log('Generated placeholder markdown files successfully.');
