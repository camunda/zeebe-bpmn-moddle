'use strict';

var fs = require('fs');


function readFile(filename) {
  return fs.readFileSync(filename, { encoding: 'UTF-8' });
}

module.exports.readFile = readFile;

/**
 * Normalizes whitespace in XML string by removing newlines and leading spaces.
 *
 * @example
 * const result = normalizeXMLWhitespace(`
 *   <bpmn:process id="Process_1">
 *     <bpmn:startEvent id="StartEvent_1" />
 *   </bpmn:process>
 * `);
 *
 * // result === '<bpmn:process id="Process_1"><bpmn:startEvent id="StartEvent_1" /></bpmn:process>'
 *
 * @param {string} str
 *
 * @returns {string}
 */
function normalizeXMLWhitespace(str) {
  return str.replace(/\n\s*/g, '');
}

module.exports.normalizeXMLWhitespace = normalizeXMLWhitespace;


var { BpmnModdle } = require('bpmn-moddle');

var zeebeDescriptor = require('../resources/zeebe');

function createModdle() {
  return new BpmnModdle({
    zeebe: zeebeDescriptor
  });
}

module.exports.createModdle = createModdle;