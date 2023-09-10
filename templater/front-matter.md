<%*
// Begin Declarations
const path = require("path");
const folder = tp.file.folder(relative=true);
const dirname = path.basename(folder);
// End Declarations
-%>
<%*
// Begin Functions
function log(msg) {
    console.log(msg);
}
// End Functions
-%>
<%*
// Begin Prompts
const types = [
    "audio",
    "chat",
    "dataview",
    "document",
    "journal",
    "meeting",
    "reference",
    "video",
];
let type;
for (let t of types) {
    if (dirname == t) {
        type = t;
    }
}
if (!type) {
    type = await tp.system.suggester(
        Object.keys(types), Object.values(types)
    );
}

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

let tags = [];
const tags_chosen = await tp.system.prompt("Tags (space separated)");
if (tags_chosen && !tags_chosen.split(" ").includes(type)) {
    tags = [type].concat(tags_chosen.split(" "));
} else {
    tags = [type];
}

let series = false;
if (type == "journal") {
    series = true;
} else if (type == "meeting") {
    answer = await tp.system.prompt("Series? (\"Y/n\")", "y");
    if (answer == "y") {
        series = true;
    }
}
// End Prompts
-%>
<%* tR += "---" %>
title: <% tp.file.title %>
type: <% type %>
status: <% status %>
tags: [<% tags.join(", ") %>]
series: <% series %>
created: <% tp.file.creation_date("YYYY-MM-DD HH:mm") %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
<%* tR += "---" %>
