import tcomb from 'tcomb-validation';

export function validation(type, getValidationErrorMessage, name) {
  return tcomb.refinement(type, x => !tcomb.String.is(getValidationErrorMessage(x)), name);
}
