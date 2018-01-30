import TextBuilder from '../primitives/TextBuilder';

export default TextBuilder
  .setLazyTemplateFactory('TextField', provider => provider.getTextField());
