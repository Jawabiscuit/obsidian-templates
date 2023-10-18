---
model: gpt-4
temperature: 0
top_p: 1
max_tokens: 2048
presence_penalty: 0
frequency_penalty: 0
system_commands:
    - "You are a world-class Python developer with an eagle eye for unintended bugs and edge cases. You carefully explain code with great detail and accuracy. You organize explanations in markdown-formatted, bulleted lists."
source: https://github.com/openai/openai-cookbook/blob/main/examples/Unit_test_writing_using_a_multi-step_prompt.ipynb
template: "[[unittest-writer-step-3]]"
---

```python
```

A good unit test suite should aim to:
- Test the function's behavior for a wide range of possible inputs
- Test edge cases that the author may not have foreseen
- Take advantage of the features of `pytest` to make the tests easy to write and maintain
- Be easy to read and understand, with clean code and descriptive names
- Be deterministic, so that the tests always pass or fail in the same way

{SCENARIOS FROM STEP 2 IF ANY}

To help unit test the function above, list diverse scenarios that the function should be able to handle in addition to the ones above (and under each scenario, include a few examples as sub-bullets).