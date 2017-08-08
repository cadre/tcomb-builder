import filter from 'lodash/filter';
import values from 'lodash/values';

export const minMax = ({ min, max }) => items => {
  const numSelected = filter(items, i => i).length;
  if (max && numSelected > max) {
    return `Please select at most ${max} item${max === 1 ? '' : 's'}.`;
  }
  if (min && numSelected < min) {
    return `Please select at least ${min} item${min === 1 ? '' : 's'}.`;
  }
  return null;
};

export const noneOfAbove = noneKey => items => {
  // Nothing to validate if the "None of the above" option is deselected.
  if (!items[noneKey]) {
    return null;
  }

  // Iterate over all the other keys besides the "none of the above" option.
  const otherResponses = values(filter(items, (val, key) => key !== noneKey));
  if (otherResponses.includes(true)) {
    return 'Cannot select "None" and other options at the same time';
  }

  return null;
};

export const isBoolean = value => (
  (typeof value !== 'boolean') ? 'Value must be a boolean' : null
);
