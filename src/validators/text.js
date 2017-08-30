import validator from 'validator';

export const length = max => value => {
  if (value.length > max) {
    return `Your response must be ${max} character${max > 1 ? 's' : ''} or less`;
  }

  return null;
};

export const nonEmpty = value => (
  (!value || typeof value !== 'string' || !value.length) ? 'Required' : null
);

export const isEmail = value => (
  (!value || !validator.isEmail(value)) ? 'Please provide a valid email.' : null
);
