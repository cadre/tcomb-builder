import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

const validation = validators.combine([
  validators.text.nonEmpty,
  validators.text.length(255),
]);

export default new BaseBuilder()
  .setTypeAndValidate('Text', tcomb.String)
  .setValidation('LengthValidation', validation);
