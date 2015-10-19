=== Plugin Name ===
Contributors: wordlift, ziodave
Donate link: http://www.linkedin.com/company/insideout10/wordlift-327348/product
Tags: artificial intelligence, semantic editor, linked open data, structured data, content recommendation, knowledge graph, seo,schema.org, google rich snippets, interactive widgets, apache stanbol, iks, semantic web
Requires at least: 4.2
Tested up to: 4.3.1
Stable tag: {version}
License: GPLv2 or later

Serendipity for Bloggers. 
**WordLift** brings the power of Artificial Intelligence to Web Publishers.

== Description ==

**WordLift** is a WordPress Plug-in developed by [InSideOut10](http://blog.insideout.io/about-us) to organise post and pages. 

**WordLift** is a **semantic editor** for WordPress.

**WordLift** turns editorial contents into actionable knowledge and helps bloggers and site owners reach their maximum potential audiences.

Features:

**WordLift** adds [semantic annotations] (http://docs.wordlift.it/en/latest/key-concepts.html#semantic-fingerprint) and combines information publicly available as [linked open data](http://docs.wordlift.it/en/latest/key-concepts.html#linked-open-data) to support the editorial workflow by suggesting relevant information, images and links.

WordLift brings to content editors
_____________

* support for **self-organising** (or structuring) **contents** using publicly (or privately) available `knowledge graphs <key-concepts.html#knowledge-graph>`_ (`linked open data <key-concepts.html#linked-open-data>`_)
* an easy way to **build your own dataset** made of *web content*, *semantic annotations* and a *custom vocabulary* 
* support for creating web content using **contextually relevant fact-based information**
* valued and **free to use photos and illustrations** from the Commons community ranging from maps to astronomical imagery to photographs, artworks and more
* insightful **visualisations to engage the reader**
* new means to drive business growth with **meaningful content discovery paths**
* content tagging for **better SEO**

Websites built with WordLift bring to readers
_____________

* multiple means of searching and accessing **editorial contents around a specific topic** 
* **contextual information** helping readers with limited domain understanding
* an **intuitive overview of all content being written** *on the site* and *around a specific topic* or graph of topics
* meaningful **content recommendations** 

WordLift currently supports the following languages: English, 中文 (Chinese), Español (Spanish), Русский (Russian), Português (Portuguese), Deutsch (German), Italiano (Italian), Nederlands (Dutch), Svenska (Swedish) and Dansk (Danish). 

The Plug-in is powered by [RedLink](http://redlink.co): Europe's *open source* largest platform for semantic enrichment and search. 

== Installation ==

1. Upload `wordlift.zip` to the `/wp-content/plugins/` directory
2. Extract the files in the wordlift subfolder
3. Activate the plug-in using a [WordLift key] (http://docs.wordlift.it/en/latest/key-concepts.html#wordlift-key). You might receive this key from us or from an automatic email system. Once you have received the key go to the WordPress administration menu, click on Plugins / Installed Plugins. Then click on Settings on the WordLift plugin and add the key there. 

**Subscribing to the service from the WordLift website is NOT yet available.**

== Frequently Asked Questions ==

=Why shall I use WordLift?= 
The purpose of using WordLift is to (1) categorize your content, (2) help people find content of interest to them, and (3) help WordLift describe your contents in *machine-readable* format so that other computers can re-use it. 

=Why shall I publish my contents as Linked Data?=
Richer metadata helps making content discoverable, searchable, and provides new means to reaching your audience.
Organising web contents around concepts or entities rather than traditional web pages helps improve navigation, content re-use, content re-purposing and search engine rankings.

Having content aggregations based on semantic annotations that use unambiguous Linked Data identifiers creates a richer navigation bringing the user experience to new levels of engagement. 

More [Frequently Asked Questions](http://docs.wordlift.it/en/latest/faq.html) can be found on [docs.wordlift.it](http://docs.wordlift.it).  

== Screenshots ==

1. To add the schema.org mark-up simply add the [wordlift.entites] shortcode, WordLift will take care of the rest.
2. User Registration
3. WordLift Widget in Edit Post
4. In order to add the Geo-map Widget use the shortcode <em>[wordlift.geomap]</em>
5. In order to add the Treemap Widget use the shortcode <em>[wordlift.treemap]</em>
6. The WordLift Bar.

== Changelog ==

= 3.0.10 (2015-10-14) =
  * Fix [#119](https://github.com/insideout10/wordlift-plugin/issues/119). Now public entities status is properly preserved when linked to draft posts.
  * Fix: install script in order to use branch-specific WP unit tests libs

= 2.6.19 =
 * Fix: [issue 13](https://github.com/insideout10/wordlift-plugin/issues/13): authorship tagging is now shown only on single pages and posts (thanks to Kevin Polley)

= 2.6.18 =
 * Enhancement: Twitter authentication is now back.

= 2.6.17 =
 * Fix: change regular expression to add image itemprops for In-Depth articles to avoid conflicts with linked images and plugins such Nav Menu Images (thanks to Lee Hodson).

= 2.6.16 =
 * Fix: removed useless references to jQuery UI libraries and conflicting CSS (thanks to Lee Hodson).

= 2.6.15 =
 * Fix: PHP warning in RecordSetService (thanks to Kevin Polley),
 * Fix: image alt attributes were incorrectly highlighted with entities (thanks to Lee Hodson).

= 2.6.14 =
 * Fix: post thumbnail html output even if there's no thumbnail.
 * Fix: adding schema.org title using the_title filter could cause issues with theme that use this function for the img tag alt attribute value.
 * Enhancement: add support for DW Focus theme.

= 2.6.13 =
 * Fix: overlap with Facebook admin menu.

= 2.6.12 =
 * Fix: enable authorship information only for regular posts (post type 'post').

= 2.6.11 =
 * Fix: the entity page might appear in the primary menu with some themes (e.g. Twenty Thirteen).
 * Fix: the entity page called without an entity parameter would return a warning.
 * Fix: a warning might appear in the entity page.

= 2.6.10 =
 * Fix: temporary disabled twitter authentication due to API changes.

= 2.6.9 =
 * Improvement: add better support for is_single call.

= 2.6.8 =
 * Other: fix repository versioning.

= 2.6.7 =
 * Fix: html tagging in the title did cause issues when the post title is being used as an html attribute.

= 2.6.6 =
 * Other: add new keywords.

= 2.6.5 =
 * Other: add compatibility up to WordPress 3.6.

= 2.6.4 =
 * Fix: fix a bug that would cause the interaction count to show up in the page title.
 * Fix: ensure adding schema.org mark-up happens only in single post views.

= 2.6.2 =
 * Fix: fix a bug that would cause rewrite rules to be incomplete (WordPress Framework).

= 2.6.1 =
 * Feature: add option to disable *In-Depth* features.

= 2.6.0 =
 * Feature: add new *In-Depth* features.

= 2.5.33 =
 * "Registration failed: undefined (undefined)": Fixed a configuration setting that didn't allow some blogs to register to WordLift Services. (Many thanks to http://www.pruk2digital.com/ for helping us out finding this error).

= 2.5.32 =
 * Added initial compatibility with WordPress 3.6 beta 1,
 * Fix an issue that displayed entities alway for the most recent post.

= 2.5.31 =
 * Fixed a 'notice' in the WordLift Bar,
 * Changed the WordLift Bar to show entities from the most recent post in the
   home page,
 * Added HTML encoding of entity data on the WordLift Bar.

= 2.5.30 =
 * WordLift Bar stays hidden for screen width <= 320px.

= 2.5.29 =
 * WordLift Bar hides/shows automatically when the page is scrolled down.

= 2.5.28 =
 * readme updated with links to WordLift Bar samples.

= 2.5.27 =
 * Now featuring the experimental WordLift Bar.

= 2.5.26 =
 * Cloud Services address changed to use standard ports to ease WordPress installations behind firewalls or proxies.

= 2.5.7 =
 * Major release with fixes on the user registration.

= 1.6 =
 * Fixed an issue that would prevent the plug-in from working. This upgrade is strongly recommended.

= 1.5 =
 * Fixed an issue that would block the plug-in when discovering corrupted type formats.
   (NOTE: this version does not work, please upgrade to 1.6)

= 1.4 =
 * Fixed some compatibility issues with Internet Explorer.

= 1.3 =
 * Added support for WordPress 3.0.x

= 1.2 =
 * The entity elements are now hidden by default.

= 1.1 =
* Removed the requirement for a logs folder

= 1.0 =
* First public release

== Upgrade Notice ==

= 1.0 =
* First public release

== More Information ==
WordLift is **happily developed** by [InSideOut10](http://blog.insideout.io/about-us).

[InSideOut10](http://blog.insideout.io/about-us) delivers strategic digital communication tools for enterprises and organisations. 

[InSideOut10](http://blog.insideout.io/about-us) uses artificial intelligence and semantic networks to collect, analyse and link relevant contents with data.

WordLift infrastructure runs on the semantic platform of [Redlink](http://redlink.co). 

[Redlink](http://redlink.co) is commercial spin-off based in Salzburg, Austria focused on *Semantic Technologies* and *Free Open Source Software* that has been co-founded by [InSideOut10](http://blog.insideout.io/about-us) in 2013.