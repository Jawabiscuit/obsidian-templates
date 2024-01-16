<%*
const dv = app.plugins.plugins["dataview"].api;
const modalForm = app.plugins.plugins.modalforms.api;
const statuses = self.require("_modules/status.js");
const utils = self.require("_modules/text.js");
const category = self.require("_modules/category.js");
const duration = self.require("_modules/duration.js");
const {template} = self.require("_modules/template.js");
const newNoteData = await tp.user.newNoteData(tp, dv, utils, category, template, modalForm, duration);
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
%%
<%* if (newNoteData.project) tR += `${newNoteData.project}\n` -%>
%%
# <% newNoteData.alias %>
{{value:output}}
<%* if ("{{value:🔗 Prompt Template}}") tR += "\n%%\n## Prompt Template\n\n" + await tp.file.include("{{value:🔗 Prompt Template}}") + "\n%%\n" -%>