<%*
const dv = app.plugins.plugins["dataview"].api;
let today = tp.user.prefixed_date(tp.file.title);
-%>
<%*
let query = `
    LIST from "chat" or "reference" or "confluence"
    WHERE file.day <= date("${today}")
    WHERE file.day >= date("${today}") - dur(7 days)
    SORT file.name DESC
`;
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None";
}
-%>

^<% today %>-weekly-output-reference

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```
