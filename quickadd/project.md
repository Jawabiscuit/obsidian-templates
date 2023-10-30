---
title: {{VALUE:♊ Project Alias}}
subtitle: {{VALUE:Project Subtitle}}
type: project
status: {{VALUE:todo,wtg,ip,fin,hld,cmpt,blkd,na}}
tags:
    - project
series: false
created: {{DATE:"YYYY-MM-DD HH:mm"}}
modification date: {{DATE:"dddd Do MMMM YYYY HH:mm:ss"}}
aliases:
    - {{VALUE:♊ Project Alias}}
    - {{VALUE:🏗 New Project}}
---
%%
```js quickadd
const shouldConnectToGoal = await this.quickAddApi.yesNoPrompt(`Should this project be associated with a goal?`, 'Enabling this will give the project note a Goal property for auto-tracking progress of this project on the goal level.');

if (shouldConnectToGoal)
{
    const goalNotes = DataviewAPI.pages("#goal").where(
        (p) => !p.file.path.includes("template")
    ).values;
    const targetGoal = await this.quickAddApi.suggester(
        goalNotes.map((p) => (
            p.file.aliases.length ? p.file.aliases[0] : p.file.name)
            ),
        goalNotes
    );
    const targetGoalFile = app.vault.getAbstractFileByPath(targetGoal.file.path);
    let markdownLink = this.app.fileManager.generateMarkdownLink(
        targetGoalFile,
        ""
    );
    markdownLink = `${markdownLink.slice(0, markdownLink.length - 2)}|${targetGoal.aliases[0]}${markdownLink.slice(markdownLink.length - 2)}`;
    return `goal:: ${markdownLink}`;
} else {
    return "goal:: ";
}
```
```js quickadd
const shouldProjectTrackProgress = await this.quickAddApi.yesNoPrompt(`Should this project track progress via markdown tasks?`, 'Enabling this will give the project note a Bar property, similarly to auto-tracked goals. The tasks are auto-tracked, so each time you check one off, you make progress.');

if (shouldProjectTrackProgress)
{
    return "bar:: `$= dv.view('total-progress-bar', {file: '{{DATE}}-{{VALUE:🏗 New Project}}'})`";
}
```
img::
%%
`=this.bar`
# {{VALUE:♊ Project Alias}}
```dataviewjs
const journals = dv.current().file.inlinks.where(p => { const mp = dv.page(p.path); return (mp.tags?.includes('journal') || mp.type === 'journal')});

if (journals.length > 0)
{
    dv.header(2, journals.length > 1 ? "📓 Journals" : "📓 Journal");
    dv.list(journals)
}
```
```dataviewjs
const resources = dv.current().file.inlinks.where(p => { const mp = dv.page(p.path); return (mp.type === 'reference' || mp.type === 'video' || mp.type === 'document')});

if (resources.length > 0)
{
    dv.header(2, "🔗 Resources");
    dv.list(resources)
}
```
## 📥 Action Items
- [ ] 