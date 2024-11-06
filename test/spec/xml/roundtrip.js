'use strict';

var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('import -> export roundtrip', function() {

  function stripSpaces(xml) {
    return xml.replace(/\n|\r/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s\/>/g, '/>')
      .replace(/>\s+</g, '><');
  }

  function validateExport(file) {

    return async function() {

      // given
      var xml = readFile(file);

      var moddle = createModdle();

      // when
      const {
        rootElement: definitions,
        warnings
      } = await moddle.fromXML(xml, 'bpmn:Definitions');

      // then
      expect(warnings).to.be.empty;

      // but when
      const {
        xml: savedXML
      } = await moddle.toXML(definitions);

      // then
      expect(stripSpaces(savedXML)).to.eql(stripSpaces(xml));
    };
  }


  describe('Zeebe properties', function() {

    it('should keep Zeebe properties', validateExport('test/fixtures/xml/simple.bpmn'));

  });


  it('should keep zeebe:properties', validateExport('test/fixtures/xml/zeebe-properties.bpmn'));


  it('should keep zeebe:modelerTemplate', validateExport('test/fixtures/xml/rootElement.bpmn'));


  describe('zeebe:UserTask', function() {

    it('should keep zeebe:formDefinition properties', validateExport('test/fixtures/xml/userTask-zeebe-formDefinition.bpmn'));

  });


  describe('zeebe:ExecutionListeners', function() {

    it('should keep zeebe:executionListeners', validateExport('test/fixtures/xml/zeebe-execution-listeners.bpmn'));

  });


  describe('zeebe:VersionTag', function() {

    it('should keep zeebe:versionTag', validateExport('test/fixtures/xml/zeebe-versionTag.bpmn'));

  });


  describe('zeebe:BindingTypeSupported', function() {

    it('should keep zeebe:bindingType', validateExport('test/fixtures/xml/zeebe-bindingType.bpmn'));

  });


  describe('zeebe:TaskListeners', function() {

    it('should keep zeebe:taskListeners', validateExport('test/fixtures/xml/zeebe-taskListeners.bpmn'));

  });

});
