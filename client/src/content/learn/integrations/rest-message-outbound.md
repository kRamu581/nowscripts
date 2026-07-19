- **REST Message – Outbound**

Another method for outbound is REST Message. Create a REST message and trigger it from the ServiceNow system.


For example, we can take any third-party application. Example:- [https://documenter.getpostman.com/](https://documenter.getpostman.com/)

![](https://snowexpertrohit.com/wp-content/uploads/2022/11/Screenshot-2022-11-08-at-5.28.52-PM-1024x534.png)

![](https://snowexpertrohit.com/wp-content/uploads/2022/11/Screenshot-2022-11-08-at-5.30.15-PM-1024x550.png)

Code to use in BR or UI Action:

```javascript
try { 
 var r = new sn_ws.RESTMessageV2('TestAPI', 'SendData');
 r.setStringParameterNoEscape('short_description', 'test');
 r.setStringParameterNoEscape('number', 'inc001');
 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
}
catch(ex) {
 var message = ex.message;
}
```