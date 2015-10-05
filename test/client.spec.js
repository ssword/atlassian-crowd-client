import assert from 'assert';;
import Crowd from '../src/client';
import settings from './helpers/settings';
import Attributes from '../src/models/attributes';
import Group from '../src/models/group';
import Session from '../src/models/session';
import User from '../src/models/user';

describe('Crowd client model resource', () => {
  let client = new Crowd(settings.crowd);

  it('Should Expose the Group Model', (done) => {
    assert.deepEqual(Group, client.groupModel);
    done();
  });

  it('Should Expose the Session Model', (done) => {
    assert.deepEqual(Session, client.sessionModel);
    done();
  });

  it('Should Expose the Attributes Model', (done) => {
    assert.deepEqual(Attributes, client.attributesModel);
    done();
  });

  it('Should Expose the User Model', (done) => {
    assert.deepEqual(User, client.userModel);
    done();
  });
});
