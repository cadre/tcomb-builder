import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';

export default new BaseBuilder()
  .setError(() => null)
  .setTypeAndValidate(tcomb.Any, 'Static Text')
  .setLazyTemplateFactory(provider => provider.getStaticPage());

