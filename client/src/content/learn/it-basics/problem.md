# Problem Management in ServiceNow

![ServiceNow Problem Form](/images/problem-form.png)

Problem Management in ServiceNow is the process of **finding the root cause of incidents and preventing them from happening again**.

**Problem** = The underlying cause of one or more incidents.
*   **Incident** fixes the issue **temporarily**.
*   **Problem Management** fixes the issue **permanently**.

---

## Example 1 — Login Issue

**Situation:**
Many employees cannot log in to the company application.

1.  Support team creates incidents:
    *   INC001 → User A cannot login
    *   INC002 → User B cannot login
    *   INC003 → User C cannot login
2.  Support restores service quickly.
3.  But IT notices: *"This issue keeps happening every day."*
4.  Now they create a **Problem Record**: `PRB000123`

### Problem Investigation
Team investigates:
*   Check logs
*   Check server performance
*   Check database
*   Analyze patterns

**Root cause found:** Database connection timeout.
**Permanent fix applied.**
**Result:** No more login incidents.

---

## Example 2 — Outlook Keeps Crashing

1.  Users raise multiple incidents: `INC101`, `INC102`, `INC103`
2.  **Temporary fix:** Restart Outlook. But issue returns.
3.  Problem team investigates.
4.  **Root Cause:** Outlook plugin conflict.
5.  **Permanent solution:** Remove faulty plugin.
6.  Problem closed ✅

---

## Problem Lifecycle in ServiceNow

![Problem Ticket Lifecycle](/images/problem-lifecycle.png)

**New** ➔ **Assess** ➔ **Root Cause Analysis** ➔ **Fix Applied** ➔ **Resolved** ➔ **Closed**

---

## Important Fields in Problem Table

| Field | Meaning |
| :--- | :--- |
| **Problem Number** | Unique ID (PRB001) |
| **Short Description**| Problem summary |
| **Description** | Detailed issue |
| **Priority** | Business impact |
| **Root Cause** | Actual reason |
| **Workaround** | Temporary solution |
| **State** | Current status |

---

## What is Root Cause Analysis (RCA)?

**RCA means:** Finding the actual reason behind repeated incidents.

**Example:**
*   **Incident:** Website is slow
*   **Root Cause:** Database memory full

---

## Incident vs Problem

| Incident Management | Problem Management |
| :--- | :--- |
| Restore service quickly | Find root cause |
| Short-term fix | Long-term fix |
| Reactive | Preventive |

**Example:**
*   Email not working *(Incident)* -> Mail server issue *(Problem)*

> [!TIP]
> **Easy way to remember:**
> **Incident** = Fire Fighting 🔥
> **Problem** = Finding why fire happened 🔍

**Problem Management is the process of identifying and eliminating the root causes of incidents to prevent recurrence.**
