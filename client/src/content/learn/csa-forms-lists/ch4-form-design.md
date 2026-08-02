## What is a Form in ServiceNow?
A Form in ServiceNow displays detailed information from a SINGLE record in a database table. It is your main workspace for viewing, entering, and editing record data.

| Feature | Detail |
|---|---|
| **Displays one record** | Shows all fields and data from a single table entry. |
| **Varies by record type** | An Incident form looks different from a Change Request form. |
| **View and Edit** | Users can read and update records directly on the form. |
| **Admin configurable** | Admins control which fields appear, their order, and layout. |
| **How to open** | From Application Navigator modules or by clicking a record number in a List. |

> **NOTE:** There are THREE ways to design/customise forms in ServiceNow: (1) Form Design (2) Form Layout (3) Form Builder

Access Form Design, Form Layout, and Form Builder via Configure menu on any form.

## Form Design
**Form Designer** is a drag-and-drop visual tool for designing the structure of forms.

### What you can do with Form Designer
* Create form layouts — arrange fields visually.
* Create form views — different layouts for different user roles.
* Create and delete form sections — group related fields together.
* Add new fields directly to database tables.

### Form Designer — Three Components
| Component | Purpose |
|---|---|
| **Header** | Shows form name, view, and navigation controls. |
| **Field Navigator** | Left panel — lists all available fields and field types. |
| **Form Layout** | Centre panel — drag fields here to arrange the form. |

### Opening Form Designer in Studio
* **Step 1:** Click the Create Application File link in Studio.
* **Step 2:** Select Form and click Next.
* **Step 3:** Choose the form's table and click Create.
* **Step 4:** Configure the form using the drag-and-drop interface.

## Form Design Outline & Exercises
> **KEY POINT:** Form Design Outline = the structure and layout of a form. It defines which sections exist, how many columns each has, and which fields appear.

### Exercise 1 — Add a Form Annotation
Annotations are form elements that display text or instructions on a form — they don't store data, they just show information visually.

1. **Navigate to the Form Designer**
   Go to an Incident or Problem record -> right-click form header -> Configure -> Form Design.
2. **Select Field Types tab**
   In the left Field Navigator panel, click the "Field Types" tab.
3. **Drag Annotations to the form**
   Select "Annotations" from the list and drag it to your desired location on the form layout.
4. **Set Annotation text**
   Click the gear icon on the Annotations field -> Properties dialog -> enter your Annotation Text. HTML tags are supported.
5. **Save**
   Click the Save button to apply the annotation.

### Exercise 2 — Add a New Section
> **REMEMBER:** Sections group related fields on a form. Each section can have a 1-column or 2-column layout.
> Important: The FIRST section is always read-only and shows the table name — you cannot remove it.

1. **Navigate to Form Designer**
   Go to an Incident record -> Configure -> Form Design.
2. **Add a new section**
   Click the (+) button next to any section label to create a new section below it.
3. **Name the section**
   Enter a label for the new section (e.g. "Resolution Information").
4. **Reorder sections**
   Drag section headers to rearrange their order. The first section's label = the form title.
5. **Delete a section**
   Click the (x) button next to the section label to remove it.
6. **Save**
   Click Save.

## Configuring the Form Layout
> **KEY POINT:** Form Layout lets you change WHICH fields appear on a form and in what order — using a simple "slush bucket" (Available -> Selected) interface.
> Requires role: admin OR personalize_form

> **! IMPORTANT:** Use Form Builder instead of Form Layout when possible — Form Builder includes all Form Layout features PLUS many more powerful options.

1. **Navigate to a form**
   Open any Incident or Problem record.
2. **Open Form Layout**
   Click the form context menu (or right-click header) -> Configure -> Form Layout.
3. **Select fields to display**
   Move fields from "Available" to "Selected" using the slush bucket arrows. Reorder using up/down arrows.
4. **Handle related table fields**
   Fields shown in GREEN with a (+) sign are from related tables. Use dot-walking to include them (e.g. caller.email).
5. **Save**
   Click Save to apply changes.

## Using the Form Builder
The **Form Builder** is the most powerful and recommended tool for form customisation in ServiceNow. It provides a modern, visual interface to add fields, split columns, arrange sections, and configure properties — all from one unified tool.

### Why use Form Builder?
* Includes everything Form Designer and Form Layout can do — plus more.
* Add new fields directly to the database table without leaving the builder.
* Split form into 1-column or 2-column sections visually.
* Preview the form before saving.
* Search for any field by name instantly.
* Modern interface — much easier to use than the older tools.

### Method 1: Access via Configure Menu
On any form record, open the context menu:
* **Step 1:** Navigate to any form record (e.g. an Incident).
* **Step 2:** Click the form context menu (three dots at top right).
* **Step 3:** Select Configure -> Form Builder.

### Method 2: Access via Related Links
You can also open Form Builder from the Related Links section of any table record. Scroll to the bottom of a record -> Related Links -> click Form Builder.

> **TIP:** Quick Comparison: Form Design = structure (sections/annotations). Form Layout = which fields appear. Form Builder = does ALL of the above + more, in one modern interface. Always prefer Form Builder for new configurations.
