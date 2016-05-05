/* eslint global-require:0 */

import path from 'path';
import assert from 'assert';
import Reflect from 'core-js/es7/reflect';

function load(dir) {
  return require(path.join(__dirname, 'fixtures', dir, 'output.es6.js'));
}

describe('query type metadata', () => {
  describe('of a field', () => {
    it('should return metadata', () => {
      const MyClass = load('field-simple-types').default;

      assert.deepEqual(Reflect.getMetadata('design:type', MyClass, 'stringField'),
        { type: String });
      assert.deepEqual(Reflect.getOwnMetadata('design:type', MyClass, 'numberField'),
        { type: Number });
    });
  });
});
