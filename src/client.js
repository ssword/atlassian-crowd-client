import CrowdApi from './api';
import Attributes from './models/attributes';
import Group from './models/group';
import User from './models/user';

export default class CrowdClient extends CrowdApi {
  constructor(settings) {
    super(settings);

    this.config = {
      cookie: () => this.request('GET', '/config/cookie')
    };

    this.user = {
      get: (username, withAttributes = false) => {
        return this.request('GET', `/user?username=${username}${withAttributes ? '&expand=attributes' : ''}`)
          .then(User.fromCrowd);
      },
      create: (user) => {
        return this.request('POST', '/user', user.toCrowd())
          .then(User.fromCrowd);
      },
      update: (username, user) => {
        // Crowd returns a 204 No Content. Return the original object for consistency.
        return this.request('PUT', `/user?username=${username}`, user.toCrowd())
          .then(() => User.fromCrowd(user.toCrowd()));
      },
      remove: (username) => {
        return this.request('DELETE', `/user?username=${username}`);
      },
      attributes: {
        list: (username) => {
          return this.request('GET', `/user/attribute?username=${username}`)
            .then((res) => Attributes.fromCrowd(res.attributes));
        },
        set: (username, attributes) => {
          return this.request('POST', `/user/attribute?username=${username}`, {
            attributes: attributes.toCrowd()
          }).then(() => Attributes.fromCrowd(attributes.toCrowd()));
        },
        remove: (username, attributename) => {
          return this.request('DELETE', `/user/attribute?username=${username}&attributename=${attributename}`);
        }
      },
      password: {
        set: (username, password) => {
          return this.request('PUT', `/user/password?username=${username}`, { value: password });
        },
        reset: (username) => {
          return this.request('POST', `/user/mail/password?username=${username}`);
        }
      },
      username: {
        request: (email) => {
          return this.request('POST', `/user/mail/usernames?email=${email}`);
        }
      },
      groups: {
        get: (username, groupname, nested = false) => {
          return this.request('GET', `/user/group/${nested ? 'nested' : 'direct'}?username=${username}&groupname=${groupname}`);
        },
        list: (username, nested = false, startIndex = 0, maxResults = 1000) => {
          return this.request('GET', `/user/group/${nested ? 'nested' : 'direct'}?username=${username}&start-index=${startIndex}&max-results=${maxResults}`)
            .then(res => res.groups.map(group => group.name));
        },
        add: (username, groupname) => {
          return this.request('POST', `/user/group/direct?username=${username}`, { name: groupname });
        },
        remove: (username, groupname) => {
          return this.request('DELETE', `/user/group/direct?username=${username}&groupname=${groupname}`);
        }
      }
    };

    this.group = {
      get: (groupname, withAttributes = false) => {
        return this.request('GET', `/group?groupname=${groupname}${withAttributes ? '&expand=attributes' : ''}`)
          .then(Group.fromCrowd);
      },
      create: (group) => {
        // Crowd returns a 201 Created. Return the original object for consistency.
        return this.request('POST', '/group', group.toCrowd())
          .then(() => Group.fromCrowd(group.toCrowd()));
      },
      update: (groupname, group) => {
        return this.request('PUT', `/group?groupname=${groupname}`, group.toCrowd())
          .then(Group.fromCrowd);
      },
      remove: (groupname) => {
        return this.request('DELETE', `/group?groupname=${groupname}`);
      },
      attributes: {
        list: (groupname) => {
          return this.request('GET', `/group/attribute?groupname=${groupname}`)
            .then((res) => Attributes.fromCrowd(res.attributes));
        },
        set: (groupname, attributes) => {
          return this.request('POST', `/group/attribute?groupname=${groupname}`, {
            attributes: attributes.toCrowd()
          }).then(() => Attributes.fromCrowd(attributes.toCrowd()));
        },
        remove: (groupname, attributename) => {
          return this.request('DELETE', `/group/attribute?groupname=${groupname}&attributename=${attributename}`);
        }
      },
      users: {
        get: (groupname, username, nested = false) => {
          return this.request('GET', `/group/user/${nested ? 'nested' : 'direct'}?groupname=${groupname}&username=${username}`);
        },
        list: (groupname, nested = false, startIndex = 0, maxResults = 1000) => {
          return this.request('GET', `/group/user/${nested ? 'nested' : 'direct'}?groupname=${groupname}&start-index=${startIndex}&max-results=${maxResults}`)
            .then(res => res.users.map(user => user.name));
        },
        add: (groupname, username) => {
          return this.request('POST', `/group/user/direct?groupname=${groupname}`, { name: username });
        },
        remove: (groupname, username) => {
          return this.request('DELETE', `/group/user/direct?groupname=${groupname}&username=${username}`);
        }
      },
      parents: {
        // Nested groups are not supported in all directory implementations (e.g. OpenLDAP).
        // This functionality can be enabled using the `settings.crowd.nesting` option.
        get: (groupname, parentname, nested = false) => {
          return this.request('GET', `/group/parent-group/${nested ? 'nested' : 'direct'}?groupname=${groupname}&parent-groupname=${parentname}`);
        },
        list: (groupname, nested = false, startIndex = 0, maxResults = 1000) => {
          return this.request('GET', `/group/parent-group/${nested ? 'nested' : 'direct'}?groupname=${groupname}&start-index=${startIndex}&max-results=${maxResults}`)
            .then(res => res.groups.map(group => group.name));
        },
        add: (groupname, parentname) => {
          return this.request('POST', `/group/parent-group/direct?groupname=${groupname}`, { name: parentname });
        }
      },
      children: {
        // Nested groups are not supported in all directory implementations (e.g. OpenLDAP).
        // This functionality can be enabled using the `settings.crowd.nesting` option.
        get: (groupname, childname, nested = false) => {
          return this.request('GET', `/group/child-group/${nested ? 'nested' : 'direct'}?groupname=${groupname}&child-groupname=${childname}`);
        },
        list: (groupname, nested = false, startIndex = 0, maxResults = 1000) => {
          return this.request('GET', `/group/child-group/${nested ? 'nested' : 'direct'}?groupname=${groupname}&start-index=${startIndex}&max-results=${maxResults}`)
            .then(res => res.groups.map(group => group.name));
        },
        add: (groupname, childname) => {
          return this.request('POST', `/group/child-group/direct?groupname=${groupname}`, { name: childname });
        },
        remove: (groupname, childname) => {
          return this.request('DELETE', `/group/child-group/direct?groupname=${groupname}&child-groupname=${childname}`);
        }
      },
      membership: () => {
        // Returns the raw XML response, since Crowd does not support JSON for this request.
        return this.request('GET', '/group/membership');
      }
    };

    this.authenticate = (username, password) => {
      return this.request('POST', `/authentication?username=${username}`, { value: password })
        .then(User.fromCrowd);
    };

    this.search = {
      user: (restriction, expand = false, startIndex = 0, maxResults = 1000) => {
        return this.request('GET', `/search?entity-type=user&restriction=${restriction}&start-index=${startIndex}&max-results=${maxResults}${expand ? '&expand=user' : ''}`)
          .then(res => expand ? res.users.map(User.fromCrowd) : res.users.map(user => user.name));
      },
      group: (restriction, expand = false, startIndex = 0, maxResults = 1000) => {
        return this.request('GET', `/search?entity-type=group&restriction=${restriction}&start-index=${startIndex}&max-results=${maxResults}${expand ? '&expand=group' : ''}`)
          .then(res => expand ? res.groups.map(Group.fromCrowd) : res.groups.map(group => group.name));
      }
    };
  }
}
