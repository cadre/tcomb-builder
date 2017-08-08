# API

## Overview

Tcomb Builder exports the following:

1. `BaseBuilder`
2. `primitives`
3. `widgets`
4. `validators`
5. `create`
6. `createTypes`
7. `LazyTemplateProvider`

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

### 5. `create`

   `create : (forms: List<Object>, provider: LazyTemplateProvider) => Object`

   A helper method for the survey case. Creates both the type and options
   objects. Primarily used by front-end clients.

   ```js
   import { create } from 'tcomb-builder';
   import CharacterProfileBuilder from '../examples/CharacterProfileBuilder';
   import TelevisionShowBuilder from '../TelevisionShowBuilder';
   import lazyTemplateProvider from './LazyTemplateProvider'

   const constants = {
     CHARACTER_PROFILE: 'CHARACTER_PROFILE',
     TELEVISION_SHOW: 'TELEVISION_SHOW',
   };

   create([
     {
       builder: CharacterProfileBuilder,
       name: constants.CHARACTER_PROFILE,
     },
     {
       builder: TelevisionShowBuilder,
       name: constants.TELEVISION_SHOW,
     },
   ], lazyTemplateProvider);

   /**
    * Exports an object of the form:
    *
    * {
    *   CHARACTER_PROFILE: {
    *     options: { // options blob // },
    *     type: // tcomb type //,
    *   },
    *   TELEVISION_SHOW: {
    *    options: { // options blob // },
    *    type: // tcomb type //,
    *   },
    * }
    */
   ```

### 6. `createTypes`

   `createTypes : provider: LazyTemplateProvider => Object`

   A helper method for the survey case. Create only the types object - not the
   options object. Since the options object is not created, no templates are
   realized.  Primarily used by back end clients.

   ```js
   import { createTypes } from 'tcomb-builder';
   import CharacterProfileBuilder from '../examples/CharacterProfileBuilder';
   import TelevisionShowBuilder from '../TelevisionShowBuilder';

   const constants = {
     CHARACTER_PROFILE: 'CHARACTER_PROFILE',
     TELEVISION_SHOW: 'TELEVISION_SHOW',
   };

   createTypes([
     {
       builder: CharacterProfileBuilder,
       name: constants.CHARACTER_PROFILE,
     },
     {
       builder: TelevisionShowBuilder,
       name: constants.TELEVISION_SHOW,
     },
   ]);

   /**
    * Exports an object of the form:
    *
    * {
    *   CHARACTER_PROFILE: // tcomb type //,
    *   TELEVISION_SHOW: // tcomb type //,
    * }
    */
   ```

### 7. `LazyTemplateProvider`

   ```js
   import { LazyTemplateProvider } from 'tcomb-builder';

   const provider = new LazyTemplateProvider()
       .setTextField(/* call these methods for every factory */);
   ```
