import StructBuilder from '../primitives/StructBuilder';

export default StructBuilder
  .setLazyTemplateFactory('CheckboxGroup', provider => provider.getCheckboxGroup());
