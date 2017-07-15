// Mapping from highlight.js language names into Sunlight language names.
const hljsToSunlight = {
  'c++': 'cpp',
  'h++': 'cpp',
  'obj-c': 'objective-c',
  apache: 'httpd',
  apacheconf: 'httpd',
  as: 'actionscript',
  atom: 'xml',
  bat: 'batch',
  bf: 'brainfuck',
  c: 'cpp',
  cc: 'cpp',
  cmd: 'batch',
  cs: 'csharp',
  dos: 'batch',
  erl: 'erlang',
  gemspec: 'ruby',
  gyp: 'python',
  h: 'cpp',
  hpp: 'cpp',
  hs: 'haskell',
  html: 'xml',
  irb: 'ruby',
  js: 'javascript',
  jsp: 'java',
  jsx: 'javascript',
  mm: 'objective-c',
  nginxconf: 'nginx',
  objc: 'objective-c',
  objectivec: 'objective-c',
  patch: 'diff',
  php3: 'php',
  php4: 'php',
  php5: 'php',
  php6: 'php',
  pl: 'perl',
  plist: 'xml',
  pm: 'perl',
  podspec: 'ruby',
  ps: 'powershell',
  py: 'python',
  rb: 'ruby',
  rss: 'xml',
  sh: 'bash',
  sql: 'mysql',
  thor: 'ruby',
  vbnet: 'vb',
  xhtml: 'xml',
  xjb: 'xml',
  xsd: 'xml',
  xsl: 'xml',
  zsh: 'bash',
};

/**
 * If the language is listed in the mapping above, return the mapped string.
 * Otherwise return the original string.
 * @param {string} lang
 * @returns {string}
 */
export function SanitizeLanguage(lang) {
  return hljsToSunlight.hasOwnProperty(lang) ? hljsToSunlight[lang] : lang;
}
