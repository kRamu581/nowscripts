# CMDB Basics

-   **Definition:** The process of identifying, controlling, and tracking all Configuration Items (CIs) in the IT environment, and their relationships. This provides an accurate, up-to-date view of the IT infrastructure.
    
-   **Key Concepts:**
    
    -   **Configuration Item (CI):** Any component that needs to be managed in order to deliver IT services. This includes hardware (servers, laptops, network devices), software (applications, operating systems), services, documentation, and even people (in some cases).
    -   **Configuration Management Database (CMDB):** The database that stores information about CIs and their relationships.
    -   **CI Attributes:** Properties of a CI (e.g., serial number, IP address, operating system version).
    -   **CI Relationships:** Connections between CIs (e.g., a server _runs_ an application, an application _depends on_ a database).
    -   **Discovery:** Automated tools that scan the network and identify CIs, populating the CMDB.
    -   **Baseline:** A snapshot of the CMDB at a particular point in time, used for comparison and change tracking.
-   **Process Flow (Simplified):**
    
    1.  **Identification:** CIs are identified and defined.
    2.  **Control:** Changes to CIs are managed through Change Management.
    3.  **Status Accounting:** The current status of CIs is tracked (e.g., "In Production," "In Maintenance," "Retired").
    4.  **Verification & Audit:** Regular audits are performed to ensure the accuracy of the CMDB.
-   **Example:**
    
    -   **CI:** A web server (hardware CI).
    -   **Attributes:** Server name, IP address, operating system, installed software, location, owner.
    -   **Relationships:**
        -   The web server _hosts_ a web application (software CI).
        -   The web application _depends on_ a database server (hardware CI).
        -   The web server is _connected to_ a network switch (hardware CI).
    -   **Discovery:** ServiceNow Discovery automatically finds the web server on the network and populates its attributes and relationships in the CMDB.
    -   **Change Management:** If the web server's operating system needs to be upgraded, a change request is created, referencing the CI record in the CMDB.
-   **ServiceNow Features:**
    
    -   CMDB.
    -   Discovery.
    -   Service Mapping (visual representation of CI relationships).
    -   Dependency Views.
    -   Integration with other modules (Incident, Problem, Change, Request).
    -   Reporting and dashboards.
