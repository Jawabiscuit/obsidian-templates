const SYSTEM_PROMPTS = "Path to system prompts";
const PROMPT_TEMPLATES = "Path to prompt templates";
const MODEL = "Model";
const STREAM = "Stream assistant messages";
const SYSTEM_PROMPT = "System prompt.";
const TEMPERATURE = "Sampling temperature (0-2.0). 0 is less creative, 2 is more creative and prone to hallucination";
const TOP_P = "Top P (0-1.0). Usually set to a high value (like 0.75) with the purpose of limiting the long tail of low-probability tokens that may be sampled.";
const FREQUENCY_PENALTY = "Frequency Penalty (0-2.0). How much to penalize new tokens based on their existing frequency in the output. Higher number = less repitition";
const PRESENCE_PENALTY = "Presence Penalty (0-2.0). How much to penalize new tokens based on their appearance in the output. Higher number = less repitition";
const MAX_TOKENS = "Max number of tokens to generate in the output. 1 token ~ 4 chars. Check model context length, at minimum, model_ctx <= system_prompt + prompt_template / 2";
const STOP = "Stop character (E.g. DALL-E requires this)";
const MODELS = [
    "Ask",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-4",
    "gpt-4-32k",
    "gpt-4-1106-preview",
    "text-davinci-003",
];

module.exports = {
    entry: run,
    settings: {
        name: `Chat Parameters`,
        author: `Jonas Avrin`,
        options: {
            [PROMPT_TEMPLATES]: {
                type: "text",
                defaultValue: "_templates/chat/prompt",
                placeholder: "_templates/chat/prompt",
            },
            [SYSTEM_PROMPTS]: {
                type: "text",
                defaultValue: "_templates/chat/system",
                placeholder: "_templates/chat/system",
            },
            [MODEL]: {
                type: "dropdown",
                defaultValue: "Ask",
                options: MODELS,
            },
            [TEMPERATURE]: {
                type: "text",
                defaultValue: 0.1,
                placeholder: 0.1,
            },
            [TOP_P]: {
                type: "text",
                defaultValue: 1.0,
                placeholder: 1.0,
            },
            [FREQUENCY_PENALTY]: {
                type: "text",
                defaultValue: 1.0,
                placeholder: 1.0,
            },
            [PRESENCE_PENALTY]: {
                type: "text",
                defaultValue: 1.0,
                placeholder: 1.0,
            },
            [STREAM]: {
                type: "checkbox",
                defaultValue: true,
            },
            [SYSTEM_PROMPT]: {
                type: "format",
                defaultValue: "",
                placeholder: "System prompt - Don't use with system prompt[s] option above",
            },
            [MAX_TOKENS]: {
                type: "text",
                defaultValue: null,
                placeholder: 4096,
            },
            [STOP]: {
                type: "text",
                defaultValue: "",
                placeholder: "Has no effect",
            },
        },
    },
};

// eslint-disable-next-line require-jsdoc
async function run(params, settings) {
    const API = params.quickAddApi;

    if (settings[PROMPT_TEMPLATES] && !settings[PROMPT_TEMPLATES].endsWith("/")) settings[PROMPT_TEMPLATES] += "/";
    const templates = params.app.vault.getMarkdownFiles()
        .filter((p) => p.path.startsWith(settings[PROMPT_TEMPLATES]))
        .sort((p) => p.stat.mtime, "desc");
    const template = await API.suggester((t) => t.basename, templates);
    if (!template)
        new Notice(`No prompt template selected.`);

    let qcSysText;
    if (!settings[SYSTEM_PROMPT]) {
        if (settings[SYSTEM_PROMPTS] && !settings[SYSTEM_PROMPTS].endsWith("/"))
            settings[SYSTEM_PROMPTS] += "/";
        const sysPrompts = params.app.vault.getMarkdownFiles()
            .filter((p) => p.path.startsWith(settings[SYSTEM_PROMPTS]))
            .sort((p) => p.stat.mtime, "desc");
        const sysPrompt = await API.suggester((t) => t.basename, sysPrompts);
        if (!sysPrompt)
            new Notice(`No system prompt selected.`);
        const sysText = sysPrompt ? await app.vault.cachedRead(sysPrompt) : null;
        if (!sysText)
            new Notice(`Empty system prompt.`);
        else
            qcSysText = sysText.replace(/  +/g, " ").replace(/\n/g, "");
    } else {
        qcSysText = settings[SYSTEM_PROMPT];
    }

    if (MODELS.includes("Ask"))
        MODELS.remove("Ask");

    params.variables["prompt_template"] = template ? params.app.fileManager.generateMarkdownLink(template, "") : null;
    params.variables["model"] = settings[MODEL];
    params.variables["models"] = MODELS;
    params.variables["temp"] = settings[TEMPERATURE];
    params.variables["top_p"] = settings[TOP_P];
    params.variables["frequency_p"] = settings[FREQUENCY_PENALTY];
    params.variables["presence_p"] = settings[PRESENCE_PENALTY];
    params.variables["stream"] = settings[STREAM];
    params.variables["system_prompt"] = qcSysText;
    params.variables["max_tokens"] = settings[MAX_TOKENS];
    // Don't want prompt (default null)
    // params.variables["stop"] = settings[STOP];
}
