//
// Copy this file to settings.js and provide your own values.
//

export default {
  crowd: {
    baseUrl: 'https://crowd.example.com/',  // The part that comes before 'rest/usermanagement/1'.
    application: {
      name: 'demo-app',                     // Crowd application name.
      password: 'example'                   // Crowd application password.
    },
    nesting: false,                         // Does your backend support nesting? OpenLDAP doesn't.
    sessionTimeout: 60,                     // Session timeout in seconds.
    debug: false                            // Enables verbose logging of requests and responses.
  }
};
