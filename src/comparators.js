/**
 * Sort comparators for selection-based components.
 */
export function ascByLabel(a, b) {
  if (a.label < b.label) {
    return -1;
  } else if (a.label > b.label) {
    return 1;
  }
  return 0;
}

export function ascByValue(a, b) {
  if (a.label < b.label) {
    return -1;
  } else if (a.label > b.label) {
    return 1;
  }
  return 0;
}

export function descByLabel(a, b) {
  if (a.value < b.value) {
    return 1;
  } else if (a.value > b.value) {
    return -1;
  }
  return 0;
}

export function descByValue(a, b) {
  if (a.value < b.value) {
    return 1;
  } else if (a.value > b.value) {
    return -1;
  }
  return 0;
}
