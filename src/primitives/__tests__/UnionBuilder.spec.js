import UnionBuilder from '../UnionBuilder';
import StructBuilder from '../StructBuilder';
import TextBuilder from '../TextBuilder';

describe('UnionBuilder', () => {
  describe('setUnion and setDispatch', () => {
    it('should create a valid union type', () => {
      const world = StructBuilder
        .setField('country', TextBuilder);
      const usa = StructBuilder
        .setField('country', TextBuilder)
        .setField('state', TextBuilder);
      const countriesBuilder = UnionBuilder
        .setUnion([world, usa])
        .setDispatch(value => (
          value.country === 'usa' ? usa : world
        ));
      const Country = countriesBuilder.getType();
      expect(() => Country({ country: 'usa', state: 'california' })).to.not.throw();
      expect(() => Country({ country: 'usa' })).to.throw();
      expect(() => Country({ country: 'canada' })).to.not.throw();
    });
  });

  describe('setField', () => {
    it('should throw', () => {
      expect(() => UnionBuilder.setField(TextBuilder)).to.throw();
    });
  });
});
