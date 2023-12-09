<%*
function QCFileName(fileName) {
    var qcTitle;
    var qcFileName = fileName.replace(/:/g, "-");
    qcFileName = qcFileName.replace(/\?|\!|\||#|‘|’|\\|\/|\(|\)/g, "");
    qcTitle = qcFileName;
    qcFileName = qcFileName.replace(/ /g, "-");
    qcFileName = qcFileName.toLowerCase();
    return [qcFileName, qcTitle];
}

const videoUrl = await tp.system.clipboard();
const page = await tp.obsidian.request(videoUrl);
const p = new DOMParser();
const doc = p. parseFromString(page, "text/html");
const $ = s => doc.querySelector(s);

const fileName = $("meta[property='og:title']").content;
const [qcFileName, titleName] = QCFileName(fileName);
const datedFileName = tp.date.now("YYYY-MM-DD") + "-" + qcFileName;

await tp.file.rename(datedFileName);

let duration = $("meta[itemprop='duration']").content.slice(2, -1);
const timeStr = (time) => time.toString().padStart(2, '0');
let [minutes, seconds] = duration.split("M");
const hours = Math.floor(Number(minutes) / 60);
minutes = (Number(minutes) % 60);
duration = `${timeStr(minutes)}:${timeStr(seconds)}`;
if (hours > 0) {duration = `${timeStr(hours)}:` + duration};

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
title: <% titleName %>
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
