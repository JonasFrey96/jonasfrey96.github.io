---
layout: default
permalink: /teaching/
title: Teaching & Honors
description: Teaching Experience.
nav: true
nav_order: 3
pretty_table: true
---

<style>
  .teaching-page {
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }
  .teaching-page h2 {
    font-weight: 600;
    margin-top: 2.2em;
    margin-bottom: 0.8em;
    padding-bottom: 0.35em;
    border-bottom: 2px solid #eaeaea;
    letter-spacing: 0.01em;
  }
  .teaching-page hr {
    display: none; /* hide markdown hr separators since headings now carry the visual break */
  }

  /* ---- Lecture / video embed ---- */
  .lecture-card {
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(20, 40, 90, 0.08);
    border: 1px solid #eee;
    margin: 1.2em auto 0.4em auto;
    width: 100%;
  }
  .lecture-video {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    background: #000;
  }
  .lecture-video iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .lecture-caption {
    padding: 0.85em 1em;
    text-align: center;
    color: #555;
    font-size: 0.95em;
    font-style: italic;
    background: #fafbfc;
    border-top: 1px solid #f0f0f0;
  }
  .lecture-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4em;
    justify-content: center;
    padding: 0.7em 0.8em 0.2em 0.8em;
    background: #fafbfc;
    border-bottom: 1px solid #f0f0f0;
  }
  .lecture-tab {
    background: #f2f2f4;
    border: 1px solid #e3e3e6;
    color: #555;
    border-radius: 999px;
    padding: 0.3em 0.9em;
    font-size: 0.88em;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }
  .lecture-tab:hover {
    background: #e8e8ec;
    color: #1a1a1a;
  }
  .lecture-tab.is-active {
    background: #d9d9de;
    color: #1a1a1a;
    border-color: #c9c9ce;
  }
  .lecture-watch-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.9em;
    text-align: center;
    padding: 1.2em;
    background-color: #000;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    pointer-events: auto;
  }
  .lecture-watch-overlay::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.7));
  }
  .lecture-watch-overlay > * {
    position: relative;
    z-index: 1;
  }
  .lecture-watch-overlay[hidden] { display: none; }
  .lecture-watch-note {
    font-size: 0.95em;
    line-height: 1.5;
    max-width: 36em;
    color: #f3f3f3;
  }
  .lecture-watch-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    background: #ff0033;
    color: #fff !important;
    border-radius: 999px;
    padding: 0.55em 1.2em;
    font-weight: 700;
    font-size: 0.95em;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(0,0,0,0.35);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .lecture-watch-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.45);
  }

  /* ---- Honors cards ---- */
  .honors-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.9em;
    margin: 1em 0 0 0;
    padding: 0;
    list-style: none;
  }
  .honor-card {
    background: #fff;
    border: 1px solid #eee;
    border-left: 4px solid var(--global-theme-color);
    border-radius: 10px;
    padding: 0.9em 1.1em;
    box-shadow: 0 2px 10px rgba(20, 40, 90, 0.04);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .honor-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(20, 40, 90, 0.08);
  }
  .honor-card .honor-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.4em;
  }
  .honor-badge {
    background: #fff7e0;
    color: #a06800;
    border: 1px solid #f1d98a;
    padding: 0.15em 0.6em;
    border-radius: 999px;
    font-size: 0.78em;
    font-weight: 600;
    letter-spacing: 0.01em;
  }
  .honor-venue {
    color: var(--global-theme-color);
    font-weight: 600;
    font-size: 0.92em;
  }
  .honor-title {
    font-weight: 600;
    font-size: 1.02em;
    line-height: 1.35;
    margin: 0.15em 0 0.3em 0;
  }
  .honor-title a {
    color: #1a1a1a;
    text-decoration: none;
    border-bottom: 1px dashed #cdd6e4;
  }
  .honor-title a:hover {
    color: var(--global-theme-color);
    border-bottom-color: var(--global-theme-color);
  }
  .honor-authors {
    color: #555;
    font-size: 0.9em;
    line-height: 1.5;
  }
  .honor-authors strong { color: #1a1a1a; }

  /* ---- Student publications venue grid ---- */
  .pubs-intro {
    color: #444;
    line-height: 1.6;
    margin-bottom: 0.6em;
  }
  .pubs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.7em;
    margin: 1em 0;
  }
  .pub-chip {
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    padding: 0.85em 0.5em;
    text-align: center;
    box-shadow: 0 2px 8px rgba(20, 40, 90, 0.04);
  }
  .pub-chip .pub-venue {
    display: block;
    font-size: 0.82em;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.25em;
  }
  .pub-chip .pub-count {
    font-size: 1.6em;
    font-weight: 700;
    color: var(--global-theme-color);
    line-height: 1;
  }

  /* ---- Dark mode for student publications ---- */
  html[data-theme="dark"] .pubs-intro {
    color: var(--global-text-color);
  }
  html[data-theme="dark"] .pub-chip {
    background: var(--global-card-bg-color);
    border-color: #3a3a3f;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  }
  html[data-theme="dark"] .pub-chip .pub-venue {
    color: #9aa3b2;
  }
  html[data-theme="dark"] .pub-chip .pub-count {
    color: var(--global-theme-color);
  }

  /* ---- Dark mode for the rest of the teaching page ---- */
  html[data-theme="dark"] .teaching-page h2 {
    border-bottom-color: #3a3a3f;
  }
  html[data-theme="dark"] .lecture-card {
    background: var(--global-card-bg-color);
    border-color: #3a3a3f;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
  }
  html[data-theme="dark"] .lecture-tabs,
  html[data-theme="dark"] .lecture-caption {
    background: rgba(255, 255, 255, 0.03);
    border-color: #2f2f33;
    color: var(--global-text-color);
  }
  html[data-theme="dark"] .lecture-tab {
    background: #2a2a2e;
    border-color: #3a3a3f;
    color: #cfcfd4;
  }
  html[data-theme="dark"] .lecture-tab:hover {
    background: #34343a;
    color: #fff;
  }
  html[data-theme="dark"] .lecture-tab.is-active {
    background: #4a4a52;
    border-color: #5a5a62;
    color: #fff;
  }

  html[data-theme="dark"] .honor-card {
    background: var(--global-card-bg-color);
    border-color: #3a3a3f;
    border-left-color: var(--global-theme-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  }
  html[data-theme="dark"] .honor-card:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
  }
  html[data-theme="dark"] .honor-badge {
    background: rgba(241, 217, 138, 0.12);
    color: #f1d98a;
    border-color: rgba(241, 217, 138, 0.3);
  }
  html[data-theme="dark"] .honor-title a {
    color: var(--global-text-color);
    border-bottom-color: #4a4a52;
  }
  html[data-theme="dark"] .honor-authors {
    color: #b8b8be;
  }
  html[data-theme="dark"] .honor-authors strong {
    color: var(--global-text-color);
  }

  html[data-theme="dark"] .teaching-row {
    border-bottom-color: #2f2f33;
  }
  html[data-theme="dark"] .teaching-date {
    color: #9aa3b2;
  }
  html[data-theme="dark"] .teaching-desc {
    color: var(--global-text-color);
  }
  html[data-theme="dark"] .teaching-role.role-instructor {
    background: rgba(30, 125, 58, 0.18);
    color: #7ed99a;
  }
  html[data-theme="dark"] .teaching-role.role-guest {
    background: rgba(178, 90, 0, 0.2);
    color: #f0b072;
  }
  html[data-theme="dark"] .teaching-role.role-supervisor {
    background: rgba(109, 40, 217, 0.22);
    color: #c8a8ff;
  }
  html[data-theme="dark"] .teaching-role.role-ta {
    background: rgba(120, 80, 200, 0.22);
    color: #c8a8ff;
  }

  /* ---- Teaching timeline / list ---- */
  #teaching-list {
    list-style: none;
    padding: 0;
    margin: 1em 0 0 0;
  }
  .teaching-row {
    display: grid;
    grid-template-columns: 110px 150px 1fr;
    gap: 0.8em;
    align-items: baseline;
    padding: 0.7em 0.2em;
    border-bottom: 1px solid #f0f0f0;
  }
  .teaching-row:last-child { border-bottom: none; }
  .teaching-date {
    color: #6b7280;
    font-variant-numeric: tabular-nums;
    font-size: 0.92em;
    font-weight: 500;
  }
  .teaching-role {
    display: inline-block;
    background: #f3f4f6;
    color: #4b5563;
    border-radius: 999px;
    padding: 0.15em 0.7em;
    font-size: 0.82em;
    font-weight: 600;
    width: fit-content;
    white-space: nowrap;
  }
  .teaching-role.role-instructor   { background: #eef6f0; color: #3a7d52; }
  .teaching-role.role-guest        { background: #f7efe6; color: #8a6336; }
  .teaching-role.role-supervisor   { background: #f1ecf8; color: #6d28d9; }
  .teaching-role.role-ta           { background: #f1ecf8; color: #6d28d9; }
  .teaching-desc {
    color: #1a1a1a;
    line-height: 1.45;
  }
  @media (max-width: 640px) {
    .teaching-row {
      grid-template-columns: 1fr;
      gap: 0.25em;
      padding: 0.9em 0.2em;
    }
  }
</style>

<div class="teaching-page" markdown="1">

## Lectures

<div class="lecture-card" id="lecture-card">
  <div class="lecture-tabs" role="tablist">
    <button type="button"
            class="lecture-tab is-active"
            role="tab"
            data-embed="https://www.youtube.com/embed/1NcluUFDwxo?si=37kSDhNcKdO_MZZ3"
            data-title="PLR Lecture - ML Project"
            data-caption="Perception and Learning for Robotics — Best Practices for your ML-Project">
      ETH Zurich - Project Best Practices
    </button>
    <button type="button"
            class="lecture-tab"
            role="tab"
            data-embed="https://www.youtube.com/embed/5uWtpDON7Vs?si=JMWOVdvOc5w-ytws"
            data-title="Stanford Robotics Seminar - Embodied Foundation Models"
            data-caption="Stanford Robotics Seminar  - Embodied Foundation Models"
            data-watch="https://www.youtube.com/watch?v=5uWtpDON7Vs"
            data-watch-note="Embedding is disabled for this Stanford talk — please watch it directly on YouTube."
            data-thumb="https://i.ytimg.com/vi/5uWtpDON7Vs/maxresdefault.jpg">
      Stanford - Robotics Seminar
    </button>
  </div>
  <div class="lecture-video">
    <iframe
      id="lecture-iframe"
      src="https://www.youtube.com/embed/1NcluUFDwxo?si=37kSDhNcKdO_MZZ3"
      title="PLR Lecture - ML Project"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <div class="lecture-watch-overlay" id="lecture-watch-overlay" hidden>
      <div class="lecture-watch-note" id="lecture-watch-note"></div>
      <a class="lecture-watch-btn" id="lecture-watch-btn" href="#" target="_blank" rel="noopener noreferrer">
        ▶ Watch on YouTube
      </a>
    </div>
  </div>
  <div class="lecture-caption" id="lecture-caption">
    Perception and Learning for Robotics — Best Practices for your ML-Project
  </div>
</div>

<script>
  (function () {
    const card = document.getElementById('lecture-card');
    if (!card) return;
    const iframe = document.getElementById('lecture-iframe');
    const caption = document.getElementById('lecture-caption');
    const overlay = document.getElementById('lecture-watch-overlay');
    const overlayNote = document.getElementById('lecture-watch-note');
    const overlayBtn = document.getElementById('lecture-watch-btn');
    const tabs = card.querySelectorAll('.lecture-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        iframe.src = tab.dataset.embed;
        iframe.title = tab.dataset.title;
        caption.textContent = tab.dataset.caption;
        if (tab.dataset.watch) {
          overlayBtn.href = tab.dataset.watch;
          overlayNote.textContent = tab.dataset.watchNote || '';
          overlay.style.backgroundImage = tab.dataset.thumb ? `url("${tab.dataset.thumb}")` : '';
          overlay.hidden = false;
        } else {
          overlay.hidden = true;
          overlay.style.backgroundImage = '';
        }
      });
    });
  })();
</script>

---

## Honors

<ul id="honors-list" class="honors-grid"></ul>

<script>
  fetch('/assets/json/honors.json')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('honors-list');

      data.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'honor-card';

        const authorsFormatted = (entry.authors || '').replace(/Jonas Frey/g, '<strong>Jonas Frey</strong>');

        const titleLink = entry.url
          ? `<a href="${entry.url}" target="_blank" rel="noopener noreferrer">${entry.title}</a>`
          : entry.title;

        li.innerHTML = `
          <div class="honor-top">
            <span class="honor-badge">${entry.honor || ''}</span>
            <span class="honor-venue">${entry.venue || ''}</span>
          </div>
          <div class="honor-title">${titleLink}</div>
          <div class="honor-authors">${authorsFormatted}</div>
        `;

        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading honors data:', error);
    });
</script>

---

## Student Publications

<p class="pubs-intro">
  I have had the great fortune to work with and advise outstanding Master students through their theses, semester projects, and coursework. Thanks to their excellent work and dedication, they have published at:
</p>

<div class="pubs-grid">
  <div class="pub-chip"><span class="pub-venue">CoRL</span><span class="pub-count">1</span></div>
  <div class="pub-chip"><span class="pub-venue">ICRA</span><span class="pub-count">4</span></div>
  <div class="pub-chip"><span class="pub-venue">IROS</span><span class="pub-count">1</span></div>
  <div class="pub-chip"><span class="pub-venue">CVPR</span><span class="pub-count">1</span></div>
  <div class="pub-chip"><span class="pub-venue">RAL</span><span class="pub-count">4</span></div>
  <div class="pub-chip"><span class="pub-venue">ICML</span><span class="pub-count">1</span></div>
  <div class="pub-chip"><span class="pub-venue">RLC</span><span class="pub-count">1</span></div>
</div>

---

## Teaching

<ul id="teaching-list"></ul>

<script>
  fetch('{{ "/assets/json/teaching.json" | relative_url }}')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('teaching-list');

      // Sort: newest first. "now" / open ranges first, then by start year desc.
      const startYear = (d) => {
        const m = String(d || '').match(/\d{4}/);
        return m ? parseInt(m[0], 10) : 0;
      };
      const isOpen = (d) => /now/i.test(String(d || ''));
      data.sort((a, b) => {
        if (isOpen(a.date) && !isOpen(b.date)) return -1;
        if (!isOpen(a.date) && isOpen(b.date)) return 1;
        return startYear(b.date) - startYear(a.date);
      });

      const roleClass = (name) => {
        const n = (name || '').toLowerCase();
        if (n.includes('guest')) return 'role-guest';
        if (n.includes('instructor')) return 'role-instructor';
        if (n.includes('supervisor')) return 'role-supervisor';
        if (n.includes('teaching') || n.includes('assistant') || n === 'ta') return 'role-ta';
        return '';
      };

      data.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'teaching-row';
        li.innerHTML = `
          <div class="teaching-date">${entry.date || ''}</div>
          <div><span class="teaching-role ${roleClass(entry.name)}">${entry.name || ''}</span></div>
          <div class="teaching-desc">${entry.description || ''}</div>
        `;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading teaching data:', error);
    });
</script>

</div>
