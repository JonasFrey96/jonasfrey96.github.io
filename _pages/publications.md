---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 1


venues:
  - { key: icra,    label: ICRA,    type: conference }
  - { key: iros,    label: IROS,    type: conference }
  - { key: rss,     label: RSS,     type: conference }
  - { key: corl,    label: CoRL,    type: conference }
  - { key: cvpr,    label: CVPR,    type: conference }
  - { key: icml,    label: ICML,    type: conference }
  - { key: tro,     label: TRO,     type: journal }
  - { key: ram,     label: RAM,     type: journal }
  - { key: ral,     label: RAL,     type: journal }
  - { key: ijrr,    label: IJRR,    type: journal }
  - { key: auro,    label: AuRo,    type: journal }
  - { key: tfr,     label: TFR,     type: journal }

topics:
  - { key: nav,        label: Navigation }
  - { key: learning,   label: Learning }
  - { key: loc,        label: Locomotion }
  - { key: perception, label: Perception }
  - { key: workshop,   label: Workshops }
---

Here you can find my [GoogleScholar](https://scholar.google.com/citations?user=Ef13BU4AAAAJ&hl=de&oi=ao)

<style>
.pub-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6em 0.9em;
  align-items: center;
  justify-content: center;
  margin: 1.25em 0 1.5em;
  padding: 0.75em 1em;
  background: var(--global-card-bg-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 12px;
}
.pub-controls .sort-label {
  font-size: 0.85em;
  font-weight: 600;
  color: var(--global-text-color);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.pub-controls select {
  background: var(--global-bg-color);
  color: var(--global-text-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 18px;
  padding: 0.3em 2em 0.3em 0.9em;
  font-size: 0.88em;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  appearance: none;
  -webkit-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--global-theme-color) 50%),
                    linear-gradient(135deg, var(--global-theme-color) 50%, transparent 50%);
  background-position: calc(100% - 14px) 50%, calc(100% - 9px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}
.pub-controls select:hover,
.pub-controls select:focus {
  border-color: var(--global-theme-color);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.04);
  outline: none;
}
.sort-btn {
  background: transparent;
  color: var(--global-text-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 18px;
  padding: 0.3em 0.95em;
  font-size: 0.85em;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.sort-btn:hover {
  border-color: var(--global-theme-color);
  color: var(--global-theme-color);
}
.sort-btn.active {
  background: var(--global-theme-color);
  color: var(--global-hover-text-color);
  border-color: var(--global-theme-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

/* Publication entries */
#all-publications ol.bibliography > li {
  padding: 0.9rem 0.75rem;
  border-radius: 10px;
  transition: background 0.15s;
}
#all-publications ol.bibliography > li:hover {
  background: var(--global-card-bg-color);
}
#all-publications ol.bibliography > li + li {
  border-top: 1px solid var(--global-divider-color);
}
#all-publications .publication-entry .title {
  font-weight: 600;
}
</style>

<div class="pub-controls">
  <label class="sort-label" for="venue-filter">Venue:</label>
  <select id="venue-filter">
    <option value="all">All venues</option>
    <optgroup label="Conferences">
      {% for v in page.venues %}{% if v.type == 'conference' %}<option value="{{ v.key }}">{{ v.label }}</option>{% endif %}{% endfor %}
    </optgroup>
    <optgroup label="Journals">
      {% for v in page.venues %}{% if v.type == 'journal' %}<option value="{{ v.key }}">{{ v.label }}</option>{% endif %}{% endfor %}
    </optgroup>
  </select>

  <label class="sort-label" for="topic-filter">Topic:</label>
  <select id="topic-filter">
    <option value="all">All topics</option>
    {% for t in page.topics %}<option value="{{ t.key }}">{{ t.label }}</option>{% endfor %}
  </select>

  <span class="sort-label">Sort:</span>
  <button class="sort-btn active" data-sort="citations">Most cited</button>
  <button class="sort-btn" data-sort="year">Year</button>
</div>

<div id="publications-container">
  <div class="publications" id="all-publications">
    {% bibliography --group_by none %}
  </div>
</div>

<script>
(function() {
  var container = document.getElementById('all-publications');
  if (!container) return;
  var ol = container.querySelector('ol.bibliography');
  if (!ol) return;

  function attrOf(li, name) {
    var entry = li.querySelector('.publication-entry');
    return entry ? (entry.getAttribute(name) || '') : '';
  }

  function getItems() {
    return Array.prototype.slice.call(ol.children).filter(function(el) {
      return el.tagName === 'LI' && el.querySelector('.publication-entry');
    });
  }

  function applyFilter() {
    var venue = document.getElementById('venue-filter').value;
    var topic = document.getElementById('topic-filter').value;
    getItems().forEach(function(li) {
      var show = true;
      if (venue && venue !== 'all') {
        var venues = attrOf(li, 'data-venues').split(/\s+/);
        if (venues.indexOf(venue) === -1) show = false;
      }
      if (show && topic && topic !== 'all') {
        var topics = attrOf(li, 'data-topics').split(/\s+/);
        if (topics.indexOf(topic) === -1) show = false;
      }
      li.style.display = show ? '' : 'none';
    });
  }

  function applySort(mode) {
    var items = getItems();
    items.sort(function(a, b) {
      var ya = parseInt(attrOf(a, 'data-year'), 10) || 0;
      var yb = parseInt(attrOf(b, 'data-year'), 10) || 0;
      var ca = parseInt(attrOf(a, 'data-citations'), 10) || 0;
      var cb = parseInt(attrOf(b, 'data-citations'), 10) || 0;
      if (mode === 'year') {
        if (yb !== ya) return yb - ya;
        return cb - ca;
      }
      if (cb !== ca) return cb - ca;
      return yb - ya;
    });
    items.forEach(function(li) { ol.appendChild(li); });
  }

  var venueSel = document.getElementById('venue-filter');
  var topicSel = document.getElementById('topic-filter');
  venueSel.addEventListener('change', function() {
    if (venueSel.value !== 'all') topicSel.value = 'all';
    applyFilter();
  });
  topicSel.addEventListener('change', function() {
    if (topicSel.value !== 'all') venueSel.value = 'all';
    applyFilter();
  });

  document.querySelectorAll('.sort-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.sort-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applySort(btn.getAttribute('data-sort'));
    });
  });

  // Defaults: show all, sort by citations desc
  applySort('citations');
  applyFilter();
})();
</script>
