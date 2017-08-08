import SelectBuilder from '../primitives/SelectBuilder';

export default SelectBuilder
  .setLazyTemplateFactory(provider => provider.getRadio());
