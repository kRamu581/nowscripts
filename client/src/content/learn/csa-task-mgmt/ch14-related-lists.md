# Related Lists

In ServiceNow, a Related List is a feature that displays records related to a specific record in a list format. This allows users to view and manage interconnected data easily, without navigating away from the main record. 

## Exercise 1 — Showing Related Changes on an Incident

**Situation:** When investigating an incident, the support engineer wants to quickly see if any Change Requests were made recently against the same Configuration Item (CI), since a recent change is often the cause of the incident. 

**Role required:** admin

### Procedure
1. Navigate to All > System Definition > Relationships and click New. 
2. Set Name to “Changes by Same CI”, Applies to table to Incident [incident], and Queries from table to Change Request [change_request]. 
3. In the Query script, write: `current.addQuery('cmdb_ci', parent.cmdb_ci);`
4. Save the relationship, then open an Incident form, right-click the form header, and select Configure > Related Lists. 
5. Move “Changes by Same CI” into the selected list and save. 

**Result:** The Incident form now shows a related list of every Change Request made against the same CI, helping the engineer spot the likely cause faster.
