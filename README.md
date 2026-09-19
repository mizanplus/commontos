# commontos — Legal Docs Hub

A single repository for **Terms of Service**, **Privacy Policies**, and other legal documents across all applications, published as a clean static site via **GitHub Pages**.

**Live site:** [mizanplus.github.io/commontos](https://mizanplus.github.io/commontos/)

---

## 📂 Repository Structure

```
commontos/
├── index.html                        # Hub — lists all apps & their documents
├── _config.yml                       # GitHub Pages configuration
├── assets/
│   └── css/legal.css                 # Shared stylesheet for all pages
├── apps/
│   ├── _template/                    # ← Copy this to add a new app
│   │   ├── index.html
│   │   ├── terms-of-service.html
│   │   ├── privacy-policy.html
│   │   └── meta.json
│   ├── discord-bot/                  # Discord Bot documents
│   └── facebook-app/                 # Facebook App documents
└── .github/
    └── workflows/pages.yml           # Auto-deploy to GitHub Pages
```

---

## ➕ Adding a New Application

**Step 1 — Copy the template:**
```
apps/_template/  →  apps/your-app-name/
```

**Step 2 — Edit `meta.json`:**
Update `name`, `description`, `icon`, `platform`, `contactEmail`, `website`, and the `lastUpdated` dates.

**Step 3 — Fill in the document HTML:**
Replace all placeholder text in `terms-of-service.html` and `privacy-policy.html`.
Search for `Application Name`, `YYYY-MM-DD`, `example.com`, and `legal@example.com`.

**Step 4 — Add a card to the hub:**
Open `index.html` and copy an existing `.app-card` block. Update the name, icon, description, and `href` links to point to your new folder.

**Step 5 — Commit and push to `main`:**
GitHub Actions will deploy automatically. Your docs are live within ~1 minute at:
```
https://mizanplus.github.io/commontos/apps/your-app-name/terms-of-service.html
```

---

## 🌐 Enabling GitHub Pages

1. Go to your repository **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push any commit to `main` — the workflow handles the rest

---

## 📄 Published Documents

| Application | Terms of Service | Privacy Policy |
|-------------|-----------------|----------------|
| [Discord Bot](https://mizanplus.github.io/commontos/apps/discord-bot/) | [ToS](https://mizanplus.github.io/commontos/apps/discord-bot/terms-of-service.html) | [PP](https://mizanplus.github.io/commontos/apps/discord-bot/privacy-policy.html) |
| [Facebook App](https://mizanplus.github.io/commontos/apps/facebook-app/) | [ToS](https://mizanplus.github.io/commontos/apps/facebook-app/terms-of-service.html) | [PP](https://mizanplus.github.io/commontos/apps/facebook-app/privacy-policy.html) |

---

## 🔧 Customization

**Update contact info:**  
Replace `legal@example.com` and `https://example.com` in each app's HTML files.

**Update effective dates:**  
Edit the `lastUpdated` fields in each app's `meta.json` and the "Last updated" text in the HTML sidebar footer and `doc-meta` section.

**Add new document types** (e.g., Cookie Policy):  
1. Create a new HTML file in the app's folder (copy `privacy-policy.html` as a starting point).
2. Add a `<a class="doc-card">` entry in that app's `index.html`.
3. Add a sidebar nav link in the new document referencing the other docs.

---

## ⚖️ Legal Disclaimer

The documents in this repository are provided as templates and starting points. They are **not legal advice**. You should consult a qualified attorney to ensure your legal documents are appropriate for your specific application, jurisdiction, and use case.

---

© mizanplus · [GitHub](https://github.com/mizanplus/commontos)
