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

      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-zeebe-extensions.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, proc) {

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

          done(err);
        });
      });
    });


    describe('zeebe:retryCounter', function() {

      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-zeebe-retryCounter.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:ServiceTask',
            retryCounter: 'text'
          });

          done(err);
        });
      });
    });


    describe('zeebe:Subscription', function() {

      it('on Message', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/message-zeebe-subscription.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Message', function(err, proc) {

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

          done(err);
        });
      });
    });


    describe('zeebe:Subscription', function() {

      it('on Message', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/message-zeebe-subscription.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Message', function(err, proc) {

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

          done(err);
        });
      });
    });


    describe('zeebe:calledElement', function() {

      it('on CallActivity', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/call-activity-zeebe-calledElement.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:CallActivity', function(err, proc) {

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

          done(err);
        });
      });
    });


    describe('zeebe:loopCharacteristics', function() {

      it('on CallActivity', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-zeebe-loopCharacteristics.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, proc) {

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

          done(err);
        });
      });
    });


    describe('zeebe:ioMapping / zeebe:Input / zeebe:Output', function() {

      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-zeebe-ioMapping.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, proc) {

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

          done(err);
        });
      });
    });
  });
});
