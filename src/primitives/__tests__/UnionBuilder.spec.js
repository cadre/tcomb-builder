import UnionBuilder from '../UnionBuilder';
import StructBuilder from '../StructBuilder';
import TextBuilder from '../TextBuilder';
import TemplatedTextBuilder from '../../widgets/TextBuilder';

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

    it('can disable templates of union types', () => {
      const international = StructBuilder
        .setField('country', TemplatedTextBuilder);
      const usa = StructBuilder
        .setField('country', TemplatedTextBuilder)
        .setField('state', TemplatedTextBuilder);

      const countriesBuilder = UnionBuilder
        ._disableTemplates()
        .setUnion([international, usa])
        .setDispatch(value => (
          value.country === 'usa' ? usa : international
        ));
      expect(() => countriesBuilder.getOptions()).to.not.throw();
      expect(countriesBuilder.getOptions()).to.have.length(2);
    });
  });

  describe('setField', () => {
    it('should throw', () => {
      expect(() => UnionBuilder.setField(TextBuilder)).to.throw();
    });
  });

  describe('isEqual', () => {
    it('can compare inequivalent builders', () => {
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

      const otherInternational = StructBuilder
        .setField('country', TextBuilder);
      const otherUsa = StructBuilder
        .setField('country', TextBuilder)
        .setField('state', TextBuilder);
      const otherCountriesBuilder = UnionBuilder
        .setUnion([otherInternational, otherUsa])
        .setDispatch(value => (
          value.country === 'usa' ? otherUsa : otherInternational
        ));

      expect(countriesBuilder.isEqual(otherCountriesBuilder)).to.be.true;
    });
  });
});
