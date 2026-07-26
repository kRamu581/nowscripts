---
title: "Classes"
type: "topic"
---

# Classes

How to improve testing and reduce maintenance by creating object templates known as classes. Go beyond properties and add functions to your objects!

## 33.1 Classes, Objects, and Prototypes

```javascript
var person = Class.create();
person.prototype = {
 initialize: function() { // This is the standard formatting for a script include
   this.firstName = '';
   this.lastName = '';
 },
 setFirstName : function(str) {
   this.firstName = str;
 },
 setLastName : function(str) {
   this.lastName = str;
 },
 getDisplayName : function() {
   return this.firstName + ' ' + this.lastName;
 },
 type: 'person'
};

var me = new person();
me.setFirstName('Chuck');
me.setLastName('Tomasi')
gs.info('me=' + me.firstName + ' ' + me.lastName); // Not advised

var name = me.getDisplayName();
gs.info(name);
```

## 33.2 Initialize values

```javascript
var person = Class.create();
person.prototype = {
 initialize: function(str1, str2) {
   this.firstName = str1;
   this.lastName = str2;
 },
 setFirstName : function(str) {
   this.firstName = str;
 },
 setLastName : function(str) {
   this.lastName = str;
 },
 getDisplayName : function() {
   return this.firstName + ' ' + this.lastName;
 },
 type: 'person'
};

var me = new person('Chuck', 'Tomasi');
var name = me.getDisplayName();
gs.info(name);

me.setFirstName('Fred');
me.setLastName('Luddy');
gs.info(me.getDisplayName());
```
