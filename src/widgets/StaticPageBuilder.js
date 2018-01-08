import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';

export default new BaseBuilder()
  .setValidation(() => null)
  .setTypeAndValidate(tcomb.Any, 'Static Text')
  .setLazyTemplateFactory(provider => provider.getStaticPage());

