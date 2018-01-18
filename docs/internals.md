# Internals

You may notice that some methods such as `setLabel`, `setError`, and
`setDisabled` directly map to changes on the resulting options object. Because
these options are simple, their internal implementation is as basic as setting
an option.

On the other hand, methods like `setLazyTemplateFactory`, `setType`, and
`setField` have APIs that aren't as simple as setting a field. This is due to
two requirements: First, that the builder methods can be used in any order, and
second, that an instance of `LazyTemplateInterface` must be made available to
every builder method.

Let's look at the type signatures of these methods:

### `setLazyTemplateFactory` and `setLazyTemplateProvider`

```js
setLazyTemplateFactory : (LazyTemplateInterface -> tcomb.form.Component, string) => BaseBuilder
builder.setLazyTemplateFactory(provider -> provider.getTextField(), 'TextField')

setLazyTemplateProvider : LazyTemplateInterface => BaseBuilder
builder.setLazyTemplateProvider(provider)
```

Here we can see that the `setLazyTemplateFactory` method takes a function which
returns a `tcomb.form.Component`. This is useful because we can set the
instance of `LazyTemplateInterface` on the very top-level builder that we
export in `index.js` and make that `TemplateFactory` instance available to
every sub-field of that builder.

As a concrete example, we can call `setLazyTemplateProvider` on only the
`WiringInstructions` builder, and that same provider will recursively be made
available to every text field contained therein.

### `setType`

```js
setType : (getValidationErrorMessage: any => string, subTypes: Object), name: string => TcombType
builder.setType(getValidationErrorMessage => tcomb.refinement(
  tcomb.String,
  x => !tcomb.String.is(getValidationErrorMessage(x),
  'String',
), 'String')
// or
builder.setType((errorFn, fields) => tcomb.struct(fields), 'FooStruct');
```

Here we see that `setType` takes a function which returns a tcomb type. That
makes sense, because ultimately we want to set a tcomb type on the builder.
However, the function also makes the `errorFn` and `subTypes` for this builder
available. This is for convenience; you can set an error function and a type in
any order and still produce a valid object. `subTypes` work similarly.

### `setField`

```js
setField : (key: string, builderField: BaseBuilder) => BaseBuilder
builder.setField('zipCode', zipCodeBuilder);
```

The `setField` method does a few things, all but one of which should be hidden
from the user:

1. [visible] Adds the field to an `order` array on the resulting tcomb options
   object. This means that the order you set your fields in DOES matter.

2. Keeps track of the new builder field internally.

3. Keeps the builder intact (does not call `getOptions` and `getType` on it
   immediately).

Numbers 2 and 3 are important because they allow us to recursively create the
options and type objects only when they are asked for, using the `getType` and
`getOptions` methods. These methods recursively build the type and options
objects from the internally held builder fields, making use of all the lazy
methods we described above.
