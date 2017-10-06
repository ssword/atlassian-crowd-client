import assert from 'assert';
import CrowdClient from '../../src/client';
import Attributes from '../../src/models/attributes';
import Group from '../../src/models/group';
import Session from '../../src/models/session';
import User from '../../src/models/user';

describe('CrowdClient', () => {
  const client = new CrowdClient({
    baseUrl: 'http://test.example.com/',
    application: { name: 'test', password: 'test' }
  });

  it('should inherit all settings from CrowdApi', () => {
    assert.deepEqual(client.settings, {
      baseUrl: 'http://test.example.com/',
      application: { name: 'test', password: 'test' },
      protocol: 'http:',
      hostname: 'test.example.com',
      basepath: '/rest/usermanagement/1',
      credentials: 'test:test',
      port: 80,
      nesting: false,
      sessionTimeout: 600,
      debug: false,
      attributesParser: JSON.parse,
      attributesEncoder: JSON.stringify
    });
  });

  it('should expose the Group model', () => {
    assert.deepEqual(Group, client.groupModel);
  });

  it('should expose the Session model', () => {
    assert.deepEqual(Session, client.sessionModel);
  });

  it('should expose the Attributes model', () => {
    assert.deepEqual(Attributes, client.attributesModel);
  });

  it('should expose the User model', () => {
    assert.deepEqual(User, client.userModel);
  });
});
