'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isAvailable = isAvailable;
exports.isSubscribed = isSubscribed;
exports.requestPush = requestPush;
exports.updateSubscriptionState = updateSubscriptionState;
exports.getStoredSubscription = getStoredSubscription;
exports.getPublicKey = getPublicKey;
var isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname.indexOf('127.') === 0;

var CACHE_NAME = '$$$offline-plugin:push';

/*

Push API availability:
  * available
  * not-available
  * already-blocked

Subscription states:
  * <all above> (except `available`)
  * subscribed -- Device/browser already has subscription
  * able-to-subscribe -- Device/browser isn't subscribed, but push API available
  * subscribing -- User just granted permission in this session

Push Request:
  * <all above> (except `available`)
  * (maybe use `blocked` everywhere instead of denied/already-blocked?) denied -- Notifications permission clearly denied by the user in this session

Background Subscription:
  * subscribed -- Subscription was successful
  * error -- subscription wasn't successful (with possible error report)

*/

// If I have no UID/current push data stored and have subscription --
// unsubscribe current subscription if permission is allowing that and
// create new one. If not allowed, just leave subscription there.
// (though I don't think it's possible to have revoked permission and
// subscription in place)

var _status = undefined;
var _onStatusChange = undefined;
var _pushPublicKey = undefined;

var push = Object.defineProperties({

  init: function init() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var onStatusChange = _ref.onStatusChange;

    _onStatusChange = onStatusChange;

    return push.status = isSubscribed();
  }
}, {
  status: {
    get: function get() {
      return _status;
    },
    set: function set(val) {
      _status = val;

      if (typeof _onStatusChange === 'function') {
        val.then(_onStatusChange);
      }
    },
    configurable: true,
    enumerable: true
  }
});

exports['default'] = push;

function isAvailable() {
  if (!isSecure) {
    return Promise.resolve({ status: 'not-available' });
  }

  if (!navigator.serviceWorker) {
    return Promise.resolve({ status: 'not-available' });
  }

  if (!('PushManager' in window)) {
    return Promise.resolve({ status: 'not-available' });
  }

  if (!window.Notification || !Notification.permission) {
    return Promise.resolve({ status: 'not-available' });
  }

  if (Notification.permission === 'denied') {
    return Promise.resolve({ status: 'already-blocked' });
  }

  return Promise.resolve({ status: 'available' });
}

function isSubscribed() {
  var params = arguments.length <= 0 || arguments[0] === undefined ? { resubscribe: true } : arguments[0];

  return isAvailable().then(function (result) {
    if (result.status !== 'available') return result;

    return navigator.serviceWorker.ready.then(function (reg) {
      if (!reg.pushManager) {
        return Promise.resolve({ status: 'not-available' });
      }

      return reg.pushManager.getSubscription()['catch'](function () {}).then(function (subscription) {
        if (!subscription) {
          if (params.resubscribe && Notification.permission === 'granted') {
            // Subscribe asynchronously
            performBackgroundSubscription();
            return Promise.resolve({ status: 'subscribing' });
          }

          return Promise.resolve({ status: 'able-to-subscribe' });
        }

        var subscriptionKey = subscription.options && new Uint8Array(subscription.options.applicationServerKey);

        if (!subscription.options || getPublicKey().toString() === subscriptionKey.toString()) {
          // Let server know subscription is still valid
          handleSubscription({
            subscription: subscription
          });

          return Promise.resolve({ status: 'subscribed' });
        }

        var unsubscribe = subscription.unsubscribe();

        if (params.resubscribe && Notification.permission === 'granted') {
          return unsubscribe.then(function () {
            return requestPushInternal({
              replace: subscription,
              userVisible: false
            });
          });
        }

        return Promise.resolve({ status: 'able-to-subscribe' });
      });
    });
  });
}

function requestPush(params) {
  return push.status = _requestPush(params);
}

function _requestPush() {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {
    replace: void 0,
    userVisible: true
  } : arguments[0];

  return isAvailable().then(function (result) {
    if (result.status !== 'available') return result;

    if (Notification.permission === 'granted') {
      // Subscribe asynchronously
      performBackgroundSubscription(params);
      return Promise.resolve({ status: 'subscribing' });
    }

    // 'denied' handled by isAvailabe() and 'granted' just handled
    // it's 'default' now
    if (!params.userVisible) {
      return Promise.resolve({ status: 'able-to-subscribe' });
    }

    return requestPermission().then(function (permission) {
      if (permission === 'granted') {
        // Subscribe asynchronously
        performBackgroundSubscription(params);
        return Promise.resolve({ status: 'subscribing' });
      }

      if (permission === 'denied') {
        return Promise.resolve({ status: 'denied' });
      }

      return Promise.resolve({ status: 'able-to-subscribe' });
    });
  });
}

function requestPermission() {
  if (!window.Notification || !window.Notification.requestPermission) {
    return Promise.resolve('default');
  }

  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return Promise.resolve(Notification.permission);
  }

  return new Promise(function (resolve) {
    return Notification.requestPermission(resolve);
  });
  // return Notification.requestPermission().catch(() => {});
}

function performBackgroundSubscription() {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return navigator.serviceWorker.ready.then(function (registration) {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: getPublicKey()
    });
  }).then(function (subscription) {
    if (!subscription) {
      throw void 0;
    }

    handleSubscription({
      replace: params.replace,
      subscription: subscription
    });

    return Promise.resolve({ status: 'subscribed' });
  }).then(function (result) {
    // Update push status once background subscription finished
    push.status = Promise.resolve(result);
    return result;
  })['catch'](function (error) {
    // At this moment push.status most likely is 'subscribing',
    // check subscription status again
    push.status = isSubscribed({ resubscribe: false });
    return Promise.resolve({ status: 'error', error: error });
  });
}

function handleSubscription(_ref2) {
  var subscription = _ref2.subscription;

  getStoredSubscription().then(function (storedData) {
    subscription = subscription.toJSON();

    var id = undefined;
    var active = true;

    if (storedData && storedData.body && storedData.body.data) {
      id = storedData.body.data.id || void 0;

      if (typeof storedData.body.data.active === 'boolean') {
        active = storedData.body.data.active;
      }
    }

    var body = {
      action: 'add',
      data: {
        id: id,
        active: active,
        subscription: subscription
      }
    };

    var data = {
      url: '/push-subscribe',
      body: body,
      saved: false
    };

    syncSubscription(data);
  });
}

function syncSubscription(data) {
  storeSubscription(data).then(function () {
    return navigator.serviceWorker.ready.then(function (reg) {
      if (reg.sync) {
        console.log('via background sync');
        reg.sync.register('send-subscription');
      } else {
        sendSubscription(data);
      }
    });
  })['catch'](function () {
    sendSubscription(data);
  });
}

function sendSubscription(data) {
  return fetch(data.url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data.body)
  }).then(function (response) {
    if (!response.ok) {
      return;
    }

    return response.text().then(function (uuid) {
      data.saved = true;
      data.body.data.id = uuid;

      return storeSubscription(data)['catch'](function () {});
    });
  });
}

function updateSubscriptionState(_ref3) {
  var active = _ref3.active;

  getStoredSubscription().then(function (storedData) {
    var id = undefined;
    var subscription = undefined;

    if (storedData && storedData.body && storedData.body.data) {
      id = storedData.body.data.id || void 0;
      subscription = storedData.body.data.subscription || void 0;
    }

    // Cannot perform an update if both id and subscription itself aren't available
    if (!id || !subscription) return;

    var body = {
      action: 'update',
      data: {
        id: id,
        active: active,
        subscription: subscription
      }
    };

    var data = {
      url: '/push-subscribe',
      body: body,
      saved: false
    };

    syncSubscription(data);
  });
}

function getStoredSubscription() {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match('/__push_subscription__');
  }).then(function (data) {
    if (data) {
      return JSON.parse(data);
    }
  })['catch'](function () {});
}

function storeSubscription(data) {
  return caches.open(CACHE_NAME).then(function (cache) {
    var response = new Response(JSON.stringify(data));

    return cache.put('/__push_subscription__', response);
  });
}

function getPublicKey() {
  if (!_pushPublicKey) {
    _pushPublicKey = urlBase64ToUint8Array(PUSH_PUBLIC_KEY);
  }

  return _pushPublicKey;
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}