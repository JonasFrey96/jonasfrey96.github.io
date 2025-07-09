---
layout: default
permalink: /teaching/
title: Teaching & Honors
description: Teaching Experience.
nav: true
nav_order: 3
pretty_table: true
---

## Lectures

<div class="row mt-3">
    <div class="PLR Lecture - ML Project" style="width:960px; height:540px; margin:0 auto; position: relative; overflow: hidden;">
        <iframe 
            src="https://www.youtube.com/embed/1NcluUFDwxo?si=37kSDhNcKdO_MZZ3" 
            width="960" 
            height="540" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            style="display: block; width: 100%; height: 100%; border: none;">
        </iframe>
    </div>
</div>
<div class="caption" style="text-align: center; margin-top: 10px;">
    Perception and Learning for Robotics - Best Practices for your ML-Project 
</div>
---

## Honors

<ul id="honors-list" style="list-style-type: disc; padding-left: 1.5em;"></ul>

<script>
  fetch('/assets/json/honors.json')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('honors-list');

      data.forEach(entry => {
        const listItem = document.createElement('li');

        const authorsFormatted = (entry.authors || '').replace(/Jonas Frey/g, '<strong>Jonas Frey</strong>');

        const titleLink = entry.url
          ? `<a href="${entry.url}" target="_blank" rel="noopener noreferrer">${entry.title}</a>`
          : entry.title;

        listItem.innerHTML = `
          <div style="margin-bottom: 1em;">
            <strong>Venue:</strong> ${entry.venue || ''}<br>
            <strong>Award:</strong> ${entry.honor || ''}<br>
            <strong>Paper:</strong> ${titleLink}<br>
            <strong>Authors:</strong> ${authorsFormatted}
          </div>
        `;

        list.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error loading honors data:', error);
    });
</script>

---


## Teaching

<table id="table" data-toggle="table" data-url="{{ '/assets/json/teaching.json' | relative_url }}">
  <thead>
    <tr>
      <th data-field="date">Date</th>
      <th data-field="name">Type</th>
      <th data-field="description">Description</th>
    </tr>
  </thead>
</table>

---
