<%*
const category = self.require("_modules/category.js");
const sortedCategories = Object.fromEntries(Object.entries(category).sort((a, b) => a[0].localeCompare(b[0])));

/**
 * Provides a document section title suggester that allows creating custom sections.
 *
 * @param {object} tp - Templater object
 * @return {Promise<string>} The selected section name
 */
async function sectionSuggester(tp) {
    const section = await tp.system.suggester(
        ["✨Custom✨", ...Object.keys(sortedCategories)],
        ["✨Custom✨", ...Object.values(sortedCategories)],
        null,
        "Choose section");
    if (section === "✨Custom✨") {
        return await tp.system.prompt("Custom Section Name");
    }
    else {
        const name = await tp.system.suggester(
            [section.header, section.headerPlural],
            [section.header, section.headerPlural],
            null,
            "Choose section name");
        return `${section.icon} ${name}`;
    }
}
-%>
## <% sectionSuggester(tp) %>
