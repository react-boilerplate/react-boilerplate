"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnonymous = isAnonymous;
exports.getSectionMetadata = getSectionMetadata;
exports.sortSectionMetadata = sortSectionMetadata;
exports.orderedInsertNode = orderedInsertNode;
exports.assertHasLoc = assertHasLoc;
exports.getEndOfSection = getEndOfSection;
exports.shiftLoc = shiftLoc;
exports.shiftSection = shiftSection;
exports.signatureForOpcode = signatureForOpcode;
exports.getUniqueNameGenerator = getUniqueNameGenerator;

var _signatures = require("./signatures");

var _traverse = require("./traverse");

var _helperWasmBytecode = _interopRequireDefault(require("@webassemblyjs/helper-wasm-bytecode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var debug = require("debug")("webassemblyjs:ast:utils");

function isAnonymous(ident) {
  return ident.raw === "";
}

function getSectionMetadata(ast, name) {
  var section;
  (0, _traverse.traverse)(ast, {
    SectionMetadata: function (_SectionMetadata) {
      function SectionMetadata(_x) {
        return _SectionMetadata.apply(this, arguments);
      }

      SectionMetadata.toString = function () {
        return _SectionMetadata.toString();
      };

      return SectionMetadata;
    }(function (_ref) {
      var node = _ref.node;

      if (node.section === name) {
        section = node;
      }
    })
  });
  return section;
}

function sortSectionMetadata(m) {
  if (m.metadata == null) {
    console.warn("sortSectionMetadata: no metadata to sort");
    return;
  } // $FlowIgnore


  m.metadata.sections.sort(function (a, b) {
    var aId = _helperWasmBytecode.default.sections[a.section];
    var bId = _helperWasmBytecode.default.sections[b.section];

    if (typeof aId !== "number" || typeof bId !== "number") {
      throw new Error("Section id not found");
    }

    return aId > bId;
  });
}

function orderedInsertNode(m, n) {
  assertHasLoc(n);
  var didInsert = false;

  if (n.type === "ModuleExport") {
    m.fields.push(n);
    return;
  }

  m.fields = m.fields.reduce(function (acc, field) {
    var fieldEndCol = Infinity;

    if (field.loc != null) {
      // $FlowIgnore
      fieldEndCol = field.loc.end.column;
    } // $FlowIgnore: assertHasLoc ensures that


    if (didInsert === false && n.loc.start.column < fieldEndCol) {
      didInsert = true;
      acc.push(n);
    }

    acc.push(field);
    return acc;
  }, []); // Handles empty modules or n is the last element

  if (didInsert === false) {
    m.fields.push(n);
  }
}

function assertHasLoc(n) {
  if (n.loc == null || n.loc.start == null || n.loc.end == null) {
    throw new Error("Internal failure: node (".concat(JSON.stringify(n.type), ") has no location information"));
  }
}

function getEndOfSection(s) {
  assertHasLoc(s.size);
  return s.startOffset + s.size.value + ( // $FlowIgnore
  s.size.loc.end.column - s.size.loc.start.column);
}

function shiftLoc(node, delta) {
  // $FlowIgnore
  node.loc.start.column += delta; // $FlowIgnore

  node.loc.end.column += delta;
}

function shiftSection(ast, node, delta) {
  if (node.type !== "SectionMetadata") {
    throw new Error("Can not shift node " + JSON.stringify(node.type));
  }

  node.startOffset += delta;

  if (_typeof(node.size.loc) === "object") {
    shiftLoc(node.size, delta);
  } // Custom sections doesn't have vectorOfSize


  if (_typeof(node.vectorOfSize) === "object" && _typeof(node.vectorOfSize.loc) === "object") {
    shiftLoc(node.vectorOfSize, delta);
  }

  debug("shifted %s startOffset=%d", node.type, node.startOffset);
  var sectionName = node.section; // shift node locations within that section

  (0, _traverse.traverse)(ast, {
    Node: function Node(_ref2) {
      var node = _ref2.node;

      var section = _helperWasmBytecode.default.getSectionForNode(node);

      if (section === sectionName && _typeof(node.loc) === "object") {
        shiftLoc(node, delta);
      }
    }
  });
}

function signatureForOpcode(object, name) {
  var opcodeName = name;

  if (object !== undefined && object !== "") {
    opcodeName = object + "." + name;
  }

  var sign = _signatures.signatures[opcodeName];

  if (sign == undefined) {
    // TODO: Uncomment this when br_table and others has been done
    //throw new Error("Invalid opcode: "+opcodeName);
    return [object, object];
  }

  return sign[0];
}

function getUniqueNameGenerator() {
  var inc = {};
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "temp";

    if (!(prefix in inc)) {
      inc[prefix] = 0;
    } else {
      inc[prefix] = inc[prefix] + 1;
    }

    return prefix + "_" + inc[prefix];
  };
}