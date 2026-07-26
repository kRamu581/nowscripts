---
title: "REST APIs"
type: "project"
---

# REST APIs

## Lab 8a: Instructions

Rebuild the previous lab as a scripted REST API. Use Query parameters to accept the table name and limit. Return the array of objects in the response body. Get table record display values and `sys_ids`.

## Lab 8a: Solution

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

 var queryParams = request.queryParams; 
 var tableName = queryParams.tableName;
 var limit = queryParams.limit;
 
 var answer = [];
 var recGr = new GlideRecord(tableName);
 
 if (limit && limit > 0) {
   recGr.setLimit(limit);
 }
 recGr.query();

 while (recGr.next()) {
   var obj = {};
   obj.display_value = recGr.getDisplayValue();
   obj.sys_id = recGr.getUniqueValue();
   answer.push(obj);
 }
 
 response.setBody(answer);
})(request, response);
```

## Lab 8b: Instructions

Rebuild the previous lab using a script include for the core logic. Use Query parameters to accept the table name and limit. Return the array of objects in the response body.

## Lab 8b: Solution

Create a new script include (named ‘SNJS’):

```javascript
var SNJS = Class.create();
SNJS.prototype = {
 initialize: function() {
 },

 getRecords : function(tableName, limit) {
   var answer = [];
   var recGr = new GlideRecord(tableName);

   if (limit && limit > 0) {
     recGr.setLimit(limit);
   }
   recGr.query();

   while (recGr.next()) {
     var obj = {};
     obj.display_value = recGr.getDisplayValue();
     obj.sys_id = recGr.getUniqueValue();
     answer.push(obj);
   }
   return answer;
 },

 type: 'SNJS'
};
```

Test the script include using the following code:

```javascript
var list = new SNJS().getRecords('problem', 5);
gs.info(list.length); // Returns the length of the list
gs.info(JSON.stringify(list, null, 4)); // Prints the list
```

Which could also be written as:

```javascript
var sn = new SNJS();
var list = sn.getRecords('problem', 5);
gs.info(list.length);
gs.info(JSON.stringify(list, null, 4));
```

Now build the scripted REST API:
* Take the Record Finder REST API, add a new resource to it, called ‘Lab8b’
* Relative path = `/Lab8b`
* Add the following script:

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
 var queryParams = request.queryParams; 
 var tableName = queryParams.tableName;
 var limit = queryParams.limit;

 var list = new SNJS().getRecords(tableName, limit);
 response.setBody(list);
})(request, response);
```
