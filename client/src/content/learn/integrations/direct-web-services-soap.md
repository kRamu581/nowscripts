- **Direct web services**
  - – SOAP

A direct web service is available for any table in the system if the correct access control list is configured.


- **For SOAP API required service account must have SOAP Role.**

The supported format of the incoming message is document style literal XML SOAP documents (Document/Literal)

Example URL: https://<instance name>.service-now.com/incident.do?WSDL


Below operations are available :

![](https://snowexpertrohit.com/wp-content/uploads/2022/09/Screenshot-2022-09-18-at-9.44.42-AM.png)

Below Parameter used to optimize script

-   \_\_encoded\_query – Specify an encoded query string to be used in filtering the returned results.
-   \_\_order\_by – Instruct the returned results to be ordered by the specified field.
-   \_\_order\_by\_desc – Instruct the returned results to be ordered by the specified field, in descending order.
-   \_\_exclude\_columns – Specify a list of comma delimited field names to exclude from the result set.
-   \_\_limit – Limit the number of records that are returned.
-   \_\_first\_row – Instruct the results to be offset by this number of records from the beginning of the set.
-   \_\_last\_row – Instruct the results to be limited by this number of records from the beginning of the set, or the \_\_start\_row value when specified.
-   \_\_use\_view – Specify a Form view by name, to be used for limiting and expanding the results returned.

Using SOAP UI we will test this scenario, lets see how SOAP UI looks like:

![](https://snowexpertrohit.com/wp-content/uploads/2022/09/Screenshot-2022-09-18-at-9.16.56-AM-1024x612.png)

SOAP UI