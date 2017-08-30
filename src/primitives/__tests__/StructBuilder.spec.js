import TextBuilder from '../TextBuilder';
import StructBuilder from '../StructBuilder';

const exampleStruct = StructBuilder
  .setField('first', TextBuilder.setLabel('first'))
  .setField('second', TextBuilder.setLabel('second'));

describe('StructBuilder', () => {
  it('produces a StructType object that validates correctly', () => {
    const StructType = exampleStruct.getType();
    const json = { first: 'abc', second: '123' };

    expect(StructType(json).first).to.equal('abc');
    expect(StructType(json).second).to.equal('123');
  });

  it('produces a StructType options object that validates correctly', () => {
    const actual = exampleStruct.getOptions();

    const expected = {
      fields: {
        first: { label: 'first' },
        second: { label: 'second' },
      },
      order: ['first', 'second'],
    };

    expect(actual.fields.first.label).to.equal(expected.fields.first.label);
    expect(actual.fields.second.label).to.equal(expected.fields.second.label);
    expect(actual.order).to.deep.equal(expected.order);
  });

  describe('setVerticalRhythm()', () => {
    it('can set rhythm option to the field\'s config option', () => {
      const rhythm = 20;
      const builder = StructBuilder.setVerticalRhythm(rhythm);

      expect(builder.getOptions().config).to.deep.equal({ rhythm: 20 });
    });
  });

  describe('setColumns()', () => {
    it('can set columns option to the field\'s config option', () => {
      const columns = 2;
      const builder = StructBuilder.setColumns(columns);

      expect(builder.getOptions().config).to.deep.equal({ columns: 2 });
    });
  });
});
