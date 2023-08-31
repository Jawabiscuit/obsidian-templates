<%*
const dv = app.plugins.plugins["dataview"].api;

let today = tp.user.prefixed_date(tp.file.title);
let title = tp.file.title;
let folder = tp.file.folder(relative=true);
let prev_note = "";
let query = `
    LIST WITHOUT ID file.name
    FROM "${folder}"
    WHERE file.name != "${title}" AND file.day < date("${today}")
    WHERE regexreplace(file.name, "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2") = regexreplace("${title}", "^([0-9]+-[0-9]+-[0-9]+)(.*)", "$2")
    SORT file.day DESC
    LIMIT 1
`;
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    prev_nav = te.value.split(" ")[1].trim();
} else {
    prev_nav = "None";
}

let prev_day = tp.user.prefixed_date(prev_nav);
-%>
### ◀ [[<% prev_nav %>#👷🚧 Updates|Previous]]

![[<% prev_nav %>#^<% prev_day %>-updates]]

### 📆 Today

- 

^<% today %>-updates

> [!tldr] 
>

^<% today %>-tldr