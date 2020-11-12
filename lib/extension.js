'use strict';

var isFunction = require('min-dash').isFunction,
    isObject = require('min-dash').isObject,
    some = require('min-dash').some;

var WILDCARD = '*';


function ZeebeModdleExtension(eventBus) {

  var self = this;

  eventBus.on('moddleCopy.canCopyProperty', function(context) {
    var property = context.property,
        parent = context.parent;

    return self.canCopyProperty(property, parent);
  });
}

ZeebeModdleExtension.$inject = [ 'eventBus' ];

ZeebeModdleExtension.prototype.canCopyProperty = function(property, parent) {

  // check if property is allowed in parent
  if (isObject(property) && !isAllowedInParent(property, parent)) {

    return false;
  }
};

module.exports = ZeebeModdleExtension;

// helpers //////////

function is(element, type) {
  return element && isFunction(element.$instanceOf) && element.$instanceOf(type);
}

function getParent(element, type) {
  if (!type) {
    return element.$parent;
  }

  if (is(element, type)) {
    return element;
  }

  if (!element.$parent) {
    return;
  }

  return getParent(element.$parent, type);
}

function isAllowedInParent(property, parent) {

  // (1) find property descriptor
  var descriptor = property.$type && property.$model.getTypeDescriptor(property.$type);

  var allowedIn = descriptor && descriptor.meta && descriptor.meta.allowedIn;

  if (!allowedIn || isWildcard(allowedIn)) {
    return true;
  }

  // (2) check if property has parent of allowed type
  return some(allowedIn, function(type) {
    return getParent(parent, type);
  });
}

function isWildcard(allowedIn) {
  return allowedIn.indexOf(WILDCARD) !== -1;
}