# Change Management in ServiceNow

![ServiceNow Change Form](/images/change-form.png)

Change Management in ServiceNow is the process of **planning, approving, testing, and implementing changes safely so that business services are not disrupted.**

**Change** = Any addition, modification, or removal that affects IT services.

**Examples:**
*   Deploying new application code
*   Server upgrade
*   Database update
*   Installing security patches
*   Changing network configuration
*   Migrating application to cloud

**Goal:**
Make changes with minimum risk and minimum downtime.

---

## Example 1 — Server Upgrade

**Situation:**
Company wants to upgrade application server memory.
*If engineer directly changes server:* → Application may go down ❌
*So company follows Change Management.*

### Step 1: Create Change Request
Engineer creates Change Request.
*   **Change Number:** CHG000123
*   **Short Description:** Upgrade application server memory

### Step 2: Risk & Impact Analysis
Team checks:
*   Will service stop?
*   How many users affected?
*   Rollback possible?
*   Expected downtime?
*   **Example:** Risk → Medium, Impact → High

### Step 3: Approval
Approvals may come from:
*   Manager
*   Application owner
*   CAB (Change Advisory Board)
*   **Approved** ✅

### Step 4: Implementation
Engineer performs change.
*   **Example:** Server upgraded, Application tested.

### Step 5: Validation
Check:
*   System working?
*   Users able to access?
*   *If successful:* State → Review → Closed

---

## Example 2 — Production Deployment

Developer created a new feature.

**Flow:**
**Development Complete** ➔ **Create Change Request** ➔ **Approval** ➔ **Deploy to Production** ➔ **Testing** ➔ **Close Change**

*Without Change Management: Production issue may happen.*

---

## Change Lifecycle in ServiceNow

![Change Lifecycle](/images/change-lifecycle.png)

**New** ➔ **Assess** ➔ **Authorize** ➔ **Scheduled** ➔ **Implement** ➔ **Review** ➔ **Closed**

---

## Types of Change in ServiceNow

### 1. Standard Change
Low risk, pre-approved.
*   **Example:** Password reset, Routine patch update

### 2. Normal Change
Needs review and approval.
*   **Example:** Server upgrade, Application deployment

### 3. Emergency Change
Urgent changes to restore service.
*   **Example:** Production server down, Critical security vulnerability

---

## Important Fields in Change Table

| Field | Meaning |
| :--- | :--- |
| **Change Number** | Unique ID (CHG001) |
| **Type** | Standard / Normal / Emergency |
| **Risk** | Low / Medium / High |
| **Impact** | Business effect |
| **Implementation Plan**| Steps to perform change |
| **Rollback Plan** | Recovery steps |
| **Approval** | Approval status |
| **State** | Current status |

---

## Incident vs Problem vs Change (Very Important)

| Incident | Problem | Change |
| :--- | :--- | :--- |
| Restore service | Find root cause | Implement solution |
| Fast recovery | Permanent fix | Controlled modification |

**Example (Website Down):**
**Incident** (Restore website) ➔ **Problem** (Find database issue) ➔ **Change** (Upgrade database server)

> [!TIP]
> **Easy way to remember:**
> **Incident** = Fix current issue
> **Problem** = Find why issue happened
> **Change** = Apply controlled solution

**Change Management is the process of controlling and implementing changes in IT services with minimum risk and business disruption.**
