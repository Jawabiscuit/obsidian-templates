<%*
// Variable Declarations

let title = tp.file.title;
let type = "reference";
let status = "ip";
let tags;

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

title = await tp.system.prompt("Title", title.toLowerCase());

status = await tp.system.suggester(
    items=["waiting", "in-progress", "finished", "hold", "complete", "blocked", "n/a"],
    text_items=["wtg", "ip", "fin", "hld", "cmpt", "blkd", "na"]
);

tags = await tp.system.prompt(
    "Tags (space separated)"
);

if (!tp.user.word_in_tags("book", tags)) {
    tags += " book";
}
// End Prompt
-%>
<%* tR += "---" %>
title: <% title %>
type: <% type %>
status: <% status %>
tags: <% tags %>
aliases:
    - <% tp.file.title.replace('{ ', '') %>
cssclass:
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
