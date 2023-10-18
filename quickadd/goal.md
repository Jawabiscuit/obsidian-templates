---
title: {{VALUE:Goal Alias}}
type: goal
status: {{VALUE:wtg,ip,fin,hld,cmpt,blkd,na}}
tags: goal
series: false
created: {{DATE:"YYYY-MM-DD HH:mm"}}
modification date: {{DATE:"dddd Do MMMM YYYY HH:mm:ss"}}
reason: {{VALUE:Why this goal?}}
timespan:
    {{VALUE:10 Years, 5 Years, 3 Years, 1 Year, 6 Months, 1 Month, 1 Week}}
aliases:
    - {{VALUE:Goal}}
    - {{VALUE:Goal Alias}}
---
```dataviewjs
const projects = dv.current().file.inlinks.where(p => { const mp = dv.page(p.path); return mp.tags?.includes('project') && mp.status === 'ip'});

if (projects.length > 0)
{
    dv.header(4, projects.length > 1 ? "Projects" : "Project");
    dv.list(projects)
}
```
%%
Progress:: `$= dv.view('progress', {file: '{{DATE}}-{{VALUE:Goal}}'})`
Target:: `$= dv.view('target', {file: '{{DATE}}-{{VALUE:Goal}}'})`
Bar:: `$= dv.view('total-progress-bar', {file: '{{DATE}}-{{VALUE:Goal}}'})`
%%

## 🖼 What Does Success Look Like

## 🏆 Related Core Values

## 🎯 Related Goals

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
