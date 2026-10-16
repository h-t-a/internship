/**
 * SDD Digital Banking Internship 2026 - Configuration & Data Source
 * 
 * ROADMAP CONFIG:
 * Control which weeks and months are open/visible to interns.
 * Change maxVisibleWeek and maxVisibleMonth to reveal later curriculum as the internship progresses.
 */
export const roadmapConfig = {
  maxVisibleWeek: 2,   // Only Weeks 1 and 2 are currently visible; Weeks 3–12 are hidden
  maxVisibleMonth: 1,  // Only Month 1 is currently visible; Months 2 and 3 are hidden
  // Optional explicit overrides:
  // visibleWeeks: [1, 2],
  // visibleMonths: [1],
};

export const internshipMeta = {
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
};

export const monthsData = [
  {
    month: 1,
    title: "Month 1 - Foundation & Environment Setup",
    theme: "Setup, Architecture & Transaction Flow Tracing",
    weeks: [1, 2, 3, 4],
    deliverable: "Running local environment (iBanking & Admin Console), Architecture documentation, End-to-end module trace report"
  },
  {
    month: 2,
    title: "Month 2 - Core Development Skills",
    theme: "Serverless APIs, Ledger Concepts, Bug Fixing & Feature Enhancements",
    weeks: [5, 6, 7, 8],
    deliverable: "2–3 bug fix MRs, 1 feature enhancement MR across frontend and backend"
  },
  {
    month: 3,
    title: "Month 3 - Feature Development & Code Quality",
    theme: "Banking Security, Mini-Features, Unit Testing & Final Presentation",
    weeks: [9, 10, 11, 12],
    deliverable: "1 full-stack mini feature MR, Unit test coverage report & test cases, Final presentation & comprehensive internship report"
  }
];

export const weeksData = [
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
    summary: "Deep-dive into Angular reactive forms, custom financial validators (account number format, transfer limits), route guards (AuthGuard, RoleGuard), HTTP interceptors (token injection, error modal), and RxJS streams.",
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
    summary: "Trace a complete financial transaction flow across both portals: Customer initiates Fund Transfer / Bill Payment on iBanking_portal (UI Form -> Validation -> Service -> REST API -> DB transaction) and staff views audit log in adminconsole.",
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
    summary: "Add a full-stack feature enhancement to an existing module (e.g., 'Export Transaction Statement as PDF/CSV' with date range on iBanking_portal OR 'Customer Status Lock/Unlock with Reason & Audit Log' on adminconsole).",
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
];

export const dependencyDetails = {
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
};

export function isWeekVisible(week, config = roadmapConfig) {
  if (!week) return false;
  if (week.hidden === true) return false;
  if (week.hidden === false) return true;
  if (config && config.visibleWeeks && Array.isArray(config.visibleWeeks)) {
    return config.visibleWeeks.includes(week.week);
  }
  const max = config ? (config.maxVisibleWeek ?? 2) : 2;
  return week.week <= max;
}

export function isMonthVisible(month, config = roadmapConfig) {
  if (!month) return false;
  if (month.hidden === true) return false;
  if (month.hidden === false) return true;
  if (config && config.visibleMonths && Array.isArray(config.visibleMonths)) {
    return config.visibleMonths.includes(month.month);
  }
  const max = config ? (config.maxVisibleMonth ?? 1) : 1;
  return month.month <= max;
}

export const visibleWeeksData = weeksData.filter(w => isWeekVisible(w, roadmapConfig));
export const visibleMonthsData = monthsData.filter(m => isMonthVisible(m, roadmapConfig));

export const programArtifacts = {
  journey: {
    title: "MFS 3-Months Learning Journey (2026)",
    department: "SDD (Software Development Department)",
    stack: "Angular / Java / MSSQL Server / PostgreSQL",
    corePortals: "iBanking (Customer Internet Banking) & Adminconsole (Back-Office Admin Console)",
    pdf: "/docs/MFS_internship_plan.pdf",
    docx: "/docs/MFS_internship_plan.docx",
    pdfSize: "141 KB",
    docxSize: "25 KB"
  },
  milestones: {
    week1: {
      reportPdf: "/docs/week_1/Week-1_Report.pdf",
      reportPdfSize: "897 KB",
      gitGuidelinePptx: "/docs/week_1/team-git-guideline.pptx",
      gitGuidelineSize: "78 KB"
    },
    week2: {
      planDoc: "/milestones/week-2",
      planRaw: "milestones/week_2/plan.md",
      pillar2Blueprint: "/milestones/week-2/pillar-2",
      studentAuthDemo: "/milestones/week-2/student-auth-demo",
      studentAuthDemoRepo: "https://github.com/h-t-a/MFS_Intern.git",
      studentAuthDemoBlueprintMd: "/milestones/week_2/student_auth_demo_blueprint.md"
    }
  },
  weeklyReports: {
    week1: [
      {
        intern: "Ma Yamin Aye",
        email: "y.a@mit.com.mm",
        docx: "/docs/weekly_report/week_1/Ma_Yamin_Aye_Week-1_Report.docx",
        docxSize: "15 KB",
        period: "Oct 5, 2026 – Oct 9, 2026"
      },
      {
        intern: "Mg Phyo Min Htet",
        email: "pmh@mit.com.mm",
        docx: "/docs/weekly_report/week_1/Mg_Phyo_Min_Htet_Week-1_Report.docx",
        docxSize: "21 KB",
        period: "Oct 5, 2026 – Oct 9, 2026"
      }
    ]
  },
  assets: {
    dbDumpZip: "/assets/adminconsole.dump.zip",
    dbDumpZipSize: "66 KB",
    dbDump: "/assets/adminconsole.dump",
    dbDumpSize: "214 KB",
    schema: "adminchannel",
    tablesCount: 30
  }
};

export const individualLogsWeek1 = {
  maYaminAye: {
    intern: "Ma Yamin Aye",
    email: "y.a@mit.com.mm",
    file: "/docs/weekly_report/week_1/Ma_Yamin_Aye_Week-1_Report.docx",
    days: [
      { day: "Day 1 (Monday)", title: "Internship Orientation", details: "At 2:00 PM, listened to 'Internship Orientation' session led by Ko Hlwan Kyaw Phyo." },
      { day: "Day 2 (Tuesday)", title: "Mobile Dev Foundation", details: "Downloaded Android Studio and Flutter. Learned about how Dart programming language and reactive system work." },
      { day: "Day 3 (Wednesday)", title: "Dart Language Fundamentals", details: "Learned Dart Programming Language Basic Foundation and OOP Concepts." },
      { day: "Day 4 (Thursday)", title: "Ubuntu Linux & Toolchain Setup", details: "Attended Ubuntu Linux Server Basic Training. Learned Dart fundamentals. Installed development tools (Node.js, Angular CLI, JDK 17, VS Code, Git, SSMS, Postgres, and Postman)." },
      { day: "Day 5 (Friday)", title: "PuTTY & Repo Cloning", details: "Attended Ubuntu Linux Server Basic Training (PuTTY) & learned to run remote command lines. Created database in PgAdmin4 and restored it. Cloned iBanking_portal and adminconsole repositories along with backend services. Learned team Git workflow." }
    ]
  },
  mgPhyoMinHtet: {
    intern: "Mg Phyo Min Htet",
    email: "pmh@mit.com.mm",
    file: "/docs/weekly_report/week_1/Mg_Phyo_Min_Htet_Week-1_Report.docx",
    days: [
      { day: "Day 1 (Monday)", title: "Internship Orientation", details: "Listened to 'Internship Orientation' session led by Ko Hlwan Kyaw Phyo." },
      { day: "Day 2 (Tuesday)", title: "Mobile Toolchain", details: "Downloaded Android Studio & Flutter and learned about how Dart programming language and system works." },
      { day: "Day 3 (Wednesday)", title: "Dart Language & OOP Concepts", details: "Learned Dart Programming Language basic fundamentals & OOP concepts." },
      { day: "Day 4 (Thursday)", title: "Ubuntu VirtualBox & Dev Tools", details: "Attended Ubuntu Linux Server Basic Training (Oracle VirtualBox). Learned Dart programming syntax. Installed Development tools (Node.js, Angular CLI, JDK 17, VS Code, Git, SSMS, Postgres & Postman)." },
      { day: "Day 5 (Friday)", title: "PuTTY & Database Restore", details: "Attended Ubuntu Linux Server Basic Training (PuTTY) & learned how to run its command lines. Learned about Git & Git Controls. Created database in PgAdmin4 and restored schema. Cloned iBanking_portal & adminconsole repositories." }
    ]
  }
};

export const gitGuidelineSummary = {
  title: "SDD Internal Engineering Git Guideline",
  source: "/docs/week_1/team-git-guideline.pptx",
  roles: [
    { role: "Developer / Contributor", duties: ["Create one branch per ticket or task", "Commit focused changes with clear messages referencing ticket ID", "Push branch and open a Pull/Merge Request (MR)", "Respond to review comments promptly", "Never push directly to protected branches (main, staging, prod)"] },
    { role: "Maintainer / Reviewer", duties: ["Review requirements, architecture design, code quality, and test coverage", "Verify CI/CD pipeline and automated build status before merging", "Provide binding approval for Pull/Merge Requests", "Manage release, UAT, prod, and hotfix branches", "Own branch protections, hooks, and CI/CD controls"] }
  ],
  branchConventions: [
    { prefix: "feature/<ticket-id>-<description>", example: "feature/PROJ-123-oauth2-login", purpose: "New feature development" },
    { prefix: "bugfix/<ticket-id>-<description>", example: "bugfix/PROJ-456-null-pointer-fix", purpose: "Fixing a tracked bug or issue" },
    { prefix: "hotfix/<ticket-id>-<description>", example: "hotfix/PROJ-789-critical-payment-patch", purpose: "Emergency production fix" }
  ],
  developerFlow: [
    { step: "1. Check Status", cmd: "git status" },
    { step: "2. Update Main", cmd: "git checkout main && git pull origin main" },
    { step: "3. Branch Out", cmd: "git checkout -b feature/PROJ-123-description" },
    { step: "4. Commit Focused Work", cmd: 'git add . && git commit -m "PROJ-123 add feature description"' },
    { step: "5. Push & Open PR/MR", cmd: "git push -u origin feature/PROJ-123-description" }
  ]
};

export const defaultInternshipData = {
  roadmapConfig,
  internshipMeta,
  monthsData,
  weeksData,
  dependencyDetails,
  programArtifacts,
  individualLogsWeek1,
  gitGuidelineSummary
};

export function generateInternshipDataJS(data) {
  const cfg = data.roadmapConfig || roadmapConfig;
  return `/**\n * SDD Digital Banking Internship 2026 - Configuration & Data Source\n */\n\n` +
         `export const roadmapConfig = ${JSON.stringify(cfg, null, 2)};\n\n` +
         `export const internshipMeta = ${JSON.stringify(data.internshipMeta || internshipMeta, null, 2)};\n\n` +
         `export const monthsData = ${JSON.stringify(data.monthsData || monthsData, null, 2)};\n\n` +
         `export const weeksData = ${JSON.stringify(data.weeksData || weeksData, null, 2)};\n\n` +
         `export const dependencyDetails = ${JSON.stringify(data.dependencyDetails || dependencyDetails, null, 2)};\n\n` +
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
}


