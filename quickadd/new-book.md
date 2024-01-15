<%*
const dv = app.plugins.plugins["dataview"].api;
const utils = self.require("_modules/text.js");
const category = self.require("_modules/category.js");
const {template} = self.require("_modules/template.js");
const newNoteData = await tp.user.newNoteData(tp, dv, utils, category, template);
-%>
<%* tR += "---" %>
title: <% newNoteData.title %>
subtitle: <% newNoteData.subtitle %>
type: <% newNoteData.type %>
status: <% newNoteData.status %>
tags: <% newNoteData.tags.length ? "\n  - " + newNoteData.tags.join("\n  - ") : null %>
series: <% newNoteData.series %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
modification date: <% tp.file.last_modified_date("YYYY-MM-DD HH:mm:ss") %>
<%* if (newNoteData.timeSpan) tR += `timespan: ${newNoteData.timeSpan}\n` -%>
aliases: <% newNoteData.aliases.length ? "\n  - " + newNoteData.aliases.join("\n  - ") : null %>
cssClasses: <% newNoteData.cssClasses.length ? "\n  - " + newNoteData.cssClasses.join("\n  - ") : null %>
<%* tR += "---" %>
# <% newNoteData.alias %>
%%
<%* if (newNoteData.project) tR += `${newNoteData.project}\n` -%>
<%* if (newNoteData.img) tR += `${newNoteData.img}\n` -%>
author:: {{VALUE:author}}
rating::
<%* if (newNoteData.journal) tR += `${newNoteData.journal}\n` -%>
<%* if (newNoteData.resource) tR += `${newNoteData.resource}\n` -%>
reviewed date:: [[<% tp.date.now("YYYY-MM-DD") %>]]
finished year:: [[<% tp.date.now("gggg") %>]]
%%
<%* if (newNoteData.includeFile) tR += `${newNoteData.includeFile}\n` -%>
<%* if (newNoteData.journal) tR += '`=this.journal`\n' -%>
<%* if (newNoteData.resource) tR += '`=this.resource`\n' -%>