
## Overview of the ServiceNow UI (UI16)
The ServiceNow UI16 interface has THREE main sections that you see on every page. Understanding these three areas is the foundation of navigating ServiceNow efficiently.

| Component | Also Known As | What It Does |
|---|---|---|
| **1. Banner Frame** | Top Bar / Header | Shows logo, global search, navigation tabs, user menu, and notifications. |
| **2. Application Navigator** | Left Navigator / Filter Navigator | Left sidebar — browse and search all apps and modules. |
| **3. Content Frame** | Main Area / Work Area | Displays the selected module content — lists, forms, dashboards. |

## 1. The Banner Frame
The **Banner Frame** is the topmost strip on every ServiceNow page. It provides essential global navigation and contextual information visible at all times.

### Key Components of the Banner Frame
| Element | What It Does |
|---|---|
| **Company Logo** | Your organisation's brand logo — click it to go to the home page. |
| **Application Menu** | Dropdown with links to all applications in your ServiceNow instance. |
| **Favourites** | Quick access to your saved/favourite modules. |
| **History** | Recently visited pages — quickly jump back to where you were. |
| **Workspaces** | Access different workspaces configured for your role. |
| **Global Search Bar** | Search for records, knowledge articles, or any content instantly. |
| **User Menu** | Profile, settings, impersonation, and logout options. |
| **Notifications (Bell)** | Unread alerts, notifications, and system messages. |
| **Help Icon (?)** | Access ServiceNow documentation and support resources. |

### Special Banner Features (Admin Only)
* **Impersonate User:** Temporarily assume another user's role for testing/troubleshooting. All actions are logged under their account.
* **Elevated Privilege Roles:** Requires you to explicitly accept responsibility before accessing sensitive role-specific features.
* **Printer-Friendly Version:** A formatted, print-optimised view of any record or list.
* **Keyboard Shortcuts:** ServiceNow has many keyboard shortcuts to speed up workflows.

### Customisation Options
* **Theme:** The banner's appearance can be customised with different colour schemes and themes.
* **Navigation:** Add, remove, or reorder applications in the Application Menu.

> **NOTE:** Responsive Design: The banner automatically adapts to different screen sizes. Accessibility: Compliant with accessibility standards for users with disabilities.

### Exercise 1: Customising the UI16 Banner Frame
The **Basic Configuration UI16** module lets you personalise your instance — upload a logo, choose colour schemes, and set system defaults.

1. **Navigate to System Properties**
   Go to: `System Properties` -> `Basic Configuration UI16`
2. **Customise your instance settings**
   * Banner/Introduction Caption — your instance title.
   * Banner Subtitle — shown below the title.
   * Service Name — your company/service name.
   * Banner Image for UI16 — upload your logo.
   * Date Format, Time Format — set regional preferences.
3. **Save your changes**
   Click the "Save" button (top-right) to apply all settings.

## 2. The Application Navigator
The Application Navigator (left sidebar) is your gateway to every application and module in ServiceNow. Think of it like a menu tree — applications at the top level, modules listed under each.

| Feature | Detail |
|---|---|
| **Also called** | Left-navigation bar or Filter Navigator. |
| **What it contains** | Every application available in your instance, with modules listed under each. |
| **Filter bar** | Type any keyword at the top to instantly filter and find any module. |
| **Application label** | Each application appears as a heading (e.g. Incident, Service Desk). |
| **Modules** | Listed by name under each application label (e.g. Create New, Open, All). |
| **Pin icon** | Pin the navigator open or allow it to collapse automatically. |

> **TIP:** Use the Filter Navigator search bar to find any module instantly — just start typing the module name and the list narrows in real time.

## 3. The Content Frame
The **Content Frame** is the main working area — the large panel on the right. When you click a module in the Application Navigator, its content loads here.

### Two Main Page Types in the Content Frame

| Page Type | What It Shows | Example |
|---|---|---|
| **Lists** | A table of multiple records with columns for key fields. You can filter, sort, and search within lists. | All Incidents — shows INC numbers, descriptions, priorities. |
| **Forms** | A detailed view of a single record with all its fields. You can view, edit, and update records here. | INC0010003 — shows full details of one incident. |

> **TIP:** Remember: Application Navigator = WHERE you go. Content Frame = WHAT you see and work with.

> [!TIP]
> **More Learning Resources:**
> 1. Official Docs: [Read Document](https://www.servicenow.com/docs/bundle/washingtondc-platform-user-interface/page/administer/navigation-and-ui/concept/c_UI16.html)
> 2. Website: [Read Article](https://saaniyachugh.substack.com/p/the-servicenow-interface)
> 3. YouTube (1st): [Watch Video](https://www.youtube.com/watch?v=ygXeZ2OEj-A)
> 4. YouTube (2nd): [Watch Video](https://www.youtube.com/watch?v=HdhMweIjinc)
