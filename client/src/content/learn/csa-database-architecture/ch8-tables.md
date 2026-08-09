## What is a Table in ServiceNow?
> **KEY POINT:** A Table in ServiceNow is like a spreadsheet — it stores records (rows) with defined fields (columns). Every piece of data in ServiceNow — incidents, users, changes, assets — lives in a table.
> Columns = fields/attributes (e.g. Name, Status, Priority)
> Rows = individual records (e.g. INC0010003, PRB0000123)

### Key Features of Tables
| Feature | Detail |
|---|---|
| **Data Organisation** | Tables logically organise data, making it easy to manage and retrieve. |
| **Relationships** | Tables link to each other via reference fields (e.g. Incident links to User via Caller field). |
| **Predefined Tables** | ServiceNow includes standard tables: Incident, Problem, Change Request, User, etc. |
| **Custom Tables** | Admins can create custom tables for unique business needs — custom fields, workflows, logic. |
| **Access Control** | Role-based access controls who can read or modify data in each table. |
| **List & Form Views** | Table data is displayed as Lists (many records) or Forms (one record in detail). |

### Benefits of Tables
| Benefit | What It Means |
|---|---|
| **Structured Data Management** | Systematic, consistent way to manage large volumes of data. |
| **Efficiency** | Quickly find, update, and report on data through ServiceNow's interface. |
| **Automation** | Tables are central to workflows — automate processes based on data conditions. |

## Standard Fields in Every Table
> **NOTE:** ServiceNow automatically adds SIX standard fields to EVERY table — even tables that don't extend another table. You cannot remove these fields.

| # | Field Name | System Column Name | What It Records |
|---|---|---|---|
| 1 | **Created** | `sys_created_on` | Date and time the record was first created. |
| 2 | **Created by** | `sys_created_by` | Username of the person who created the record. |
| 3 | **Updated by** | `sys_updated_by` | Username of the last person who modified the record. |
| 4 | **Updated** | `sys_updated_on` | Date and time the record was last updated. |
| 5 | **Sys ID** | `sys_id` | Unique identifier (GUID) for every record in the system. |
| 6 | **Updates** | `sys_mode_count` | Number of times the record has been modified/saved. |

## Overview of Database Tables
* The base ServiceNow instance includes more than 5,000+ tables.
* Each table consists of multiple fields (columns/attributes).
* A table can extend another table — inheriting all its fields.
* Naming conventions ensure consistency (e.g. all incident fields start with "incident_").
* Admins can create, modify, or delete custom tables.
* Each application within the database contains one or more tables.

### Types of Tables in ServiceNow
| Table Type | Description | Example |
|---|---|---|
| **Core Tables** | Foundational tables provided by ServiceNow out-of-the-box. | task, incident, problem, change_request, sys_user |
| **Custom Tables** | Tables created by admins/developers for specific business needs. Names begin with u_ (global) or x_ (scoped). | u_it_equipment, u_training_course |
| **Extension Tables** | Extend a parent table — inherit all parent fields plus add new ones. | Incident extends Task -> gets all Task fields plus incident-specific ones. |
| **Reference Tables** | Store lookup data referenced by other tables. | cmn_location (Location), alm_asset (Asset) |

### Major Tables in ServiceNow
These core tables are essential to ServiceNow's ITSM functionality.

| Table Label | System Name | Table Label | System Name |
|---|---|---|---|
| Task | task | Request | sc_request |
| Incident | incident | Change Task | change_task |
| Problem | problem | SLAs | sys_sla |
| User | sys_user | Asset | alm_asset |
| Knowledge | kb_knowledge | Project | pm_project |

## Relationship Between Databases, Tables, and Fields
* A database contains multiple tables.
* Each table consists of multiple fields (columns).
* Tables are linked through reference fields, enabling complex data relationships.
* Fields define the specific data types and constraints for the stored information.

## Working with the Schema Map
> **KEY POINT:** The Schema Map is a VISUAL diagram showing how tables relate to each other. It's one of the most powerful tools for understanding a ServiceNow instance's data structure. You can print the schema map directly from a web browser.

### How to Open the Schema Map
1. **Navigate to Tables & Columns**
   Go to: System Definition > Tables & Columns.
2. **Find your table**
   Search for the table you want to map (e.g. Incident). Click on the table to open it.
3. **Click Schema Map**
   Click the "Schema map" button (next to Edit Table and Delete all records). The schema map opens — showing all related, referenced, and extended tables visually.
4. **Use the checkboxes**
   Toggle: Show referenced tables, Show referencing tables, Show extended tables, Show extending tables.

| Relationship Type | Colour | Meaning |
|---|---|---|
| **Referenced tables** | Blue line | Tables this table points TO (e.g. Incident -> User via Caller). |
| **Referencing tables** | Green line | Tables that point to THIS table. |
| **Extended tables** | Red line | Tables that EXTEND (inherit from) this table. |
| **Extending tables** | Orange line | Parent tables that THIS table extends. |

## Data Dictionary Tables
> **KEY POINT:** The Data Dictionary is the system's "encyclopedia" — it stores metadata about every table and every field in ServiceNow. Three key tables make up the Data Dictionary: sys_db_object, sys_dictionary, sys_documentation.

| Table | System Name | What It Stores |
|---|---|---|
| **Tables** | `sys_db_object` | Record details for ALL tables within the entire system. |
| **Dictionary Entries** | `sys_dictionary` | Definitions for every column/field in every table — data types, character limits, default values, dependencies. |
| **Field Labels** | `sys_documentation` | Labels and language/translation info associated with each field. |

### How to Access the Dictionary
* **Method 1 — Navigate directly:** Go to System Definition > Dictionary.
* **Method 2 — Right-click on any field:** Right-click a field label on any form or list header -> Configure Dictionary.
* **What you see:** Data type, character limit, default value, mandatory flag, choices, and dependency settings for that field.

## Exercise 1 — Creating a Custom Table
> **! IMPORTANT:** Admins and Application Developers can create custom tables to hold application-specific data. After creating a table, you can customise its fields, labels, and permissions. Role required: Admin

1. **Navigate to Tables**
   Go to: All > System Definition > Tables.
2. **Click New**
   Click the New button (top-right) to open the New Table form.
3. **Fill in the Table details**
   * **Label:** Human-readable name (e.g. "Gautham IT Solutions").
   * **Name:** System name — auto-populated from Label (e.g. `u_gautham_it_solutions`). For global scope it starts with `u_`, for scoped apps it starts with `x_`.
   * **Extends table:** leave empty (or choose a parent table to inherit from).
   * **Application:** set to Global or your specific application scope.
   * **Create module:** tick to auto-create an Application Navigator module.
   * **Create mobile module:** tick if needed.
   * **Add module to menu:** choose which app menu to add it to.
   * **New menu name:** enter menu name if creating a new one.
4. **Add Columns (Fields)**
   Click the Columns tab at the bottom of the form. Add fields: set Field label, Type (String, Integer, Reference, etc.), and Max length.
5. **Submit**
   Click the Submit button to create the table. The new table is immediately available in the system.

## Exercise 2 — Deleting a Custom Table
> **REMEMBER:** You can only delete CUSTOM tables (those you created). Base system tables cannot be deleted. Custom table names always begin with `u_` (global) or `x_` (scoped).
> Warning: You cannot delete a table that has child tables extending from it — delete those first.
> Always delete ALL records before deleting the table itself!

1. **Navigate to the Table**
   Go to: All > System Definition > Tables. Find and open the custom table you want to delete.
2. **Delete All Records first**
   Click the "Delete All Records" button. This ensures business logic (cascade rules, references) is properly executed before deletion.
3. **Click Delete**
   Click the Delete button (only visible for custom tables beginning with `u_` or `x_`).
4. **Confirm deletion**
   In the confirmation dialog box, type the word: delete. Click OK to confirm.

## The Importance of the Task Table [task]
> **KEY POINT:** The Task table is the FOUNDATION of ServiceNow ITSM. It's the parent "super-table" that Incident, Problem, Change Request, and Knowledge all extend. This means they ALL share the same base fields from Task.

Because Incident, Problem, Change Request, and Knowledge all **extend** the Task table, they automatically inherit Task's shared fields. This creates consistency across all ITSM processes.

### Shared Fields Inherited from Task
| Field | All ITSM Records Have This Because... |
|---|---|
| **Number** | Every task-based record gets a unique number (INC, PRB, CHG prefixes). |
| **Short description** | Core summary field for any work item. |
| **State** | Track the lifecycle stage of any task. |
| **Assigned to** | Link any task to the person responsible. |
| **Assignment group** | Team responsible for the task. |
| **Priority** | Relative urgency — inherited by all ITSM records. |
| **Comments / Work notes** | Collaboration fields on every task-based record. |

## What is a Dictionary Override?
> **KEY POINT:** A Dictionary Override lets you change how a field BEHAVES in a child table, WITHOUT changing it in the parent table.
> Example: The Task table has Priority field with default value = 1. You can override this in the Incident table to default to 2 — without affecting the Task or Change Request tables.

### What Admins Can Override Per Field
| Overridable Aspect | What It Changes |
|---|---|
| **Reference qualifiers** | Filter which records appear in a reference field lookup. |
| **Dictionary attributes** | Additional metadata attributes for the field. |
| **Default values** | Pre-filled value when a new record is created — per child table. |
| **Calculations** | Formula or script that auto-calculates the field value. |
| **Field dependencies** | Which other fields this field depends on. |
| **Default column display values**| What shows in list view for this field. |
| **Mandatory and read-only status** | Make a field required or locked in a specific child table only. |

### Exercise — Define a Dictionary Override
> **REMEMBER:** Role required: Admin

1. **Navigate to a field's Dictionary Entry**
   Go to: Incident > Create New. On the form, right-click the field label (e.g. "Assigned To"). Select Configure Dictionary from the right-click menu.
2. **Open Dictionary Entry Overrides**
   In the Dictionary Entry record, scroll down to the Related Lists at the bottom. Click the Dictionary Entry Overrides tab. You can see any existing overrides for this field across child tables.
3. **Create a New Override**
   Click New in the Dictionary Entry Overrides related list. Fill in the form:
   * **Base table:** Task [task] (the parent table).
   * **Table:** select the child table (e.g. Asset Reclamation Request).
   * **Column name:** assignment_group (the field being overridden).
   * Check the boxes for what to override: reference qualifier, dependency, attributes, default value, calculations, etc.
   Click Submit to save the override. The field now behaves differently in the selected child table only.

> [!TIP]
> **More Learning Resources:**
> 1. Official Docs: [Read Document](https://www.servicenow.com/docs/r/platform-administration/table-administration-and-data-management/t_CreateATable.html)
> 2. Website: [Read Article](https://www.servicenow.com/community/developer-articles/understanding-tables-in-servicenow-a-complete-guide/ta-p/3422729)
> 3. YouTube (1st): [Watch Video](https://www.youtube.com/watch?v=2L81rnJMUqk)
> 4. YouTube (2nd): [Watch Video](https://www.youtube.com/watch?v=W6Wjn1N4Vc0)
