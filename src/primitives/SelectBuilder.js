import BaseBuilder from '../BaseBuilder';
import * as validators from '../validators';

export default new BaseBuilder()
  .setValidationErrorMessageFn(validators.shared.hasSelection);
