import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';


class StructBuilder extends BaseBuilder {
  /**
   * Set the number of columns in the config blob. This
   * only affects how the form gets displayed.
   *
   * @param {integer} columns
   */
  setColumns(columns) {
    return this.setConfig({ columns });
  }
}

export default new StructBuilder()
  .setValidation('NoValidation', () => null)
  .setType('Struct', (getValidationErrorMessage, fields) => tcomb.refinement(
    tcomb.struct(fields), x => !tcomb.String.is(getValidationErrorMessage(x)), 'Struct'));
