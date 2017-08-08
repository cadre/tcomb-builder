import tcomb from 'tcomb-validation';

import { validation } from '../combinators';
import BaseBuilder from '../BaseBuilder';

export default new BaseBuilder()
  .setType((errorFn = () => {}, fields) => validation(tcomb.struct(fields), errorFn, 'Struct'));
