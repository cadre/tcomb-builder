import CheckboxGroupBuilder from '../CheckboxGroupBuilder';
import CheckboxBuilder from '../CheckboxBuilder';
import * as validators from '../../validators';

const a = CheckboxBuilder.setLabel('a');
const b = CheckboxBuilder.setLabel('b');
const c = CheckboxBuilder.setLabel('c');

const checkboxGroupBuilder = CheckboxGroupBuilder
  .setValidation('MinMaxValidation', validators.checkbox.minMax({ min: 0, max: 2 }))
  .setField('a', a)
  .setField('b', b)
  .setField('c', c);

describe('CheckboxGroupBuilder', () => {
  it('produces a tcomb Struct that validates correctly', () => {
    const CheckboxGroupType = checkboxGroupBuilder
      .setValidation('MinMaxValidation', validators.checkbox.minMax({ min: 0, max: 3 }))
      .getType();
    const CheckboxType = CheckboxBuilder.getType();
    const selections = {
      a: CheckboxType(false),
      b: CheckboxType(true),
      c: CheckboxType(false),
    };

    expect(CheckboxGroupType(selections)).to.deep.equal({ a: false, b: true, c: false });
  });

  it('produces an error message if number of selected values is less than the min', () => {
    const builder = checkboxGroupBuilder
      .setValidation('MinMaxValidation', validators.checkbox.minMax({ min: 1, max: 1 }));

    const CheckboxGroupType = builder.getType();

    const selections = { a: false, b: false };

    expect(() => CheckboxGroupType(selections)).to.throw();
    const errorStr = 'Please select at least 1 item.';
    expect(CheckboxGroupType.getValidationErrorMessage(selections)).to.equal(errorStr);
  });

  it('produces an error message if number of selected values more than the max', () => {
    const builder = checkboxGroupBuilder
      .setValidation('MinMaxValidation', validators.checkbox.minMax({ min: 1, max: 1 }));

    const CheckboxGroupType = builder.getType();

    const selections = { a: true, b: true };

    expect(() => CheckboxGroupType(selections)).to.throw();
    const errorStr = 'Please select at most 1 item.';
    expect(CheckboxGroupType.getValidationErrorMessage(selections)).to.equal(errorStr);
  });
});
