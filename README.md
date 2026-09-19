# commontos — Legal Docs Framework

A data-driven monorepo for **Terms of Service**, **Privacy Policies**, and other legal documents across multiple applications and platforms, published via **GitHub Pages**.

**Live site:** [mizanplus.github.io/commontos](https://mizanplus.github.io/commontos/)

---

## ⚡ How It Works

Every HTML page is an **identical template** that loads `meta.json` at runtime and fills in the app name, platform, dates, and contact info.

**To rename an app:** change one value in `meta.json`. No HTML changes needed.

```
meta.json  →  All pages for that app reflect the new name instantly.
```

---

## 📂 Structure

```
commontos/
├── index.html                         # Hub — built dynamically from registry.json
├── assets/
│   ├── css/legal.css                  # Shared stylesheet
│   └── js/
│       ├── hub.js                     # Hub: loads registry → renders cards
│       └── doc-loader.js              # Docs: loads meta.json → populates page
│
└── apps/
    ├── registry.json                  # ← Add your app slug here to register it
    │
    ├── _template/                     # ← Copy this folder to add a new app
    │   ├── meta.json                  # ← THE ONLY FILE YOU EDIT PER APP
    │   ├── index.html                 # App landing (identical for all apps)
    │   ├── discord/                   # Platform sub-folder (copy as needed)
    │   │   ├── terms-of-service.html  # Identical for all Discord apps
    │   │   └── privacy-policy.html
    │   └── facebook/
    │       ├── terms-of-service.html  # Identical for all Facebook apps
    │       └── privacy-policy.html
    │
    ├── agentsur/   meta.json + index.html + discord/
    ├── aiagent/    meta.json + index.html + discord/
    ├── aimi/       meta.json + index.html + discord/
    ├── newsgator/  meta.json + index.html + facebook/
    └── newsinformer/ meta.json + index.html + facebook/
```

---

## ➕ Adding a New App

**Step 1 — Copy the template:**
```powershell
Copy-Item apps/_template apps/your-app-slug -Recurse
```
Delete platform sub-folders you don't need (e.g. remove `facebook/` for a Discord-only bot).

**Step 2 — Fill in `meta.json` (the ONLY file to edit):**
```json
{
  "name": "YourAppName",
  "slug": "your-app-slug",
  "description": "What this app does.",
  "icon": "🤖",
  "contactEmail": "legal@yourdomain.com",
  "website": "https://yourdomain.com",
  "platforms": [
    {
      "id": "discord",
      "label": "Discord",
      "icon": "🤖",
      "inviteUrl": "https://discord.com/oauth2/authorize?client_id=...",
      "docsLastUpdated": "2025-01-01"
    }
  ]
}
```

**Step 3 — Register in `apps/registry.json`:**
```json
["agentsur", "aiagent", "aimi", "newsgator", "newsinformer", "your-app-slug"]
```

**Step 4 — Push to main.** GitHub Actions deploys in ~1 minute.

**Total files edited: 2** (`meta.json` + `registry.json`)

---

## 🔀 Adding a Platform to an Existing App

```powershell
# Example: add Telegram to AgentSur
Copy-Item apps/_template/discord apps/agentsur/telegram -Recurse
```
Then edit `apps/agentsur/meta.json` — add an entry to the `platforms` array:
```json
{ "id": "telegram", "label": "Telegram", "icon": "✈️", "docsLastUpdated": "2025-01-01" }
```

The sidebar on all existing AgentSur doc pages will automatically show a link to the new Telegram docs.

---

## ✏️ Renaming an App

```diff
// apps/agentsur/meta.json
- "name": "AgentSur",
+ "name": "AgentSurAI",
```

Push. Done. Every page, the hub, and the app index all reflect the new name.

---

## 📄 Published Documents

| App | Platform | Terms of Service | Privacy Policy |
|-----|----------|-----------------|----------------|
| AgentSur | Discord | [ToS](https://mizanplus.github.io/commontos/apps/agentsur/discord/terms-of-service.html) | [PP](https://mizanplus.github.io/commontos/apps/agentsur/discord/privacy-policy.html) |
| AIAgent | Discord | [ToS](https://mizanplus.github.io/commontos/apps/aiagent/discord/terms-of-service.html) | [PP](https://mizanplus.github.io/commontos/apps/aiagent/discord/privacy-policy.html) |
| AIMi | Discord | [ToS](https://mizanplus.github.io/commontos/apps/aimi/discord/terms-of-service.html) | [PP](https://mizanplus.github.io/commontos/apps/aimi/discord/privacy-policy.html) |
| Newsgator | Facebook | [ToS](https://mizanplus.github.io/commontos/apps/newsgator/facebook/terms-of-service.html) | [PP](https://mizanplus.github.io/commontos/apps/newsgator/facebook/privacy-policy.html) |
| NewsInformer | Facebook | [ToS](https://mizanplus.github.io/commontos/apps/newsinformer/facebook/terms-of-service.html) | [PP](https://mizanplus.github.io/commontos/apps/newsinformer/facebook/privacy-policy.html) |

---

## 🌐 Enabling GitHub Pages

1. Go to repo **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push any commit to `main` — the workflow handles the rest

---

## Supported Platforms (folder names)

| Platform | Folder | Template available |
|----------|--------|-------------------|
| Discord | `discord/` | ✅ |
| Facebook / Meta | `facebook/` | ✅ |
| Telegram | `telegram/` | Copy & adapt from `discord/` |
| Slack | `slack/` | Copy & adapt |
| Google / YouTube | `google/` | Copy & adapt |
| Twitter / X | `twitter/` | Copy & adapt |
| Web / SaaS | `web/` | Copy & adapt |
| Mobile App | `mobile/` | Copy & adapt |

---

## ⚖️ Legal Disclaimer

Documents in this repository are provided as a framework and starting point. They are **not legal advice**. Consult a qualified attorney to ensure your documents are appropriate for your specific application, jurisdiction, and use case.

---

© mizanplus · [GitHub](https://github.com/mizanplus/commontos)
