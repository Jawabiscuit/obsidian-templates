<%*
const dv = app.plugins.plugins["dataview"].api;
const today = tp.user.prefixed_date(tp.file.title);
const tags = tp.file.tags;
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
const p_tags = ["#daily", "#weekly", "#monthly", "#quarterly", "#yearly"];

let period;
for (let p of p_tags) {
    if (p == "#daily") {
        if (tags.includes(p)) {
            period = "d";
        }
    }
    if (p == "#weekly") {
        if (tags.includes(p)) {
            period = "w";
        }
    }
    if (p == "#monthly") {
        if (tags.includes(p)) {
            period = "m";
        }
    }
    if (p == "#quarterly") {
        if (tags.includes(p)) {
            period = "q";
        }
    }
    if (p == "#yearly") {
        if (tags.includes(p)) {
            period = "y";
        }
    }
}

let p_items = [];
for (let i = 0; i < p_tags.length; i++){
    log(p_tags[i].split("#"));
    p_items.push(p_tags[i].split("#").pop());
}

period ?? await tp.system.suggester(
    items=p_items,
    text_items=["d", "w", "m", "q", "y"]
);

const type = await tp.system.suggester(
    items=["all notes", "inputs", "outputs", "journals"],
    text_items=["n", "i", "o", "j"]
);
// End Prompts
-%>
<%*
let num_days = 0;

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
-%>
<%*
let query;
let suffix;

const folders = [
    "chat",
    "journal",
    "meeting",
    "reference",
    "confluence",
    "canvas",
    "dataview",
    "excalidraw",
];

quoted_folders = folders.map(folder => `"${folder}"`).join(" OR ");

switch (type) {
    case "n":
        query = `
            LIST
            WHERE file.name != this.file.name
            WHERE file.day <= date("${today}")
            WHERE file.day >= date("${today}") - dur(${num_days} days)
            WHERE file.mtime >= date("${today}") - dur(${num_days} days)
        `;
        suffix = "notes";
        break;
    case "i":
        query = `
            TABLE rows.L.text as "Input"
            FROM "journal" OR "meeting" OR "reference" OR "confluence"
            WHERE file.name != this.file.name
            WHERE !econtains(file.tags, "#dv")
            WHERE !econtains(file.tags, "#dv-sandbox")
            WHERE !econtains(file.tags, "#review")
            WHERE file.day <= date("${today}")
            WHERE file.day >= date("${today}") - dur(${num_days} days)
            WHERE file.mtime >= date("${today}") - dur(${num_days} days)
            FLATTEN file.lists AS L
            WHERE !L.status
            WHERE icontains(meta(L.section).subpath, "reference") OR icontains(meta(L.section).subpath, "resources")
            GROUP BY file.link
        `;
        suffix = "inputs";
        break;
    case "o":
        query = `
            LIST
            FROM ${quoted_folders}
            WHERE file.day <= date("${today}")
            AND file.day >= date("${today}") - dur(${num_days} days)
            AND file.name != this.file.name
            SORT file.name DESC
        `;
        suffix = "outputs";
        break;
    case "j":
        query = `
            LIST
            FROM "journal"
            WHERE file.name != this.file.name
            WHERE file.day <= date("${today}")
            WHERE file.day >= date("${today}") - dur(7 days)
            WHERE !econtains(file.tags, "#dv")
            WHERE !econtains(file.tags, "#dv-sandbox")
            WHERE !econtains(file.tags, "#review")
            SORT file.name DESC
        `;
        suffix = "journals";
        break;
}
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
%>
<%*
switch (period) {
    case "d":
        tR += `^${today}-daily-${suffix}`;
        break;
    case "w":
        tR += `^${today}-weekly-${suffix}`;
        break;
    case "m":
        tR += `^${today}-monthly-${suffix}`;
        break;
    case "q":
        tR += `^${today}-quarterly-${suffix}`;
        break;
    case "y":
        tR += `^${today}-yearly-${suffix}`;
        break;
}
%>

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```