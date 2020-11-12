'use strict';

var ZeebeModdleExtension = require('../../lib/extension');

var createModdle = require('../helper').createModdle;


describe('extension - can copy', function() {

  var zeebeModdleExtension,
      moddle;

  beforeEach(function() {
    zeebeModdleExtension = new ZeebeModdleExtension(new EventBusMock());

    moddle = createModdle();
  });


  describe('<zeebe:CalledElement>', function() {

    it('should allow on CallActivity', function() {

      // given
      var calledElement = moddle.create('zeebe:CalledElement'),
          callActivity = moddle.create('bpmn:CallActivity'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = callActivity;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(calledElement, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on ServiceTask', function() {

      // given
      var calledElement = moddle.create('zeebe:CalledElement'),
          serviceTask = moddle.create('bpmn:ServiceTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = serviceTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(calledElement, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });
  });


  describe('<zeebe:LoopCharacteristics>', function() {

    it('should allow on ServiceTask', function() {

      // given
      var loopCharacteristics = moddle.create('zeebe:LoopCharacteristics'),
          serviceTask = moddle.create('bpmn:ServiceTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = serviceTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(loopCharacteristics, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on ReceiveTask', function() {

      // given
      var loopCharacteristics = moddle.create('zeebe:LoopCharacteristics'),
          receiveTask = moddle.create('bpmn:ReceiveTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = receiveTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(loopCharacteristics, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on SubProcess', function() {

      // given
      var loopCharacteristics = moddle.create('zeebe:LoopCharacteristics'),
          subProcess = moddle.create('bpmn:SubProcess'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = subProcess;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(loopCharacteristics, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on CallActivity', function() {

      // given
      var loopCharacteristics = moddle.create('zeebe:LoopCharacteristics'),
          callActivity = moddle.create('bpmn:CallActivity'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = callActivity;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(loopCharacteristics, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });
  });


  describe('<zeebe:Input>', function() {

    it('should allow on ServiceTask', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          input = moddle.create('zeebe:Input'),
          serviceTask = moddle.create('bpmn:ServiceTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = serviceTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(input, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on ReceiveTask', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          input = moddle.create('zeebe:Input'),
          receiveTask = moddle.create('bpmn:ReceiveTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = receiveTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(input, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should not allow on Task', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          input = moddle.create('zeebe:Input'),
          task = moddle.create('bpmn:Task'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = task;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(input, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });
  });


  describe('<zeebe:Output>', function() {

    it('should allow on ServiceTask', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          output = moddle.create('zeebe:Output'),
          serviceTask = moddle.create('bpmn:ServiceTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = serviceTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(output, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on ReceiveTask', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          output = moddle.create('zeebe:Output'),
          receiveTask = moddle.create('bpmn:ReceiveTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = receiveTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(output, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on StartEvent', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          output = moddle.create('zeebe:Output'),
          startEvent = moddle.create('bpmn:StartEvent'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = startEvent;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(output, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on Task', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          output = moddle.create('zeebe:Output'),
          task = moddle.create('bpmn:Task'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = task;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(output, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });
  });
});


// helpers //////////

function EventBusMock() {
  this.on = function() {};
}