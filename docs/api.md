# API

## Overview

Tcomb Builder exports the following:

1. `BaseBuilder`
2. `primitives`
3. `widgets`
4. `validators`
5. `LazyTemplateInterface`
6. `constructWithGetters`

You can either import all of the above as one object

```js
import * as tcombBuilder from 'tcomb-builder';
```

or import them piecemeal

```js
import { primitives, validators, widgets } from 'tcomb-builder';
```

## Examples

### 1. `BaseBuilder`

   The builder class from which all other types are defined. Contains no
   options or type information by default. See [builder.md](./builder.md) for
   usage.

   ```js
   import { BaseBuilder } from 'tcomb-builder';

   const yesBuilder = new BaseBuilder()
      .setValue(true)
      .setText('Yes');
   ```

### 2. `primitives`

   Builders that are more specific than the `BaseBuilder` but do not
   have a template set on them.

   ```js
   import { primitives } from 'tcomb-builder';

   const name = primitives.TextBuilder.setLabel('Name');
   const bananaStand = primitives.CheckboxBuilder
       .setLabel('Worked at banana stand');

   const CharacterProfile = primitives.StructBuilder
       .setField('name', name)
       .setField('bananaStand', bananaStand);
   ```

### 3. `widgets`

   Builders which have a template provider set. Widgets should be used for the
   survey case where the template provider system is helpful.

   ```js
   import { widgets } from 'tcomb-builder';

   const name = widgets.TextBuilder.setLabel('Name');
   const bananaStand = widgets.CheckboxBuilder
       .setLabel('Worked at banana stand');

   const CharacterProfile = widgets.StructBuilder
       .setField('name', name)
       .setField('bananaStand', bananaStand);
   ```

### 4. `validators`

   Reusable validation functions and combinators.

   ```js
   import { validators } from 'tcomb-builder';

   const crossValidation = validators.combine([
     validators.checkbox.noneOfAbove(noneKey),
     validators.checkbox.minMax({ min: 1, max: 2 }),
   ]);
   ```

### 5. `LazyTemplateInterface`

   The `LazyTemplateInterface` defines factories that will be lazily loaded by
   tcomb-builder. When it is used, templates can be defined on builders before
   they are available; for example, in a library that is shared between client
   and server.

   ```js
   import { LazyTemplateInterface } from 'tcomb-builder';
   import CheckboxFactory from './path/to/CheckboxFactory';
   // Import all other factories.

   // Add custom template factories that are not defined in tcomb-builder.
   const DefaultTemplateInterface = LazyTemplateInterface.extend({
     myOtherWidget: tcomb.Object,
   });

   // Create an instance of the struct using the `constructWithGetters` helper
   // method (more detail below).
   export default constructWithGetters(DefaultTemplateInterface, {
     checkbox: CheckboxFactory,
     checkboxGroup: CheckboxGroupFactory,
     // etc.
   });
   ```

### 6. `constructWithGetters`

   A helper method that adds getters for every prop on a tcomb.struct.  Its
   intended use is for constructing an instance of `LazyTemplateInterface`,
   where having methods instead of props can reveal errors earlier (because a
   method is undefined). If props are used instead, an invalid/outdated prop
   returns undefined and confusing errors are thrown inside the builder or,
   worse, inside of tcomb-form.

   Example: See `LazyTemplateInterface` example above.
