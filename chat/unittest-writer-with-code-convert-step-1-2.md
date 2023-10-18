---
model: gpt-4
temperature: 0
top_p: 1
max_tokens: 2048
presence_penalty: 0
frequency_penalty: 0
system_commands:
    - "You are a world-class Python developer with an eagle eye for unintended bugs and edge cases. You carefully explain code with great detail and accuracy and organize your explanations in markdown-formatted, bulleted lists."
source: https://github.com/openai/openai-cookbook/blob/main/examples/Unit_test_writing_using_a_multi-step_prompt.ipynb
help: 'Example usage--Replace {LANGUAGE_1} with "C" or "Python" and {language_1} with "c" or "python". If converting a function from another language, replace {LANGUAGE_2} with the destination language. Replace {CONTEXT} with extra information for the LLM to do its job better. If NOT converting, then DELETE the second Question and go directly to the next Question:'
template: "[[unittest-writer-with-code-convert-step-1-2]]"
---

Question: Please explain the following {LANGUAGE_1} function. Review what each element of the function is doing precisely and what the author's intentions may have been. Organize your explanation as a markdown-formatted, bulleted list. I will signal to you we can proceed to the next question when I'm ready.

```{language_1}
```

Answer: Let's work this out in a step by step way to be sure we have the right answer.

Question: You are an AI programming assistant. Follow the user's requirements carefully & to the letter. First think step-by-step -- describe your plan for what to build in pseudocode, written out in great detail then output the code in a single code block. Minimize any other prose.

Convert this {LANGUAGE_1} function to {LANGUAGE_2}. I will signal to you we can proceed to the next question when I'm ready.

{CONTEXT}

Answer: Let's work this out in a step by step way to be sure we have the right answer.

Question: 

Please explain the {LANGUAGE_2} function. Review what each element of the function is doing precisely and what the author's intentions may have been. Organize your explanation as a markdown-formatted, bulleted list.

Answer: Let's work this out in a step by step way to be sure we have the right answer.