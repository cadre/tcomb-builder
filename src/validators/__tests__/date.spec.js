import { birthdate } from '../date';

describe('date validator', () => {
  context('date is empty', () => {
    it('does not validate', () => {
      expect(birthdate()).to.not.be.null;
      expect(birthdate(1)).to.not.be.null;
      expect(birthdate('')).to.not.be.null;
    });
  });

  context('date is malformed', () => {
    it('does not validate', () => {
      expect(birthdate('90-01-1995')).to.not.be.null;
      expect(birthdate('5-01-1995')).to.not.be.null;
      expect(birthdate('5/01/1995')).to.not.be.null;
      expect(birthdate('5-01-5000')).to.not.be.null;
    });
  });

  context('date is correct', () => {
    it('validates', () => {
      expect(birthdate('05-01-1995')).to.be.null;
    });
  });
});
