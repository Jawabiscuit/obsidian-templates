<%*
const dv = app.plugins.plugins["dataview"].api;

let today = tp.user.prefixed_date(tp.file.title);
let title = tp.file.title;
let folder = tp.file.folder(relative=true);
let next_note = "";
let query = `
    LIST WITHOUT ID file.name
    FROM "${folder}"
    WHERE file.name != "${title}" AND file.day > date("${today}")
    WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2")
    SORT file.day ASC
    LIMIT 1
`;
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    next_note = te.value.split(" ")[1].trim();
} else {
    next_note = tp.user.file_name_to_nav(tp.file.title, 1);
}

// tR += next_note;
-%>
[[<% next_note %>]] ▶