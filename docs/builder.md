# Base Type Builder

## `setDisabled(disabled = true)`

### Summary

Set the `disabled` key in its options object. If `true`, the field will be
disabled.

### Parameters

**isDisabled**: `boolean`

## `setLabel(label)`

### Summary

Set a label for this field in its options object.

### Parameters

**label**: `string`

## `setValue(value)`

### Summary

Set a value for this field in its options object. In the example of a radio
button, the value of the field is what gets serialized as the user's response
if that radio is selected.

### Parameters

**value**: `any`

## `setName(name)`

### Summary

Set a name for this field in its options object. This is used as the component's identifier. If left out, it will default to tcomb-form's internal UID for the component.

### Parameters

**name**: `string`

## `setText(text)`

### Summary

Set text for this field in its options object. Text is usually used for the
display value in select and radio groups.

### Parameters

**text**: `string`

## `setTransformer(transformer)`

### Summary

Set the transformer object in the options object for this type. The transformer
object has two keys: `parse` and `format`. `parse` is a function describing how
values will be transformed going into the type; `format` describes how they come
out.

### Parameters

**transformer**: `object` transformer

## `setHelp(help)`

### Summary

Set a help message for this field in its options object. The help message is
usually shown under the field's label.

### Parameters

**help**: `string`

## `setTemplateFactory(factory)`

### Summary

Set a template provider class directly into the options object for this field.
This is useful for a one-off use of tcomb builder. For example, if you wanted
to use the drop down builder primitive directly, it would be inconvenient to
need to set up an entire `LazyTemplateInterface` instance for only the drop down.
Instead, you can set the `TemplateFactory` directly on the drop down builder.

If a lazy template factory is already set on the builder, setting a concrete
template factory using this method will supersede the lazy one.

### Example

`.setTemplateFactory(TextFieldFactory)`

### Parameters

**factory**: `TemplateFactory`

## `setLazyTemplateFactory(callback)`

### Summary

Set a template provider for this field in its options object. Because the
provider is accessed at builder evaluation time, it is necessary to set the
factory by passing a callback function to the `setLazyTemplateFactory` method.

### Example

`.setLazyTemplateFactory(provider => provider.getTextField())`

### Parameters

**factory**: `LazyTemplateInterface => TemplateFactory`

## `setValidationErrorMessageFn(error)`

### Summary

Set an error message function for this field in its options object. The error
message function must conform to the same spec as that in `tcomb-validation`.
It simply returns `null` if there is no error, and a `string` if an error
occurred.

### Example

```js
function getValidationErrorMessage(value) {
  return (typeof value !== 'boolean') ? 'Value must be a boolean' : null;
}

const field = new BaseBuilder()
    .setValidationErrorMessageFn(getValidationErrorMessage);
```

### Parameters

**error**: `(value, path, context) => ?(string | ReactElement)`

## `addValidationErrorMessageFn(error)`

### Summary

Adds an error message function to the existing function in the options object
for this type. If there are no errors already set, then it is equivalent to
`setValidationErrorMessageFn`.

### Example

```js
function booleanValidation(value) {
  return (typeof value !== 'boolean') ? 'Value must be a boolean' : null;
}

function truthyValidation(value) {
  return !value ? 'Value must be true' : null;
}

const field = new BaseBuilder()
    .setValidationErrorMessageFn(booleanValidation)
    .addValidationErrorMessageFn(truthyValidation);
```

### Parameters

**error**: `(value, path, context) => ?(string | ReactElement)`

## `setField(key, fieldBuilder)`

### Summary

Set a sub-field on this builder. Unlike most other builder methods, the order
in which this method is called _does_ matter. Field keys are added to the tcomb
`order` field on the options object _in the order they are set_.

### Example

```js
const field1 = new BaseBuilder().setLabel('field1');
const field2 = new BaseBuilder().setLabel('field2');

const page = new BaseBuilder()
    .setField('field1', field1)
    .setField('field2', field2)
    .setLabel('My page, where field1 and field2 are in the order they were set.');
```

### Parameters

**key**: `string`

**fieldBuilder**: `BaseBuilder`

## `addSelectOption(selectBuilder)`

### Summary

Add a select option to this builder. Select options allow you to use value
types in a dropdown form that would otherwise be impossible to represent with
only the tcomb enum type. All dropdowns that can be represented with enums
alone should continue to use enums; this method is for special cases only.

### Example

This example comes from the [`YesNoBuilder`](../src/primitives/YesNoBuilder.js)

```js
const yesBuilder = new BaseBuilder()
    .setValue(true)
    .setText('Yes');

const noBuilder = new BaseBuilder()
    .setValue(false)
    .setText('No');

export default RadioBuilder
    .addSelectOption(yesBuilder)
    .addSelectOption(noBuilder)
    .setTypeAndValidate(tcomb.enums.of([true, false]));
```

### Parameters

**selectBuilder**: `BaseBuilder`

## `setType(typeCombinator)`

### Summary

Set the tcomb type of this builder. Similarly to the error field, the type must
be passed in as a callback function in order to allow for arbitrary ordering of
builder commands. The error function and fields are provided to you when you
are creating the type.

### Example

See the [`StructBuilder`](../src/primitives/StructBuilder.js)

### Parameters

**typeCombinator**: `(errorFn: (value: string) => boolean, subTypes: Object) => TcombType`

## `setTypeAndValidate(type, name)`

### Summary

Convenience function for setting the type and using the built-in validation
defined by the type.

### Parameters

**type**: `TcombType`

**name**: `string`

## `setLazyTemplateProvider(provider)`

### Summary

Sets a template provider instance. Set the provider only on the top level
type, and it will be used to recursively generate templates for all
sub-field options objects.

### Parameters

**provider**: `LazyTemplateInterface`

## `makeOptional(isOptional = true)`

### Summary

Make a field optional. Internally, the type is wrapped in a `tcomb.maybe` type.
When used on a field, the field will have `(optional)` appended to its label
and does not need a value for the field to validate. See the tcomb-form docs
for more info.

## `setNullOption(selectBuilder)`

### Summary

Set a default option in a dropdown field. `selectBuilder` must be a builder with
the following fields set: `value`, `text`.

### Example

```js
const selectBuilder = new BaseBuilder()
    .setValue('default value')
    .setText('default text');

const field = new BaseBuilder()
    .setNullOption(selectBuilder);
```

### Parameters

**selectBuilder**: `BaseBuilder`

## `setPlaceholder(placeholder)`

### Summary

Set a placeholder on the options object for this field.

### Parameters

**placeholder**: `string`

## `setAutoFocus(autofocus)`

### Summary

Set the autoFocus option in the options object for this type.

### Parameters

**autoFocus**: `boolean`

## `setConfig(config)`

### Summary

Set the config object in the options object for this type. This is a
pass-through for setting props on the underlying template.

### Parameters

**config**: `object`

## `setTheme(theme)`

### Summary

Set the theme in the config object for this type. It is the responsibility
of the template to handle styling.

### Parameters

**theme**: `string`

## `setVerticalRhythm(rhythm)`

### Summary

Set the rhythm in the config object for this type. This value should be used
for telling the template how much padding to put around the component.

### Parameters

**rhythm**: `string`

## `setOrder(order)`

### Summary

Set the order in the options object for this type. The order is either
'asc' or 'desc'.

### Parameters

**order**: `string`

## `_disableTemplates()`

### Summary

Disable template realization for this builder and any fields that it contains.
This method is intended to be used only in unit tests for surveys where
template callbacks are set, but no template provider is made available.

## `getType()`

### Summary

Get the tcomb type object from this builder. This should be called as the very
last step, after all fields have already been set.

## `getOptions(lazyTemplateProvider)`

### Summary

Get the tcomb options object from this builder. An instance of
`LazyTemplateInterface` must be provided to at least the top level `getOptions`
call. That same instance will then be made available recursively to all inner
builders when their `getOptions` methods are called.

### Parameters

**lazyTemplateProvider**: `?LazyTemplateInterface`
