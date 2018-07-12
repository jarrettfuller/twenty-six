---
title: twenty-six
permalink: "/work"
layout: default
---
<div class="intro">

            <h1>twenty-six is a multidisciplinary design and editorial studio, mixing client work and self-initiated projects.</h1>    </div>

<ul class="blog-tags-list clearfix">

        {% assign sorted_tags = site.tags | sort %}
        {% for tag in sorted_tags %}
          {% assign c = tag | first %}
          {% assign posts = tag | last %}
          <a href onclick="filter('{{ c }}'); return false;"><li class="blog-tags-item" id="{{ c }}-item">
            {{ c }}
          </li></a>
        {% endfor %}
          <a href onclick="filter('all'); return false;"><li class="blog-tags-item">All</li></a>
      </ul>




<main class="preview">


<div class="blog-list-container" id="all-container">

{% for item in site.work %}
        <div class="work">
        <a href="{{ site.github.url }}{{ item.url }}">
        <div class="project">
            <div class="project_image"><img src="{{ item.image }}"></div>
            <div class="project_title">{{ item.title }}</div>
            <div class="project_tags">{% for tags in item.tags %}
                <li>{{ tags }}</li>
                {% endfor %}</div>
        </div>
    </a>
</div>
    {% endfor %}
      </div>

{% for tag in site.tags %}
        {% assign c = tag | first %}
        {% assign posts = tag | last %}
        <div class="blog-list-container hidden" id="{{ c }}-container">

{% for item in posts %}
{% if item.tags contains c %}
<div class="work">
        <a href="{{ site.github.url }}{{ item.url }}">
        <div class="project">
            <div class="project_image"><img src="{{ item.image }}"></div>
            <div class="project_title">{{ item.title }}</div>
            <div class="project_tags"><ul>
                {% for tags in item.tags %}
                <li>{{ tags }}</li>
                {% endfor %}
    </ul></div>
        </div>
    </a>
</div>
              {% endif %}
            {% endfor %}

</div>
{% endfor %}

</main>


<script>

function filter(tag) {
  setActivetag(tag);
  showContainer(tag);
}

function setActivetag(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('blog-tags-item');
  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'blog-tags-item');
  }

  // set the selected tag's item to active
  var item = document.getElementById(tag + '-item');
  if(item) {
    item.setAttribute('class', 'blog-tags-item active');
  }
}

function showContainer(tag) {
  // loop through all lists and hide them
  var lists = document.getElementsByClassName('blog-list-container');
  for(var i=0; i < lists.length; i++) {
    lists[i].setAttribute('class', 'blog-list-container hidden');
  }

  // remove the hidden class from the list corresponding to the selected tag
  var list = document.getElementById(tag + '-container');
  if(list) {
    list.setAttribute('class', 'blog-list-container');
  }
}


    </script>

<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script>
        $.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];

  $(this).each(function(){
    instances.push(new moveItItem($(this)));
  });

  window.onscroll = function(){
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  }
}

var moveItItem = function(el){
  this.el = $(el);
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
  var pos = scrollTop / this.speed;
  this.el.css('transform', 'translateY(' + -pos + 'px)');
};

$(function(){
  $('[data-scroll-speed]').moveIt();
});
</script>

<section class="clear"></section>
