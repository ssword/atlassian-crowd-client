import 'core-js/shim';

import url from 'url';
import http from 'http';
import https from 'https';

export default class CrowdApi {
  constructor(settings) {
    const uri = url.parse(settings.baseUrl.endsWith('/') ? settings.baseUrl : settings.baseUrl += '/');
    const defaults = {
      nesting: false,
      sessionTimeout: 600,
      debug: false,
      attributesParser: JSON.parse,
      attributesEncoder: JSON.stringify
    };
    this.settings = Object.assign({}, defaults, settings, {
      protocol: uri.protocol,
      hostname: uri.hostname,
      basepath: uri.pathname + 'rest/usermanagement/1',
      credentials: settings.application.name + ':' + settings.application.password,
      port: uri.port || (uri.protocol === 'https:' ? 443 : 80)
    });
  }

  request(method, path, data = undefined) {
    let error;
    let opts = {
      hostname: this.settings.hostname,
      port: this.settings.port,
      auth: this.settings.credentials,
      method: method,
      path: this.settings.basepath + path,
      headers: {
        // JSON is not supported for the /group/membership endpoint.
        'Accept': (path === '/group/membership') ? 'application/xml' : 'application/json'
      }
    };

    switch (method) {
      case 'POST':
      case 'PUT':
      case 'DELETE':
        data = JSON.stringify(data) || '';
        opts.headers['Content-Type'] = 'application/json; charset=utf-8';
        opts.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        break;
    }

    return new Promise((resolve, reject) => {
      this.log('Request:', opts, data);

      let handler = (this.settings.protocol === 'https:') ? https : http;
      let request = handler.request(opts, (response) => {
        let responseData = '';

        switch (response.statusCode) {
          case 204:
            resolve();
            break;
          case 401:
            error = new Error('Application Authorization Error');
            error.type = 'APPLICATION_ACCESS_DENIED';
            this.log(error);
            reject(error);
            break;
          case 403:
            error = new Error('Application Permission Denied');
            error.type = 'APPLICATION_PERMISSION_DENIED';
            this.log(error);
            reject(error);
            break;
        }

        response.on('data', (chunk) => responseData += chunk.toString());

        response.on('end', () => {
          this.log('Response:', response.statusCode, responseData);

          if (path === '/group/membership' && response.statusCode === 200 && responseData) {
            // Return the raw XML response for /group/membership, since it doesn't support JSON.
            resolve(responseData);
          } else if (!response.headers['content-type'] || response.headers['content-type'].split(';')[0] !== 'application/json') {
            error = new Error('Invalid Response from Crowd, expecting JSON.');
            error.type = 'INVALID_RESPONSE';
            reject(error);
          } else if (responseData) {
            responseData = JSON.parse(responseData);
            if (responseData.reason || responseData.message) {
              if (typeof responseData.reason === 'undefined') {
                responseData.reason = 'BAD_REQUEST';
                responseData.message = 'Invalid Request to Crowd.';
              }
              error = new Error(responseData.message);
              error.type = responseData.reason;
              reject(error);
            } else {
              resolve(responseData);
            }
          } else {
            resolve();
          }
        });
      });

      request.on('error', (e) => {
        console.log('Error sending request: ' + e.message);
        reject(e);
      });

      if (data) {
        request.end(data, 'utf8');
      } else {
        request.end();
      }
    });
  }

  log(...args) {
    if (this.settings.debug) {
      console.log(...args);
    }
  }
}
