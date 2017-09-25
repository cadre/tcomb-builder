import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

const validation = validators.combine([
  validators.number.isNumber,
]);

export default new BaseBuilder()
  .setTypeAndValidate(tcomb.Number, 'Number')
  .setError(validation);
