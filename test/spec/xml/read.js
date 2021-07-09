'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });


    describe('zeebe:TaskDefinition / zeebe:TaskHeaders / zeebe:Header', function() {

      it('on ServiceTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-service-task/serviceTask-zeebe-extensions.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:ServiceTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          id: 'collect-money',
          name: 'Collect Money',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:TaskDefinition',
                type: 'payment-service',
                retries: '5'
              },
              {
                $type: 'zeebe:TaskHeaders',
                values: [
                  {
                    $type: 'zeebe:Header',
                    key: 'method',
                    value: 'VISA'
                  }
                ]
              }
            ]
          }
        });
      });

    });


    describe('zeebe:retryCounter', function() {

      it('on ServiceTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-service-task/serviceTask-zeebe-retryCounter.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:ServiceTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          retryCounter: 'text'
        });
      });

    });


    describe('zeebe:Subscription', function() {

      it('on Message', async function() {

        // given
        var xml = readFile('test/fixtures/xml/message-zeebe-subscription.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:Message');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:Message',
          id: 'Message',
          name: 'Money collected',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:Subscription',
                correlationKey: 'orderId'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:Subscription', function() {

      it('on Message', async function() {

        // given
        var xml = readFile('test/fixtures/xml/message-zeebe-subscription.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:Message');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:Message',
          id: 'Message',
          name: 'Money collected',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:Subscription',
                correlationKey: 'orderId'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:calledElement', function() {

      it('on CallActivity', async function() {

        // given
        var xml = readFile('test/fixtures/xml/call-activity-zeebe-calledElement.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:CallActivity');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:CallActivity',
          id: 'task-A',
          name: 'A',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:CalledElement',
                processId: 'child-process-id'
              }
            ]
          }
        });

      });


      it('on CallActivity with propagateAllChildVariables', async function() {

        // given
        var xml = readFile('test/fixtures/xml/call-activity-zeebe-calledElement-propagateAllChildVariables.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:CallActivity');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:CallActivity',
          id: 'task-A',
          name: 'A',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:CalledElement',
                processId: 'child-process-id',
                propagateAllChildVariables: true
              }
            ]
          }
        });
      });

    });


    describe('zeebe:loopCharacteristics', function() {

      it('on CallActivity', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-service-task/serviceTask-zeebe-loopCharacteristics.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:ServiceTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          id: 'task-A',
          name: 'A',
          loopCharacteristics: {
            $type: 'bpmn:MultiInstanceLoopCharacteristics',
            isSequential: true,
            extensionElements: {
              $type: 'bpmn:ExtensionElements',
              values: [
                {
                  $type: 'zeebe:LoopCharacteristics',
                  inputCollection: '= items',
                  inputElement: 'item',
                  outputCollection: 'results',
                  outputElement: '= result'
                }
              ]
            }
          }
        });
      });

    });


    describe('zeebe:ioMapping / zeebe:Input / zeebe:Output', function() {

      it('on ServiceTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-service-task/serviceTask-zeebe-ioMapping.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:ServiceTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          id: 'collect-money',
          name: 'Collect Money',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:IoMapping',
                inputParameters: [
                  {
                    $type: 'zeebe:Input',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ],
                outputParameters: [
                  {
                    $type: 'zeebe:Output',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ]
              }
            ]
          }
        });

      });


      it('on SendTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-service-task/sendTask-zeebe-ioMapping.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:SendTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:SendTask',
          id: 'collect-money',
          name: 'Collect Money',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:IoMapping',
                inputParameters: [
                  {
                    $type: 'zeebe:Input',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ],
                outputParameters: [
                  {
                    $type: 'zeebe:Output',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ]
              }
            ]
          }
        });

      });


      it('on ScriptTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-service-task/scriptTask-zeebe-ioMapping.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:ScriptTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:ScriptTask',
          id: 'collect-money',
          name: 'Collect Money',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:IoMapping',
                inputParameters: [
                  {
                    $type: 'zeebe:Input',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ],
                outputParameters: [
                  {
                    $type: 'zeebe:Output',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ]
              }
            ]
          }
        });

      });


      it('on BusinessRuleTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-service-task/businessRuleTask-zeebe-ioMapping.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:BusinessRuleTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:BusinessRuleTask',
          id: 'collect-money',
          name: 'Collect Money',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:IoMapping',
                inputParameters: [
                  {
                    $type: 'zeebe:Input',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ],
                outputParameters: [
                  {
                    $type: 'zeebe:Output',
                    source: 'sourceValue',
                    target: 'targetValue'
                  }
                ]
              }
            ]
          }
        });
      });

    });


    describe('zeebe:userTaskForm', function() {

      it('on Process', async function() {

        // given
        var xml = readFile('test/fixtures/xml/process-zeebe-userTaskForm.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:Process');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:Process',
          id: 'process-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:UserTaskForm',
                id: 'userTaskForm-1',
                body: '{ components: [ { label: "field", key: "field" } ] }'
              },
              {
                $type: 'zeebe:UserTaskForm',
                id: 'userTaskForm-2',
                body: '{ components: [ { label: "<field>", key: "field" } ] }'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:formDefinition', function() {

      it('on UserTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/userTask-zeebe-formDefinition.part.bpmn');

        // when
        const {
          rootElement: proc
        } = await moddle.fromXML(xml, 'bpmn:UserTask');

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:UserTask',
          id: 'user-task-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:FormDefinition',
                formKey: 'form-1'
              }
            ]
          }
        });
      });

    });

  });

});
