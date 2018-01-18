import TextBuilder from '../primitives/TextBuilder';

export default TextBuilder
  .setLazyTemplateFactory(provider => provider.getTextField(), 'TextField');
