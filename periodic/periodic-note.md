<%*
// Begin Declarations
const path = require("path");
const dv = app.plugins.plugins["dataview"].api;
const title = tp.file.title;
const folder = tp.file.folder(relative=true);
const dirname = path.basename(folder);
const type = "journal";
const series = true;

let tags = [];
// End Declarations
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
// End Functions
-%>
<%*
// Begin Prompts
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

const p_dirs = ["daily", "weekly", "monthly", "quarterly", "yearly"]; 

let period;
for (let p of p_dirs) {
    if (p == "daily") {
        if (dirname == p) {
            period = "d";
        }
    }
    if (p == "weekly") {
        if (dirname == p) {
            period = "w";
        }
    }
    if (p == "monthly") {
        if (dirname == p) {
            period = "m";
        }
    }
    if (p == "quarterly") {
        if (dirname == p) {
            period = "q";
        }
    }
    if (p == "yearly") {
        if (dirname == p) {
            period = "y";
        }
    }
}

const tags_chosen = await tp.system.prompt("Tags (space separated)");
if (tags_chosen && !tags_chosen.split(" ").includes(dirname)) {
    tags = [dirname].concat(tags_chosen.split(" "));
} else if (dirname && period) {
    tags = [dirname];
}
// End Prompts
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
// Begin Progress Bar
let progress;
let file_date = new Date(title.match(/^(\d{4}-\d{2}-\d{2})/)[1] + "T00:00");

if (period == "d") {
    if (tags.includes("work")) {
        // 5 workdays
        progress = tp.user.make_progress_bar(file_date.getDay(), 5, size=5, label="Progress");
    } else {
        // 7 weekdays
        progress = tp.user.make_progress_bar(file_date.getDay(), 7, size=7, label="Progress");
    }
}

if (progress) {
    tR += `${progress}\n`;
}
// End Progress Bar
-%>
# <% tp.date.now("dddd Do MMMM YYYY", 0, title) %>
<%*
// Begin Navigation
let prev_note;
let prev_date;
let next_note;
let num_days = 1;
let today = tp.date.now("YYYY-MM-DD", 0, title, "YYYY-MM-DD");

switch (period) {
    case "d":
        break;
    case "w":
        num_days = 7;
        break;
    case "m":
        num_days = 30;
        break;
    case "q":
        num_days = 90;
        break;
    case "y":
        num_days = 365;
        break;
}

prev_note = await dv.queryMarkdown(
   `LIST WITHOUT ID file.name
    FROM "${folder}"
    WHERE file.name != "${title}" AND file.day < date("${today}")
    WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2")
    SORT file.day DESC
    LIMIT 1`
);

// Transform `- YYYY-MM-DD*` to `YYYY-MM-DD*`
if (prev_note.value != "") {
    prev_note = prev_note.value.split(" ")[1].trim();
} else {
    prev_date = tp.date.now("YYYY-MM-DD", num_days * -1, title, "YYYY-MM-DD")
    // Support `YYYY-MM-DD-foo-bar-title`
    prev_note = `${prev_date}${title.split(today)[1]}`;
}

next_note = await dv.queryMarkdown(
   `LIST WITHOUT ID file.name
    FROM "${folder}"
    WHERE file.name != "${title}" AND file.day > date("${today}")
    WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2")
    SORT file.day ASC
    LIMIT 1`
);

if (next_note.value != "") {
    next_note = next_note.value.split(" ")[1].trim();
} else {
    next_date = tp.date.now("YYYY-MM-DD", num_days, title, "YYYY-MM-DD");
    // Support `YYYY-MM-DD-foo-bar-title`
    next_note = `${next_date}${title.split(today)[1]}`;
}

tR += `◀ [[${prev_note}]] | [[${next_note}]] ▶`;
// End Navigation
-%>

<%*
// Begin Includes
if (tags.includes("daily")) {
    tR += `\
## 📓 Journal

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

## 🔗 Backlinks

`;
} else if (tags.includes("weekly")) {
    tR += `\
## 🆕 Notes Created

## 🍗 Inputs

## 💩 Outputs

## 🧛‍♂🧛‍♀ Meetings

## 💡 Capture

## 📥 Action Items

`;
} else if (tags.includes("monthly")) {
    tR += `\
## 🏆 Brag

## 🆕 Notes Created

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

`;
} else if (tags.includes("quarterly")) {
    tR += `\
## 🏆 Brag

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

`;
} else if (tags.includes("yearly")) {
    tR += `\
## 🏆 Brag

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

`;
}
// End Includes
-%>
## 🎲 Random Note Review
<%*
const files = app.vault.getFiles().filter(f => f.path.includes(".md"));
const random1 = Math.floor(Math.random() * (files.length - 1)); const random2 = Math.floor(Math.random() * (files.length - 1)); const random3 = Math.floor(Math.random() * (files.length - 1)); const random_note1 = files[random1];
const random_note2 = files[random2];
const random_note3 = files[random3];
-%>

- [ ] [[<% random_note1.basename %>]]
- [ ] [[<% random_note2.basename %>]]
- [ ] [[<% random_note3.basename %>]]
## ✔ Status Check
<%*
tR += `\
\`\`\`dataview
LIST
FROM "journal"
WHERE !econtains(status, "fin") AND !econtains(status, "na") AND !econtains(status, "journal")
\`\`\`
`;
-%>
<%*
if (period == "d") {
    tR += `\
## 📥 Tasks
`;
}
-%>