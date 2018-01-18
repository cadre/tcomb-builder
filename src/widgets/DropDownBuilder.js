import SelectBuilder from '../primitives/SelectBuilder';
import * as validators from '../validators';

export default SelectBuilder
  .setValidation(validators.shared.hasSelection, 'SelectionValidation')
  .setLazyTemplateFactory(provider => provider.getDropDown(), 'DropDown');
