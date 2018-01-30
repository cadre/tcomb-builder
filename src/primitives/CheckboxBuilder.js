import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

export default new BaseBuilder()
  .setValidation('BooleanValidation', validators.checkbox.isBoolean)
  .setTypeAndValidate('Checkbox', tcomb.Boolean);
