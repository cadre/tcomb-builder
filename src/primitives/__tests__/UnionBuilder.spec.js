import UnionBuilder from '../UnionBuilder';
import StructBuilder from '../StructBuilder';
import TextBuilder from '../TextBuilder';

describe('UnionBuilder', () => {
  describe('setUnion and setDispatch', () => {
    it('should create a valid union type', () => {
      const international = StructBuilder
        .setField('country', TextBuilder);
      const usa = StructBuilder
        .setField('country', TextBuilder)
        .setField('state', TextBuilder);
      const countriesBuilder = UnionBuilder
        .setUnion([international, usa])
        .setDispatch(value => (
          value.country === 'usa' ? usa : international
        ));
      const Country = countriesBuilder.getType();
      expect(() => Country({ country: 'usa', state: 'california' })).to.not.throw();
      expect(() => Country({ country: 'usa' })).to.throw();
      expect(() => Country({ country: 'canada' })).to.not.throw();
    });

    it('returns an array of options objects', () => {
      const international = StructBuilder
        .setField('country', TextBuilder);
      const usa = StructBuilder
        .setField('country', TextBuilder)
        .setField('state', TextBuilder);
      const countriesBuilder = UnionBuilder
        .setUnion([international, usa])
        .setDispatch(value => (
          value.country === 'usa' ? usa : international
        ));
      expect(countriesBuilder.getOptions()).to.have.length(2);
    });

    it('dispatch must return instance of type from union', () => {
      const international = StructBuilder
        .setField('country', TextBuilder);
      const usa = StructBuilder
        .setField('country', TextBuilder)
        .setField('state', TextBuilder);
      const imposterUsa = StructBuilder
        .setField('country', TextBuilder)
        .setField('state', TextBuilder);
      const countriesBuilder = UnionBuilder
        .setUnion([international, usa])
        .setDispatch(value => (
          value.country === 'usa' ? imposterUsa : international
        ));
      const Country = countriesBuilder.getType();
      expect(() => Country({ country: 'usa', state: 'california' })).to.throw();
    });
  });

  describe('setField', () => {
    it('should throw', () => {
      expect(() => UnionBuilder.setField(TextBuilder)).to.throw();
    });
  });
});
