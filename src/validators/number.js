import t, { validate } from 'tcomb-validation';

export const isNumber = value => (
  validate(value, t.Number).isValid() ? null : 'Please provide a number'
);

const Positive = t.refinement(t.Number, x => x > 0 && x % 1 === 0);

export const isPositiveInteger = value => (
  validate(value, Positive).isValid() ? null : 'Please provide a positive integer'
);
