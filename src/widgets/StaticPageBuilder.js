import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';

export default new BaseBuilder()
  .setValidation('NoValidation', () => null)
  .setTypeAndValidate('Static Text', tcomb.Any)
  .setLazyTemplateFactory('StaticPage', provider => provider.getStaticPage());

