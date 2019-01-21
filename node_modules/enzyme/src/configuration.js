import validateAdapter from './validateAdapter';

const configuration = {};

module.exports = {
  get() { return { ...configuration }; },
  merge(extra) {
    if (extra.adapter) {
      validateAdapter(extra.adapter);
    }
    Object.assign(configuration, extra);
  },
};
