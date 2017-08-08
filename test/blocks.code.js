import {verifyResult} from './fixtures/common.js';

let init, highlight;

describe('blocks.code', function() {
  const testDefaults = Object.freeze({
    code: 'console.log("test")\nconsole.log("test")',
    languageExpected: 'javascript',
    themeExpected: 'gitbook',
    lineNumbersExpected: false,
    lineNumberStartExpected: 1,
  });

  const tests = [
    {
      testName: 'highlights code',
      languageInput: 'javascript',
    },
    {
      testName: 'highlights code with theme',
      languageInput: 'javascript+theme:light',
      themeExpected: 'light',
    },
    {
      testName: 'highlights code with lineNumbers',
      languageInput: 'javascript+lineNumbers:true',
      lineNumbersExpected: true,
    },
    {
      testName: 'highlights code with lineNumbers and lineNumberStart',
      languageInput: 'javascript+lineNumbers:true+lineNumberStart:100',
      lineNumbersExpected: true,
      lineNumberStartExpected: 100,
    },
    {
      testName: 'highlights code with all options set (#1)',
      languageInput: 'javascript+theme:dark+lineNumbers:true+lineNumberStart:5',
      themeExpected: 'dark',
      lineNumbersExpected: true,
      lineNumberStartExpected: 5,
    },
    {
      testName: 'highlights code with all options set (#2)',
      languageInput:
        'javascript+theme:light+lineNumbers:false+lineNumberStart:5',
      themeExpected: 'light',
      lineNumbersExpected: false,
    },
  ];

  beforeEach(function() {
    const plugin = require('../src/index.js');
    init = plugin.hooks.init;
    highlight = plugin.blocks.code;
    const env = {
      options: {
        pluginsConfig: {
          'sunlight-highlighter': {
            theme: 'gitbook',
            lineNumbers: false,
          },
        },
      },
    };
    init.apply(env);
  });

  tests.forEach(function(testOwnProperties) {
    const test = Object.assign({}, testDefaults, testOwnProperties);
    it(test.testName, function() {
      const result = highlight({
        kwargs: {language: test.languageInput},
        body: test.code,
      });

      verifyResult(
        result,
        test.languageExpected,
        test.themeExpected,
        test.lineNumbersExpected,
        test.lineNumberStartExpected
      );
    });
  });
});
