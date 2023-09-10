<%*
// Begin Declarations
const dv = app.plugins.plugins["dataview"].api;

let title = tp.file.title;
let series = false;
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
// Begin Prompts
if (title.startsWith("Untitled")) {
    title = tp.date.now("YYYY-MM-DD") + "-" + title;
    title = await tp.system.prompt("Title", title.toLowerCase());
}

const types = ["journal", "reference", "meeting", "document"]
const type = await tp.system.suggester(types, types);

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
// End Prompts
-%>
<%*
// Begin Organization
await tp.file.rename(title + "-temp");

// Move note into the proper directory
switch (type) {
    case "journal":
        await tp.file.move("journal/" + title);
        series = true;
        break;
    case "reference":
        await tp.file.move("reference/" + title);
        break;
    case "meeting":
        answer = await tp.system.prompt("Series? (\"Y/n\")", "y");
        if (answer == "y") {
            series = true;
        }
        await tp.file.move("meeting/" + title);
        break;
    case "documents":
        await tp.file.move("documents/" + title);
        break;
}
// End Organization
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
let file_date = new Date(title.match(/^(\d{4}-\d{2}-\d{2})-/)[1] + "T00:00");

if (series) {
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
<%*
// Begin Primary Heading
let today = tp.date.now("YYYY-MM-DD", 0, title, "YYYY-MM-DD");

fname_without_date = title.split(today + "-")[1];
primary_heading = capitalize_words(fname_without_date.split("-")).join(" ");
// End Primary Heading
-%>
# <% primary_heading %>
<%*
// Begin Navigation
const folder = tp.file.folder(relative=true);

let prev_note;
let next_note;

if (series) {
    prev_note = await dv.queryMarkdown(
       `LIST WITHOUT ID file.name
        FROM "${folder}"
        WHERE file.name != "${title}" AND file.day < date("${today}")
        WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2")
        SORT file.day DESC
        LIMIT 1`
    );

    if (prev_note.value.length) {
        prev_note = prev_note.value.split(" ")[1].trim();
        prev_date = tp.user.prefixed_date(prev_note);
    } else {
        prev_date = tp.date.now("YYYY-MM-DD", -1, title, "YYYY-MM-DD")
        prev_note = `${prev_date}${title.split(today)[1]}`;
    }

    next_note = await dv.queryMarkdown(
       `LIST WITHOUT ID file.name
        FROM "${folder}"
        WHERE file.name != "${title}" AND file.day > date("${today}")
        WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2")
        SORT file.day ASC
        LIMIT 1`
    );

    if (next_note.value.length) {
        next_note = next_note.value.split(" ")[1].trim();
    } else {
        next_date = await tp.system.prompt("Next date", tp.date.now("YYYY-MM-DD", 1, title, "YYYY-MM-DD"));
        next_note = `${next_date}${title.split(today)[1]}`;
    }

    tR += `◀ [[${prev_note}]] | [[${next_note}]] ▶\n`;
} else {
    tR += "\n";
}
// End Navigation
-%>
<%*
// Begin File Include
if (tags.includes("standup")) {
    tR += `\
## 👷🚧 Updates

### ◀ [[${prev_note}#👷🚧 Updates|Previous]]

![[${prev_note}#^${prev_date}-updates]]

### 📆 Today

- 

^${today}-updates

> [!tldr] 
>

^${today}-tldr

## 💡 Capture

- 

^${today}-capture

## 💬 Spinoff Convo(s)

## 📥 Action Items

### ◀ [[${prev_note}#📥 Action Items|Previous]]

![[${prev_note}#^${prev_date}-action-items]]

### 📥 Today

- [ ] 

^${today}-action-items
`;
} else if (tags.includes("1on1")) {
    tR += `\
## ⌛ Prep

- 

## 🕚 Minutes
`;
    if (series) {
        tR += `\
### ◀ [[${prev_note}#🕚 Minutes|Previous]]

![[${prev_note}#^${prev_date}-minutes]]

### 🕚 Today
`;
}
    tR += `\
- 

^${today}-minutes

## 💡 Capture

- 

^${today}-capture

## 📥 Action Items

### ◀ [[${prev_note}#📥 Action Items|Previous]]

![[${prev_note}#^${prev_date}-action-items]]

### 📥 Today

- [ ] 

^${today}-action-items
`;
} else if (type == "journal") {
    tR += `\
## 📓 Journal

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

## 🔗 Backlinks

`;
} else if (type == "meeting") {
    tR += `\
## 👨‍💼 Attendance

## 🕚 Minutes

## 💡 Capture

## 📥 Action Items

`;
} else if (type == "reference") {
    tR += `\
## 📥 Action Items

## 🔗 Backlinks

`;
}
// End File Include
-%>

