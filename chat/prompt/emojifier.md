---
temperature: 0.9
top_p: 1
max_tokens: 512
presence_penalty: 1
frequency_penalty: 1
stream: true
stop: 
n: 1
model: gpt-3.5-turbo
template: "[[emojifier]]"
---
```js quickadd
const cbText = await this.quickAddApi.utility.getClipboard();
const phrase = await this.quickAddApi.inputPrompt("🧙‍♀️ Emojify", "Your text to emojify", cbText);
const prompt = this.variables["prompt"] = `List 10 alternatives for emojis that best fit the following word (or words). Output each emoji on it's own line, and do not number or use bullets. The word is: ${phrase}`
return prompt;
```
