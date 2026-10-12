# Week 2 Milestone Plan: Learning & Discussion: MFS Dual-Portal Architecture Overview

> **Program:** MFS 3-Months Learning Journey (2026)  
> **Department:** SDD (Software Development Department)  
> **Intern Cohort:** Ma Yamin Aye (`y.a@mit.com.mm`) & Mg Phyo Min Htet (`pmh@mit.com.mm`)  
> **Mentors / Leads:** Ko Hlwan Kyaw Phyo 
> **Sprint Period:** Week 2 (October 12, 2026 – October 16, 2026)  
> **Journey Plan Reference:** [`journey/MFS_internship_plan.docx`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Internship_2026/journey/MFS_internship_plan.docx) | [`journey/MFS_internship_plan.pdf`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Internship_2026/journey/MFS_internship_plan.pdf)  
> **Core Deliverable:** Weekly Progress Report #2 & MFS Dual-Portal Architecture Blueprint  

---

## 1. Week 2 Sprint Outline & Objectives

Study architecture differences between customer-facing `iBanking_portal` and back-office `adminconsole`. Understand authentication flows (Customer OTP/JWT vs. Admin RBAC & session management), API gateway routing, and Serverless service communication.

This week focuses directly on the **`adminconsole` projects**, including both the **Admin Console Backend** ([`admin_console`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console)) and the **Admin Console Portal/SPA** ([`admin_console_spa`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa)), comparing them with the customer-facing [`iBanking_repo`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iBanking_repo) and analyzing the shared internal dependencies ([`Dependencies Project`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Dependencies%20Project)).

### Sprint Outline & Main Pillars:
1. **Portal Architecture:** Understand the differences between `iBanking_portal` and `adminconsole`.
2. **Customer Authentication:** Study OTP verification, JWT access tokens and refresh tokens.
3. **Admin Authentication:** Understand RBAC, roles, permissions and session management.
4. **API Gateway:** Learn API routing, authentication policies and request handling.
5. **Serverless Services:** Understand communication between Azure Functions and backend services.
6. **Security & Testing:** Review authorization, error handling, logging and audit trails.
7. **Documentation:** Prepare an architecture diagram and summarize key findings.
- **And the last one - INTERNAL DEPENDENCIES:**
  - **Dependencies Project Deep Dive:** Rationale, usage points, and runtime execution of internal shared libraries (`httputils`, `sequelize-java`).

---

## 2. Core Architecture Pillars

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                       |
|  +-------------------------------------+     +-------------------------------------+  |
|  |     iBanking Portal (Customer)      |     |     Admin Console SPA (Back-Office) |  |
|  |   Angular 17+ SPA (Retail/SME)      |     |    Angular SPA (Ops/Audit/SuperAdmin)| |
|  | Self-service, Masked PII, OTP Auth  |     |   Strict RBAC, Maker-Checker, Audit |  |
|  +------------------+------------------+     +------------------+------------------+  |
+---------------------|-------------------------------------------|---------------------+
                      | HTTPS / REST                              | HTTPS / REST
                      v                                           v
+---------------------------------------------------------------------------------------+
|                          API GATEWAY & TRAFFIC INGRESS                                |
|  - TLS Termination, CORS Policy, Global Rate Limiting                                 |
|  - Public Routes: /api/v1/auth/*, /api/v1/customer/* (Customer Ingress)               |
|  - Private Routes: /api/v1/admin/* (IP Allowlisting, Admin Token Validation)          |
|  - Header Propagation: X-Correlation-ID, X-User-ID, X-Tenant-ID                       |
+------------------------------------------+--------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|                 SERVERLESS MICROSERVICES LAYER (AZURE FUNCTIONS)                      |
|  +------------------------------------+     +--------------------------------------+  |
|  |    admin_console (Azure Functions) |     |       ibanking17 / Backend APIs      |  |
|  | Java 17, HTTP Triggers, pom.xml    |     | Financial Operations, Transfer Core  |  |
|  | host.json, local.settings.json     |     | Balance Inquiry, Statement Engine    |  |
|  +------------------+-----------------+     +------------------+-------------------+  |
|                     |                                          |                      |
|                     +--------------------+---------------------+                      |
|                                          |                                            |
|                                          v                                            |
|            +------------------------------------------------------------+             |
|            |                 SHARED INTERNAL DEPENDENCIES               |             |
|            |  - httputils: Unified HTTP Client & Error Interceptors     |             |
|            |  - sequelize-java: Lightweight ORM & SQL Query Builder     |             |
|            +-----------------------------+------------------------------+             |
+------------------------------------------|--------------------------------------------+
                                           | JDBC Connection Pool
                                           v
+---------------------------------------------------------------------------------------+
|                     PERSISTENCE & AUDIT LAYER (PostgreSQL & MSSQL)                    |
|  - Database: cleandb | Schema: adminchannel (PostgreSQL)                              |
|  - Security & Auth: admin_user, admin_user_role, roles, permissions, blacklisttoken   |
|  - Banking Core: accountmapping, branchsetting, atmsequence, cheque, cifmapping       |
|  - Audit Log: Immutable audit trail records (Actor, Action, Timestamp, IP, Delta)     |
+---------------------------------------------------------------------------------------+
```

---

### Pillar 1: Dual-Portal Architecture Comparison
**Objective:** Understand the structural, functional, operational, and security differences between consumer-facing digital banking and internal back-office administration.

* **Primary Repositories:**
  * Customer Portal: [`iBanking_repo`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iBanking_repo) (`ibanking-portal`, `ibanking-spa`, `ibanking17`)
  * Admin Portal: [`adminConsole_repo/admin_console_spa`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa)
* **Architectural Comparison Matrix:**

| Dimension | `iBanking_portal` (Customer) | `adminconsole` (Internal Staff) |
| :--- | :--- | :--- |
| **Primary Audience** | Retail consumers, SME business clients | Branch operators, compliance officers, risk managers, system admins |
| **Operational Goal** | Self-service banking, balance inquiry, fund transfers, bill payments | User lifecycle management, limit approvals, account unlocks, audit inspections |
| **Security Philosophy** | Zero-trust self-service: OTP challenges, transaction signing, session auto-lock | Granular RBAC, Maker-Checker segregation of duties, immutable audit logging |
| **Data Masking** | PII masked by default (e.g., `**** 1234`), sensitive tokens hidden | Operational visibility with strict permission gating per data field |
| **Application Structure** | Consumer SPA modules (accounts, transfers, bill-payment) | Back-office management modules (user-management, limits, audit-logs) |

* **Key Action Items:**
  1. Inspect the Angular modules, routing hierarchy, and component trees in [`adminConsole_repo/admin_console_spa/src`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/src).
  2. Compare component hierarchy, Angular service injection, and shared models across both portals.
  3. Identify how route guards (`AuthGuard`, `RoleGuard`) guard administrative screens.

---

### Pillar 2: Customer Authentication Flow (OTP & JWT Lifecycle)
**Objective:** Dissect the multi-factor authentication mechanism securing consumer banking operations.

* **Core Flow Steps:**
  1. **Primary Challenge:** Customer enters credentials (Username/Password or Biometric token).
  2. **OTP Generation & Dispatch:** The Identity and Access Management service ([`iAM_repo/ibanking_iam`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iAM_repo/ibanking_iam)) generates a cryptographically random 6-digit OTP, salts/hashes it with a short TTL (120–180 seconds), and dispatches it via the SMS Gateway ([`GateWay/smsgateway`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/GateWay/smsgateway)).
  3. **Verification & Token Issuance:** Upon successful OTP verification, the auth server generates a short-lived **JWT Access Token** (15-minute expiration) and a secure **Refresh Token** (HTTP-only cookie or encrypted local storage).
  4. **Silent Refresh Rotation:** The Angular HTTP Interceptor intercepts outgoing API calls. When the Access Token nears expiration, it seamlessly issues a refresh request to obtain a new Access Token without interrupting the customer's session.
  5. **Session Expiry & Invalidation:** On explicit logout or inactivity timeout, tokens are revoked.

* **Key Action Items:**
  1. Map the JWT payload structure (`sub`, `iss`, `exp`, `cif`, `accountNumbers`).
  2. Trace OTP verification failure handling (max retry limits, temporary lockouts).
  3. Document the Angular interceptor handling token injection (`Authorization: Bearer <token>`).

---

### Pillar 3: Admin Authentication & Role-Based Access Control (RBAC)
**Objective:** Understand how staff identities are validated, governed, and audited across administrative functions.

* **RBAC Architecture & Hierarchical Roles:**
  * **Super Admin:** System configuration, tenant setup, role and permission provisioning.
  * **Checker / Approver:** Dual-control verification; approves or rejects transactions, customer status changes, and limit adjustments initiated by Makers.
  * **Maker / Operator:** Day-to-day operations; initiates status unlocks, beneficiary adjustments, and customer profile updates.
  * **Auditor / Compliance:** Read-only access to immutable audit trails, access logs, and reporting queries.
* **Database Schema Integration ([`assets/adminconsole.dump`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Internship_2026/assets/adminconsole.dump)):**
  * `admin_user`: Stores staff accounts, status, credentials, and department association.
  * `admin_user_role`: Many-to-many junction mapping staff members to functional roles.
  * `roles` & `permissions`: Granular capability flags (e.g., `USER_LOCK`, `LIMIT_OVERRIDE_APPROVE`).
  * `blacklisttoken`: Stores invalidated JWT IDs (`jti`) upon admin logout or administrative forced revocation.

* **Key Action Items:**
  1. Query the restored `adminchannel` database in PgAdmin4 to inspect role tables.
  2. Analyze how backend filters evaluate permissions on incoming REST calls.
  3. Review session idle timeout controls (strict 10-15 minute threshold for back-office security).

---

### Pillar 4: API Gateway Routing & Auth Policies
**Objective:** Master the traffic ingress patterns connecting frontends to backend microservices.

* **Gateway Responsibilities:**
  1. **Reverse Proxying & URL Rewriting:** Directs `/api/v1/customer/*` to customer microservices and `/api/v1/admin/*` to administrative services.
  2. **Security Filtering:** Enforces CORS policies, protects against DDoS via rate limiting, and validates authorization headers.
  3. **Header Propagation & Observability:** Automatically stamps incoming requests with:
     * `X-Correlation-ID`: Unique UUID for distributed request tracing across microservices.
     * `X-User-ID` / `X-Role`: Authenticated actor context passed downstream.
     * `X-Forwarded-For`: Original client IP address for compliance audit logs.

* **Key Action Items:**
  1. Review API endpoint route mappings (/api/admin/* vs /api/customer/*) and controller paths.
  2. Test route proxying using Postman collections ([`adminConsole_repo/admin_console/api_collections`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/api_collections)).
  3. Verify how failed token checks result in standardized HTTP 401 Unauthorized responses.

---

### Pillar 5: Serverless Microservices Execution (Azure Functions Java)
**Objective:** Understand serverless backend architecture inside [`adminConsole_repo/admin_console`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console).

* **Core Runtime Components:**
  * [`pom.xml`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/pom.xml): Declares Java 17 compilation target, `azure-functions-java-library` dependencies, and `azure-functions-maven-plugin`.
  * [`host.json`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/host.json): Defines runtime settings, logging telemetry filters, and function execution timeouts.
  * [`local.settings.json`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/local.settings.json): Encapsulates environment variables, database connection strings, Azure storage accounts, and tenant keys for local development.
  * Environment profiles: Multi-tenant configuration files (`ndb.json`, `tcb.json`, `ydnb.json`).
* **Execution Pattern:**
  * HTTP-triggered functions (`@HttpTrigger`) receive incoming requests.
  * Request payload is validated using DTO classes.
  * Business logic executes in service handlers, delegating database access to the persistence layer.

* **Key Action Items:**
  1. Review Azure Functions entry points in [`adminConsole_repo/admin_console/src`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/src).
  2. Run the Azure Functions backend locally (`mvn azure-functions:run`) to inspect function triggers and local logs.
  3. Test HTTP trigger invocations with Postman payloads.

---

### Pillar 6: Shared Core Dependencies Deep Dive
**Objective:** Analyze the internal libraries that eliminate boilerplate across SDD microservices.

#### 1. `httputils` (Standardized Microservice HTTP Client)
* **Location:** [`Dependencies Project/httputils`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Dependencies%20Project/httputils)
* **Stack:** Java 1.8+, Jakarta RESTful Web Services (`jakarta.ws.rs`), Jackson Databind, Lombok, Azure Functions Java Library.
* **Why Needed:** In financial microservices, outbound HTTP calls (to payment gateways, core banking, SMS providers) require consistent timeout handling, SSL context setup, correlation ID header propagation, and uniform error wrapping. Writing this in every function introduces bugs and drift.
* **Where Used:** Injected into Azure Functions and backend services whenever calling downstream REST endpoints.
* **How It Works:** Wraps JAX-RS client builders with custom filters. Automatically injects `X-Correlation-ID` and authorization headers, logs outbound requests/responses, and unmarshals JSON payloads directly into Java DTOs while translating HTTP error status codes into strongly-typed banking exceptions.

#### 2. `sequelize-java` (Lightweight SQL Query Builder & ORM)
* **Location:** [`Dependencies Project/sequelize-java`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Dependencies%20Project/sequelize-java)
* **Stack:** Java 1.8+, JDBC, PostgreSQL & MSSQL drivers, Lombok.
* **Why Needed:** Heavyweight ORMs like Hibernate/Spring Data JPA carry significant memory footprints, lazy loading pitfalls, and slow cold-start times in serverless environments. `sequelize-java` provides a fluent, expressive query builder inspired by Node.js Sequelize, optimized specifically for fast serverless execution.
* **Where Used:** Used across data access objects (DAOs) and repositories to query PostgreSQL (`cleandb`) and MSSQL databases.
* **How It Works:** Provides fluent methods (`findOne`, `findAll`, `create`, `update`, `destroy`, `transaction`). It constructs parameterized SQL statements at runtime to prevent SQL injection, executes queries against pooled JDBC connections, and maps `ResultSet` rows to Java model objects using Lombok accessors.

---

### Pillar 7: Database Architecture & Schema Exploration (`adminchannel`)
**Objective:** Inspect the physical database layout supporting the Admin Console.

* **Source File:** [`assets/adminconsole.dump`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Internship_2026/assets/adminconsole.dump) / [`assets/adminconsole.dump.zip`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Internship_2026/assets/adminconsole.dump.zip)
* **Target Environment:** PostgreSQL (`cleandb` database, `adminchannel` schema).
* **Key Table Groups (30+ Tables Total):**
  1. **Authentication & Identity:** `admin_user`, `admin_user_role`, `roles`, `permissions`, `blacklisttoken`, `session_history`.
  2. **Core Banking Operations:** `accountmapping`, `accounttransferreport`, `atmsequence`, `bankcom`, `banks`, `branch`, `branchsetting`, `cheque`, `cifmapping`.
  3. **Operational Configuration:** `system_settings`, `notification_template`, `fee_configuration`.

* **Restoration & Verification Commands:**
  ```bash
  # 1. Create target database (if not existing)
  createdb -U postgres cleandb

  # 2. Restore PostgreSQL custom format dump
  pg_restore -U postgres -d cleandb -v "assets/adminconsole.dump"

  # 3. Verify restored tables via psql
  psql -U postgres -d cleandb -c "\dt adminchannel.*"
  ```

---

## 3. Day-by-Day Sprint Schedule (Week 2)

| Day | Date | Focus Topic | Specific Tasks & Hands-on Activities | Expected Output / Deliverable |
| :--- | :--- | :--- | :--- | :--- |
| **Day 1** | Mon, Oct 12 | **Dual-Portal Comparison** | • Clone & examine [`adminConsole_repo/admin_console_spa`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa)<br>• Review Angular project structure and routing guards<br>• Compare UI layout and UX patterns with `iBanking_portal` | Architectural comparison notes; directory structure mapping |
| **Day 2** | Tue, Oct 13 | **Customer Auth & Tokens** | • Trace OTP challenge flow via [`GateWay/smsgateway`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/GateWay/smsgateway)<br>• Analyze JWT Access Token payload and claim validation<br>• Study silent refresh token rotation in Angular HTTP Interceptors | Sequence diagram: Customer Login & Silent Token Refresh |
| **Day 3** | Wed, Oct 14 | **Admin RBAC & Security** | • Inspect `admin_user`, `roles`, `permissions` in PgAdmin4<br>• Trace backend permission validation on incoming requests<br>• Study admin session idle timeout and `blacklisttoken` table | RBAC permission matrix document; token invalidation flow |
| **Day 4** | Thu, Oct 15 | **Gateway & Serverless** | • Review API Gateway routing rules and header propagation<br>• Inspect [`host.json`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/host.json) and [`local.settings.json`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/local.settings.json)<br>• Deep-dive into [`httputils`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Dependencies%20Project/httputils) and [`sequelize-java`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/Dependencies%20Project/sequelize-java) | Code walkthrough notes for dependencies & Azure Functions |
| **Day 5** | Fri, Oct 16 | **Audit, Diagram & Report** | • Review audit logging mechanisms and error handling<br>• Assemble comprehensive MFS Dual-Portal Architecture Diagram<br>• Complete and submit **Weekly Report #2** on the Astro portal | Submitted Weekly Report #2 + Architecture Diagram |

---

## 4. Evaluation Criteria & Quality Standards

In accordance with the **MFS Evaluation Criteria** from the Journey Plan, Week 2 work will be evaluated against five core dimensions:

```
+-----------------------------------------------------------------------------------+
|                        MFS INTERNSHIP EVALUATION WEIGHTS                          |
|                                                                                   |
|  [=== 10% ===]  Attendance & Punctuality (Daily standups & discussion)            |
|  [====== 20% ======]  Weekly Report Quality (Clarity, completeness, timely submit)|
|  [========= 30% =========]  Code Quality & Technical Depth (MRs & Architecture)   |
|  [====== 20% ======]  Problem-Solving & Initiative (Analysis & questions)         |
|  [====== 20% ======]  Final Presentation & Code Defense                           |
+-----------------------------------------------------------------------------------+
```

1. **Attendance & Punctuality (10%):** Prompt attendance at 9:00 AM daily syncs, active discussion of architectural findings.
2. **Weekly Report Quality (20%):** High-quality submission of Weekly Report #2 detailing concrete observations, code paths, and blockers.
3. **Code Quality & Architecture Depth (30%):** Accurate understanding of Azure Functions serverless triggers, RBAC permission filters, and dependency lifecycle.
4. **Problem-solving & Initiative (20%):** Proactive verification of database restoration, testing Postman collections, and identifying edge cases.
5. **Presentation Preparation (20%):** Clear architectural diagrams and structured summaries suitable for mentor review.

---

## 5. Definition of Done (DoD) for Week 2

- [ ] All 7 Architecture Pillars thoroughly analyzed across both portals.
- [ ] Local Azure Functions backend (`admin_console`) runs without configuration errors.
- [ ] PostgreSQL `adminchannel` database schema dump successfully queried in PgAdmin4 / `psql`.
- [ ] Dependencies (`httputils`, `sequelize-java`) code paths analyzed and documented.
- [ ] MFS Dual-Portal Architecture Diagram prepared.
- [ ] **Weekly Progress Report #2** completed and submitted for mentor review.