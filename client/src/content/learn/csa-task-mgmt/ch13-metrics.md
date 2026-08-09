# Metrics

A metric measures and evaluates the effectiveness of IT service management processes. For example, a metric can measure how long it takes to resolve an incident, or how long an incident stays assigned to a certain group. The Metric plugin gathers this data automatically and stores it as metric instances that can be reported on. 

## Exercise 1 — Measuring Time Spent In Progress

**Situation:** The IT Manager wants to know how long incidents typically stay in the In Progress state, to identify where engineers are spending the most time before resolving an issue. 

**Role required:** admin

### Procedure
1. Navigate to All > Metrics > Definitions and click New. 
2. Set Name to “In Progress Duration” and Table to Incident [incident]. 
3. Set Type to Field value duration and Field to State. 
4. Set the Value field to In Progress and mark the definition Active, then click Submit. 
5. Update a few test incidents to In Progress and then to Resolved, then check All > Metrics > Instances to see the recorded durations. 

**Result:** A metric instance is created every time an incident passes through the In Progress state, making it easy to build a report on average resolution time by team.
