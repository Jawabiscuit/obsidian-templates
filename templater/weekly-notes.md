<%*
const dv = app.plugins.plugins["dataview"].api;
let today = tp.user.prefixed_date(tp.file.title);
-%>
<%*
let query = `
    LIST
    WHERE file.name != this.file.name
    WHERE file.day <= date("${today}")
    WHERE file.day >= date("${today}") - dur(7 days)
    WHERE file.mtime >= date("${today}") - dur(7 days)
`;
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
%>
^<% today %>-weekly-notes

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```