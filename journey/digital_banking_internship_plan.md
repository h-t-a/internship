# 3 Months Learning Journey (Digital Banking)

**Projects:** Admin Console (`admin_console`, `admin_console_spa`), iBanking (`ibanking17`, `ibanking-portal`), IAM (`ibanking_iam_mongo`)
**Stack:** Angular, Java Spring Boot, MongoDB / SQL
**Prerequisites:** Fundamental knowledge of Java EE, HTML, CSS, JavaScript

---

## Schedule

### Month 1 - Transition & Environment Setup
*Focus: Bridging the gap from Java EE to Spring Boot, and basic web to Angular. Setting up the local environment.*

| Week | Assignment | Hands-on Activity |
| :--- | :--- | :--- |
| **Week 1** | **Onboarding & Environment Setup:**<br>Install tools (Node.js, Angular CLI, JDK, IDE, Git, DB clients). | Clone `admin_console`, `admin_console_spa`, `ibanking17`, `ibanking-portal`, and `ibanking_iam_mongo`. Run frontend & backend locally. Explore project structures. |
| **Week 2** | **Backend Transition (Java EE to Spring Boot):**<br>Discuss Dependency Injection (IoC), Spring Web MVC vs Servlets, core annotations (`@RestController`, `@Service`, `@Repository`), and application properties. | **Trace Backend Flow:** Pick a simple REST API in `admin_console` or `ibanking17` and trace the request from Controller -> Service -> Repository. |
| **Week 3** | **Frontend Transition (HTML/JS to Angular):**<br>Discuss TypeScript basics, Angular Components, Modules, Data Binding, and difference from vanilla HTML/JS. | **Trace Frontend Flow:** Trace an existing UI screen in `admin_console_spa` or `ibanking-portal` (HTML -> Component -> Service). |
| **Week 4** | **Project Architecture & Auth Flow:**<br>Understand how the SPA communicates with Spring Boot via REST APIs. Discuss JWT Authentication flow and how `ibanking_iam_mongo` fits in. | **End-to-End Trace:** Trace a full login or dashboard loading flow from Angular -> Spring Boot API -> Database. Document findings and present to team. |

### Month 2 - Core Development & Minor Issues
*Focus: Deepening framework knowledge and starting to contribute to the actual codebase via minor bug fixes.*

| Week | Assignment | Hands-on Activity |
| :--- | :--- | :--- |
| **Week 5** | **Deep Dive: Backend Data Access:**<br>Explain Spring Data JPA / MongoRepository. Discuss Request/Response DTO patterns, entity mapping, and database interaction in the projects. | **Query Tracing:** Find and explain a complex query or stored procedure used in `ibanking17` or `admin_console`. |
| **Week 6** | **Deep Dive: Angular Services & HTTP:**<br>Explain Angular `HttpClient`, RxJS (Observables, Subscriptions, basic operators like `map`, `catchError`), and Route Guards. | **API Integration Study:** Study how API responses are handled and mapped to the UI in `ibanking-portal` (e.g., Bill Payment or Account Info screens). |
| **Week 7** | **Hands-on: Admin Console Bug Fixes:**<br>Learn Git workflow (branching, commits, MR). | **Bug Fixing:** Fix 1-2 assigned minor bugs in `admin_console_spa` or `admin_console` (e.g., UI alignment, form validation, simple API error handling). Submit MR. |
| **Week 8** | **Hands-on: iBanking Bug Fixes:**<br>Understand the specific architecture of iBanking portal and backend. | **Bug Fixing:** Fix 1-2 minor issues in `ibanking-portal` or `ibanking17`. Participate in code review with seniors. |

### Month 3 - Feature Enhancement & Code Quality
*Focus: Building a full feature end-to-end, understanding code quality, and final evaluation.*

| Week | Assignment | Hands-on Activity |
| :--- | :--- | :--- |
| **Week 9** | **Feature Enhancement (Part 1):**<br>Discuss adding a new feature. Explain how to design the API contract, database changes, and UI layout. | **Mini Feature:** Start adding a small enhancement (e.g., a new filter field, CSV export, or new lookup component) involving both frontend and backend. |
| **Week 10** | **Feature Enhancement (Part 2):**<br>Discuss code standards, logging best practices, security (e.g., input sanitization), and performance considerations. | Complete the mini feature development. Submit a full-stack MR. Address review comments from seniors. |
| **Week 11** | **Testing & Refactoring:**<br>Introduction to Unit Testing (JUnit/Mockito for Backend, Jasmine/Karma for Angular). Code review checklist. | Write basic unit tests for the newly developed feature or refactor a small piece of assigned code. |
| **Week 12** | **Wrap-up & Evaluation:**<br>Preparation for final presentation. Reflect on learning progress. | **Final Presentation:** Demo the completed mini feature and bug fixes, do a code walkthrough, and submit the final internship report. |

---

## Deliverables Summary

| Month | Key Deliverables |
| :--- | :--- |
| **Month 1** | Running local environments, E2E Flow Trace Document, Weekly Reports |
| **Month 2** | 2-3 Bug Fix MRs (Admin Console & iBanking), Weekly Reports |
| **Month 3** | 1 Full-stack Mini Feature MR, Basic Unit Tests, Final Presentation |

## Tools & Technologies

| Category | Tools |
| :--- | :--- |
| **Frontend** | Angular, TypeScript, HTML, SCSS/CSS |
| **Backend** | Java, Spring Boot, Spring Data |
| **Database** | MongoDB (`ibanking_iam_mongo`), SQL Server / Oracle |
| **Version Control**| Git, GitLab/GitHub (Branching, MRs) |
| **IDE** | VS Code (Frontend), IntelliJ IDEA (Backend) |
