

function keys(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(function (i) {
      return i.name;
    });
  }

  return Object.keys(value);
}


export default keys;