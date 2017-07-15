import assert from 'power-assert';
import {SanitizeLanguage} from '../src/lang-mapping.js';

describe('SanitizeLanguage', function() {
  it('returns the mapped language if mapping exists', function() {
    assert.strictEqual('vb', SanitizeLanguage('vbnet'));
  });
  it('returns the given string if no mapping exists', function() {
    assert.strictEqual('hello', SanitizeLanguage('hello'));
  });
});
