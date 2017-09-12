import Immutable from 'immutable';

import BaseBuilder from '../BaseBuilder';

class UnionBuilder extends BaseBuilder {
  /**
   * Set the list of builders that make up this union. All builders should be
   * struct types.
   *
   * @param {StructBuilder[]} union - List of builders in the union
   */
  setUnion(union) {
    if (!this._state.get('_fieldBuilders').isEmpty()) {
      throw new Error('Cannot set a union on a builder with fields.');
    }

    return new this.constructor(this._state.set('_unionBuilders', Immutable.List(union)));
  }

  /**
   * Set the dispatch function that conditionally switches between builders.
   * The function should take a `value` parameter which could be any of the
   * structs defined in the union. It should inspect the fields of the `value`
   * struct to decide which struct type to return.
   *
   * @param {function} dispatch
   */
  setDispatch(dispatch) {
    return new this.constructor(this._state.set('_unionDispatch', dispatch));
  }
}

export default new UnionBuilder();
