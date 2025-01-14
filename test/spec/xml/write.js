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


    it('CalledElement#propagateAllParentVariables - true', async function() {

      // given
      var fieldElem = moddle.create('zeebe:CalledElement', {
        propagateAllParentVariables: true
      });

      var expectedXML = '<zeebe:calledElement ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('CalledElement#propagateAllParentVariables - false', async function() {

      // given
      var fieldElem = moddle.create('zeebe:CalledElement', {
        propagateAllParentVariables: false
      });

      var expectedXML = '<zeebe:calledElement ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'propagateAllParentVariables="false" />';

      // when
      const xml = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:userTaskForm', async function() {

      // given
      var proc = moddle.create('bpmn:Process', {
        extensionElements: moddle.create('bpmn:ExtensionElements', {
          values: [
            moddle.create('zeebe:UserTaskForm', {
              id: 'userTaskForm-1',
              body: '{ components: [ { label: "field", key: "field" } ] }'
            }),
            moddle.create('zeebe:UserTaskForm', {
              id: 'userTaskForm-2',
              body: '{ components: [ { label: "<field>", key: "field" } ] }'
            })
          ]
        })
      });

      var expectedXML =
        '<bpmn:process xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                      'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0">' +
          '<bpmn:extensionElements>' +
            '<zeebe:userTaskForm id="userTaskForm-1">' +
              '{ components: [ { label: "field", key: "field" } ] }' +
            '</zeebe:userTaskForm>' +
            '<zeebe:userTaskForm id="userTaskForm-2">' +
              '{ components: [ { label: "&lt;field&gt;", key: "field" } ] }' +
            '</zeebe:userTaskForm>' +
          '</bpmn:extensionElements>' +
        '</bpmn:process>';

      // when
      const xml = await write(proc);

      // then
      expect(xml).to.eql(expectedXML);
    });


    describe('zeebe:formDefinition', function() {

      it('zeebe:formKey', async function() {

        // given
        var proc = moddle.create('bpmn:UserTask', {
          extensionElements: moddle.create('bpmn:ExtensionElements', {
            values: [
              moddle.create('zeebe:FormDefinition', {
                formKey: 'form-1'
              })
            ]
          })
        });

        var expectedXML =
          '<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                         'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0">' +
            '<bpmn:extensionElements>' +
              '<zeebe:formDefinition formKey="form-1" />' +
            '</bpmn:extensionElements>' +
          '</bpmn:userTask>';

        // when
        const xml = await write(proc);

        // then
        expect(xml).to.eql(expectedXML);
      });


      it('zeebe:formId', async function() {

        // given
        var proc = moddle.create('bpmn:UserTask', {
          extensionElements: moddle.create('bpmn:ExtensionElements', {
            values: [
              moddle.create('zeebe:FormDefinition', {
                formId: 'form-1'
              })
            ]
          })
        });

        var expectedXML =
          '<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                         'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0">' +
            '<bpmn:extensionElements>' +
              '<zeebe:formDefinition formId="form-1" />' +
            '</bpmn:extensionElements>' +
          '</bpmn:userTask>';

        // when
        const xml = await write(proc);

        // then
        expect(xml).to.eql(expectedXML);
      });


      it('zeebe:externalReference', async function() {

        // given
        var proc = moddle.create('bpmn:UserTask', {
          extensionElements: moddle.create('bpmn:ExtensionElements', {
            values: [
              moddle.create('zeebe:FormDefinition', {
                externalReference: 'form-1'
              })
            ]
          })
        });

        var expectedXML =
          '<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                         'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0">' +
            '<bpmn:extensionElements>' +
              '<zeebe:formDefinition externalReference="form-1" />' +
            '</bpmn:extensionElements>' +
          '</bpmn:userTask>';

        // when
        const xml = await write(proc);

        // then
        expect(xml).to.eql(expectedXML);
      });
    });


    it('zeebe:userTask', async function() {

      // given
      var userTask = moddle.create('zeebe:UserTask', {});

      var expectedXML = '<zeebe:userTask ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" />';

      // when
      const xml = await write(userTask);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:calledDecision', async function() {

      // given
      var calledDecision = moddle.create('zeebe:CalledDecision', {
        decisionId: 'dishDecision',
        resultVariable: 'dishVariable'
      });

      var expectedXML = '<zeebe:calledDecision ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'decisionId="dishDecision" ' +
        'resultVariable="dishVariable" />';

      // when
      const xml = await write(calledDecision);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:AssignmentDefinition', async function() {

      // given
      var assignmentDefinition = moddle.create('zeebe:AssignmentDefinition', {
        assignee: 'myAssignee',
        candidateGroups: 'myCandidateGroup',
        candidateUsers: 'myCandidateUser'
      });

      var expectedXML = '<zeebe:assignmentDefinition ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'assignee="myAssignee" ' +
        'candidateGroups="myCandidateGroup" ' +
        'candidateUsers="myCandidateUser" />';

      // when
      const xml = await write(assignmentDefinition);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:PriorityDefinition', async function() {

      // given
      var priority = moddle.create('zeebe:PriorityDefinition', {
        priority: '100'
      });

      var expectedXML = '<zeebe:priorityDefinition ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'priority="100" />';

      // when
      const xml = await write(priority);

      // then
      expect(xml).to.eql(expectedXML);

    });


    it('zeebe:TaskSchedule', async function() {

      // given
      var taskSchedule = moddle.create('zeebe:TaskSchedule', {
        dueDate: '2023-04-20T04:20:00Z',
        followUpDate: '=followUpDate'
      });

      var expectedXML = '<zeebe:taskSchedule ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'dueDate="2023-04-20T04:20:00Z" ' +
        'followUpDate="=followUpDate" />';

      // when
      const xml = await write(taskSchedule);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:modelerTemplate', async function() {

      // given
      const moddleElement = moddle.create('zeebe:ZeebeServiceTask', {
        modelerTemplate: 'foo'
      });

      const expectedXML = '<zeebe:zeebeServiceTask ' +
      'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
      'modelerTemplate="foo" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:modelerTemplate on root element', async function() {

      // given
      const moddleElement = moddle.create('bpmn:Message', {
        modelerTemplate: 'foo'
      });

      const expectedXML = '<bpmn:message ' +
      'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
      'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
      'zeebe:modelerTemplate="foo" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:modelerTemplateVersion', async function() {

      // given
      const moddleElement = moddle.create('zeebe:ZeebeServiceTask', {
        modelerTemplateVersion: '12'
      });

      const expectedXML = '<zeebe:zeebeServiceTask ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'modelerTemplateVersion="12" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:modelerTemplateIcon', async function() {

      // given
      const moddleElement = moddle.create('zeebe:ZeebeServiceTask', {
        modelerTemplateIcon: "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width='16' height='16'%3E%3C/svg%3E",
      });

      const expectedXML = '<zeebe:zeebeServiceTask ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'modelerTemplateIcon="data:image/svg+xml,%3Csvg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#39;16&#39; height=&#39;16&#39;%3E%3C/svg%3E" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:script', async function() {

      // given
      const moddleElement = moddle.create('zeebe:Script', {
        expression: '=today()',
        resultVariable: 'result'
      });

      const expectedXML = '<zeebe:script ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'expression="=today()" resultVariable="result" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:ExecutionListeners', async function() {

      // given
      const moddleElement = moddle.create('zeebe:ExecutionListeners', {
        listeners: [
          moddle.create('zeebe:ExecutionListener', {
            eventType: 'start',
            retries: '3',
            type: 'sysout'
          })
        ]
      });

      const expectedXML = '<zeebe:executionListeners ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0">' +
        '<zeebe:executionListener eventType="start" retries="3" type="sysout" />' +
        '</zeebe:executionListeners>';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:VersionTag', async function() {

      // given
      const moddleElement = moddle.create('zeebe:VersionTag', {
        value: 'v1.0.0'
      });

      const expectedXML = '<zeebe:versionTag ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'value="v1.0.0" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    describe('zeebe:BindingTypeSupported', function() {

      describe('zeebe:bindingType', function() {

        it('on zeebe:CalledDecision', async function() {

          // given
          const moddleElement = moddle.create('zeebe:CalledDecision', {
            bindingType: 'deployment'
          });

          const expectedXML = '<zeebe:calledDecision ' +
            'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
            'bindingType="deployment" />';

          // when
          const xml = await write(moddleElement);

          // then
          expect(xml).to.eql(expectedXML);
        });


        it('on zeebe:CalledElement', async function() {

          // given
          const moddleElement = moddle.create('zeebe:CalledElement', {
            bindingType: 'deployment'
          });

          const expectedXML = '<zeebe:calledElement ' +
            'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
            'bindingType="deployment" />';

          // when
          const xml = await write(moddleElement);

          // then
          expect(xml).to.eql(expectedXML);
        });


        it('on zeebe:FormDefinition', async function() {

          // given
          const moddleElement = moddle.create('zeebe:FormDefinition', {
            bindingType: 'deployment'
          });

          const expectedXML = '<zeebe:formDefinition ' +
            'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
            'bindingType="deployment" />';

          // when
          const xml = await write(moddleElement);

          // then
          expect(xml).to.eql(expectedXML);
        });

      });


      describe('zeebe:versionTag', function() {

        it('on zeebe:CalledDecision', async function() {

          // given
          const moddleElement = moddle.create('zeebe:CalledDecision', {
            bindingType: 'versionTag',
            versionTag: 'v1.0.0'
          });

          const expectedXML = '<zeebe:calledDecision ' +
            'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
            'bindingType="versionTag" ' +
            'versionTag="v1.0.0" />';

          // when
          const xml = await write(moddleElement);

          // then
          expect(xml).to.eql(expectedXML);
        });


        it('on zeebe:CalledElement', async function() {

          // given
          const moddleElement = moddle.create('zeebe:CalledElement', {
            bindingType: 'versionTag',
            versionTag: 'v1.0.0'
          });

          const expectedXML = '<zeebe:calledElement ' +
            'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
            'bindingType="versionTag" ' +
            'versionTag="v1.0.0" />';

          // when
          const xml = await write(moddleElement);

          // then
          expect(xml).to.eql(expectedXML);
        });


        it('on zeebe:FormDefinition', async function() {

          // given
          const moddleElement = moddle.create('zeebe:FormDefinition', {
            bindingType: 'versionTag',
            versionTag: 'v1.0.0'
          });

          const expectedXML = '<zeebe:formDefinition ' +
            'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
            'bindingType="versionTag" ' +
            'versionTag="v1.0.0" />';

          // when
          const xml = await write(moddleElement);

          // then
          expect(xml).to.eql(expectedXML);
        });


        it('on zeebe:LinkedResource', async function() {

          // given
          const moddleElement = moddle.create('zeebe:LinkedResource', {
            bindingType: 'versionTag',
            versionTag: 'v1.0.0'
          });

          const expectedXML = '<zeebe:linkedResource ' +
            'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
            'bindingType="versionTag" ' +
            'versionTag="v1.0.0" />';

          // when
          const xml = await write(moddleElement);

          // then
          expect(xml).to.eql(expectedXML);
        });

      });

    });


    it('zeebe:TaskListeners', async function() {

      // given
      const moddleElement = moddle.create('zeebe:TaskListeners', {
        listeners: [
          moddle.create('zeebe:TaskListener', {
            eventType: 'complete',
            retries: '1',
            type: 'complete_listener'
          })
        ]
      });

      const expectedXML = '<zeebe:taskListeners ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0">' +
        '<zeebe:taskListener eventType="complete" retries="1" type="complete_listener" />' +
        '</zeebe:taskListeners>';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:LinkedResource', async function() {

      // given
      const moddleElement = moddle.create('zeebe:LinkedResource', {
        resourceId:'=myScript',
        resourceType:'RPA',
        linkName:'myScript' });

      const expectedXML = '<zeebe:linkedResource ' +
        'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" ' +
        'resourceId="=myScript" ' +
        'resourceType="RPA" ' +
        'linkName="myScript" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('zeebe:LinkedResources', async function() {

      // given
      const moddleElement = moddle.create('zeebe:LinkedResources');

      const expectedXML = '<zeebe:linkedResources xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" />';

      // when
      const xml = await write(moddleElement);

      // then
      expect(xml).to.eql(expectedXML);
    });
  });

});
