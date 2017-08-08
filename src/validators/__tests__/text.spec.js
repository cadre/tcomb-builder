import repeat from 'lodash/repeat';

import { length, nonEmpty } from '../text';

const longField = length(100);

describe('text validators', () => {
  describe('length', () => {
    context('text is too long', () => {
      it('does not validate', () => {
        expect(longField(repeat('x', 101))).to.not.be.null;
      });
    });

    context('text is shorter than the max length', () => {
      it('validates', () => {
        expect(longField('foobar')).to.be.null;
      });
    });
  });

  describe('nonEmpty', () => {
    context('text is invalid type', () => {
      it('does not validate', () => {
        expect(nonEmpty()).to.not.be.null;
        expect(nonEmpty(1)).to.not.be.null;
        expect(nonEmpty('')).to.not.be.null;
      });
    });
  });
});
