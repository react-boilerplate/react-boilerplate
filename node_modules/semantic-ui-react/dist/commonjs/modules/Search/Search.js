"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _partialRight2 = _interopRequireDefault(require("lodash/partialRight"));

var _inRange2 = _interopRequireDefault(require("lodash/inRange"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _get4 = _interopRequireDefault(require("lodash/get"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _lib = require("../../lib");

var _Input = _interopRequireDefault(require("../../elements/Input"));

var _SearchCategory = _interopRequireDefault(require("./SearchCategory"));

var _SearchResult = _interopRequireDefault(require("./SearchResult"));

var _SearchResults = _interopRequireDefault(require("./SearchResults"));

/**
 * A search module allows a user to query for results from a selection of data
 */
var Search =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Search, _Component);

  function Search() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Search);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Search)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleResultSelect", function (e, result) {
      (0, _invoke2.default)(_this.props, 'onResultSelect', e, (0, _objectSpread2.default)({}, _this.props, {
        result: result
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSelectionChange", function (e) {
      var result = _this.getSelectedResult();

      (0, _invoke2.default)(_this.props, 'onSelectionChange', e, (0, _objectSpread2.default)({}, _this.props, {
        result: result
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "closeOnEscape", function (e) {
      if (_keyboardKey.default.getCode(e) !== _keyboardKey.default.Escape) return;
      e.preventDefault();

      _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "moveSelectionOnKeyDown", function (e) {
      switch (_keyboardKey.default.getCode(e)) {
        case _keyboardKey.default.ArrowDown:
          e.preventDefault();

          _this.moveSelectionBy(e, 1);

          break;

        case _keyboardKey.default.ArrowUp:
          e.preventDefault();

          _this.moveSelectionBy(e, -1);

          break;

        default:
          break;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "selectItemOnEnter", function (e) {
      if (_keyboardKey.default.getCode(e) !== _keyboardKey.default.Enter) return;

      var result = _this.getSelectedResult(); // prevent selecting null if there was no selected item value


      if (!result) return;
      e.preventDefault(); // notify the onResultSelect prop that the user is trying to change value

      _this.setValue(result.title);

      _this.handleResultSelect(e, result);

      _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "closeOnDocumentClick", function (e) {
      _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDown", function (e) {
      _this.isMouseDown = true;
      (0, _invoke2.default)(_this.props, 'onMouseDown', e, _this.props);

      _lib.eventStack.sub('mouseup', _this.handleDocumentMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDocumentMouseUp", function () {
      _this.isMouseDown = false;

      _lib.eventStack.unsub('mouseup', _this.handleDocumentMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleInputClick", function (e) {
      // prevent closeOnDocumentClick()
      e.nativeEvent.stopImmediatePropagation();

      _this.tryOpen();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemClick", function (e, _ref) {
      var id = _ref.id;

      var result = _this.getSelectedResult(id); // prevent closeOnDocumentClick()


      e.nativeEvent.stopImmediatePropagation(); // notify the onResultSelect prop that the user is trying to change value

      _this.setValue(result.title);

      _this.handleResultSelect(e, result);

      _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleFocus", function (e) {
      var onFocus = _this.props.onFocus;
      if (onFocus) onFocus(e, _this.props);

      _this.setState({
        focus: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleBlur", function (e) {
      var onBlur = _this.props.onBlur;
      if (onBlur) onBlur(e, _this.props);

      _this.setState({
        focus: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSearchChange", function (e) {
      // prevent propagating to this.props.onChange()
      e.stopPropagation();
      var minCharacters = _this.props.minCharacters;
      var open = _this.state.open;
      var newQuery = e.target.value;
      (0, _invoke2.default)(_this.props, 'onSearchChange', e, (0, _objectSpread2.default)({}, _this.props, {
        value: newQuery
      })); // open search dropdown on search query

      if (newQuery.length < minCharacters) {
        _this.close();
      } else if (!open) {
        _this.tryOpen(newQuery);
      }

      _this.setValue(newQuery);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getFlattenedResults", function () {
      var _this$props = _this.props,
          category = _this$props.category,
          results = _this$props.results;
      return !category ? results : (0, _reduce2.default)(results, function (memo, categoryData) {
        return memo.concat(categoryData.results);
      }, []);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getSelectedResult", function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selectedIndex;

      var results = _this.getFlattenedResults();

      return (0, _get4.default)(results, index);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setValue", function (value) {
      var selectFirstResult = _this.props.selectFirstResult;

      _this.trySetState({
        value: value
      }, {
        selectedIndex: selectFirstResult ? 0 : -1
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "moveSelectionBy", function (e, offset) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scrollSelectedItemIntoView", function () {
      // Do not access document when server side rendering
      if (!(0, _lib.isBrowser)()) return;
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "tryOpen", function () {
      var currentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
      var minCharacters = _this.props.minCharacters;
      if (currentValue.length < minCharacters) return;

      _this.open();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "open", function () {
      _this.trySetState({
        open: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "close", function () {
      _this.trySetState({
        open: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderSearchInput", function (rest) {
      var _this$props2 = _this.props,
          icon = _this$props2.icon,
          input = _this$props2.input;
      var value = _this.state.value;
      return _Input.default.create(input, {
        autoGenerateKey: false,
        defaultProps: (0, _objectSpread2.default)({}, rest, {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderNoResults", function () {
      var _this$props3 = _this.props,
          noResultsDescription = _this$props3.noResultsDescription,
          noResultsMessage = _this$props3.noResultsMessage;
      return _react.default.createElement("div", {
        className: "message empty"
      }, _react.default.createElement("div", {
        className: "header"
      }, noResultsMessage), noResultsDescription && _react.default.createElement("div", {
        className: "description"
      }, noResultsDescription));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderResult", function (_ref2, index, _array) {
      var childKey = _ref2.childKey,
          result = (0, _objectWithoutProperties2.default)(_ref2, ["childKey"]);
      var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var resultRenderer = _this.props.resultRenderer;
      var selectedIndex = _this.state.selectedIndex;
      var offsetIndex = index + offset;
      return _react.default.createElement(_SearchResult.default, (0, _extends2.default)({
        key: childKey || result.title,
        active: selectedIndex === offsetIndex,
        onClick: _this.handleItemClick,
        renderer: resultRenderer
      }, result, {
        id: offsetIndex // Used to lookup the result on item click

      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderResults", function () {
      var results = _this.props.results;
      return (0, _map2.default)(results, _this.renderResult);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderCategories", function () {
      var _this$props4 = _this.props,
          categoryRenderer = _this$props4.categoryRenderer,
          categories = _this$props4.results;
      var selectedIndex = _this.state.selectedIndex;
      var count = 0;
      return (0, _map2.default)(categories, function (_ref3) {
        var childKey = _ref3.childKey,
            category = (0, _objectWithoutProperties2.default)(_ref3, ["childKey"]);
        var categoryProps = (0, _objectSpread2.default)({
          key: childKey || category.name,
          active: (0, _inRange2.default)(selectedIndex, count, count + category.results.length),
          renderer: categoryRenderer
        }, category);
        var renderFn = (0, _partialRight2.default)(_this.renderResult, count);
        count += category.results.length;
        return _react.default.createElement(_SearchCategory.default, categoryProps, category.results.map(renderFn));
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderMenuContent", function () {
      var _this$props5 = _this.props,
          category = _this$props5.category,
          showNoResults = _this$props5.showNoResults,
          results = _this$props5.results;

      if ((0, _isEmpty2.default)(results)) {
        return showNoResults ? _this.renderNoResults() : null;
      }

      return category ? _this.renderCategories() : _this.renderResults();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderResultsMenu", function () {
      var open = _this.state.open;
      var resultsClasses = open ? 'visible' : '';

      var menuContent = _this.renderMenuContent();

      if (!menuContent) return;
      return _react.default.createElement(_SearchResults.default, {
        className: resultsClasses
      }, menuContent);
    });
    return _this;
  }

  (0, _createClass2.default)(Search, [{
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
      (0, _get3.default)((0, _getPrototypeOf3.default)(Search.prototype), "componentWillReceiveProps", this).call(this, nextProps);

      if (!(0, _shallowequal.default)(nextProps.value, this.props.value)) {
        this.setValue(nextProps.value);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowequal.default)(nextProps, this.props) || !(0, _shallowequal.default)(nextState, this.state);
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
          _lib.eventStack.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        }
      } else if (prevState.focus && !this.state.focus) {
        if (!this.isMouseDown) {
          this.close();
        }

        _lib.eventStack.unsub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      } // opened / closed


      if (!prevState.open && this.state.open) {
        this.open();

        _lib.eventStack.sub('click', this.closeOnDocumentClick);

        _lib.eventStack.sub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      } else if (prevState.open && !this.state.open) {
        this.close();

        _lib.eventStack.unsub('click', this.closeOnDocumentClick);

        _lib.eventStack.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _lib.eventStack.unsub('click', this.closeOnDocumentClick);

      _lib.eventStack.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
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

      var classes = (0, _classnames.default)('ui', open && 'active visible', size, searchClasses, (0, _lib.useKeyOnly)(category, 'category'), (0, _lib.useKeyOnly)(focus, 'focus'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useValueAndKey)(aligned, 'aligned'), 'search', className);
      var unhandled = (0, _lib.getUnhandledProps)(Search, this.props);
      var ElementType = (0, _lib.getElementType)(Search, this.props);

      var _partitionHTMLProps = (0, _lib.partitionHTMLProps)(unhandled, {
        htmlProps: _lib.htmlInputAttrs
      }),
          _partitionHTMLProps2 = (0, _slicedToArray2.default)(_partitionHTMLProps, 2),
          htmlInputProps = _partitionHTMLProps2[0],
          rest = _partitionHTMLProps2[1];

      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onMouseDown: this.handleMouseDown
      }), this.renderSearchInput(htmlInputProps), this.renderResultsMenu());
    }
  }]);
  return Search;
}(_lib.AutoControlledComponent);

exports.default = Search;
(0, _defineProperty2.default)(Search, "defaultProps", {
  icon: 'search',
  input: 'text',
  minCharacters: 1,
  noResultsMessage: 'No results found.',
  showNoResults: true
});
(0, _defineProperty2.default)(Search, "autoControlledProps", ['open', 'value']);
(0, _defineProperty2.default)(Search, "Category", _SearchCategory.default);
(0, _defineProperty2.default)(Search, "Result", _SearchResult.default);
(0, _defineProperty2.default)(Search, "Results", _SearchResults.default);
(0, _defineProperty2.default)(Search, "handledProps", ["aligned", "as", "category", "categoryRenderer", "className", "defaultOpen", "defaultValue", "fluid", "icon", "input", "loading", "minCharacters", "noResultsDescription", "noResultsMessage", "onBlur", "onFocus", "onMouseDown", "onResultSelect", "onSearchChange", "onSelectionChange", "open", "resultRenderer", "results", "selectFirstResult", "showNoResults", "size", "value"]);
Search.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,
  // ------------------------------------
  // Behavior
  // ------------------------------------

  /** Initial value of open. */
  defaultOpen: _propTypes.default.bool,

  /** Initial value. */
  defaultValue: _propTypes.default.string,

  /** Shorthand for Icon. */
  icon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object]),

  /** Minimum characters to query for results */
  minCharacters: _propTypes.default.number,

  /** Additional text for "No Results" message with less emphasis. */
  noResultsDescription: _propTypes.default.node,

  /** Message to display when there are no results. */
  noResultsMessage: _propTypes.default.node,

  /** Controls whether or not the results menu is displayed. */
  open: _propTypes.default.bool,

  /**
   * One of:
   * - array of Search.Result props e.g. `{ title: '', description: '' }` or
   * - object of categories e.g. `{ name: '', results: [{ title: '', description: '' }]`
   */
  results: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape(_SearchResult.default.propTypes)), _propTypes.default.shape(_SearchCategory.default.propTypes)]),

  /** Whether the search should automatically select the first result after searching. */
  selectFirstResult: _propTypes.default.bool,

  /** Whether a "no results" message should be shown if no results are found. */
  showNoResults: _propTypes.default.bool,

  /** Current value of the search input. Creates a controlled component. */
  value: _propTypes.default.string,
  // ------------------------------------
  // Rendering
  // ------------------------------------

  /**
   * Renders the SearchCategory contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable SearchCategory contents.
   */
  categoryRenderer: _propTypes.default.func,

  /**
   * Renders the SearchResult contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable SearchResult contents.
   */
  resultRenderer: _propTypes.default.func,
  // ------------------------------------
  // Callbacks
  // ------------------------------------

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur: _propTypes.default.func,

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus: _propTypes.default.func,

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * Called when a result is selected.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onResultSelect: _propTypes.default.func,

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props, includes current value of search input.
   */
  onSearchChange: _propTypes.default.func,

  /**
   * Called when the active selection index is changed.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onSelectionChange: _propTypes.default.func,
  // ------------------------------------
  // Style
  // ------------------------------------

  /** A search can have its results aligned to its left or right container edge. */
  aligned: _propTypes.default.string,

  /** A search can display results from remote content ordered by categories. */
  category: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A search can have its results take up the width of its container. */
  fluid: _propTypes.default.bool,

  /** A search input can take up the width of its container. */
  input: _lib.customPropTypes.itemShorthand,

  /** A search can show a loading indicator. */
  loading: _propTypes.default.bool,

  /** A search can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium'))
} : {};