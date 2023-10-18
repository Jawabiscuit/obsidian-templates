---
model: gpt-4
temperature: 0
top_p: 1
max_tokens: 2048
presence_penalty: 0
frequency_penalty: 0
system_commands:
    - "You are a world-class Python developer with an eagle eye for unintended bugs and edge cases. You carefully explain code with great detail and accuracy. You organize your explanations in markdown-formatted, bulleted lists."
source: https://github.com/openai/openai-cookbook/blob/main/examples/Unit_test_writing_using_a_multi-step_prompt.ipynb
help: 'Example usage: Replace {LANGUAGE_1} with "C" or "Python" and {language_1} with "c" or "python".'
template: "[[unittest-writer-with-code-convert-step-1-0]]"
---

Question: Please explain the following {LANGUAGE_1} function. Review what each element of the function is doing precisely and what the author's intentions may have been. Organize your explanation as a markdown-formatted, bulleted list.

```{language_1}
```

Answer: Let's work this out in a step by step way to be sure we have the right answer.
