---
title: "ServiceNow ArrayUtil"
type: "topic"
---

# ServiceNow ArrayUtil

Lesson 25 builds on lesson 24 with some additional array utilities provided by ServiceNow.

ArrayUtil is part of a ServiceNow Script Include. To review the script, etc. go to: **System Definitions > Script Includes**, search term: `=ArrayUtil`

```javascript
var au = new ArrayUtil();
var names = [
 "Eric",
 "Donna",
 "Melanie",
 "Jessie",
 "Howard",
 "Eric",      // Note ‘Eric’ is listed twice
 "Jessie",
 "Tomasz"
];

var newNames = au.unique(names);
// One of the capabilities of ArrayUtil is to check for uniqueness.

gs.info(newNames.join(', ')); // Good for de-duping arrays
```

**Output:**
```text
*** Script: Tomasz, Howard, Jessie, Melanie, Donna, Eric
```
