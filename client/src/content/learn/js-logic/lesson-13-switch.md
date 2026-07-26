---
title: "The Switch Statement"
type: "topic"
---

# The Switch Statement

The switch statement is a cleaner way to do if/else if/else if/else on the same variable.

## Using if/else if/else if:

```javascript
var level = 5;
var message = '';

if (level == 0)
 message = 'Empty';
else if (level == 1 || level == 2)
 message = 'Low';
else if (level == 3)
 message = 'Medium';
else if (level == 4)
 message = 'High';
else if (level == 5)
 message = 'Full';
else
 message = 'Uh-oh';

gs.info('Level=' + level + ' status=' + message);
```

## Using the switch statement:

```javascript
var level = 5;
var message = '';

switch (level) { //can only be an integer or a string
 case 0:
   message = 'Empty';
   break;
 case 1:
 case 2:
   message = 'Low';
   break;
 case 3:
   message = 'Medium';
   break;
 case 4:
   message = 'High';
   break;
 case 5:
   message = 'Full';
   break;
 default:
   message = 'Uh-oh!';
}

gs.info('Level=' + level + ' status=' + message);
```
