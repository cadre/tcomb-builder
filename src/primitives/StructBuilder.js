import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import { validation } from '../combinators';


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
  .setType((errorFn = () => {}, fields) => validation(tcomb.struct(fields), errorFn, 'Struct'));
