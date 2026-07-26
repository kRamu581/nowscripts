---
title: "Common Array Methods"
type: "topic"
---

# Common Array Methods

Lesson 24 demonstrates some of the common things you can do with arrays to manage the elements they contain.

## 1. Common array methods/functions

```javascript
var list = ['Chuck', 'Kreg', 'Stacey'];
gs.info('list=' + list);
```

or: 

```javascript
gs.info('list=' + list.toString()); //converts to string
```

## 2. join(string)

```javascript
var list = ['Chuck', 'Kreg', 'Stacey'];
gs.info('join: list=' + list.join(', '));
```

Or: 

```javascript
gs.info('join: list=' + list.join('\n'));
// to insert a new line between each item in the list
```

## push(value1, value2, ..., valueX)

```javascript
list.push('Dave');
list.push('Andrew');
gs.info('push: list=' + list.join(', '));
```

## pop()

The last thing pushed onto the stack is the first thing popped off.

```javascript
var list = ['Chuck', 'Kreg', 'Stacey'];
gs.info('join: list=' + list.join(', '));
list.push('Dave');
list.push('Andrew');
gs.info('push: list=' + list.join(', '));

list.pop();
gs.info('pop: list=' + list.join(', '));
```

## 3. shift()

```javascript
var list = ['Chuck', 'Kreg', 'Stacey'];
gs.info('Before shift(), list[0]=' + list[0]);

list.shift();

gs.info('shift: list=' + list.join(', '));
gs.info('After shift(), list[0]=' + list[0]);
```

## 4. unshift

Puts things on the front of the array.

```javascript
var list = ['Chuck', 'Kreg', 'Stacey'];
var newLength = list.unshift('Jason', 'Andrew');
gs.info('new length=' + newLength + ' unshift() list=' + list.join(', '));
```

## 5. splice

To add/remove elements from somewhere in the middle of the array.

Notation: 
`splice (starting-position, remove-n-elements, add-value1, add-value2, ..., add-valueX)`

```javascript
var names = ["Eric", "Donna", "Melanie", "Jessie"];
gs.info(names.join(', '));

names.splice(2, 0, "Cary", "Henri"); // Start at posn. 2, remove none, add 2
gs.info(names.join(', '));
```

## 6. slice

Extract part of an array into another array.

Notation:
`slice(start, end)`

```javascript
var names = ["Eric", "Donna", "Melanie", "Jessie", "Howard", "Tomasz"];
gs.info(names.join(', '));

var subNames = names.slice(1, 3); // Get names at positions 1 and 2 
// (i.e. ‘between’ the start of 1 & the start of 3)

gs.info(subNames.join(', '));
```

## 7. Reverse the elements of an array

```javascript
var names = ["Eric", "Donna", "Melanie", "Jessie", "Howard", "Tomasz"];
names.reverse();
gs.info(names.join(', '));
```

## 8. Getting the value

```javascript
var list = [];
var countReturned = 0;
var fName = 'sys_id';
var incGr = new GlideRecord('incident');
incGr.addQuery('priority', '1');
incGr.query();

while (incGr.next()) {
 list.push(incGr.getValue(fName));
 ++ countReturned;
}

gs.info('list=\n' + list.join('\n'));
gs.info(countReturned);
```
