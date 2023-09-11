<%*
// Variable Declarations
const type = "book";
const title = tp.file.title;
const series = false;
let tags = [];
// End Declarations
-%>
<%*
// Functions

function log(msg) {
    console.log(msg);
}

function capitalize_words (arr) {
    return arr.map(word => {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    });
}

// End Functions
-%>
<%*
// Prompt for title, status, and tags

// title = await tp.system.prompt("Title", title.toLowerCase());

const statuses = {
    "waiting": "wtg",
    "in-progress": "ip",
    "finished": "fin",
    "hold": "hld",
    "complete": "cmpt",
    "blocked": "blkd",
    "n/a": "na"
};
const status = await tp.system.suggester(
    items=Object.keys(statuses),
    text_items=Object.values(statuses)
);

const tags_chosen = await tp.system.prompt("Tags (space separated)");
if (tags_chosen && !tags_chosen.split(" ").includes(type)) {
    tags = [type].concat(tags_chosen.split(" "));
} else {
    tags = [type];
}
// End Prompt
-%>
<%* tR += "---" %>
title: <% title %>
type: <% type %>
status: <% status %>
tags: [<% tags.join(", ") %>]
series: <% series %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
<%* tR += "---" %>
<%*
// Begin Primary Heading
let today = tp.date.now("YYYY-MM-DD", 0, title, "YYYY-MM-DD");

fname_without_date = title.split(today + "-")[1];
primary_heading = capitalize_words(fname_without_date.split("-")).join(" ");
// End Primary Heading
-%>
# <% primary_heading %>

## Metadata
author:: {{VALUE:author}}
reference::
rating::
reviewed date:: [[<%tp.date.now("gggg-MM-DD - ddd MMM D")%>]]
finished year:: [[<%tp.date.now("gggg")%>]]
## Thoughts

## Actions Taken / Changes

## Summary of Key Points

## Highlights & Notes
