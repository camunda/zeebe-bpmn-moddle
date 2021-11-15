# Changelog

All notable changes to [zeebe-bpmn-moddle](https://github.com/zeebe-io/zeebe-bpmn-moddle) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

* `FEAT`: support `zeebe:assignmentDefinition` for `bpmn:UserTask`

## 0.9.0

* `FEAT`: support `zeebe:calledDecision` for `bpmn:BusinessRuleTask` ([ee9b59a](https://github.com/zeebe-io/zeebe-bpmn-moddle/commit/ee9b59a00145542a4de9c3193f5e5c13d42a2cfc))

## 0.8.0

* `FEAT`: make Message Intermediate Throw Event and Message End Event Zeebe Service Tasks to support Zeebe 1.2 ([#15](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/15))
* `FIX`: restrict `taskDefinition` property for Zeebe Service Tasks only ([#14](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/14))

## 0.7.1

* `FIX`: correctly encode HTML entities in extension properties ([#12](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/12))

## 0.7.0

* `FEAT`: extend ZeebeServiceTask type to support Zeebe 1.1 ([#9](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/9))

## 0.6.0

* `FEAT`: allow `zeebe:TaskHeaders` only in `bpmn:ServiceTask` ([#7](https://github.com/zeebe-io/zeebe-bpmn-moddle/issues/7))

## 0.5.0

* `FEAT`: add support for zeebe:UserTaskForm and zeebe:FormDefinition ([#6](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/6))

## 0.4.0

* `FIX`: add allowedIn for zeebe:IoMapping ([#5](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/5))

## 0.3.0

* `FEAT`: implement zeebe moddle extension and add canCopyProperty for initial set of elements ([#3](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/3))

## 0.2.0

* `FEAT`: allow `propagateAllChildVariables` attribute for `zeebe:CalledElement` ([#2](https://github.com/zeebe-io/zeebe-bpmn-moddle/pull/2))

## 0.1.0

* `CHORE`: first release :tada:
