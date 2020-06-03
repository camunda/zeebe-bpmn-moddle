# zeebe-bpmn-moddle

[![Build Status](https://travis-ci.com/zeebe-io/zeebe-bpmn-moddle.svg)](https://travis-ci.org/zeebe-io/zeebe-bpmn-moddle)

This project defines the [Zeebe](https://zeebe.io) namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.

## Usage

Use it together with [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) to validate Zeebe BPMN 2.0 extensions.

```javascript
var BpmnModdle = require('bpmn-moddle');

var zeebeModdle = require('zeebe-bpmn-moddle/resources/zeebe');

var moddle = new BpmnModdle({ zeebe: zeebeModdle });

var serviceTask = moddle.create('bpmn:ServiceTask', {
  'javaDelegate': 'my.company.SomeDelegate'
});
```

## Building the Project

Execute the test via

```sh
npm test
```

Perform a complete build of the application via

```sh
npm run all
```

## [bpmn-js](https://github.com/bpmn-io/bpmn-js) Extension

We include an extension that makes [bpmn-js](https://github.com/bpmn-io/bpmn-js) copy and replace mechanisms aware of Zeebe properties.

```js
var BpmnJS = require('bpmn-js/lib/Modeler'),
    zeebeModdle = require('zeebe-bpmn-moddle/resources/zeebe');

var modeler = new BpmnJS({
    moddleExtensions: {
      zeebe: zeebeModdle
    }
  });
```

This extension hooks into the copy mechanism provided by the BPMN editor and ensures Zeebe properties are kept and or dropped on copy and element replace.

## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).
