import { LazyTemplateInterface, constructWithGetters } from '../../index';
import MockTemplateFactory from './MockTemplateFactory';

export default constructWithGetters(LazyTemplateInterface, {
  checkbox: MockTemplateFactory,
  checkboxGroup: MockTemplateFactory,
  dateTextField: MockTemplateFactory,
  dropDown: MockTemplateFactory,
  formPage: MockTemplateFactory,
  radio: MockTemplateFactory,
  staticPage: MockTemplateFactory,
  struct: MockTemplateFactory,
  textArea: MockTemplateFactory,
  textField: MockTemplateFactory,
});
