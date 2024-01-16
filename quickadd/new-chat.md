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
series: <% newNoteData.series %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
modification date: <% tp.file.last_modified_date("YYYY-MM-DD HH:mm:ss") %>
aliases: <% newNoteData.aliases.length ? "\n  - " + newNoteData.aliases.join("\n  - ") : null %>
cssClasses: <% newNoteData.cssClasses.length ? "\n  - " + newNoteData.cssClasses.join("\n  - ") : null %>
temperature: {{value:temp}}
top_p: {{value:top_p}}
max_tokens: {{value:512,1024,2048,4096}}
presence_penalty: {{value:presence_p}}
frequency_penalty: {{value:frequency_p}}
stream: {{value:stream}}
stop:
n: 1
model: {{value:model}}
system_commands:
    - "{{value:system_prompt}}"
template: "{{value:prompt_template}}"
<%* tR += "---" %>
# <% newNoteData.alias %>
%%
<%* if (newNoteData.project) tR += `${newNoteData.project}\n` -%>
%%
<%* if ("{{value:prompt_template}}") tR += await tp.file.include(`{{value:prompt_template}}`) + '\n' %>
```js quickadd
let model = this.variables["model"];
let models = this.variables["models"];
if (model.toLowerCase() === "ask")
    this.variables["model"] = await this.quickAddApi.suggester(models, models);
```