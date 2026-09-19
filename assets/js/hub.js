/**
 * hub.js
 * Powers the Legal Docs Hub (index.html).
 *
 * 1. Fetches apps/registry.json → list of app slugs
 * 2. For each slug, fetches apps/{slug}/meta.json
 * 3. Builds app cards dynamically into #app-grid
 * 4. Updates the stats counters
 * 5. Wires up the live search filter
 */

const PLATFORM_STYLES = {
  discord:  { label: 'Discord',       color: '#5865F2', bg: 'rgba(88,101,242,0.12)'  },
  facebook: { label: 'Facebook',      color: '#1877F2', bg: 'rgba(24,119,242,0.12)'  },
  telegram: { label: 'Telegram',      color: '#26A5E4', bg: 'rgba(38,165,228,0.12)'  },
  slack:    { label: 'Slack',         color: '#4A154B', bg: 'rgba(74,21,75,0.15)'     },
  google:   { label: 'Google',        color: '#EA4335', bg: 'rgba(234,67,53,0.12)'    },
  twitter:  { label: 'Twitter / X',   color: '#000000', bg: 'rgba(0,0,0,0.15)'        },
  web:      { label: 'Web',           color: '#10B981', bg: 'rgba(16,185,129,0.12)'   },
  mobile:   { label: 'Mobile',        color: '#F59E0B', bg: 'rgba(245,158,11,0.12)'   },
};

function platformBadge(platformId, platformLabel) {
  const style = PLATFORM_STYLES[platformId] || { color: '#8b949e', bg: 'rgba(139,148,158,0.12)' };
  const label = platformLabel || style.label || platformId;
  return `<span class="platform-badge" style="color:${style.color};background:${style.bg};border-color:${style.color}40">${label}</span>`;
}

function docLinks(slug, platformId) {
  const base = `apps/${slug}/${platformId}`;
  return `
    <a class="doc-link" href="${base}/terms-of-service.html">📜 Terms of Service</a>
    <a class="doc-link" href="${base}/privacy-policy.html">🔒 Privacy Policy</a>`;
}

function buildCard(meta) {
  const platforms = meta.platforms || [];
  const badges = platforms.map(p => platformBadge(p.id, p.label)).join(' ');
  const links  = platforms.map(p =>
    `<div class="platform-doc-group">
      ${platformBadge(p.id, p.label)}
      <div class="doc-links">${docLinks(meta.slug, p.id)}</div>
    </div>`
  ).join('');

  return `
    <div class="app-card" data-name="${meta.name}">
      <div class="app-card-icon">${meta.icon || '📄'}</div>
      <h2><a href="apps/${meta.slug}/index.html">${meta.name}</a></h2>
      <p>${meta.description || ''}</p>
      <div class="platform-badges">${badges}</div>
      <div class="platform-links">${links}</div>
    </div>`;
}

async function loadHub() {
  const grid       = document.getElementById('app-grid');
  const appCount   = document.getElementById('app-count');
  const docCount   = document.getElementById('doc-count');
  const searchInput = document.getElementById('search-input');

  if (!grid) return;

  // 1. Fetch registry
  let slugs = [];
  try {
    const res = await fetch('apps/registry.json');
    slugs = await res.json();
  } catch (e) {
    grid.innerHTML = '<p style="color:var(--clr-text-muted);grid-column:1/-1">Could not load app registry.</p>';
    return;
  }

  // 2. Fetch all meta.jsons in parallel
  const metas = await Promise.all(
    slugs.map(slug =>
      fetch(`apps/${slug}/meta.json`)
        .then(r => r.json())
        .catch(() => null)
    )
  );

  const valid = metas.filter(Boolean);

  // 3. Render cards
  grid.innerHTML = valid.map(buildCard).join('');

  // 4. Stats
  const totalDocs = valid.reduce((sum, m) => sum + (m.platforms || []).length * 2, 0);
  if (appCount) appCount.textContent = valid.length;
  if (docCount)  docCount.textContent = totalDocs;

  // 5. Live search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      let visible = 0;
      grid.querySelectorAll('.app-card').forEach(card => {
        const match = !q || card.dataset.name.toLowerCase().includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (appCount) appCount.textContent = visible;
    });
  }
}

loadHub();
