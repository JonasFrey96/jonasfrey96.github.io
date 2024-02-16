---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

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
