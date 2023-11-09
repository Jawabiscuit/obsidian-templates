<%*
const dv = app.plugins.plugins["dataview"].api;
newNoteData = await tp.user.newNoteData(tp, dv);
-%>
<%* tR += "---" %>
title: <% newNoteData.title %>
type: <% newNoteData.type %>
status: <% newNoteData.status %>
tags: <% newNoteData.tags.length ? "\n    - " + newNoteData.tags.join("\n    - ") : null %>
series: <% newNoteData.series %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
aliases: <% newNoteData.aliases.length ? "\n    - " + newNoteData.aliases.join("\n    - ") : null %>
<%* tR += "---" %>
<%* if (newNoteData.dailyProgress) tR += `${newNoteData.dailyProgress}\n` -%>
%%
<%* if (newNoteData.project) tR += `${newNoteData.project}\n` -%>
<%* if (newNoteData.nav) tR += `${newNoteData.nav}\n` -%>
<%* if (newNoteData.taskProgress) tR += `${newNoteData.taskProgress}\n` -%>
<%* if (newNoteData.img) tR += `${newNoteData.img}\n` -%>
%%
<%* if (newNoteData.taskProgress) tR += '`=this.bar`\n' -%>
# <% newNoteData.alias %>
<%* if (newNoteData.nav) tR+='`=this.nav`\n' -%>
<%* if (newNoteData.includeFile) tR += `${newNoteData.includeFile}\n` -%>
<%* if (newNoteData.taskProgress) tR += '## 📥 Action Items\n' -%>
<%* if (newNoteData.type === "daily") tR += await tp.file.include("[[day-planner]]") + '\n' -%>