import CheckboxBuilder from '../CheckboxBuilder';

const a = CheckboxBuilder.setLabel('a');

describe('CheckboxBuilder', () => {
  it('produces a tcomb Struct that validates correctly', () => {
    const checkbox = a.getType();

    expect(checkbox(false)).to.equal(false);
    expect(checkbox(true)).to.equal(true);
  });

  it('throws an error message when passed a null value', () => {
    const checkbox = a.getType();
    const options = a.getOptions();

    expect(() => checkbox(null)).to.throw();
    expect(options.error(null)).to.equal('Value must be a boolean');
  });

  it('produces an error message if the value is not a boolean', () => {
    const checkbox = a.getType();
    const options = a.getOptions();

    expect(() => checkbox('TRUE')).to.throw();
    expect(options.error('TRUE')).to.equal('Value must be a boolean');
  });
});
