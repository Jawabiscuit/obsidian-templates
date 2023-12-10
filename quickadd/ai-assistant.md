<%*
const dv = app.plugins.plugins["dataview"].api;
newNoteData = await tp.user.newNoteData(tp, dv);
-%>
<%* tR += "---" %>
title: <% newNoteData.title %>
subtitle: <% newNoteData.subtitle %>
type: <% newNoteData.type %>
status: <% newNoteData.status %>
tags: <% newNoteData.tags.length ? "\n  - " + newNoteData.tags.join("\n  - ") : null %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
modification date: <% tp.file.last_modified_date("YYYY-MM-DD HH:mm:ss") %>
aliases: <% newNoteData.aliases.length ? "\n  - " + newNoteData.aliases.join("\n  - ") : null %>
cssClasses: <% newNoteData.cssClasses.length ? "\n  - " + newNoteData.cssClasses.join("\n  - ") : null %>
<%* tR += "---" %>
# <% newNoteData.alias %>
%%
<%* if (newNoteData.project) tR += `${newNoteData.project}\n` -%>
<%* if ("{{value:prompt_template}}") tR += await tp.file.include(`{{value:prompt_template}}\n`) %>
%%
# <% newNoteData.alias %>

---

{{value:output}}
