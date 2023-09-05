<%*
// Begin Declarations
const dv = app.plugins.plugins["dataview"].api;
const regex = /^(\d{4}-\d{2}-\d{2})/;

let title = tp.file.title;
let type = "journal";
let status = "ip";
let series = true;
let tags = "daily";
// End Declarations
-%>
<%*
// Begin Prompts
status = await tp.system.suggester(
    items=["waiting", "in-progress", "finished", "hold", "complete", "blocked", "n/a"],
    text_items=["wtg", "ip", "fin", "hld", "cmpt", "blkd", "na"]
);

// daily, weekly, monthly, quarterly, yearly
// work (5 business day work week, default: 7)
tags = await tp.system.prompt(
    `Tags (space separated) 
    Choices: daily, weekly, monthly, quarterly, yearly, work`,
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
// End Functions
-%>
<%* tR += "---" %>
title: <% title %>
type: <% type %>
status: <%status %>
tags: <% tags %>
series: <% series %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
<%* tR += "---" %>
<%*
// Begin Progress Bar
let progress;
let file_date = new Date(title.match(regex)[1] + "T00:00");

if (tp.user.word_in_tags("daily", tags)) {
    if (tp.user.word_in_tags("work", tags)) {
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
let folder = tp.file.folder(relative=true);

if (tp.user.word_in_tags("weekly", tags)) {
    num_days = 7;
} else if (tp.user.word_in_tags("monthly", tags)) {
    num_days = 30;
} else if (tp.user.word_in_tags("quarterly", tags)) {
    num_days = 90;
} else if (tp.user.word_in_tags("yearly", tags)) {
    num_days = 365;
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
if (tp.user.word_in_tags("daily", tags)) {
    tR += `
## 📓 Journal

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

## 🔗 Backlinks

`;
} else if (tp.user.word_in_tags("weekly", tags)) {
    tR += `
## 🆕 Notes Created

## 🍗 Inputs

## 💩 Outputs

## 🧛‍♂🧛‍♀ Meetings

## 💡 Capture

## 📥 Action Items

`;
} else if (tp.user.word_in_tags("monthly", tags)) {
    tR += `
## 🏆 Brag

## 🆕 Notes Created

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

`;
} else if (tp.user.word_in_tags("quarterly", tags)) {
    tR += `
## 🏆 Brag

## 🍗 Inputs

## 💩 Outputs

## 💡 Capture

## 📥 Action Items

`;
} else if (tp.user.word_in_tags("yearly", tags)) {
    tR += `
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
