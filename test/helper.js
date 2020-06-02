'use strict';

var fs = require('fs');


function readFile(filename) {
  return fs.readFileSync(filename, { encoding: 'UTF-8' });
}

module.exports.readFile = readFile;


var BpmnModdle = require('bpmn-moddle');

var zeebeDescriptor = require('../resources/zeebe');

function createModdle() {
  return new BpmnModdle({
    zeebe: zeebeDescriptor
  });
}

module.exports.createModdle = createModdle;