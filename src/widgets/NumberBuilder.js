import t from 'tcomb-validation';

import NumberBuilder from '../primitives/NumberBuilder';
import { parseNumber } from '../utils';

const numberTransformer = {
  format: value => (t.Nil.is(value) ? '' : String(value)),
  parse: parseNumber,
};

export default NumberBuilder
  .setTransformer(numberTransformer)
  .setLazyTemplateFactory(provider => provider.getTextField());
