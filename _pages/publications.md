---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->
Here you can find my [GoogleScholar](https://scholar.google.com/citations?user=Ef13BU4AAAAJ&hl=de&oi=ao)


### Navigation

<div class="publications">
  {% bibliography --group_by none --query @*[nav=true]* %}
</div>

### Locomotion

<div class="publications">
  {% bibliography --group_by none --query @*[loc=true]* %}
</div>

### Perception

<div class="publications">
  {% bibliography --group_by none --query @*[other=true]* %}
</div>



{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[year={{y}}]* %}
{% endfor %}
