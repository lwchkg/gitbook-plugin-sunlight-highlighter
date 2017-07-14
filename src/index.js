const sunlight = require('../sunlight-all-min.js').Sunlight;
const highlighter = new sunlight.Highlighter();

const pluginName = 'Sunlight-highlighter';

let defaultLineNumbers;
let defaultTheme;
let log;

/**
 * Validate the name of the theme. If valid returns the name, otherwise returns
 * 'gitbook', i.e. the default theme.
 * @param {string} name The name of theme to be validated.
 * @returns {string}
 */
function ValidateTheme(name) {
  const validThemes = {
    'gitbook': '',
    'light': '',
    'dark': '',
  };
  return validThemes.hasOwnProperty(name) ? name : 'gitbook';
}

/**
 * Loads the options in book.json or book.js. These options are used unless
 * overriden by a per-page/per-script option.
 * @param {Object} options Pass this.options to this parameter.
 */
function loadDefaultOptions(options) {
  const pluginOptions = options.pluginsConfig['sunlight-highlighter'];

  defaultLineNumbers = pluginOptions.lineNumber;

  const theme = ValidateTheme(pluginOptions.theme);
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
  const options = new Map();
  options.set('lineNumbers', defaultLineNumbers);
  options.set('lineNumberStart', 1);

  for (const optionItem of optionList) {
    const [key, value] = optionItem.split(':', 2);

    switch (key) {
    case 'theme':
      if (/^[A-Za-z0-9]+$/.test(value))
        options.set(key, ValidateTheme(value));
      else
        throw new Error(`${pluginName}: Invalid theme: ${key}`);
      break;
    case 'lineNumbers':
      if (value === 'true' || value === 'false')
        options.set(key, value === 'true');
      else
        throw new Error(`${pluginName}: lineNumbers must be true or false. Given value: ${value}`);
      break;
    case 'lineNumberStart':
      if (/^[0-9]+$/.test(value))
        options.set(key, Number.parseInt(value));
      else
        throw new Error(`${pluginName}: lineNumberStart must be a non-negative integer. Given value: ${value}`);
      break;
    default:
      throw new Error(`${pluginName}: Unknown options: ${key}`);
    }
  }

  return options;
}

/**
 * Highlight the code block.
 * @param {string|undefined} lang The language and other parameter.
 * @param {string|undefined} code The code to be highlighted.
 * @returns {string} The highlighted HTML code.
 */
function highlight(lang, code) {
  if (!lang)
    lang = 'plaintext';
  else if (lang === 'nohighlight')
    return {body: code, html: false};

  const optionData = lang.replace(' ', '').split('+');
  lang = optionData.shift();
  const options = parseOptions(optionData);

  try {
    let theme = defaultTheme;
    for (const [key, value] of options) {
      if (key === 'theme')
        theme = value;
      else
        highlighter.options[key] = value;
    }

    const jsdom = require('jsdom').jsdom;
    const document = jsdom('', {});

    const preElement = document.createElement('div');
    // Note: setting innerText does not work in jsdoc 9.4.2
    preElement.appendChild(document.createTextNode(code));
    preElement.setAttribute('class', `sunlight-highlight-${lang}`);

    const dummyElement = document.createElement('div');
    dummyElement.appendChild(preElement);
    highlighter.highlightNode(preElement);

    const rootNode = dummyElement.childNodes[0];
    rootNode.setAttribute('class',
      rootNode.getAttribute('class') + ` sunlight-theme-${theme}`);

    return dummyElement.innerHTML;
  } catch (e) { log.error(e); }

  return {
    body: code,
    html: false,
  };
}

module.exports = {
  book: {
    assets: 'compiled-assets',
    css: ['sunlight.css'],
  },
  ebook: {
    assets: 'compiled-assets',
    css: ['sunlight.css'],
  },
  blocks: {
    code: function(block) {
      return highlight(block.kwargs.language, block.body);
    },
  },
  hooks: {
    init: function() {
      loadDefaultOptions(this.options);
      log = this.log;
    },
  },
};
