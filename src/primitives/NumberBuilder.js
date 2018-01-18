import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

export default new BaseBuilder()
  .setTypeAndValidate(tcomb.Number, 'Number')
  .setValidation(validators.number.isNumber, 'NumberValidation');
