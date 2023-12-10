````markdown
Here is a list of Obsidian (Markdown) links to pages related to {{value:link}}.
Please use these to give me 10 writing prompts in bullet form concerning {{value:link}}.

Use the links provided when generating the writing prompts.

```js quickadd
// Use a shorthand for the DataView API
const dv = DataviewAPI;
// Prompt user for link to MOC note
const targetLink = await this.quickAddApi.inputPrompt(
    'MoC Link',
    "Enter a link we'll use to get all notes linked to it."
);
this.variables['link'] = targetLink;

// Get a list of all notes linked to the target link
const pages = dv.pages(targetLink).values;
// Format the notes as [[links]]
const links = pages.map((f) => {
    const tf = app.vault.getAbstractFileByPath(f.file.path);
    return app.fileManager.generateMarkdownLink(tf, '/');
});

// Join the list such that it is in text format, and there is one link per line
return links.join('\n');
```