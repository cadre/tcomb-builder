import StructBuilder from '../primitives/StructBuilder';

export default StructBuilder
  .setLazyTemplateFactory('Struct', provider => provider.getStruct());

