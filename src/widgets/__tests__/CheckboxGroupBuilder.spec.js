import CheckboxGroupBuilder from '../CheckboxGroupBuilder';
import CheckboxBuilder from '../CheckboxBuilder';
import * as validators from '../../validators';

const a = CheckboxBuilder.setLabel('a');
const b = CheckboxBuilder.setLabel('b');
const c = CheckboxBuilder.setLabel('c');

const exampleCheckboxes = CheckboxGroupBuilder
  .setError(validators.checkbox.minMax({ min: 0, max: 2 }))
  .setField('a', a)
  .setField('b', b)
  .setField('c', c);

describe('CheckboxGroupBuilder', () => {
  it('produces a tcomb Struct that validates correctly', () => {
    const checkboxGroupType = exampleCheckboxes
      .setError(validators.checkbox.minMax({ min: 0, max: 3 }))
      .getType();
    const checkbox = CheckboxBuilder.getType();
    const selections = {
      a: checkbox(false),
      b: checkbox(true),
      c: checkbox(false),
    };

    expect(checkboxGroupType(selections)).to.deep.equal({ a: false, b: true, c: false });
  });

  it('produces an error message if number of selected values is less than the min', () => {
    const Checkboxes = exampleCheckboxes
      .setError(validators.checkbox.minMax({ min: 1, max: 1 }));

    const CheckboxGroupType = Checkboxes.getType();
    const options = Checkboxes._disableTemplates().getOptions();

    const selections = { a: false, b: false };

    expect(() => CheckboxGroupType(selections)).to.throw();
    expect(options.error(selections)).to.equal('Please select at least 1 item.');
  });

  it('produces an error message if number of selected values more than the max', () => {
    const Checkboxes = exampleCheckboxes
      .setError(validators.checkbox.minMax({ min: 1, max: 1 }));

    const CheckboxGroupType = Checkboxes.getType();
    const options = Checkboxes._disableTemplates().getOptions();

    const selections = { a: true, b: true };

    expect(() => CheckboxGroupType(selections)).to.throw();
    expect(options.error(selections)).to.equal('Please select at most 1 item.');
  });
});
