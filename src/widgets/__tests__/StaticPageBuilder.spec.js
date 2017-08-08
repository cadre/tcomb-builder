import { validate } from 'tcomb-validation';

import StaticPageBuilder from '../StaticPageBuilder';

describe('StaticPageBuilder', () => {
  it('produces a StaticPageType object that validates correctly', () => {
    const StaticPageType = StaticPageBuilder.getType();
    expect(validate('banana', StaticPageType).isValid()).to.be.true;
  });
});
