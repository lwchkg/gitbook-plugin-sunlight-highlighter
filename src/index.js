import {Highlighter} from 'sunlight-x';
import {SanitizeLanguage} from './lang-mapping.js';

const pluginName = 'Sunlight-highlighter';

let defaultLineNumbers;
let defaultTheme;
let log;

/**
 * Sanitize the name of the theme. Returns the name if it is alphanumeric.
 * Otherwise returns "gitbook", i.e. the default theme.
 * @param {string} name The name of theme to be validated.
 * @returns {string}
 */
function SanitizeTheme(name) {
  if (/^[0-9A-Za-z]*$/.test(name))
    return name;
  return 'gitbook';
}

/**
 * Loads the options in book.json or book.js. These options are used unless
 * overriden by a per-page/per-script option.
 * @param {Object} options Pass this.options to this parameter.
 */
function loadDefaultOptions(options) {
  const pluginOptions = options.pluginsConfig['sunlight-highlighter'];

  defaultLineNumbers = pluginOptions.lineNumbers;

  const theme = SanitizeTheme(pluginOptions.theme);
  defaultTheme = theme;
}

/**
 * Log an error
 @param {string} message
 */
function logError(message) {
  log.error.ln(`${pluginName}: ${message}`);
}

/**
 * Parse the options
 * @param {sting[]} optionList The list of options. Each option is formatted in
 * "key:value". Examples are "theme:gitbook", "lineNumbers:true", and
 * "lineNumberStart:10".
 * @returns {Object} Key-value pairs of options.
 */
function parseOptions(optionList) {
  const options = {};
  options.lineNumbers = defaultLineNumbers;
  options.lineNumberStart = 1;

  for (const optionItem of optionList) {
    const [key, value] = optionItem.split(':', 2);

    switch (key) {
    case 'theme':
      if (/^[A-Za-z0-9_-]*$/.test(value))
        options[key] = SanitizeTheme(value);
      else
        logError(`Invalid theme: ${key}`);
      break;
    case 'lineNumbers':
      if (value === 'true' || value === 'false')
        options[key] = value === 'true';
      else
        logError(`lineNumbers must be true or false. Given value: ${value}`);
      break;
    case 'lineNumberStart':
      if (/^[0-9]+$/.test(value))
        options[key] = Number.parseInt(value);
      else
        logError(`lineNumberStart must be a non-negative integer. Given value: ${value}`);
      break;
    default:
      logError(`Unknown options: ${key}`);
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
  if (!lang || lang === 'nohighlight')
    return {body: code, html: false};

  const optionData = lang.replace(' ', '').split('+');
  lang = SanitizeLanguage(optionData.shift());
  const options = parseOptions(optionData);
  if (!Object.prototype.hasOwnProperty.call(options, 'theme'))
    options.theme = defaultTheme;

  try {
    const highlighter = new Highlighter(options);

    return highlighter.highlightCode(code, lang);
  } catch (e) { log.error(e); }

  return {body: code, html: false};
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
