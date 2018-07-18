import React from 'react';
import { Iterable } from 'immutable';

/**
 * HOC to convert the ImmutableJS state to a plain Javascript object for our
 * React dumb components. This is more performant than calling `toJS` on each of
 * our properties in `mapStateToProps`.
 */
export default (WrappedComponent) => (wrappedComponentProps) => {
  const KEY = 0;
  const VALUE = 1;

  const propsJS = Object.entries(
    wrappedComponentProps
  ).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable( // eslint-disable-line no-param-reassign
      wrappedComponentProp[VALUE]
    )
      ? wrappedComponentProp[VALUE].toJS()
      : wrappedComponentProp[VALUE];
    return newProps;
  }, {});

  return <WrappedComponent {...propsJS} />;
};
