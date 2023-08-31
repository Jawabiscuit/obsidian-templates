<%*
const dv = app.plugins.plugins["dataview"].api;
let today = tp.user.prefixed_date(tp.file.title);
let query = `
    LIST from "content/posts"
    WHERE file.day = date("${today}")
    SORT file.name DESC
`;
-%>
<%*
let te = await dv.queryMarkdown(query);
if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% today %>-daily-output

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```