<%*
const dv = app.plugins.plugins["dataview"].api;
let end_day = tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD");
let start_day = tp.date.now("YYYY-MM-DD", -5, tp.file.title, "YYYY-MM-DD");
let query;
-%>
#### Standup

<%*
query = `
    LIST from #standup
    WHERE file.day <= date(${end_day})
    WHERE file.day >= date(${start_day})
    WHERE file.mtime >= date(${start_day})
    SORT file.name DESC
`;
let te = await dv.queryMarkdown(query);
if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% end_day %>-weekly-meetings-standup

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

#### 1:1s

<%*
query = `
    LIST from #1on1
    WHERE file.day <= date(${end_day})
    WHERE file.day >= date(${start_day})
    WHERE file.mtime >= date(${start_day})
    SORT file.name DESC
`;
te = await dv.queryMarkdown(query);
if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% end_day %>-weekly-meetings-1on1

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

#### Team

<%*
query = `
    LIST from #meeting
    WHERE contains(title, "pipeline-team")
    WHERE file.day <= date(${end_day})
    WHERE file.day >= date(${start_day})
    WHERE file.mtime >= date(${start_day})
    SORT file.name DESC
`;
te = await dv.queryMarkdown(query);
if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% end_day %>-weekly-meetings-team

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

#### Other

<%*
query = `
    LIST from #meeting
    WHERE !contains(tags, "standup") AND !contains(tags, "1on1")
    WHERE !contains(title, "pipeline-team")
    WHERE file.day <= date(${end_day})
    WHERE file.day >= date(${start_day})
    WHERE file.mtime >= date(${start_day})
    SORT file.name DESC
`;
te = await dv.queryMarkdown(query);
if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% end_day %>-weekly-meetings-other

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```