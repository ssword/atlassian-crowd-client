import assert from 'assert';
import { assertAsync } from './helpers/async';
import settings from './helpers/settings';
import Crowd from '../src/client';

describe('Crowd client', () => {
  let crowd = new Crowd(settings.crowd);

  it('should allow fetching cookie config', (done) => {
    assertAsync(crowd.config.cookie(), (res) => {
      assert.deepEqual(res, { secure: false, name: 'crowd.token_key' });
    }).then(done, done);
  });
});
