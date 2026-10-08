---
architecture_md: 1
component: camunda/zeebe-bpmn-moddle
lifecycle: production
kind: [library]
summary: "The moddle descriptor of the zeebe: BPMN extension namespace (http://camunda.org/schema/zeebe/1.0) and its generated TypeScript types, which Camunda 8 modeling tools load into bpmn-moddle to read, create and write Zeebe extensions."
team: { name: camunda/modeling-dev, contact: unknown }
intake: { how: issue }
owns:
  - "The JavaScript (moddle) definition of the zeebe: namespace in resources/zeebe.json: prefix, URI, every zeebe: type, its properties (name, type, attribute or child, isMany) and XML serialization"
  - "Where a zeebe: extension may appear in a modeler: the bpmn: types each mixin extends (ZeebeServiceTask, TemplateSupported, TemplatedRootElement, ...) and each extension element's meta.allowedIn list"
  - "The modeler-facing attribute names zeebe:modelerTemplate, modelerTemplateVersion, modelerTemplateIcon, modelerConfigurationTemplate and modelerConfigurationName"
  - "The published TypeScript types for the zeebe: types (zeebe-bpmn-moddle/types, generated into dist/types at publish)"
  - "The npm package zeebe-bpmn-moddle: its exports map, semver releases and CHANGELOG"
does_not_own:
  - { concept: "Which zeebe: elements and attributes the engine accepts, and their Java model and design-time validation", owner: camunda/camunda/zeebe/bpmn-model }
  - { concept: "Runtime behaviour of a zeebe: attribute and validation that needs expressions or deployed resources", owner: camunda/camunda/zeebe/engine }
  - { concept: "Creating, updating and removing zeebe: extensions consistently while editing (behaviors)", owner: camunda/camunda-bpmn-js-behaviors }
  - { concept: "Properties-panel entries for zeebe: attributes", owner: bpmn-io/bpmn-js-properties-panel }
  - { concept: "Applying element templates and the template JSON schema", owner: bpmn-io/bpmn-js-element-templates }
  - { concept: "Which zeebe: features a given Camunda version supports (lint rules)", owner: camunda/bpmnlint-plugin-camunda-compat }
  - { concept: "BPMN 2.0 base types (bpmn:ServiceTask, bpmn:UserTask, ...)", owner: bpmn-io/bpmn-moddle }
  - { concept: "Camunda 7 camunda: namespace", owner: camunda/camunda-bpmn-moddle }
  - { concept: "Modeler-only metadata (modeler:executionPlatform, executionPlatformVersion)", owner: camunda/modeler-moddle }
depends_on:
  - id: moddle
    component: bpmn-io/moddle
    kind: library
    contract: "moddle >=8.2.0 (peer dependency): descriptor format (types, extends, superClass, meta) and the ModdleElement types the generated types build on"
    versions: "peer range >=8.2.0 in package.json; the host application installs moddle"
    workaround_policy: never
  - id: bpmn-moddle
    component: bpmn-io/bpmn-moddle
    kind: schema
    contract: "bpmn: types the descriptor extends and lists in allowedIn; bpmn-moddle/types in the type tests"
    versions: "devDependency ^10.1.0 only, not a declared peer; consumers bring their own bpmn-moddle (usually through bpmn-js)"
    workaround_policy: never
  - id: zeebe-bpmn-model
    component: camunda/camunda/zeebe/bpmn-model
    kind: schema
    contract: "The zeebe: namespace as the engine reads it: element and attribute names, types, allowed parents and multiplicity (ZeebeConstants, instance.zeebe)"
    architecture: zeebe/bpmn-model/ARCHITECTURE.md
    versions: "No version link: aligned by hand; nothing checks the two definitions against each other"
    workaround_policy: never
  - id: moddle-types-generator
    component: bpmn-io/moddle-types-generator
    kind: library
    contract: "@bpmn-io/moddle-types-generator ^0.2.1: moddle-generate-types CLI that produces dist/types from resources/zeebe.json"
    versions: caret range in devDependencies; Renovate updates
    workaround_policy: never
  - id: bpmn-io-tooling
    component: bpmn-io/actions
    kind: platform
    contract: "pull-request-quality action (PR.yml, pinned SHA), renovate-config:recommended, eslint-plugin-bpmn-io, the bpmn-io Definition of Done (PR template)"
    versions: action pinned by commit SHA; others by Renovate
    workaround_policy: never
consumers:
  - { who: camunda/camunda-bpmn-js, via: "dependency ^2.0.0; registers zeebe.json as a moddle extension of the Camunda 8 (camunda-cloud) Modeler distribution", promise: semver }
  - { who: camunda/camunda-modeler, via: "client dependency ^2.0.0 (Desktop Modeler)", promise: semver }
  - { who: "camunda/camunda-hub (Web Modeler)", via: "through camunda-bpmn-js (not verified: private repo)", promise: semver }
  - { who: camunda/camunda-bpmn-js-behaviors, via: "peer dependency >= 0.18; creates and removes zeebe: elements by type name", promise: semver }
  - { who: bpmn-io/bpmn-js-properties-panel, via: "devDependency ^2.0.0; the zeebe provider reads and writes zeebe: types by name and relies on the ZeebeServiceTask extends list", promise: semver }
  - { who: "bpmn-io/bpmn-js-element-templates, bpmn-io/variable-resolver, bpmn-io/form-variable-provider, bpmn-io/extract-process-variables, bpmn-io/element-template-chooser, bpmn-io/element-template-icon-renderer, bpmn-io/bpmn-js-create-append-anything, bpmn-io/bpmn-js-headless, bpmn-io/bpmn-js-tracking", via: "package.json dependency (dev or peer, not checked per repo); zeebe: type names and modelerTemplate attributes", promise: semver }
  - { who: "Users and third parties on npm (embedders of bpmn-js, BP3/camunda-lint and others found by code search)", via: "zeebe-bpmn-moddle/resources/zeebe.json and zeebe-bpmn-moddle/types", promise: "semver; breaking changes only in a major, listed under Breaking Changes in CHANGELOG.md" }
exposes:
  - { contract: "Moddle descriptor zeebe-bpmn-moddle/resources/zeebe.json (prefix zeebe, URI http://camunda.org/schema/zeebe/1.0)", spec: resources/zeebe.json, policy: "semver; removing or renaming a type or property is breaking (0.18.0 PropertiesHolder); the URI never changes" }
  - { contract: "Generated TypeScript types zeebe-bpmn-moddle/types (ZeebeModdleTypeMap, Zeebe<Type> per type)", spec: test/types/zeebe.ts, policy: "semver; generated at prepublish from zeebe.json, pinned by test:types; moved from the package root in 2.0.0" }
  - { contract: "Package entry points (exports map): ./types, ./resources/*, ./package.json; no main entry", spec: package.json, policy: "semver; 2.0.0 dropped extensionless and root imports" }
  - { contract: "Extension point: moddle extension registration", spec: README.md, policy: "a host passes the descriptor to BpmnModdle as { zeebe: descriptor } (moddleExtensions in bpmn-js); it adds zeebe: types and grafts zeebe: attributes onto bpmn: types through mixins (extends); it replaces nothing in bpmn-moddle. Another descriptor can extend zeebe: types the same way (not a documented use)" }
  - { contract: "Extension point: meta.allowedIn on each extension element", spec: resources/zeebe.json, policy: "metadata, not enforced by moddle; tools read it to decide where an extension element may be created; changing it is treated like C1" }
constraints:
  - { id: C1, name: Descriptor and exports stay backward compatible, hard: true, ref: CHANGELOG.md }
  - { id: C2, name: Engine defines the zeebe namespace first, hard: true, ref: "https://github.com/camunda/camunda/blob/main/zeebe/bpmn-model/ARCHITECTURE.md" }
  - { id: C3, name: Read/write/roundtrip fixtures for every type change, hard: true, ref: test/spec/xml/roundtrip.js }
  - { id: C4, name: Generated types build and the type harness passes, hard: true, ref: test/types/zeebe.ts }
  - { id: C5, name: No runtime dependencies, hard: false, ref: package.json }
  - { id: C6, name: Downstream modeling packages follow, hard: false, ref: README.md }
  - { id: C7, name: bpmn-io Definition of Done and PR quality, hard: true, ref: .github/PULL_REQUEST_TEMPLATE.md }
---

# Architecture — camunda/zeebe-bpmn-moddle

> Draft from the repository; not reviewed by its team. Facts marked `TODO(confirm)` are inferred.

## 1. Purpose

`zeebe-bpmn-moddle` describes the `zeebe:` BPMN extension namespace as a
[moddle](https://github.com/bpmn-io/moddle) descriptor, so bpmn-moddle (and every bpmn-js-based
modeler) can read, create and write Camunda 8 extensions, and publishes TypeScript types for it
([README](README.md)). Its users are the Camunda 8 modeling libraries and applications (Desktop
Modeler, Web Modeler through `camunda-bpmn-js`) and anyone embedding bpmn-js for Camunda 8. No
`SYSTEM.md` describes its system yet; the [bpmn.io ecosystem map](https://github.com/bpmn-io/ecosystem/blob/main/MAP.md)
places it in Layer 2, meta-modeling.

## 2. Ownership boundary

**Owns:** the descriptor `resources/zeebe.json` (36 types, no enumerations), where each `zeebe:`
extension may sit (`extends`, `meta.allowedIn`), the `modelerTemplate*` / `modelerConfiguration*`
attribute names, the generated types and the npm package. The full list is in the front matter.

The descriptor is the modelers' copy of a namespace the engine defines: `camunda/camunda/zeebe/bpmn-model`
lists `camunda/zeebe-bpmn-moddle` as the owner of the modeler descriptor and keeps a soft
constraint (its C6) that both stay aligned. Nothing checks this mechanically (C2).

Owner: there is no CODEOWNERS file. `.github/merge-me.yml` names the review teams `modeling-dev`
and `modeling-design`; recent releases are by Maciej Barelkowski, AlekseyManetov and Nico Rehwaldt,
and the package author is Maciej Barelkowski. TODO(confirm): the owning team is `@camunda/modeling-dev`,
and its contact channel. The PR template and CI come from bpmn-io (Definition of Done, PR quality
action, Renovate config), so the repo follows bpmn.io conventions although it sits in the `camunda` org.

Read from manifests, not confirmed, in the front matter:
- TODO(confirm): Web Modeler (`camunda/camunda-hub`) gets the descriptor through `camunda-bpmn-js`
  rather than its own dependency.
- TODO(confirm): which of the bpmn-io consumers found by code search use it only in tests, and
  which ship against it at runtime.
- TODO(confirm): the namespace URI `http://camunda.org/schema/zeebe/1.0` never changes.
- TODO(confirm): another descriptor extending `zeebe:` types is a supported use; which consumers
  read `meta.allowedIn` (behaviors, properties panel, element templates?) and whether changing it
  counts as breaking.

**Does not own (route here instead):**

| If you need… | It belongs to | How to ask |
|---|---|---|
| The engine to accept a new `zeebe:` element or attribute, its Java API and design-time validation | `camunda/camunda/zeebe/bpmn-model` | issue in `camunda/camunda`, label `component/zeebe` |
| What a `zeebe:` attribute does at runtime | `camunda/camunda/zeebe/engine` | issue in `camunda/camunda` |
| Extensions created, kept consistent or cleaned up while editing (for example mutually exclusive elements) | `camunda/camunda-bpmn-js-behaviors` | issue in that repo |
| A field in the properties panel | `bpmn-io/bpmn-js-properties-panel` (`src/provider/zeebe`) | issue in that repo |
| Applying element templates; template schema | `bpmn-io/bpmn-js-element-templates`, `camunda/element-templates-json-schema` | issue in that repo |
| A lint error for an unsupported feature in a Camunda version | `camunda/bpmnlint-plugin-camunda-compat` | issue in that repo |
| `camunda:` (Camunda 7) or `modeler:` attributes | `camunda/camunda-bpmn-moddle`, `camunda/modeler-moddle` | issue in that repo |
| User documentation of `zeebe:` extensions | `camunda/camunda-docs` | TODO(confirm) |

## 3. Structure

| Path | Contents |
|---|---|
| `resources/zeebe.json` | The descriptor; the only runtime artifact. `xml.tagAlias: lowerCase` |
| `dist/types/` (git-ignored) | `zeebe.d.ts` and `index.d.ts`, generated by `npm run generate-types` (also on `prepublishOnly`) |
| `test/spec/descriptor.js`, `integration.js` | Descriptor identity; registration with `BpmnModdle` |
| `test/spec/xml/read.js`, `write.js`, `roundtrip.js` | Import, export and import→export per type, against `test/fixtures/xml/` |
| `test/types/` | `tsc --noEmit` harness for the generated types (`ts-expect`) |

Kinds of type in the descriptor, which matter when adding one:

- **Mixins** (`extends`, no `superClass`): add attributes to existing types and are no element of
  their own: `ZeebeServiceTask` (retryCounter, and the anchor for task definition, I/O mapping and
  headers on service-task-like elements), `TemplateSupported`, `TemplatedRootElement`,
  `ConfigurationSupported`, `BindingTypeSupported`. The type harness pins that mixins are not in
  `ZeebeModdleTypeMap`.
- **Extension elements** (`superClass: Element` with `meta.allowedIn`): children of
  `bpmn:extensionElements`, for example `TaskDefinition`, `IoMapping`, `CalledElement`,
  `FormDefinition`, `ExecutionListeners`, `AdHoc`, `AgentDefinition`.
- **Value types** with no `allowedIn` (`Header`, `Property`, `InputOutputParameter`), and
  `zeebe:Properties`, which may sit anywhere (0.18.0).

Dependency direction: the descriptor references only `bpmn:` types and its own; it never refers to
other extension namespaces.

## 4. Binding decisions

No ADRs. The CHANGELOG's Breaking Changes sections record the lasting ones:

- 0.15.0: behaviors moved out to `camunda-bpmn-js-behaviors`; this package is schema only.
- 0.18.0: `zeebe:PropertiesHolder` removed; `zeebe:Properties` is allowed everywhere.
- 1.5.1: a misnamed type was renamed in a patch (`zeebe:priority` → `zeebe:priorityDefinition`).
  TODO(confirm): whether renames are allowed in patches when the type was just released.
- 2.0.0: an `exports` map; types under `zeebe-bpmn-moddle/types`; only full-path resource imports.
- Engine decisions that shaped the namespace (ADRs 0003 businessId, 0011 agentDefinition in
  `camunda/camunda/zeebe/docs/adr/`) are the engine team's; this package mirrors them.

## 5. Planning constraints

Every plan must answer each of these (applies / n/a + decision or reason).

### C1 — Descriptor and exports stay backward compatible
- **Question:** Does the change remove or rename a type, property, `extends` or `allowedIn` entry,
  change a property's type or `isAttr`/`isMany`, or change the `exports` map? Then it is a major
  release with a Breaking Changes entry. Will `.bpmn` files written by earlier versions still import
  without warnings?
- **Hard:** yes
- **Detail:** [CHANGELOG.md](CHANGELOG.md) (semantic versioning, Breaking Changes sections).

### C2 — Engine defines the zeebe namespace first
- **Question:** Does `camunda/camunda/zeebe/bpmn-model` define the same element or attribute
  (name, type, allowed parents, multiplicity)? From which Camunda version? If the descriptor ships
  first, how do linting and the modelers stop users from deploying it to an engine that rejects it?
- **Hard:** yes (TODO(confirm): whether the descriptor may lead the engine)
- **Detail:** [zeebe/bpmn-model ARCHITECTURE.md](https://github.com/camunda/camunda/blob/main/zeebe/bpmn-model/ARCHITECTURE.md)
  C5, C6; [`camunda/bpmnlint-plugin-camunda-compat`](https://github.com/camunda/bpmnlint-plugin-camunda-compat).

### C3 — Read/write/roundtrip fixtures for every type change
- **Question:** Is there a fixture in `test/fixtures/xml/` and a case in `read.js`, `write.js` and
  `roundtrip.js` for every new or changed type, with no import warnings?
- **Hard:** yes
- **Detail:** [`test/spec/xml/roundtrip.js`](test/spec/xml/roundtrip.js).

### C4 — Generated types build and the type harness passes
- **Question:** Does `npm run all` (lint, generate-types, test:types, test) pass? Does the change
  alter a published type in a way TypeScript users notice, including after a
  `@bpmn-io/moddle-types-generator` update?
- **Hard:** yes
- **Detail:** [`test/types/zeebe.ts`](test/types/zeebe.ts), `package.json` scripts.

### C5 — No runtime dependencies
- **Question:** Does the change add a `dependency`? The package ships only `resources/` and `dist/`,
  with `moddle` as its sole peer.
- **Hard:** no (TODO(confirm))
- **Detail:** [`package.json`](package.json).

### C6 — Downstream modeling packages follow
- **Question:** Which of behaviors, properties panel, element templates, variable resolver,
  `camunda-bpmn-js`, Desktop and Web Modeler need a follow-up release to use the new type, and in
  what order? Does `camunda-bpmn-js-behaviors`' peer range (`>= 0.18`) still hold after a major?
- **Hard:** no
- **Detail:** [README § Behaviors](README.md#behaviors); consumers in the front matter.

### C7 — bpmn-io Definition of Done and PR quality
- **Question:** Does the PR link its issue, describe the change and give steps to try it, as the PR
  template and the PR quality check require?
- **Hard:** yes
- **Detail:** [PR template](.github/PULL_REQUEST_TEMPLATE.md),
  [Definition of Done](https://github.com/bpmn-io/.github/blob/main/resources/DEFINITION_OF_DONE.md),
  [`PR.yml`](.github/workflows/PR.yml).

## 6. Data and persistence

No store. What it defines ends up in users' `.bpmn` files, written by the modelers and deployed to
the engine; that is why C1 and C2 are hard.

## 7. Cross-cutting qualities

- **Compatibility of saved models:** files written with any released descriptor must keep importing
  cleanly (C1).
- **Module format:** the package is consumed through its `exports` map; JSON is imported by full
  path. TODO(confirm): which bundlers and Node versions consumers must support (CI runs Node 24).
- Security, i18n, accessibility and performance: none specific to a JSON descriptor.

## 8. Delivery

Released to npm independently as `zeebe-bpmn-moddle`, by a maintainer bumping the version and
updating the CHANGELOG (commits "chore: update CHANGELOG", "x.y.z"). Consumers pick versions up
on their own schedule (TODO(confirm)). No backports or release branches. TODO(confirm): who may publish,
and whether a release is coordinated with a Camunda minor or happens as soon as the engine has
merged the feature.

## 9. Testing expectations

- `npm run all` in CI (`.github/workflows/CI.yml`, Ubuntu, Node 24): ESLint, type generation, the
  `tsc` type harness, mocha specs.
- Per type: read, write and roundtrip specs on XML fixtures (C3); type changes covered in
  `test/types/zeebe.ts` (C4).
- `xsd-schema-validator` is a devDependency (with `allowScripts`) that no test uses. TODO(confirm):
  whether XML should be validated against an XSD, and which (this repo has none).
- Nothing tests against the engine's model (`zeebe/bpmn-model`); alignment is a review step (C2).

## 10. Planning conventions

- Issues and PRs in `camunda/zeebe-bpmn-moddle`; no issue templates or labels in the repo.
- Commit messages: conventional prefixes (`feat:`, `fix:`, `chore:`, `deps:`, `test:`, `ci:`); the
  CHANGELOG uses `FEAT`, `FIX`, `CHORE` with the PR link.
- TODO(confirm): plans directory and ID prefix for plan refs.

## 11. Glossary

- **moddle descriptor:** JSON that declares a namespace's types for moddle; not an XSD.
- **zeebe-bpmn-moddle vs zeebe-bpmn-model:** this JavaScript descriptor for the modelers vs the Java
  library in `camunda/camunda` the engine parses with. Same namespace URI, separate definitions.
- **Mixin:** a type with `extends` that adds attributes to existing BPMN types rather than being an
  element of its own.
- **allowedIn:** descriptor metadata listing the parents an extension element may be created under.
- **Behaviors:** bpmn-js modules in `camunda-bpmn-js-behaviors` that keep `zeebe:` extensions
  consistent during editing; once part of this package (before 0.15.0).
