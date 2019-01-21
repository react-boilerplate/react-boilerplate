"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSection = removeSection;

var _ast = require("@webassemblyjs/ast");

var _helperBuffer = require("@webassemblyjs/helper-buffer");

var debug = require("debug")("webassemblyjs:wasm:removesection");

function removeSection(ast, uint8Buffer, section) {
  var sectionMetadata = (0, _ast.getSectionMetadata)(ast, section);

  if (typeof sectionMetadata === "undefined") {
    throw new Error("Section metadata not found");
  } // replacement is nothing


  var replacement = [];
  var startsIncludingId = sectionMetadata.startOffset - 1;
  var ends = sectionMetadata.startOffset + sectionMetadata.size.value + 1;
  var delta = -(ends - startsIncludingId);
  /**
   * update AST
   */
  // Once we hit our section every that is after needs to be shifted by the delta

  var encounteredSection = false;
  (0, _ast.traverse)(ast, {
    SectionMetadata: function SectionMetadata(path) {
      if (path.node.section === section) {
        encounteredSection = true;
        return path.remove();
      }

      if (encounteredSection === true) {
        (0, _ast.shiftSection)(ast, path.node, delta);
        debug("shift section section=%s detla=%d", section, delta);
      }
    }
  });
  return (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, startsIncludingId, ends, replacement);
}