# Validators

The [validators](../src/validators) folder contains a number of useful
[tcomb-validation](https://github.com/gcanti/tcomb-validation) functions as
well as higher order functions that operate on validators themselves. Let's
look at a few examples.

Checking string length is a common validation requirement. The string length
validator takes a string length and returns a normal tcomb-validation function:

```js
validators.text.length : (length: number) => (items: [Object]) => (string | null)
```

When you import the `validators` object, you can use its string length validator:

```js
import * as validators from './path/to/validators';
import TextBuilder from './path/to/TextBuilder';

const zipCode = TextBuilder.setError(validators.text.length(5));
```

A common need is to perform several different validations on a single field.
With the `validators.combine` function, it is easy to mix and match validators:

```js
validators.combine : (validators: [Object]) => (items: [Object]) => (string | null)
```

For example, we can combine two checkbox validation functions into one:

```js
import { validators, widgets } from '../index';

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
    .setError(crossValidation)
    .setField('bananaStand', bananaStand)
    .setField('chickenDance', chickenDance)
    .setField('hugeMistake', hugeMistake)
    .setLabel('Character Traits')
    .setField(noneKey, none);
```

In the above example, we combine two separate cross-field validation functions–one
which ensures that the "None of the above" checkbox is never selected with
another field and another which checks that the correct number of results were
checked–into a single validation function.
