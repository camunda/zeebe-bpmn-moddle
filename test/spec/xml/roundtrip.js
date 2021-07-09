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

      var xml = readFile(file);

      var moddle = createModdle();

      const {
        rootElement: definitions
      } = await moddle.fromXML(xml, 'bpmn:Definitions');

      const {
        xml: savedXML
      } = await moddle.toXML(definitions);

      expect(stripSpaces(savedXML)).to.eql(stripSpaces(xml));
    };
  }


  describe('should keep zeebe attributes', function() {

    it('Service Task:FormData', validateExport('test/fixtures/xml/simple.bpmn'));

  });

});
