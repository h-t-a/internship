// SDD Digital Banking Internship Portal - Client-side Data Store
// Provides full CRUD operations for weeks, interns, mentors, and program metadata.
// Persists in localStorage and generates formatted JS for src/data/internshipData.js.

(function () {
  const STORAGE_KEY = 'sdd_internship_data_custom_v1';

  // Fallback initial data structure
  const initialData = {
    roadmapConfig: {
      maxVisibleWeek: 2,
      maxVisibleMonth: 1
    },
    internshipMeta: {
      title: "MFS Digital Banking Internship 2026",
      organization: "SDD (Software Development Department)",
      cohort: "2026 Internship Program",
      duration: "3 Months (12 Weeks)",
      stack: ["Angular 17+", "Java 17", "PostgreSQL", "MSSQL Server", "Azure Functions Serverless"],
      corePortals: [
        {
          name: "iBanking Portal",
          type: "Customer Internet Banking",
          desc: "Customer-facing SPA for retail banking, transfers, bill payments, and statements.",
          repo: "iBanking_repo/ibanking-spa & ibanking17"
        },
        {
          name: "Admin Console",
          type: "Back-Office Management",
          desc: "Internal staff portal for audit trails, user management, KYC, and maker-checker approvals.",
          repo: "adminConsole_repo/admin_console & admin_console_spa"
        }
      ],
      interns: [
        {
          name: "Ma Yamin Aye",
          email: "y.a@mit.com.mm",
          role: "Software Engineering Intern",
          avatar: "YA"
        },
        {
          name: "Mg Phyo Min Htet",
          email: "pmh@mit.com.mm",
          role: "Software Engineering Intern",
          avatar: "PM"
        }
      ],
      mentors: [
        {
          name: "Ko Hlwan Kyaw Phyo",
          role: "Assistant Manager • Solution Delivery Department / Lead Mentor",
        },
      ],
      evaluationCriteria: [
        { criteria: "Attendance & Punctuality", weight: "10%", description: "Punctual attendance, active participation in daily stand-ups and team discussions." },
        { criteria: "Weekly Report Quality", weight: "20%", description: "Thoroughness, clarity, and timely submission of weekly progress and learning reports." },
        { criteria: "Code Quality (MR Reviews)", weight: "30%", description: "Adherence to coding standards, clean architecture, security awareness, and test coverage." },
        { criteria: "Problem-solving & Initiative", weight: "20%", description: "Analytical thinking, debugging capability, proactiveness in learning, and asking right questions." },
        { criteria: "Final Presentation", weight: "20%", description: "Quality of live demo (iBanking & Admin Console), clear slide delivery, and code defense." }
      ]
    },
    monthsData: [
      {
        month: 1,
        title: "Month 1 — Foundation & Environment Setup",
        theme: "Setup, Architecture & Transaction Flow Tracing",
        weeks: [1, 2, 3, 4],
        deliverable: "Running local environment (iBanking & Admin Console), Architecture documentation, End-to-end module trace report"
      },
      {
        month: 2,
        title: "Month 2 — Core Development Skills",
        theme: "Serverless APIs, Ledger Concepts, Bug Fixing & Feature Enhancements",
        weeks: [5, 6, 7, 8],
        deliverable: "2–3 bug fix MRs, 1 feature enhancement MR across frontend and backend"
      },
      {
        month: 3,
        title: "Month 3 — Feature Development & Code Quality",
        theme: "Banking Security, Mini-Features, Unit Testing & Final Presentation",
        weeks: [9, 10, 11, 12],
        deliverable: "1 full-stack mini feature MR, Unit test coverage report & test cases, Final presentation & comprehensive internship report"
      }
    ],
    weeksData: [
      {
        week: 1,
        month: 1,
        title: "Onboarding & Environment Setup",
        status: "Completed",
        badgeColor: "success",
        period: "Oct 5, 2026 – Oct 9, 2026",
        summary: "Tool installation, Ubuntu Linux PuTTY server training, cloning iBanking and Admin Console repositories, database restoration in PgAdmin4, and team Git workflow guidelines.",
        objectives: [
          "Install development tools (Node.js, Angular CLI, JDK 17, VS Code, Git, SSMS, Postgres, Postman)",
          "Attend Ubuntu Linux Server Basic Training (PuTTY & Oracle VirtualBox command line)",
          "Clone iBanking_portal, adminconsole backend, and adminconsole_spa repositories",
          "Configure local PostgreSQL database in PgAdmin4 and restore sample data dump",
          "Understand multi-project repository structure and execute local development runs"
        ],
        deliverable: "Weekly Report #1 & Verified Local Running Environment",
        reportSlug: "week-1",
        hasDetailPlan: false
      },
      {
        week: 2,
        month: 1,
        title: "Learning & Discussion: MFS Dual-Portal Architecture Overview",
        status: "In Progress",
        badgeColor: "warning",
        period: "Oct 12, 2026 – Oct 16, 2026",
        summary: "Study architecture differences between customer-facing iBanking_portal and back-office adminconsole. Understand authentication flows (Customer OTP/JWT vs. Admin RBAC & session management), API gateway routing, and Serverless service communication.",
        objectives: [
          "1. Portal Architecture: Understand the differences between iBanking_portal and adminconsole.",
          "2. Customer Authentication: Study OTP verification, JWT access tokens and refresh tokens.",
          "3. Admin Authentication: Understand RBAC, roles, permissions and session management.",
          "4. API Gateway: Learn API routing, authentication policies and request handling.",
          "5. Serverless Services: Understand communication between Azure Functions and backend services.",
          "6. Security & Testing: Review authorization, error handling, logging and audit trails.",
          "7. Documentation: Prepare an architecture diagram and summarize key findings.",
          "INTERNAL DEPENDENCIES: Dependencies Project Deep Dive (httputils, sequelize-java)"
        ],
        deliverable: "Weekly Report #2, System Architecture Diagram & Technical Notes",
        reportSlug: "week-2",
        hasDetailPlan: true,
        planSlug: "week-2"
      },
      {
        week: 3,
        month: 1,
        title: "Angular Fundamentals in Banking Portals",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Oct 19, 2026 – Oct 23, 2026",
        summary: "Deep-dive into Angular components, reactive forms, custom validators (account number format, amount limits), routing guards (AuthGuard, RoleGuard), HTTP interceptors (token injection, error modal handler), and RxJS observables in both portals.",
        objectives: [
          "Deconstruct Angular components & modular architecture in banking SPAs",
          "Build reactive forms with custom validators for account formats and monetary limits",
          "Implement route protection using Angular AuthGuard and RoleGuard",
          "Configure HTTP interceptors for automatic Bearer token injection and global error handling",
          "Leverage RxJS operators for debouncing search and handling async financial streams"
        ],
        deliverable: "Weekly Report #3 & Component Analysis Report",
        reportSlug: "week-3",
        hasDetailPlan: false
      },
      {
        week: 4,
        month: 1,
        title: "Hands-on: Read & Trace Existing End-to-End Flow",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Oct 26, 2026 – Oct 30, 2026",
        summary: "Trace a complete financial transaction flow across both portals: Customer initiates Fund Transfer / Bill Payment on iBanking_portal (UI Form → Validation → Service → REST API → DB transaction) and staff views transaction record / audit log in adminconsole.",
        objectives: [
          "Trace Fund Transfer UI form validation and payload construction",
          "Track REST API request across the network, gateway, and backend controllers",
          "Inspect database transaction execution, balance checks, and debit/credit ledger writes",
          "Verify transaction appearance and audit trail logging in adminconsole back-office",
          "Produce an end-to-end sequence diagram mapping all participating components"
        ],
        deliverable: "Weekly Report #4 & End-to-End Flow Trace Sequence Diagram",
        reportSlug: "week-4",
        hasDetailPlan: false
      },
      {
        week: 5,
        month: 2,
        title: "Java Serverless REST API for Financial Services",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Nov 2, 2026 – Nov 6, 2026",
        summary: "Controller, Service, and Repository layers; DTO pattern, validation (@Valid), error handling (@ControllerAdvice), idempotency key handling for transactions, and Maker-Checker approval workflow design.",
        objectives: [
          "Study 3-tier Java architecture: Controller, Service, and Repository patterns",
          "Implement strong DTO validation using @Valid and custom constraint validators",
          "Design centralized exception handling with @ControllerAdvice",
          "Understand financial transaction idempotency keys to prevent double-charging",
          "Examine Maker-Checker workflow patterns for sensitive administrative operations"
        ],
        deliverable: "Weekly Report #5 & REST API Architecture Summary",
        reportSlug: "week-5",
        hasDetailPlan: false
      },
      {
        week: 6,
        month: 2,
        title: "MFS Database Design & Ledger Concepts",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Nov 9, 2026 – Nov 13, 2026",
        summary: "Core schemas across customer and admin modules (Customer, Account, Transaction, TransferLimit, FeeConfig, AdminUser, RolePermission, AuditLog). Double-entry Dr/Cr logic, ACID transactions, and indexing.",
        objectives: [
          "Analyze core database schemas: Customer, Account, Transaction, TransferLimit, FeeConfig",
          "Understand double-entry bookkeeping principles (Debit vs Credit ledger balance)",
          "Verify ACID transaction isolation levels for concurrency and race conditions",
          "Review indexing strategies for high-frequency transaction and audit log queries"
        ],
        deliverable: "Weekly Report #6 & Database Schema Analysis ERD",
        reportSlug: "week-6",
        hasDetailPlan: false
      },
      {
        week: 7,
        month: 2,
        title: "Hands-on: Bug Fix Assignment",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Nov 16, 2026 – Nov 20, 2026",
        summary: "Fix 2–3 assigned minor bugs across iBanking_portal and adminconsole (e.g., input masking/validation for account numbers, date-picker filter issue on Admin transaction history, error toast handling on failed API calls). Submit via Git branch & Merge Request (MR).",
        objectives: [
          "Reproduce 2-3 assigned bugs in local staging environment",
          "Implement frontend & backend fixes following clean code guidelines",
          "Test edge cases and verify zero regression in surrounding banking modules",
          "Submit Git feature branches and raise clean GitLab Merge Requests (MRs) with descriptions"
        ],
        deliverable: "Weekly Report #7 + 2 to 3 Merge Request Links",
        reportSlug: "week-7",
        hasDetailPlan: false
      },
      {
        week: 8,
        month: 2,
        title: "Hands-on: Feature Enhancement",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Nov 23, 2026 – Nov 27, 2026",
        summary: "Add a full-stack feature enhancement to an existing module (e.g., 'Export Transaction Statement as PDF/CSV' with date range on iBanking_portal OR 'Customer Status Lock/Unlock with Reason & Audit Log' on adminconsole). Implement frontend + backend + DB query.",
        objectives: [
          "Select enhancement module with mentor approval",
          "Design database schema changes, queries, and REST endpoints",
          "Develop frontend UI with responsive state management and feedback toasts",
          "Perform cross-browser and permission validation testing",
          "Submit MR with complete testing notes and screenshots"
        ],
        deliverable: "Weekly Report #8 + Full-Stack Feature MR Link",
        reportSlug: "week-8",
        hasDetailPlan: false
      },
      {
        week: 9,
        month: 3,
        title: "Banking Security Standards & Review Process",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Nov 30, 2026 – Dec 4, 2026",
        summary: "Financial application security best practices, OWASP Top 10 (SQL injection, XSS, CSRF), sensitive data masking (PII, Account/Card numbers), strict BigDecimal usage for monetary math, and MR review checklist.",
        objectives: [
          "Analyze banking protection against OWASP Top 10 vulnerabilities",
          "Ensure proper PII data masking in UI layers and server logs",
          "Audit monetary math to guarantee strict BigDecimal usage without floating-point inaccuracies",
          "Participate in team security code review checklist validation"
        ],
        deliverable: "Weekly Report #9 & Security Audit Checklist",
        reportSlug: "week-9",
        hasDetailPlan: false
      },
      {
        week: 10,
        month: 3,
        title: "Hands-on: Mini Feature Development (Full-Stack)",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Dec 7, 2026 – Dec 11, 2026",
        summary: "Design and implement an assigned mini-feature connecting customer and admin workflows (e.g., 'Beneficiary Management with OTP on iBanking_portal & Flagged Beneficiary Review on adminconsole' OR 'Tiered Transfer Limit Adjustment with Maker-Checker Approval').",
        objectives: [
          "Architect end-to-end customer and administrative dual-flow workflow",
          "Implement secure business logic with Maker-Checker verification",
          "Write clean, reusable Angular components and Java service layer logic",
          "Submit clean MR with thorough documentation and demo screencast"
        ],
        deliverable: "Weekly Report #10 + Mini Feature MR Link",
        reportSlug: "week-10",
        hasDetailPlan: false
      },
      {
        week: 11,
        month: 3,
        title: "Hands-on: Unit Testing, Audit & Code Review",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Dec 14, 2026 – Dec 18, 2026",
        summary: "Write unit tests for assigned services/components (JUnit 5, Mockito for backend; Jasmine/Karma for Angular), verify audit trail integrity and edge cases, participate in peer MR reviews, and document test cases.",
        objectives: [
          "Write unit tests with JUnit 5 & Mockito for Java backend services",
          "Write frontend component and service unit tests using Jasmine & Karma",
          "Validate audit trail completeness for all state-mutating actions",
          "Conduct peer code reviews on fellow intern Merge Requests"
        ],
        deliverable: "Weekly Report #11 & Test Coverage Report",
        reportSlug: "week-11",
        hasDetailPlan: false
      },
      {
        week: 12,
        month: 3,
        title: "Final Project Presentation & Evaluation",
        status: "Upcoming",
        badgeColor: "neutral",
        period: "Dec 21, 2026 – Dec 25, 2026",
        summary: "Present completed work to engineering leads and mentors (live demo of iBanking_portal & adminconsole features + architecture walkthrough), receive evaluation feedback, and submit final comprehensive internship report.",
        objectives: [
          "Prepare slide deck covering 3-month growth, architecture insights, and feature contributions",
          "Deliver live interactive demo of iBanking & Admin Console enhancements",
          "Defend architectural decisions, coding patterns, and security considerations",
          "Submit final comprehensive internship report and receive formal mentor evaluation"
        ],
        deliverable: "Final Internship Report, Live Demo & Evaluation Scorecard",
        reportSlug: "week-12",
        hasDetailPlan: false
      }
    ],
    dependencyDetails: {
      httputils: {
        name: "httputils",
        path: "Dependencies Project/httputils",
        version: "1.0-SNAPSHOT",
        groupId: "com.starless.http",
        stack: ["Java 1.8+", "Azure Functions Java Library 3.0.0", "Jackson Databind", "Jakarta RESTful Web Services", "Lombok"],
        purpose: "Standardized HTTP Client Wrapper for Banking Microservices",
        whyNeeded: "Provides a unified, robust communication client across distributed services. Instead of each microservice writing repetitive boilerplate for HttpClient, SSL truststores, timeouts, retries, and header propagation, httputils standardizes error handling, correlation IDs, and JSON serialization.",
        whereUsed: "Used across backend services (such as Azure Functions in admin_console and ibanking17) whenever an outbound HTTP request is needed to reach payment gateways, core banking APIs, or authentication servers.",
        howItWorks: "Wraps Jakarta RESTful Web Services (JAX-RS) and Jackson Databind. It applies interceptors for request/response logging, injects standard security/authorization headers, automatically maps HTTP error codes to strongly-typed banking exceptions, and unmarshals JSON payloads directly into Java DTOs."
      },
      sequelizeJava: {
        name: "sequelize-java",
        path: "Dependencies Project/sequelize-java",
        version: "1.0-SNAPSHOT",
        groupId: "com.starless",
        stack: ["Java 1.8+", "Lombok", "JDBC", "PostgreSQL / MSSQL"],
        purpose: "Lightweight, Expressive Query Builder & ORM for Java",
        whyNeeded: "Provides a lightweight, intuitive Sequelize-style query builder pattern without the heavy memory footprint, reflection overhead, and complex lifecycle caching of Hibernate/Spring Data JPA in serverless environments.",
        whereUsed: "Used extensively in backend data access layers and Azure Functions to perform CRUD operations, joins, and transactional mutations against PostgreSQL and MSSQL databases.",
        howItWorks: "Translates fluent method chains (such as findOne, findAll, create, update, and transaction blocks) into parameterized SQL at runtime. It secures against SQL injection through prepared statements, handles database connection pooling efficiently, and maps SQL result sets to Java entity objects using Lombok accessors."
      }
    }
  };

  const InternshipStore = {
    getDefaults: function () {
      return JSON.parse(JSON.stringify(initialData));
    },

    getData: function () {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          // Return parsed with fallback to defaults if keys are missing
          return {
            internshipMeta: parsed.internshipMeta || initialData.internshipMeta,
            monthsData: parsed.monthsData || initialData.monthsData,
            weeksData: parsed.weeksData || initialData.weeksData,
            dependencyDetails: parsed.dependencyDetails || initialData.dependencyDetails
          };
        }
      } catch (e) {
        console.warn('Failed to load custom internship data, using defaults.', e);
      }
      return this.getDefaults();
    },

    saveData: function (data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('internship-data-changed', { detail: data }));
        return true;
      } catch (e) {
        console.error('Failed to save internship data', e);
        return false;
      }
    },

    getWeeks: function () {
      return this.getData().weeksData;
    },

    getRoadmapConfig: function () {
      const data = this.getData();
      return data.roadmapConfig || { maxVisibleWeek: 2, maxVisibleMonth: 1 };
    },

    updateRoadmapConfig: function (cfg) {
      const data = this.getData();
      data.roadmapConfig = { ...(data.roadmapConfig || { maxVisibleWeek: 2, maxVisibleMonth: 1 }), ...cfg };
      return this.saveData(data);
    },

    isWeekVisible: function (week, cfg) {
      if (!week) return false;
      if (week.hidden === true) return false;
      if (week.hidden === false) return true;
      const config = cfg || this.getRoadmapConfig();
      if (config.visibleWeeks && Array.isArray(config.visibleWeeks)) {
        return config.visibleWeeks.includes(week.week);
      }
      const max = config.maxVisibleWeek !== undefined ? config.maxVisibleWeek : 2;
      return week.week <= max;
    },

    isMonthVisible: function (month, cfg) {
      if (!month) return false;
      if (month.hidden === true) return false;
      if (month.hidden === false) return true;
      const config = cfg || this.getRoadmapConfig();
      if (config.visibleMonths && Array.isArray(config.visibleMonths)) {
        return config.visibleMonths.includes(month.month);
      }
      const max = config.maxVisibleMonth !== undefined ? config.maxVisibleMonth : 1;
      return month.month <= max;
    },

    getVisibleWeeks: function () {
      const weeks = this.getWeeks();
      const cfg = this.getRoadmapConfig();
      return weeks.filter(w => this.isWeekVisible(w, cfg));
    },

    getVisibleMonths: function () {
      const months = this.getMonths();
      const cfg = this.getRoadmapConfig();
      return months.filter(m => this.isMonthVisible(m, cfg));
    },

    getWeek: function (num) {
      const weeks = this.getWeeks();
      return weeks.find(w => w.week === parseInt(num, 10));
    },

    saveWeek: function (weekObj) {
      const data = this.getData();
      const num = parseInt(weekObj.week, 10);
      const existingIdx = data.weeksData.findIndex(w => w.week === num);

      // Derive badgeColor from status if not provided
      if (!weekObj.badgeColor) {
        weekObj.badgeColor = weekObj.status === 'Completed' ? 'success' : weekObj.status === 'In Progress' ? 'warning' : 'neutral';
      }

      if (existingIdx >= 0) {
        // Update existing
        data.weeksData[existingIdx] = { ...data.weeksData[existingIdx], ...weekObj };
      } else {
        // Add new week
        data.weeksData.push(weekObj);
        // Sort weeks numerically
        data.weeksData.sort((a, b) => a.week - b.week);
      }

      return this.saveData(data);
    },

    deleteWeek: function (num) {
      const data = this.getData();
      data.weeksData = data.weeksData.filter(w => w.week !== parseInt(num, 10));
      return this.saveData(data);
    },

    updateMeta: function (partialMeta) {
      const data = this.getData();
      data.internshipMeta = { ...data.internshipMeta, ...partialMeta };
      return this.saveData(data);
    },

    resetDefaults: function () {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('internship-data-changed', { detail: this.getDefaults() }));
      return true;
    },

    generateJSCode: function () {
      const data = this.getData();
      const cfg = data.roadmapConfig || { maxVisibleWeek: 2, maxVisibleMonth: 1 };
      return `/**\n * SDD Digital Banking Internship 2026 - Configuration & Data Source\n */\n\n` +
             `export const roadmapConfig = ${JSON.stringify(cfg, null, 2)};\n\n` +
             `export const internshipMeta = ${JSON.stringify(data.internshipMeta, null, 2)};\n\n` +
             `export const monthsData = ${JSON.stringify(data.monthsData, null, 2)};\n\n` +
             `export const weeksData = ${JSON.stringify(data.weeksData, null, 2)};\n\n` +
             `export const dependencyDetails = ${JSON.stringify(data.dependencyDetails, null, 2)};\n\n` +
             `export function isWeekVisible(week, config = roadmapConfig) {\n` +
             `  if (!week) return false;\n` +
             `  if (week.hidden === true) return false;\n` +
             `  if (week.hidden === false) return true;\n` +
             `  if (config && config.visibleWeeks && Array.isArray(config.visibleWeeks)) return config.visibleWeeks.includes(week.week);\n` +
             `  return week.week <= (config ? (config.maxVisibleWeek ?? 2) : 2);\n` +
             `}\n\n` +
             `export function isMonthVisible(month, config = roadmapConfig) {\n` +
             `  if (!month) return false;\n` +
             `  if (month.hidden === true) return false;\n` +
             `  if (month.hidden === false) return true;\n` +
             `  if (config && config.visibleMonths && Array.isArray(config.visibleMonths)) return config.visibleMonths.includes(month.month);\n` +
             `  return month.month <= (config ? (config.maxVisibleMonth ?? 1) : 1);\n` +
             `}\n\n` +
             `export const visibleWeeksData = weeksData.filter(w => isWeekVisible(w, roadmapConfig));\n` +
             `export const visibleMonthsData = monthsData.filter(m => isMonthVisible(m, roadmapConfig));\n\n` +
             `export const defaultInternshipData = {\n  roadmapConfig,\n  internshipMeta,\n  monthsData,\n  weeksData,\n  dependencyDetails\n};\n`;
    },

    downloadJSFile: function () {
      const code = this.generateJSCode();
      const blob = new Blob([code], { type: 'application/javascript;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'internshipData.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    downloadJSONBackup: function () {
      const json = JSON.stringify(this.getData(), null, 2);
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'internship_data_backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    importJSON: function (jsonStr) {
      try {
        const parsed = JSON.parse(jsonStr);
        if (!parsed.weeksData || !Array.isArray(parsed.weeksData)) {
          throw new Error('Invalid data format: missing weeksData array');
        }
        return this.saveData(parsed);
      } catch (e) {
        alert('Failed to import JSON: ' + e.message);
        return false;
      }
    }
  };

  // Expose to window
  window.InternshipStore = InternshipStore;
})();
