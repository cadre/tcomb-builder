import CharacterProfileBuilder from '../examples/CharacterProfileBuilder';
import TelevisionShowBuilder from '../examples/TelevisionShowBuilder';
import mockProvider from '../templates/__tests__/mockProvider';
import * as tcombBuilder from '../index';

const CHARACTER_PROFILE = 'CHARACTER_PROFILE';
const TELEVISION_SHOW = 'TELEVISION_SHOW';

describe('index sanity test', () => {
  const input = [
    {
      builder: CharacterProfileBuilder,
      name: CHARACTER_PROFILE,
    },
    {
      builder: TelevisionShowBuilder,
      name: TELEVISION_SHOW,
    },
  ];

  describe('create', () => {
    it('generates the correct API structure', () => {
      const survey = tcombBuilder.create(input, mockProvider);
      expect(survey[CHARACTER_PROFILE].options).to.not.be.undefined;
      expect(survey[CHARACTER_PROFILE].type).to.not.be.undefined;
      expect(survey[TELEVISION_SHOW].options).to.not.be.undefined;
      expect(survey[TELEVISION_SHOW].type).to.not.be.undefined;
    });
  });

  describe('createTypes', () => {
    it('generates the correct API structure', () => {
      const types = tcombBuilder.createTypes(input);
      expect(types[CHARACTER_PROFILE]).to.not.be.undefined;
      expect(types[TELEVISION_SHOW]).to.not.be.undefined;
    });
  });

  describe('primitives', () => {
    it('are exported', () => {
      expect(tcombBuilder.primitives.CheckboxBuilder).to.not.be.undefined;
      expect(() => tcombBuilder.primitives.CheckboxBuilder.setLabel('foobar')).to.not.throw();
    });
  });

  describe('widgets', () => {
    it('are exported', () => {
      expect(tcombBuilder.widgets.CheckboxBuilder).to.not.be.undefined;
      expect(() => tcombBuilder.widgets.CheckboxBuilder.setLabel('foobar')).to.not.throw();
    });
  });

  describe('validators', () => {
    it('are exported', () => {
      expect(tcombBuilder.validators.text.length(3)('abcd')).to.contain('Your response must');
    });
  });

  describe('BaseBuilder', () => {
    it('is exported', () => {
      expect(() => new tcombBuilder.BaseBuilder().setLabel('foobar')).to.not.throw();
    });
  });
});
