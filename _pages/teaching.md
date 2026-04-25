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
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1rem;
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
    max-width: 880px;
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
    border-left: 4px solid #3273dc;
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
    color: #3273dc;
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
    color: #3273dc;
    border-bottom-color: #3273dc;
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
    color: #3273dc;
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
    background: #eef3ff;
    color: #2554c7;
    border-radius: 999px;
    padding: 0.15em 0.7em;
    font-size: 0.82em;
    font-weight: 600;
    width: fit-content;
    white-space: nowrap;
  }
  .teaching-role.role-instructor   { background: #e6f4ea; color: #1e7d3a; }
  .teaching-role.role-guest        { background: #fff1e6; color: #b25a00; }
  .teaching-role.role-supervisor   { background: #f3e8ff; color: #6d28d9; }
  .teaching-role.role-ta           { background: #eef3ff; color: #2554c7; }
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

<div class="lecture-card">
  <div class="lecture-video">
    <iframe
      src="https://www.youtube.com/embed/1NcluUFDwxo?si=37kSDhNcKdO_MZZ3"
      title="PLR Lecture - ML Project"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  </div>
  <div class="lecture-caption">
    Perception and Learning for Robotics — Best Practices for your ML-Project
  </div>
</div>

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
  <div class="pub-chip"><span class="pub-venue">Workshops</span><span class="pub-count">2</span></div>
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
