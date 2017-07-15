// Do not pass sunlight-all-min.js to babel. It is broken after compilation.
require('babel-register')({ignore: ['node_modules', '*/sunlight-all-min.js']});

import assert from 'power-assert';
import {jsdom} from 'jsdom';

let init, highlight;

/**
 * Return the first div element inside the root node of the document.
 * @param {Object} document
 * @return {Object}
 */
function getDivElementFromDocument(document) {
  return document.body.childNodes[0];
}

/**
 * Return the list of class names of a HTML DOM node.
 * @param {Object} node
 * @return {string[]}
 */
function getClassList(node) {
  return node.className.split(' ');
}

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
      const document = jsdom(result, {});
      const divElement = getDivElementFromDocument(document);

      assert(
        getClassList(divElement).indexOf(
          `sunlight-theme-${test.themeExpected}`
        ) >= 0
      );

      assert.strictEqual(
        1,
        divElement.getElementsByClassName(
          `sunlight-highlighted sunlight-highlight-${test.languageExpected}`
        ).length
      );

      const divLineNumberMargins = divElement.getElementsByClassName(
        'sunlight-line-number-margin'
      );

      assert.strictEqual(
        test.lineNumbersExpected ? 1 : 0,
        divLineNumberMargins.length
      );

      if (test.lineNumbersExpected) {
        const startLineNumberRegEx = /^sunlight-\d+-line-(\d+)$/;
        const match = divLineNumberMargins[0].childNodes[0].name.match(
          startLineNumberRegEx
        );
        assert.notStrictEqual(match, null);
        assert.strictEqual(test.lineNumberStartExpected.toString(), match[1]);
      }
    });
  });
});
