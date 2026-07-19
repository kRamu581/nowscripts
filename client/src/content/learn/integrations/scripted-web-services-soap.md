- **Scripted Web Services – SOAP**

Using Scripted Web Service we can put the custom scripts and validate a lot of things.


We can query multiple tables and work on this.

- **Scenario 1: Need Get Group Information, Group Members & Associated roles attached to group.**

In this scenario, we need to call multiple tables across the platform which is not possible through simple API so we need to go for Scripted SOAP Web Services.


![](https://snowexpertrohit.com/wp-content/uploads/2022/09/Screenshot-2022-09-22-at-7.03.52-PM-1024x388.png)

![](https://snowexpertrohit.com/wp-content/uploads/2022/09/Screenshot-2022-09-22-at-7.04.47-PM-1024x363.png)

Create Input parameter form to take input from third party & Output Parameter used to send data from ServiceNow to third-party.

In the script, we can use **request.parameter** to access that parameter value and **response.parameter** used to send the response to third-party.

```javascript
(function scriptedWebServiceOperation(request, response) {

    // Add your code here
    var grp = request.group_name;
    var gr = new GlideRecord('sys_user_group');
    if (gr.get('name', grp)) {
        response.group_name = gr.name;
        response.group_manager = gr.manager.name;
        response.group_email = gr.email;
        response.Results = "Group " + grp + " is found in servicenow";
        response.Users = getUsers(gr.sys_id);
        response.Role = getRoles(gr.sys_id);
    } else {
        response.Results = "Group " + grp + " not found in servicenow";
    }

    function getUsers(grId) {
        var users = "";
        var grm = new GlideRecord('sys_user_grmember');
        grm.addQuery('group', grId);
        grm.query();
        while (grm.next()) {
            if (users) {
                users = users + ',' + grm.user.name;
            } else {
                users = grm.user.name;
            }
        }
        return users;
    }

    function getRoles(grId) {
        var roles = "";
        var grrl = new GlideRecord('sys_group_has_role');
        grrl.addQuery('group', grId);
        grrl.query();
        while (grrl.next()) {
            if (roles) {
                roles = roles + ',' + grrl.role.name;
            } else {
                roles = grrl.role.name;
            }
        }
        return roles;
    }
})(request, response);
```

- **Scenario 2:**

Create a Scripted SOAP Message for Create a Incident with below validation:

-   **Need to create an incident so that impact & Urgency can’t be selected High**.
-   **Only deploy CI can be passed as a CI.**
-   **Category & Sub-Category Dependency should be there.**

```javascript
(function scriptedWebServiceOperation(request, response) {

    // Add your code here
    var v1 = mandatoryValidation();
    if (v1 == true) {
		var grInc = new GlideRecord('incident');
		grInc.initialize();
		grInc.caller_id = request.Caller_ID;
		grInc.short_description = request.Short_Description;
		var grci1 = new GlideRecord('cmdb_ci');
		grci1.get('name',request.CI);
		grInc.cmdb_ci = grci1.sys_id;
		if(request.Impact){
			grInc.impact = request.Impact;
		}
		if(request.Urgency){
			grInc.urgency = request.Urgency;
		}
		grInc.insert();
		response.Result = "Incident Created";
		response.sys_id=grInc.sys_id;
		response.Number = grInc.number;
    } else {
        response.Result = v1;
    }

    function mandatoryValidation() {
        if (request.Caller_ID) {
            if (request.CI) {
                var grci = new GlideRecord('cmdb_ci');
                grci.addQuery('name', request.CI);
                grci.addQuery('operational_status', 1);
                grci.query();
                if (grci.next()) {
                    if (request.Short_Description) {
						if(request.Impact && request.Impact == 1){
							return "Impact can't be 1";
						}else{
							if(request.Urgency && request.Urgency == 1){
								return "Urgency can't be 1";
							}else{
								return true;
							}
						}
                    } else {
                        return "Short Description can't be blank";
                    }
                } else {
                    return "CI may be not found or not in operatonal";
                }
            } else {
                return "CI Can't be blank";
            }
        } else {
            return "Caller Id Can't be blank";
        }
    }

})(request, response);
```