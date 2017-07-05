'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var sunlight = require('../sunlight-all-min.js').Sunlight;
var highlighter = new sunlight.Highlighter();

var pluginName = 'Sunlight-highlighter';

var defaultLineNumbers = void 0;
var defaultTheme = void 0;

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
 * Loads the options in book.json or book.js. These options are used unless
 * overriden by a per-page/per-script option.
 * @param {Object} options Pass this.options to this parameter.
 */
function loadDefaultOptions(options) {
  var pluginOptions = options.pluginsConfig['sunlight-highlighter'];

  defaultLineNumbers = pluginOptions.lineNumber;

  var theme = ValidateTheme(pluginOptions.theme);
  defaultTheme = theme;
}

/**
 * Parse the options
 * @param {sting[]} optionList The list of options. Each option is formatted in
 * "key:value". Examples are "theme:gitbook", "lineNumbers:true", and
 * "lineNumberStart:10".
 * @returns {Map} Key-value pairs of options.
 */
function parseOptions(optionList) {
  var options = new Map();
  options.set('lineNumbers', defaultLineNumbers);
  options.set('lineNumberStart', 1);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = optionList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var optionItem = _step.value;

      var _optionItem$split = optionItem.split(':', 2),
          _optionItem$split2 = _slicedToArray(_optionItem$split, 2),
          key = _optionItem$split2[0],
          value = _optionItem$split2[1];

      if (value === undefined) {
        ;

        var _optionItem$split3 = optionItem.split('_', 2);

        var _optionItem$split4 = _slicedToArray(_optionItem$split3, 2);

        key = _optionItem$split4[0];
        value = _optionItem$split4[1];
      }switch (key) {
        case 'theme':
          if (/^[A-Za-z0-9]+$/.test(value)) options.set(key, ValidateTheme(value));else throw new Error(pluginName + ': Invalid theme: ' + key);
          break;
        case 'lineNumbers':
          if (value === 'true' || value === 'false') options.set(key, value === 'true');else throw new Error(pluginName + ': lineNumbers must be true or false. Given value: ' + value);
          break;
        case 'lineNumberStart':
          if (/^[0-9]+$/.test(value)) options.set(key, Number.parseInt(value));else throw new Error(pluginName + ': lineNumberStart must be a non-negative integer. Given value: ' + value);
          break;
        default:
          throw new Error(pluginName + ': Unknown options: ' + key);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return options;
}

/**
 * Highlight the code block.
 * @param {string} lang The language and other parameter.
 * @param {string} code The code to be highlighted.
 * @returns {string} The highlighted HTML code.
 */
function highlight(lang, code) {
  if (!lang) return { body: code, html: false };

  var optionData = lang.replace(' ', '').split('+');
  if (optionData.length === 1) optionData = optionData[0].split('__');
  lang = optionData.shift();
  var options = parseOptions(optionData);

  try {
    var theme = defaultTheme;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _ref = _step2.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];

        if (key === 'theme') theme = value;else highlighter.options[key] = value;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var jsdom = require('jsdom').jsdom;
    var document = jsdom('', {});

    var preElement = document.createElement('div');
    // Note: setting innerText does not work in jsdoc 9.4.2
    preElement.appendChild(document.createTextNode(code));
    preElement.setAttribute('class', 'sunlight-highlight-' + lang);

    var dummyElement = document.createElement('div');
    dummyElement.appendChild(preElement);
    highlighter.highlightNode(preElement);

    var rootNode = dummyElement.childNodes[0];
    rootNode.setAttribute('class', rootNode.getAttribute('class') + (' sunlight-theme-' + theme));

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
  book: {
    assets: 'compiled-assets',
    css: ['sunlight.css']
  },
  ebook: {
    assets: 'compiled-assets',
    css: ['sunlight.css']
  },
  blocks: {
    code: function code(block) {
      return highlight(block.kwargs.language, block.body);
    }
  },
  hooks: {
    init: function init() {
      loadDefaultOptions(this.options);
    }
  }
};