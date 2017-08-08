import moment from 'moment';

export const birthdate = value => {
  const date = moment(value, 'MM-DD-YYYY', true);
  if (!value || typeof value !== 'string' || value.length !== 10 || !date.isValid()) {
    return 'Please provide a date in the format MM-DD-YYYY';
  }

  if (!date.isBefore(moment())) {
    return 'Please provide a date that is before today';
  }

  return null;
};
