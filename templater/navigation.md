<%*
// Begin Functions

function log(msg) {
    console.log(msg);
}

// End Functions
-%>
<%*
// Begin Navigation

const dv = app.plugins.plugins["dataview"].api;
const regex = /^(\d{4}-\d{2}-\d{2})/;

let prev_note;
let next_note;
let prev_date;
let matches;

let num_days = 1;
let tags = tp.file.tags;
let today = tp.date.now("YYYY-MM-DD", 0, title, "YYYY-MM-DD");
let title = tp.file.title;
let folder = tp.file.folder(relative=true);

if (tp.frontmatter.series) {

    if (tags.includes("#weekly")) {
        num_days = 7;
    } else if (tags.includes("#monthly")) {
        num_days = 30;
    } else if (tags.includes("#quarterly")) {
        num_days = 90;
    } else if (tags.includes("#yearly")) {
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
        WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)(.+)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)(.+)", "$2")
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

    tR += `◀ [[${prev_note}]] | [[${next_note}]] ▶\n`;
} else {
    tR += "\n";
}

// End Navigation
-%>