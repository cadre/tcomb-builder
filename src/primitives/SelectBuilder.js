import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

class SelectBuilder extends BaseBuilder {
  /**
   * Set the tcomb type of this builder using `choices`
   * as the list of valid options for the field. Supports
   * both an array or an object.
   *
   * @param {*array|obj} choices
   */
  setChoices(choices) {
    const typeEnum = Array.isArray(choices)
      ? tcomb.enums.of(choices)
      : tcomb.enums(choices);

    return this.setTypeAndValidate(typeEnum, 'Select');
  }
}

export default new SelectBuilder()
  .setValidation(validators.shared.hasSelection, 'SelectionValidation');
