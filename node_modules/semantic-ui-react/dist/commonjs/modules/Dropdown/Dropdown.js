"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _compact2 = _interopRequireDefault(require("lodash/compact"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _every2 = _interopRequireDefault(require("lodash/every"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _some2 = _interopRequireDefault(require("lodash/some"));

var _escapeRegExp2 = _interopRequireDefault(require("lodash/escapeRegExp"));

var _deburr2 = _interopRequireDefault(require("lodash/deburr"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _dropRight2 = _interopRequireDefault(require("lodash/dropRight"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _union2 = _interopRequireDefault(require("lodash/union"));

var _get4 = _interopRequireDefault(require("lodash/get"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _classnames = _interopRequireDefault(require("classnames"));

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

var _Label = _interopRequireDefault(require("../../elements/Label"));

var _DropdownDivider = _interopRequireDefault(require("./DropdownDivider"));

var _DropdownItem = _interopRequireDefault(require("./DropdownItem"));

var _DropdownHeader = _interopRequireDefault(require("./DropdownHeader"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _DropdownSearchInput = _interopRequireDefault(require("./DropdownSearchInput"));

var getKeyOrValue = function getKeyOrValue(key, value) {
  return (0, _isNil2.default)(key) ? value : key;
};
/**
 * A dropdown allows a user to select a value from a series of options.
 * @see Form
 * @see Select
 * @see Menu
 */


var Dropdown =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Dropdown, _Component);

  function Dropdown() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Dropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Dropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e, value) {
      (0, _invoke2.default)(_this.props, 'onChange', e, (0, _objectSpread2.default)({}, _this.props, {
        value: value
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "closeOnChange", function (e) {
      var _this$props = _this.props,
          closeOnChange = _this$props.closeOnChange,
          multiple = _this$props.multiple;
      var shouldClose = (0, _isUndefined2.default)(closeOnChange) ? !multiple : closeOnChange;
      if (shouldClose) _this.close(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "closeOnEscape", function (e) {
      if (_keyboardKey.default.getCode(e) !== _keyboardKey.default.Escape) return;
      e.preventDefault();

      _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "moveSelectionOnKeyDown", function (e) {
      var _moves;

      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          selectOnNavigation = _this$props2.selectOnNavigation;
      var moves = (_moves = {}, (0, _defineProperty2.default)(_moves, _keyboardKey.default.ArrowDown, 1), (0, _defineProperty2.default)(_moves, _keyboardKey.default.ArrowUp, -1), _moves);

      var move = moves[_keyboardKey.default.getCode(e)];

      if (move === undefined) return;
      e.preventDefault();

      _this.moveSelectionBy(move);

      if (!multiple && selectOnNavigation) _this.makeSelectedItemActive(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "openOnSpace", function (e) {
      if (_keyboardKey.default.getCode(e) !== _keyboardKey.default.Spacebar) return;
      if (_this.state.open) return;
      e.preventDefault();

      _this.open(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "openOnArrow", function (e) {
      var code = _keyboardKey.default.getCode(e);

      if (!(0, _includes2.default)([_keyboardKey.default.ArrowDown, _keyboardKey.default.ArrowUp], code)) return;
      if (_this.state.open) return;
      e.preventDefault();

      _this.open(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "makeSelectedItemActive", function (e) {
      var open = _this.state.open;
      var multiple = _this.props.multiple;

      var item = _this.getSelectedItem();

      var value = (0, _get4.default)(item, 'value'); // prevent selecting null if there was no selected item value
      // prevent selecting duplicate items when the dropdown is closed

      if ((0, _isNil2.default)(value) || !open) return; // state value may be undefined

      var newValue = multiple ? (0, _union2.default)(_this.state.value, [value]) : value; // notify the onChange prop that the user is trying to change value

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue); // Heads up! This event handler should be called after `onChange`
      // Notify the onAddItem prop if this is a new value


      if (item['data-additional']) (0, _invoke2.default)(_this.props, 'onAddItem', e, (0, _objectSpread2.default)({}, _this.props, {
        value: value
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "selectItemOnEnter", function (e) {
      var search = _this.props.search;
      if (_keyboardKey.default.getCode(e) !== _keyboardKey.default.Enter) return;
      e.preventDefault();
      var optionSize = (0, _size2.default)(_this.getMenuOptions());
      if (search && optionSize === 0) return;

      _this.makeSelectedItemActive(e);

      _this.closeOnChange(e);

      _this.clearSearchQuery();

      if (search && _this.searchRef) _this.searchRef.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "removeItemOnBackspace", function (e) {
      var _this$props3 = _this.props,
          multiple = _this$props3.multiple,
          search = _this$props3.search;
      var _this$state = _this.state,
          searchQuery = _this$state.searchQuery,
          value = _this$state.value;
      if (_keyboardKey.default.getCode(e) !== _keyboardKey.default.Backspace) return;
      if (searchQuery || !search || !multiple || (0, _isEmpty2.default)(value)) return;
      e.preventDefault(); // remove most recent value

      var newValue = (0, _dropRight2.default)(value);

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "closeOnDocumentClick", function (e) {
      if (!_this.props.closeOnBlur) return; // If event happened in the dropdown, ignore it

      if (_this.ref && (0, _lib.doesNodeContainClick)(_this.ref, e)) return;

      _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "attachHandlersOnOpen", function () {
      _lib.eventStack.sub('keydown', [_this.closeOnEscape, _this.moveSelectionOnKeyDown, _this.selectItemOnEnter, _this.removeItemOnBackspace]);

      _lib.eventStack.sub('click', _this.closeOnDocumentClick);

      _lib.eventStack.unsub('keydown', [_this.openOnArrow, _this.openOnSpace]);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDown", function (e) {
      _this.isMouseDown = true;

      _lib.eventStack.sub('mouseup', _this.handleDocumentMouseUp);

      (0, _invoke2.default)(_this.props, 'onMouseDown', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDocumentMouseUp", function () {
      _this.isMouseDown = false;

      _lib.eventStack.unsub('mouseup', _this.handleDocumentMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var _this$props4 = _this.props,
          minCharacters = _this$props4.minCharacters,
          search = _this$props4.search;
      var _this$state2 = _this.state,
          open = _this$state2.open,
          searchQuery = _this$state2.searchQuery;
      (0, _invoke2.default)(_this.props, 'onClick', e, _this.props); // prevent closeOnDocumentClick()

      e.stopPropagation();
      if (!search) return _this.toggle(e);
      if (open) return;

      if (searchQuery.length >= minCharacters || minCharacters === 1) {
        _this.open(e);

        return;
      }

      if (_this.searchRef) _this.searchRef.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleIconClick", function (e) {
      var clearable = _this.props.clearable;

      var hasValue = _this.hasValue();

      (0, _invoke2.default)(_this.props, 'onClick', e, _this.props); // prevent handleClick()

      e.stopPropagation();

      if (clearable && hasValue) {
        _this.clearValue(e);
      } else {
        _this.toggle(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemClick", function (e, item) {
      var _this$props5 = _this.props,
          multiple = _this$props5.multiple,
          search = _this$props5.search;
      var value = item.value; // prevent toggle() in handleClick()

      e.stopPropagation(); // prevent closeOnDocumentClick() if multiple or item is disabled

      if (multiple || item.disabled) e.nativeEvent.stopImmediatePropagation();
      if (item.disabled) return;
      var isAdditionItem = item['data-additional'];
      var newValue = multiple ? (0, _union2.default)(_this.state.value, [value]) : value; // notify the onChange prop that the user is trying to change value

      _this.setValue(newValue);

      _this.setSelectedIndex(value);

      var optionSize = (0, _size2.default)(_this.getMenuOptions());
      if (!multiple || isAdditionItem || optionSize === 1) _this.clearSearchQuery();

      _this.handleChange(e, newValue);

      _this.closeOnChange(e); // Heads up! This event handler should be called after `onChange`
      // Notify the onAddItem prop if this is a new value


      if (isAdditionItem) (0, _invoke2.default)(_this.props, 'onAddItem', e, (0, _objectSpread2.default)({}, _this.props, {
        value: value
      }));
      if (multiple && search && _this.searchRef) _this.searchRef.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleFocus", function (e) {
      var focus = _this.state.focus;
      if (focus) return;
      (0, _invoke2.default)(_this.props, 'onFocus', e, _this.props);

      _this.setState({
        focus: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleBlur", function (e) {
      // Heads up! Don't remove this.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
      var currentTarget = (0, _get4.default)(e, 'currentTarget');
      if (currentTarget && currentTarget.contains(document.activeElement)) return;
      var _this$props6 = _this.props,
          closeOnBlur = _this$props6.closeOnBlur,
          multiple = _this$props6.multiple,
          selectOnBlur = _this$props6.selectOnBlur; // do not "blur" when the mouse is down inside of the Dropdown

      if (_this.isMouseDown) return;
      (0, _invoke2.default)(_this.props, 'onBlur', e, _this.props);

      if (selectOnBlur && !multiple) {
        _this.makeSelectedItemActive(e);

        if (closeOnBlur) _this.close();
      }

      _this.setState({
        focus: false
      });

      _this.clearSearchQuery();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSearchChange", function (e, _ref) {
      var value = _ref.value;
      // prevent propagating to this.props.onChange()
      e.stopPropagation();
      var minCharacters = _this.props.minCharacters;
      var open = _this.state.open;
      var newQuery = value;
      (0, _invoke2.default)(_this.props, 'onSearchChange', e, (0, _objectSpread2.default)({}, _this.props, {
        searchQuery: newQuery
      }));

      _this.trySetState({
        searchQuery: newQuery
      }, {
        selectedIndex: 0
      }); // open search dropdown on search query


      if (!open && newQuery.length >= minCharacters) {
        _this.open();

        return;
      } // close search dropdown if search query is too small


      if (open && minCharacters !== 1 && newQuery.length < minCharacters) _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getKeyAndValues", function (options) {
      return options ? options.map(function (option) {
        return (0, _pick2.default)(option, ['key', 'value']);
      }) : options;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getMenuOptions", function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.options;
      var _this$props7 = _this.props,
          additionLabel = _this$props7.additionLabel,
          additionPosition = _this$props7.additionPosition,
          allowAdditions = _this$props7.allowAdditions,
          deburr = _this$props7.deburr,
          multiple = _this$props7.multiple,
          search = _this$props7.search;
      var searchQuery = _this.state.searchQuery;
      var filteredOptions = options; // filter out active options

      if (multiple) {
        filteredOptions = (0, _filter2.default)(filteredOptions, function (opt) {
          return !(0, _includes2.default)(value, opt.value);
        });
      } // filter by search query


      if (search && searchQuery) {
        if ((0, _isFunction2.default)(search)) {
          filteredOptions = search(filteredOptions, searchQuery);
        } else {
          // remove diacritics on search input and options, if deburr prop is set
          var strippedQuery = deburr ? (0, _deburr2.default)(searchQuery) : searchQuery;
          var re = new RegExp((0, _escapeRegExp2.default)(strippedQuery), 'i');
          filteredOptions = (0, _filter2.default)(filteredOptions, function (opt) {
            return re.test(deburr ? (0, _deburr2.default)(opt.text) : opt.text);
          });
        }
      } // insert the "add" item


      if (allowAdditions && search && searchQuery && !(0, _some2.default)(filteredOptions, {
        text: searchQuery
      })) {
        var additionLabelElement = _react.default.isValidElement(additionLabel) ? _react.default.cloneElement(additionLabel, {
          key: 'addition-label'
        }) : additionLabel || '';
        var addItem = {
          key: 'addition',
          // by using an array, we can pass multiple elements, but when doing so
          // we must specify a `key` for React to know which one is which
          text: [additionLabelElement, _react.default.createElement("b", {
            key: "addition-query"
          }, searchQuery)],
          value: searchQuery,
          className: 'addition',
          'data-additional': true
        };
        if (additionPosition === 'top') filteredOptions.unshift(addItem);else filteredOptions.push(addItem);
      }

      return filteredOptions;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getSelectedItem", function () {
      var selectedIndex = _this.state.selectedIndex;

      var options = _this.getMenuOptions();

      return (0, _get4.default)(options, "[".concat(selectedIndex, "]"));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getEnabledIndices", function (givenOptions) {
      var options = givenOptions || _this.getMenuOptions();

      return (0, _reduce2.default)(options, function (memo, item, index) {
        if (!item.disabled) memo.push(index);
        return memo;
      }, []);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getItemByValue", function (value) {
      var options = _this.props.options;
      return (0, _find2.default)(options, {
        value: value
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getMenuItemIndexByValue", function (value, givenOptions) {
      var options = givenOptions || _this.getMenuOptions();

      return (0, _findIndex2.default)(options, ['value', value]);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getDropdownAriaOptions", function () {
      var _this$props8 = _this.props,
          loading = _this$props8.loading,
          disabled = _this$props8.disabled,
          search = _this$props8.search,
          multiple = _this$props8.multiple;
      var open = _this.state.open;
      var ariaOptions = {
        role: search ? 'combobox' : 'listbox',
        'aria-busy': loading,
        'aria-disabled': disabled,
        'aria-expanded': !!open
      };

      if (ariaOptions.role === 'listbox') {
        ariaOptions['aria-multiselectable'] = multiple;
      }

      return ariaOptions;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "clearSearchQuery", function () {
      _this.trySetState({
        searchQuery: ''
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setValue", function (value) {
      _this.trySetState({
        value: value
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setSelectedIndex", function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
      var optionsProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.options;
      var multiple = _this.props.multiple;
      var selectedIndex = _this.state.selectedIndex;

      var options = _this.getMenuOptions(value, optionsProps);

      var enabledIndicies = _this.getEnabledIndices(options);

      var newSelectedIndex; // update the selected index

      if (!selectedIndex || selectedIndex < 0) {
        var firstIndex = enabledIndicies[0]; // Select the currently active item, if none, use the first item.
        // Multiple selects remove active items from the list,
        // their initial selected index should be 0.

        newSelectedIndex = multiple ? firstIndex : _this.getMenuItemIndexByValue(value, options) || enabledIndicies[0];
      } else if (multiple) {
        // multiple selects remove options from the menu as they are made active
        // keep the selected index within range of the remaining items
        if (selectedIndex >= options.length - 1) {
          newSelectedIndex = enabledIndicies[enabledIndicies.length - 1];
        }
      } else {
        var activeIndex = _this.getMenuItemIndexByValue(value, options); // regular selects can only have one active item
        // set the selected index to the currently active item


        newSelectedIndex = (0, _includes2.default)(enabledIndicies, activeIndex) ? activeIndex : undefined;
      }

      if (!newSelectedIndex || newSelectedIndex < 0) {
        newSelectedIndex = enabledIndicies[0];
      }

      _this.setState({
        selectedIndex: newSelectedIndex
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleLabelClick", function (e, labelProps) {
      // prevent focusing search input on click
      e.stopPropagation();

      _this.setState({
        selectedLabel: labelProps.value
      });

      (0, _invoke2.default)(_this.props, 'onLabelClick', e, labelProps);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleLabelRemove", function (e, labelProps) {
      // prevent focusing search input on click
      e.stopPropagation();
      var value = _this.state.value;
      var newValue = (0, _without2.default)(value, labelProps.value);

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "moveSelectionBy", function (offset) {
      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.selectedIndex;

      var options = _this.getMenuOptions(); // Prevent infinite loop
      // TODO: remove left part of condition after children API will be removed


      if (options === undefined || (0, _every2.default)(options, 'disabled')) return;
      var lastIndex = options.length - 1;
      var wrapSelection = _this.props.wrapSelection; // next is after last, wrap to beginning
      // next is before first, wrap to end

      var nextIndex = startIndex + offset; // if 'wrapSelection' is set to false and selection is after last or before first, it just does not change

      if (!wrapSelection && (nextIndex > lastIndex || nextIndex < 0)) {
        nextIndex = startIndex;
      } else if (nextIndex > lastIndex) nextIndex = 0;else if (nextIndex < 0) nextIndex = lastIndex;

      if (options[nextIndex].disabled) {
        _this.moveSelectionBy(offset, nextIndex);

        return;
      }

      _this.setState({
        selectedIndex: nextIndex
      });

      _this.scrollSelectedItemIntoView();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleIconOverrides", function (predefinedProps) {
      var clearable = _this.props.clearable;
      var classes = (0, _classnames.default)(clearable && _this.hasValue() && 'clear', predefinedProps.className);
      return {
        className: classes,
        onClick: function onClick(e) {
          (0, _invoke2.default)(predefinedProps, 'onClick', e, predefinedProps);

          _this.handleIconClick(e);
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSearchRef", function (c) {
      return _this.searchRef = c;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSizerRef", function (c) {
      return _this.sizerRef = c;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "clearValue", function (e) {
      var multiple = _this.props.multiple;
      var newValue = multiple ? [] : '';

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeSearchInputTabIndex", function () {
      var _this$props9 = _this.props,
          disabled = _this$props9.disabled,
          tabIndex = _this$props9.tabIndex;
      if (!(0, _isNil2.default)(tabIndex)) return tabIndex;
      return disabled ? -1 : 0;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeSearchInputWidth", function () {
      var searchQuery = _this.state.searchQuery;

      if (_this.sizerRef && searchQuery) {
        // resize the search input, temporarily show the sizer so we can measure it
        _this.sizerRef.style.display = 'inline';
        _this.sizerRef.textContent = searchQuery;
        var searchWidth = Math.ceil(_this.sizerRef.getBoundingClientRect().width);

        _this.sizerRef.style.removeProperty('display');

        return searchWidth;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeTabIndex", function () {
      var _this$props10 = _this.props,
          disabled = _this$props10.disabled,
          search = _this$props10.search,
          tabIndex = _this$props10.tabIndex; // don't set a root node tabIndex as the search input has its own tabIndex

      if (search) return undefined;
      if (disabled) return -1;
      return (0, _isNil2.default)(tabIndex) ? 0 : tabIndex;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSearchInputOverrides", function (predefinedProps) {
      return {
        onChange: function onChange(e, inputProps) {
          (0, _invoke2.default)(predefinedProps, 'onChange', e, inputProps);

          _this.handleSearchChange(e, inputProps);
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hasValue", function () {
      var multiple = _this.props.multiple;
      var value = _this.state.value;
      return multiple ? !(0, _isEmpty2.default)(value) : !(0, _isNil2.default)(value) && value !== '';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scrollSelectedItemIntoView", function () {
      if (!_this.ref) return;

      var menu = _this.ref.querySelector('.menu.visible');

      if (!menu) return;
      var item = menu.querySelector('.item.selected');
      if (!item) return;
      var isOutOfUpperView = item.offsetTop < menu.scrollTop;
      var isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

      if (isOutOfUpperView) {
        menu.scrollTop = item.offsetTop;
      } else if (isOutOfLowerView) {
        // eslint-disable-next-line no-mixed-operators
        menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setOpenDirection", function () {
      if (!_this.ref) return;

      var menu = _this.ref.querySelector('.menu.visible');

      if (!menu) return;

      var dropdownRect = _this.ref.getBoundingClientRect();

      var menuHeight = menu.clientHeight;
      var spaceAtTheBottom = document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight;
      var spaceAtTheTop = dropdownRect.top - menuHeight;
      var upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom; // set state only if there's a relevant difference

      if (!upward !== !_this.state.upward) {
        _this.trySetState({
          upward: upward
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "open", function (e) {
      var _this$props11 = _this.props,
          disabled = _this$props11.disabled,
          open = _this$props11.open,
          search = _this$props11.search;
      if (disabled) return;
      if (search && _this.searchRef) _this.searchRef.focus();
      (0, _invoke2.default)(_this.props, 'onOpen', e, _this.props);

      _this.trySetState({
        open: true
      });

      _this.scrollSelectedItemIntoView();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "close", function (e) {
      var open = _this.state.open;

      if (open) {
        (0, _invoke2.default)(_this.props, 'onClose', e, _this.props);

        _this.trySetState({
          open: false
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClose", function () {
      var hasSearchFocus = document.activeElement === _this.searchRef;
      var hasDropdownFocus = document.activeElement === _this.ref;
      var hasFocus = hasSearchFocus || hasDropdownFocus; // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
      // Blur the Dropdown on close so it is blurred after selecting an item.
      // This is to prevent it from re-opening when switching tabs after selecting an item.

      if (!hasSearchFocus) {
        _this.ref.blur();
      } // We need to keep the virtual model in sync with the browser focus change
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/692


      _this.setState({
        focus: hasFocus
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggle", function (e) {
      return _this.state.open ? _this.close(e) : _this.open(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderText", function () {
      var _this$props12 = _this.props,
          multiple = _this$props12.multiple,
          placeholder = _this$props12.placeholder,
          search = _this$props12.search,
          text = _this$props12.text;
      var _this$state3 = _this.state,
          searchQuery = _this$state3.searchQuery,
          value = _this$state3.value,
          open = _this$state3.open;

      var hasValue = _this.hasValue();

      var classes = (0, _classnames.default)(placeholder && !hasValue && 'default', 'text', search && searchQuery && 'filtered');
      var _text = placeholder;

      if (searchQuery) {
        _text = null;
      } else if (text) {
        _text = text;
      } else if (open && !multiple) {
        _text = (0, _get4.default)(_this.getSelectedItem(), 'text');
      } else if (hasValue) {
        _text = (0, _get4.default)(_this.getItemByValue(value), 'text');
      }

      return _react.default.createElement("div", {
        className: classes,
        role: "alert",
        "aria-live": "polite"
      }, _text);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderSearchInput", function () {
      var _this$props13 = _this.props,
          search = _this$props13.search,
          searchInput = _this$props13.searchInput;
      var searchQuery = _this.state.searchQuery;
      if (!search) return null;
      return _DropdownSearchInput.default.create(searchInput, {
        defaultProps: {
          inputRef: _this.handleSearchRef,
          style: {
            width: _this.computeSearchInputWidth()
          },
          tabIndex: _this.computeSearchInputTabIndex(),
          value: searchQuery
        },
        overrideProps: _this.handleSearchInputOverrides
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderSearchSizer", function () {
      var _this$props14 = _this.props,
          search = _this$props14.search,
          multiple = _this$props14.multiple;
      if (!(search && multiple)) return null;
      return _react.default.createElement("span", {
        className: "sizer",
        ref: _this.handleSizerRef
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderLabels", function () {
      var _this$props15 = _this.props,
          multiple = _this$props15.multiple,
          renderLabel = _this$props15.renderLabel;
      var _this$state4 = _this.state,
          selectedLabel = _this$state4.selectedLabel,
          value = _this$state4.value;

      if (!multiple || (0, _isEmpty2.default)(value)) {
        return;
      }

      var selectedItems = (0, _map2.default)(value, _this.getItemByValue);
      // if no item could be found for a given state value the selected item will be undefined
      // compact the selectedItems so we only have actual objects left
      return (0, _map2.default)((0, _compact2.default)(selectedItems), function (item, index) {
        var defaultProps = {
          active: item.value === selectedLabel,
          as: 'a',
          key: getKeyOrValue(item.key, item.value),
          onClick: _this.handleLabelClick,
          onRemove: _this.handleLabelRemove,
          value: item.value
        };
        return _Label.default.create(renderLabel(item, index, defaultProps), {
          defaultProps: defaultProps
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderOptions", function () {
      var _this$props16 = _this.props,
          lazyLoad = _this$props16.lazyLoad,
          multiple = _this$props16.multiple,
          search = _this$props16.search,
          noResultsMessage = _this$props16.noResultsMessage;
      var _this$state5 = _this.state,
          open = _this$state5.open,
          selectedIndex = _this$state5.selectedIndex,
          value = _this$state5.value; // lazy load, only render options when open

      if (lazyLoad && !open) return null;

      var options = _this.getMenuOptions();

      if (noResultsMessage !== null && search && (0, _isEmpty2.default)(options)) {
        return _react.default.createElement("div", {
          className: "message"
        }, noResultsMessage);
      }

      var isActive = multiple ? function (optValue) {
        return (0, _includes2.default)(value, optValue);
      } : function (optValue) {
        return optValue === value;
      };
      return (0, _map2.default)(options, function (opt, i) {
        return _DropdownItem.default.create((0, _objectSpread2.default)({
          active: isActive(opt.value),
          onClick: _this.handleItemClick,
          selected: selectedIndex === i
        }, opt, {
          key: getKeyOrValue(opt.key, opt.value),
          // Needed for handling click events on disabled items
          style: (0, _objectSpread2.default)({}, opt.style, {
            pointerEvents: 'all'
          })
        }));
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderMenu", function () {
      var _this$props17 = _this.props,
          children = _this$props17.children,
          direction = _this$props17.direction,
          header = _this$props17.header;
      var open = _this.state.open;

      var ariaOptions = _this.getDropdownMenuAriaOptions(); // single menu child


      if (!_lib.childrenUtils.isNil(children)) {
        var menuChild = _react.Children.only(children);

        var className = (0, _classnames.default)(direction, (0, _lib.useKeyOnly)(open, 'visible'), menuChild.props.className);
        return (0, _react.cloneElement)(menuChild, (0, _objectSpread2.default)({
          className: className
        }, ariaOptions));
      }

      return _react.default.createElement(_DropdownMenu.default, (0, _extends2.default)({}, ariaOptions, {
        direction: direction,
        open: open
      }), _DropdownHeader.default.create(header, {
        autoGenerateKey: false
      }), _this.renderOptions());
    });
    return _this;
  }

  (0, _createClass2.default)(Dropdown, [{
    key: "getInitialAutoControlledState",
    value: function getInitialAutoControlledState() {
      return {
        searchQuery: ''
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$state6 = this.state,
          open = _this$state6.open,
          value = _this$state6.value;
      this.setValue(value);
      this.setSelectedIndex(value);

      if (open) {
        this.open();
        this.attachHandlersOnOpen();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      (0, _get3.default)((0, _getPrototypeOf3.default)(Dropdown.prototype), "componentWillReceiveProps", this).call(this, nextProps);

      /* eslint-disable no-console */
      if (process.env.NODE_ENV !== 'production') {
        // in development, validate value type matches dropdown type
        var isNextValueArray = Array.isArray(nextProps.value);
        var hasValue = (0, _has2.default)(nextProps, 'value');

        if (hasValue && nextProps.multiple && !isNextValueArray) {
          console.error('Dropdown `value` must be an array when `multiple` is set.' + " Received type: `".concat(Object.prototype.toString.call(nextProps.value), "`."));
        } else if (hasValue && !nextProps.multiple && isNextValueArray) {
          console.error('Dropdown `value` must not be an array when `multiple` is not set.' + ' Either set `multiple={true}` or use a string or number value.');
        }
      }
      /* eslint-enable no-console */


      if (!(0, _lib.shallowEqual)(nextProps.value, this.props.value)) {
        this.setValue(nextProps.value);
        this.setSelectedIndex(nextProps.value);
      } // The selected index is only dependent on option keys/values.
      // We only check those properties to avoid recursive performance impacts.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000


      if (!(0, _isEqual2.default)(this.getKeyAndValues(nextProps.options), this.getKeyAndValues(this.props.options))) {
        this.setSelectedIndex(undefined, nextProps.options);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _lib.shallowEqual)(nextProps, this.props) || !(0, _lib.shallowEqual)(nextState, this.state);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // eslint-disable-line complexity
      // focused / blurred
      if (!prevState.focus && this.state.focus) {
        if (!this.isMouseDown) {
          var _this$props18 = this.props,
              minCharacters = _this$props18.minCharacters,
              openOnFocus = _this$props18.openOnFocus,
              search = _this$props18.search;
          var openable = !search || search && minCharacters === 1 && !this.state.open;
          if (openOnFocus && openable) this.open();
        }

        if (!this.state.open) {
          _lib.eventStack.sub('keydown', [this.openOnArrow, this.openOnSpace]);
        } else {
          _lib.eventStack.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        }

        _lib.eventStack.sub('keydown', this.removeItemOnBackspace);
      } else if (prevState.focus && !this.state.focus) {
        var closeOnBlur = this.props.closeOnBlur;

        if (!this.isMouseDown && closeOnBlur) {
          this.close();
        }

        _lib.eventStack.unsub('keydown', [this.openOnArrow, this.openOnSpace, this.moveSelectionOnKeyDown, this.selectItemOnEnter, this.removeItemOnBackspace]);
      } // opened / closed


      if (!prevState.open && this.state.open) {
        this.attachHandlersOnOpen();
        this.setOpenDirection();
        this.scrollSelectedItemIntoView();
      } else if (prevState.open && !this.state.open) {
        this.handleClose();

        _lib.eventStack.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);

        _lib.eventStack.unsub('click', this.closeOnDocumentClick);

        if (!this.state.focus) {
          _lib.eventStack.unsub('keydown', this.removeItemOnBackspace);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _lib.eventStack.unsub('keydown', [this.openOnArrow, this.openOnSpace, this.moveSelectionOnKeyDown, this.selectItemOnEnter, this.removeItemOnBackspace, this.closeOnEscape]);

      _lib.eventStack.unsub('click', this.closeOnDocumentClick);
    } // ----------------------------------------
    // Document Event Handlers
    // ----------------------------------------
    // onChange needs to receive a value
    // can't rely on props.value if we are controlled

  }, {
    key: "getDropdownMenuAriaOptions",
    value: function getDropdownMenuAriaOptions() {
      var _this$props19 = this.props,
          search = _this$props19.search,
          multiple = _this$props19.multiple;
      var ariaOptions = {};

      if (search) {
        ariaOptions['aria-multiselectable'] = multiple;
        ariaOptions.role = 'listbox';
      }

      return ariaOptions;
    } // ----------------------------------------
    // Setters
    // ----------------------------------------

  }, {
    key: "render",
    value: function render() {
      var _this$props20 = this.props,
          basic = _this$props20.basic,
          button = _this$props20.button,
          className = _this$props20.className,
          compact = _this$props20.compact,
          disabled = _this$props20.disabled,
          error = _this$props20.error,
          fluid = _this$props20.fluid,
          floating = _this$props20.floating,
          icon = _this$props20.icon,
          inline = _this$props20.inline,
          item = _this$props20.item,
          labeled = _this$props20.labeled,
          loading = _this$props20.loading,
          multiple = _this$props20.multiple,
          pointing = _this$props20.pointing,
          search = _this$props20.search,
          selection = _this$props20.selection,
          scrolling = _this$props20.scrolling,
          simple = _this$props20.simple,
          trigger = _this$props20.trigger;
      var _this$state7 = this.state,
          open = _this$state7.open,
          upward = _this$state7.upward; // Classes

      var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(open, 'active visible'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOnly)(basic, 'basic'), (0, _lib.useKeyOnly)(button, 'button'), (0, _lib.useKeyOnly)(compact, 'compact'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(floating, 'floating'), (0, _lib.useKeyOnly)(inline, 'inline'), // TODO: consider augmentation to render Dropdowns as Button/Menu, solves icon/link item issues
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/401#issuecomment-240487229
      // TODO: the icon class is only required when a dropdown is a button
      // useKeyOnly(icon, 'icon'),
      (0, _lib.useKeyOnly)(labeled, 'labeled'), (0, _lib.useKeyOnly)(item, 'item'), (0, _lib.useKeyOnly)(multiple, 'multiple'), (0, _lib.useKeyOnly)(search, 'search'), (0, _lib.useKeyOnly)(selection, 'selection'), (0, _lib.useKeyOnly)(simple, 'simple'), (0, _lib.useKeyOnly)(scrolling, 'scrolling'), (0, _lib.useKeyOnly)(upward, 'upward'), (0, _lib.useKeyOrValueAndKey)(pointing, 'pointing'), 'dropdown', className);
      var rest = (0, _lib.getUnhandledProps)(Dropdown, this.props);
      var ElementType = (0, _lib.getElementType)(Dropdown, this.props);
      var ariaOptions = this.getDropdownAriaOptions(ElementType, this.props);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, ariaOptions, {
        className: classes,
        onBlur: this.handleBlur,
        onClick: this.handleClick,
        onMouseDown: this.handleMouseDown,
        onFocus: this.handleFocus,
        onChange: this.handleChange,
        tabIndex: this.computeTabIndex(),
        ref: this.handleRef
      }), this.renderLabels(), this.renderSearchInput(), this.renderSearchSizer(), trigger || this.renderText(), _Icon.default.create(icon, {
        overrideProps: this.handleIconOverrides,
        autoGenerateKey: false
      }), this.renderMenu());
    }
  }]);
  return Dropdown;
}(_lib.AutoControlledComponent);

exports.default = Dropdown;
(0, _defineProperty2.default)(Dropdown, "defaultProps", {
  additionLabel: 'Add ',
  additionPosition: 'top',
  closeOnBlur: true,
  deburr: false,
  icon: 'dropdown',
  minCharacters: 1,
  noResultsMessage: 'No results found.',
  openOnFocus: true,
  renderLabel: function renderLabel(_ref2) {
    var text = _ref2.text;
    return text;
  },
  searchInput: 'text',
  selectOnBlur: true,
  selectOnNavigation: true,
  wrapSelection: true
});
(0, _defineProperty2.default)(Dropdown, "autoControlledProps", ['open', 'searchQuery', 'selectedLabel', 'value', 'upward']);
(0, _defineProperty2.default)(Dropdown, "Divider", _DropdownDivider.default);
(0, _defineProperty2.default)(Dropdown, "Header", _DropdownHeader.default);
(0, _defineProperty2.default)(Dropdown, "Item", _DropdownItem.default);
(0, _defineProperty2.default)(Dropdown, "Menu", _DropdownMenu.default);
(0, _defineProperty2.default)(Dropdown, "SearchInput", _DropdownSearchInput.default);
(0, _defineProperty2.default)(Dropdown, "handledProps", ["additionLabel", "additionPosition", "allowAdditions", "as", "basic", "button", "children", "className", "clearable", "closeOnBlur", "closeOnChange", "compact", "deburr", "defaultOpen", "defaultSearchQuery", "defaultSelectedLabel", "defaultUpward", "defaultValue", "direction", "disabled", "error", "floating", "fluid", "header", "icon", "inline", "item", "labeled", "lazyLoad", "loading", "minCharacters", "multiple", "noResultsMessage", "onAddItem", "onBlur", "onChange", "onClick", "onClose", "onFocus", "onLabelClick", "onMouseDown", "onOpen", "onSearchChange", "open", "openOnFocus", "options", "placeholder", "pointing", "renderLabel", "scrolling", "search", "searchInput", "searchQuery", "selectOnBlur", "selectOnNavigation", "selectedLabel", "selection", "simple", "tabIndex", "text", "trigger", "upward", "value", "wrapSelection"]);
Dropdown.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Label prefixed to an option added by a user. */
  additionLabel: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),

  /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
  additionPosition: _propTypes.default.oneOf(['top', 'bottom']),

  /**
   * Allow user additions to the list of options (boolean).
   * Requires the use of `selection`, `options` and `search`.
   */
  allowAdditions: _lib.customPropTypes.every([_lib.customPropTypes.demand(['options', 'selection', 'search']), _propTypes.default.bool]),

  /** A Dropdown can reduce its complexity. */
  basic: _propTypes.default.bool,

  /** Format the Dropdown to appear as a button. */
  button: _propTypes.default.bool,

  /** Primary content. */
  children: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['options', 'selection']), _lib.customPropTypes.givenProps({
    children: _propTypes.default.any.isRequired
  }, _propTypes.default.element.isRequired)]),

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Using the clearable setting will let users remove their selection from a dropdown. */
  clearable: _propTypes.default.bool,

  /** Whether or not the menu should close when the dropdown is blurred. */
  closeOnBlur: _propTypes.default.bool,

  /**
   * Whether or not the menu should close when a value is selected from the dropdown.
   * By default, multiple selection dropdowns will remain open on change, while single
   * selection dropdowns will close on change.
   */
  closeOnChange: _propTypes.default.bool,

  /** A compact dropdown has no minimum width. */
  compact: _propTypes.default.bool,

  /** Whether or not the dropdown should strip diacritics in options and input search */
  deburr: _propTypes.default.bool,

  /** Initial value of open. */
  defaultOpen: _propTypes.default.bool,

  /** Initial value of searchQuery. */
  defaultSearchQuery: _propTypes.default.string,

  /** Currently selected label in multi-select. */
  defaultSelectedLabel: _lib.customPropTypes.every([_lib.customPropTypes.demand(['multiple']), _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])]),

  /** Initial value of upward. */
  defaultUpward: _propTypes.default.bool,

  /** Initial value or value array if multiple. */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]))]),

  /** A dropdown menu can open to the left or to the right. */
  direction: _propTypes.default.oneOf(['left', 'right']),

  /** A disabled dropdown menu or item does not allow user interaction. */
  disabled: _propTypes.default.bool,

  /** An errored dropdown can alert a user to a problem. */
  error: _propTypes.default.bool,

  /** A dropdown menu can contain floated content. */
  floating: _propTypes.default.bool,

  /** A dropdown can take the full width of its parent */
  fluid: _propTypes.default.bool,

  /** A dropdown menu can contain a header. */
  header: _propTypes.default.node,

  /** Shorthand for Icon. */
  icon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object]),

  /** A dropdown can be formatted to appear inline in other content. */
  inline: _propTypes.default.bool,

  /** A dropdown can be formatted as a Menu item. */
  item: _propTypes.default.bool,

  /** A dropdown can be labeled. */
  labeled: _propTypes.default.bool,

  /** A dropdown can defer rendering its options until it is open. */
  lazyLoad: _propTypes.default.bool,

  /** A dropdown can show that it is currently loading data. */
  loading: _propTypes.default.bool,

  /** The minimum characters for a search to begin showing results. */
  minCharacters: _propTypes.default.number,

  /** A selection dropdown can allow multiple selections. */
  multiple: _propTypes.default.bool,

  /** Message to display when there are no results. */
  noResultsMessage: _propTypes.default.string,

  /**
   * Called when a user adds a new item. Use this to update the options list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and the new item's value.
   */
  onAddItem: _propTypes.default.func,

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur: _propTypes.default.func,

  /**
   * Called when the user attempts to change the value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange: _propTypes.default.func,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: _propTypes.default.func,

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus: _propTypes.default.func,

  /**
   * Called when a multi-select label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All label props.
   */
  onLabelClick: _propTypes.default.func,

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: _propTypes.default.func,

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props, includes current value of searchQuery.
   */
  onSearchChange: _propTypes.default.func,

  /** Controls whether or not the dropdown menu is displayed. */
  open: _propTypes.default.bool,

  /** Whether or not the menu should open when the dropdown is focused. */
  openOnFocus: _propTypes.default.bool,

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.arrayOf(_propTypes.default.shape(_DropdownItem.default.propTypes))]),

  /** Placeholder text. */
  placeholder: _propTypes.default.string,

  /** A dropdown can be formatted so that its menu is pointing. */
  pointing: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['left', 'right', 'top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right'])]),

  /**
   * Mapped over the active items and returns shorthand for the active item Labels.
   * Only applies to `multiple` Dropdowns.
   *
   * @param {object} item - A currently active dropdown item.
   * @param {number} index - The current index.
   * @param {object} defaultLabelProps - The default props for an active item Label.
   * @returns {*} Shorthand for a Label.
   */
  renderLabel: _propTypes.default.func,

  /** A dropdown can have its menu scroll. */
  scrolling: _propTypes.default.bool,

  /**
   * A selection dropdown can allow a user to search through a large list of choices.
   * Pass a function here to replace the default search.
   */
  search: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),

  /** A shorthand for a search input. */
  searchInput: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.node, _propTypes.default.object]),

  /** Current value of searchQuery. Creates a controlled component. */
  searchQuery: _propTypes.default.string,
  // TODO 'searchInMenu' or 'search='in menu' or ???  How to handle this markup and functionality?

  /** Define whether the highlighted item should be selected on blur. */
  selectOnBlur: _propTypes.default.bool,

  /**
   * Whether or not to change the value when navigating the menu using arrow keys.
   * Setting to false will require enter or left click to confirm a choice.
   */
  selectOnNavigation: _propTypes.default.bool,

  /** Currently selected label in multi-select. */
  selectedLabel: _lib.customPropTypes.every([_lib.customPropTypes.demand(['multiple']), _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])]),

  /** A dropdown can be used to select between choices in a form. */
  selection: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _lib.customPropTypes.demand(['options']), _propTypes.default.bool]),

  /** A simple dropdown can open without Javascript. */
  simple: _propTypes.default.bool,

  /** A dropdown can receive focus. */
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** The text displayed in the dropdown, usually for the active item. */
  text: _propTypes.default.string,

  /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
  trigger: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['selection', 'text']), _propTypes.default.node]),

  /** Current value or value array if multiple. Creates a controlled component. */
  value: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.number]))]),

  /** Controls whether the dropdown will open upward. */
  upward: _propTypes.default.bool,

  /**
   * A dropdown will go to the last element when ArrowUp is pressed on the first,
   * or go to the first when ArrowDown is pressed on the last( aka infinite selection )
   */
  wrapSelection: _propTypes.default.bool
} : {};