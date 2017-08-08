import * as validators from '../index';

const firstValidator = items => {
  if (items.length > 2) {
    return 'Cannot be longer than two';
  }

  return null;
};

const secondValidator = items => {
  if (items[items.length - 1]) {
    return 'Last item cannot be true';
  }

  return null;
};

const combined = validators.combine([firstValidator, secondValidator]);

describe('combine', () => {
  context('when two or more validators are combined', () => {
    it('returns null if all validators pass', () => {
      expect(combined([false, false])).to.be.null;
    });

    context('the first validator fails', () => {
      it('does not return null', () => {
        expect(combined([false, false, false])).to.not.be.null;
      });
    });

    context('the second validator fails', () => {
      it('does not return null', () => {
        expect(combined([false, true])).to.not.be.null;
      });
    });
  });
});
