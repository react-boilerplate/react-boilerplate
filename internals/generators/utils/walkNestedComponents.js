/**
 * walkNestedComponents
 *
 * List all components listed within a directory
 */

const fs = require('fs');

function walkNestedComponents(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    	// Only include the directory as a component if `index.js` is defined
    	if(file === 'index.js')
    	{
    		results.push(dir)
    	}
    	else
    	{
	        const filePath = `${dir}/${file}`;
	        const stat = fs.statSync(filePath);
	        if (stat && stat.isDirectory()) { 
	            /* Recurse into a subdirectory */
	            results = results.concat(walkNestedComponents(filePath));
	        }
	    }
  });
  return results;
}

module.exports = walkNestedComponents