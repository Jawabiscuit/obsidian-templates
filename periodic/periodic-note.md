<%*
// Begin Declarations
const dv = app.plugins.plugins["dataview"].api;

let title = tp.file.title;
// let type = "post";
let status = "draft";
let tags = "";
// End Declarations
-%>
<%*
// Begin Prompts
title = await tp.system.prompt("Title", title.toLowerCase());
await tp.file.rename(title);

status = await tp.system.suggester(
    items=["draft", "finished"],
    text_items=["true", "false"]
);

tags = await tp.system.prompt(
    "Tags (space separated)",
    tags
);
// End Prompts
-%>
<%*
// Begin Functions
function log(msg) {
    console.log(msg);
}

function capitalize_words (arr) {
    return arr.map(word => {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    });
}

function title_without_date (title) {
    let today = tp.date.now("YYYY-MM-DD", 0, title, "YYYY-MM-DD");
    title_wo_date = title.split(today + "-")[1];
    return capitalize_words(title_wo_date.split("-")).join(" ");
}
// End Functions
-%>
<%* tR += "---" %>
title: <% title_without_date(title) %>
draft: <% status %>
tags: [<% tags.split(" ").join(", ") %>]
date: <% tp.date.now("") %>
<%* tR += "---" %>
<%*
// Begin Progress Bar
let progress;
let file_date = new Date(title.match(/^(\d{4}-\d{2}-\d{2})/)[1] + "T00:00");

progress = tp.user.make_progress_bar(file_date.getDay(), 7, size=7, label="Daily Progress");
if (progress) {
    tR += `${progress}\n`;
}
// End Progress Bar
-%>
<%*
// Begin Includes
// End Includes
-%>
