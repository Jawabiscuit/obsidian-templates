const statuses = self.require("_modules/status.js");
const categories = self.require("_modules/category.js");

module.exports = async params => {
    const {autoprop, getPropertiesInFile, update} = params.app.plugins.plugins["metaedit"].api;
    const activeFile = params.app.workspace.getActiveFile(); // TFile
    if (!activeFile) {
        new Notice("No active file", 5000);
        return;
    }

    const properties = await getPropertiesInFile(activeFile);
    const prop = properties.find(p => p.key == "tags");

    let statusType;
    for (const item of prop.content) {
        for (const key of Object.keys(categories)) {
            if (Object.hasOwn(categories, key)) {
                if (item == key) {
                    statusType = categories[key].statusType;
                    break;
                }
            }
        }
    }

    if (!statusType) {
        console.warn("Note category not recognized");
        const status = await params.quickAddApi.suggester(
            Object.keys(statuses.all), Object.values(statuses.all));
        await update(statuses.propName, status, activeFile);
    } else {
        const status = await params.quickAddApi.suggester(
            Object.keys(statuses[statusType]), Object.values(statuses[statusType]));
        await update(statuses.propName, status, activeFile);
    }
};
