'use strict';

var BpmnModdle = require('bpmn-moddle');

var zeebeDescriptor = require('../../resources/zeebe');


describe('exports', function() {

  it('should extend bpmn-moddle', function() {

    // given
    var moddle = new BpmnModdle({
      zeebe: zeebeDescriptor
    });

    // when
    var serviceTask = moddle.create('bpmn:ServiceTask');

    // then
    expect(serviceTask.$instanceOf('zeebe:ZeebeServiceTask')).to.be.true;
  });

});