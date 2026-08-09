# Data Policies

A data policy in ServiceNow is a set of rules that governs the handling of data in records, ensuring consistency and quality. Unlike UI policies, which only work for data entered through a web form, data policies apply to all types of data in the system — including imports, web services, and mobile apps. 

## Exercise 1 — Enforcing Root Cause on Problem Records from an External System

**Situation:** The company has connected an external monitoring tool to ServiceNow through a web service. This tool can automatically close Problem records once an issue is fixed. However, it currently allows a Problem to be closed without ever recording the Root Cause, which breaks reporting. 

**Role required:** admin

### Procedure
1. Navigate to All > System Policy > Data Policies and click New. 
2. Set Table to Problem and Short description to “Root cause required when Closed”. 
3. Under Conditions, set [Problem state] [is] [Closed]. 
4. In the Data Policy Rules related list, add a rule for the Root cause field and set Mandatory to True. 
5. Leave 'Use as UI Policy on client' checked so browser users also see the same rule, and Save. 

**Result:** Now, whether a Problem is closed from the web form or through the external web service, ServiceNow rejects the update unless Root cause is filled in.

> [!TIP]
> **More Learning Resources:**
> 1. Official Docs: [Read Document](https://www.servicenow.com/docs/r/servicenow-platform/data-policies)
> 2. Website: [Read Article](https://logiupskills.com/data-policy/)
> 3. YouTube (1st): [Watch Video](https://www.youtube.com/watch?v=QEUCE5YH9Ec)
> 4. YouTube (2nd): [Watch Video](https://www.youtube.com/watch?v=oBMvydB1oGo)
