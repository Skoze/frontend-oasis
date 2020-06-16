export function sortByDesc(...by) {
  return function(array) {
    if (Array.isArray(array)) {
      return array.sort((a, b) => {
        for (let prop of by) {
          if (a[prop] > b[prop]) {
            return -1;
          } else if (a[prop] < b[prop]) {
            return 1;
          }
        }
        return 0;
      });
    } else {
      return array;
    }
  };
}
