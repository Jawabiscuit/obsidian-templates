<%*
// Begin Declarations
const folder = tp.file.folder(relative=true);
// End Declarations
-%>
<%*
// Begin Functions
function log(msg) {
    console.log(msg);
}

// Credit: obsidian-periodic-notes
function basename(fullPath) {
    let base = fullPath.substring(fullPath.lastIndexOf("/") + 1);
    if (base.lastIndexOf(".") != -1) base = base.substring(0, base.lastIndexOf("."));
    return base;
}
// End Functions
-%>
<%*
// Begin Prompts
const dirname = basename(folder);
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
    "todo": "todo",
    "waiting": "wtg",
    "in-progress": "ip",
    "finished": "fin",
    "hold": "hld",
    "complete": "cmpt",
    "blocked": "blkd",
    "n/a": "na"
};
const status = type != "reference" ? await
    tp.system.suggester(
        items=Object.keys(statuses),
        text_items=Object.values(statuses)
    ) : null;

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
