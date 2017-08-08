import { parseNumber } from '../utils';

describe('parseNumber', () => {
  it('returns a number when given a number', () => {
    expect(parseNumber(1)).to.equal(1);
    expect(parseNumber(3.14)).to.equal(3.14);
  });

  it('returns a number when given a string representing a number', () => {
    expect(parseNumber('1')).to.equal(1);
    expect(parseNumber('3.14')).to.equal(3.14);
  });

  it('returns null when given an empty string', () => {
    expect(parseNumber('')).to.be.null;
  });

  it('returns null when given null', () => {
    expect(parseNumber(null)).to.be.null;
  });

  it('returns the value when passed an unparseable string', () => {
    expect(parseNumber('one')).to.equal('one');
  });

  it('returns the value when given a random object', () => {
    const obj = { foo: 'bar' };
    expect(parseNumber(obj)).to.equal(obj);
  });
});
