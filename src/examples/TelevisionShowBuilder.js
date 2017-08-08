import { primitives, validators, widgets } from '../index';

const showName = widgets.TextBuilder.setLabel('Show Name');

const firstEpisodeDate = widgets.TextBuilder
  .setValidationErrorMessageFn(validators.date.birthdate)
  .setLabel('Date of Birth');

const genre = widgets.TextBuilder
  .setLabel('Genre')
  .makeOptional();

export default primitives.StructBuilder
  .setField('showName', showName)
  .setField('firstEpisodeDate', firstEpisodeDate)
  .setField('genre', genre)
  .setLazyTemplateFactory(provider => provider.getDoubleColumn());
