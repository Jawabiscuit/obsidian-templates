---
model: gpt-4
temperature: 0
top_p: 1
max_tokens: 2048
presence_penalty: 0
frequency_penalty: 0
system_commands: ['You are a world-class Python developer with an eagle eye for unintended bugs and edge cases. You carefully explain code with great detail and accuracy. You organize explanations in markdown-formatted, bulleted lists.']
source: https://github.com/openai/openai-cookbook/blob/main/examples/Unit_test_writing_using_a_multi-step_prompt.ipynb
template: [[unittest-writer-step-4]]
---

{SCENARIOS}

Pick the most relevant and most widely used use cases to select the top 5 or 6 best scenarios to test for and write unittests in Python using the `unittest` module.  Reply only with code, formatted as follows:

```python
# imports
import unittest  # used for our unit tests
{insert other imports as needed}

# unit tests
# below, each test case is represented by a tuple passed to the @pytest.mark.parametrize decorator
{insert unit test code here}
```
```