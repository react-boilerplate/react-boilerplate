/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

import fs from 'fs';
import path from 'path';

export function componentExists(comp: string) {
  const pageComponents = fs.readdirSync(
    path.join(__dirname, '../../../src/app/components'),
  );
  const pageContainers = [];
  const components = pageComponents.concat(pageContainers);
  return components.indexOf(comp) >= 0;
}
