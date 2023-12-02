<%*
const choices = [
    "🔳",
    "🎮 Game Dev",
    "👨‍🎓 Learning",
    "✏ Skills",
    "💪 Work Out",
    "🍗 Lunch",
    "💬 Interview",
    "🌐 Website",
    "🔮 Planning",
    "📰 News & Jobs",
    "🚗 Errands",
    "⏪ Review"];
const choice = await tp.system.suggester(
    items=choices, text_items=choices
);
tR += choice;
-%>