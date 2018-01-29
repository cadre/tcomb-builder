import CheckboxBuilder from '../primitives/CheckboxBuilder';

export default CheckboxBuilder
  .setLazyTemplateFactory('Checkbox', provider => provider.getCheckbox());
