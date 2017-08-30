# Tcomb Form Builder

## Install

`npm install tcomb-builder tcomb-validation`

## Summary

Tcomb Form Builder wraps [tcomb-form](https://github.com/gcanti/tcomb-form) to make
defining forms easier. In tcomb-form, the type and options objects are built
separately. While this separation is a large part of why tcomb-form is so
useful, it can also make code reuse more difficult. Tcomb Form Builder provides
one interface for describing forms but still exports separate type and options
objects.

Tcomb Form Builder turns the following, configuration style form definition

```js
import tcomb from 'tcomb-form';

function error(value) {
  return value.length > 0
      ? null
      : 'Please provide a value';
}

const Name = tcomb.refinement(
  tcomb.String,
  error,
  'Name',
);

const options = {
  error,
  factory: function TextField(props)...,
  label: 'Name',
};
```

into one with a more declarative syntax

```js
import tcomb from 'tcomb-form';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

const validation = validators.text.nonEmpty;

const TextBuilder = new BaseBuilder()
    .setTypeAndValidate(tcomb.String, 'Text')
    .setValidationErrorMessageFn(validation);

const name = TextBuilder.setLabel('Name');

// name.getType()
// name.getOptions()
```

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

## Builders

Builders are composable, and this library uses three terms to describe them:

1. Primitives: Builders which define a single input (e.g. a text field) or a
   structure (e.g. struct); primitive builders are found in the
   [primitives](./src/primitives) folder.

2. Widgets: Primitives that have a template provider already set on
   them. They are found in the [widgets](./src/widgets) folder.

2. Forms: Builders which define an entire page (e.g. Credit Card Information);
   examples are found in the [examples](./src/examples) folder

## Setting Templates

There are three common use cases for Tcomb Form Builder:

1. Single Field: One field (e.g. a drop down) is needed.

2. Form: A collection of fields are specified to make a one-page form.

3. Survey: A number of forms are specified which define a survey.

In the first and second cases, only `primitives` should be used and templates
should be set directly on them.

In the third case, a `LazyTemplateProvider` interface has been provided which
holds a mapping of component types to templates. By using this interface, you
can (for example) avoid setting the same template on every text field in a 20
page survey. See the [API docs](./docs/api.md) for more details.

## Example

Here is an example of a page that collects some basic information from the
user. All of the builders in the `primitives` and `widgets` objects extend the
`BaseBuilder`, so the same methods are available to them. Note that `widgets`
are simply `primitives` that have a template set on them.

```js
import { primitives, validators, widgets } from '../index';

const name = widgets.TextBuilder.setLabel('Name');

const dateOfBirth = widgets.TextBuilder
    .setValidationErrorMessageFn(validators.date.birthdate)
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
    .setValidationErrorMessageFn(crossValidation)
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
```

The end result, once tcomb template factories have been created for the
underlying primitive types—text field, drop down, checkbox, and struct
template primitives in this example—is that the form will render exactly
as we expect it to.
