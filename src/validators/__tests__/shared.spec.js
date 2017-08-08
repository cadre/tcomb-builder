import { hasSelection } from '../shared';

describe('shared', () => {
  describe('hasSelection', () => {
    context('value is null', () => {
      it('should return an error string', () => {
        expect(hasSelection(null)).to.not.be.null;
      });
    });

    context('value is not null', () => {
      it('should return null', () => {
        expect(hasSelection('foo')).to.be.null;
      });
    });
  });
});
