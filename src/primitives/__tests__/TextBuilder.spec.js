import { validate } from 'tcomb-validation';

import TextBuilder from '../TextBuilder';

describe('TextBuilder', () => {
  it('produces a valid type', () => {
    const TextType = TextBuilder.getType();

    expect(validate('banana', TextType).isValid()).to.be.true;
    expect(validate('', TextType).isValid()).to.be.false;
    expect(validate(42, TextType).isValid()).to.be.false;
    expect(validate(null, TextType).isValid()).to.be.false;
    expect(validate(undefined, TextType).isValid()).to.be.false;
    expect(TextType.getValidationErrorMessage('banana')).to.equal(null);
    expect(TextType.getValidationErrorMessage(null)).to.equal('Required');
  });
});
