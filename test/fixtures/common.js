import assert from 'assert';
import {JSDOM} from 'jsdom';

/**
 * Return the first div element inside the root node of the document.
 * @param {Object} document
 * @return {Object}
 */
export function getDivElementFromDocument(document) {
  return document.body.childNodes[0];
}

/**
 * Return the list of class names of a HTML DOM node.
 * @param {Object} node
 * @return {string[]}
 */
export function getClassList(node) {
  return node.className.split(' ');
}

/**
 * Verify the block processing results.
 * @param {string} result
 * @param {string} languageExpected
 * @param {string} themeExpected
 * @param {boolean} lineNumbersExpected
 * @param {number} lineNumberStartExpected
 */
export function verifyResult(
  result,
  languageExpected,
  themeExpected,
  lineNumbersExpected,
  lineNumberStartExpected
) {
  const document = new JSDOM(result).window.document;
  const divElement = getDivElementFromDocument(document);

  assert(
    getClassList(divElement).indexOf(`sunlight-theme-${themeExpected}`) >= 0
  );

  assert.strictEqual(
    divElement.getElementsByClassName(
      `sunlight-highlighted sunlight-highlight-${languageExpected}`
    ).length,
    1
  );

  const divLineNumberMargins = divElement.getElementsByClassName(
    'sunlight-line-number-margin'
  );

  assert.strictEqual(divLineNumberMargins.length, lineNumbersExpected ? 1 : 0);

  if (lineNumbersExpected) {
    const startLineNumberRegEx = /^sunlight-\d+-line-(\d+)$/;
    const match = divLineNumberMargins[0].childNodes[0].name.match(
      startLineNumberRegEx
    );
    assert.notStrictEqual(match, null);

    assert.strictEqual(match[1], lineNumberStartExpected.toString());
  }
}
