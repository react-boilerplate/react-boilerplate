<script>
  (function() {
    // ################################

    var updateReadyInterval;
    var updatingFired;
    var downloadingInterval;
    var obsoleteInterval;
    var cleanUpTimer;

    applicationCache.addEventListener('updateready', onUpdateReadyEvent);
    applicationCache.addEventListener('cached', onInstalledEvent);
    applicationCache.addEventListener('obsolete', onObsoleteEvent);

    applicationCache.addEventListener('downloading', onDownloadingEvent);
    applicationCache.addEventListener('progress', onDownloadingEvent);

    switch (applicationCache.status) {
      case applicationCache.DOWNLOADING: {
        setTimeout(onDownloadingEvent, 1);
      } break;
      case applicationCache.OBSOLETE: {
        setTimeout(onObsoleteEvent, 1);
      } break;
      case applicationCache.UPDATEREADY: {
        setTimeout(onUpdateReadyEvent, 1);
      } break;

      default: {
        downloadingInterval = setInterval(function() {
          if (applicationCache.status === applicationCache.DOWNLOADING) {
            onDownloadingEvent();
          }
        }, 50);

        obsoleteInterval = setInterval(function() {
          if (applicationCache.status === applicationCache.OBSOLETE) {
            onObsoleteEvent();
          }
        }, 50);

        updateReadyInterval = setInterval(function() {
          if (applicationCache.status === applicationCache.UPDATEREADY) {
            onUpdateReadyEvent();
          }
        }, 50);
      }
    }

    cleanUpTimer = setTimeout(function() {
      cleanUp();
    }, 5000);

    // ###############################

    function onDownloadingEvent() {
      if (!updatingFired) {
        updatingFired = true;
        onUpdating();
      }

      downloadingCleanUp();
    }

    function onUpdateReadyEvent() {
      if (!updatingFired) {
        updatingFired = true;
        onUpdating();
        setTimeout(onUpdateReady, 1);
      } else {
        onUpdateReady();
      }

      cleanUp();
    }

    function onInstalledEvent() {
      onInstalled();
      cleanUp();
    }

    function onObsoleteEvent() {
      onUpdateFailed();
      setTimeout(onUninstalled, 1);
      cleanUp();
    }

    function downloadingCleanUp() {
      if (downloadingInterval) {
        clearInterval(downloadingInterval);
        downloadingInterval = null;
      }

      applicationCache.removeEventListener('downloading', onDownloadingEvent);
      applicationCache.removeEventListener('progress', onDownloadingEvent);
    }

    function cleanUp() {
      if (cleanUpTimer) {
        clearTimeout(cleanUpTimer);
        cleanUpTimer = null;
      }

      downloadingCleanUp();

      applicationCache.removeEventListener('updateready', onUpdateReadyEvent);
      applicationCache.removeEventListener('cached', onInstalledEvent);
      applicationCache.removeEventListener('obsolete', onObsoleteEvent);

      if (updateReadyInterval) {
        clearInterval(updateReadyInterval);
        updateReadyInterval = null;
      }

      if (obsoleteInterval) {
        clearInterval(obsoleteInterval);
        obsoleteInterval = null;
      }
    }

    // ################################
  }());

  function onUpdating() {
    // sendEvent('onUpdating');
  }

  function onUpdateReady() {
    sendEvent('onUpdateReady');
  }

  function onUpdateFailed() {
    sendEvent('onUpdateFailed');
  }

  function onUninstalled() {
    sendEvent('onUninstalled');
  }

  function onInstalled() {
    sendEvent('onInstalled');
  }

  function sendEvent(event) {
    window.parent.postMessage('__offline-plugin_AppCacheEvent:' + event, '*');
  }

  window.__applyUpdate = function() {
    applicationCache.swapCache();
    sendEvent('onUpdated');
  };
</script>
