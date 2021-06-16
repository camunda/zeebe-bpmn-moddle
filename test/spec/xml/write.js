'use strict';

var assign = require('min-dash').assign,
    isFunction = require('min-dash').isFunction;

var Helper = require('../../helper');


describe('write', function() {

  var moddle = Helper.createModdle();


  function write(element, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }

    // skip preamble for tests
    options = assign({ preamble: false }, options);

    moddle.toXML(element, options, callback);
  }


  describe('should export properties', function() {

    it('ServiceTask#retryCounter', function(done) {

      // given
      var fieldElem = moddle.create('bpmn:ServiceTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:serviceTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('SendTask#retryCounter', function(done) {

      // given
      var fieldElem = moddle.create('bpmn:SendTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:sendTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('BusinessRuleTask#retryCounter', function(done) {

      // given
      var fieldElem = moddle.create('bpmn:BusinessRuleTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:businessRuleTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('ScriptTask#retryCounter', function(done) {

      // given
      var fieldElem = moddle.create('bpmn:ScriptTask', {
        retryCounter: 'text'
      });

      var expectedXML = '<bpmn:scriptTask ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'zeebe:retryCounter="text" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('CalledElement#propagateAllChildVariables - true', function(done) {

      // given
      var fieldElem = moddle.create('zeebe:CalledElement', {
        propagateAllChildVariables: true
      });

      var expectedXML = '<zeebe:calledElement ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'propagateAllChildVariables="true" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('CalledElement#propagateAllChildVariables - false', function(done) {

      // given
      var fieldElem = moddle.create('zeebe:CalledElement', {
        propagateAllChildVariables: false
      });

      var expectedXML = '<zeebe:calledElement ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'propagateAllChildVariables="false" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });
  });

});
