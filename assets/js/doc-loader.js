/**
 * doc-loader.js
 * Shared by every Terms of Service and Privacy Policy page.
 *
 * Fetches ../meta.json (one level up from the platform folder),
 * determines the current platform from the URL path, and populates
 * every [data-meta="key"] element in the document.
 *
 * Supported data-meta keys:
 *   name              → app name
 *   description       → app description
 *   contactEmail      → contact email
 *   website           → website URL
 *   platform.id       → e.g. "discord"
 *   platform.label    → e.g. "Discord"
 *   platform.icon     → e.g. "🤖"
 *   platform.docsLastUpdated → e.g. "2025-01-01"
 *
 * Supported data-meta-href="key":
 *   Sets the element's href attribute to the resolved value.
 *   e.g. data-meta-href="website"  →  href="https://..."
 *        data-meta-href="platform.inviteUrl"
 *
 * Supported data-meta-mailto:
 *   Sets both href="mailto:{contactEmail}" and textContent to the email.
 */
(async function () {
  // Determine which platform this page belongs to from the URL path.
  // URL shape: .../apps/{slug}/{platformId}/{doc}.html
  const parts = window.location.pathname.replace(/\/$/, '').split('/');
  const platformId = parts[parts.length - 2]; // e.g. "discord"
  const docFile   = parts[parts.length - 1];  // e.g. "terms-of-service.html"

  let meta, platform;

  try {
    const res = await fetch('../meta.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    meta = await res.json();
    platform = (meta.platforms || []).find(p => p.id === platformId) || {};
  } catch (err) {
    console.error('[doc-loader] Failed to load meta.json:', err);
    return;
  }

  /**
   * Resolve a dot-notation key against meta + current platform.
   * e.g. "platform.label" → platform.label, "name" → meta.name
   */
  function resolve(key) {
    if (key.startsWith('platform.')) {
      const sub = key.slice('platform.'.length);
      return platform[sub] ?? '';
    }
    return meta[key] ?? '';
  }

  // ── Fill [data-meta] text content ────────────────────────────────────────
  document.querySelectorAll('[data-meta]').forEach(el => {
    const val = resolve(el.dataset.meta);
    el.textContent = val;
  });

  // ── Fill [data-meta-href] href attributes ─────────────────────────────────
  document.querySelectorAll('[data-meta-href]').forEach(el => {
    el.href = resolve(el.dataset.metaHref);
  });

  // ── Fill [data-meta-mailto] — email links ─────────────────────────────────
  document.querySelectorAll('[data-meta-mailto]').forEach(el => {
    const email = meta.contactEmail || '';
    el.href = `mailto:${email}`;
    el.textContent = email;
  });

  // ── Page <title> ──────────────────────────────────────────────────────────
  const docLabel = document.querySelector('[data-doc-label]')?.textContent
    || (docFile.includes('terms') ? 'Terms of Service' : 'Privacy Policy');
  document.title = `${docLabel} — ${meta.name}`;

  // ── <meta name="description"> ─────────────────────────────────────────────
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) {
    descEl.content =
      `${docLabel} for ${meta.name} on ${platform.label || platformId}. ${meta.description || ''}`.trim();
  }

  // ── Build "Other platforms" sidebar links ─────────────────────────────────
  const otherPlatformsNav = document.getElementById('sidebar-other-platforms');
  if (otherPlatformsNav) {
    const others = (meta.platforms || []).filter(p => p.id !== platformId);
    if (others.length === 0) {
      otherPlatformsNav.closest('.sidebar-nav-section')?.remove();
    } else {
      others.forEach(p => {
        const a = document.createElement('a');
        a.href = `../${p.id}/${docFile}`;
        a.textContent = `${p.icon || ''} ${p.label}`.trim();
        otherPlatformsNav.appendChild(a);
      });
    }
  }
})();
