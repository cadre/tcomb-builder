import CheckboxBuilder from '../primitives/CheckboxBuilder';

export default CheckboxBuilder
  .setLazyTemplateFactory(provider => provider.getCheckbox(), 'Checkbox');
