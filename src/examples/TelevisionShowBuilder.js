import { validators, widgets } from '../index';

const showName = widgets.TextBuilder.setLabel('Show Name');

const firstEpisodeDate = widgets.TextBuilder
  .setValidation(validators.date.birthdate, 'BirthdateValidation')
  .setLabel('Date of Birth');

const genre = widgets.TextBuilder
  .setLabel('Genre')
  .makeOptional();

export default widgets.StructBuilder
  .setField('showName', showName)
  .setField('firstEpisodeDate', firstEpisodeDate)
  .setField('genre', genre)
  .setColumns(2);
