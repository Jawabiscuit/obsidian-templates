```js quickadd
async function fetchAndExtractText(url) {
  try {
    const htmlContent = await request(url);
  
    // Create a DOM parser to parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Remove script tags
    const scriptTags = doc.querySelectorAll('script, style, noscript');
    scriptTags.forEach(tag => tag.remove());
    
    // Extract and return the textual content
    return doc.body.innerText || doc.body.textContent || "";
  } catch (error) {
    console.error('Error fetching or parsing the page:', error);
    return null;
  }
}

const site = await this.quickAddApi.inputPrompt("Website URL");
return await fetchAndExtractText(site)
```