import createMountWrapper from './createMountWrapper';
import createRenderWrapper from './createRenderWrapper';

export { createMountWrapper, createRenderWrapper };

export function mapNativeEventNames(event) {
  const nativeToReactEventMap = {
    compositionend: 'compositionEnd',
    compositionstart: 'compositionStart',
    compositionupdate: 'compositionUpdate',
    keydown: 'keyDown',
    keyup: 'keyUp',
    keypress: 'keyPress',
    contextmenu: 'contextMenu',
    dblclick: 'doubleClick',
    doubleclick: 'doubleClick', // kept for legacy. TODO: remove with next major.
    dragend: 'dragEnd',
    dragenter: 'dragEnter',
    dragexist: 'dragExit',
    dragleave: 'dragLeave',
    dragover: 'dragOver',
    dragstart: 'dragStart',
    mousedown: 'mouseDown',
    mousemove: 'mouseMove',
    mouseout: 'mouseOut',
    mouseover: 'mouseOver',
    mouseup: 'mouseUp',
    touchcancel: 'touchCancel',
    touchend: 'touchEnd',
    touchmove: 'touchMove',
    touchstart: 'touchStart',
    canplay: 'canPlay',
    canplaythrough: 'canPlayThrough',
    durationchange: 'durationChange',
    loadeddata: 'loadedData',
    loadedmetadata: 'loadedMetadata',
    loadstart: 'loadStart',
    ratechange: 'rateChange',
    timeupdate: 'timeUpdate',
    volumechange: 'volumeChange',
    beforeinput: 'beforeInput',
    mouseenter: 'mouseEnter',
    mouseleave: 'mouseLeave',
    transitionend: 'transitionEnd',
  };

  return nativeToReactEventMap[event] || event;
}

// 'click' => 'onClick'
// 'mouseEnter' => 'onMouseEnter'
export function propFromEvent(event) {
  const nativeEvent = mapNativeEventNames(event);
  return `on${nativeEvent[0].toUpperCase()}${nativeEvent.slice(1)}`;
}

export function withSetStateAllowed(fn) {
  // NOTE(lmr):
  // this is currently here to circumvent a React bug where `setState()` is
  // not allowed without global being defined.
  let cleanup = false;
  if (typeof global.document === 'undefined') {
    cleanup = true;
    global.document = {};
  }
  const result = fn();
  if (cleanup) {
    // This works around a bug in node/jest in that developers aren't able to
    // delete things from global when running in a node vm.
    global.document = undefined;
    delete global.document;
  }
  return result;
}

export function assertDomAvailable(feature) {
  if (!global || !global.document || !global.document.createElement) {
    throw new Error(`Enzyme's ${feature} expects a DOM environment to be loaded, but found none`);
  }
}

export function nodeTypeFromType(type) {
  if (typeof type === 'string') {
    return 'host';
  }
  if (
    type &&
    type.prototype &&
    type.prototype.isReactComponent
  ) {
    return 'class';
  }
  return 'function';
}

function getIteratorFn(obj) {
  const iteratorFn = obj && (
    (
      typeof Symbol === 'function' &&
      typeof Symbol.iterator === 'symbol' &&
      obj[Symbol.iterator]
    ) ||
    obj['@@iterator']
  );

  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }

  return undefined;
}

function isIterable(obj) {
  return !!getIteratorFn(obj);
}

export function isArrayLike(obj) {
  return Array.isArray(obj) || (typeof obj !== 'string' && isIterable(obj));
}

export function flatten(arrs) {
  // optimize for the most common case
  if (Array.isArray(arrs)) {
    return arrs.reduce(
      (flatArrs, item) => flatArrs.concat(isArrayLike(item) ? flatten(item) : item),
      [],
    );
  }

  // fallback for arbitrary iterable children
  let flatArrs = [];

  const iteratorFn = getIteratorFn(arrs);
  const iterator = iteratorFn.call(arrs);

  let step = iterator.next();

  while (!step.done) {
    const item = step.value;
    let flatItem;

    if (isArrayLike(item)) {
      flatItem = flatten(item);
    } else {
      flatItem = item;
    }

    flatArrs = flatArrs.concat(flatItem);

    step = iterator.next();
  }

  return flatArrs;
}

export function elementToTree(el) {
  if (el === null || typeof el !== 'object' || !('type' in el)) {
    return el;
  }
  const {
    type,
    props,
    key,
    ref,
  } = el;
  const { children } = props;
  let rendered = null;
  if (isArrayLike(children)) {
    rendered = flatten(children).map(elementToTree);
  } else if (typeof children !== 'undefined') {
    rendered = elementToTree(children);
  }
  return {
    nodeType: nodeTypeFromType(type),
    type,
    props,
    key: key || undefined,
    ref,
    instance: null,
    rendered,
  };
}

export function propsWithKeysAndRef(node) {
  if (node.ref !== null || node.key !== null) {
    return {
      ...node.props,
      key: node.key,
      ref: node.ref,
    };
  }
  return node.props;
}
