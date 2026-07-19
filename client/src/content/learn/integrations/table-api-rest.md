- **Table API Web Service – REST**

REST (REpresentational State Transfer) is a simple stateless architecture that provides standards between computer systems on the web, making it easier for them to communicate with each other.


Supported HTTP request methods Support for Table API:

-   **Retrieve records from a table** (GET)
    -   Parameterized Get method allow to get data from table
    -   Table Name is mandatory, Table name is Path Parameter
    -   sysparm\_query = Pass query to get data
    -   sysparm\_limit = to set max count for data set
    -   sysparm\_fields = to get only defined fields
    -   sysparm\_display\_value = Return field display values (true), actual values (false), or both (all)
    -   Example URL : https://**<instance>**.service-now.com/api/now/table/**incident**?sysparm\_query=**active%3Dtrue**
-   **Create a record** (POST)
    -   Table Name & Data is mandatory, Table name is Path Parameter
    -   Example:https://**<instance>**.service-now.com/api/now/table/**incident**
    -   Data: {“short\_description”:”test”}
-   **Retrieve a record** (GET)
    -   Its return only one record
    -   Table Name & sys\_id two path parameter are mandatory.
    -   Example: https://**<instance>**.service-now.com/api/now/table/**incident**/**fc598bdc1b991c140a2163166e4bcb8b**
-   **Modify a record** (PUT)
    -   Table Name, sys\_id & Data is mandatory, Table name is Path Parameter
    -   https://**<instance>**.service-now.com/api/now/table/**incident**/**fc598bdc1b991c140a2163166e4bcb8b**
    -   Data: {“short\_description”:”test”}
-   **Delete a record** (DELETE)
    -   Delete a specific record by sys\_id
    -   Example: https://**<instance>**.service-now.com/api/now/table/**incident**/**fc598bdc1b991c140a2163166e4bcb8b**
-   **Update a record** (PATCH)
    
    -   Table Name, sys\_id & Data is mandatory, Table name is Path Parameter
    
    -   https://**<instance>**.service-now.com/api/now/table/**incident**/**fc598bdc1b991c140a2163166e4bcb8b**
    -   Data: {“short\_description”:”test”}

CURL Example:

```javascript
curl "https://<instance>.service-now.com/api/now/table/incident/fc598bdc1b991c140a2163166e4bcb8b" \
--request DELETE \
--header "Accept:application/json" \
--user 'admin':'admin'
```

- **Important Notes in TABLE API**


-   Table API doesn’t validation Mandatory and other validation
-   You can use the HEAD methods in place of GET methods to return a response without a response body.
-   You cannot pass multiple records in POST, PUT, and PATCH operations. If you do, only the first record is processed, the rest are ignored.
-   You cannot use POST, PUT, and PATCH to insert or update records into a Database view, as Database views are read-only.

- **Requirements:**

-   Give me all active incidents ?
    -   https://dev105176.service-now.com/api/now/table/incident?sysparm\_query=active=true
-   Give me all the change request ?
    -   https://dev105176.service-now.com/api/now/table/change\_request?sysparm\_query=state=-5
-   Get 2 Open Incident and return number,short\_description and CI Name
    -   https://dev105176.service-now.com/api/now/table/change\_request?sysparm\_query=state=-5&sysparm\_limit=2&sysparm\_fields=number,short\_description,cmdb\_ci&sysparm\_display\_value=all
-   Give me a change request details that I know sys\_id and I need only number
    -   https://dev105176.service-now.com/api/now/table/change\_request/c83c5e5347c12200e0ef563dbb9a7190?sysparm\_fields=number
-   Create an Incident

```javascript
curl --location --request POST 'https://dev105176.service-now.com/api/now/table/incident' \
--header 'Authorization: Basic aW50ZWdyYXRpb24uYWRtaW46Um9oaXRhYmMxMjMh' \
--header 'Content-Type: application/json' \
--data-raw '{"short_description":"test incident 2"}'
```

-   Update Incident

```javascript
curl --location --request PUT 'https://dev105176.service-now.com/api/now/table/incident/6d17fb98970a1110477671571153af72' \
--header 'Authorization: Basic aW50ZWdyYXRpb24uYWRtaW46Um9oaXRhYmMxMjMh' \
--header 'Content-Type: application/json' \
--data-raw '{"caller_id":"Integration Admin"}'
```

-   Delete a record

```javascript
curl --location --request DELETE 'https://dev105176.service-now.com/api/now/table/incident/6d17fb98970a1110477671571153af72' \
--header 'Authorization: Basic aW50ZWdyYXRpb24uYWRtaW46Um9oaXRhYmMxMjMh' \
--header 'Content-Type: application/json' \
```