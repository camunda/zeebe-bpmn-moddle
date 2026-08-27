/**
 * Type-level harness for the generated Zeebe moddle types.
 *
 * Compiled with `tsc --noEmit` (see the `test:types` script) — nothing runs at
 * runtime. Each assertion pins down a part of the contract consumers rely on:
 * how a Zeebe extension shows up on a real moddle element.
 */

import { expectType } from 'ts-expect';

import type { ModdleElement } from 'moddle';
import type { BpmnServiceTask } from 'bpmn-moddle/types';

import type {
  ZeebeModdleTypeMap,
  ZeebeZeebeServiceTask,
  ZeebeTaskDefinition,
  ZeebeIoMapping,
  ZeebeInput,
  ZeebeHeader
} from 'zeebe-bpmn-moddle/types';


// a mixin composes onto its base: a Zeebe service task is a `bpmn:ServiceTask`
// with the Zeebe extension properties grafted on
type ZeebeServiceTask = ModdleElement<BpmnServiceTask & ZeebeZeebeServiceTask>;

declare const serviceTask: ZeebeServiceTask;
expectType<string | undefined>(serviceTask.implementation); // from bpmn
expectType<string | undefined>(serviceTask.retryCounter);   // from zeebe


// mixin types graft onto other types from the side — they are no element's own type
// @ts-expect-error `zeebe:ZeebeServiceTask` is a mixin, not an element
type NoServiceTask = ZeebeModdleTypeMap['zeebe:ZeebeServiceTask'];
// @ts-expect-error `zeebe:TemplateSupported` grafts from the side, not an element
type NoTemplateSupported = ZeebeModdleTypeMap['zeebe:TemplateSupported'];


// concrete extension elements expose their modeled properties
expectType<ZeebeTaskDefinition>({ type: 'my-worker', retries: '3' });
expectType<ZeebeHeader>({ key: 'priority', value: '10' });


// nested children are typed as moddle elements of the child type
declare const ioMapping: ModdleElement<ZeebeIoMapping>;
const firstInput = ioMapping.inputParameters?.[0];
expectType<ModdleElement<ZeebeInput> | undefined>(firstInput);
expectType<string | undefined>(firstInput?.source);


export type { ZeebeServiceTask, NoServiceTask, NoTemplateSupported };
