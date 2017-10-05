//
// Copy this file to settings.js and provide your own values.
//

export default {
  crowd: {
    // The part that comes before 'rest/usermanagement/1'
    baseUrl: 'https://crowd.example.com/',

    application: {
      name: 'demo-app',
      password: 'example'
    },

    // Does your backend support nesting? OpenLDAP doesn't.
    nesting: false,

    // Session timeout in seconds. Can never be more than the one configured in Crowd.
    sessionTimeout: 600,

    // Enable verbose logging of requests and responses.
    debug: false
  },

  // Override these if you don't want to store attributes as JSON.
  // Encoded value must always be a string and has a maximum length of 255 characters.
  attributesParser: JSON.parse,
  attributesEncoder: JSON.stringify
};
