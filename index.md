# Index

Notes taken as I learn about different topics. Organized with [Foam](https://foambubble.github.io/) and published to Github Pages.

## Index

<!-- https://www.seanh.cc/2019/09/29/liquid/ -->
<ul>
  {% for page in site.pages %}
    {% assign ext = page.name | slice: -3, 3 %}
    {% assign pre = page.path | slice: 0, 5 %}
    {% if pre == "docs/" and ext == ".md"%}
      <li>
        <a href="{{ page.url }}">{{ page.path | remove_first: "docs/" | remove_first: ".md" }}</a>
      </li>
    {% endif %}
  {% endfor %}
</ul>
