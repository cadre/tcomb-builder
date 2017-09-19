import { LazyTemplateInterface, constructWithGetters } from '../../index';
import MockTemplateFactory from './MockTemplateFactory';


export default constructWithGetters(LazyTemplateInterface, {
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
});
