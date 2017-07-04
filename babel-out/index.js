'use strict';

var fse = require('fs-extra');
var path = require('path');
var sunlight = require('../sunlight-all-min.js').Sunlight;
var highlighter = new sunlight.Highlighter();

var cssFile = 'sunlight.css';
var pluginName = 'sunlight-highlighter';

var defaultLineNumber = void 0;

/**
 * Validate the name of the theme. If valid returns the name, otherwise returns
 * 'gitbook', i.e. the default theme.
 * @param {string} name The name of theme to be validated.
 * @returns {string}
 */
function ValidateTheme(name) {
  var validThemes = {
    'gitbook': '',
    'light': '',
    'dark': ''
  };
  return validThemes.hasOwnProperty(name) ? name : 'gitbook';
}

/**
 * Write assets
 * @param {Object} output output object by GitBook.
 * @param {Object} log log object by GitBook.
 * @param {string} theme The theme selected by the options.
 */
function WriteAssets(output, log, theme) {
  var inputFile = path.join(__dirname, '..', 'themes', 'sunlight.' + theme + '.css');
  var outputPath = path.join(output.root(), 'gitbook', 'gitbook-plugin-' + pluginName);
  var outputFile = path.join(outputPath, cssFile);
  log.debug.ln('Writing the theme...');
  fse.ensureDirSync(outputPath);
  fse.copySync(inputFile, outputFile, { preserveTimestamps: true });
}

/**
 * Loads the book info.
 * @param {Object} options Pass this.options to this parameter.
 * @param {Object} log log object by GitBook.
 * @param {Object} output
 */
function loadBookInfo(options, log, output) {
  var pluginOptions = options.pluginsConfig['sunlight-highlighter'];

  var theme = ValidateTheme(pluginOptions.theme);
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
    html: false
  };

  try {
    var lineNumbers = defaultLineNumber !== false;
    highlighter.options.lineNumbers = lineNumbers;

    var jsdom = require('jsdom').jsdom;
    var document = jsdom('', {});

    var preElement = document.createElement('div');
    // Note: setting innerText does not work in jsdoc 9.4.2
    preElement.appendChild(document.createTextNode(code));
    preElement.setAttribute('class', 'sunlight-highlight-' + lang);

    var dummyElement = document.createElement('div');
    dummyElement.appendChild(preElement);
    highlighter.highlightNode(preElement);

    return dummyElement.innerHTML;
  } catch (e) {
    console.log(e);
  }

  return {
    body: code,
    html: false
  };
}

module.exports = {
  book: { css: [cssFile] },
  ebook: { css: [cssFile] },
  blocks: {
    code: function code(block) {
      return highlight(block.kwargs.language, block.body);
    }
  },
  hooks: {
    init: function init() {
      loadBookInfo(this.options, this.log, this.output);
    }
  }
};