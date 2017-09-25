import tcomb from 'tcomb-validation';

function toGetter(prop) {
  const capsProp = prop.charAt(0).toUpperCase() + prop.slice(1);
  return `get${capsProp}`;
}

/**
 * Given a tcomb struct and a Javascript object used to instantiate that
 * struct, create getters for all props on the tcomb struct and then
 * instantiate it. This is intended to be used when constructing the
 * LazyTemplateInterface, where somewhat stronger typing can propogate errors
 * earlier.
 *
 * @param {LazyTemplateInterface} TemplateInterface
 * @param {object} instance
 * @return {LazyTemplateInterface} A lazy template interface extended with
 * getters.
 */
export function constructWithGetters(TemplateInterface, instance) {
  const interfaceProps = Object.keys(TemplateInterface.meta.props);

  const ExtendedInterface = TemplateInterface.extend(interfaceProps.reduce((acc, prop) => (
    Object.assign({}, acc, { [toGetter(prop)]: tcomb.Function })
  ), {}), { strict: true });

  const getters = interfaceProps.reduce((acc, prop) => (
    Object.assign({}, acc, {
      [toGetter(prop)]: function getter() {
        return this[prop];
      },
    })
  ), {});

  return ExtendedInterface(Object.assign({}, instance, getters));
}
