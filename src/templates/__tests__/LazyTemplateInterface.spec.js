import LazyTemplateInterface from '../LazyTemplateInterface';
import MockTemplateFactory from './MockTemplateFactory';
import { constructWithGetters } from '../utils';
import mockProvider from './mockProvider';

describe('LazyTemplateInterface', () => {
  it('throws when setting an undefined template', () => {
    expect(() => constructWithGetters(LazyTemplateInterface, {
      checkbox: MockTemplateFactory,
      checkboxGroup: MockTemplateFactory,
      dropDown: MockTemplateFactory,
      formPage: MockTemplateFactory,
      radio: MockTemplateFactory,
      staticPage: MockTemplateFactory,
      struct: MockTemplateFactory,
      textArea: MockTemplateFactory,
      textField: MockTemplateFactory,

      extraField: MockTemplateFactory, // => extra
    })).to.throw();
  });

  it('throws when a template is missing', () => {
    expect(() => constructWithGetters(LazyTemplateInterface, {
      checkbox: MockTemplateFactory,
      checkboxGroup: MockTemplateFactory,
      dropDown: MockTemplateFactory,
      formPage: MockTemplateFactory,
      radio: MockTemplateFactory,
      staticPage: MockTemplateFactory,
      struct: MockTemplateFactory,
      textArea: MockTemplateFactory,
      // textField: MockTemplateFactory, => missing
    })).to.throw();
  });

  it('throws when getting an undefined template', () => {
    expect(() => mockProvider.getAnotherField()).to.throw();
  });

  it('sets and gets templates', () => {
    const Constructor = mockProvider.getCheckbox();
    expect(new Constructor('checkbox').name).to.equal('checkbox');
  });
});
