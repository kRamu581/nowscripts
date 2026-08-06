# Incident Management in ServiceNow

Incident Management in ServiceNow is the process of restoring normal service as quickly as possible when something goes wrong.

![ServiceNow Incident Form](/images/incident-form.png)

**Incident = Any unplanned interruption or reduction in the quality of an IT service.**

Examples:
- Laptop not working
- Email not opening
- VPN connection failed
- Printer stopped working
- Application is down
- User cannot log in

**The goal is:** Fix the issue quickly and minimize business impact.

---

## Example 1 — Laptop Not Working

**Situation:** An employee comes to work and their laptop does not start.

### Step 1: Incident Creation
The user raises a ticket in ServiceNow.
- **Short Description:** Laptop not starting
- **Description:** Laptop shows black screen after power on.
- *ServiceNow generates an Incident Number: INC0012345*

### Step 2: Categorization
Support team categorizes the issue.
- **Category:** Hardware
- **Subcategory:** Laptop
- **Priority:** Medium

### Step 3: Assignment
ServiceNow assigns the ticket to the correct support team.
- **Assignment Group:** Desktop Support Team

### Step 4: Investigation
Support engineer checks:
- Power supply
- Battery
- Hardware issue
- System diagnostics
- *Status becomes: In Progress*

### Step 5: Resolution
Engineer finds the battery is faulty and replaces it.
- **Resolution Notes:** Battery replaced successfully. Device working fine.
- *Status: Resolved*

### Step 6: Closure
User confirms the issue is fixed.
- *Status: Closed*

---

## Example 2 — Outlook Email Not Working

**User reports:** "I cannot open Outlook."

**Flow:**
1. User reports issue
2. Incident created
3. Assigned to Email Support Team
4. Issue fixed
5. Resolved
6. Closed

---

## Incident Lifecycle in ServiceNow

**New** ➔ **Assigned** ➔ **In Progress** ➔ **Resolved** ➔ **Closed**

*(Note: An incident can temporarily move from **In Progress** to **On Hold** while waiting for information, and back to **In Progress** once received).*

---

## Important Fields in Incident Table

| Field | Meaning |
|-------|---------|
| **Number** | Unique Incident ID |
| **Caller** | Person who reported issue |
| **Short Description**| Brief issue summary |
| **Description** | Detailed issue |
| **Priority** | Urgency of issue |
| **Assignment Group** | Team handling issue |
| **Assigned To** | Specific engineer |
| **State** | Current ticket status |

---

## Incident vs Problem

| Incident | Problem |
|----------|---------|
| Fix current issue | Find root cause |
| Quick restoration | Permanent solution |

**Example:**
- 10 users cannot log in 
- ➔ 10 Incident Tickets created 
- ➔ 1 Problem Ticket created 
- ➔ Root cause fixed

*Incident Management is the process of restoring normal service operation as quickly as possible and minimizing business impact.*
