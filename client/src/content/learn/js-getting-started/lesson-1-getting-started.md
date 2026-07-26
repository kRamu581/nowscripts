---
title: "Getting Started"
type: "topic"
---

# Getting Started

An introduction to what this video series is about (and not about), who it is for, and how to get started. 
This video also includes examples that you can download and test for yourself to get started writing JavaScript on the Now Platform.

Get a PDI from https://developer.servicenow.com

To run scripts in ServiceNow, go to: **System Definition > Scripts - Background**

## 1.1 First script

```javascript
// Anything following ‘//’ is a comment
gs.info ('Hello, world!'); // gs.info() = informational output
```

## 1.2 Example of server-side script

This code does a database query for all the active task records, then prints the task number for each.

```javascript
var gr = new GlideRecord('task');
gr.addActiveQuery();
gr.query();

while (gr.next()) {
 gs.info(gr.getValue('number'));
}
```

## 1.3 Example of a client-side script

To create a new client script that displays an alert whenever an incident form is loaded:

* Access client scripts at: **System Definition > Client Scripts**
* Click ‘New’ to create a new script
* Give it a name (e.g. Display current state)
* Assign a table (in this case, Incident)
* Type is: onload (because that’s what the script template specifies)
* Add code:

```javascript
function onLoad() {
 alert('Current state value is: ' + g_form.getValue('state'));
}
```

* Click ‘Update’
* The alert will now display the current state whenever an incident form is loaded (e.g., via Incident > All)
