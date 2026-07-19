- **Import Set API – REST**

Using Rest message also we pass data from import set to target table.


We can put all kind of validation that we have put using SOAP message.

Both SOAP & REST works similar method. Both the method data first store to import set then using transform map from import set to target table.

We can put all kind of data validation in our transform map, transform map is the medium to move to from staging table to the arget table.


Below Methods are available:

1.  Create a record in an Import Set staging table – **POST**
    -   https://<instance>.service-now.com/api/now/import/{**stagingTableName**}
    -   Data
2.  Insert Multiple Records from same request – **POST**
    -   https://<instance>.service-now.com/api/now/import/{**stagingTableName**}/insertMultiple
    -   Data
3.  Retrieve an Import Set record – **GET**
    -   https://<instance>.service-now.com/api/now/import/{**stagingTableName**}/{**sys\_id**}

All the method quickly available in REST API Explorar:

![](https://snowexpertrohit.com/wp-content/uploads/2022/09/Screenshot-2022-09-21-at-7.18.33-PM.png)

Example cURL for Insert Import Set API:

```javascript
curl "https://dev105176.service-now.com/api/now/import/u_problem" \
--request POST \
--header "Accept:application/json" \
--header "Content-Type:application/json" \
--data "{\"u_problem_statement\":\"Soap message 12.\",\"u_configuration_item\":\"abc\",\"u_description\":\"soap message 12.\"}" \
--user 'admin':'admin'
```