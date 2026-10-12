# SDD Digital Banking Internship Portal (2026)

> Production-grade Astro HTML Project Planning, Monitoring & Weekly Reporting Portal for the Software Development Department (SDD) Digital Banking Internship Program.

This portal serves as an executive tracking tool, milestone checklist, weekly progress reporter, and architecture reference center for both interns (**Ma Yamin Aye** & **Mg Phyo Min Htet**) and engineering managers.

---

## 🚀 Features

- **Executive Progress Dashboard:** Real-time completion metrics, active sprint focus (Week 2), and interactive checklist with `localStorage` persistence.
- **12-Week Milestone Roadmap:** Complete 3-month curriculum across Month 1 (Foundation), Month 2 (Core Development), and Month 3 (Features & Code Quality) with real-time topic searching and month filtering.
- **Week 2 Deep Dive:** Detailed breakdown of the **7 Architecture Pillars** for Admin Console & iBanking plus custom shared libraries (`httputils` and `sequelize-java`).
- **Interactive Weekly Report Builder:** Form to log daily engineering activities (Mon–Fri), key learnings, blockers, and MR links, complete with instant side-by-side manager preview, autosave, and copy-as-markdown.
- **Print / PDF Ready:** Custom print stylesheets (`@media print`) format reports cleanly as executive A4 PDFs for manager sign-off.
- **Manager Evaluation Portal:** Official 5-point grading scorecard (Attendance 10%, Weekly Report 20%, Code Quality 30%, Problem Solving 20%, Final Presentation 20%) with dynamic grade calculation.
- **Dual-Portal Architecture & Dependencies Guide:** Interactive diagram comparing consumer iBanking SPA with back-office Admin Console and detailing internal dependencies.

---

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation / Zero-JS Runtime by default)
- **Styling:** Custom Vanilla CSS Design System with Glassmorphism and HSL Palettes
- **State:** Browser `localStorage` for offline persistence of tasks, draft reports, and manager notes
- **Target Hosting:** **Azure Storage Account Static Website** (`$web` container)

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production static bundle (dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deploying to Azure Storage Account (Static Website)

This project builds pure static HTML/CSS/JS into the `dist/` directory, making it natively compatible with Azure Storage Account static website hosting:

1. **Enable Static Website in Azure Storage Account:**
   - In Azure Portal, open your Storage Account &rarr; **Static website**.
   - Set **Enabled**.
   - **Index document name:** `index.html`
   - **Error document path:** `404.html`
   - Save and note down the **Primary endpoint URL**.

2. **Build and Upload:**
   ```bash
   # 1. Build the Astro static site
   npm run build

   # 2. Upload using Azure CLI
   az storage blob upload-batch \
     --account-name <YOUR_STORAGE_ACCOUNT_NAME> \
     --source dist \
     --destination '$web' \
     --overwrite
   ```
   *(Alternatively, drag and drop the contents of the `dist/` folder into the `$web` blob container via Azure Storage Explorer).*
