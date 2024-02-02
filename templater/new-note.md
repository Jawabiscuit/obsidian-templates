<%*
const {newNoteData} = self.require("_modules/note.js");
const fields = await newNoteData(tp);
-%>
<%* tR += "---" %>
<%* fields.frontmatter.length ? tR += fields.frontmatter.join("\n") + "\n" : null -%>
<%* tR += "---" %>
# <% fields.alias || tp.file.title %>
%%
<%* fields.inlineDV.length ? tR += fields.inlineDV.join("\n") + "\n" : null -%>
<%* fields.inlineJS.length ? tR += fields.inlineJS.join("\n") + "\n" : null -%>
%%
<%* fields.inlineDQL.length ? tR += fields.inlineDQL.join("\n") + "\n" : null -%>
<%* fields.body.length ? tR += fields.body.join("\n") + "\n" : null -%>
<%* fields.includeFile ? tR += "\n" + await tp.file.include(`${fields.includeFile}`) + "\n" : null -%>
<%* fields.actions ? tR += fields.actions + "\n" : null -%>
<%* fields.dayPlanner ? tR += "\n" + await tp.file.include(`${fields.dayPlanner}`) + "\n" : null -%>
<%* fields.lowerInlineDQL.length ? tR += "\n---\n" + fields.lowerInlineDQL.join("\n") + "\n" : null -%>