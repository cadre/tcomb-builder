import tcomb from 'tcomb-validation';

export default tcomb.struct({
  checkbox: tcomb.Function,
  checkboxGroup: tcomb.Function,
  dateTextField: tcomb.Function,
  dropDown: tcomb.Function,
  formPage: tcomb.Function,
  radio: tcomb.Function,
  staticPage: tcomb.Function,
  struct: tcomb.Function,
  textArea: tcomb.Function,
  textField: tcomb.Function,
}, { name: 'LazyTemplateInterface', strict: true });
