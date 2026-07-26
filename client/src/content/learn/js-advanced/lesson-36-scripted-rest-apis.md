---
title: "Scripted REST APIs"
type: "topic"
---

# Scripted REST APIs

This lesson builds on the skills you've learned thus far to create a custom REST API using a ServiceNow Scripted REST API. You'll learn about REST services and resources as well as how to pass information to your REST resource and return a result. This lesson also covers the basics of the REST API Explorer to help test your code.

**System Web Services > Scripted Web Services**

## 36.1 Simple scripted REST API (GET) resource

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
 return "hello, world!";
})(request, response);
```

## 36.2 Scripted REST API with query parameters

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
 // Example Query parameters
 // https://<instance_rest_endpoint>?active=true&name=now
 
 var queryParams = request.queryParams; 
 var isActiveQuery = queryParams.active; //true
 var nameQueryVal = queryParams.name;    //‘now’

 var answer = "Response: active=" + isActiveQuery + " name=" + nameQueryVal;
 return answer;
})(request, response);
```

## 36.3 Scripted REST API with path parameters

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
 // Example path parameters
 // https://instance.service-now.com/api/now/myservice/{tableName}/{id}
 // https://instance.service-now.com/api/now/myservice/myApp_table/1234
 
 var pathParams = request.pathParams; 
 var tableName = pathParams.tableName; //‘myApp_table’ 
 var id = pathParams.id;               //‘1234’

 var answer = "Response: tableName=" + tableName + " id=" + id;
 return answer;
})(request, response);
```

## 36.4 Scripted REST API (POST) with request body payload

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
 var name = request.body.data.name;
 var id = request.body.data.id;
 var color = request.body.data.color;

 var answer = "Response: name=" + name + " id=" + id + " color=" + color;
 return answer;
})(request, response);
```

## 36.5 Scripted REST API with POST and response

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
 var name = request.body.data.name;
 var id = request.body.data.id;
 var color = request.body.data.color;
 
 // Do some processing here
 
 var answer = {};
 answer.status = "OK";
 answer.author = "system";
 answer.item = {"name" : "Rome", "owner" : "Chuck Tomasi", "count" : 12};
 answer.active = true;

 response.setBody(answer);
 return response;
})(request, response);
```
