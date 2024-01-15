
```js quickadd
const cbText = await this.quickAddApi.utility.getClipboard();
const prompt = await this.quickAddApi.inputPrompt("Prompt 💬:", "Your prompt", cbText);
this.variables["💬 Prompt"] = prompt;
return prompt;
```
{{value:💬 Prompt}}