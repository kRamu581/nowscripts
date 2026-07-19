# Problem Management

### What is a Problem?

A problem is the underlying cause of one or more incidents. The root cause is often unknown when the problem is initially created.

### What is Problem Management?

Problem Management is responsible for:

-   **Investigating:** Determining the root cause of incidents.
-   **Resolving:** Implementing solutions to prevent future incidents.
-   **Minimizing Impact:** Reducing the impact of incidents that cannot be prevented.

### Problem States

-   **New:** The initial state when a problem is created.
-   **Assess:** The problem is being evaluated.
-   **Duplicate/Canceled:** The problem is deemed a duplicate or invalid during assessment.
-   **Root Cause Analysis (RCA):** The root cause is being actively investigated.
-   **Accepted Risk:** The problem is acknowledged, but a fix is not feasible or too risky. A workaround may be in place. This often leads to a "Known Error" record.
-   **Fix in Progress:** A solution is being implemented. This might involve a change request.
-   **Resolved:** The root cause has been addressed.
-   **Closed**: The problem has been fixed.

### Problem Management Lifecycle (Stages)

1.  **Detection and Logging:**
    
    -   **Reactive:** Identifying a problem based on multiple related incidents.
    -   **Proactive:** Identifying a potential problem before it causes widespread incidents.
    -   **Creating Record:** Creating a new problem record.
    -   **Prioritizing/Categorizing:** Setting priority and category.
2.  **Investigation and Diagnosis:**
    
    -   **Conducting RCA:** Performing root cause analysis.
    -   **Problem Tasks:** Creating problem tasks for other teams if necessary.
    -   **Documenting:** Recording the root cause, workaround, and fix.
3.  **Resolution and Closure:**
    
    -   **Confirming Workaround:** Verifying that the workaround (if any) is effective.
    -   **Confirming Fix:** Verifying that the permanent fix resolves the issue.
    -   **Implementing Change:** Using change management to implement the fix if required.
    -   **Closing Problem:** Closing the problem record (manually or automatically).

### Problem Management Pictorial Representation

This section describes a diagram illustrating the problem management process.

-   **Problem Creation:** Problems can originate from:
    -   Incident Management
    -   Event Management
    -   Technical Support
    -   Development Code Review
-   **Logging/Categorization/Prioritization**
-   **Known Error Check:** Determining if the problem is already a known error.
-   **Diagnosis:**
    -   **Workaround Availability:** A workaround is crucial for creating a known error or proceeding with resolution.
-   **Resolution:** Review and closure.

### ServiceNow Problem Management Demo

#### List View

Similar to the Incident list view, the Problem list view offers filtering, sorting, grouping, and exporting capabilities.

#### Form View (Creating a New Problem)

-   **Fields:**
    
    -   **First Reported By:** May be linked to an incident.
    -   **Category/Subcategory:** Classify the problem.
    -   **Configuration Item:** Specify the affected CI.
    -   **Problem Statement/Description:** Describe the problem.
    -   **Assignment Group/Assigned To:** Assign the problem.
    -   **Related Incidents:** Link related incidents.
    -   **Problem Tasks / Change Requests:** Create or associate related records.
-   **Sections:** Notes, Analysis Information, Resolution Information.
    

#### Working on a Problem (Impersonation)

-   **Assigning:** Assign the problem to a group and individual.
-   **Marking Duplicate:** Mark the problem as a duplicate of an existing problem.
-   **Confirming:** Confirm that the issue is indeed a problem
-   **Accepting Risk:** Acknowledge the problem, but choose not to fix it (creating a known error).
-   **Creating Problem Tasks:** Assign tasks to other teams for investigation.
-   **Starting Fix:** Initiate the fix process.
-   **Re-analyze**
-   **Resolving:** Document the cause and fix, and mark the problem as resolved.
-   **Complete**

#### Creating a Problem from an Incident

Demonstrates creating a problem directly from an incident record (right-click -> Create Problem).

#### Problem Data Structure

-   **Task Table (Parent):** The base table.
-   **Problem Table (Child):** Inherits fields from Task and adds problem-specific fields (Cause Notes, Fixed Notes, Workaround, etc.).
-   **Problem Task Table (Child):** Used for assigning sub-tasks. One problem can have multiple problem tasks.
-   **Data Types:**

* * *



## Continual Improvement Management (CIM)

### What is Continual Improvement Management?

CIM is a method for identifying and implementing improvements to IT processes and services. It involves:

-   **Identifying Opportunities:** Finding areas for improvement.
-   **Planning and Executing:** Developing and implementing improvement initiatives.
-   **Measuring and Sharing:** Tracking the effectiveness of improvements.

### Key Concepts

-   **Service, Process, and Function Improvements:** CIM can target improvements in services, processes, or specific IT functions.
-   **Improvement Initiatives:** Contain goals, phases, and tasks to guide the improvement effort.
-   **Measurement:** Objectively measuring the impact of improvements.

### Benefits of CIM

-   Optimize the value of processes, people, and/or tools.
-   Improve business efficiency.

### CIM Roles

-   **Improvement Requester:** Submits improvement requests.
-   **Improvement Manager:** Analyzes, plans, and executes improvements.
-   **Improvement Coordinator:** Coordinates the overall improvement effort.

### CIM Process Flow

1.  **Identify Improvement Opportunities:** Discover potential improvements (through meetings, analysis, etc.).
2.  **Plan and Execute:** Align the improvement with strategy, set goals, and execute.
3.  **Measure and Share:** Track and report on the business value of the improvement.
4.  **Continuous Cycle:** Identify further opportunities for improvement.

### CIM Process Steps

1.  **Recognize Need:** Identify the need for improvement.
2.  **Submit Initiative:** Create a new improvement initiative.
3.  **Review and Accept:** Evaluate and approve the initiative.
4.  **Assign and Coordinate:** Assign the initiative to a coordinator, create phases and tasks, and manage progress.
5.  **Review and Close:** Review the completed improvement and close the initiative.
6.  **Measure Value:** Assess the impact and identify further opportunities.

### CIM Sources

Improvements can originate from:

-   Incident/Problem Management
-   Demand Management
-   Service Level Agreements (SLAs)
-   Benchmarks
-   Analytics
-   Tasks
-   Process Optimization
-   Idea Portal

### ServiceNow CIM Demo

#### Plugin Installation

-   CIM requires installing a plugin (System Definition -> Plugins).
-   **Continual Improvement Management:** A paid plugin (may be available for free in personal developer instances).
-   **Automated Test Framework (ATF) Quick Start Tests:** A free plugin.

#### Creating an Improvement Initiative (From Incident/Problem)

Demonstrates creating an improvement initiative from an incident or problem record.

-   **Fields:**
    
    -   **Business Service/Offering:** Specify the area for improvement.
    -   **CIM Coordinator:** Assign a coordinator (may need to create a new user with the role).
    -   **Approval Group:** Assign an approval group.
    -   **Strategy:** Select the improvement strategy (e.g., Cost Saving).
    -   **Priority/Effort/Benefit:** Assess the impact and value of the improvement.
    -   **Business Justification:** Explain the reason for the improvement.
    -   **Success Measurement Method:** Choose how to measure success (PA Indicator, Assessment, Manual, Report).
    -   **KPI Improvements**
-   **Related Lists:** CIM Tasks, CIM Phases.
    

#### Working on an Improvement Initiative

-   **Accepting/Rejecting:** The Improvement Manager approves or rejects the initiative.
-   **Creating Tasks:** Create tasks for specific actions.
-   **Assessing:** Evaluate
-   **Waiting for Approval:** The initiative requires approval.
-   **In Progress/Review/Closed:** The states of the initiative as it progresses.

#### User Roles (Example)

Demonstrates assigning CIM roles (Improvement Manager, Improvement Coordinator) to a user.

#### Workbench/Dashboard

CIM provides a workbench or dashboard for monitoring the progress and impact of improvements.

* * *

**Key Takeaways**

-   ServiceNow provides a comprehensive ITSM platform for managing incidents, problems, and continual improvement.
-   ITIL principles are integrated into ServiceNow's processes.
-   Understanding roles, states, and lifecycles is crucial for effective ITSM.
-   ServiceNow offers automation, reporting, and a user-friendly interface.
-   CIM helps organizations continuously improve their IT services and processes.
-   Plugins may be required for certain features (e.g., CIM).
-   Personal Developer Instances (PDIs) are valuable for learning and experimenting with ServiceNow. Remember to keep your PDI active by logging in regularly.
