'use strict';

exports.__esModule = true;
exports.withTheme = exports.ThemeProvider = exports.css = undefined;

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _InlineStyle2 = require('../models/InlineStyle');

var _InlineStyle3 = _interopRequireDefault(_InlineStyle2);

var _StyledNativeComponent2 = require('../models/StyledNativeComponent');

var _StyledNativeComponent3 = _interopRequireDefault(_StyledNativeComponent2);

var _constructWithOptions2 = require('../constructors/constructWithOptions');

var _constructWithOptions3 = _interopRequireDefault(_constructWithOptions2);

var _css = require('../constructors/css');

var _css2 = _interopRequireDefault(_css);

var _ThemeProvider = require('../models/ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || require('prop-types').any;

/* eslint-disable import/no-unresolved */


var constructWithOptions = (0, _constructWithOptions3.default)(_css2.default);
var InlineStyle = (0, _InlineStyle3.default)(_reactNative2.default.StyleSheet);
var StyledNativeComponent = (0, _StyledNativeComponent3.default)(constructWithOptions, InlineStyle);
var styled = function styled(tag) {
  return constructWithOptions(StyledNativeComponent, tag);
};

/* React native lazy-requires each of these modules for some reason, so let's
*  assume it's for a good reason and not eagerly load them all */
var aliases = 'ActivityIndicator ActivityIndicatorIOS ART Button DatePickerIOS DrawerLayoutAndroid\n Image ImageBackground ImageEditor ImageStore KeyboardAvoidingView ListView MapView Modal Navigator NavigatorIOS\n Picker PickerIOS ProgressBarAndroid ProgressViewIOS ScrollView SegmentedControlIOS Slider\n SliderIOS SnapshotViewIOS Switch RecyclerViewBackedScrollView RefreshControl StatusBar\n SwipeableListView SwitchAndroid SwitchIOS TabBarIOS Text TextInput ToastAndroid ToolbarAndroid\n Touchable TouchableHighlight TouchableNativeFeedback TouchableOpacity TouchableWithoutFeedback\n View ViewPagerAndroid WebView FlatList SectionList VirtualizedList';

/* Define a getter for each alias which simply gets the reactNative component
 * and passes it to styled */
aliases.split(/\s+/m).forEach(function (alias) {
  return Object.defineProperty(styled, alias, {
    enumerable: true,
    configurable: false,
    get: function get() {
      return styled(_reactNative2.default[alias]);
    }
  });
});

exports.css = _css2.default;
exports.ThemeProvider = _ThemeProvider2.default;
exports.withTheme = _withTheme2.default;
exports.default = styled;