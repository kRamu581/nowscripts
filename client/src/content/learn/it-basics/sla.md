## What is SLA?

**SLA (Service Level Agreement)** is an agreement between the service provider and the customer that defines the expected time to respond to and resolve an incident or service request.

**SLA = A predefined time limit within which IT support must respond to and resolve an issue.**

![ServiceNow SLA Form](/images/sla-form.png)

### Goal

* Resolve incidents within the agreed time.
* Improve customer satisfaction.
* Monitor support team performance.
* Meet business commitments.

---

## Example 1 — Laptop Not Working

### Situation

An employee reports:

> **"My laptop is not starting."**

An Incident is created: **INC001001**

The company has the following SLA:

* **Response Time:** 30 Minutes
* **Resolution Time:** 4 Hours

This means:

* IT Support must respond within **30 minutes**.
* The issue must be resolved within **4 hours**.

---

### Step 1: Incident Created

The user raises an incident.

**Example:**
**Short Description:** Laptop not starting

ServiceNow creates: **INC001001**

As soon as the incident is created,

**ServiceNow automatically attaches the SLA.**

---

### Step 2: SLA Starts

The SLA timer starts automatically.

**Example:**
* Response SLA ➔ 30 Minutes
* Resolution SLA ➔ 4 Hours

---

### Step 3: Assignment

The incident is assigned to: **Desktop Support Team**

The engineer starts working.

**State:** In Progress

The SLA timer continues running.

---

### Step 4: Resolution

The engineer replaces the faulty battery.

**Resolution Notes:**
Battery replaced successfully. Laptop is working fine.

**State:** Resolved

The SLA timer stops.

---

### Step 5: Closure

The user confirms the laptop is working.

**State:** Closed

**Result:** SLA Met ✅

---

## Example 2 — VPN Not Working

Employee reports: **VPN connection failed.**

**Flow:**
**Incident Created** ➔ **SLA Started** ➔ **Assigned** ➔ **Issue Fixed** ➔ **Resolved** ➔ **Closed**

If the issue is resolved within the SLA time, the result is **SLA Met**.
Otherwise, the result is **SLA Breached**.

---

## SLA Lifecycle

**Incident Created** ➔ **SLA Starts** ➔ **Running** ➔ **Paused (Optional)** ➔ **Completed**

---

## When is SLA Paused?

The SLA timer pauses when the incident is waiting for something.

Examples:

* Waiting for Customer
* Waiting for Vendor
* Waiting for Approval
* Waiting for Hardware Replacement

Once the waiting condition is over, the SLA timer starts again.

---

## SLA Breach

Suppose the Resolution SLA is: **4 Hours**

But the engineer resolves the issue after: **6 Hours**

**Result:** SLA Breached

The company did not meet the agreed service level.

---

## Response SLA vs Resolution SLA

| Response SLA                     | Resolution SLA                          |
| -------------------------------- | --------------------------------------- |
| Time to acknowledge the incident | Time to completely resolve the incident |
| Example: 30 Minutes              | Example: 4 Hours                        |

---

## SLA Based on Priority

| Priority      | Response Time | Resolution Time |
| ------------- | ------------- | --------------- |
| Critical (P1) | 15 Minutes    | 2 Hours         |
| High (P2)     | 30 Minutes    | 4 Hours         |
| Moderate (P3) | 1 Hour        | 8 Hours         |
| Low (P4)      | 4 Hours       | 24 Hours        |

*(These values differ from company to company.)*

---

## Important Fields in SLA

| Field              | Meaning                  |
| ------------------ | ------------------------ |
| SLA Definition     | Name of the SLA          |
| Type               | Response or Resolution   |
| Target             | Time limit               |
| Stage              | Current SLA status       |
| Business Time Left | Remaining business hours |
| Start Time         | SLA start time           |
| Stop Time          | SLA completion time      |

---

## Easy Way to Remember

* **Incident** = Fix the issue
* **Problem** = Find the root cause
* **Change** = Implement the permanent solution
* **SLA** = Defines how quickly the issue must be responded to and resolved

---

## One-Line Definition (Interview)

> **SLA (Service Level Agreement) is an agreement between the service provider and the customer that defines the expected response and resolution time for incidents and service requests. It helps organizations monitor support performance and ensure services are delivered within agreed timelines.**
