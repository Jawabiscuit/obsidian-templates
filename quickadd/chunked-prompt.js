const INPUT_FORMAT = "Input format";
const PROMPT_TEMPLATE = "Prompt template";
const MODEL = "Model";
const VARIABLE_NAME = "Result variable name";
const SHOW_ASSISTANT_MESSAGES = "Show assistant messages";
const SYSTEM_PROMPT = "System prompt";
const CHUNK_SEPARATOR = "Chunk separator";
const CHUNK_JOINER = "Chunk joiner";
const SHOULD_MERGE = "Should merge";

module.exports = {
    entry: run,
    settings: {
        name: `Chunked Prompt`,
        author: `Christian Bager Bach Houmann`,
        options: {
            [INPUT_FORMAT]: {
                type: "format",
                defaultValue: "{{selected}}",
                placeholder: "Enter your input format",
            },
            [PROMPT_TEMPLATE]: {
                type: "format",
                defaultValue: "{{value:chunk}}",
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
                    "text-davinci-003",
                ],
            },
            [VARIABLE_NAME]: {
                type: "text",
                defaultValue: "output",
                placeholder: "Enter result variable name",
            },
            [SHOW_ASSISTANT_MESSAGES]: {
                type: "checkbox",
                defaultValue: true,
            },
            [SYSTEM_PROMPT]: {
                type: "format",
                defaultValue: "",
                placeholder: "Enter system prompt",
            },
            [CHUNK_SEPARATOR]: {
                type: "text",
                defaultValue: "",
                placeholder: "Enter chunk separator",
            },
            [CHUNK_JOINER]: {
                type: "text",
                defaultValue: "",
                placeholder: "Enter chunk joiner",
            },
            [SHOULD_MERGE]: {
                type: "checkbox",
                defaultValue: false,
            },
        },
    },
};

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
        }
    );

    Object.assign(params.variables, out);
}