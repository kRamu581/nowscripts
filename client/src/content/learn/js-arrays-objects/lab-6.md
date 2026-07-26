---
title: "Arrays"
type: "project"
---

# Arrays

## Lab 6a: Instructions

Create a script to accept a table name and return a list records display values.
Hint: use `GlideRecord.getDisplayValue()`

## Lab 6a: Solution

```javascript
// @param tableName - name of table to query
// @return array - list of record display values

function listRecords(tableName) {
 var answer = [];
 var recGr = new GlideRecord(tableName);
 recGr.query();

 while (recGr.next()) {
   answer.push(recGr.getDisplayValue());
 }

 return answer;
}

gs.info(listRecords('incident').join('\n'));
```

## Lab 6b: Instructions

Update your previous script to accept a limit parameter.
Hint: use `GlideRecord.setLimit()`

## Lab 6b: Solution

```javascript
// @param tableName - name of table to query
// @param limit - integer > 0
// @return array - list of record display values

function listRecords(tableName, limit) {
 var answer = [];
 var recGr = new GlideRecord(tableName);
 
 if (limit && limit > 0) {
   recGr.setLimit(limit);
 }
 recGr.query();

 while (recGr.next()) {
   answer.push(recGr.getDisplayValue());
 }

 return answer;
}

gs.info(listRecords('incident', 10).join('\n'));
```
