import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

export default new BaseBuilder()
  .setValidation(validators.checkbox.isBoolean)
  .setTypeAndValidate(tcomb.Boolean, 'Checkbox');
