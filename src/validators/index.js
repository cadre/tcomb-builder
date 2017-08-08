export * as checkbox from './checkbox';
export * as date from './date';
export * as number from './number';
export * as shared from './shared';
export * as text from './text';

/**
 * Combine an array of validators, returning the first non-null result found,
 * or null if all validators pass.
 */
export const combine = validators => items => (
  validators.reduce((acc, validator) => {
    if (acc !== null) {
      return acc;
    }

    return validator(items);
  }, null)
);
