<%*
const category = self.require("_modules/category.js");

tags = ["vfx-job", "games-job"];

const categories = Object.fromEntries(
    Object.entries(category)
        .filter(([k, _]) => tags.includes(k))
);

const choices = Object.fromEntries(
    Object.entries(categories)
        .map(([k, v]) => {
            return [k, v["niceName"]]
        })
);

const chosen = await tp.user.multiSuggester(
        tp,
        Object.values(choices),
        Object.keys(choices),
        false,
        "Choose type (Esc when finished)",
    )

-%>
posts::`$= dv.view("job-posts", {file: "<% tp.file.title %>", tags: <% JSON.stringify(chosen) %>})`