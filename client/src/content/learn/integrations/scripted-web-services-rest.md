- **Scripted Web Services – REST**

Create the same API & apply the same validation that is done in **Scripted Web Services – SOAP**

![](https://snowexpertrohit.com/wp-content/uploads/2022/10/Screenshot-2022-10-18-at-7.47.46-AM-1024x448.png)

![](https://snowexpertrohit.com/wp-content/uploads/2022/10/Screenshot-2022-10-18-at-7.48.04-AM-1024x371.png)


One Scripted REST can contain multiple Resources, and each resource can work individually based on the script written inside.

getGroupInfo – GET

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
	var grp = request.queryParams.group_name.toString();
    var gr = new GlideRecord('sys_user_group');
	var json={};
    if (gr.get('name', grp)) {
        json.group_name = gr.name;
        json.group_manager = gr.manager.name;
        json.group_email = gr.email;
        json.Results = "Group " + grp + " is found in servicenow";
        json.Users = getUsers(gr.sys_id);
        json.Role = getRoles(gr.sys_id);
		response.setStatus(200);
    } else {
        json.Results = "Group " + grp + " not found in servicenow";
		response.setStatus(405);
    }
	response.setBody(json);
	
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

IncidentRecord – POST


```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
	var data = request.body.data;
	var outputJSON={};
	var v1 = mandatoryValidation();
    if (v1 == true) {
		var grInc = new GlideRecord('incident');
		grInc.initialize();
		grInc.caller_id = data.Caller_ID;
		grInc.short_description = data.Short_Description;
		var grci1 = new GlideRecord('cmdb_ci');
		grci1.get('name',data.CI);
		grInc.cmdb_ci = grci1.sys_id;
		if(data.Impact){
			grInc.impact = data.Impact;
		}
		if(data.Urgency){
			grInc.urgency = data.Urgency;
		}
		grInc.insert();
		outputJSON.Result = "Incident Created";
		outputJSON.sys_id=grInc.sys_id;
		outputJSON.Number = grInc.number;
    } else {
        outputJSON.Result = v1;
		response.setStatus(405);
    }
	
	response.setBody(outputJSON);

    function mandatoryValidation() {
        if (data.Caller_ID) {
            if (data.CI) {
                var grci = new GlideRecord('cmdb_ci');
                grci.addQuery('name', data.CI);
                grci.addQuery('operational_status', 1);
                grci.query();
                if (grci.next()) {
                    if (data.Short_Description) {
						if(data.Impact && data.Impact == 1){
							return "Impact can't be 1";
						}else{
							if(data.Urgency && data.Urgency == 1){
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