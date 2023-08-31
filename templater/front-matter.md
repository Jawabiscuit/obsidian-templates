<%*
let type = await tp.system.suggester(
    ["journal", "meeting", "reference", "dataview", "document", "audio", "video", "chat"],
    ["journal", "meeting", "reference", "dataview", "document", "audio", "video", "chat"],
);

let status = await tp.system.suggester(
    ["waiting", "in-progress", "finished", "hold", "complete", "blocked", "n/a"],
    ["wtg", "ip", "fin", "hld", "cmpt", "blkd", "na"]
);

// daily, weekly, monthly, quarterly, yearly
// work (5 business day work week, default: 7)
let tags = await tp.system.prompt(
    "Tags (space separated)"
);

let series = false;

if (type == "meeting") {
    answer = await tp.system.prompt("Series? (\"Y/n\")", "y");
    if (answer == "y") {
        series = true;
    }
    if (!tp.user.word_in_tags("meeting", tags)) {
        tags += " meeting"
    }
}

if (type == "journal") {
    answer = await tp.system.prompt("Series? (\"Y/n\")", "y");
    if (answer == "y") {
        series = true;
    }
    if (!tp.user.word_in_tags("journal", tags)) {
        tags += " journal"
    }
}
%>
<%* tR += "---" %>
title: <% tp.file.title %>
type: <% type %>
status: <% status %>
tags: <% tags %>
series: <% series %>
created: <% tp.file.creation_date("YYYY-MM-DD HH:mm") %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
<%* tR += "---" %>
