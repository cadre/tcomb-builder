import TextBuilder from '../primitives/TextBuilder';

export default TextBuilder
  .setLazyTemplateFactory('TextArea', provider => provider.getTextArea());
