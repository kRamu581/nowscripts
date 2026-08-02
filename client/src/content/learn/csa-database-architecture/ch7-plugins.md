## What Are Plug-ins in ServiceNow?
> **KEY POINT:** Plug-ins are self-contained modules that add specific features and functionality to ServiceNow — without touching or modifying the underlying platform code. Think of them like apps you install on a phone: activate them to gain new capabilities.

Plugins extend ServiceNow — each one is an independent module of new functionality.

### Key Features of Plug-ins
| Feature | What It Means |
|---|---|
| **Functionality Expansion** | Add new features: integrations, workflows, tools — without custom coding. |
| **Modular Design** | Each plug-in is self-contained — install or uninstall independently as needed. |
| **Configurable** | Most plug-ins can be configured to match your specific business requirements. |
| **Performance Optimisation** | Some plug-ins improve system performance or enhance user experience. |
| **Independent Updates** | Plug-ins can be updated separately — easier maintenance, no big bang upgrades. |

## Plug-ins vs. Applications — What's the Difference?
| Aspect | Plug-in | Application |
|---|---|---|
| **What it is** | A module that adds features to EXISTING apps. | A standalone program with its own set of features. |
| **Purpose** | Enhances or extends the platform's existing capabilities. | Delivers a complete, independent set of functionality. |
| **How to get it** | Activate from System Definition > Plugins. | Install from the ServiceNow Store or build your own. |
| **Examples** | Agile Development, Virtual Agent, Performance Analytics. | ITSM, HR Service Delivery, Customer Service Management. |

## Examples of Commonly Used Plug-ins
| Plug-in Name | What It Does |
|---|---|
| **Agile Development** | Tools to support Agile/Scrum project management inside ServiceNow. |
| **Virtual Agent** | Adds a chatbot to assist users with common requests and automate workflows. |
| **Project Management** | Enhances project tracking, resource management, and delivery capabilities. |
| **Service Portal** | Enables a user-friendly self-service portal for accessing IT services. |
| **Data Archive** | Archives older data to optimise system performance and storage. |
| **Performance Analytics** | Advanced reporting, dashboards, and analytics for tracking KPIs and metrics. |
| **Event Management** | Monitors and manages events from various IT systems in real time. |
| **Security Incident Response** | Manage security incidents and streamline response workflows. |
| **Project Portfolio Management** | Tools for managing projects, resources, and delivery portfolios. |
| **Application Portfolio Management** | Manages application lifecycle and portfolio decisions. |

## How to Request a Plug-in in ServiceNow
> **REMEMBER:** If a plug-in does NOT appear on the All Applications page, you cannot activate it yourself. You must request ServiceNow staff to activate it for you via Now Support. Before requesting: always check first if the plug-in is already activated in your instance!

### Two Ways to Request a Plug-in
| Method | Steps |
|---|---|
| **Via Now Support Service Catalog** | Go to Now Support -> Service Catalog -> open the "Activate Plugin" page and submit your request. |
| **Via All Applications Page** | In your instance: navigate to System Definition > Plugins -> click "Request Plugin" button. |

## Exercise 1 — Activate the Agile Development Plug-in on Your PDI
> **! IMPORTANT:** On a Personal Developer Instance (PDI), you can activate many plug-ins for FREE — no need to request or purchase them. Note: Some plug-ins are NOT available for activation on PDIs. Role required: Admin

1. **Log In to Your PDI**
   Go to your personal developer instance URL and log in as admin.
2. **Navigate to Plugins**
   In the Application Navigator (left sidebar), type "Plugins" and press Enter. Select: System Definition > Plugins. The Application Manager page opens.
3. **Search for the Plug-in**
   In the Application Manager search bar, type: Agile Development. The matching plugin will appear in the results.
4. **Open the Plug-in Details**
   Click on the plugin name "Agile Development" to open its detail page.
5. **Click Install**
   Click the Install button on the plugin detail page.
6. **Configure Installation Options**
   Select Install now (to install immediately) or Install later. Optionally check Load demo data to include sample records. Review the Dependencies section — inactive required plugins are listed. Click Install to confirm.
7. **Verify Activation**
   After installation completes, the plugin appears in the active plugins list. Check that new features associated with the plugin are now available.

## Assignment — Additional Plug-ins to Explore
Try activating these additional plug-ins on your PDI to explore their features. Consider your organisation's needs when deciding which to activate in production.

| Plug-in | Why You Might Need It |
|---|---|
| **Major Incident Management** | Handles high-impact incidents that significantly disrupt services urgently. |
| **Change Risk Assessment** | Evaluates potential risks for proposed IT environment changes. |
| **I18N: Brazilian Portuguese Translations** | Adds localisation support for Brazilian Portuguese users. |
| **Performance Analytics** | Advanced reporting to track KPIs and operational metrics. |
| **Virtual Agent** | AI chatbot to help users with queries and automate common requests. |
| **Event Management** | Real-time monitoring and management of IT system events. |
| **Security Incident Response** | Streamlines security incident management and response workflows. |
