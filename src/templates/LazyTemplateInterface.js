import tcomb from 'tcomb-validation';

export default tcomb.struct({
  checkbox: tcomb.Object,
  checkboxGroup: tcomb.Object,
  dateTextField: tcomb.Object,
  dropDown: tcomb.Object,
  formPage: tcomb.Object,
  radio: tcomb.Object,
  staticPage: tcomb.Object,
  struct: tcomb.Object,
  textArea: tcomb.Object,
  textField: tcomb.Object,
}, { name: 'LazyTemplateInterface', strict: true });
