exports.isEmpty = (...values) => {
    for (const value of values) {
        if (typeof(value) === 'undefined' || value === null || value === '') {
          return true;
        } else {
          if (!(typeof(value) === 'string')) {
            return false;
          } else {
            if (value.trim && value.trim().length === 0) {
              return false;
            } else {
              return true;
            }
          }
        }
    }
    return true;
};

exports.isNotEmpty = (...values) => {
    for (const value of values) {
        if (typeof(value) === 'undefined' || value === null || value === '') {
          return false;
        } else {
          if (!(typeof(value) === 'string')) {
            return true;
          } else {
            if (value.trim && value.trim().length > 0) {
              return true;
            } else {
              return false;
            }
          }
        }
    }
    return true;
};