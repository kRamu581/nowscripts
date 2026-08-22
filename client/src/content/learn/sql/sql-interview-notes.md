---
title: "SQL Interview Preparation Notes"
description: "Condensed from Complete SQL With Notes (Rishabh Mishra) — organized for quick revision + likely interview questions."
lastUpdated: "2026-08-16"
---

# SQL Interview Preparation Notes

*Condensed from "Complete SQL With Notes" (Rishabh Mishra) — organized for quick revision + likely interview questions.*

---

## 1. Introduction to SQL & Databases

- **SQL (Structured Query Language)** — a programming language used to interact with a database.
- **CRUD** = Create, Read (Select), Update, Delete.
- **SQL vs NoSQL**

| Relational (SQL) | Non-Relational (NoSQL) |
|---|---|
| Data stored in tables | Data stored as key-value, document, graph, or wide-column |
| Fixed/predefined schema | Dynamic schema |
| Lower performance at huge scale | Scales easily with huge data |
| Eg: PostgreSQL, MySQL, MS SQL Server | Eg: MongoDB, Cassandra, HBase |

- **Types of SQL commands**
  - **DDL** (Data Definition Language): `CREATE`, `ALTER`, `DROP`
  - **DML** (Data Manipulation Language): `SELECT`, `INSERT`, `UPDATE`, `DELETE`
  - **DCL** (Data Control Language): `GRANT`, `REVOKE`
- **Database** — a system that lets users store and organize data.
- **Excel vs Database**: Excel is easy but manual, low integrity, low search power; a database is trained-user-oriented, automatable, high integrity, high search/filter power.

**Likely interview Q:** *What's the difference between DDL, DML, and DCL?* — DDL defines structure, DML manipulates data, DCL controls access/permissions.

---

## 2. Data Types, Keys & Constraints

**Data type categories:**
- **String**: `char`, `varchar`
- **Numeric**: `int`, `float`, `bool`
- **Date/time**: `date`, `datetime`

**Common data types:**
- `int` — integer values
- `float` — decimal numbers
- `bool` — true/false
- `char` — fixed-length string
- `varchar` — variable-length string
- `date` — `YYYY-MM-DD`
- `datetime` — `YYYY-MM-DD hh:mm:ss`

**Primary Key (PK)** — uniquely identifies a row; only **one PK per table**; must be **UNIQUE + NOT NULL**.
**Foreign Key (FK)** — links two tables; a table can have **many FKs**; can contain **duplicates and NULLs**.

**Constraints** (rules to ensure data accuracy):
- `NOT NULL` — column can't be NULL
- `UNIQUE` — all values must differ
- `PRIMARY KEY` — NOT NULL + UNIQUE combined
- `FOREIGN KEY` — maintains referential link between tables
- `CHECK` — value must satisfy a condition
- `DEFAULT` — sets a default value
- `CREATE INDEX` — speeds up data retrieval

**Likely interview Q:** *Primary key vs Foreign key?* — PK uniquely identifies rows in its own table (one per table, no duplicates/nulls); FK references a PK in another table (can repeat, can be null).

---

## 3. Creating Databases & Tables

```sql
CREATE TABLE customer
(
    CustID   int8 PRIMARY KEY,
    CustName varchar(50) NOT NULL,
    Age      int NOT NULL,
    City     char(50),
    Salary   numeric
);
```

**Table-related commands:** `CREATE`, `INSERT`, `UPDATE`, `BACKUP`, `DELETE`, `ALTER`, `DROP`, `TRUNCATE`.

---

## 4. INSERT, UPDATE, DELETE, ALTER, DROP, TRUNCATE

**INSERT**
```sql
INSERT INTO customer (CustID, CustName, Age, City, Salary)
VALUES
(1, 'Sam', 26, 'Delhi', 9000),
(2, 'Ram', 19, 'Bangalore', 11000);
```

**UPDATE**
```sql
UPDATE customer
SET CustName = 'Xam', Age = 32
WHERE CustID = 4;
```

**ALTER TABLE**
```sql
-- Add column
ALTER TABLE customer ADD COLUMN Gender varchar(10);

-- Modify column type
ALTER TABLE customer ALTER COLUMN Gender char(10);

-- Drop column
ALTER TABLE customer DROP COLUMN Gender;
```

**DELETE** (removes rows, table stays)
```sql
DELETE FROM customer WHERE CustID = 3;
```

**DROP vs TRUNCATE**
- `DROP TABLE table_name;` — deletes the table entirely (structure + data).
- `TRUNCATE TABLE table_name;` — deletes all rows but keeps the table structure.

**Likely interview Q:** *DELETE vs TRUNCATE vs DROP?*
- `DELETE` — DML, removes rows (can use WHERE), can be rolled back, slower (row-by-row logging).
- `TRUNCATE` — DDL, removes all rows at once, resets identity, faster, generally not filterable.
- `DROP` — removes the table object itself from the database.

---

## 5. SELECT & WHERE Clause

```sql
SELECT column_name FROM table_name;
SELECT * FROM table_name;
SELECT DISTINCT column_name FROM table_name;

SELECT name FROM classroom WHERE grade = 'A';
```

**Operators**
| Type | Examples |
|---|---|
| Arithmetic | `+  -  *  /  %` |
| Comparison | `=  !=  >  >=  <  <=` |
| Logical | `ALL, IN, BETWEEN, LIKE, AND, OR, NOT, ANY` |
| Bitwise | `&  \|` |

**LIMIT** — restricts number of rows returned.
```sql
SELECT column_name FROM table_name LIMIT 5;
```

**ORDER BY** — sorts result set (`ASC`/`DESC`).
```sql
SELECT column_name FROM table_name ORDER BY column_name ASC;
```

**Likely interview Q — Order of execution in SQL (classic trick question):**
`FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT`
(Note: written order is `SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT`, but **logical execution order** starts with `FROM`.)

---

## 6. Importing CSV into SQL
- Data can be imported using each database tool's import feature (e.g., pgAdmin4 → Import/Export on a table) to load `.csv` files into a table matching its schema.

---

## 7. Functions & String Functions

**Types of functions**
- **System-defined (built-in):** `RAND()`, `ROUND()`, `UPPER()`, `LOWER()`, `COUNT()`, `SUM()`, `AVG()`, `MAX()`, etc.
- **User-defined:** custom functions you create and call like built-ins.

**Common string functions**
| Function | Purpose |
|---|---|
| `UPPER()` | Converts to uppercase |
| `LOWER()` | Converts to lowercase |
| `LENGTH()` | Returns string length |
| `SUBSTRING()` | Extracts part of a string |
| `NOW()` | Current date & time |
| `FORMAT()` | Formats a field |
| `CONCAT()` | Joins strings |
| `REPLACE()` | Replaces substring occurrences |
| `TRIM()` | Removes leading/trailing spaces |

---

## 8. Aggregate Functions

| Function | Purpose |
|---|---|
| `COUNT()` | Number of values |
| `SUM()` | Sum of values |
| `AVG()` | Average value |
| `MAX()` | Maximum value |
| `MIN()` | Minimum value |
| `ROUND()` | Rounds to N decimal places |

Often used together with `GROUP BY`.

---

## 9. GROUP BY & HAVING Clause

```sql
SELECT mode, SUM(amount) AS total
FROM payment
GROUP BY mode;

SELECT mode, COUNT(amount) AS total
FROM payment
GROUP BY mode
HAVING COUNT(amount) >= 3
ORDER BY total DESC;
```

**Likely interview Q:** *WHERE vs HAVING?* — `WHERE` filters rows **before** grouping (can't use aggregate functions); `HAVING` filters **groups after** `GROUP BY` (can use aggregate functions).

---

## 10. Timestamps & EXTRACT

| Type | Format |
|---|---|
| `TIME` | `HH:MI:SS` |
| `DATE` | `YYYY-MM-DD` |
| `YEAR` | `YYYY` or `YY` |
| `TIMESTAMP` | `YYYY-MM-DD HH:MI:SS` |
| `TIMESTAMPTZ` | date + time + timezone |

**Useful commands:** `SHOW TIMEZONE`, `SELECT NOW()`, `SELECT TIMEOFDAY()`, `SELECT CURRENT_TIME`, `SELECT CURRENT_DATE`.

**EXTRACT()**
```sql
SELECT EXTRACT(MONTH FROM date_field) FROM table;
```
Parts you can extract: `YEAR, QUARTER, MONTH, WEEK, DAY, HOUR, MINUTE, DOW (day of week), DOY (day of year)`.

---

## 11. JOINS

A **JOIN** combines data from two or more tables based on a related column.

**Types:**
- **INNER JOIN** — only matching rows in both tables.
- **LEFT JOIN** — all rows from left table + matched rows from right (unmatched = NULL).
- **RIGHT JOIN** — all rows from right table + matched rows from left.
- **FULL (OUTER) JOIN** — all rows when there's a match in either table.

```sql
SELECT * FROM customer AS c
INNER JOIN payment AS p
ON c.customer_id = p.customer_id;

SELECT * FROM customer AS c
LEFT JOIN payment AS p
ON c.customer_id = p.customer_id;

SELECT * FROM customer AS c
RIGHT JOIN payment AS p
ON c.customer_id = p.customer_id;

SELECT * FROM customer AS c
FULL OUTER JOIN payment AS p
ON c.customer_id = p.customer_id;
```

**Likely interview Q:** *Which JOIN would you use to find customers with no orders?* → `LEFT JOIN` from customer to orders, filter `WHERE orders.id IS NULL`.

---

## 12. SELF JOIN, UNION & UNION ALL

**SELF JOIN** — a table joined to itself (e.g., employee-manager relationship).
```sql
SELECT T2.empname, T1.empname
FROM emp AS T1
JOIN emp AS T2
ON T1.empid = T2.manager_id;
```

**UNION** — combines results of 2+ `SELECT` statements, **removes duplicates**. Requires same number/order/type of columns.
```sql
SELECT cust_name, cust_amount FROM custA
UNION
SELECT cust_name, cust_amount FROM custB;
```

**UNION ALL** — same as UNION but **keeps duplicates** (faster, no dedup step).
```sql
SELECT cust_name, cust_amount FROM custA
UNION ALL
SELECT cust_name, cust_amount FROM custB;
```

**Likely interview Q:** *UNION vs UNION ALL?* — UNION removes duplicate rows (extra processing cost); UNION ALL keeps everything and is faster.

---

## 13. Subquery

A **subquery** (inner/nested query) lets you build a query using the output of another query.
```sql
SELECT column_name(s)
FROM table_name
WHERE column_name operator
    (SELECT column_name FROM table_name WHERE ...);
```
**Example approach:** "Find customers whose payment amount is more than the average total paid by all customers" →
1. Compute the average amount (inner query).
2. Filter customers whose amount > that average (outer query).

---

## 14. Window Functions

Window functions apply **aggregate, ranking, or analytic** functions over a defined "window" (set of rows) **without collapsing rows** into one output row (unlike GROUP BY).

**Syntax**
```sql
SELECT column_name(s),
       fun() OVER ( [PARTITION BY ...] [ORDER BY ...] [ROWS/RANGE ...] )
FROM table_name;
```

**Key terms**
- `OVER` — signals this is a window function.
- `PARTITION BY` — splits rows into groups for the calculation.
- `ORDER BY` — orders rows within each partition.
- `ROWS` — further restricts rows within a partition (optional).

**Types**
| Aggregate | Ranking | Value/Analytic |
|---|---|---|
| `SUM` | `ROW_NUMBER` | `LEAD` |
| `AVG` | `RANK` | `LAG` |
| `COUNT` | `DENSE_RANK` | `FIRST_VALUE` |
| `MIN` | `PERCENT_RANK` | `LAST_VALUE` |
| `MAX` | | |

**Aggregate example**
```sql
SELECT new_id, new_cat,
SUM(new_id)   OVER(PARTITION BY new_cat ORDER BY new_id) AS "Total",
AVG(new_id)   OVER(PARTITION BY new_cat ORDER BY new_id) AS "Average",
COUNT(new_id) OVER(PARTITION BY new_cat ORDER BY new_id) AS "Count",
MIN(new_id)   OVER(PARTITION BY new_cat ORDER BY new_id) AS "Min",
MAX(new_id)   OVER(PARTITION BY new_cat ORDER BY new_id) AS "Max"
FROM test_data;
```
> Using `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` gives a single aggregate value across the whole partition/input.

**Ranking example**
```sql
SELECT new_id,
ROW_NUMBER()   OVER(ORDER BY new_id) AS "ROW_NUMBER",
RANK()         OVER(ORDER BY new_id) AS "RANK",
DENSE_RANK()   OVER(ORDER BY new_id) AS "DENSE_RANK",
PERCENT_RANK() OVER(ORDER BY new_id) AS "PERCENT_RANK"
FROM test_data;
```

**Likely interview Q:** *RANK vs DENSE_RANK vs ROW_NUMBER?*
- `ROW_NUMBER()` — unique sequential number per row, no gaps, no ties.
- `RANK()` — same rank for ties, **skips** subsequent ranks (1,2,2,4).
- `DENSE_RANK()` — same rank for ties, **no skipping** (1,2,2,3).

**Analytic example**
```sql
SELECT new_id,
FIRST_VALUE(new_id) OVER(ORDER BY new_id) AS "FIRST_VALUE",
LAST_VALUE(new_id)  OVER(ORDER BY new_id) AS "LAST_VALUE",
LEAD(new_id)         OVER(ORDER BY new_id) AS "LEAD",
LAG(new_id)          OVER(ORDER BY new_id) AS "LAG"
FROM test_data;
```
- `LEAD()` — value from the **next** row.
- `LAG()` — value from the **previous** row.
- You can offset by N: `LEAD(new_id, 2)`, `LAG(new_id, 2)`.
- For a single overall last value: use `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.

**Likely interview Q:** *Window function vs GROUP BY?* — GROUP BY collapses rows into one row per group; window functions keep every row while still computing group-level aggregates alongside them.

---

## 15. CASE Statement / Expression

Works like if-then-else; returns `NULL` if no condition matches and there's no `ELSE`.

**CASE (statement form — conditions)**
```sql
SELECT customer_id, amount,
CASE
    WHEN amount > 100 THEN 'Expensive product'
    WHEN amount = 100 THEN 'Moderate product'
    ELSE 'Inexpensive product'
END AS ProductStatus
FROM payment;
```

**CASE (expression form — exact value match)**
```sql
SELECT customer_id,
CASE amount
    WHEN 500 THEN 'Prime Customer'
    WHEN 100 THEN 'Plus Customer'
    ELSE 'Regular Customer'
END AS CustomerStatus
FROM payment;
```

---

## 16. Common Table Expressions (CTE)

A **CTE** is a temporary named result set (defined with `WITH`) usable in a subsequent statement. Improves readability vs. nested subqueries.

**Syntax**
```sql
WITH my_cte AS (
    SELECT a, b, c FROM Table1
)
SELECT a, c
FROM my_cte;
```

**Multiple CTEs (comma-separated)**
```sql
WITH my_cp AS (
    SELECT *, AVG(amount) OVER(ORDER BY p.customer_id) AS "Average_Price",
           COUNT(address_id) OVER(ORDER BY c.customer_id) AS "Count"
    FROM payment AS p
    INNER JOIN customer AS c ON p.customer_id = c.customer_id
),
my_ca AS (
    SELECT *
    FROM customer AS c
    INNER JOIN address AS a ON a.address_id = c.address_id
    INNER JOIN country AS cc ON cc.city_id = a.city_id
)
SELECT cp.first_name, cp.last_name, ca.city, ca.country, cp.amount
FROM my_ca AS ca, my_cp AS cp;
```

**Likely interview Q:** *CTE vs Subquery?* — A CTE is named, more readable, reusable multiple times in the same query, and can be recursive; a subquery is nested inline and typically used once.

---

## Quick-Fire Interview Summary Table

| Concept | One-line answer |
|---|---|
| PK vs FK | PK unique+not null, one per table; FK links tables, allows duplicates/nulls |
| DELETE vs TRUNCATE vs DROP | DELETE=rows w/ WHERE (DML); TRUNCATE=all rows (DDL); DROP=whole table |
| WHERE vs HAVING | WHERE filters rows pre-group; HAVING filters groups post-GROUP BY |
| UNION vs UNION ALL | UNION dedupes; UNION ALL keeps duplicates |
| INNER vs LEFT vs RIGHT vs FULL JOIN | matching only / all-left / all-right / all-either |
| RANK vs DENSE_RANK vs ROW_NUMBER | skips ties / no skip on ties / always unique |
| GROUP BY vs Window Function | collapses rows / keeps rows, adds computed columns |
| CTE vs Subquery | named & reusable / inline & single-use |
| Query execution order | FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT |

---

*Source material: "Complete SQL With Notes" by Rishabh Mishra (YouTube: @RishabhMishraOfficial).*
