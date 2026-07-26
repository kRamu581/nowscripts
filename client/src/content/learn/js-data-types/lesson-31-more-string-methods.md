---
title: "More String Methods"
type: "topic"
---

# More String Methods

A look at more string methods to help manage this fundamental data type in JavaScript.

## 31.1 Find the position of a character or substring

```javascript
var subject = 'Warning: Email is not working';
var pos = subject.indexOf('Email');
gs.info(pos);
// returns -1 if no match, 0 if match is at start of the string
```

## 31.2 Use the position of a character/substring as a condition

```javascript
var short_description = 'System is displaying error message';
if (short_description.indexOf('error') >= 0) {
 gs.info("Error message found");
} else {
 gs.info("Error message not found");
}
```

## 31.3 Get a substring

```javascript
var str = 'Approved: RITM0010001 - Laptop renewal';
var pos = str.indexOf('RITM');
var ritmNumber = str.substring(pos, pos + 11);
gs.info(ritmNumber);
```

## 31.4 Note: case matters with strings

```javascript
var firstName = 'Chuck';
var loginName = 'chuck';
if (loginName == firstName) {
 gs.info('names match');
} else {
 gs.info('names do not match');
}
```

## 31.5 Using toUpper or toLower for better matching

```javascript
var firstName = 'Chuck';
var loginName = 'chuck';

gs.info('firstName=' + firstName.toUpperCase() + ' loginName=' + loginName.toUpperCase());

if (loginName.toUpperCase() == firstName.toUpperCase()) {
 gs.info('names match');
} else {
 gs.info('names do not match');
}
```
