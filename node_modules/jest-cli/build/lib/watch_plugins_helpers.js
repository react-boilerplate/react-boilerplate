'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
const filterInteractivePlugins = (exports.filterInteractivePlugins = (
  watchPlugins,
  globalConfig
) => {
  const usageInfos = watchPlugins.map(
    p => p.getUsageInfo && p.getUsageInfo(globalConfig)
  );

  return watchPlugins.filter((plugin, i, array) => {
    if (usageInfos[i]) {
      const key = usageInfos[i].key;

      return !usageInfos.slice(i + 1).some(u => u && key === u.key);
    }

    return false;
  });
});

const getSortedUsageRows = (exports.getSortedUsageRows = (
  watchPlugins,
  globalConfig
) => {
  return filterInteractivePlugins(watchPlugins, globalConfig)
    .sort((a, b) => {
      if (a.isInternal) {
        return -1;
      }

      const usageInfoA = a.getUsageInfo && a.getUsageInfo(globalConfig);
      const usageInfoB = b.getUsageInfo && b.getUsageInfo(globalConfig);

      if (usageInfoA && usageInfoB) {
        return usageInfoA.key.localeCompare(usageInfoB.key);
      }

      return 0;
    })
    .map(p => p.getUsageInfo && p.getUsageInfo(globalConfig))
    .filter(Boolean);
});
