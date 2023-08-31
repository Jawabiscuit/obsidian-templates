<%*
let url = await tp.system.clipboard();
let page = await tp.obsidian.request({url});
let p = new DOMParser();
let doc = p.parseFromString(page, "text/html");
let $ = (s) => doc.querySelector(s);

let canonical = $("link[rel='canonical']").href.split('&')[0];
let title = $("meta[name='title']").content;
let description = $("meta[name='description']").content;
let keywords = $("meta[name='keywords']").content;
let shortlinkUrl = $("link[rel='shortlinkUrl']").href.split('?')[0];
let imageSrc = $("link[rel='image_src']").href;

// Extract the video ID from the canonical URL.
let videoId = canonical.split('watch?v=')[1];

// Define your YouTube Data API key and access token. These should be stored securely.
// Generate accessToken by going to https://developers.google.com/oauthplayground
// Select scopes:
//   https://www.googleapis.com/auth/youtube.force-ssl
//   https://www.googleapis.com/auth/youtubepartner
let apiKey = '';
let accessToken = '';

// Define the URL for the YouTube Data API's "captions" endpoint.
// var apiUrl = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}?key=${apiKey}`;

// It shouldn't be necessary to provide and API Key when using Oauth2 access token
var apiUrl = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}`;

// Make a GET request to the caption endpoint to see if captions exists.
var response = await fetch(apiUrl, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': 'application/json'
  }
});

// Check if the request was successful.
if (response.ok) {
  // Parse the response as JSON.
  var data = await response.json();

  // Extract the caption id from the response data.
  let captionId = "TODO"; // data.items[0].?;

  // Output the captionId.
  console.log(captionId);
}

if (captionId) {
  // TODO
}

// Make a request to the download endpoint
// apiUrl = `https://youtube.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}`

// It shouldn't be necessary to provide and API Key when using Oauth2 access token
apiUrl = `https://youtube.googleapis.com/youtube/v3/captions/${captionId}`

response = await fetch(apiUrl, {
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Accept': 'application/json'
}
});

var transcript = "None";

if (response.ok) {
  // Parse the response as JSON.
  var data = await response.json();

  // Extract the transcript from the response data.
  transcript = data.items[0].snippet.transcript;

  // Output the transcript.
  console.log(transcript);
} else {
  // If the request was not successful, log the status code to the console.
  console.log(`HTTP error! Status: ${response.status}`);
}
%>
|     var      | value              |
|:------------:|:------------------ |
|  canonical   | <% canonical %>    |
|    title     | <% title %>        |
| description  | <% description %>  |
|   keywords   | <% keywords %>     |
| shortlinkUrl | <% shortlinkUrl %> |
|   imageSrc   | <% imageSrc %>     |
|  transcript  | <% transcript %>   |
|              |                    |
