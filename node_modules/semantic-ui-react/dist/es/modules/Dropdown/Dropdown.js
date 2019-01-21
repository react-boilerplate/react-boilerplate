import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _get2 from "@babel/runtime/helpers/get";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _compact from "lodash/compact";
import _map from "lodash/map";
import _every from "lodash/every";
import _without from "lodash/without";
import _findIndex from "lodash/findIndex";
import _find from "lodash/find";
import _reduce from "lodash/reduce";
import _some from "lodash/some";
import _escapeRegExp from "lodash/escapeRegExp";
import _deburr from "lodash/deburr";
import _isFunction from "lodash/isFunction";
import _filter from "lodash/filter";
import _pick from "lodash/pick";
import _dropRight from "lodash/dropRight";
import _isEmpty from "lodash/isEmpty";
import _size from "lodash/size";
import _union from "lodash/union";
import _get from "lodash/get";
import _includes from "lodash/includes";
import _isUndefined from "lodash/isUndefined";
import _invoke from "lodash/invoke";
import _isEqual from "lodash/isEqual";
import _has from "lodash/has";
import _isNil from "lodash/isNil";
import cx from 'classnames';
import keyboardKey from 'keyboard-key';
import PropTypes from 'prop-types';
import React, { Children, cloneElement } from 'react';
import shallowEqual from 'shallowequal';
import { AutoControlledComponent as Component, childrenUtils, customPropTypes, doesNodeContainClick, eventStack, getElementType, getUnhandledProps, objectDiff, useKeyOnly, useKeyOrValueAndKey } from '../../lib';
import Icon from '../../elements/Icon';
import Label from '../../elements/Label';
import DropdownDivider from './DropdownDivider';
import DropdownItem from './DropdownItem';
import DropdownHeader from './DropdownHeader';
import DropdownMenu from './DropdownMenu';
import DropdownSearchInput from './DropdownSearchInput';

var getKeyOrValue = function getKeyOrValue(key, value) {
  return _isNil(key) ? value : key;
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
  _inherits(Dropdown, _Component);

  function Dropdown() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Dropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e, value) {
      _invoke(_this.props, 'onChange', e, _objectSpread({}, _this.props, {
        value: value
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeOnChange", function (e) {
      var _this$props = _this.props,
          closeOnChange = _this$props.closeOnChange,
          multiple = _this$props.multiple;
      var shouldClose = _isUndefined(closeOnChange) ? !multiple : closeOnChange;
      if (shouldClose) _this.close(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeOnEscape", function (e) {
      if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;
      e.preventDefault();

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "moveSelectionOnKeyDown", function (e) {
      var _moves;

      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          selectOnNavigation = _this$props2.selectOnNavigation;
      var moves = (_moves = {}, _defineProperty(_moves, keyboardKey.ArrowDown, 1), _defineProperty(_moves, keyboardKey.ArrowUp, -1), _moves);
      var move = moves[keyboardKey.getCode(e)];
      if (move === undefined) return;
      e.preventDefault();

      _this.moveSelectionBy(move);

      if (!multiple && selectOnNavigation) _this.makeSelectedItemActive(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openOnSpace", function (e) {
      if (keyboardKey.getCode(e) !== keyboardKey.Spacebar) return;
      if (_this.state.open) return;
      e.preventDefault();

      _this.open(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openOnArrow", function (e) {
      var code = keyboardKey.getCode(e);
      if (!_includes([keyboardKey.ArrowDown, keyboardKey.ArrowUp], code)) return;
      if (_this.state.open) return;
      e.preventDefault();

      _this.open(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "makeSelectedItemActive", function (e) {
      var open = _this.state.open;
      var multiple = _this.props.multiple;

      var item = _this.getSelectedItem();

      var value = _get(item, 'value'); // prevent selecting null if there was no selected item value
      // prevent selecting duplicate items when the dropdown is closed


      if (_isNil(value) || !open) return; // state value may be undefined

      var newValue = multiple ? _union(_this.state.value, [value]) : value; // notify the onChange prop that the user is trying to change value

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue); // Heads up! This event handler should be called after `onChange`
      // Notify the onAddItem prop if this is a new value


      if (item['data-additional']) _invoke(_this.props, 'onAddItem', e, _objectSpread({}, _this.props, {
        value: value
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectItemOnEnter", function (e) {
      var search = _this.props.search;
      if (keyboardKey.getCode(e) !== keyboardKey.Enter) return;
      e.preventDefault();

      var optionSize = _size(_this.getMenuOptions());

      if (search && optionSize === 0) return;

      _this.makeSelectedItemActive(e);

      _this.closeOnChange(e);

      _this.clearSearchQuery();

      if (search && _this.searchRef) _this.searchRef.focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeItemOnBackspace", function (e) {
      var _this$props3 = _this.props,
          multiple = _this$props3.multiple,
          search = _this$props3.search;
      var _this$state = _this.state,
          searchQuery = _this$state.searchQuery,
          value = _this$state.value;
      if (keyboardKey.getCode(e) !== keyboardKey.Backspace) return;
      if (searchQuery || !search || !multiple || _isEmpty(value)) return;
      e.preventDefault(); // remove most recent value

      var newValue = _dropRight(value);

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeOnDocumentClick", function (e) {
      if (!_this.props.closeOnBlur) return; // If event happened in the dropdown, ignore it

      if (_this.ref && doesNodeContainClick(_this.ref, e)) return;

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "attachHandlersOnOpen", function () {
      eventStack.sub('keydown', [_this.closeOnEscape, _this.moveSelectionOnKeyDown, _this.selectItemOnEnter, _this.removeItemOnBackspace]);
      eventStack.sub('click', _this.closeOnDocumentClick);
      eventStack.unsub('keydown', [_this.openOnArrow, _this.openOnSpace]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseDown", function (e) {
      _this.isMouseDown = true;
      eventStack.sub('mouseup', _this.handleDocumentMouseUp);

      _invoke(_this.props, 'onMouseDown', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentMouseUp", function () {
      _this.isMouseDown = false;
      eventStack.unsub('mouseup', _this.handleDocumentMouseUp);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props4 = _this.props,
          minCharacters = _this$props4.minCharacters,
          search = _this$props4.search;
      var _this$state2 = _this.state,
          open = _this$state2.open,
          searchQuery = _this$state2.searchQuery;

      _invoke(_this.props, 'onClick', e, _this.props); // prevent closeOnDocumentClick()


      e.stopPropagation();
      if (!search) return _this.toggle(e);
      if (open) return;

      if (searchQuery.length >= minCharacters || minCharacters === 1) {
        _this.open(e);

        return;
      }

      if (_this.searchRef) _this.searchRef.focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleIconClick", function (e) {
      var clearable = _this.props.clearable;

      var hasValue = _this.hasValue();

      _invoke(_this.props, 'onClick', e, _this.props); // prevent handleClick()


      e.stopPropagation();

      if (clearable && hasValue) {
        _this.clearValue(e);
      } else {
        _this.toggle(e);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleItemClick", function (e, item) {
      var _this$props5 = _this.props,
          multiple = _this$props5.multiple,
          search = _this$props5.search;
      var value = item.value; // prevent toggle() in handleClick()

      e.stopPropagation(); // prevent closeOnDocumentClick() if multiple or item is disabled

      if (multiple || item.disabled) e.nativeEvent.stopImmediatePropagation();
      if (item.disabled) return;
      var isAdditionItem = item['data-additional'];
      var newValue = multiple ? _union(_this.state.value, [value]) : value; // notify the onChange prop that the user is trying to change value

      _this.setValue(newValue);

      _this.setSelectedIndex(value);

      _this.clearSearchQuery();

      _this.handleChange(e, newValue);

      _this.closeOnChange(e); // Heads up! This event handler should be called after `onChange`
      // Notify the onAddItem prop if this is a new value


      if (isAdditionItem) _invoke(_this.props, 'onAddItem', e, _objectSpread({}, _this.props, {
        value: value
      }));
      if (multiple && search && _this.searchRef) _this.searchRef.focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function (e) {
      var focus = _this.state.focus;
      if (focus) return;

      _invoke(_this.props, 'onFocus', e, _this.props);

      _this.setState({
        focus: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function (e) {
      // Heads up! Don't remove this.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
      var currentTarget = _get(e, 'currentTarget');

      if (currentTarget && currentTarget.contains(document.activeElement)) return;
      var _this$props6 = _this.props,
          closeOnBlur = _this$props6.closeOnBlur,
          multiple = _this$props6.multiple,
          selectOnBlur = _this$props6.selectOnBlur; // do not "blur" when the mouse is down inside of the Dropdown

      if (_this.isMouseDown) return;

      _invoke(_this.props, 'onBlur', e, _this.props);

      if (selectOnBlur && !multiple) {
        _this.makeSelectedItemActive(e);

        if (closeOnBlur) _this.close();
      }

      _this.setState({
        focus: false
      });

      _this.clearSearchQuery();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSearchChange", function (e, _ref) {
      var value = _ref.value;
      // prevent propagating to this.props.onChange()
      e.stopPropagation();
      var minCharacters = _this.props.minCharacters;
      var open = _this.state.open;
      var newQuery = value;

      _invoke(_this.props, 'onSearchChange', e, _objectSpread({}, _this.props, {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getKeyAndValues", function (options) {
      return options ? options.map(function (option) {
        return _pick(option, ['key', 'value']);
      }) : options;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMenuOptions", function () {
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
        filteredOptions = _filter(filteredOptions, function (opt) {
          return !_includes(value, opt.value);
        });
      } // filter by search query


      if (search && searchQuery) {
        if (_isFunction(search)) {
          filteredOptions = search(filteredOptions, searchQuery);
        } else {
          // remove diacritics on search input and options, if deburr prop is set
          var strippedQuery = deburr ? _deburr(searchQuery) : searchQuery;
          var re = new RegExp(_escapeRegExp(strippedQuery), 'i');
          filteredOptions = _filter(filteredOptions, function (opt) {
            return re.test(deburr ? _deburr(opt.text) : opt.text);
          });
        }
      } // insert the "add" item


      if (allowAdditions && search && searchQuery && !_some(filteredOptions, {
        text: searchQuery
      })) {
        var additionLabelElement = React.isValidElement(additionLabel) ? React.cloneElement(additionLabel, {
          key: 'addition-label'
        }) : additionLabel || '';
        var addItem = {
          key: 'addition',
          // by using an array, we can pass multiple elements, but when doing so
          // we must specify a `key` for React to know which one is which
          text: [additionLabelElement, React.createElement("b", {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSelectedItem", function () {
      var selectedIndex = _this.state.selectedIndex;

      var options = _this.getMenuOptions();

      return _get(options, "[".concat(selectedIndex, "]"));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEnabledIndices", function (givenOptions) {
      var options = givenOptions || _this.getMenuOptions();

      return _reduce(options, function (memo, item, index) {
        if (!item.disabled) memo.push(index);
        return memo;
      }, []);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getItemByValue", function (value) {
      var options = _this.props.options;
      return _find(options, {
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMenuItemIndexByValue", function (value, givenOptions) {
      var options = givenOptions || _this.getMenuOptions();

      return _findIndex(options, ['value', value]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDropdownAriaOptions", function () {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearSearchQuery", function () {
      _this.trySetState({
        searchQuery: ''
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setValue", function (value) {
      _this.trySetState({
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSelectedIndex", function () {
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


        newSelectedIndex = _includes(enabledIndicies, activeIndex) ? activeIndex : undefined;
      }

      if (!newSelectedIndex || newSelectedIndex < 0) {
        newSelectedIndex = enabledIndicies[0];
      }

      _this.setState({
        selectedIndex: newSelectedIndex
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleLabelClick", function (e, labelProps) {
      // prevent focusing search input on click
      e.stopPropagation();

      _this.setState({
        selectedLabel: labelProps.value
      });

      _invoke(_this.props, 'onLabelClick', e, labelProps);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleLabelRemove", function (e, labelProps) {
      // prevent focusing search input on click
      e.stopPropagation();
      var value = _this.state.value;

      var newValue = _without(value, labelProps.value);

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "moveSelectionBy", function (offset) {
      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.selectedIndex;

      var options = _this.getMenuOptions(); // Prevent infinite loop
      // TODO: remove left part of condition after children API will be removed


      if (options === undefined || _every(options, 'disabled')) return;
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleIconOverrides", function (predefinedProps) {
      var clearable = _this.props.clearable;
      var classes = cx(clearable && _this.hasValue() && 'clear', predefinedProps.className);
      return {
        className: classes,
        onClick: function onClick(e) {
          _invoke(predefinedProps, 'onClick', e, predefinedProps);

          _this.handleIconClick(e);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSearchRef", function (c) {
      return _this.searchRef = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSizerRef", function (c) {
      return _this.sizerRef = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearValue", function (e) {
      var multiple = _this.props.multiple;
      var newValue = multiple ? [] : '';

      _this.setValue(newValue);

      _this.setSelectedIndex(newValue);

      _this.handleChange(e, newValue);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeSearchInputTabIndex", function () {
      var _this$props9 = _this.props,
          disabled = _this$props9.disabled,
          tabIndex = _this$props9.tabIndex;
      if (!_isNil(tabIndex)) return tabIndex;
      return disabled ? -1 : 0;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeSearchInputWidth", function () {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeTabIndex", function () {
      var _this$props10 = _this.props,
          disabled = _this$props10.disabled,
          search = _this$props10.search,
          tabIndex = _this$props10.tabIndex; // don't set a root node tabIndex as the search input has its own tabIndex

      if (search) return undefined;
      if (disabled) return -1;
      return _isNil(tabIndex) ? 0 : tabIndex;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSearchInputOverrides", function (predefinedProps) {
      return {
        onChange: function onChange(e, inputProps) {
          _invoke(predefinedProps, 'onChange', e, inputProps);

          _this.handleSearchChange(e, inputProps);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasValue", function () {
      var multiple = _this.props.multiple;
      var value = _this.state.value;
      return multiple ? !_isEmpty(value) : !_isNil(value) && value !== '';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollSelectedItemIntoView", function () {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setOpenDirection", function () {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "open", function (e) {
      var _this$props11 = _this.props,
          disabled = _this$props11.disabled,
          open = _this$props11.open,
          search = _this$props11.search;
      if (disabled) return;
      if (search && _this.searchRef) _this.searchRef.focus();

      _invoke(_this.props, 'onOpen', e, _this.props);

      _this.trySetState({
        open: true
      });

      _this.scrollSelectedItemIntoView();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "close", function (e) {
      var open = _this.state.open;

      if (open) {
        _invoke(_this.props, 'onClose', e, _this.props);

        _this.trySetState({
          open: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function (e) {
      return _this.state.open ? _this.close(e) : _this.open(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderText", function () {
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

      var classes = cx(placeholder && !hasValue && 'default', 'text', search && searchQuery && 'filtered');
      var _text = placeholder;

      if (searchQuery) {
        _text = null;
      } else if (text) {
        _text = text;
      } else if (open && !multiple) {
        _text = _get(_this.getSelectedItem(), 'text');
      } else if (hasValue) {
        _text = _get(_this.getItemByValue(value), 'text');
      }

      return React.createElement("div", {
        className: classes,
        role: "alert",
        "aria-live": "polite"
      }, _text);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderSearchInput", function () {
      var _this$props13 = _this.props,
          search = _this$props13.search,
          searchInput = _this$props13.searchInput;
      var searchQuery = _this.state.searchQuery;
      if (!search) return null;
      return DropdownSearchInput.create(searchInput, {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderSearchSizer", function () {
      var _this$props14 = _this.props,
          search = _this$props14.search,
          multiple = _this$props14.multiple;
      if (!(search && multiple)) return null;
      return React.createElement("span", {
        className: "sizer",
        ref: _this.handleSizerRef
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderLabels", function () {
      var _this$props15 = _this.props,
          multiple = _this$props15.multiple,
          renderLabel = _this$props15.renderLabel;
      var _this$state4 = _this.state,
          selectedLabel = _this$state4.selectedLabel,
          value = _this$state4.value;

      if (!multiple || _isEmpty(value)) {
        return;
      }

      var selectedItems = _map(value, _this.getItemByValue);

      // if no item could be found for a given state value the selected item will be undefined
      // compact the selectedItems so we only have actual objects left
      return _map(_compact(selectedItems), function (item, index) {
        var defaultProps = {
          active: item.value === selectedLabel,
          as: 'a',
          key: getKeyOrValue(item.key, item.value),
          onClick: _this.handleLabelClick,
          onRemove: _this.handleLabelRemove,
          value: item.value
        };
        return Label.create(renderLabel(item, index, defaultProps), {
          defaultProps: defaultProps
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderOptions", function () {
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

      if (noResultsMessage !== null && search && _isEmpty(options)) {
        return React.createElement("div", {
          className: "message"
        }, noResultsMessage);
      }

      var isActive = multiple ? function (optValue) {
        return _includes(value, optValue);
      } : function (optValue) {
        return optValue === value;
      };
      return _map(options, function (opt, i) {
        return DropdownItem.create(_objectSpread({
          active: isActive(opt.value),
          onClick: _this.handleItemClick,
          selected: selectedIndex === i
        }, opt, {
          key: getKeyOrValue(opt.key, opt.value),
          // Needed for handling click events on disabled items
          style: _objectSpread({}, opt.style, {
            pointerEvents: 'all'
          })
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderMenu", function () {
      var _this$props17 = _this.props,
          children = _this$props17.children,
          direction = _this$props17.direction,
          header = _this$props17.header;
      var open = _this.state.open;

      var ariaOptions = _this.getDropdownMenuAriaOptions(); // single menu child


      if (!childrenUtils.isNil(children)) {
        var menuChild = Children.only(children);
        var className = cx(direction, useKeyOnly(open, 'visible'), menuChild.props.className);
        return cloneElement(menuChild, _objectSpread({
          className: className
        }, ariaOptions));
      }

      return React.createElement(DropdownMenu, _extends({}, ariaOptions, {
        direction: direction,
        open: open
      }), DropdownHeader.create(header, {
        autoGenerateKey: false
      }), _this.renderOptions());
    });

    return _this;
  }

  _createClass(Dropdown, [{
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
      _get2(_getPrototypeOf(Dropdown.prototype), "componentWillReceiveProps", this).call(this, nextProps);

      /* eslint-disable no-console */
      if (process.env.NODE_ENV !== 'production') {
        // in development, validate value type matches dropdown type
        var isNextValueArray = Array.isArray(nextProps.value);

        var hasValue = _has(nextProps, 'value');

        if (hasValue && nextProps.multiple && !isNextValueArray) {
          console.error('Dropdown `value` must be an array when `multiple` is set.' + " Received type: `".concat(Object.prototype.toString.call(nextProps.value), "`."));
        } else if (hasValue && !nextProps.multiple && isNextValueArray) {
          console.error('Dropdown `value` must not be an array when `multiple` is not set.' + ' Either set `multiple={true}` or use a string or number value.');
        }
      }
      /* eslint-enable no-console */


      if (!shallowEqual(nextProps.value, this.props.value)) {
        this.setValue(nextProps.value);
        this.setSelectedIndex(nextProps.value);
      } // The selected index is only dependent on option keys/values.
      // We only check those properties to avoid recursive performance impacts.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000


      if (!_isEqual(this.getKeyAndValues(nextProps.options), this.getKeyAndValues(this.props.options))) {
        this.setSelectedIndex(undefined, nextProps.options);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
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
          eventStack.sub('keydown', [this.openOnArrow, this.openOnSpace]);
        } else {
          eventStack.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        }

        eventStack.sub('keydown', this.removeItemOnBackspace);
      } else if (prevState.focus && !this.state.focus) {
        var closeOnBlur = this.props.closeOnBlur;

        if (!this.isMouseDown && closeOnBlur) {
          this.close();
        }

        eventStack.unsub('keydown', [this.openOnArrow, this.openOnSpace, this.moveSelectionOnKeyDown, this.selectItemOnEnter, this.removeItemOnBackspace]);
      } // opened / closed


      if (!prevState.open && this.state.open) {
        this.attachHandlersOnOpen();
        this.setOpenDirection();
        this.scrollSelectedItemIntoView();
      } else if (prevState.open && !this.state.open) {
        this.handleClose();
        eventStack.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        eventStack.unsub('click', this.closeOnDocumentClick);

        if (!this.state.focus) {
          eventStack.unsub('keydown', this.removeItemOnBackspace);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventStack.unsub('keydown', [this.openOnArrow, this.openOnSpace, this.moveSelectionOnKeyDown, this.selectItemOnEnter, this.removeItemOnBackspace, this.closeOnEscape]);
      eventStack.unsub('click', this.closeOnDocumentClick);
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

      var classes = cx('ui', useKeyOnly(open, 'active visible'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(loading, 'loading'), useKeyOnly(basic, 'basic'), useKeyOnly(button, 'button'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(floating, 'floating'), useKeyOnly(inline, 'inline'), // TODO: consider augmentation to render Dropdowns as Button/Menu, solves icon/link item issues
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/401#issuecomment-240487229
      // TODO: the icon class is only required when a dropdown is a button
      // useKeyOnly(icon, 'icon'),
      useKeyOnly(labeled, 'labeled'), useKeyOnly(item, 'item'), useKeyOnly(multiple, 'multiple'), useKeyOnly(search, 'search'), useKeyOnly(selection, 'selection'), useKeyOnly(simple, 'simple'), useKeyOnly(scrolling, 'scrolling'), useKeyOnly(upward, 'upward'), useKeyOrValueAndKey(pointing, 'pointing'), 'dropdown', className);
      var rest = getUnhandledProps(Dropdown, this.props);
      var ElementType = getElementType(Dropdown, this.props);
      var ariaOptions = this.getDropdownAriaOptions(ElementType, this.props);
      return React.createElement(ElementType, _extends({}, rest, ariaOptions, {
        className: classes,
        onBlur: this.handleBlur,
        onClick: this.handleClick,
        onMouseDown: this.handleMouseDown,
        onFocus: this.handleFocus,
        onChange: this.handleChange,
        tabIndex: this.computeTabIndex(),
        ref: this.handleRef
      }), this.renderLabels(), this.renderSearchInput(), this.renderSearchSizer(), trigger || this.renderText(), Icon.create(icon, {
        overrideProps: this.handleIconOverrides,
        autoGenerateKey: false
      }), this.renderMenu());
    }
  }]);

  return Dropdown;
}(Component);

_defineProperty(Dropdown, "defaultProps", {
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

_defineProperty(Dropdown, "autoControlledProps", ['open', 'searchQuery', 'selectedLabel', 'value', 'upward']);

_defineProperty(Dropdown, "Divider", DropdownDivider);

_defineProperty(Dropdown, "Header", DropdownHeader);

_defineProperty(Dropdown, "Item", DropdownItem);

_defineProperty(Dropdown, "Menu", DropdownMenu);

_defineProperty(Dropdown, "SearchInput", DropdownSearchInput);

_defineProperty(Dropdown, "handledProps", ["additionLabel", "additionPosition", "allowAdditions", "as", "basic", "button", "children", "className", "clearable", "closeOnBlur", "closeOnChange", "compact", "deburr", "defaultOpen", "defaultSearchQuery", "defaultSelectedLabel", "defaultUpward", "defaultValue", "direction", "disabled", "error", "floating", "fluid", "header", "icon", "inline", "item", "labeled", "lazyLoad", "loading", "minCharacters", "multiple", "noResultsMessage", "onAddItem", "onBlur", "onChange", "onClick", "onClose", "onFocus", "onLabelClick", "onMouseDown", "onOpen", "onSearchChange", "open", "openOnFocus", "options", "placeholder", "pointing", "renderLabel", "scrolling", "search", "searchInput", "searchQuery", "selectOnBlur", "selectOnNavigation", "selectedLabel", "selection", "simple", "tabIndex", "text", "trigger", "upward", "value", "wrapSelection"]);

export { Dropdown as default };
Dropdown.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Label prefixed to an option added by a user. */
  additionLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
  additionPosition: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Allow user additions to the list of options (boolean).
   * Requires the use of `selection`, `options` and `search`.
   */
  allowAdditions: customPropTypes.every([customPropTypes.demand(['options', 'selection', 'search']), PropTypes.bool]),

  /** A Dropdown can reduce its complexity. */
  basic: PropTypes.bool,

  /** Format the Dropdown to appear as a button. */
  button: PropTypes.bool,

  /** Primary content. */
  children: customPropTypes.every([customPropTypes.disallow(['options', 'selection']), customPropTypes.givenProps({
    children: PropTypes.any.isRequired
  }, PropTypes.element.isRequired)]),

  /** Additional classes. */
  className: PropTypes.string,

  /** Using the clearable setting will let users remove their selection from a dropdown. */
  clearable: PropTypes.bool,

  /** Whether or not the menu should close when the dropdown is blurred. */
  closeOnBlur: PropTypes.bool,

  /**
   * Whether or not the menu should close when a value is selected from the dropdown.
   * By default, multiple selection dropdowns will remain open on change, while single
   * selection dropdowns will close on change.
   */
  closeOnChange: PropTypes.bool,

  /** A compact dropdown has no minimum width. */
  compact: PropTypes.bool,

  /** Whether or not the dropdown should strip diacritics in options and input search */
  deburr: PropTypes.bool,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** Initial value of searchQuery. */
  defaultSearchQuery: PropTypes.string,

  /** Currently selected label in multi-select. */
  defaultSelectedLabel: customPropTypes.every([customPropTypes.demand(['multiple']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** Initial value of upward. */
  defaultUpward: PropTypes.bool,

  /** Initial value or value array if multiple. */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))]),

  /** A dropdown menu can open to the left or to the right. */
  direction: PropTypes.oneOf(['left', 'right']),

  /** A disabled dropdown menu or item does not allow user interaction. */
  disabled: PropTypes.bool,

  /** An errored dropdown can alert a user to a problem. */
  error: PropTypes.bool,

  /** A dropdown menu can contain floated content. */
  floating: PropTypes.bool,

  /** A dropdown can take the full width of its parent */
  fluid: PropTypes.bool,

  /** A dropdown menu can contain a header. */
  header: PropTypes.node,

  /** Shorthand for Icon. */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

  /** A dropdown can be formatted to appear inline in other content. */
  inline: PropTypes.bool,

  /** A dropdown can be formatted as a Menu item. */
  item: PropTypes.bool,

  /** A dropdown can be labeled. */
  labeled: PropTypes.bool,

  /** A dropdown can defer rendering its options until it is open. */
  lazyLoad: PropTypes.bool,

  /** A dropdown can show that it is currently loading data. */
  loading: PropTypes.bool,

  /** The minimum characters for a search to begin showing results. */
  minCharacters: PropTypes.number,

  /** A selection dropdown can allow multiple selections. */
  multiple: PropTypes.bool,

  /** Message to display when there are no results. */
  noResultsMessage: PropTypes.node,

  /**
   * Called when a user adds a new item. Use this to update the options list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and the new item's value.
   */
  onAddItem: PropTypes.func,

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur: PropTypes.func,

  /**
   * Called when the user attempts to change the value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange: PropTypes.func,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus: PropTypes.func,

  /**
   * Called when a multi-select label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All label props.
   */
  onLabelClick: PropTypes.func,

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props, includes current value of searchQuery.
   */
  onSearchChange: PropTypes.func,

  /** Controls whether or not the dropdown menu is displayed. */
  open: PropTypes.bool,

  /** Whether or not the menu should open when the dropdown is focused. */
  openOnFocus: PropTypes.bool,

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.arrayOf(PropTypes.shape(DropdownItem.propTypes))]),

  /** Placeholder text. */
  placeholder: PropTypes.string,

  /** A dropdown can be formatted so that its menu is pointing. */
  pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right', 'top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right'])]),

  /**
   * Mapped over the active items and returns shorthand for the active item Labels.
   * Only applies to `multiple` Dropdowns.
   *
   * @param {object} item - A currently active dropdown item.
   * @param {number} index - The current index.
   * @param {object} defaultLabelProps - The default props for an active item Label.
   * @returns {*} Shorthand for a Label.
   */
  renderLabel: PropTypes.func,

  /** A dropdown can have its menu scroll. */
  scrolling: PropTypes.bool,

  /**
   * A selection dropdown can allow a user to search through a large list of choices.
   * Pass a function here to replace the default search.
   */
  search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /** A shorthand for a search input. */
  searchInput: PropTypes.oneOfType([PropTypes.array, PropTypes.node, PropTypes.object]),

  /** Current value of searchQuery. Creates a controlled component. */
  searchQuery: PropTypes.string,
  // TODO 'searchInMenu' or 'search='in menu' or ???  How to handle this markup and functionality?

  /** Define whether the highlighted item should be selected on blur. */
  selectOnBlur: PropTypes.bool,

  /**
   * Whether or not to change the value when navigating the menu using arrow keys.
   * Setting to false will require enter or left click to confirm a choice.
   */
  selectOnNavigation: PropTypes.bool,

  /** Currently selected label in multi-select. */
  selectedLabel: customPropTypes.every([customPropTypes.demand(['multiple']), PropTypes.oneOfType([PropTypes.string, PropTypes.number])]),

  /** A dropdown can be used to select between choices in a form. */
  selection: customPropTypes.every([customPropTypes.disallow(['children']), customPropTypes.demand(['options']), PropTypes.bool]),

  /** A simple dropdown can open without Javascript. */
  simple: PropTypes.bool,

  /** A dropdown can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The text displayed in the dropdown, usually for the active item. */
  text: PropTypes.string,

  /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
  trigger: customPropTypes.every([customPropTypes.disallow(['selection', 'text']), PropTypes.node]),

  /** Current value or value array if multiple. Creates a controlled component. */
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]))]),

  /** Controls whether the dropdown will open upward. */
  upward: PropTypes.bool,

  /**
   * A dropdown will go to the last element when ArrowUp is pressed on the first,
   * or go to the first when ArrowDown is pressed on the last( aka infinite selection )
   */
  wrapSelection: PropTypes.bool
} : {};