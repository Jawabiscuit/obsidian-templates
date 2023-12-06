const INPUT_FORMAT = "Input format";
const PROMPT_TEMPLATE = "Prompt template";
const MODEL = "Model";
const VARIABLE_NAME = "Result variable name";
const SHOW_ASSISTANT_MESSAGES = "Show assistant messages";
const SYSTEM_PROMPT = "System prompt";
const CHUNK_SEPARATOR = "Chunk separator";
const CHUNK_JOINER = "Chunk joiner";
const SHOULD_MERGE = "Should merge";
const TEMPERATURE = "Sampling temperature (0-2.0). 0 is less creative, 2 is more creative and prone to hallucination";
const TOP_P = "Top P (0-1.0). Usually set to a high value (like 0.75) with the purpose of limiting the long tail of low-probability tokens that may be sampled.";
const FREQUENCY_PENALTY = "Frequency Penalty (0-2.0). How much to penalize new tokens based on their existing frequency in the output. Higher number = less repitition";
const PRESENCE_PENALTY = "Presence Penalty (0-2.0). How much to penalize new tokens based on their appearance in the output. Higher number = less repitition";

module.exports = {
    entry: run,
    settings: {
        name: `Chunked Prompt`,
        author: `chhoumann / javrin`,
        options: {
            [INPUT_FORMAT]: {
                type: "format",
                defaultValue: "{{selected}}",
                placeholder: "Enter your input format",
            },
            [PROMPT_TEMPLATE]: {
                type: "format",
                defaultValue: "Summarize the following into bullet points:\n{{value:chunk}}",
                placeholder: "Enter your prompt template",
            },
            [MODEL]: {
                type: "dropdown",
                defaultValue: "gpt-3.5-turbo",
                options: [
                    "gpt-3.5-turbo",
                    "gpt-3.5-turbo-16k",
                    "gpt-4",
                    "gpt-4-32k",
                    "gpt-4-1106-preview",
                    "text-davinci-003",
                ],
            },
            [VARIABLE_NAME]: {
                type: "text",
                defaultValue: "output",
                placeholder: "Enter result variable name",
            },
            [TEMPERATURE]: {
                type: "text",
                defaultValue: 0.0,
                placeholder: 0.0,
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
            [SHOW_ASSISTANT_MESSAGES]: {
                type: "checkbox",
                defaultValue: true,
            },
            [SYSTEM_PROMPT]: {
                type: "format",
                defaultValue: "You are the expert summarizer. You are able to concisely draw the most important points from text.",
                placeholder: "Enter system prompt",
            },
            [CHUNK_SEPARATOR]: {
                type: "text",
                defaultValue: "\\n",
                placeholder: "Enter chunk separator",
            },
            [CHUNK_JOINER]: {
                type: "text",
                defaultValue: "\\n",
                placeholder: "Enter chunk joiner",
            },
            [SHOULD_MERGE]: {
                type: "checkbox",
                defaultValue: true,
            },
        },
    },
};

// eslint-disable-next-line require-jsdoc
async function run(params, settings) {
    const API = params.quickAddApi;

    const input = await API.format(settings[INPUT_FORMAT], params.variables);
    if (!input) {
        new Notice(`No text input. Stopping.`);
        return;
    }

    const out = await API.ai.chunkedPrompt(
        input,
        settings[PROMPT_TEMPLATE],
        settings[MODEL],
        {
            variableName: settings[VARIABLE_NAME],
            showAssistantMessages: settings[SHOW_ASSISTANT_MESSAGES],
            systemPrompt: await API.format(settings[SYSTEM_PROMPT], params.variables),
            chunkSeparator: new RegExp(settings[CHUNK_SEPARATOR]),
            chunkJoiner: settings[CHUNK_JOINER],
            shouldMerge: settings[SHOULD_MERGE],
            modelOptions: {
                "temperature": parseFloat(settings[TEMPERATURE]),
                "top_p": parseFloat(settings[TOP_P]),
                "frequency_penalty": parseFloat(settings[FREQUENCY_PENALTY]),
                "presence_penalty": parseFloat(settings[PRESENCE_PENALTY]),
            },
        },
    );

    params.variables["model"] = settings[MODEL];
    params.variables["temp"] = settings[TEMPERATURE];
    params.variables["top_p"] = settings[TOP_P];
    params.variables["frequency_p"] = settings[FREQUENCY_PENALTY];
    params.variables["presence_p"] = settings[PRESENCE_PENALTY];

    Object.assign(params.variables, out);
}
