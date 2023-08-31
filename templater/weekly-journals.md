<%*
const dv = app.plugins.plugins["dataview"].api;
let today = tp.user.prefixed_date(tp.file.title);
-%>
<%*
let query = `
    LIST from "journal"
    WHERE file.name != this.file.name
    WHERE file.day <= date("${today}")
    WHERE file.day >= date("${today}") - dur(7 days)
    WHERE !contains(file.name, "dataview-sandbox")
    WHERE !contains(file.name, "weekly-review")
    WHERE !contains(file.name, "monthly-review")
    WHERE !contains(file.name, "quarterly-review")
    WHERE !contains(file.name, "yearly-review")
    SORT file.name DESC
`;
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None";
}
%>

^<% today %>-weekly-output-reference

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

