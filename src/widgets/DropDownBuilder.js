import SelectBuilder from '../primitives/SelectBuilder';
import * as validators from '../validators';

export default SelectBuilder
  .setValidation('SelectionValidation', validators.shared.hasSelection)
  .setLazyTemplateFactory('DropDown', provider => provider.getDropDown());
