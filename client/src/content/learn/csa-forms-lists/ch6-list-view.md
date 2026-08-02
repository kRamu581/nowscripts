## What is List View?
> **KEY POINT:** List View in ServiceNow displays MULTIPLE records from a table in a spreadsheet-like table format. It lets you quickly see, filter, sort, and act on many records at once — without opening each one individually.

| Feature | What It Does |
|---|---|
| **Column Display** | Shows multiple fields as columns, giving a quick overview of all records. |
| **Sorting & Filtering** | Sort by any column header. Apply filters to narrow records by specific criteria. |
| **Customisation** | Add/remove columns, save personal views, create different list configurations. |
| **Inline Editing** | If permissions allow, double-click a field value to edit it directly in the list. |
| **Bulk Actions** | Select multiple records at once to update, delete, or export them all together. |

## List Interface — Parts & Labels
Every List View has the same structure: a Title Bar at the top, Breadcrumbs/Filters below it, Column Headings (each one is a field), and the Record Rows below.

| Part | What It Shows / Does |
|---|---|
| **Title Bar** | Table name, New button, Search field, pagination (e.g. "1 to 20 of 64"). |
| **Breadcrumbs** | Shows active filter conditions (e.g. All > Active = true). Click ">" to remove a condition. |
| **Column Headings** | Each column = one field. Click to sort ascending/descending. Right-click for Configure options. |
| **Fields (Rows)** | Each row = one record. Click the record number to open it in Form view. |
| **Footer** | Pagination controls — navigate between pages of results. |

## Exercise 1 — Configure the List Layout
List Layout controls which columns (fields) appear in the list, and their order.

> **REMEMBER:** Role required: admin and personalize_list

1. **Navigate to the list**
   Go to any list (e.g. Incidents).
2. **Open List controls menu**
   Click the "=" (hamburger) menu in the title bar and select View > (view name) to choose the view to configure.
3. **Open Configure > List Layout**
   Right-click any column heading and select Configure > List Layout.
4. **Add, remove, or reorder fields**
   Move fields between Available and Selected columns using the slush bucket. Use up/down arrows to reorder.
5. **Set first column**
   The first non-reference field automatically links to the form view. Use the record number as the first column for best results.
6. **Save**
   Click Save.

## Exercise 2 — Configure the List Controls
List Controls let you configure the behaviour of a list — things like buttons, roles, and editing options.

> **REMEMBER:** Role required: admin and personalize_list

1. **Open a List View**
   Navigate to any list (e.g. Incidents).
2. **Open List Control**
   Right-click any column heading -> Configure -> List Control.
3. **Complete the form**
   Adjust controls such as: Omit new button, Omit edit button, Omit if empty, List edit type, etc.

### List Control Options Reference
| Control Name | What It Does |
|---|---|
| **Table** | Name of the table for this list (auto-set by system). |
| **Related list** | Table and field that define the related list (auto-set). |
| **Label** | Custom display label for this list. Defaults to the table's plural label. |
| **Omit new button** | Hides the New button on this list. Can be role-controlled. |
| **Omit edit button** | Hides the Edit button on this list. Can be role-controlled. |
| **Omit if empty** | Completely hides the related list section if it has no records. |
| **Omit columns if empty** | Hides column headers and filters for empty columns. |
| **Omit filters** | Hides the filter breadcrumbs for this list. |
| **Omit links** | Hides hyperlinks to related records in this list. |
| **Omit drill-down link** | Disables the record link in the first column (record number). |
| **List edit type** | Controls how inline cell editing works: Save immediately or Save by row. |
| **List edit insert row** | Allows creating new records directly from an empty row at the bottom. |
| **Remove Pagination** | Removes the record count from the pagination display. |
| **Application** | Sets whether this control applies globally or to a specific scope. |

## Exercise 3 — List Control Real-World Example
> **NOTE:** Scenario: Rename the "Incidents" related list on a Problem record to "Child Incidents" AND prevent users from creating new incidents directly from the Problem form.

> **REMEMBER:** Role required: admin and personalize_list

1. **Open a Problem record**
   Navigate to a Problem record (e.g. PRB0007601).
2. **Open List Control**
   In the Incidents related list at the bottom, right-click a column heading -> Configure > List Control.
3. **Rename the list label**
   Change the Label field to "Child Incidents".
4. **Hide the New and Edit buttons**
   Check "Omit New button" and "Omit Edit button".
5. **Submit**
   Click Submit to save. Return to the Problem record.

## Exercise 4 — List Calculations
**List Calculations** let you show totals, minimums, maximums, or averages for numeric columns at the bottom of a list.

> **REMEMBER:** Role required: admin and personalize_list. Note: Calculations only work on the stored database values — not dynamically calculated fields. Calculations apply only to the view in which they are configured.

1. **Right-click a numeric column header**
   In a list, right-click the heading of a numeric column (e.g. Priority).
2. **Select Configure > List Calculations**
   The calculation options panel opens.
3. **Choose calculation types**
   Pick one or more: Total value, Minimum value, Maximum value, Average value. (Text/date fields only support Min/Max.)
4. **Click OK**
   The calculation result appears below the last record in that column.

## Filters & Search
Filters determine which records are displayed in a list. The current filter is always shown in the **breadcrumbs** above the list (e.g. All > Active = true). You can search, sort, and filter columns directly.

| Method | How It Works |
|---|---|
| **Search bar** | Type in the search box at the top of any column — instant filter as you type. |
| **Column sort** | Click any column heading to sort ascending. Click again for descending. |
| **Inline edit** | Double-click a field value (if permission allows) to edit it in place. |
| **Condition Builder** | Click the funnel/filter icon to open the full condition builder. |
| **Breadcrumbs** | Click the ">" next to a condition to remove it from the active filter. |

### Using the Condition Builder
The **Condition Builder** (click the funnel icon) lets you build complex multi-condition filters.

| Benefit | Detail |
|---|---|
| **Highly effective** | Replaces complex SQL queries with a simple visual interface. |
| **Related field access** | Grants access to fields in related tables via dot-walking. |
| **Save conditions** | Save frequently-used filters for future use. |
| **AND / OR logic** | Combine multiple conditions with AND or OR buttons. |
| **Avoid duplicates** | Built-in validation prevents duplicate conditions. |

1. **Open Condition Builder**
   Click the funnel icon at the top-left of any list.
2. **Set conditions**
   For each condition: choose Field, Operator (is/contains/starts with etc.), and Value.
3. **Add more conditions**
   Click AND (all conditions must match) or OR (any condition can match).
4. **Run the filter**
   Click Run to apply. Only matching records will appear. Breadcrumbs update accordingly.
5. **Save the filter**
   Click Save... to store this filter for future use.

### Breadcrumbs & Removing Conditions
The **breadcrumb trail** above the list shows all active filter conditions. The syntax "All > Active = true > Category = Software" means both conditions are active.

> **NOTE:** To REMOVE a filter condition: click the ">" symbol to the LEFT of the condition you want to remove. Example: to remove "Active = true", click the ">" between "All" and "Active = true". Dynamic Filters: clicking ">" removes all conditions to the right of that point. Copy Query or URL: copy the current filter as a URL query string to share or bookmark.

## Hierarchical Lists
**Hierarchical Lists** allow users to view records from related lists directly within a v2 list interface, without needing to navigate to a separate form. For example, you can see all child Incidents inside a Problem list row without opening the Problem record.

## Personalisation vs. Configuration
| Aspect | Personalisation (User) | Configuration (Admin) |
|---|---|---|
| **Who it affects** | Only the individual user — no one else sees these changes. | All users (or users with specific roles). |
| **Adding/removing columns** | Users can add or remove columns from their view. | Admins set the default columns for everyone. |
| **Reordering columns** | Drag and drop to rearrange column order. | Set via List Layout configuration. |
| **Saving views** | Save personal views for future use. | Save named views accessible to all. |
| **Filtering & sorting** | Apply and save personal filters. | Set default filters for module views. |
| **Inline editing** | Depends on permissions given by admin. | Admins configure List edit type. |

## Search Conditions with Wildcard Entries
**Wildcards** let you search for partial matches when you don't know the exact value.

| Wildcard | Symbol | Example | Result |
|---|---|---|---|
| **Asterisk** | * | task* | Matches: task, tasks, task123, taskABC |
| **Question Mark** | ? | task? | Matches: task1, taskA, taskX (single char only) |
| **Combine with conditions** | + | \*sap\* AND Priority=Critical | Records containing "sap" AND are Critical priority |

## Key Difference: Lists vs Forms
| Aspect | List View | Form View |
|---|---|---|
| **What it shows** | Multiple records from a table in a table/spreadsheet format. | A single record with all its fields in detail. |
| **Purpose** | Quick overview, search, filter, and compare many records. | View, enter, or update detailed data for one specific record. |
| **Actions available** | Filter, sort, bulk update, delete, export. | Edit individual fields, submit changes, create related records. |
| **Customisation** | Add/remove columns, save list views, set list controls. | Configure fields shown, sections, layout, annotations. |
| **Best used for** | Finding records, reviewing large sets of data. | Updating a specific incident, change request, or task. |
