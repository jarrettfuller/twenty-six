---
title: News
permalink: "/news"
layout: default
---

{% for post in site.posts %}
<div class="news">
    <div class="news_pubdate">{{ post.pubdate }}</div>
    <div class="news_title">{{ post.title }}</div>
    <div class="news_text">{{ post.text }}</div>

</div>
    {% endfor %}

<section class="clear"></section>
