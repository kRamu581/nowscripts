- **Import Set Web Service**
  - **– SOAP**

ServiceNow already create OOB Import Set Web Service that can create record to Computer, Location, Notification- Incident & User Record.


We can create webservice by create new module under inbound module, that lid to create new webservice, import set & transform map. Also, we can define target table so that once record created to import set via webservices, using transform map data transform to target table.

![](https://snowexpertrohit.com/wp-content/uploads/2022/09/Capture-1-1024x369.png)

- **Validation**
  - :

1.  How can we validate Configuration Item that third-party passing is the correct one?
    -   We can mark the field map choice action to ignore/rejected based on the use case for cmdb\_ci.
2.  How can we make mandatory Configuration Item a mandatory parameter?
    -   Transform maps have a choice called Enforce Mandatory fields, which you can select based on the use case.
3.  How can we show custom error message? i.e – Problem Statement should start with Soap message?
    -   We can check Run Script in the transform map. Using also transform map script we can stop this validation. In the run script, we need to put the below sample code to stop this.

```javascript
var ps = source.u_problem_statement;
	if(ps.startsWith('Soap message') == true){
		// do nothing
	}else{
		error = true;
		source.sys_row_error ="Problem Statement should starts with SOAP";
		source.sys_import_state_comment="Problem Statement should starts with SOAP";
	}
```

![](https://snowexpertrohit.com/wp-content/uploads/2022/09/Screenshot-2022-09-22-at-8.13.02-AM-1024x308.png)