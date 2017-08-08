import t from 'tcomb-validation';

function toNull(value) {
  return (t.String.is(value) && value.trim() === '') || t.Nil.is(value) ? null : value;
}

export function parseNumber(value) {
  const n = parseFloat(value);
  const isNumeric = value == n; // eslint-disable-line eqeqeq
  return isNumeric ? n : toNull(value);
}
