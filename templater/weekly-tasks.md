<%*  
const dv = app.plugins.plugins["dataview"].api;
let today = tp.user.prefixed_date(tp.file.title);
let query;
-%>
### 😃 Finished

#### Meetings

<%*
query = `
    TASK
    FROM "meeting"
    WHERE completed
    WHERE file.day <= date(${today})
    WHERE file.day >= date(${today}) - dur(7 days)
    SORT file.day DESC
    GROUP BY file.link
    SORT rows.file.day DESC
`;
let te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% today %>-weekly-tasks-finished-meetings

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

#### Reference

<%*
query = `
    TASK
    FROM "reference"
    WHERE !contains(file.tags, "dv")
    WHERE completed
    WHERE file.day <= date(${today})
    WHERE file.day >= date(${today}) - dur(7 days)
    SORT file.day DESC
    GROUP BY file.link
    SORT rows.file.day DESC
`;
te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% today %>-weekly-tasks-finished-reference

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

#### Journals

<%*
query = `
    TASK
    FROM "journal"
    WHERE !contains(file.tags, "dv")
    WHERE completed
    WHERE file.day <= date(${today})
    WHERE file.day >= date(${today}) - dur(7 days)
    SORT file.day DESC
    GROUP BY file.link
    SORT rows.file.day DESC
`;
te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% today %>-weekly-tasks-finished-journals

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

### 🧹 Unfinished

#### Meetings

<%*
query = `
    TASK
    FROM "meeting"
    WHERE status = " "
    WHERE text != ""
    WHERE file.day <= date(${today})
    WHERE file.day >= date(${today}) - dur(7 days)
    SORT file.day DESC
    GROUP BY file.link
    SORT rows.file.day DESC
`;
te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% today %>-weekly-tasks-unfinished-meetings

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

#### Reference

<%*
query = `
    TASK
    FROM "reference"
    WHERE !contains(file.tags, "dv")
    WHERE status = " "
    WHERE text != ""
    WHERE file.day <= date(${today})
    WHERE file.day >= date(${today}) - dur(7 days)
    SORT file.day DESC
    GROUP BY file.link
    SORT rows.file.day DESC
`;
te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% today %>-weekly-tasks-unfinished-reference

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```

#### Journals

<%*
query = `
    TASK
    FROM "journal"
    WHERE !contains(file.tags, "dv")
    WHERE status = " "
    WHERE text != ""
    WHERE file.day <= date(${today})
    WHERE file.day >= date(${today}) - dur(7 days)
    SORT file.day DESC
    GROUP BY file.link
    SORT rows.file.day DESC
`;
te = await dv.queryMarkdown(query);

if (te.value.length) {
    tR += te.value;
} else {
    tR += "None\n";
}
-%>

^<% today %>-weekly-tasks-unfinished-journals

> [!info]- dataview query
> ```
> <% query.split("\n").slice(1, query.split("\n").length - 1).join("\n> ") %>
> ```