'use strict';

const fse = require('fs-extra');
const path = require('path');
const sunlight = require('./sunlight-all-min.js').Sunlight;
// const highlighter = new sunlight.Highlighter();

const cssFile = 'sunlight.css';
const pluginName = 'sunlight-highlighter';

let defaultLineNumber;

/**
 * Validate the theme. If invalid output 'default' instead of the input string.
 * @param {string} theme The theme to be validated.
 * @returns {string} The valudated theme.
 */
function ValidateTheme(theme) {
  return theme === 'dark' ? 'dark' : 'default';
}

/**
 * Write assets
 * @param {Object} output output object by GitBook.
 * @param {Object} log log object by GitBook.
 * @param {string} theme The theme selected by the options.
 */
function WriteAssets(output, log, theme) {
  const pluginPath = path.join('gitbook', `gitbook-plugin-${pluginName}`);

  const inputFile = path.join(__dirname, 'themes', `sunlight.${theme}.css`);
  const outputPath = path.join(output.root(), pluginPath);
  const outputFile = path.join(outputPath, cssFile);
  log.debug.ln('Writing the theme...');
  fse.ensureDirSync(outputPath);
  fse.copySync(inputFile, outputFile, {preserveTimestamps: true});
}

/**
 * Loads the book info.
 * @param {Object} options Pass this.options to this parameter.
 * @param {Object} log log object by GitBook.
 * @param {Object} output
 */
function loadBookInfo(options, log, output) {
  const pluginOptions = options.pluginsConfig['sunlight-highlighter'];

  const theme = ValidateTheme(pluginOptions.theme);
  WriteAssets(output, log, theme);
  defaultLineNumber = pluginOptions.lineNumber;
}

/**
 * Highlight the code block.
 * @param {string} lang The language and other parameter.
 * @param {string} code The code to be highlighted.
 * @returns {string} The highlighted HTML code.
 */
function highlight(lang, code) {
  if (!lang) return {
    body: code,
    html: false,
  };

  try {
    const lineNumbers = defaultLineNumber !== false;
    const highlighter = new sunlight.Highlighter({lineNumbers: lineNumbers});

    const jsdom = require('jsdom').jsdom;
    const document = jsdom('', {});

    const preElement = document.createElement('div');
    // Note: setting innerText does not work in jsdoc 9.4.2
    preElement.appendChild(document.createTextNode(code));
    preElement.setAttribute('class', `sunlight-highlight-${lang}`);

    const dummyElement = document.createElement('div');
    dummyElement.appendChild(preElement);
    highlighter.highlightNode(preElement);

    return dummyElement.innerHTML;
  } catch (e) { console.log(e); }

  return {
    body: code,
    html: false,
  };
}

module.exports = {
  book: {css: [cssFile]},
  ebook: {css: [cssFile]},
  blocks: {
    code: function(block) {
      return highlight(block.kwargs.language, block.body);
    },
  },
  hooks: {
    init: function() {
      loadBookInfo(this.options, this.log, this.output);
    },
  },
};
