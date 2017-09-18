import invariant from 'invariant';

import SelectBuilder from '../primitives/SelectBuilder';
import * as validators from '../validators';

class RadioBuilder extends SelectBuilder.constructor {
  /**
   * Set the layout of the radio group to either 'horizontal' or 'vertical.'
   * The template should use this to configure how to layout the buttons.
   *
   * @param {string} layout
   */
  setLayout(layout) {
    invariant(layout === 'horizontal' || layout === 'vertical', 'Layout type is not allowed');
    return this.setConfig({ layout });
  }
}

export default new RadioBuilder()
  .setValidationErrorMessageFn(validators.shared.hasSelection)
  .setLazyTemplateFactory(provider => provider.getRadio());
