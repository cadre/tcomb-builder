[![CircleCI](https://img.shields.io/circleci/project/github/cadre/tcomb-builder.svg?style=flat-square)](https://circleci.com/gh/cadre/tcomb-builder)
[![dependency status](https://img.shields.io/david/cadre/tcomb-builder.svg?style=flat-square)](https://david-dm.org/cadre/tcomb-builder)
![npm downloads](https://img.shields.io/npm/dm/tcomb-builder.svg?style=flat-square)

# tcomb-builder 

_tcomb-builder is an immutable interface for [tcomb-form](https://github.com/gcanti/tcomb-form)_

Tcomb builder is deprecated. We will review and accept reasonable PRs, but we are not actively developing this project.

## Install

`npm install tcomb-builder tcomb-validation`

## Benefits

1. Immutability

2. Replaces deeply nested options objects in your codebase

3. Yields a standard tcomb type and options object

## Syntax

If you use tcomb-form, you probably have a lot of code that looks like this:

```js
import tcomb from 'tcomb-form';

function validation(value) {
  return value.length > 0
      ? null
      : 'Please provide a value';
}

const FirstName = tcomb.refinement(
  tcomb.String,
  validation,
  'FirstName',
);

FirstName.getValidationErrorMessage = validation;

const options = {
  factory: function TextField(props)...,
  label: 'First Name',
};

// <tcomb.Form type={FirstName} options={options} />
```

This code has a few problems:

1. **Mutability makes the type hard to reuse.**

   It is hard to reuse the FirstName type in another place that requires
   slightly modified validation, e.g. a max length restriction, because
   `getValidationErrorMessage` is set as a static function on the type.

2. **Mutability makes the options object hard to reuse.**

   Creating another field, e.g. 'Last Name', would require copy-pasting or
   `Object.assign`ing the options object.

3. **Nested options objects are hard to maintain.**

   If the above field is placed inside a `tcomb.struct`, the options object is
   deeply nested. The more structs, the more nesting.

Thanks to its immutable design, tcomb-builder offers a cleaner syntax that
encourages code-reuse.

```js
import tcomb from 'tcomb-form';

import { BaseBuilder } from 'tcomb-builder';

function validation(value) {
  return value.length > 0
      ? null
      : 'Please provide a value';
}

const TextBuilder = new BaseBuilder()
  .setTypeAndValidate('Text', tcomb.String)
  .setValidation('LengthValidation', validation);

const firstName = TextBuilder.setLabel('First Name');

// <tcomb.Form type={firstName.getType()} options={firstName.getOptions()} />
```

This code is equivalent to the first example, with the following advantages:

1. **Immutability makes the type and options objects easy to reuse.**

   Making a `lastName` field is as easy as `TextBuilder.setLabel('Last Name')`.
   Every `.set` method returns a new builder, so `TextBuilder` itself is never
   modified.

2. **Type and options objects are built together.**

   When using structs, you don't have to worry about maintaining parallel type
   and options structures. tcomb-builder is _one_ interface for _all_ of tcomb,
   tcomb-validation, and tcomb-form. The parallel structures are maintained
   internally and accessed with the `.getType` and `.getOptions` methods.

## Documentation

There is thorough documentation within the [docs](./docs) folder.

Start with the documentation on what this library exports
([api.md](./docs/api.md)) and the builder documentation
([builder.md](./docs/builder.md)).

## Background Reading

- [tcomb (API)](https://github.com/gcanti/tcomb/blob/master/docs/API.md)
- [tcomb (Guide)](https://github.com/gcanti/tcomb/blob/master/docs/GUIDE.md)
- [tcomb-validation](https://github.com/gcanti/tcomb-validation)
- [tcomb-form](https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md)

## Example

Here is an example of a simple form. All `primitives` and `widgets` builders
extend the `BaseBuilder`. Note that `widgets` are `primitives` that have a
template set on them.

```js
import { primitives, validators, widgets } from 'tcomb-builder';

const name = widgets.TextBuilder.setLabel('Name');

const dateOfBirth = widgets.TextBuilder
  .setValidation('BirthdateValidation', validators.date.birthdate)
  .setLabel('Date of Birth');

const occupation = widgets.TextBuilder
  .setLabel('Occupation')
  .makeOptional();

const bananaStand = widgets.CheckboxBuilder
  .setLabel('Worked at banana stand');
const chickenDance = widgets.CheckboxBuilder
  .setLabel('Does chicken dance');
const hugeMistake = widgets.CheckboxBuilder
  .setLabel('Has made a huge mistake');
const none = widgets.CheckboxBuilder
  .setLabel('None of the above');

const noneKey = 'isNone';
const crossValidation = validators.combine([
  validators.checkbox.noneOfAbove(noneKey),
  validators.checkbox.minMax({ min: 1, max: 2 }),
]);

const foodGroup = widgets.CheckboxGroupBuilder
  .setValidation('SelectOneOrTwo', crossValidation)
  .setField('bananaStand', bananaStand)
  .setField('chickenDance', chickenDance)
  .setField('hugeMistake', hugeMistake)
  .setLabel('Character Traits')
  .setField(noneKey, none);

export default widgets.StructBuilder
  .setField('name', name)
  .setField('dateOfBirth', dateOfBirth)
  .setField('occupation', occupation)
  .setField('foodGroup', foodGroup)
  .setColumns(2);
```

Once exported, the page builder provides us with its tcomb type and options
blob, which can be passed directly to
[tcomb-form](https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md) without
modification.

```js
const type = InvestorInformationBuilder.getType();
const options = InvestorInformationBuilder.getOptions();
<tcomb.Form type={type} options={options} />
```

The end result, once tcomb template factories have been created for the
underlying primitive types—text field, drop down, checkbox, and struct
template primitives in this example—is that the form will render exactly
as we expect it to.

## Builders

Builders are composable, and this library uses three terms to describe them:

1. Primitives: Builders that define a single input (e.g. a text field) or a
   structure (e.g. struct); primitive builders are found in the
   [primitives](./src/primitives) folder.

2. Widgets: Primitives that have a template provider already set on
   them. They are found in the [widgets](./src/widgets) folder.

2. Forms: Builders that define an entire page (e.g. Credit Card Information);
   examples are found in the [examples](./src/examples) folder

## Setting Templates

When you first set up tcomb-builder, it is recommended to create an instance of
`LazyTemplateInterface`, which defines a mapping of component types to
templates. With this interface and the `setLazyTemplateFactory` function, your
templates are defined in one place (the `LazyTemplateInterface`), which makes
refactoring easier.

If you have a Node backend, you can use the same builders on both the client
and server. The builders on the server will never realize the lazy templates,
so you don't have to require React as a dependency on the server. See the [API
docs](./docs/api.md) for more details.
