import {verifyResult} from './fixtures/common.js';

describe('plugin options test', function() {
  for (const themeExpected of ['gitbook', 'abcd', 'efgh']) {
    for (const lineNumbersExpected of [true, false]) {
      it(`theme: ${themeExpected}, lineNumbers: ${lineNumbersExpected}`, function() {
        // Initializer plugin
        const plugin = require('../src/index.js');
        const init = plugin.hooks.init;
        const env = {
          options: {
            pluginsConfig: {
              'sunlight-highlighter': {
                theme: themeExpected,
                lineNumbers: lineNumbersExpected,
              },
            },
          },
        };
        init.apply(env);

        // Highlight code
        const code = 'console.log("test")\nconsole.log("test")';
        const languageExpected = 'javascript';
        const highlight = plugin.blocks.code;
        const result = highlight({
          kwargs: {language: languageExpected},
          body: code,
        });

        verifyResult(
          result,
          languageExpected,
          themeExpected,
          lineNumbersExpected,
          1
        );
      });
    }
  }
});
