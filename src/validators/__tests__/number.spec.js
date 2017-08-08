import { isPositiveInteger } from '../number';

describe('number validators', () => {
  describe('isPositiveInteger', () => {
    context('text is invalid', () => {
      it('does not validate', () => {
        expect(isPositiveInteger()).to.not.be.null;
        expect(isPositiveInteger('one')).to.not.be.null;
      });
    });

    context('text is valid', () => {
      it('validates', () => {
        expect(isPositiveInteger(123)).to.be.null;
      });
    });
  });
});
