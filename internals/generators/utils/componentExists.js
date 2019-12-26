/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const path = require('path');

const walkNestedComponents = require('./walkNestedComponents')

const pageComponents = walkNestedComponents(path.join(__dirname,'../../../app/components'))
const pageContainers = walkNestedComponents(path.join(__dirname,'../../../app/containers'))

const components = pageComponents.concat(pageContainers)

function componentExists(comp) {
  const containerPath = path.join(__dirname, `../../../app/containers/${comp}`)
  const componentPath = path.join(__dirname, `../../../app/components/${comp}`)
	
  	return (
  		components.indexOf(containerPath) >= 0 ||
  		components.indexOf(componentPath) >= 0
  	);
}

module.exports = componentExists;
