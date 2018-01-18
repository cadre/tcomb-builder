import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';

export default new BaseBuilder()
  .setValidation(() => null, 'NoValidation')
  .setTypeAndValidate(tcomb.Any, 'Static Text')
  .setLazyTemplateFactory(provider => provider.getStaticPage(), 'StaticPage');

