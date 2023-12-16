module.exports = async params => {
    const activeFile = params.app.workspace.getActiveFile(); // TFile
    if (!activeFile) {
        new Notice("No active file", 5000);
        return;
    }

    const {getPropertiesInFile} = params.app.plugins.plugins["metaedit"].api;
    const properties = await getPropertiesInFile(activeFile);

    const propertyChoice = await params.quickAddApi.suggester(p => p.key, properties);
    if (!propertyChoice)
        return;

    let value = propertyChoice.content; // any

    if (Array.isArray(value) && value.length)
        value = await params.quickAddApi.suggester(value, value);

    if (!value)
        return;
    if (await params.quickAddApi.yesNoPrompt(`Rename ${activeFile.name} -> ${value} ?`))
        // Either a TFile or a TFolder
        await app.fileManager.renameFile(activeFile, `${activeFile.parent.path}/${value}.md`);
};
