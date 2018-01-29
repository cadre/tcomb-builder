import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

export default new BaseBuilder()
  .setTypeAndValidate('Number', tcomb.Number)
  .setValidation('NumberValidation', validators.number.isNumber);
