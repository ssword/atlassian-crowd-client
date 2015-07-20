# atlassian-crowd-client

Promise-based client library to communicate with an Atlassian Crowd server from Node, written in ES6.

## Installation

    npm install --save atlassian-crowd-client

## Usage

```javascript
var CrowdClient = require('atlassian-crowd-client');

// Initialize the Crowd client:
var crowd = new CrowdClient({
  baseUrl: 'https://crowd.example.com/',
  application: {
    name: 'demo',
    password: 'example'
  }
});

// Authenticate to Crowd:
crowd.session.create(user.username, user.password).then(function (session) {
  // Fetch the user profile:
  crowd.session.getUser(session.token).then(function (user) {
    console.log('Hello, ' + user.displayname);
  });
});
```

## Development

    cp test/helpers/settings-example.js test/helpers/settings.js
    npm install
    npm test
