'use strict';


describe('descriptor', function() {

  var zeebeDescriptor = require('../../resources/zeebe');


  it('should provide model', function() {

    // then
    expect(zeebeDescriptor).to.exist;

    expect(zeebeDescriptor.uri).to.eql('http://camunda.org/schema/zeebe/1.0');
    expect(zeebeDescriptor.prefix).to.eql('zeebe');
  });

});