import { validate } from 'tcomb-validation';

import NumberBuilder from '../NumberBuilder';

describe('NumberBuilder', () => {
  it('produces a NumberType that validates correctly', () => {
    const NumberType = NumberBuilder.getType();
    expect(validate('banana', NumberType).isValid()).to.be.false;
    expect(validate(42, NumberType).isValid()).to.be.true;
  });

  it('produces a NumberType options object that is formed correctly', () => {
    const options = NumberBuilder.getOptions();
    expect(options.error('banana')).to.equal('Please provide a number');
    expect(options.error(42)).to.equal(null);
    expect(options.error(null)).to.equal('Please provide a number');
  });
});
