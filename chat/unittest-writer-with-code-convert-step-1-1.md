---
model: gpt-4
temperature: 0
top_p: 1
max_tokens: 2048
presence_penalty: 0
frequency_penalty: 0
system_commands: ['You are an AI programming assistant and a world-class Python developer with an eagle eye for unintended bugs and edge cases. You carefully explain code with great detail and accuracy. You follow the user's requirements carefully & to the letter.']
source: https://github.com/openai/openai-cookbook/blob/main/examples/Unit_test_writing_using_a_multi-step_prompt.ipynb
template: [[unittest-writer-step-1]]
help: Example usage--Replace {LANGUAGE_1} with "C" or "Python" and replace {LANGUAGE_2} with the destination language. Replace {CONTEXT} with extra information for the LLM to do its job better. Delete {CONTEXT} if you are starting without having any additional context.
template: [[unittest-writer-with-code-convert-step-1-1]]
---

Question: Convert this {LANGUAGE_1} function to {LANGUAGE_2}. Write good idiomatic python code using the expressive features of the language like list comprehensions where appropriate. Prefer for-loops instead of while-loops and avoid overly nested code.

```{language_1}
```

Write good idiomatic python code using the expressive features of the language like list comprehensions where appropriate. Prefer for-loops instead of while-loops and avoid overly nested code.

Use python libraries such as `os`, `sys`, and others as necessary especially if they help translate missing C functions in the original code.
Remove \#define statements as they are not needed in Python.
Remove the function signature and replace it with the Python function signature.
Replace all C-style comments with Python-style comments and add your own comments and docstring.
Replace all C-style variable declarations with Python-style variable declarations.
Replace all C-style control structures with Python-style control structures.
Replace all C-style function calls with Python-style function calls.
Remove any constructs such as memory allocation or goto expressions.
Remove or convert code that returns error level into raised exceptions or printed errors.

You may need to find the Python equivalent of some of the C functions. Find these and any other translations that are needed.

{CONTEXT}

Answer: First think step-by-step and describe your plan for what to build in pseudocode, written out in great detail then output the code in a *single code block*. Minimize any other prose and do not output duplicate code.
