import BaseBuilder from '../BaseBuilder';

class StructBuilder extends BaseBuilder {
  /**
   * Set the number of columns in the config blob. This
   * only affects how the form gets displayed.
   *
   * @param {integer} columns
   */
  setColumns(columns) {
    return this.setConfig({ columns });
  }

  /**
   * Set the vertical rhythm in the config blob. The template should
   * use this to configure how much vertical spacing should be between
   * each individual component.
   *
   * @param {number} rhythm
   */
  setVerticalRhythm(rhythm) {
    return this.setConfig({ rhythm });
  }
}

export default new StructBuilder()
  .setLazyTemplateFactory(provider => provider.getStruct());
