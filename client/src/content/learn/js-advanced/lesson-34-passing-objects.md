---
title: "Passing objects to functions"
type: "topic"
---

# Passing objects to functions

How to combine the power of objects with functions to go beyond basic data types being passed in and out of functions.

```javascript
var item = Class.create();
item.prototype = {
 initialize: function() {
 },

 debugObject : function(obj) {
   gs.info('object=' + JSON.stringify(obj, null, 4));
 },

 type: 'item'
};

var myObj = {
 "type"  : "vehicle",
 "engine" : true,
 "wheels" : 4,
 "state"  : "allocated"
};

var myItem = new item();
myItem.debugObject(myObj); 

// This is known as ‘loosely coupled’ – the object and the
// function are not dependent on each other.
```
