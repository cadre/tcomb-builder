import { validate } from 'tcomb-validation';

import TextBuilder from '../TextBuilder';

describe('TextBuilder', () => {
  it('produces a TextType object that validates correctly', () => {
    const TextType = TextBuilder.getType();
    expect(validate('banana', TextType).isValid()).to.be.true;
    expect(validate('', TextType).isValid()).to.be.false;
    expect(validate(42, TextType).isValid()).to.be.false;
    expect(validate(null, TextType).isValid()).to.be.false;
    expect(validate(undefined, TextType).isValid()).to.be.false;
  });

  it('produces a TextType options object that is formed correctly', () => {
    const options = TextBuilder.getOptions();
    expect(options.error('banana')).to.equal(null);
    expect(options.error(null)).to.equal('Please provide a value');
  });
});
