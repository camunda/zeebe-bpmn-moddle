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


    it('should allow on intermediateThrowEvent with messageDefinition', function() {

      // given
      var loopCharacteristics = moddle.create('zeebe:LoopCharacteristics'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
          messageIntermediateThrowEvent = moddle.create('bpmn:IntermediateThrowEvent');

      extensionElements.$parent = messageIntermediateThrowEvent;
      messageEventDefinition.$parent = messageIntermediateThrowEvent;
      messageIntermediateThrowEvent.eventDefinitions = [messageEventDefinition];

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(loopCharacteristics, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on errorEndEvent', function() {

      // given
      var loopCharacteristics = moddle.create('zeebe:LoopCharacteristics'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          errorEventDefinition = moddle.create('bpmn:ErrorEventDefinition'),
          endEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = endEvent;
      errorEventDefinition.$parent = endEvent;
      endEvent.eventDefinitions = [errorEventDefinition];

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

    it('should not allow on NoneEndEvents', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          input = moddle.create('zeebe:Input'),
          endEvent = moddle.create('bpmn:EndEvent'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = endEvent;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(input, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });

    it('should allow on MessageEndEvents', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          input = moddle.create('zeebe:Input'),
          messageEndEvent = moddle.create('bpmn:EndEvent'),
          messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = messageEndEvent;
      messageEventDefinition.$parent = messageEndEvent;
      messageEndEvent.eventDefinitions = [messageEventDefinition];

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(input, extensionElements);

      // then
      expect(canCopyProperty).to.not.be.false;
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

    it('should allow on NoneEndEvents', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          output = moddle.create('zeebe:Output'),
          endEvent = moddle.create('bpmn:EndEvent'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = endEvent;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(output, extensionElements);

      // then
      expect(canCopyProperty).to.not.be.false;
    });

    it('should allow on MessageEndEvents', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          output = moddle.create('zeebe:Output'),
          messageEndEvent = moddle.create('bpmn:EndEvent'),
          messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      ioMapping.$parent = extensionElements;
      extensionElements.$parent = messageEndEvent;
      messageEventDefinition.$parent = messageEndEvent;
      messageEndEvent.eventDefinitions = [messageEventDefinition];

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(output, extensionElements);

      // then
      expect(canCopyProperty).to.not.be.false;
    });

  });


  describe('<zeebe:IoMapping>', function() {

    it('should allow on ServiceTask', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          serviceTask = moddle.create('bpmn:ServiceTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = serviceTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(ioMapping, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on ReceiveTask', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          receiveTask = moddle.create('bpmn:ReceiveTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = receiveTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(ioMapping, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on EndEvent', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          endEvent = moddle.create('bpmn:EndEvent'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = endEvent;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(ioMapping, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on CallActivity', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          callActivity = moddle.create('bpmn:CallActivity'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = callActivity;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(ioMapping, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on SubProcess', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          subProcess = moddle.create('bpmn:SubProcess'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = subProcess;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(ioMapping, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on Task', function() {

      // given
      var ioMapping = moddle.create('zeebe:IoMapping'),
          task = moddle.create('bpmn:Task'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = task;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(ioMapping, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });

  });


  describe('<zeebe:TaskHeaders>', function() {

    it('should allow on ServiceTask', function() {

      // given
      var taskHeaders = moddle.create('zeebe:TaskHeaders'),
          serviceTask = moddle.create('bpmn:ServiceTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = serviceTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskHeaders, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on SendTask', function() {

      // given
      var taskHeaders = moddle.create('zeebe:TaskHeaders'),
          sendTask = moddle.create('bpmn:SendTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = sendTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskHeaders, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on ScriptTask', function() {

      // given
      var taskHeaders = moddle.create('zeebe:TaskHeaders'),
          scriptTask = moddle.create('bpmn:ScriptTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = scriptTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskHeaders, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should allow on BusinessRuleTask', function() {

      // given
      var taskHeaders = moddle.create('zeebe:TaskHeaders'),
          businessRuleTask = moddle.create('bpmn:BusinessRuleTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = businessRuleTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskHeaders, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should NOT allow on ReceiveTask', function() {

      // given
      var taskHeaders = moddle.create('zeebe:TaskHeaders'),
          receiveTask = moddle.create('bpmn:ReceiveTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = receiveTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskHeaders, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should NOT allow on SubProcess', function() {

      // given
      var taskHeaders = moddle.create('zeebe:TaskHeaders'),
          subProcess = moddle.create('bpmn:SubProcess'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = subProcess;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskHeaders, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should NOT allow on Task', function() {

      // given
      var taskHeaders = moddle.create('zeebe:TaskHeaders'),
          task = moddle.create('bpmn:Task'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      extensionElements.$parent = task;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskHeaders, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });

  });


  describe('<zeebe:TaskDefinition>', function() {

    it('should allow on ServiceTask', function() {

      // given
      var taskDefinition = moddle.create('zeebe:TaskDefinition'),
          serviceTask = moddle.create('bpmn:ServiceTask'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      taskDefinition.$parent = extensionElements;
      extensionElements.$parent = serviceTask;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskDefinition, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on Task', function() {

      // given
      var taskDefinition = moddle.create('zeebe:TaskDefinition'),
          task = moddle.create('bpmn:Task'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      taskDefinition.$parent = extensionElements;
      extensionElements.$parent = task;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskDefinition, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should not allow on StartEvent', function() {

      // given
      var taskDefinition = moddle.create('zeebe:TaskDefinition'),
          startEvent = moddle.create('bpmn:StartEvent'),
          extensionElements = moddle.create('bpmn:ExtensionElements');

      taskDefinition.$parent = extensionElements;
      extensionElements.$parent = startEvent;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskDefinition, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should allow on endEvent with messageDefinition', function() {

      // given
      var taskDefinition = moddle.create('zeebe:TaskDefinition'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
          messageEndEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = messageEndEvent;
      messageEventDefinition.$parent = messageEndEvent;
      messageEndEvent.eventDefinitions = [messageEventDefinition];

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskDefinition, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should not allow on endEvent without messageDefinition', function() {

      // given
      var taskDefinition = moddle.create('zeebe:TaskDefinition'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          endEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = endEvent;

      // when
      var canCopyProperty = zeebeModdleExtension.canCopyProperty(taskDefinition, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });

  });

});


// helpers //////////

function EventBusMock() {
  this.on = function() {};
}
