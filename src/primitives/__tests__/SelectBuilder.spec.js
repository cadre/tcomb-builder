import SelectBuilder from '../SelectBuilder';

const testSelect = SelectBuilder
  .setChoices({ dog: 'Dog', cat: 'Cat' });

const trueFalseSelect = SelectBuilder
  .setChoices([true, false]);

describe('SelectBuilder', () => {
  it('should validate input properly', () => {
    const SelectType = testSelect.getType();
    const selection = 'dog';

    expect(SelectType(selection)).to.equal('dog');
  });

  it('should produce an error message for invalid input', () => {
    const SelectType = testSelect.getType();
    const selection = 'bird';

    expect(() => SelectType(selection)).to.throw();
  });

  it('should return an error when selection is empty', () => {
    const SelectType = testSelect.getType();

    expect(SelectType.getValidationErrorMessage(null)).to.equal('Required');
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
