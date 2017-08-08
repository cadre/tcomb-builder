import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';

export default new BaseBuilder()
  .setValidationErrorMessageFn(() => null)
  .setTypeAndValidate(tcomb.Any, 'Static Text')
  .setLazyTemplateFactory(provider => provider.getStaticPage());

