import Immutable from 'immutable';
import tcomb from 'tcomb-validation';

import * as validators from './validators';

const initialState = {
  // Used to internally set fields which will later be realized into type and
  // options objects.
  _fieldBuilders: Immutable.Map(),

  _unionBuilders: Immutable.List(),

  // Used to wrap this builder's type in a maybe to make it optional.
  _isOptional: false,

  // Used to lazily close over the `_lazyTemplateProvider` until the options blob is
  // realized.
  _lazyTemplateProvider: null,

  // Directly returned from the builder.
  options: Immutable.Map(),

  builderFunctions: Immutable.Map({
    // Used to keep track of validation functions; when the builder is realized,
    // it's added as a static function on the type.
    _getValidationErrorMessage: Immutable.Map({
      name: null,
      value: null,
    }),
    // Used to lazily close over the `_lazyTemplateProvider` until the options blob is
    // realized.
    _templateProviderCallback: Immutable.Map({
      name: null,
      value: null,
    }),
    // Used to lazily set the type internally in the builder.
    _type: Immutable.Map({
      name: null,
      value: null,
    }),
    // Used to keep track of a union's dispatch function until the builder is
    // realized.
    _dispatch: Immutable.Map({
      name: null,
      value: null,
    }),
  }),

  optionsFunctions: Immutable.Map({
    transformer: Immutable.Map({
      name: null,
      value: null,
    }),
  }),

  configFunctions: Immutable.Map({
    sortComparator: Immutable.Map({
      name: null,
      value: null,
    }),
  }),
};

export default class BaseBuilder {
  constructor(state = Immutable.Map(initialState)) {
    this._state = state;
  }

  _getBuilderFunction(id) {
    return this._state.getIn(['builderFunctions', id, 'value'], null);
  }

  /**
   * Set the disabled flag in the options object for this type.
   *
   * @param {boolean} disabled
   * @return {BaseBuilder}
   */
  setDisabled(disabled = true) {
    return new this.constructor(this._state.mergeDeep({ options: { disabled } }));
  }

  /**
   * Set the label in the options object for this type.
   *
   * @param {string} label
   * @return {BaseBuilder}
   */
  setLabel(label) {
    return new this.constructor(this._state.mergeDeep({ options: { label } }));
  }

  /**
   * Set the name in the options object for this type.
   *
   * @param {string} name
   * @return {BaseBuilder}
   */
  setName(name) {
    return new this.constructor(this._state.mergeDeep({ options: { name } }));
  }

  /**
   * Set what property should be automatically created.
   *
   * Supported Options:
   * - labels
   * - placeholders
   * - none
   *
   * @param {string} auto
   * @return {BaseBuilder}
   */
  setAuto(auto) {
    return new this.constructor(this._state.mergeDeep({ options: { auto } }));
  }

  /**
   * Set the value in the options object for this type.
   *
   * @param {string} value
   * @return {BaseBuilder}
   */
  setValue(value) {
    return new this.constructor(this._state.mergeDeep({ options: { value } }));
  }

  /**
   * Set the text in the options object for this type.
   *
   * @param {string} text
   * @return {BaseBuilder}
   */
  setText(text) {
    return new this.constructor(this._state.mergeDeep({ options: { text } }));
  }

  /**
   * Set the help text in the options object for this type.
   *
   * @param {string} label
   * @return {BaseBuilder}
   */
  setHelp(help) {
    return new this.constructor(this._state.mergeDeep({ options: { help } }));
  }

  /**
   * Set a template provider class in the options object directory. If a lazy
   * template factory is already set on the builder, setting a concrete
   * template factory using this method will supersede the lazy one.
   *
   * @param {factory} factory - A template provider class
   * @return {BaseBuilder}
   */
  setTemplateFactory(factory) {
    return new this.constructor(this._state.mergeDeep({ options: { factory } }));
  }

  /**
   * Set the builder-specific `_templateProviderCallback` function which, when
   * this builder is realized, will be used to set the `factory` field on the
   * options object. By setting the template provider using a callback, an
   * instance of `LazyTemplateInterface` can be made available to all
   * sub-fields recursively.
   *
   * @param {string} name - Identifier for the lazy template factory; used
   * internally to check builder equality
   * @param {callback} callback - Function which takes an instance of
   * `LazyTemplateInterface` and returns a template provider class
   * @return {BaseBuilder}
   */
  setLazyTemplateFactory(name, callback) {
    return new this.constructor(this._state
      .mergeIn(['builderFunctions', '_templateProviderCallback'], {
        name,
        value: callback,
      }));
  }

  /**
   * Set the error key in the options object. Used to set errors from the API
   * on a tcomb field. By default, also sets hasError to true if `error` is
   * truthy and false otherwise. You can disable this behavior by passing in
   * the `overrideHasError` option in the config object.
   *
   * @param {string} error
   * @return {BaseBuilder}
   */
  setError(error, config = {}) {
    const { overrideHasError = false } = config;
    const builder = new this.constructor(this._state.mergeDeep({ options: { error } }));
    return overrideHasError ? builder : builder.setHasError(!!error);
  }

  /**
   * Set the hasError key in the options object. Used to force tcomb to display
   * an error. Setting hasError to true won't stop the form from being
   * submitted; in fact, it will get overwritten by tcomb-form on submit.
   *
   * @param {boolean} hasError
   * @return {BaseBuilder}
   */
  setHasError(hasError) {
    return new this.constructor(this._state.mergeDeep({ options: { hasError } }));
  }

  /**
   * Set a validation function that will be set on the tcomb type when it is
   * realized. This method will override previously set functions.
   *
   * @param {string} name - Identifier for the validation function; used
   * internally to check builder equality
   * @param {function} getValidationErrorMessage
   * @return {BaseBuilder}
   */
  setValidation(name, getValidationErrorMessage) {
    return new this.constructor(this._state
      .mergeIn(['builderFunctions', '_getValidationErrorMessage'], {
        name,
        value: getValidationErrorMessage,
      }));
  }

  /**
   * Set the transformer function in the options object for this type.
   *
   * @param {string} name - Identifier for the transformer function; used
   * internally to check builder equality
   * @param {transformer} transformer
   * @return {BaseBuilder}
   */
  setTransformer(name, transformer) {
    return new this.constructor(this._state
      .mergeIn(['optionsFunctions', 'transformer'], {
        name,
        value: transformer,
      }));
  }

  /**
   * Set the sort comparator in the config object for this type.
   *
   * @param {string} name - Identifier for the sort function; used internally
   * to check builder equality
   * @param {(Any, Any) => Integer} sortComparator
   * @return {BaseBuilder}
   */
  setSort(name, sortComparator) {
    return new this.constructor(this._state
      .mergeIn(['configFunctions', 'sortComparator'], {
        name,
        value: sortComparator,
      }));
  }

  /**
   * Add an error message function to the existing function on this builder.
   * If a function is not already set, then it is equivalent to
   * `setValidation`.
   *
   * @param {string} name - Identifier for the validation function; used
   * internally to check builder equality
   * @param {function} getValidationErrorMessage
   * @return {BaseBuilder}
   */
  addValidation(name, getValidationErrorMessage) {
    const existingFn = this._getBuilderFunction('_getValidationErrorMessage');
    if (!existingFn) {
      return this.setValidation(name, getValidationErrorMessage);
    }

    return new this.constructor(this._state
      .setIn(['builderFunctions', '_getValidationErrorMessage', 'value'],
        validators.combine([existingFn, getValidationErrorMessage]))
      .updateIn(['builderFunctions', '_getValidationErrorMessage', 'name'],
        oldName => (oldName ? `${oldName} ${name}` : name)));
  }

  /**
   * Set a sub-field on this builder. The sub-field remains a builder type in
   * the internal only `_fieldBuilders` object until the current builder is
   * realized, at which point it will be used to construct the type hierarchy
   * and options object.
   *
   * @param {string} key
   * @param {BaseBuilder} fieldBuilder - a sub-field to set on this builder
   * @return {BaseBuilder}
   */
  setField(key, fieldBuilder) {
    if (this._state.getIn(['options', 'options'])) {
      throw new Error('Tried to set a field, but a select option was already added. '
          + 'Select options and fields are mutually exclusive.');
    }

    return new this.constructor(this._state
      .setIn(['_fieldBuilders', key], fieldBuilder)
      .updateIn(['options', 'order'], Immutable.List(), arr => arr.push(key)));
  }

  /**
   * Add a select option to this builder. Select options allow you to use value
   * types in a dropdown form that would otherwise be impossible to represent
   * with only the tcomb enum type. All dropdowns that can be represented with
   * enums alone should continue to use enums; this method is for special cases
   * only.
   *
   * In the following example, the options list is constructed using
   * addSelectOption.
   *
   * {
   *   label: 'Label is just here for context; it is not actually set by this function.',
   *   options: [
   *     { value: true, text: 'Into Bruce Springsteen' },
   *     { value: false, text: 'Not into Bruce Springsteen' }
   *   ],
   * }
   *
   * @param {Builder} selectBuilder - an options object to add to the
   * select options fields
   * @return {BaseBuilder}
   */
  addSelectOption(selectBuilder) {
    if (!this._state.get('_fieldBuilders').isEmpty()) {
      throw new Error('Tried to add a select option, but a field was already set. '
          + 'Select options and fields are mutually exclusive.');
    }

    const selectOptions = Immutable.fromJS(selectBuilder.getOptions());
    return new this.constructor(
      this._state.updateIn(['options', 'options'],
        Immutable.List(),
        arr => arr.push(selectOptions)),
    );
  }

  /**
   * Set the tcomb type of this builder. In order to allow for arbitrary
   * ordering of builder commands, wait to realize the type until the `getType`
   * method is called.
   *
   * @param {string} name - Identifier for the type function; used internally
   * to check builder equality
   * @param {typeCombinatorCallback} typeCombinator - set a lazily executed
   * type on the internal state
   * @return {BaseBuilder}
   */
  setType(name, typeCombinator) {
    return new this.constructor(this._state
      .mergeIn(['builderFunctions', '_type'], {
        name,
        value: (errorFn, subTypes) => typeCombinator(errorFn, subTypes),
      }));
  }

  /**
   * Convenience function for setting the type and using the built-in
   * validation defined by the type.
   * @param {string} name - Identifier for the type function; used internally
   * to check builder equality
   * @param {type} type
   * @return {BaseBuilder}
   */
  setTypeAndValidate(name, type) {
    return this.setType(name, getValidationErrorMessage => {
      if (!getValidationErrorMessage) {
        throw new Error('You called setTypeAndValidate without setting a '
        + 'validationErrorMessageFn');
      }
      return tcomb.refinement(
        type,
        x => !tcomb.String.is(getValidationErrorMessage(x)),
        name,
      );
    });
  }

  /**
   * Sets a template provider instance. Set the provider only on the top level
   * type, and it will be used to recursively generate templates for all
   * sub-field options objects.
   *
   * @param {LazyTemplateInterface} provider
   * @return {BaseBuilder}
   */
  setLazyTemplateProvider(provider) {
    return new this.constructor(this._state.set('_lazyTemplateProvider', provider));
  }

  /**
   * Set a field as optional. The type is wrapper in tcomb.maybe() when
   * `getType()` is called.
   *
   * @return {BaseBuilder}
   */
  makeOptional(isOptional = true) {
    return new this.constructor(this._state.set('_isOptional', isOptional));
  }

  /**
   * Given a select builder that contains a value and some text (see the
   * addSelectOption method), set a default option in a dropdown field.
   *
   * @param {BaseBuilder} selectBuilder
   * @return {BaseBuilder}
   */
  setNullOption(selectBuilder) {
    const nullOption = selectBuilder.getOptions();
    return new this.constructor(this._state.mergeDeep({ options: { nullOption } }));
  }

  /**
   * Set a placeholder in the options blob for this field.
   *
   * @return {BaseBuilder}
   */
  setPlaceholder(placeholder) {
    return new this.constructor(this._state.mergeDeep({ options: { attrs: { placeholder } } }));
  }


  /**
   * Set whether or not this field should autofocus.
   *
   * @return {BaseBuilder}
   */
  setAutoFocus(autoFocus) {
    return new this.constructor(this._state.mergeDeep({ options: { attrs: { autoFocus } } }));
  }

  /**
   * Set config in the options blob for this field. As a pass-through to
   * configure the template.
   *
   * @param {object}
   * @return {BaseBuilder}
   */
  setConfig(config) {
    return new this.constructor(this._state.mergeDeep({ options: { config } }));
  }

  /**
   * For unit testing. Disable templates when calling the getOptions function.
   *
   * @return {BaseBuilder}
   */
  _disableTemplates() {
    return new this.constructor(this._state.set('_disableTemplates', true));
  }

  /**
   * HELPER: Sets the theme in the config blob.
   *
   * @param {string} theme
   * @return {BaseBuilder}
   */
  setTheme(theme) {
    return this.setConfig({ theme });
  }

  /**
   * Set the vertical rhythm in the config blob. The template should
   * use this to configure how much vertical spacing should be between
   * each individual component.
   *
   * @param {number} rhythm
   * @return {BaseBuilder}
   */
  setVerticalRhythm(rhythm) {
    return this.setConfig({ rhythm });
  }

  /**
   * Test for builder value equality.
   *
   * @param {BaseBuilder} other
   * @return {boolean}
   */
  isEqual(other) {
    if (!other) {
      return false;
    }

    if (other === this) {
      return true;
    }

    const equalFields = this._state.get('_fieldBuilders').every((field, key) =>
      field.isEqual(other._state.getIn(['_fieldBuilders', key])));

    const equalUnions = this._state.get('_unionBuilders').every((field, i) =>
      field.isEqual(other._state.getIn(['_unionBuilders', i])));

    const equalFunctions = ['builderFunctions', 'optionsFunctions', 'configFunctions']
      .map(type => this._state.get(type)
        .every((value, key) => value.get('name') === other._state.getIn([type, key, 'name'])))
      .every(value => value);

    return equalFields
      && equalUnions
      && equalFunctions
      && this._state.get('_isOptional') === other._state.get('_isOptional')
      && this._state.get('options').equals(other._state.get('options'));
  }

  /**
   * Return a realized type. Lazily realize the type so that the most recent
   * versions of the `error` function and `_fieldBuilders` object are
   * available.
   *
   * @return {tcomb.type}
   */
  getType() {
    const type = () => {
      if (!this._state.get('_unionBuilders').isEmpty()) {
        const dispatch = this._getBuilderFunction('_dispatch');
        if (!dispatch) {
          throw new Error('No dispatch function found for union type');
        }

        const unionBuilders = this._state.get('_unionBuilders');

        const unionTypes = unionBuilders.map(builder => builder.getType());
        const union = tcomb.union(unionTypes.toJS());

        // When setting a dispatch function on the builder, return a builder.
        // Here, take that builder and convert it into a type.
        union.dispatch = value => {
          const dispatchedBuilder = dispatch(value);
          const typeIndex = unionBuilders.indexOf(dispatchedBuilder);
          if (typeIndex === -1) {
            throw new Error('Dispatched builder was not found within the union set');
          }
          return unionTypes.get(typeIndex);
        };
        return union;
      }

      const Type = this._getBuilderFunction('_type');
      if (!Type) {
        throw new Error('No type was set for the current builder');
      }

      // Recursively get the type of every sub-field, if any exist, and reduce
      // them into a javascript object of field names to types.
      const subTypes = this._state.get('_fieldBuilders').entrySeq().reduce((acc, entry) => {
        const key = entry[0];
        const field = entry[1];

        return acc.set(key, field.getType());
      }, Immutable.Map()).toJS();

      const getValidationErrorMessage = this._getBuilderFunction('_getValidationErrorMessage');
      const typeInstance = Type(
        getValidationErrorMessage,
        subTypes,
      );
      typeInstance.getValidationErrorMessage = getValidationErrorMessage;
      return typeInstance;
    };

    return this._state.get('_isOptional') ? tcomb.maybe(type()) : type();
  }

  /**
   * Return a realized options object. Lazily realize the options object so
   * that the template provider from the top builder can be made available
   * to all sub-builders.
   *
   * @return {object}
   */
  getOptions(lazyTemplateProvider, config = {}) {
    const {
      disableTemplates = this._state.get('_disableTemplates', false),
    } = config;

    const provider = lazyTemplateProvider || this._state.get('_lazyTemplateProvider');

    const unionBuilders = this._state.get('_unionBuilders');
    if (!unionBuilders.isEmpty()) {
      return unionBuilders.reduce((acc, builder) =>
        acc.push(builder.getOptions(provider, { disableTemplates })), Immutable.List()).toJS();
    }

    const hasConcreteTemplateFactory = this._state.hasIn(['options', 'factory']);
    const templateProviderCallback = this._getBuilderFunction('_templateProviderCallback');

    if (!hasConcreteTemplateFactory
        && templateProviderCallback
        && !provider
        && !disableTemplates) {
      throw new Error('A template callback function was specified, but no provider was set');
    }

    // Recursively build up the options object from every field.
    const fields = this._state.get('_fieldBuilders').reduce((acc, field, key) => (
      acc.setIn(['options', 'fields', key], field.getOptions(provider, { disableTemplates }))
    ), Immutable.Map()).toJS();

    // If a template callback exists, realize the template, merge any
    // sub-fields, and return the resulting options object.
    const options = !hasConcreteTemplateFactory && templateProviderCallback && !disableTemplates
      ? this._state.mergeDeep({ options: { factory: templateProviderCallback(provider) } })
      : this._state;

    const flattenFunctions = functions => functions
      .filter(value => !!value.get('name'))
      .reduce((acc, value, key) => acc.set(key, value.get('value')), Immutable.Map());

    const optionsFunctions = flattenFunctions(this._state.get('optionsFunctions'));
    const configFunctions = flattenFunctions(this._state.get('configFunctions'));

    return options
      .mergeDeep(fields)
      .get('options')
      .merge(optionsFunctions.isEmpty() ? {} : optionsFunctions)
      .merge(configFunctions.isEmpty() ? {} : { config: configFunctions })
      .toJS();
  }
}
