export * as primitives from './primitives';
export * as validators from './validators';
export * as widgets from './widgets';
export BaseBuilder from './BaseBuilder';
export comparators from './comparators';
export LazyTemplateProvider from './templates/LazyTemplateProvider';

/**
 * Given a list:
 * [
 *   {
 *     builder: CharacterProfileBuilder,
 *     name: CHARACTER_PROFILE,
 *   },
 *   {
 *     builder: TelevisionShowBuilder,
 *     name: TELEVISION_SHOW,
 *   },
 *   // etc. //
 * ]
 *
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
 *   // etc. //
 * }
 */
export const create = (forms, provider) => (
  forms.reduce((acc, form) => {
    const builder = form.builder.setLazyTemplateProvider(provider);
    return Object.assign({}, acc, {
      [form.name]: {
        options: builder.getOptions(),
        type: builder.getType(),
      },
    });
  }, {})
);

/**
 * Given a list:
 * [
 *   {
 *     builder: CharacterProfileBuilder,
 *     name: CHARACTER_PROFILE,
 *   },
 *   {
 *     builder: TelevisionShowBuilder,
 *     name: TELEVISION_SHOW,
 *   },
 *   // etc. //
 * ]
 *
 * Exports an object of the form:
 *
 * {
 *   CHARACTER_PROFILE: // tcomb type //,
 *   TELEVISION_SHOW: // tcomb type //,
 *   // etc. //
 * }
 */
export const createTypes = forms => (
  forms.reduce((acc, form) => (
    Object.assign({}, acc, {
      [form.name]: form.builder.getType(),
    })
  ), {})
);
