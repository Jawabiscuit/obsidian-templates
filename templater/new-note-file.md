<%*
// Variable Declarations
const dv = app.plugins.plugins["dataview"].api;
const regex = /^(\d{4}-\d{2}-\d{2})-/;

let title = tp.file.title;
let type = "journal";
let status = "ip";
let series = false;
let tags = "example";

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

if (title.startsWith("Untitled")) {
    title = tp.date.now("YYYY-MM-DD") + "-" + title;
    title = await tp.system.prompt("Title", title.toLowerCase());
    type = await tp.system.prompt("Type", type);
    tags = await tp.system.prompt("Tags", tags);
}

// End Prompt

// Note Organization

await tp.file.rename(title + "-temp");

// File note into proper directory
// Journals
if (type == "journal") {
    await tp.file.move("journal/" + title);
    series = true;
}
else if (type == "reference") {
    await tp.file.move("reference/" + title);
}
// Meetings
else if (type == "meeting") {
    answer = await tp.system.prompt("Series? (\"Y/n\")", "y");
    if (answer == "y") {
        series = true;
    }
    await tp.file.move("meeting/" + title);
    if (!tp.user.word_in_tags("meeting", tags)) {
        tags += " meeting"
    }
}
// Todo checklists
else if (type == "todo") {
    await tp.file.move("todo/" + title);
}

// End Note Organization
-%>
<%* tR += "---" %>
title: <% title %>
type: <% type %>
status: <% status %>
tags: <% tags %>
series: <% series %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
<%* tR += "---" %>
<%*
// Begin Progress Bar

let progress = null;
let file_date = new Date(title.match(regex)[1] + "T00:00");

if (tp.user.word_in_tags("daily", tags)) {
    progress = tp.user.make_progress_bar(file_date.getDay(), 7, size=7, label="Progress");
} else if (tp.user.word_in_tags("standup", tags)) {
    progress = tp.user.make_progress_bar(file_date.getDay(), 5, size=5, label="Progress");
}

if (
    tp.user.word_in_tags("standup", tags) ||
    tp.user.word_in_tags("daily", tags)
) {
    if (progress) {
        tR += `${progress}\n`;
    }
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

let prev_note = null;
let next_note = null;

if (series) {
    num_days = 1
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
        WHERE status = "${status}"
        WHERE file.name != "${title}" AND file.day < date("${today}")
        WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2")
        SORT file.day DESC
        LIMIT 1`
    );

    if (prev_note.value.length) {
        prev_note = prev_note.value.split(" ")[1].trim();
        prev_date = tp.user.prefixed_date(prev_note);
    } else {
        prev_date = tp.date.now("YYYY-MM-DD", num_days * -1, title, "YYYY-MM-DD")
        prev_note = `${prev_date}${title.split(today)[1]}`;
    }

    next_note = await dv.queryMarkdown(
       `LIST WITHOUT ID file.name
        WHERE status = "${status}"
        WHERE file.name != "${title}" AND file.day > date("${today}")
        WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)-(.+)", "$2")
        SORT file.day ASC
        LIMIT 1`
    );

    if (next_note.value.length) {
        next_note = next_note.value.split(" ")[1].trim();
    } else {
        next_date = await tp.system.prompt("Next date", tp.date.now("YYYY-MM-DD", num_days, title, "YYYY-MM-DD"));
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

let file_include = null;

if (tp.user.word_in_tags("standup", tags)) {
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
} else if (tp.user.word_in_tags("1on1", tags)) {
    tR += `
## ⌛ Prep

- 

## 🕚 Minutes
`;
    if (series) {
        tR += `
### ◀ [[${prev_note}#🕚 Minutes|Previous]]

![[${prev_note}#^${prev_date}-minutes]]

### 🕚 Today
`;}
    tR += `
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
} else if (status == "meeting") {
    tR += `
## 👨‍💼 Attendance

## 🕚 Minutes

## 💡 Capture

## 📥 Action Items

`;
} else if (status == "reference") {
    tR += `
## 📥 Action Items

## 🔗 Backlinks

`;
} else if (status == "todo") {
    file_include = "[[todo]]";
} else if (status == "journal") {
    if (tp.user.word_in_tags("daily", tags)) {
        file_include = "[[daily-journal]]";
    } else if (tp.user.word_in_tags("weekly", tags)) {
        file_include = "[[weekly-review]]";
    } else if (tp.user.word_in_tags("monthly", tags)) {
        file_include = "[[monthly-review]]";
    } else if (tp.user.word_in_tags("quarterly", tags)) {
        file_include = "[[quarterly-review]]";
    } else if (tp.user.word_in_tags("yearly", tags)) {
        file_include = "[[yearly-review]]";
    } else {
        tR += `
## 📚 Reference

## 📥 Action Items

## 🔗 Backlinks

`;
}}

if (file_include) {
    tR += await tp.file.include(file_include);
}

// End File Include
-%>

