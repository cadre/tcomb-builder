export const hasSelection = value => {
  if (value === null || value === undefined) {
    return 'Required';
  }
  return null;
};
