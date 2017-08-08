export const hasSelection = value => {
  if (value === null || value === undefined) {
    return 'Please select a value';
  }
  return null;
};
