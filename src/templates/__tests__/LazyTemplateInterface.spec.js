import LazyTemplateInterface from '../LazyTemplateInterface';
import MockTemplateFactory from './MockTemplateFactory';
import { constructWithGetters } from '../utils';
import mockProvider from './mockProvider';

describe('LazyTemplateInterface', () => {
  it('throws when setting an undefined template', () => {
    expect(() => constructWithGetters(LazyTemplateInterface, {
      checkbox: new MockTemplateFactory('checkbox'),
      checkboxGroup: new MockTemplateFactory('checkboxGroup'),
      dateTextField: new MockTemplateFactory('dateTextField'),
      dropDown: new MockTemplateFactory('dropDown'),
      formPage: new MockTemplateFactory('formPage'),
      radio: new MockTemplateFactory('radio'),
      staticPage: new MockTemplateFactory('staticPage'),
      struct: new MockTemplateFactory('struct'),
      textArea: new MockTemplateFactory('textArea'),
      textField: new MockTemplateFactory('textField'),

      extraField: new MockTemplateFactory('extraField'), // => extra
    })).to.throw();
  });

  it('throws when a template is missing', () => {
    expect(() => constructWithGetters(LazyTemplateInterface, {
      checkbox: new MockTemplateFactory('checkbox'),
      checkboxGroup: new MockTemplateFactory('checkboxGroup'),
      dateTextField: new MockTemplateFactory('dateTextField'),
      dropDown: new MockTemplateFactory('dropDown'),
      formPage: new MockTemplateFactory('formPage'),
      radio: new MockTemplateFactory('radio'),
      staticPage: new MockTemplateFactory('staticPage'),
      struct: new MockTemplateFactory('struct'),
      textArea: new MockTemplateFactory('textArea'),
      // textField: new MockTemplateFactory('textField'), => missing
    })).to.throw();
  });

  it('throws when getting an undefined template', () => {
    expect(() => mockProvider.getAnotherField()).to.throw();
  });

  it('sets and gets templates', () => {
    expect(mockProvider.getCheckbox().name).to.equal('checkbox');
    expect(mockProvider.getCheckboxGroup().name).to.equal('checkboxGroup');
    expect(mockProvider.getDropDown().name).to.equal('dropDown');
    expect(mockProvider.getRadio().name).to.equal('radio');
    expect(mockProvider.getStaticPage().name).to.equal('staticPage');
  });
});
