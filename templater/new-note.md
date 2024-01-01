<%*
const dv = app.plugins.plugins["dataview"].api;
const statuses = self.require("_modules/status.js");
const utils = self.require("_modules/text.js");
const newNoteData = await tp.user.newNoteData(tp, dv, utils);
-%>
<%* tR += "---" %>
title: <% newNoteData.title %>
<%* if (newNoteData.type == "goal") { tR += `reason: ${newNoteData.subtitle}\n`; } else { tR += `subtitle: ${newNoteData.subtitle}\n`; } -%>
type: <% newNoteData.type %>
status: <% statuses.activeValues[0] %>
tags: <% newNoteData.tags.length ? "\n  - " + newNoteData.tags.join("\n  - ") : null %>
series: <% newNoteData.series %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
modification date: <% tp.file.last_modified_date("YYYY-MM-DD HH:mm:ss") %>
<%* if (newNoteData.timeSpan) tR += `timespan: ${newNoteData.timeSpan}\n` -%>
aliases: <% newNoteData.aliases.length ? "\n  - " + newNoteData.aliases.join("\n  - ") : null %>
cssClasses: <% newNoteData.cssClasses.length ? "\n  - " + newNoteData.cssClasses.join("\n  - ") : null %>
<%* tR += "---" %>
<%* if (newNoteData.dailyProgress) tR += `${newNoteData.dailyProgress}\n` -%>
# <% newNoteData.alias %>
%%
<%* if (newNoteData.goal) tR += `${newNoteData.goal}\n` -%>
<%* if (newNoteData.project) tR += `${newNoteData.project}\n` -%>
<%* if (newNoteData.projectLV) tR += `${newNoteData.projectLV}\n` -%>
<%* if (newNoteData.projectTV) tR += `${newNoteData.projectTV}\n` -%>
<%* if (newNoteData.nav) tR += `${newNoteData.nav}\n` -%>
<%* if (newNoteData.projectDV) tR += `${newNoteData.projectDV}\n` -%>
<%* if (newNoteData.overview) tR += `${newNoteData.overview}\n` -%>
<%* if (newNoteData.taskProgress) tR += `${newNoteData.taskProgress}\n` -%>
<%* if (newNoteData.target) tR += `${newNoteData.target}\n` -%>
<%* if (newNoteData.progress) tR += `${newNoteData.progress}\n` -%>
<%* if (newNoteData.img) tR += `${newNoteData.img}\n` -%>
%%
<%* if (newNoteData.nav) tR+='`=this.nav`\n' -%>
<%* if (newNoteData.taskProgress && newNoteData.type == "project") tR += '`=this.bar`\n' -%>
<%* if (newNoteData.projectDV) tR += '`=this.project-dv`\n' -%>
<%* if (newNoteData.includeFile) tR += `${newNoteData.includeFile}\n` -%>
<%* if (newNoteData.taskProgress && newNoteData.type != "goal") tR += '## 📥 Action Items\n' -%>
<%* if (newNoteData.type === "daily" && newNoteData.taskProgress) tR += await tp.file.include("[[day-planner]]") + '\n' -%>
<%* if (newNoteData.overview) tR += '\n---\n\n`=this.overview`\n' -%>
<%* if (newNoteData.projectTV) tR += '\n---\n\n`=this.project-tv`\n' -%>
