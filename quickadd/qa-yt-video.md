<%*
let url = await tp.system.clipboard();
let page = await tp.obsidian.request({url});
let p = new DOMParser();
let doc = p. parseFromString(page, "text/html");
let $ = s => doc.querySelector(s);

let fileName = $("meta[property='og:title']").content;
let qcFileName = fileName.replace(/:/g, "-");
qcFileName = qcFileName.replace(/\?|\||#|‘|’|,|\./g, "");
//qcFileName = qcFileName.replace(/#/g, "");
//qcFileName = qcFileName.replace(/\?/g, "");
titleName = qcFileName;

qcFileName = qcFileName.replace(/ /g, "-");
qcFileName = qcFileName.toLowerCase();
qcFileName = tp.date.now("YYYY-MM-DD") + "-" + qcFileName;

console.log(qcFileName)

await tp.file.rename(qcFileName);

let duration = $("meta[itemprop='duration']").content.slice(2, -1);
const timeStr = (time) => time.toString().padStart(2, '0');
let [minutes, seconds] = duration.split("M");
let hours = Math.floor(Number(minutes) / 60);
minutes = (Number(minutes) % 60);
duration = `${timeStr(minutes)}:${timeStr(seconds)}`;
if (hours > 0) {duration = `${timeStr(hours)}:` + duration}
-%>
<%*
tR += "---";
%>
title: <%* tR += titleName %>
status: watch-later
tags: yt youtube
series: false
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
url: <%
$("link[rel='shortLinkUrl']").href %>
channel: <%
$("link[itemprop='name']").getAttribute("content") %>
published: "<%
$("meta[itemprop='uploadDate']").content.slice(0, 4) %>"
duration: <% duration %>
<%*
tR += "---";
%>
# <% titleName %>

[<%
$("link[itemprop='name']").getAttribute("content") %>, ▶ *<%
$("meta[property='og:title']").content %>*, (<%
$("meta[itemprop='uploadDate']").content.slice(0, 4) %>)](<%
$("link[rel='shortLinkUrl']").href %>)

![](<% $("meta[property='og:url']").content.split('&')[0] %>)

<% tp.system.clipboard() %>
