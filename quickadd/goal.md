---
reason: {{VALUE:Why this goal?}}
type: goal
status: {{VALUE:todo,wtg,ip,fin,hld,cmpt,blkd,na}}
tags: goal
series: false
created: {{DATE:"YYYY-MM-DD HH:mm"}}
modification date: {{DATE:"dddd Do MMMM YYYY HH:mm:ss"}}
timespan:
    {{VALUE:10 Years, 5 Years, 3 Years, 1 Year, 6 Months, 3 Months, 1 Month, 1 Week}}
aliases:
    - {{VALUE:♊ Goal Alias}}
    - {{VALUE:🎯 Goal}}
---
%%
projects::`$= const projects = dv.page('{{DATE}}-{{VALUE:🎯 Goal}}').file.inlinks.where(p => {const mp = dv.page(p.path); return mp.tags?.includes('project')}); if (projects.length > 0) { dv.header(4, projects.length > 1 ? "Projects" : "Project"); dv.list(projects); }`
progress:: `$= dv.view('progress', {file: '{{DATE}}-{{VALUE:🎯 Goal}}'})`
target:: `$= dv.view('target', {file: '{{DATE}}-{{VALUE:🎯 Goal}}'})`
bar:: `$= dv.view('total-progress-bar', {file: '{{DATE}}-{{VALUE:🎯 Goal}}'})`
%%
# {{VALUE:♊ Goal Alias}}

## 🖼 What Does Success Look Like

## 🏆 Related Core Values

## 🕸 Related Goals

## 💭 Ideas

## 🏗 Created projects
```dataviewjs
const pages = dv.current().file.inlinks.where(p => dv.page(p.path).tags?.includes('project'));

dv.table(["Project", "Status", "Completed", "Tasks"], pages.map(p => {
	const page = dv.page(p.path);
	const tasks = page.file.tasks;
	return [
		page.file.link,
		page.status,
		tasks.where(t => t.fullyCompleted === true).length,
		tasks.length
	]
}));
```
