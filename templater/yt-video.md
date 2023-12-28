<%*
const {capitalize, textToFilename, sanitizeText} = self.require("_modules/text.js");

const videoUrl = await tp.system.clipboard();
const page = await tp.obsidian.request(videoUrl);
const p = new DOMParser();
const doc = p. parseFromString(page, "text/html");
const $ = s => doc.querySelector(s);

const title = $("meta[property='og:title']").content;
const titleName = sanitizeText(title);
const qcFileName = textToFilename(title);
const datedFileName = tp.date.now("YYYY-MM-DD") + "-" + qcFileName;

await tp.file.rename(datedFileName);

let duration = $("meta[itemprop='duration']").content.slice(2, -1);
const timeStr = (time) => time.toString().padStart(2, '0');
let [minutes, seconds] = duration.split("M");
const hours = Math.floor(Number(minutes) / 60);
minutes = (Number(minutes) % 60);
duration = `${timeStr(minutes)}:${timeStr(seconds)}`;
if (hours > 0) {duration = `${timeStr(hours)}:` + duration};

uploadDate = moment($("meta[itemprop='uploadDate']").content);

//** Begin Get Transcript */

try {
  const url = new URL(videoUrl);
  const videoId = url.searchParams.get("v");
  const transcriptBody = await requestUrl(`https://youtubetranscript.com/?v=${videoId}`).text;
  const dp = new DOMParser();
  const dom = dp.parseFromString(transcriptBody, "text/xml");

  const transcriptEl = dom.getElementsByTagName("transcript")[0];
  if (!transcriptEl) {
    new Notice("No transcript found.");
    // throw new Error("No transcript found.")
  }

  const textElements = transcriptEl.getElementsByTagName("text");
  const textArr = [];
  for (let i = 0; i < textElements.length; i++) {
    const text = textElements[i];
    textArr.push(text.textContent);
  }

  const transcript = textArr.join("\n");
}
catch (e) {
  new Notice("No transcript found.");
}

//** End Get Transcript */
-%>
<%*
tR += "---";
%>
title: <% capitalize(titleName) %>
status: watch-later
tags: yt youtube video
series: false
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
url: <%
$("link[rel='shortLinkUrl']").href %>
channel: <%
$("link[itemprop='name']").getAttribute("content") %>
published: <% uploadDate.format("YYYY-MM-DD") %>
duration: <% duration %>
<%*
tR += "---";
%>
# <% capitalize(titleName) %>

[<%
$("link[itemprop='name']").getAttribute("content") %>, ▶ *<%
$("meta[property='og:title']").content %>*, (<%
$("meta[itemprop='uploadDate']").content.slice(0, 4) %>)](<%
$("link[rel='shortLinkUrl']").href %>)

![](<% $("meta[property='og:url']").content.split('&')[0] %>)

```timestamp-url
<% tp.system.clipboard() %>
```
