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


    describe('zeebe:Properties', function() {

      it('on StartEvent', async function() {

        // given
        var xml = readFile('test/fixtures/xml/startEvent-zeebe-properties.part.bpmn');

        // when
        const {
          rootElement: event
        } = await moddle.fromXML(xml, 'bpmn:StartEvent');

        // then
        expect(event).to.jsonEqual({
          $type: 'bpmn:StartEvent',
          id: 'start',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:Properties',
                properties: [
                  {
                    $type: 'zeebe:Property',
                    name: 'id',
                    value: 'start'
                  },
                  {
                    $type: 'zeebe:Property',
                    name: 'type',
                    value: 'event'
                  }
                ]
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

      describe('with propagateAllParentVariables', function() {

        it('default value', function() {

          // when
          var bo = moddle.create('zeebe:CalledElement');

          // then
          expect(bo.get('zeebe:propagateAllParentVariables')).to.be.true;
        });


        it('default value read from BPMN', async function() {

          // given
          var xml = readFile('test/fixtures/xml/call-activity-zeebe-calledElement.part.bpmn');

          // when
          const {
            rootElement: proc
          } = await moddle.fromXML(xml, 'bpmn:CallActivity');

          const extensionElements = proc.get('extensionElements');
          const values = extensionElements.get('values');
          const calledElement = values[0];

          // then
          expect(calledElement.get('zeebe:propagateAllParentVariables')).to.be.true;
        });


        it('disabled in BPMN', async function() {

          // given
          var xml = readFile('test/fixtures/xml/call-activity-zeebe-calledElement-propagateAllParentVariables.part.bpmn');

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
                  propagateAllParentVariables: false
                }
              ]
            }
          });

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

      describe('on UserTask', function() {

        it('zeebe:formKey', async function() {

          // given
          var xml = readFile('test/fixtures/xml/userTask-zeebe-formDefinition-formKey.part.bpmn');

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


        it('zeebe:formId', async function() {

          // given
          var xml = readFile('test/fixtures/xml/userTask-zeebe-formDefinition-formId.part.bpmn');

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
                  formId: 'form-1'
                }
              ]
            }
          });
        });


        it('zeebe:externalReference', async function() {

          // given
          var xml = readFile('test/fixtures/xml/userTask-zeebe-formDefinition-externalReference.part.bpmn');

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
                  externalReference: 'form-1'
                }
              ]
            }
          });
        });
      });

    });


    describe('zeebe:userTask', function() {

      it('should read', async function() {

        // given
        var xml = readFile('test/fixtures/xml/userTask-zeebe-userTask.part.bpmn');

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
                $type: 'zeebe:UserTask'
              }
            ]
          }
        });
      });
    });


    describe('zeebe:calledDecision', function() {

      it('on BusinessRuleTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/businessRuleTask-zeebe-calledDecision.part.bpmn');

        // when
        const {
          rootElement: task
        } = await moddle.fromXML(xml, 'bpmn:BusinessRuleTask');

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:BusinessRuleTask',
          id: 'business-rule-task-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:CalledDecision',
                decisionId: 'dishId',
                resultVariable: 'dishVariable'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:AssignmentDefinition', function() {

      it('on UserTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/userTask-zeebe-assignmentDefinition.part.bpmn');

        // when
        const {
          rootElement: task
        } = await moddle.fromXML(xml, 'bpmn:UserTask');

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:UserTask',
          id: 'user-task-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:AssignmentDefinition',
                assignee: '= ring.bearer',
                candidateGroups: 'elves, men, dwarfs, hobbits',
                candidateUsers: 'saruman, gandalf'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:PriorityDefinition', function() {

      it('on UserTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/userTask-zeebe-priority.part.bpmn');

        // when
        const {
          rootElement: task
        } = await moddle.fromXML(xml, 'bpmn:UserTask');

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:UserTask',
          id: 'user-task-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:PriorityDefinition',
                priority: '75'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:TaskSchedule', function() {

      it('on UserTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/userTask-zeebe-taskSchedule.part.bpmn');

        // when
        const {
          rootElement: task
        } = await moddle.fromXML(xml, 'bpmn:UserTask');

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:UserTask',
          id: 'user-task-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:TaskSchedule',
                dueDate: '2023-04-20T04:20:00Z',
                followUpDate: '=followUpDate'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:TemplateSupported', function() {

      describe('zeebe:modelerTemplate', function() {

        it('on Task', async function() {

          // given
          var xml = readFile('test/fixtures/xml/task-modelerTemplate.part.bpmn');

          // when
          const {
            rootElement: task
          } = await moddle.fromXML(xml, 'bpmn:Task');

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo'
          });
        });

      });


      describe('zeebe:modelerTemplateVersion', function() {

        it('on Task', async function() {

          // given
          var xml = readFile('test/fixtures/xml/task-modelerTemplateVersion.part.bpmn');

          // when
          const {
            rootElement: task
          } = await moddle.fromXML(xml, 'bpmn:Task');

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo',
            modelerTemplateVersion: 1
          });
        });

      });


      describe('zeebe:modelerTemplateIcon', function() {

        it('on Task', async function() {

          // given
          const xml = readFile('test/fixtures/xml/task-modelerTemplateIcon.part.bpmn');

          // when
          const {
            rootElement: task
          } = await moddle.fromXML(xml, 'bpmn:Task');

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo',
            modelerTemplateVersion: 1,
            modelerTemplateIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3C/svg%3E"
          });
        });

      });

    });


    describe('zeebe:TemplatedRootElement', function() {

      describe('zeebe:modelerTemplate', function() {

        it('on root elements', async function() {

          // given
          var xml = readFile('test/fixtures/xml/rootElement.bpmn');

          // when
          const {
            rootElement: definitions
          } = await moddle.fromXML(xml, 'bpmn:Definitions');

          // then
          expect(definitions).to.jsonEqual({
            $type: 'bpmn:Definitions',
            targetNamespace: 'http://bpmn.io/schema/bpmn',
            rootElements: [
              {
                $type: 'bpmn:Message',
                modelerTemplate: 'templateId'
              },
              {
                $type: 'bpmn:Error',
                modelerTemplate: 'templateId'
              },
              {
                $type: 'bpmn:Signal',
                modelerTemplate: 'templateId'
              },
              {
                $type: 'bpmn:Escalation',
                modelerTemplate: 'templateId'
              }
            ]
          });
        });

      });
    });


    describe('zeebe:script', function() {

      it('on ScriptTask', async function() {

        // given
        var xml = readFile('test/fixtures/xml/scriptTask-zeebe-script.part.bpmn');

        // when
        const {
          rootElement: task
        } = await moddle.fromXML(xml, 'bpmn:ScriptTask');

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:ScriptTask',
          id: 'script-task-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:Script',
                expression: '=today()',
                resultVariable: 'result'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:ExecutionListener', function() {

      it('on Task', async function() {

        // given
        var xml = readFile('test/fixtures/xml/task-zeebe-executionListener.part.bpmn');

        // when
        const {
          rootElement: task
        } = await moddle.fromXML(xml, 'bpmn:Task');

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:Task',
          id: 'task-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:ExecutionListeners',
                listeners: [
                  {
                    $type: 'zeebe:ExecutionListener',
                    eventType: 'start',
                    retries: '3',
                    type: 'sysout'
                  }
                ]
              }
            ]
          }
        });
      });


      it('on Event', async function() {

        // given
        var xml = readFile('test/fixtures/xml/event-zeebe-executionListener.part.bpmn');

        // when
        const {
          rootElement: event
        } = await moddle.fromXML(xml, 'bpmn:EndEvent');

        // then
        expect(event).to.jsonEqual({
          $type: 'bpmn:EndEvent',
          id: 'endEvent-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:ExecutionListeners',
                listeners: [
                  {
                    $type: 'zeebe:ExecutionListener',
                    eventType: 'start',
                    retries: '3',
                    type: 'sysout'
                  }
                ]
              }
            ]
          }
        });
      });


      it('on Gateway', async function() {

        // given
        var xml = readFile('test/fixtures/xml/gateway-zeebe-executionListener.part.bpmn');

        // when
        const {
          rootElement: gateway
        } = await moddle.fromXML(xml, 'bpmn:ExclusiveGateway');

        // then
        expect(gateway).to.jsonEqual({
          $type: 'bpmn:ExclusiveGateway',
          id: 'exclusiveGateway-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:ExecutionListeners',
                listeners: [
                  {
                    $type: 'zeebe:ExecutionListener',
                    eventType: 'start',
                    retries: '3',
                    type: 'sysout'
                  }
                ]
              }
            ]
          }
        });
      });

    });


    describe('zeebe:VersionTag', function() {

      it('on Process', async function() {

        // given
        var xml = readFile('test/fixtures/xml/zeebe-versionTag.part.bpmn');

        // when
        const {
          rootElement: task
        } = await moddle.fromXML(xml, 'bpmn:Process');

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:Process',
          id: 'process-1',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'zeebe:VersionTag',
                value: 'v1.0.0'
              }
            ]
          }
        });
      });

    });


    describe('zeebe:BindingTypeSupported', function() {

      describe('zeebe:bindingType', function() {

        it('on zeebe:CalledDecision', async function() {

          // given
          var xml = readFile('test/fixtures/xml/calledDecision-bindingType.part.bpmn');

          // when
          const {
            rootElement: businessRuleTask
          } = await moddle.fromXML(xml, 'bpmn:BusinessRuleTask');

          // then
          expect(businessRuleTask).to.jsonEqual({
            $type: 'bpmn:BusinessRuleTask',
            id: 'BusinessRuleTask_1',
            extensionElements: {
              $type: 'bpmn:ExtensionElements',
              values: [
                {
                  $type: 'zeebe:CalledDecision',
                  bindingType: 'deployment'
                }
              ]
            }
          });
        });


        it('on zeebe:CalledElement', async function() {

          // given
          var xml = readFile('test/fixtures/xml/calledElement-bindingType.part.bpmn');

          // when
          const {
            rootElement: callActivity
          } = await moddle.fromXML(xml, 'bpmn:CallActivity');

          // then
          expect(callActivity).to.jsonEqual({
            $type: 'bpmn:CallActivity',
            id: 'CallActivity_1',
            extensionElements: {
              $type: 'bpmn:ExtensionElements',
              values: [
                {
                  $type: 'zeebe:CalledElement',
                  bindingType: 'deployment'
                }
              ]
            }
          });
        });


        it('on zeebe:FormDefinition', async function() {

          // given
          var xml = readFile('test/fixtures/xml/formDefinition-bindingType.part.bpmn');

          // when
          const {
            rootElement: userTask
          } = await moddle.fromXML(xml, 'bpmn:UserTask');

          // then
          expect(userTask).to.jsonEqual({
            $type: 'bpmn:UserTask',
            id: 'UserTask_1',
            extensionElements: {
              $type: 'bpmn:ExtensionElements',
              values: [
                {
                  $type: 'zeebe:FormDefinition',
                  bindingType: 'deployment'
                }
              ]
            }
          });
        });

      });


      describe('zeebe:versionTag', function() {

        it('on zeebe:CalledDecision', async function() {

          // given
          var xml = readFile('test/fixtures/xml/calledDecision-versionTag.part.bpmn');

          // when
          const {
            rootElement: businessRuleTask
          } = await moddle.fromXML(xml, 'bpmn:BusinessRuleTask');

          // then
          expect(businessRuleTask).to.jsonEqual({
            $type: 'bpmn:BusinessRuleTask',
            id: 'BusinessRuleTask_1',
            extensionElements: {
              $type: 'bpmn:ExtensionElements',
              values: [
                {
                  $type: 'zeebe:CalledDecision',
                  bindingType: 'versionTag',
                  versionTag: 'v1.0.0'
                }
              ]
            }
          });
        });


        it('on zeebe:CalledElement', async function() {

          // given
          var xml = readFile('test/fixtures/xml/calledElement-versionTag.part.bpmn');

          // when
          const {
            rootElement: callActivity
          } = await moddle.fromXML(xml, 'bpmn:CallActivity');

          // then
          expect(callActivity).to.jsonEqual({
            $type: 'bpmn:CallActivity',
            id: 'CallActivity_1',
            extensionElements: {
              $type: 'bpmn:ExtensionElements',
              values: [
                {
                  $type: 'zeebe:CalledElement',
                  bindingType: 'versionTag',
                  versionTag: 'v1.0.0'
                }
              ]
            }
          });
        });


        it('on zeebe:FormDefinition', async function() {

          // given
          var xml = readFile('test/fixtures/xml/formDefinition-versionTag.part.bpmn');

          // when
          const {
            rootElement: userTask
          } = await moddle.fromXML(xml, 'bpmn:UserTask');

          // then
          expect(userTask).to.jsonEqual({
            $type: 'bpmn:UserTask',
            id: 'UserTask_1',
            extensionElements: {
              $type: 'bpmn:ExtensionElements',
              values: [
                {
                  $type: 'zeebe:FormDefinition',
                  bindingType: 'versionTag',
                  versionTag: 'v1.0.0'
                }
              ]
            }
          });
        });

      });

    });

  });

});
