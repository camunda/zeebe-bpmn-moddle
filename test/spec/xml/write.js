'use strict';

var assign = require('min-dash').assign,
    isFunction = require('min-dash').isFunction;

var Helper = require('../../helper');


describe('write', function() {

  var moddle = Helper.createModdle();


  async function write(element, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }

    // skip preamble for tests
    options = assign({ preamble: false }, options);

    const { xml } = await moddle.toXML(element, options);

    return xml;
  }


  describe('should export properties', function() {

    it('ServiceTask#retryCounter', async function() {

      // given
      var fieldElem = moddle.create('bpmn:ServiceTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:serviceTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('SendTask#retryCounter', async function() {

      // given
      var fieldElem = moddle.create('bpmn:SendTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:sendTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('BusinessRuleTask#retryCounter', async function() {

      // given
      var fieldElem = moddle.create('bpmn:BusinessRuleTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:businessRuleTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('ScriptTask#retryCounter', async function() {

      // given
      var fieldElem = moddle.create('bpmn:ScriptTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:scriptTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('CalledElement#propagateAllChildVariables - true', async function() {

      // given
      var fieldElem = moddle.create('zeebe:CalledElement', {
        propagateAllChildVariables: true
      });

      var expectedXML = '<zeebe:calledElement ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'propagateAllChildVariables="true" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('CalledElement#propagateAllChildVariables - false', async function() {

      // given
      var fieldElem = moddle.create('zeebe:CalledElement', {
        propagateAllChildVariables: false
      });

      var expectedXML = '<zeebe:calledElement ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'propagateAllChildVariables="false" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });

  });

});
