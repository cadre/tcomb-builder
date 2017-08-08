import tcomb from 'tcomb-validation';

import SelectBuilder from '../SelectBuilder';

const testSelect = SelectBuilder
  .setTypeAndValidate(tcomb.enums({ dog: 'Dog', cat: 'Cat' }));

const trueFalseSelect = SelectBuilder
  .setTypeAndValidate(tcomb.enums.of([true, false]));

describe('SelectBuilder', () => {
  it('should validate input properly', () => {
    const builder = testSelect.getType();
    const selection = 'dog';

    expect(builder(selection)).to.equal('dog');
  });

  it('should produce an error message for invalid input', () => {
    const builder = testSelect.getType();
    const selection = 'bird';

    expect(() => builder(selection)).to.throw();
  });

  it('should return an error when selection is empty', () => {
    const options = testSelect.getOptions();

    expect(options.error(null)).to.equal('Please select a value');
  });

  // Test a regression where we were checking for !value in the RadioType
  // builder validation function, so boolean true values would validate but
  // boolean false values would not (even though they were expected to).
  it('does not throw an error when the selection is boolean false', () => {
    const DropDownType = trueFalseSelect.getType();
    expect(() => DropDownType(true)).to.not.throw();
    expect(() => DropDownType(false)).to.not.throw();
  });
});
