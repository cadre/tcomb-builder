import { isBoolean, minMax, noneOfAbove } from '../checkbox';

const range = minMax({ min: 1, max: 3 });
const noneFn = noneOfAbove('none');

describe('checkbox', () => {
  describe('minMax', () => {
    context('less items are selected than min', () => {
      it('does not return null', () => {
        expect(range([false, false, false])).to.not.be.null;
      });
    });

    context('more items are selected than max', () => {
      it('does not return null', () => {
        expect(range([true, true, true, true])).to.not.be.null;
      });
    });

    context('a correct number of items are selected', () => {
      it('returns null', () => {
        expect(range([true, true])).to.be.null;
      });
    });
  });

  describe('noneOfAbove', () => {
    context('the "none" item is selected', () => {
      context('another item is selected', () => {
        it('does not return null', () => {
          expect(noneFn({ a: true, b: false, none: true })).to.not.be.null;
        });
      });

      context('no other items are selected', () => {
        it('returns null', () => {
          expect(noneFn({ a: false, b: false, none: true })).to.be.null;
        });
      });
    });

    context('the "none" item is not selected', () => {
      context('another item is selected', () => {
        it('returns null', () => {
          expect(noneFn({ a: true, b: false, none: false })).to.be.null;
        });
      });

      context('no other items are selected', () => {
        it('returns null', () => {
          expect(noneFn({ a: false, b: false, none: false })).to.be.null;
        });
      });
    });
  });

  describe('isBoolean', () => {
    context('selection is not a boolean', () => {
      it('does not return null', () => {
        expect(isBoolean('foo')).to.not.be.null;
        expect(isBoolean(undefined)).to.not.be.null;
      });
    });

    context('selection is a boolean', () => {
      it('returns null', () => {
        expect(isBoolean(true)).to.be.null;
        expect(isBoolean(false)).to.be.null;
      });
    });
  });
});
