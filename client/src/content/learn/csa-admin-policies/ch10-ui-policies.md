# UI Policies

UI policies dynamically change the behaviour of information on a form and control custom process flows for tasks. For example, you can use UI policies to make a field read-only, require a field, or hide a field. You don't need coding for basic UI policies. 

## Exercise 1 — Locking Down a Closed Change Request

**Situation:** The Change Management team wants to make sure that once a Change Request moves to the Closed state, key fields cannot be edited by mistake, and the engineer must always record what was done before closing. 

**Role required:** ui_policy_admin, admin

### About this task
This exercise shows how to apply the following controls when a Change Request state changes to Closed: 
* Make the Close notes field mandatory. 
* Hide the Requested by field. 
* Make the Risk and Impact fields read-only. 

### Procedure

| Name | Input |
|---|---|
| Table | Change Request |
| Reverse if false | Select this check box. If the change state is not Closed, the UI policy is reversed. |
| On load | Select this check box so the actions run when the form is loaded or when the condition changes. |
| Conditions | [Change state] [is] [Closed] |

1. Navigate to All > System UI > UI Policies and click New. 
2. Enter the table and conditions shown above, then save the record. 
3. In the UI Policy Actions related list, click New. 
4. Create one action for Close notes (Mandatory = True), one for Requested by (Visible = False), and one each for Risk and Impact (Read Only = True). 
5. Click Submit, then open a test Change Request and set its state to Closed to confirm the fields behave as expected. 

**Result:** Whenever a Change Request is closed, the engineer must fill in Close notes, and Risk/Impact can no longer be changed — keeping the closed record accurate.

> [!TIP]
> **More Learning Resources:**
> 1. Official Docs: [Read Document](https://docs.servicenow.com/bundle/sandiego-platform-administration/page/administer/form-administration/task/t_CreateAUIPolicy.html)
> 2. Website: [Read Article](https://blog.snowycode.com/post/what-is-a-ui-policy-in-servicenow)
> 3. YouTube (1st): [Watch Video](https://www.youtube.com/watch?v=eNSgiqIyAC4)
> 4. YouTube (2nd): [Watch Video](https://www.youtube.com/playlist?list=PLWMzEPW90q1amY4FhlhKbXHLvPVHI_k2I)
