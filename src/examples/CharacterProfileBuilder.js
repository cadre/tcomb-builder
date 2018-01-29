import { validators, widgets } from '../index';

const name = widgets.TextBuilder.setLabel('Name');

const dateOfBirth = widgets.TextBuilder
  .setValidation('BirthdateValidation', validators.date.birthdate)
  .setLabel('Date of Birth');

const occupation = widgets.TextBuilder
  .setLabel('Occupation')
  .makeOptional();

const bananaStand = widgets.CheckboxBuilder
  .setLabel('Worked at banana stand');
const chickenDance = widgets.CheckboxBuilder
  .setLabel('Does chicken dance');
const hugeMistake = widgets.CheckboxBuilder
  .setLabel('Has made a huge mistake');
const none = widgets.CheckboxBuilder
  .setLabel('None of the above');

const noneKey = 'isNone';
const crossValidation = validators.combine([
  validators.checkbox.noneOfAbove(noneKey),
  validators.checkbox.minMax({ min: 1, max: 2 }),
]);

const foodGroup = widgets.CheckboxGroupBuilder
  .setValidation('CrossValidation', crossValidation)
  .setField('bananaStand', bananaStand)
  .setField('chickenDance', chickenDance)
  .setField('hugeMistake', hugeMistake)
  .setLabel('Character Traits')
  .setField(noneKey, none);

export default widgets.StructBuilder
  .setField('name', name)
  .setField('dateOfBirth', dateOfBirth)
  .setField('occupation', occupation)
  .setField('foodGroup', foodGroup)
  .setColumns(2);
