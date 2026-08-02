## What is a Formatter?
> **KEY POINT:** A Formatter is a special form element that displays information which is NOT directly stored as a field in the record. Think of formatters as "smart widgets" that show live, contextual information on a form — like process stages, activity logs, or related search results.

### Types of Formatters in the Base Platform
| Formatter | What It Displays |
|---|---|
| **Process Flow Formatter** | Shows the different stages of a process as a horizontal progress bar at the top of the record form. |
| **Activity Formatter** | Shows the full list of activities (history/audit trail) on a task form — who did what and when. |
| **CI Relations Formatter** | On a Configuration Item (CI) form, shows a toolbar for viewing relationships between the current CI and related CIs. |
| **Contextual Search Results Formatter** | Enhances the search results display by showing results organised based on the user's query context. |
| **Approval Summariser Formatter** | Dynamically shows summary information about the approval request being processed. |
| **Parent Breadcrumbs Formatter** | Shows breadcrumbs displaying the parent record(s) of the current task. |

## 1. Process Flow Formatter
The **Process Flow Formatter** gives users a visual overview of all stages within a process. It appears as a horizontal progress bar at the very top of a form.

| Feature | Detail |
|---|---|
| **Where it appears** | At the top of forms associated with that process (e.g. Incident, Problem). |
| **How it works** | Each stage is an entry in the [sys_process_flow] table with optional conditions. |
| **Active stage** | The current stage is highlighted. Completed stages show a tick (✔). |
| **Configuration** | Navigate to All > System UI > Process Flow to create/edit stages. |

### Exercise 1 — Create a Process Flow Formatter Stage
> **REMEMBER:** Role required: admin

1. **Navigate to Process Flow**
   Go to: All > System UI > Process Flow.
2. **Create a new stage**
   Click New to open the Flow Formatter form.
3. **Fill in the form**
   * **Table:** select the table (e.g. Incident [incident]).
   * **Name:** internal name for the stage (e.g. "New").
   * **Label:** the text shown in the progress bar.
   * **Order:** controls the stage position (100 = first, 200 = second, etc.).
   * **Condition:** define when this stage should be highlighted (e.g. State is New).
   * **Active:** check this to make the stage live.
4. **Save/Submit**
   Click Submit to save the new stage.

## 2. Activity Formatter
The **Activity Formatter** shows a complete history log of everything that has happened on a record — field changes, work notes, emails, and user actions — in chronological order.

### Exercise 2 — Configure the Activity Filter
> **REMEMBER:** By default, ALL activity fields appear in alphabetical order. You can filter which fields show and reorder them using the Activity Filter. Role required: admin

1. **Open an Incident record**
   Navigate to any existing Incident.
2. **Open the Activity filter**
   In the Activity section, click the filter icon in the Activity header.
3. **Select fields to display**
   Tick/untick fields to show or hide them in the activity log. Fields update dynamically as you select.
4. **Configure Available Fields**
   Click "Configure Available Fields" to permanently set which fields are available in the filter.
5. **Close the filter**
   Click the filter icon again to close the filter panel.

## 3. Contextual Search Results Formatter
The **Contextual Search Results Formatter** enhances how search results are displayed, by organising them based on the user's current context and query. It is especially useful in environments with large volumes of knowledge articles.

* **Highlighting Relevance:** Shows the most relevant results first based on the search context.
* **Additional Information:** Includes summaries, links, and related records alongside results.
* **Improved Usability:** Reduces time spent sifting through irrelevant results.

### Exercise 3 — Configure Contextual Search Result
> **REMEMBER:** Role required: admin

1. **Navigate to Table Configuration**
   Go to: All > Contextual Search > Table Configuration, then click New.
2. **Fill in the form fields**
   * **Table:** select the target table (e.g. Incident [incident]).
   * **UI Type:** Platform.
   * **Search context:** Incident Deflection.
   * **Title:** Related Search Results.
   * **Set Limit and Results per page** (e.g. 10).
   * Enable related search box and source sector checkboxes.
   * Add filter Condition: Active is true.
3. **Submit**
   Click Submit to save the configuration.

### How to Add a Formatter via Form Design
Once you've created a formatter configuration, you need to add it to the form using **Form Design**.

1. **Open Form Design**
   Open an Incident or Problem record -> right-click Form Header -> Form Design.
2. **Search for formatters**
   In the left Field Navigator, type "formatter" in the search box.
3. **Drag to form**
   Find your formatter in the "Formatters" section and drag it to the desired location on the form layout.
