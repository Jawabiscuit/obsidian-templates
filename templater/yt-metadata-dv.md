<%*
let url = await tp.system.clipboard();
let page = await tp.obsidian.request({url});
let p = new DOMParser();
let doc = p.parseFromString(page, "text/html");
let $ = (s) => doc.querySelector(s);

let canonical = $("link[rel='canonical']").href.split('&')[0];
let title = $("meta[name='title']").content;
let description = $("meta[name='description']").content;
let keywords = $("meta[name='keywords']").content;
let shortlinkUrl = $("link[rel='shortlinkUrl']").href.split('?')[0];
let imageSrc = $("link[rel='image_src']").href;

// Open Graph protocol
let ogSiteName = $("meta[property='og:site_name']").content;
let ogUrl = $("meta[property='og:url']").content.split('&')[0];
let ogTitle = $("meta[property='og:title']").content;
let ogImage = $("meta[property='og:image']").content;
let ogDescription = $("meta[property='og:description']").content;

let duration = $("meta[itemprop='duration']").content.slice(2, -1);
let authorUrl = $("span[itemprop='author'] > link[itemprop='url']").href;
let authorName = $("span[itemprop='author'] > link[itemprop='name']").getAttribute("content"); // Dot notation doesn't work here
let thumbnailUrl = $("link[itemprop='thumbnailUrl']").href;
let datePublished = moment($("meta[itemprop='datePublished']").content);
let uploadDate = moment($("meta[itemprop='uploadDate']").content);
let genre = $("meta[itemprop='genre']").content;

const timeStr = (time) => time.toString().padStart(2, '0');
let [minutes, seconds] = duration.split("M");
let hours = Math.floor(Number(minutes) / 60);
minutes = (Number(minutes) % 60);
duration = `${timeStr(minutes)}:${timeStr(seconds)}`;
if (hours > 0)
    duration = `${timeStr(hours)}:` + duration

-%>
%%
ogSiteName:: <% ogSiteName %>
canonical:: "<% canonical %>"
ogUrl:: "<% ogUrl %>"
shortlinkUrl:: "<% shortlinkUrl %>"
title:: <% title %>
ogTitle:: <% ogTitle %>
description:: <% description %>
ogDescription:: <% ogDescription %>
imageSrc:: "<% imageSrc %>"
ogImage:: "<% ogImage %>"
thumbnailUrl:: "<% thumbnailUrl %>"
keywords:: <% keywords %>
genre:: <% genre %>
duration:: <% duration %>
datePublished:: <% datePublished.format("YYYY-MM-DD") %>
uploadDate:: <% uploadDate.format("YYYY-MM-DD") %>
authorUrl:: "<% authorUrl %>"
authorName:: <% authorName %>
%%