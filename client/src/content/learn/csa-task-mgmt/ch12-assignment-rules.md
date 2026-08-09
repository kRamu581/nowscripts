# Assignment Rules

The instance can automatically assign a task to a user or group based on pre-defined conditions by using data lookup rules and assignment rules. An Assignment Rule sets a value in the assigned_to or assignment_group fields when a set of conditions occurs, as long as the task record is new or updated and is currently unassigned. 

## Exercise 1 — Auto-Routing Hardware Incidents

**Situation:** The Service Desk is manually assigning every incident to the right team, which slows down response time. Management wants incidents categorized as Hardware with High priority to go straight to the Desktop Support team without manual routing. 

**Role required:** admin

### Procedure
1. Navigate to All > System Policy > Rules > Assignment. 
2. Click New and set Table to Incident [incident]. 
3. Under Conditions, set [Category] [is] [Hardware] AND [Priority] [is] [1 - Critical] OR [2 - High]. 
4. In the Set Values section, set Assignment group to Desktop Support Team. 
5. Click Submit, then raise a test incident matching the condition to confirm it is auto-assigned. 

**Result:** New Hardware incidents with High priority are picked up by Desktop Support the moment they are created, with no manual assignment needed.

> [!TIP]
> **More Learning Resources:**
> 1. Official Docs: [Read Document](https://www.servicenow.com/docs/r/platform-administration/table-administration-and-data-management/c_DefineAssignmentRules.html)
> 2. Website: [Read Article](https://www.emergys.com/blog/handling-assignment-rules-in-servicenow/)
> 3. YouTube (1st): [Watch Video](https://www.youtube.com/watch?v=-O_cY4OfSc8)
> 4. YouTube (2nd): [Watch Video](https://www.youtube.com/watch?v=gl8-s8r_oCk)
