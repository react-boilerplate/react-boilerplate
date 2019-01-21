"use strict";
// In order to accommodate nested blocks (postcss-nested),
// we need to run a shallow loop (instead of eachDecl() or eachRule(),
// which loop recursively) and allow each nested block to accumulate
// its own list of properties -- so that a property in a nested rule
// does not conflict with the same property in the parent rule
/**
 * executes a provided function once for each declaration block.
 * @param {Root|Document} root - root element of file.
 * @param {function} cb - Function to execute for each declaration block
 */
module.exports = function(root /*: Object */, cb /* Function */) {
  function each(statement) {
    if (statement.nodes && statement.nodes.length) {
      const decls = statement.nodes.filter(node => {
        if (node.type === "decl") {
          return true;
        } else {
          each(node);
        }
      });
      if (decls.length) {
        cb(decls.forEach.bind(decls));
      }
    }
  }
  each(root);
};
