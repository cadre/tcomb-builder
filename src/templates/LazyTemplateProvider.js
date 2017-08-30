import Immutable from 'immutable';

// Structs
const CHECKBOX_GROUP = 'checkbox group';
const DOUBLE_COLUMN = 'double column';
const FORM_PAGE = 'form page';
const SINGLE_COLUMN = 'single column';
const STATIC_PAGE = 'static page';
const STRUCT = 'struct';

// Components
const CHECKBOX = 'checkbox';
const DATE_TEXT_FIELD = 'date text field';
const DROP_DOWN = 'drop down';
const RADIO = 'radio';
const TEXT_AREA = 'text area';
const TEXT_FIELD = 'text field';
const VERTICAL_RADIO = 'vertical radio';

export default class LazyTemplateProvider {
  constructor(templateFactories = Immutable.Map()) {
    this.templateFactories = templateFactories;
  }

  _getField(key) {
    if (!this.templateFactories.has(key)) {
      throw new Error(`Template factory was not found in provider: '${key}'`);
    }

    return this.templateFactories.get(key);
  }

  _setField(key, factory) {
    if (!factory) {
      throw new Error(`Could not set undefined template factory: '${key}'`);
    }

    return new LazyTemplateProvider(this.templateFactories.set(key, factory));
  }

  getCheckbox() { return this._getField(CHECKBOX); }
  getCheckboxGroup() { return this._getField(CHECKBOX_GROUP); }
  getDateTextField() { return this._getField(DATE_TEXT_FIELD); }
  getDoubleColumn() { return this._getField(DOUBLE_COLUMN); }
  getDropDown() { return this._getField(DROP_DOWN); }
  getFormPage() { return this._getField(FORM_PAGE); }
  getRadio() { return this._getField(RADIO); }
  getSingleColumn() { return this._getField(SINGLE_COLUMN); }
  getStaticPage() { return this._getField(STATIC_PAGE); }
  getStruct() { return this._getField(STRUCT); }
  getTextArea() { return this._getField(TEXT_AREA); }
  getTextField() { return this._getField(TEXT_FIELD); }
  getVerticalRadio() { return this._getField(VERTICAL_RADIO); }

  setCheckbox(factory) { return this._setField(CHECKBOX, factory); }
  setCheckboxGroup(factory) { return this._setField(CHECKBOX_GROUP, factory); }
  setDateTextField(factory) { return this._setField(DATE_TEXT_FIELD, factory); }
  setDoubleColumn(factory) { return this._setField(DOUBLE_COLUMN, factory); }
  setDropDown(factory) { return this._setField(DROP_DOWN, factory); }
  setFormPage(factory) { return this._setField(FORM_PAGE, factory); }
  setRadio(factory) { return this._setField(RADIO, factory); }
  setSingleColumn(factory) { return this._setField(SINGLE_COLUMN, factory); }
  setStaticPage(factory) { return this._setField(STATIC_PAGE, factory); }
  setStruct(factory) { return this._setField(STRUCT, factory); }
  setTextField(factory) { return this._setField(TEXT_FIELD, factory); }
  setTextArea(factory) { return this._setField(TEXT_AREA, factory); }
  setVerticalRadio(factory) { return this._setField(VERTICAL_RADIO, factory); }
}
