<%*
const dv = app.plugins.plugins["dataview"].api;
let today = tp.user.prefixed_date(tp.file.title);
-%>
<%*
let query = `
    TABLE rows.L.text as "Input"
    FROM "journal" OR "meeting" OR "reference" OR "confluence"
    WHERE file.name != this.file.name
    WHERE !contains(file.name, "dataview-sandbox")
    WHERE !contains(file.name, "weekly-review")
    WHERE !contains(file.name, "monthly-review")
    WHERE !contains(file.name, "quarterly-review")
    WHERE !contains(file.name, "yearly-review")
    WHERE file.day <= date("${today}")
    WHERE file.day >= date("${today}") - dur(7 days)
    WHERE file.mtime >= date("${today}") - dur(7 days)
    FLATTEN file.lists AS L
    WHERE !L.status
    WHERE contains(meta(L.section).subpath, "Reference") OR contains(meta(L.section).subpath, "Resources")
    GROUP BY file.link
`;
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
%>
^<% today %>-weekly-input

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```