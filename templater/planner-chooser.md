<%*
const choices = [
    "🔳",
    "🎮 Game Dev",
    "👨‍🎓 Learning",
    "✏ Skills",
    "💻 Research",
    "💻 Programming",
    "💪 Work Out",
    "🍗 Lunch",
    "💬 Interview",
    "🌐 Website",
    "🔮 Obsidian",
    "📰 News & Jobs",
    "🚗 Errands",
    "⏪ Review"];
const choice = await tp.system.suggester(
    items=choices, text_items=choices
);
tR += choice;
-%>