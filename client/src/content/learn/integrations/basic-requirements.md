To ingrate any system we need at least the below details:

1.  **Type of Integration** – Inbound/Outbound
2.  **Endpoint** – https://snowexpertrohit.com/v2
3.  **Authentication** – Basic/Oauth
4.  **Method** – Get,Put or Post
5.  **Header** – Content-Type:application/json
6.  **Query Parameter or Data**
7.  **Mid Server Required**

Example :

```javascript
curl "https://<instance>.service-now.com/api/now/table/incident?sysparm_limit=1"
--request GET
--header "Accept:application/json"
--user 'admin':'admin'
```


[Basic requirements](https://snowexpertrohit.com/tag/basic-requirements/ "Basic requirements Tag")[Integration](https://snowexpertrohit.com/tag/integration/ "Integration Tag")[ServiceNow](https://snowexpertrohit.com/tag/servicenow/ "ServiceNow Tag")