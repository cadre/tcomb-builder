import { validate } from 'tcomb-validation';

import NumberBuilder from '../NumberBuilder';

describe('NumberBuilder', () => {
  it('produces a NumberType that validates correctly', () => {
    const NumberType = NumberBuilder.getType();

    expect(validate('banana', NumberType).isValid()).to.be.false;
    expect(validate(42, NumberType).isValid()).to.be.true;
    expect(NumberType.getValidationErrorMessage('banana')).to.equal('Please provide a number');
    expect(NumberType.getValidationErrorMessage(42)).to.equal(null);
    expect(NumberType.getValidationErrorMessage(null)).to.equal('Please provide a number');
  });
});
