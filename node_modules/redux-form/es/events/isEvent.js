var isEvent = function isEvent(candidate) {
  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
};

export default isEvent;