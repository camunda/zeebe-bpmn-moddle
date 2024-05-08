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


  describe('should keep zeebe attributes', function() {

    it('Service Task:FormData', validateExport('test/fixtures/xml/simple.bpmn'));

  });


  it('should keep zeebe:properties', validateExport('test/fixtures/xml/zeebe-properties.bpmn'));


  it('should keep zeebe:modelerTemplate', validateExport('test/fixtures/xml/rootElement.bpmn'));


  describe('userTask', function() {

    it('should keep zeebe:formDefinition properties', validateExport('test/fixtures/xml/userTask-zeebe-formDefinition.bpmn'));
  });


  describe('executionListeners', function() {

    it('should keep zeebe:executionListeners', validateExport('test/fixtures/xml/zeebe-execution-listeners.bpmn'));
  });
});
