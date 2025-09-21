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


## Student Publications
I have had the great fortune to work with and advise outstanding Master students through their theses, semester projects, and coursework. Thanks to their excellent work and dedication, they have published at:

<div style="display: flex; justify-content: center; margin: 1em 0;">
  <table style="
    font-size: 0.9em;
    border-collapse: separate;
    border-spacing: 0;
    width: 320px;
    margin: 0 auto;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(50,115,220,0.08);
    border: 1px solid #eee;
  ">
    <thead>
      <tr style="background: #f7f7f7;">
        <th style="padding: 0.25em 0.7em; text-align: left; border-bottom: 1px solid #eee;">Venue</th>
        <th style="padding: 0.25em 0.7em; text-align: left; border-bottom: 1px solid #eee;">Number</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">CoRL</td><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">1</td></tr>
      <tr><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">ICRA</td><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">4</td></tr>
      <tr><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">IROS</td><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">1</td></tr>
      <tr><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">CVPR</td><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">1</td></tr>
      <tr><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">RAL</td><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">4</td></tr>
      <tr><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">Workshops</td><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">2</td></tr>
      <tr><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">RLC</td><td style="padding: 0.15em 0.7em; border-bottom: 1px solid #f0f0f0;">1</td></tr>
      <tr><td style="padding: 0.15em 0.7em;">ICML</td><td style="padding: 0.15em 0.7em;">1</td></tr>
    </tbody>
  </table>
</div>

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
