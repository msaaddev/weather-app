import { module, test } from 'qunit';
import { setupTest } from 'weather-app/tests/helpers';

module('Unit | Route | search', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:search');
    assert.ok(route);
  });
});
