import * as comparators from '../comparators';

const choices = [
  {
    label: 'dog',
    value: 'a',
  },
  {
    label: 'cat',
    value: 'b',
  },
  {
    label: 'ant',
    value: 'c',
  },
];
describe('comparators', () => {
  describe('ascByLabel', () => {
    it('can sort', () => {
      expect(choices.sort(comparators.ascByLabel)).to.deep.equal([
        {
          label: 'ant',
          value: 'c',
        },
        {
          label: 'cat',
          value: 'b',
        },
        {
          label: 'dog',
          value: 'a',
        },
      ]);
    });
  });
  describe('ascByValue', () => {
    it('can sort', () => {
      expect(choices.sort(comparators.ascByValue)).to.deep.equal([
        {
          label: 'dog',
          value: 'a',
        },
        {
          label: 'cat',
          value: 'b',
        },
        {
          label: 'ant',
          value: 'c',
        },
      ]);
    });
  });
  describe('descByLabel', () => {
    it('can sort', () => {
      expect(choices.sort(comparators.descByLabel)).to.deep.equal([
        {
          label: 'dog',
          value: 'a',
        },
        {
          label: 'cat',
          value: 'b',
        },
        {
          label: 'ant',
          value: 'c',
        },
      ]);
    });
  });
  describe('descByValue', () => {
    it('can sort', () => {
      expect(choices.sort(comparators.descByValue)).to.deep.equal([
        {
          label: 'ant',
          value: 'c',
        },
        {
          label: 'cat',
          value: 'b',
        },
        {
          label: 'dog',
          value: 'a',
        },
      ]);
    });
  });
});
