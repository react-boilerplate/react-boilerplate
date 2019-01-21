import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _get2 from "@babel/runtime/helpers/get";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _isEmpty from "lodash/isEmpty";
import _partialRight from "lodash/partialRight";
import _inRange from "lodash/inRange";
import _map from "lodash/map";
import _get from "lodash/get";
import _reduce from "lodash/reduce";
import _invoke from "lodash/invoke";
import _without from "lodash/without";
import cx from 'classnames';
import keyboardKey from 'keyboard-key';
import PropTypes from 'prop-types';
import React from 'react';
import shallowEqual from 'shallowequal';
import { AutoControlledComponent as Component, customPropTypes, eventStack, getElementType, getUnhandledProps, htmlInputAttrs, isBrowser, objectDiff, partitionHTMLProps, SUI, useKeyOnly, useValueAndKey } from '../../lib';
import Input from '../../elements/Input';
import SearchCategory from './SearchCategory';
import SearchResult from './SearchResult';
import SearchResults from './SearchResults';

/**
 * A search module allows a user to query for results from a selection of data
 */
var Search =
/*#__PURE__*/
function (_Component) {
  _inherits(Search, _Component);

  function Search() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Search)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResultSelect", function (e, result) {
      _invoke(_this.props, 'onResultSelect', e, _objectSpread({}, _this.props, {
        result: result
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelectionChange", function (e) {
      var result = _this.getSelectedResult();

      _invoke(_this.props, 'onSelectionChange', e, _objectSpread({}, _this.props, {
        result: result
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeOnEscape", function (e) {
      if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;
      e.preventDefault();

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "moveSelectionOnKeyDown", function (e) {
      switch (keyboardKey.getCode(e)) {
        case keyboardKey.ArrowDown:
          e.preventDefault();

          _this.moveSelectionBy(e, 1);

          break;

        case keyboardKey.ArrowUp:
          e.preventDefault();

          _this.moveSelectionBy(e, -1);

          break;

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectItemOnEnter", function (e) {
      if (keyboardKey.getCode(e) !== keyboardKey.Enter) return;

      var result = _this.getSelectedResult(); // prevent selecting null if there was no selected item value


      if (!result) return;
      e.preventDefault(); // notify the onResultSelect prop that the user is trying to change value

      _this.setValue(result.title);

      _this.handleResultSelect(e, result);

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeOnDocumentClick", function (e) {
      _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseDown", function (e) {
      _this.isMouseDown = true;

      _invoke(_this.props, 'onMouseDown', e, _this.props);

      eventStack.sub('mouseup', _this.handleDocumentMouseUp);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentMouseUp", function () {
      _this.isMouseDown = false;
      eventStack.unsub('mouseup', _this.handleDocumentMouseUp);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputClick", function (e) {
      // prevent closeOnDocumentClick()
      e.nativeEvent.stopImmediatePropagation();

      _this.tryOpen();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleItemClick", function (e, _ref) {
      var id = _ref.id;

      var result = _this.getSelectedResult(id); // prevent closeOnDocumentClick()


      e.nativeEvent.stopImmediatePropagation(); // notify the onResultSelect prop that the user is trying to change value

      _this.setValue(result.title);

      _this.handleResultSelect(e, result);

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function (e) {
      var onFocus = _this.props.onFocus;
      if (onFocus) onFocus(e, _this.props);

      _this.setState({
        focus: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function (e) {
      var onBlur = _this.props.onBlur;
      if (onBlur) onBlur(e, _this.props);

      _this.setState({
        focus: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSearchChange", function (e) {
      // prevent propagating to this.props.onChange()
      e.stopPropagation();
      var minCharacters = _this.props.minCharacters;
      var open = _this.state.open;
      var newQuery = e.target.value;

      _invoke(_this.props, 'onSearchChange', e, _objectSpread({}, _this.props, {
        value: newQuery
      })); // open search dropdown on search query


      if (newQuery.length < minCharacters) {
        _this.close();
      } else if (!open) {
        _this.tryOpen(newQuery);
      }

      _this.setValue(newQuery);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFlattenedResults", function () {
      var _this$props = _this.props,
          category = _this$props.category,
          results = _this$props.results;
      return !category ? results : _reduce(results, function (memo, categoryData) {
        return memo.concat(categoryData.results);
      }, []);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSelectedResult", function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selectedIndex;

      var results = _this.getFlattenedResults();

      return _get(results, index);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setValue", function (value) {
      var selectFirstResult = _this.props.selectFirstResult;

      _this.trySetState({
        value: value
      }, {
        selectedIndex: selectFirstResult ? 0 : -1
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "moveSelectionBy", function (e, offset) {
      var selectedIndex = _this.state.selectedIndex;

      var results = _this.getFlattenedResults();

      var lastIndex = results.length - 1; // next is after last, wrap to beginning
      // next is before first, wrap to end

      var nextIndex = selectedIndex + offset;
      if (nextIndex > lastIndex) nextIndex = 0;else if (nextIndex < 0) nextIndex = lastIndex;

      _this.setState({
        selectedIndex: nextIndex
      });

      _this.scrollSelectedItemIntoView();

      _this.handleSelectionChange(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollSelectedItemIntoView", function () {
      // Do not access document when server side rendering
      if (!isBrowser()) return;
      var menu = document.querySelector('.ui.search.active.visible .results.visible');
      var item = menu.querySelector('.result.active');
      if (!item) return;
      var isOutOfUpperView = item.offsetTop < menu.scrollTop;
      var isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

      if (isOutOfUpperView) {
        menu.scrollTop = item.offsetTop;
      } else if (isOutOfLowerView) {
        menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "tryOpen", function () {
      var currentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
      var minCharacters = _this.props.minCharacters;
      if (currentValue.length < minCharacters) return;

      _this.open();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "open", function () {
      _this.trySetState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "close", function () {
      _this.trySetState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderSearchInput", function (rest) {
      var _this$props2 = _this.props,
          icon = _this$props2.icon,
          input = _this$props2.input;
      var value = _this.state.value;
      return Input.create(input, {
        autoGenerateKey: false,
        defaultProps: _objectSpread({}, rest, {
          icon: icon,
          input: {
            className: 'prompt',
            tabIndex: '0',
            autoComplete: 'off'
          },
          onChange: _this.handleSearchChange,
          onClick: _this.handleInputClick,
          value: value
        })
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderNoResults", function () {
      var _this$props3 = _this.props,
          noResultsDescription = _this$props3.noResultsDescription,
          noResultsMessage = _this$props3.noResultsMessage;
      return React.createElement("div", {
        className: "message empty"
      }, React.createElement("div", {
        className: "header"
      }, noResultsMessage), noResultsDescription && React.createElement("div", {
        className: "description"
      }, noResultsDescription));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderResult", function (_ref2, index, _array) {
      var childKey = _ref2.childKey,
          result = _objectWithoutProperties(_ref2, ["childKey"]);

      var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var resultRenderer = _this.props.resultRenderer;
      var selectedIndex = _this.state.selectedIndex;
      var offsetIndex = index + offset;
      return React.createElement(SearchResult, _extends({
        key: childKey || result.title,
        active: selectedIndex === offsetIndex,
        onClick: _this.handleItemClick,
        renderer: resultRenderer
      }, result, {
        id: offsetIndex // Used to lookup the result on item click

      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderResults", function () {
      var results = _this.props.results;
      return _map(results, _this.renderResult);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderCategories", function () {
      var _this$props4 = _this.props,
          categoryRenderer = _this$props4.categoryRenderer,
          categories = _this$props4.results;
      var selectedIndex = _this.state.selectedIndex;
      var count = 0;
      return _map(categories, function (_ref3) {
        var childKey = _ref3.childKey,
            category = _objectWithoutProperties(_ref3, ["childKey"]);

        var categoryProps = _objectSpread({
          key: childKey || category.name,
          active: _inRange(selectedIndex, count, count + category.results.length),
          renderer: categoryRenderer
        }, category);

        var renderFn = _partialRight(_this.renderResult, count);

        count += category.results.length;
        return React.createElement(SearchCategory, categoryProps, category.results.map(renderFn));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderMenuContent", function () {
      var _this$props5 = _this.props,
          category = _this$props5.category,
          showNoResults = _this$props5.showNoResults,
          results = _this$props5.results;

      if (_isEmpty(results)) {
        return showNoResults ? _this.renderNoResults() : null;
      }

      return category ? _this.renderCategories() : _this.renderResults();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderResultsMenu", function () {
      var open = _this.state.open;
      var resultsClasses = open ? 'visible' : '';

      var menuContent = _this.renderMenuContent();

      if (!menuContent) return;
      return React.createElement(SearchResults, {
        className: resultsClasses
      }, menuContent);
    });

    return _this;
  }

  _createClass(Search, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$state = this.state,
          open = _this$state.open,
          value = _this$state.value;
      this.setValue(value);
      if (open) this.open();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      _get2(_getPrototypeOf(Search.prototype), "componentWillReceiveProps", this).call(this, nextProps);

      if (!shallowEqual(nextProps.value, this.props.value)) {
        this.setValue(nextProps.value);
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
          this.tryOpen();
        }

        if (this.state.open) {
          eventStack.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        }
      } else if (prevState.focus && !this.state.focus) {
        if (!this.isMouseDown) {
          this.close();
        }

        eventStack.unsub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      } // opened / closed


      if (!prevState.open && this.state.open) {
        this.open();
        eventStack.sub('click', this.closeOnDocumentClick);
        eventStack.sub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      } else if (prevState.open && !this.state.open) {
        this.close();
        eventStack.unsub('click', this.closeOnDocumentClick);
        eventStack.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventStack.unsub('click', this.closeOnDocumentClick);
      eventStack.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
    } // ----------------------------------------
    // Document Event Handlers
    // ----------------------------------------

  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          searchClasses = _this$state2.searchClasses,
          focus = _this$state2.focus,
          open = _this$state2.open;
      var _this$props6 = this.props,
          aligned = _this$props6.aligned,
          category = _this$props6.category,
          className = _this$props6.className,
          fluid = _this$props6.fluid,
          loading = _this$props6.loading,
          size = _this$props6.size; // Classes

      var classes = cx('ui', open && 'active visible', size, searchClasses, useKeyOnly(category, 'category'), useKeyOnly(focus, 'focus'), useKeyOnly(fluid, 'fluid'), useKeyOnly(loading, 'loading'), useValueAndKey(aligned, 'aligned'), 'search', className);
      var unhandled = getUnhandledProps(Search, this.props);
      var ElementType = getElementType(Search, this.props);

      var _partitionHTMLProps = partitionHTMLProps(unhandled, {
        htmlProps: htmlInputAttrs
      }),
          _partitionHTMLProps2 = _slicedToArray(_partitionHTMLProps, 2),
          htmlInputProps = _partitionHTMLProps2[0],
          rest = _partitionHTMLProps2[1];

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onMouseDown: this.handleMouseDown
      }), this.renderSearchInput(htmlInputProps), this.renderResultsMenu());
    }
  }]);

  return Search;
}(Component);

_defineProperty(Search, "defaultProps", {
  icon: 'search',
  input: 'text',
  minCharacters: 1,
  noResultsMessage: 'No results found.',
  showNoResults: true
});

_defineProperty(Search, "autoControlledProps", ['open', 'value']);

_defineProperty(Search, "Category", SearchCategory);

_defineProperty(Search, "Result", SearchResult);

_defineProperty(Search, "Results", SearchResults);

_defineProperty(Search, "handledProps", ["aligned", "as", "category", "categoryRenderer", "className", "defaultOpen", "defaultValue", "fluid", "icon", "input", "loading", "minCharacters", "noResultsDescription", "noResultsMessage", "onBlur", "onFocus", "onMouseDown", "onResultSelect", "onSearchChange", "onSelectionChange", "open", "resultRenderer", "results", "selectFirstResult", "showNoResults", "size", "value"]);

export { Search as default };
Search.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,
  // ------------------------------------
  // Behavior
  // ------------------------------------

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** Initial value. */
  defaultValue: PropTypes.string,

  /** Shorthand for Icon. */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

  /** Minimum characters to query for results */
  minCharacters: PropTypes.number,

  /** Additional text for "No Results" message with less emphasis. */
  noResultsDescription: PropTypes.node,

  /** Message to display when there are no results. */
  noResultsMessage: PropTypes.node,

  /** Controls whether or not the results menu is displayed. */
  open: PropTypes.bool,

  /**
   * One of:
   * - array of Search.Result props e.g. `{ title: '', description: '' }` or
   * - object of categories e.g. `{ name: '', results: [{ title: '', description: '' }]`
   */
  results: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(SearchResult.propTypes)), PropTypes.shape(SearchCategory.propTypes)]),

  /** Whether the search should automatically select the first result after searching. */
  selectFirstResult: PropTypes.bool,

  /** Whether a "no results" message should be shown if no results are found. */
  showNoResults: PropTypes.bool,

  /** Current value of the search input. Creates a controlled component. */
  value: PropTypes.string,
  // ------------------------------------
  // Rendering
  // ------------------------------------

  /**
   * Renders the SearchCategory contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable SearchCategory contents.
   */
  categoryRenderer: PropTypes.func,

  /**
   * Renders the SearchResult contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable SearchResult contents.
   */
  resultRenderer: PropTypes.func,
  // ------------------------------------
  // Callbacks
  // ------------------------------------

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur: PropTypes.func,

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus: PropTypes.func,

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown: PropTypes.func,

  /**
   * Called when a result is selected.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onResultSelect: PropTypes.func,

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props, includes current value of search input.
   */
  onSearchChange: PropTypes.func,

  /**
   * Called when the active selection index is changed.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onSelectionChange: PropTypes.func,
  // ------------------------------------
  // Style
  // ------------------------------------

  /** A search can have its results aligned to its left or right container edge. */
  aligned: PropTypes.string,

  /** A search can display results from remote content ordered by categories. */
  category: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** A search can have its results take up the width of its container. */
  fluid: PropTypes.bool,

  /** A search input can take up the width of its container. */
  input: customPropTypes.itemShorthand,

  /** A search can show a loading indicator. */
  loading: PropTypes.bool,

  /** A search can have different sizes. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium'))
} : {};