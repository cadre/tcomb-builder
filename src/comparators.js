/**
 * Sort comparators for selection-based components.
 */
const sortComparators = {
  ascByLabel: (a, b) => {
    if (a.label < b.label) {
      return -1;
    } else if (a.label > b.label) {
      return 1;
    }
    return 0;
  },
  ascByValue: (a, b) => {
    if (a.label < b.label) {
      return -1;
    } else if (a.label > b.label) {
      return 1;
    }
    return 0;
  },
  descByLabel: (a, b) => {
    if (a.value < b.value) {
      return 1;
    } else if (a.value > b.value) {
      return -1;
    }
    return 0;
  },
  descByValue: (a, b) => {
    if (a.value < b.value) {
      return 1;
    } else if (a.value > b.value) {
      return -1;
    }
    return 0;
  },
};

export default sortComparators;
