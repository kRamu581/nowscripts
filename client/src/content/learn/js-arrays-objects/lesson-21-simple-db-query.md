---
title: "Simple Database Query"
type: "topic"
---

# Simple Database Query

This lesson shows you some basic operations to retrieve records from the database using GlideRecord on ServiceNow. This applies some of the earlier concepts with functionality specific to the Now Platform.

## 21.1 Get and display numbers on all incidents

```javascript
var incGr = new GlideRecord('incident');
incGr.query();

while (incGr.next()) { // remember: (incGr.next()) returns a Boolean
 gs.info(incGr.getValue('number'));
}
```

## 21.2 Get and display numbers on all incidents v2

```javascript
var incGr = new GlideRecord('incident');
incGr.addQuery('active', true); // add a filter
incGr.orderBy('number'); // add order
incGr.setLimit(5); // set a limit
incGr.query();

while (incGr.next()) {
 gs.info(incGr.getValue('number'));
}
```

## 21.3 What is 'number'?

```javascript
var incGr = new GlideRecord('incident');
incGr.setLimit(1);
incGr.query();

if (incGr.next()) {
 var dotNumber = incGr.number;
 var gvNumber = incGr.getValue('number');
 gs.info('dotNumber=' + typeof dotNumber + ' gvNumber=' + typeof gvNumber);
}
// Why should I care? I'll show you when we get to arrays...
```

## 21.4 Getting a single record quickly

Just need one record? Use `.get(SYSID)` or `.get('fieldName', fieldValue)`

```javascript
var incGr = new GlideRecord('incident');

if (incGr.get('965c9e5347c12200e0ef563dbb9a7156')) {
// If you pass only one value, it’s assumed to be a sys_id.
 gs.info(incGr.getValue('number'));
}

// Or:
var incGr = new GlideRecord('incident');

if (incGr.get('number', 'INC0000059')) {
 gs.info(incGr.getValue('sys_id'));
}
```
