---
title: "Getting Started with AES"
type: "topic"
lastUpdated: "2026-07-30"
---

# Getting Started with App Engine Studio (AES)

## What is App Engine Studio (AES)?
- A ServiceNow tool to build apps easily, without much coding
- Has drag-and-drop, ready templates, and team collaboration features
- Lets non-developers (citizen developers) build real apps
- Speeds up app development for businesses

## The 4 Main Areas of AES (Big Picture)

1. **Data** – Where information is stored (tables, fields, records)
2. **Experience** – What users see (forms, portals, pages)
3. **Logic & Automation** – How the app behaves (workflows, rules, approvals)
4. **Security** – Who can access what (roles, permissions)

---

## A. Low/No-Code Tools (for non-developers)

**1. Form Designer**
- Build and customize forms
- Drag-and-drop fields
- Decides how data is collected

**2. Process Automation Designer**
- Draws business processes visually
- Connects multiple workflows into one big process
- Good for end-to-end automation

**3. UI Builder**
- No-code tool to build modern screens and portals
- Has 100+ ready-made components
- Build pages in minutes

**4. NLU Model Builder**
- Trains AI to understand human language
- Used for chatbots and search

**5. Flow Designer**
- The main automation tool
- Set a trigger (e.g., form submitted) → then actions happen (e.g., send email, update record)
- Reusable "subflows" save time
- Hides complex logic from non-technical users

**6. Table & Schema Builder**
- Design database tables visually
- Shows how tables are connected
- Helps structure your data

**7. Mobile App Builder**
- No-code tool to build mobile apps
- Business teams can build apps for their own use
- Includes guided wizards

---

## B. Pro Code Tools (for professional developers)

- **Web APIs** – Build REST/SOAP APIs, with security and authentication
- **React** – Build custom UI components
- **HTML/CSS** – Style pages and portals
- **JavaScript** – Main coding language used in ServiceNow
- **Web Components** – Reusable UI blocks

---

## 2. Quality Tools (Development Standards)

- **Developer Instance** – Your own personal sandbox to build/test safely
- **Git Integration** – Connect to GitHub/GitLab/Bitbucket, track code versions, works with CI/CD pipelines
- **Automated Testing (ATF)** – Auto-tests to make sure nothing breaks after changes
- **Code Sharing** – Reuse code modules across the organization
- **Delegated Development** – Admins give safe, limited permissions to non-admins
- **Portal Widget Editor** – Build/edit Service Portal widgets (HTML, CSS, JS)
- **Script Debugger** – Debug JavaScript code (like debugging in VS Code)

---

## 3. Now Intelligence (AI & Analytics)

**1. Virtual Agent**
- Build chatbots for instant answers
- Understands natural language (3 million+ words)
- Can hand off tricky questions to human agents
- Works with IBM Watson & Microsoft LUIS too

**2. Reporting Engine**
- Build reports easily: charts, dials, maps, pivot tables
- Ask questions in plain English (Natural Language Query) instead of building filters

**3. Performance Analytics**
- Shows KPIs, trends, and scorecards
- Predicts and routes work automatically using historical data

**4. Machine Learning**
- Includes Predictive Intelligence, Classification, Clustering
- Predicts things like assignment groups or categories

**5. Robotic Process Automation (RPA)**
- Automates repetitive tasks using digital "robots"
- Can read screens (OCR), click buttons, fill forms automatically
- Triggered through Flow Designer

---

## 4. Integration Services (Connecting to Other Systems)

- **Scripted APIs** – Fully custom-coded REST/SOAP APIs
- **API Explorer** – Test APIs easily, see documentation
- **JSON** – Common data format for integrations
- **SOAP/XML** – Older integration formats, still used
- **REST** – Main way ServiceNow talks to other systems
- **IntegrationHub** – Low-code way to connect with tools like Slack, SAP, Azure
- **MID Server** – Connects ServiceNow to on-premise/local systems (databases, LDAP)
- **Import & Export** – Import data via Excel/CSV/XML

---

## 5. Core Services (Platform Foundation)

**1. CMDB (Configuration Management Database)**
- Stores IT assets and how they relate to each other
- Apps built in AES can pull data from CMDB
- Backbone of ITSM, ITOM, CSM

**2. Peer Benchmarking**
- Compare your app's performance to industry standards
- Track KPIs using Performance Analytics

**3. Knowledge Management**
- Build apps to manage articles/knowledge base
- Users can search, submit, and review content
- Supports approvals and version tracking

**4. Time Series Database**
- Stores real-time monitoring data
- Used for IT operations (ITOM)

**5. Service Catalog**
- Lets users request services/products
- Includes approval workflows

**6. Workflow Process Engine**
- The engine that powers all automated workflows behind the scenes

**7. Application Scope**
- Defines what an app can access
- Protects data and keeps apps secure

**8. Business Rules**
- Server-side logic that runs automatically on data changes
- Enforces business policies

---

## 6. Security

- **Encryption** – Protects data (field-level & full-disk)
- **Tokenization** – Replaces sensitive data with safe "tokens"
- **2FA (Two-Factor Authentication)** – Extra login security
- **OAuth 2.0** – Secure standard for API access
- **SAML** – Single Sign-On using company identity systems
- **SSO** – One login for all company apps
- **LDAP** – Connects to corporate directories
- **ACLs & Roles** – Controls who can see/do what in the system
