Environment 1: https://dev105176.service-now.com – Inbound  
Environment 2: https://dev131384.service-now.com – Outbound

Inbound Integration Code:

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


Outbound Integration Code:

```javascript
(function executeRule(current, previous /*null when async*/ ) {

    try {
        var r = new sn_ws.RESTMessageV2('Incident Data Send', 'Default GET');
        r.setStringParameterNoEscape('Urgency', current.urgency);
        r.setStringParameterNoEscape('Impact', current.impact);
        r.setStringParameterNoEscape('CI', current.cmdb_ci.name);
        r.setStringParameterNoEscape('Caller_ID', current.caller_id);
        r.setStringParameterNoEscape('Short_Description', current.short_description);
        var response = r.execute();
        var responseBody = response.getBody();
        var httpStatus = response.getStatusCode();
		current.work_notes=responseBody;
    } catch (ex) {
        var message = ex.message;
    }

})(current, previous);
```


No Tag