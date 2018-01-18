import CharacterProfileBuilder from '../examples/CharacterProfileBuilder';
import mockProvider from '../templates/__tests__/mockProvider';
import {
  BaseBuilder,
  primitives,
  validators,
  widgets,
} from '../index';

describe('index sanity test', () => {
  describe('provider can be accessed from a builder', () => {
    const builder = CharacterProfileBuilder.setLazyTemplateProvider(mockProvider, 'MockProvider');
    expect(() => builder.getType()).to.not.throw();
    expect(() => builder.getOptions()).to.not.throw();
  });

  describe('primitives', () => {
    it('are exported', () => {
      expect(primitives.CheckboxBuilder).to.not.be.undefined;
      expect(() => primitives.CheckboxBuilder.setLabel('foobar')).to.not.throw();
    });
  });

  describe('widgets', () => {
    it('are exported', () => {
      expect(widgets.CheckboxBuilder).to.not.be.undefined;
      expect(() => widgets.CheckboxBuilder.setLabel('foobar')).to.not.throw();
    });
  });

  describe('validators', () => {
    it('are exported', () => {
      expect(validators.text.length(3)('abcd')).to.contain('Your response must');
    });
  });

  describe('BaseBuilder', () => {
    it('is exported', () => {
      expect(() => new BaseBuilder().setLabel('foobar')).to.not.throw();
    });
  });
});
