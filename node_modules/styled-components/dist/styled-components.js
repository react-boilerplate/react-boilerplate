var styled = (function (React,ReactDOM) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  // 
  function isStyledComponent(target) {
    return target && typeof target.styledComponentId === 'string';
  }

  // 

  var interleave = (function (strings, interpolations) {
    var result = [strings[0]];

    for (var i = 0, len = interpolations.length; i < len; i += 1) {
      result.push(interpolations[i], strings[i + 1]);
    }

    return result;
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  // 
  var isPlainObject = (function (x) {
    return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x.constructor === Object;
  });

  // 
  var EMPTY_ARRAY = Object.freeze([]);
  var EMPTY_OBJECT = Object.freeze({});

  // 
  function isFunction(test) {
    return typeof test === 'function';
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var reactIs_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.forward_ref"):60112,n=b?Symbol.for("react.placeholder"):60113;
  function q(a){if("object"===typeof a&&null!==a){var p=a.$$typeof;switch(p){case c:switch(a=a.type,a){case l:case e:case g:case f:return a;default:switch(a=a&&a.$$typeof,a){case k:case m:case h:return a;default:return p}}case d:return p}}}exports.typeOf=q;exports.AsyncMode=l;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=m;exports.Fragment=e;exports.Profiler=g;exports.Portal=d;exports.StrictMode=f;
  exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===l||a===g||a===f||a===n||"object"===typeof a&&null!==a&&("function"===typeof a.then||a.$$typeof===h||a.$$typeof===k||a.$$typeof===m)};exports.isAsyncMode=function(a){return q(a)===l};exports.isContextConsumer=function(a){return q(a)===k};exports.isContextProvider=function(a){return q(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};
  exports.isForwardRef=function(a){return q(a)===m};exports.isFragment=function(a){return q(a)===e};exports.isProfiler=function(a){return q(a)===g};exports.isPortal=function(a){return q(a)===d};exports.isStrictMode=function(a){return q(a)===f};
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_4 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_5 = reactIs_production_min.Element;
  var reactIs_production_min_6 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_7 = reactIs_production_min.Fragment;
  var reactIs_production_min_8 = reactIs_production_min.Profiler;
  var reactIs_production_min_9 = reactIs_production_min.Portal;
  var reactIs_production_min_10 = reactIs_production_min.StrictMode;
  var reactIs_production_min_11 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_12 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_13 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_14 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_15 = reactIs_production_min.isElement;
  var reactIs_production_min_16 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_17 = reactIs_production_min.isFragment;
  var reactIs_production_min_18 = reactIs_production_min.isProfiler;
  var reactIs_production_min_19 = reactIs_production_min.isPortal;
  var reactIs_production_min_20 = reactIs_production_min.isStrictMode;

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  Object.defineProperty(exports, '__esModule', { value: true });

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;

  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_PLACEHOLDER_TYPE = hasSymbol ? Symbol.for('react.placeholder') : 0xead1;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_PLACEHOLDER_TYPE || typeof type === 'object' && type !== null && (typeof type.then === 'function' || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
              return type;
            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
                default:
                  return $$typeof;
              }
          }
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;

  function isAsyncMode(object) {
    return typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }

  exports.typeOf = typeOf;
  exports.AsyncMode = AsyncMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Profiler = Profiler;
  exports.Portal = Portal;
  exports.StrictMode = StrictMode;
  exports.isValidElementType = isValidElementType;
  exports.isAsyncMode = isAsyncMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isProfiler = isProfiler;
  exports.isPortal = isPortal;
  exports.isStrictMode = isStrictMode;
    })();
  }
  });

  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ContextConsumer;
  var reactIs_development_4 = reactIs_development.ContextProvider;
  var reactIs_development_5 = reactIs_development.Element;
  var reactIs_development_6 = reactIs_development.ForwardRef;
  var reactIs_development_7 = reactIs_development.Fragment;
  var reactIs_development_8 = reactIs_development.Profiler;
  var reactIs_development_9 = reactIs_development.Portal;
  var reactIs_development_10 = reactIs_development.StrictMode;
  var reactIs_development_11 = reactIs_development.isValidElementType;
  var reactIs_development_12 = reactIs_development.isAsyncMode;
  var reactIs_development_13 = reactIs_development.isContextConsumer;
  var reactIs_development_14 = reactIs_development.isContextProvider;
  var reactIs_development_15 = reactIs_development.isElement;
  var reactIs_development_16 = reactIs_development.isForwardRef;
  var reactIs_development_17 = reactIs_development.isFragment;
  var reactIs_development_18 = reactIs_development.isProfiler;
  var reactIs_development_19 = reactIs_development.isPortal;
  var reactIs_development_20 = reactIs_development.isStrictMode;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });
  var reactIs_1 = reactIs.isElement;
  var reactIs_2 = reactIs.isValidElementType;
  var reactIs_3 = reactIs.ForwardRef;

  // 

  function getComponentName(target) {
    return target.displayName || target.name || 'Component';
  }

  // 


  var SC_ATTR = typeof process !== 'undefined' && process.env.SC_ATTR || 'data-styled';

  var SC_VERSION_ATTR = 'data-styled-version';

  var SC_STREAM_ATTR = 'data-styled-streamed';

  var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;

  // Shared empty execution context when generating static styles
  var STATIC_EXECUTION_CONTEXT = {};

  // 


  /**
   * Parse errors.md and turn it into a simple hash of code: message
   */
  var ERRORS = {
    "1": "Cannot create styled-component for component: %s.\n\n",
    "2": "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    "3": "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",
    "4": "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",
    "5": "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",
    "6": "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    "7": "ThemeProvider: Please return an object from your \"theme\" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n",
    "8": "ThemeProvider: Please make your \"theme\" prop an object.\n\n",
    "9": "Missing document `<head>`\n\n",
    "10": "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",
    "11": "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",
    "12": "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper (see https://www.styled-components.com/docs/api#css), which ensures the styles are injected correctly.\n"
  };

  /**
   * super basic version of sprintf
   */
  function format() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var a = args[0];
    var b = [];
    var c = void 0;

    for (c = 1; c < args.length; c += 1) {
      b.push(args[c]);
    }

    b.forEach(function (d) {
      a = a.replace(/%[a-z]/, d);
    });

    return a;
  }

  /**
   * Create an error file out of errors.md for development and a simple web link to the full errors
   * in production mode.
   */

  var StyledComponentsError = function (_Error) {
    inherits(StyledComponentsError, _Error);

    function StyledComponentsError(code) {
      classCallCheck(this, StyledComponentsError);

      for (var _len2 = arguments.length, interpolations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        interpolations[_key2 - 1] = arguments[_key2];
      }

      if (false) {
        var _this;
      } else {
        var _this = possibleConstructorReturn(this, _Error.call(this, format.apply(undefined, [ERRORS[code]].concat(interpolations)).trim()));
      }
      return possibleConstructorReturn(_this);
    }

    return StyledComponentsError;
  }(Error);

  // 
  var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

  var extractComps = (function (maybeCSS) {
    var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
    var existingComponents = [];
    css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
      existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
      return match;
    });
    return existingComponents.map(function (_ref, i) {
      var componentId = _ref.componentId,
          matchIndex = _ref.matchIndex;

      var nextComp = existingComponents[i + 1];
      var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
      return { componentId: componentId, cssFromDOM: cssFromDOM };
    });
  });

  var stylis_min = createCommonjsModule(function (module, exports) {
  !function(e){module.exports=e(null);}(function e(a){var c=/^\0+/g,r=/[\0\r\f]/g,s=/: */g,t=/zoo|gra/,i=/([,: ])(transform)/g,f=/,+\s*(?![^(]*[)])/g,n=/ +\s*(?![^(]*[)])/g,l=/ *[\0] */g,o=/,\r+?/g,h=/([\t\r\n ])*\f?&/g,u=/:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g,d=/\W+/g,b=/@(k\w+)\s*(\S*)\s*/,k=/::(place)/g,p=/:(read-only)/g,g=/\s+(?=[{\];=:>])/g,A=/([[}=:>])\s+/g,C=/(\{[^{]+?);(?=\})/g,w=/\s{2,}/g,v=/([^\(])(:+) */g,m=/[svh]\w+-[tblr]{2}/,x=/\(\s*(.*)\s*\)/g,$=/([\s\S]*?);/g,y=/-self|flex-/g,O=/[^]*?(:[rp][el]a[\w-]+)[^]*/,j=/stretch|:\s*\w+\-(?:conte|avail)/,z=/([^-])(image-set\()/,F="-webkit-",N="-moz-",S="-ms-",B=59,W=125,q=123,D=40,E=41,G=91,H=93,I=10,J=13,K=9,L=64,M=32,P=38,Q=45,R=95,T=42,U=44,V=58,X=39,Y=34,Z=47,_=62,ee=43,ae=126,ce=0,re=12,se=11,te=107,ie=109,fe=115,ne=112,le=111,oe=105,he=99,ue=100,de=112,be=1,ke=1,pe=0,ge=1,Ae=1,Ce=1,we=0,ve=0,me=0,xe=[],$e=[],ye=0,Oe=null,je=-2,ze=-1,Fe=0,Ne=1,Se=2,Be=3,We=0,qe=1,De="",Ee="",Ge="";function He(e,a,s,t,i){for(var f,n,o=0,h=0,u=0,d=0,g=0,A=0,C=0,w=0,m=0,$=0,y=0,O=0,j=0,z=0,R=0,we=0,$e=0,Oe=0,je=0,ze=s.length,Je=ze-1,Re="",Te="",Ue="",Ve="",Xe="",Ye="";R<ze;){if(C=s.charCodeAt(R),R===Je)if(h+d+u+o!==0){if(0!==h)C=h===Z?I:Z;d=u=o=0,ze++,Je++;}if(h+d+u+o===0){if(R===Je){if(we>0)Te=Te.replace(r,"");if(Te.trim().length>0){switch(C){case M:case K:case B:case J:case I:break;default:Te+=s.charAt(R);}C=B;}}if(1===$e)switch(C){case q:case W:case B:case Y:case X:case D:case E:case U:$e=0;case K:case J:case I:case M:break;default:for($e=0,je=R,g=C,R--,C=B;je<ze;)switch(s.charCodeAt(je++)){case I:case J:case B:++R,C=g,je=ze;break;case V:if(we>0)++R,C=g;case q:je=ze;}}switch(C){case q:for(g=(Te=Te.trim()).charCodeAt(0),y=1,je=++R;R<ze;){switch(C=s.charCodeAt(R)){case q:y++;break;case W:y--;break;case Z:switch(A=s.charCodeAt(R+1)){case T:case Z:R=Qe(A,R,Je,s);}break;case G:C++;case D:C++;case Y:case X:for(;R++<Je&&s.charCodeAt(R)!==C;);}if(0===y)break;R++;}if(Ue=s.substring(je,R),g===ce)g=(Te=Te.replace(c,"").trim()).charCodeAt(0);switch(g){case L:if(we>0)Te=Te.replace(r,"");switch(A=Te.charCodeAt(1)){case ue:case ie:case fe:case Q:f=a;break;default:f=xe;}if(je=(Ue=He(a,f,Ue,A,i+1)).length,me>0&&0===je)je=Te.length;if(ye>0)if(f=Ie(xe,Te,Oe),n=Pe(Be,Ue,f,a,ke,be,je,A,i,t),Te=f.join(""),void 0!==n)if(0===(je=(Ue=n.trim()).length))A=0,Ue="";if(je>0)switch(A){case fe:Te=Te.replace(x,Me);case ue:case ie:case Q:Ue=Te+"{"+Ue+"}";break;case te:if(Ue=(Te=Te.replace(b,"$1 $2"+(qe>0?De:"")))+"{"+Ue+"}",1===Ae||2===Ae&&Le("@"+Ue,3))Ue="@"+F+Ue+"@"+Ue;else Ue="@"+Ue;break;default:if(Ue=Te+Ue,t===de)Ve+=Ue,Ue="";}else Ue="";break;default:Ue=He(a,Ie(a,Te,Oe),Ue,t,i+1);}Xe+=Ue,O=0,$e=0,z=0,we=0,Oe=0,j=0,Te="",Ue="",C=s.charCodeAt(++R);break;case W:case B:if((je=(Te=(we>0?Te.replace(r,""):Te).trim()).length)>1){if(0===z)if((g=Te.charCodeAt(0))===Q||g>96&&g<123)je=(Te=Te.replace(" ",":")).length;if(ye>0)if(void 0!==(n=Pe(Ne,Te,a,e,ke,be,Ve.length,t,i,t)))if(0===(je=(Te=n.trim()).length))Te="\0\0";switch(g=Te.charCodeAt(0),A=Te.charCodeAt(1),g){case ce:break;case L:if(A===oe||A===he){Ye+=Te+s.charAt(R);break}default:if(Te.charCodeAt(je-1)===V)break;Ve+=Ke(Te,g,A,Te.charCodeAt(2));}}O=0,$e=0,z=0,we=0,Oe=0,Te="",C=s.charCodeAt(++R);}}switch(C){case J:case I:if(h+d+u+o+ve===0)switch($){case E:case X:case Y:case L:case ae:case _:case T:case ee:case Z:case Q:case V:case U:case B:case q:case W:break;default:if(z>0)$e=1;}if(h===Z)h=0;else if(ge+O===0&&t!==te&&Te.length>0)we=1,Te+="\0";if(ye*We>0)Pe(Fe,Te,a,e,ke,be,Ve.length,t,i,t);be=1,ke++;break;case B:case W:if(h+d+u+o===0){be++;break}default:switch(be++,Re=s.charAt(R),C){case K:case M:if(d+o+h===0)switch(w){case U:case V:case K:case M:Re="";break;default:if(C!==M)Re=" ";}break;case ce:Re="\\0";break;case re:Re="\\f";break;case se:Re="\\v";break;case P:if(d+h+o===0&&ge>0)Oe=1,we=1,Re="\f"+Re;break;case 108:if(d+h+o+pe===0&&z>0)switch(R-z){case 2:if(w===ne&&s.charCodeAt(R-3)===V)pe=w;case 8:if(m===le)pe=m;}break;case V:if(d+h+o===0)z=R;break;case U:if(h+u+d+o===0)we=1,Re+="\r";break;case Y:case X:if(0===h)d=d===C?0:0===d?C:d;break;case G:if(d+h+u===0)o++;break;case H:if(d+h+u===0)o--;break;case E:if(d+h+o===0)u--;break;case D:if(d+h+o===0){if(0===O)switch(2*w+3*m){case 533:break;default:y=0,O=1;}u++;}break;case L:if(h+u+d+o+z+j===0)j=1;break;case T:case Z:if(d+o+u>0)break;switch(h){case 0:switch(2*C+3*s.charCodeAt(R+1)){case 235:h=Z;break;case 220:je=R,h=T;}break;case T:if(C===Z&&w===T&&je+2!==R){if(33===s.charCodeAt(je+2))Ve+=s.substring(je,R+1);Re="",h=0;}}}if(0===h){if(ge+d+o+j===0&&t!==te&&C!==B)switch(C){case U:case ae:case _:case ee:case E:case D:if(0===O){switch(w){case K:case M:case I:case J:Re+="\0";break;default:Re="\0"+Re+(C===U?"":"\0");}we=1;}else switch(C){case D:if(z+7===R&&108===w)z=0;O=++y;break;case E:if(0==(O=--y))we=1,Re+="\0";}break;case K:case M:switch(w){case ce:case q:case W:case B:case U:case re:case K:case M:case I:case J:break;default:if(0===O)we=1,Re+="\0";}}if(Te+=Re,C!==M&&C!==K)$=C;}}m=w,w=C,R++;}if(je=Ve.length,me>0)if(0===je&&0===Xe.length&&0===a[0].length==false)if(t!==ie||1===a.length&&(ge>0?Ee:Ge)===a[0])je=a.join(",").length+2;if(je>0){if(f=0===ge&&t!==te?function(e){for(var a,c,s=0,t=e.length,i=Array(t);s<t;++s){for(var f=e[s].split(l),n="",o=0,h=0,u=0,d=0,b=f.length;o<b;++o){if(0===(h=(c=f[o]).length)&&b>1)continue;if(u=n.charCodeAt(n.length-1),d=c.charCodeAt(0),a="",0!==o)switch(u){case T:case ae:case _:case ee:case M:case D:break;default:a=" ";}switch(d){case P:c=a+Ee;case ae:case _:case ee:case M:case E:case D:break;case G:c=a+c+Ee;break;case V:switch(2*c.charCodeAt(1)+3*c.charCodeAt(2)){case 530:if(Ce>0){c=a+c.substring(8,h-1);break}default:if(o<1||f[o-1].length<1)c=a+Ee+c;}break;case U:a="";default:if(h>1&&c.indexOf(":")>0)c=a+c.replace(v,"$1"+Ee+"$2");else c=a+c+Ee;}n+=c;}i[s]=n.replace(r,"").trim();}return i}(a):a,ye>0)if(void 0!==(n=Pe(Se,Ve,f,e,ke,be,je,t,i,t))&&0===(Ve=n).length)return Ye+Ve+Xe;if(Ve=f.join(",")+"{"+Ve+"}",Ae*pe!=0){if(2===Ae&&!Le(Ve,2))pe=0;switch(pe){case le:Ve=Ve.replace(p,":"+N+"$1")+Ve;break;case ne:Ve=Ve.replace(k,"::"+F+"input-$1")+Ve.replace(k,"::"+N+"$1")+Ve.replace(k,":"+S+"input-$1")+Ve;}pe=0;}}return Ye+Ve+Xe}function Ie(e,a,c){var r=a.trim().split(o),s=r,t=r.length,i=e.length;switch(i){case 0:case 1:for(var f=0,n=0===i?"":e[0]+" ";f<t;++f)s[f]=Je(n,s[f],c,i).trim();break;default:f=0;var l=0;for(s=[];f<t;++f)for(var h=0;h<i;++h)s[l++]=Je(e[h]+" ",r[f],c,i).trim();}return s}function Je(e,a,c,r){var s=a,t=s.charCodeAt(0);if(t<33)t=(s=s.trim()).charCodeAt(0);switch(t){case P:switch(ge+r){case 0:case 1:if(0===e.trim().length)break;default:return s.replace(h,"$1"+e.trim())}break;case V:switch(s.charCodeAt(1)){case 103:if(Ce>0&&ge>0)return s.replace(u,"$1").replace(h,"$1"+Ge);break;default:return e.trim()+s.replace(h,"$1"+e.trim())}default:if(c*ge>0&&s.indexOf("\f")>0)return s.replace(h,(e.charCodeAt(0)===V?"":"$1")+e.trim())}return e+s}function Ke(e,a,c,r){var l,o=0,h=e+";",u=2*a+3*c+4*r;if(944===u)return function(e){var a=e.length,c=e.indexOf(":",9)+1,r=e.substring(0,c).trim(),s=e.substring(c,a-1).trim();switch(e.charCodeAt(9)*qe){case 0:break;case Q:if(110!==e.charCodeAt(10))break;default:for(var t=s.split((s="",f)),i=0,c=0,a=t.length;i<a;c=0,++i){for(var l=t[i],o=l.split(n);l=o[c];){var h=l.charCodeAt(0);if(1===qe&&(h>L&&h<90||h>96&&h<123||h===R||h===Q&&l.charCodeAt(1)!==Q))switch(isNaN(parseFloat(l))+(-1!==l.indexOf("("))){case 1:switch(l){case"infinite":case"alternate":case"backwards":case"running":case"normal":case"forwards":case"both":case"none":case"linear":case"ease":case"ease-in":case"ease-out":case"ease-in-out":case"paused":case"reverse":case"alternate-reverse":case"inherit":case"initial":case"unset":case"step-start":case"step-end":break;default:l+=De;}}o[c++]=l;}s+=(0===i?"":",")+o.join(" ");}}if(s=r+s+";",1===Ae||2===Ae&&Le(s,1))return F+s+s;return s}(h);else if(0===Ae||2===Ae&&!Le(h,1))return h;switch(u){case 1015:return 97===h.charCodeAt(10)?F+h+h:h;case 951:return 116===h.charCodeAt(3)?F+h+h:h;case 963:return 110===h.charCodeAt(5)?F+h+h:h;case 1009:if(100!==h.charCodeAt(4))break;case 969:case 942:return F+h+h;case 978:return F+h+N+h+h;case 1019:case 983:return F+h+N+h+S+h+h;case 883:if(h.charCodeAt(8)===Q)return F+h+h;if(h.indexOf("image-set(",11)>0)return h.replace(z,"$1"+F+"$2")+h;return h;case 932:if(h.charCodeAt(4)===Q)switch(h.charCodeAt(5)){case 103:return F+"box-"+h.replace("-grow","")+F+h+S+h.replace("grow","positive")+h;case 115:return F+h+S+h.replace("shrink","negative")+h;case 98:return F+h+S+h.replace("basis","preferred-size")+h}return F+h+S+h+h;case 964:return F+h+S+"flex-"+h+h;case 1023:if(99!==h.charCodeAt(8))break;return l=h.substring(h.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),F+"box-pack"+l+F+h+S+"flex-pack"+l+h;case 1005:return t.test(h)?h.replace(s,":"+F)+h.replace(s,":"+N)+h:h;case 1e3:switch(o=(l=h.substring(13).trim()).indexOf("-")+1,l.charCodeAt(0)+l.charCodeAt(o)){case 226:l=h.replace(m,"tb");break;case 232:l=h.replace(m,"tb-rl");break;case 220:l=h.replace(m,"lr");break;default:return h}return F+h+S+l+h;case 1017:if(-1===h.indexOf("sticky",9))return h;case 975:switch(o=(h=e).length-10,u=(l=(33===h.charCodeAt(o)?h.substring(0,o):h).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|l.charCodeAt(7))){case 203:if(l.charCodeAt(8)<111)break;case 115:h=h.replace(l,F+l)+";"+h;break;case 207:case 102:h=h.replace(l,F+(u>102?"inline-":"")+"box")+";"+h.replace(l,F+l)+";"+h.replace(l,S+l+"box")+";"+h;}return h+";";case 938:if(h.charCodeAt(5)===Q)switch(h.charCodeAt(6)){case 105:return l=h.replace("-items",""),F+h+F+"box-"+l+S+"flex-"+l+h;case 115:return F+h+S+"flex-item-"+h.replace(y,"")+h;default:return F+h+S+"flex-line-pack"+h.replace("align-content","").replace(y,"")+h}break;case 973:case 989:if(h.charCodeAt(3)!==Q||122===h.charCodeAt(4))break;case 931:case 953:if(true===j.test(e))if(115===(l=e.substring(e.indexOf(":")+1)).charCodeAt(0))return Ke(e.replace("stretch","fill-available"),a,c,r).replace(":fill-available",":stretch");else return h.replace(l,F+l)+h.replace(l,N+l.replace("fill-",""))+h;break;case 962:if(h=F+h+(102===h.charCodeAt(5)?S+h:"")+h,c+r===211&&105===h.charCodeAt(13)&&h.indexOf("transform",10)>0)return h.substring(0,h.indexOf(";",27)+1).replace(i,"$1"+F+"$2")+h}return h}function Le(e,a){var c=e.indexOf(1===a?":":"{"),r=e.substring(0,3!==a?c:10),s=e.substring(c+1,e.length-1);return Oe(2!==a?r:r.replace(O,"$1"),s,a)}function Me(e,a){var c=Ke(a,a.charCodeAt(0),a.charCodeAt(1),a.charCodeAt(2));return c!==a+";"?c.replace($," or ($1)").substring(4):"("+a+")"}function Pe(e,a,c,r,s,t,i,f,n,l){for(var o,h=0,u=a;h<ye;++h)switch(o=$e[h].call(Te,e,u,c,r,s,t,i,f,n,l)){case void 0:case false:case true:case null:break;default:u=o;}switch(u){case void 0:case false:case true:case null:case a:break;default:return u}}function Qe(e,a,c,r){for(var s=a+1;s<c;++s)switch(r.charCodeAt(s)){case Z:if(e===T)if(r.charCodeAt(s-1)===T&&a+2!==s)return s+1;break;case I:if(e===Z)return s+1}return s}function Re(e){for(var a in e){var c=e[a];switch(a){case"keyframe":qe=0|c;break;case"global":Ce=0|c;break;case"cascade":ge=0|c;break;case"compress":we=0|c;break;case"semicolon":ve=0|c;break;case"preserve":me=0|c;break;case"prefix":if(Oe=null,!c)Ae=0;else if("function"!=typeof c)Ae=1;else Ae=2,Oe=c;}}return Re}function Te(a,c){if(void 0!==this&&this.constructor===Te)return e(a);var s=a,t=s.charCodeAt(0);if(t<33)t=(s=s.trim()).charCodeAt(0);if(qe>0)De=s.replace(d,t===G?"":"-");if(t=1,1===ge)Ge=s;else Ee=s;var i,f=[Ge];if(ye>0)if(void 0!==(i=Pe(ze,c,f,f,ke,be,0,0,0,0))&&"string"==typeof i)c=i;var n=He(xe,f,c,0,0);if(ye>0)if(void 0!==(i=Pe(je,n,f,f,ke,be,n.length,0,0,0))&&"string"!=typeof(n=i))t=0;return De="",Ge="",Ee="",pe=0,ke=1,be=1,we*t==0?n:n.replace(r,"").replace(g,"").replace(A,"$1").replace(C,"$1").replace(w," ")}if(Te.use=function e(a){switch(a){case void 0:case null:ye=$e.length=0;break;default:switch(a.constructor){case Array:for(var c=0,r=a.length;c<r;++c)e(a[c]);break;case Function:$e[ye++]=a;break;case Boolean:We=0|!!a;}}return e},Te.set=Re,void 0!==a)Re(a);return Te});

  });

  var stylisRuleSheet = createCommonjsModule(function (module, exports) {
  (function (factory) {
  	module['exports'] = factory();
  }(function () {

  	return function (insertRule) {
  		var delimiter = '/*|*/';
  		var needle = delimiter+'}';

  		function toSheet (block) {
  			if (block)
  				try {
  					insertRule(block + '}');
  				} catch (e) {}
  		}

  		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
  			switch (context) {
  				// property
  				case 1:
  					// @import
  					if (depth === 0 && content.charCodeAt(0) === 64)
  						return insertRule(content+';'), ''
  					break
  				// selector
  				case 2:
  					if (ns === 0)
  						return content + delimiter
  					break
  				// at-rule
  				case 3:
  					switch (ns) {
  						// @font-face, @page
  						case 102:
  						case 112:
  							return insertRule(selectors[0]+content), ''
  						default:
  							return content + (at === 0 ? delimiter : '')
  					}
  				case -2:
  					content.split(needle).forEach(toSheet);
  			}
  		}
  	}
  }));
  });

  // 

  var COMMENT_REGEX = /^\s*\/\/.*$/gm;

  // NOTE: This stylis instance is only used to split rules from SSR'd style tags
  var stylisSplitter = new stylis_min({
    global: false,
    cascade: true,
    keyframe: false,
    prefix: false,
    compress: false,
    semicolon: true
  });

  var stylis = new stylis_min({
    global: false,
    cascade: true,
    keyframe: false,
    prefix: true,
    compress: false,
    semicolon: false // NOTE: This means "autocomplete missing semicolons"
  });

  // Wrap `insertRulePlugin to build a list of rules,
  // and then make our own plugin to return the rules. This
  // makes it easier to hook into the existing SSR architecture

  var parsingRules = [];

  // eslint-disable-next-line consistent-return
  var returnRulesPlugin = function returnRulesPlugin(context) {
    if (context === -2) {
      var parsedRules = parsingRules;
      parsingRules = [];
      return parsedRules;
    }
  };

  var parseRulesPlugin = stylisRuleSheet(function (rule) {
    parsingRules.push(rule);
  });

  var _componentId = void 0;
  var _selector = void 0;
  var _selectorRegexp = void 0;

  var selfReferenceReplacer = function selfReferenceReplacer(match, offset, string) {
    if (
    // the first self-ref is always untouched
    offset > 0 &&
    // there should be at least two self-refs to do a replacement (.b > .b)
    string.slice(0, offset).indexOf(_selector) !== -1 &&
    // no consecutive self refs (.b.b); that is a precedence boost and treated differently
    string.slice(offset - _selector.length, offset) !== _selector) {
      return '.' + _componentId;
    }

    return match;
  };

  /**
   * When writing a style like
   *
   * & + & {
   *   color: red;
   * }
   *
   * The second ampersand should be a reference to the static component class. stylis
   * has no knowledge of static class so we have to intelligently replace the base selector.
   */
  var selfReferenceReplacementPlugin = function selfReferenceReplacementPlugin(context, _, selectors) {
    if (context === 2 && selectors.length && selectors[0].lastIndexOf(_selector) > 0) {
      // eslint-disable-next-line no-param-reassign
      selectors[0] = selectors[0].replace(_selectorRegexp, selfReferenceReplacer);
    }
  };

  stylis.use([selfReferenceReplacementPlugin, parseRulesPlugin, returnRulesPlugin]);
  stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);

  var splitByRules = function splitByRules(css) {
    return stylisSplitter('', css);
  };

  function stringifyRules(rules, selector, prefix) {
    var componentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '&';

    var flatCSS = rules.join('').replace(COMMENT_REGEX, ''); // replace JS comments

    var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

    // stylis has no concept of state to be passed to plugins
    // but since JS is single=threaded, we can rely on that to ensure
    // these properties stay in sync with the current stylis run
    _componentId = componentId;
    _selector = selector;
    _selectorRegexp = new RegExp('\\' + _selector + '\\b', 'g');

    return stylis(prefix || !selector ? '' : selector, cssStr);
  }

  // 
  /* eslint-disable camelcase, no-undef */

  var getNonce = (function () {
    return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
  });

  // 
  // Helper to call a given function, only once
  var once = (function (cb) {
    var called = false;

    return function () {
      if (!called) {
        called = true;
        cb();
      }
    };
  });

  // 
  /* These are helpers for the StyleTags to keep track of the injected
   * rule names for each (component) ID that they're keeping track of.
   * They're crucial for detecting whether a name has already been
   * injected.
   * (This excludes rehydrated names) */

  /* adds a new ID:name pairing to a names dictionary */
  var addNameForId = function addNameForId(names, id, name) {
    if (name) {
      // eslint-disable-next-line no-param-reassign
      var namesForId = names[id] || (names[id] = Object.create(null));
      namesForId[name] = true;
    }
  };

  /* resets an ID entirely by overwriting it in the dictionary */
  var resetIdNames = function resetIdNames(names, id) {
    // eslint-disable-next-line no-param-reassign
    names[id] = Object.create(null);
  };

  /* factory for a names dictionary checking the existance of an ID:name pairing */
  var hasNameForId = function hasNameForId(names) {
    return function (id, name) {
      return names[id] !== undefined && names[id][name];
    };
  };

  /* stringifies names for the html/element output */
  var stringifyNames = function stringifyNames(names) {
    var str = '';
    // eslint-disable-next-line guard-for-in
    for (var id in names) {
      str += Object.keys(names[id]).join(' ') + ' ';
    }
    return str.trim();
  };

  /* clones the nested names dictionary */
  var cloneNames = function cloneNames(names) {
    var clone = Object.create(null);
    // eslint-disable-next-line guard-for-in
    for (var id in names) {
      clone[id] = _extends({}, names[id]);
    }
    return clone;
  };

  //

  // 

  /* this marker separates component styles and is important for rehydration */
  var makeTextMarker = function makeTextMarker(id) {
    return '\n/* sc-component-id: ' + id + ' */\n';
  };

  /* create a new style tag after lastEl */
  var makeStyleTag = function makeStyleTag(target, tagEl, insertBefore) {
    var el = document.createElement('style');
    el.setAttribute(SC_ATTR, '');
    el.setAttribute(SC_VERSION_ATTR, "4.0.2");

    var nonce = getNonce();
    if (nonce) {
      el.setAttribute('nonce', nonce);
    }

    /* Work around insertRule quirk in EdgeHTML */
    el.appendChild(document.createTextNode(''));

    if (target && !tagEl) {
      /* Append to target when no previous element was passed */
      target.appendChild(el);
    } else {
      if (!tagEl || !target || !tagEl.parentNode) {
        throw new StyledComponentsError(6);
      }

      /* Insert new style tag after the previous one */
      tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
    }

    return el;
  };

  /* takes a css factory function and outputs an html styled tag factory */
  var wrapAsHtmlTag = function wrapAsHtmlTag(css, names) {
    return function (additionalAttrs) {
      var nonce = getNonce();
      var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', SC_VERSION_ATTR + '="' + "4.0.2" + '"', additionalAttrs];

      var htmlAttr = attrs.filter(Boolean).join(' ');
      return '<style ' + htmlAttr + '>' + css() + '</style>';
    };
  };

  /* takes a css factory function and outputs an element factory */
  var wrapAsElement = function wrapAsElement(css, names) {
    return function () {
      var _props;

      var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props[SC_VERSION_ATTR] = "4.0.2", _props);

      var nonce = getNonce();
      if (nonce) {
        // $FlowFixMe
        props.nonce = nonce;
      }

      // eslint-disable-next-line react/no-danger
      return React__default.createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: css() } }));
    };
  };

  var getIdsFromMarkersFactory = function getIdsFromMarkersFactory(markers) {
    return function () {
      return Object.keys(markers);
    };
  };

  var makeTextNode = function makeTextNode(id) {
    return document.createTextNode(makeTextMarker(id));
  };

  var makeBrowserTag = function makeBrowserTag(el, getImportRuleTag) {
    var names = Object.create(null);
    var markers = Object.create(null);

    var extractImport = getImportRuleTag !== undefined;

    /* indicates whther getImportRuleTag was called */
    var usedImportRuleTag = false;

    var insertMarker = function insertMarker(id) {
      var prev = markers[id];
      if (prev !== undefined) {
        return prev;
      }

      markers[id] = makeTextNode(id);
      el.appendChild(markers[id]);
      names[id] = Object.create(null);

      return markers[id];
    };

    var insertRules = function insertRules(id, cssRules, name) {
      var marker = insertMarker(id);
      var importRules = [];
      var cssRulesSize = cssRules.length;

      for (var i = 0; i < cssRulesSize; i += 1) {
        var rule = cssRules[i];
        var mayHaveImport = extractImport;
        if (mayHaveImport && rule.indexOf('@import') !== -1) {
          importRules.push(rule);
        } else {
          mayHaveImport = false;
          var separator = i === cssRulesSize - 1 ? '' : ' ';
          marker.appendData('' + rule + separator);
        }
      }

      addNameForId(names, id, name);

      if (extractImport && importRules.length > 0) {
        usedImportRuleTag = true;
        // $FlowFixMe
        getImportRuleTag().insertRules(id + '-import', importRules);
      }
    };

    var removeRules = function removeRules(id) {
      var marker = markers[id];
      if (marker === undefined) return;

      /* create new empty text node and replace the current one */
      var newMarker = makeTextNode(id);
      el.replaceChild(newMarker, marker);
      markers[id] = newMarker;
      resetIdNames(names, id);

      if (extractImport && usedImportRuleTag) {
        // $FlowFixMe
        getImportRuleTag().removeRules(id + '-import');
      }
    };

    var css = function css() {
      var str = '';

      // eslint-disable-next-line guard-for-in
      for (var id in markers) {
        str += markers[id].data;
      }

      return str;
    };

    return {
      clone: function clone() {
        throw new StyledComponentsError(5);
      },

      css: css,
      getIds: getIdsFromMarkersFactory(markers),
      hasNameForId: hasNameForId(names),
      insertMarker: insertMarker,
      insertRules: insertRules,
      removeRules: removeRules,
      sealed: false,
      styleTag: el,
      toElement: wrapAsElement(css, names),
      toHTML: wrapAsHtmlTag(css, names)
    };
  };

  var makeServerTag = function makeServerTag(namesArg, markersArg) {
    var names = namesArg === undefined ? Object.create(null) : namesArg;
    var markers = markersArg === undefined ? Object.create(null) : markersArg;

    var insertMarker = function insertMarker(id) {
      var prev = markers[id];
      if (prev !== undefined) {
        return prev;
      }

      return markers[id] = [''];
    };

    var insertRules = function insertRules(id, cssRules, name) {
      var marker = insertMarker(id);
      marker[0] += cssRules.join(' ');
      addNameForId(names, id, name);
    };

    var removeRules = function removeRules(id) {
      var marker = markers[id];
      if (marker === undefined) return;
      marker[0] = '';
      resetIdNames(names, id);
    };

    var css = function css() {
      var str = '';
      // eslint-disable-next-line guard-for-in
      for (var id in markers) {
        var cssForId = markers[id][0];
        if (cssForId) {
          str += makeTextMarker(id) + cssForId;
        }
      }
      return str;
    };

    var clone = function clone() {
      var namesClone = cloneNames(names);
      var markersClone = Object.create(null);

      // eslint-disable-next-line guard-for-in
      for (var id in markers) {
        markersClone[id] = [markers[id][0]];
      }

      return makeServerTag(namesClone, markersClone);
    };

    var tag = {
      clone: clone,
      css: css,
      getIds: getIdsFromMarkersFactory(markers),
      hasNameForId: hasNameForId(names),
      insertMarker: insertMarker,
      insertRules: insertRules,
      removeRules: removeRules,
      sealed: false,
      styleTag: null,
      toElement: wrapAsElement(css, names),
      toHTML: wrapAsHtmlTag(css, names)
    };

    return tag;
  };

  var makeTag = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
    if (IS_BROWSER && !forceServer) {
      var el = makeStyleTag(target, tagEl, insertBefore);

      {
        return makeBrowserTag(el, getImportRuleTag);
      }
    }

    return makeServerTag();
  };

  /* wraps a given tag so that rehydration is performed once when necessary */
  var makeRehydrationTag = function makeRehydrationTag(tag, els, extracted, immediateRehydration) {
    /* rehydration function that adds all rules to the new tag */
    var rehydrate = once(function () {
      /* add all extracted components to the new tag */
      for (var i = 0, len = extracted.length; i < len; i += 1) {
        var _extracted$i = extracted[i],
            componentId = _extracted$i.componentId,
            cssFromDOM = _extracted$i.cssFromDOM;

        var cssRules = splitByRules(cssFromDOM);
        tag.insertRules(componentId, cssRules);
      }

      /* remove old HTMLStyleElements, since they have been rehydrated */
      for (var _i = 0, _len = els.length; _i < _len; _i += 1) {
        var el = els[_i];
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
    });

    if (immediateRehydration) rehydrate();

    return _extends({}, tag, {

      /* add rehydration hook to methods */
      insertMarker: function insertMarker(id) {
        rehydrate();
        return tag.insertMarker(id);
      },

      insertRules: function insertRules(id, cssRules, name) {
        rehydrate();
        return tag.insertRules(id, cssRules, name);
      },

      removeRules: function removeRules(id) {
        rehydrate();
        return tag.removeRules(id);
      }
    });
  };

  // 

  var SPLIT_REGEX = /\s+/;

  /* determine the maximum number of components before tags are sharded */
  var MAX_SIZE = void 0;
  if (IS_BROWSER) {
    /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
    MAX_SIZE = 40;
  } else {
    /* for servers we do not need to shard at all */
    MAX_SIZE = -1;
  }

  var sheetRunningId = 0;
  var master = void 0;

  var StyleSheet = function () {

    /* a map from ids to tags */

    /* deferred rules for a given id */

    /* this is used for not reinjecting rules via hasNameForId() */

    /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */

    /* a list of tags belonging to this StyleSheet */

    /* a tag for import rules */

    /* current capacity until a new tag must be created */

    /* children (aka clones) of this StyleSheet inheriting all and future injections */

    function StyleSheet() {
      var _this = this;

      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER ? document.head : null;
      var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      classCallCheck(this, StyleSheet);

      this.getImportRuleTag = function () {
        var importRuleTag = _this.importRuleTag;

        if (importRuleTag !== undefined) {
          return importRuleTag;
        }

        var firstTag = _this.tags[0];
        var insertBefore = true;

        return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
      };

      sheetRunningId += 1;
      this.id = sheetRunningId;
      this.forceServer = forceServer;
      this.target = forceServer ? null : target;
      this.tagMap = {};
      this.deferred = {};
      this.rehydratedNames = {};
      this.ignoreRehydratedNames = {};
      this.tags = [];
      this.capacity = 1;
      this.clones = [];
    }

    /* rehydrate all SSR'd style tags */


    StyleSheet.prototype.rehydrate = function rehydrate() {
      if (!IS_BROWSER || this.forceServer) {
        return this;
      }
      var els = [];
      var extracted = [];
      var isStreamed = false;

      /* retrieve all of our SSR style elements from the DOM */
      var nodes = document.querySelectorAll('style[' + SC_ATTR + '][' + SC_VERSION_ATTR + '="' + "4.0.2" + '"]');
      var nodesSize = nodes.length;

      /* abort rehydration if no previous style tags were found */
      if (nodesSize === 0) {
        return this;
      }

      for (var i = 0; i < nodesSize; i += 1) {
        // $FlowFixMe: We can trust that all elements in this query are style elements
        var el = nodes[i];

        /* check if style tag is a streamed tag */
        if (!isStreamed) isStreamed = !!el.getAttribute(SC_STREAM_ATTR);

        /* retrieve all component names */
        var elNames = (el.getAttribute(SC_ATTR) || '').trim().split(SPLIT_REGEX);
        var elNamesSize = elNames.length;
        for (var j = 0; j < elNamesSize; j += 1) {
          var name = elNames[j];
          /* add rehydrated name to sheet to avoid readding styles */
          this.rehydratedNames[name] = true;
        }

        /* extract all components and their CSS */
        extracted.push.apply(extracted, extractComps(el.textContent));

        /* store original HTMLStyleElement */
        els.push(el);
      }

      /* abort rehydration if nothing was extracted */
      var extractedSize = extracted.length;
      if (extractedSize === 0) {
        return this;
      }

      /* create a tag to be used for rehydration */
      var tag = this.makeTag(null);
      var rehydrationTag = makeRehydrationTag(tag, els, extracted, isStreamed);

      /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */
      this.capacity = Math.max(1, MAX_SIZE - extractedSize);
      this.tags.push(rehydrationTag);

      /* retrieve all component ids */
      for (var _j = 0; _j < extractedSize; _j += 1) {
        this.tagMap[extracted[_j].componentId] = rehydrationTag;
      }

      return this;
    };

    /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
     * The master StyleSheet is targeted by createGlobalStyle, keyframes, and components outside of any
      * StyleSheetManager's context */


    /* reset the internal "master" instance */
    StyleSheet.reset = function reset() {
      var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      master = new StyleSheet(undefined, forceServer).rehydrate();
    };

    /* adds "children" to the StyleSheet that inherit all of the parents' rules
     * while their own rules do not affect the parent */


    StyleSheet.prototype.clone = function clone() {
      var sheet = new StyleSheet(this.target, this.forceServer);

      /* add to clone array */
      this.clones.push(sheet);

      /* clone all tags */
      sheet.tags = this.tags.map(function (tag) {
        var ids = tag.getIds();
        var newTag = tag.clone();

        /* reconstruct tagMap */
        for (var i = 0; i < ids.length; i += 1) {
          sheet.tagMap[ids[i]] = newTag;
        }

        return newTag;
      });

      /* clone other maps */
      sheet.rehydratedNames = _extends({}, this.rehydratedNames);
      sheet.deferred = _extends({}, this.deferred);

      return sheet;
    };

    /* force StyleSheet to create a new tag on the next injection */


    StyleSheet.prototype.sealAllTags = function sealAllTags() {
      this.capacity = 1;

      this.tags.forEach(function (tag) {
        // eslint-disable-next-line no-param-reassign
        tag.sealed = true;
      });
    };

    StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
      var lastEl = tag ? tag.styleTag : null;
      var insertBefore = false;

      return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
    };

    /* get a tag for a given componentId, assign the componentId to one, or shard */
    StyleSheet.prototype.getTagForId = function getTagForId(id) {
      /* simply return a tag, when the componentId was already assigned one */
      var prev = this.tagMap[id];
      if (prev !== undefined && !prev.sealed) {
        return prev;
      }

      var tag = this.tags[this.tags.length - 1];

      /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */
      this.capacity -= 1;

      if (this.capacity === 0) {
        this.capacity = MAX_SIZE;
        tag = this.makeTag(tag);
        this.tags.push(tag);
      }

      return this.tagMap[id] = tag;
    };

    /* mainly for createGlobalStyle to check for its id */


    StyleSheet.prototype.hasId = function hasId(id) {
      return this.tagMap[id] !== undefined;
    };

    /* caching layer checking id+name to already have a corresponding tag and injected rules */


    StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
      /* exception for rehydrated names which are checked separately */
      if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
        return true;
      }

      var tag = this.tagMap[id];
      return tag !== undefined && tag.hasNameForId(id, name);
    };

    /* registers a componentId and registers it on its tag */


    StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
      /* don't inject when the id is already registered */
      if (this.tagMap[id] !== undefined) return;

      var clones = this.clones;

      for (var i = 0; i < clones.length; i += 1) {
        clones[i].deferredInject(id, cssRules);
      }

      this.getTagForId(id).insertMarker(id);
      this.deferred[id] = cssRules;
    };

    /* injects rules for a given id with a name that will need to be cached */


    StyleSheet.prototype.inject = function inject(id, cssRules, name) {
      var clones = this.clones;


      for (var i = 0; i < clones.length; i += 1) {
        clones[i].inject(id, cssRules, name);
      }

      var tag = this.getTagForId(id);

      /* add deferred rules for component */
      if (this.deferred[id] !== undefined) {
        // Combine passed cssRules with previously deferred CSS rules
        // NOTE: We cannot mutate the deferred array itself as all clones
        // do the same (see clones[i].inject)
        var rules = this.deferred[id].concat(cssRules);
        tag.insertRules(id, rules, name);

        this.deferred[id] = undefined;
      } else {
        tag.insertRules(id, cssRules, name);
      }
    };

    /* removes all rules for a given id, which doesn't remove its marker but resets it */


    StyleSheet.prototype.remove = function remove(id) {
      var tag = this.tagMap[id];
      if (tag === undefined) return;

      var clones = this.clones;

      for (var i = 0; i < clones.length; i += 1) {
        clones[i].remove(id);
      }

      /* remove all rules from the tag */
      tag.removeRules(id);

      /* ignore possible rehydrated names */
      this.ignoreRehydratedNames[id] = true;

      /* delete possible deferred rules */
      this.deferred[id] = undefined;
    };

    StyleSheet.prototype.toHTML = function toHTML() {
      return this.tags.map(function (tag) {
        return tag.toHTML();
      }).join('');
    };

    StyleSheet.prototype.toReactElements = function toReactElements() {
      var id = this.id;


      return this.tags.map(function (tag, i) {
        var key = 'sc-' + id + '-' + i;
        return React.cloneElement(tag.toElement(), { key: key });
      });
    };

    createClass(StyleSheet, null, [{
      key: 'master',
      get: function get$$1() {
        return master || (master = new StyleSheet().rehydrate());
      }

      /* NOTE: This is just for backwards-compatibility with jest-styled-components */

    }, {
      key: 'instance',
      get: function get$$1() {
        return StyleSheet.master;
      }
    }]);
    return StyleSheet;
  }();

  // 

  var Keyframes = function () {
    function Keyframes(name, rules) {
      var _this = this;

      classCallCheck(this, Keyframes);

      this.inject = function (styleSheet) {
        if (!styleSheet.hasNameForId(_this.id, _this.name)) {
          styleSheet.inject(_this.id, _this.rules, _this.name);
        }
      };

      this.toString = function () {
        throw new StyledComponentsError(12, String(_this.name));
      };

      this.name = name;
      this.rules = rules;

      this.id = 'sc-keyframes-' + name;
    }

    Keyframes.prototype.getName = function getName() {
      return this.name;
    };

    return Keyframes;
  }();

  // 

  /**
   * inlined version of
   * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
   */

  var uppercasePattern = /([A-Z])/g;
  var msPattern = /^ms-/;

  /**
   * Hyphenates a camelcased CSS property name, for example:
   *
   *   > hyphenateStyleName('backgroundColor')
   *   < "background-color"
   *   > hyphenateStyleName('MozTransition')
   *   < "-moz-transition"
   *   > hyphenateStyleName('msTransition')
   *   < "-ms-transition"
   *
   * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
   * is converted to `-ms-`.
   *
   * @param {string} string
   * @return {string}
   */
  function hyphenateStyleName(string) {
    return string.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
  }

  // 

  var objToCss = function objToCss(obj, prevKey) {
    var css = Object.keys(obj).filter(function (key) {
      var chunk = obj[key];
      return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
    }).map(function (key) {
      if (isPlainObject(obj[key])) return objToCss(obj[key], key);
      return hyphenateStyleName(key) + ': ' + obj[key] + ';';
    }).join(' ');
    return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
  };

  /**
   * It's falsish not falsy because 0 is allowed.
   */
  var isFalsish = function isFalsish(chunk) {
    return chunk === undefined || chunk === null || chunk === false || chunk === '';
  };

  function flatten(chunk, executionContext, styleSheet) {
    if (Array.isArray(chunk)) {
      var ruleSet = [];

      for (var i = 0, len = chunk.length, result; i < len; i += 1) {
        result = flatten(chunk[i], executionContext, styleSheet);

        if (result === null) continue;else if (Array.isArray(result)) ruleSet.push.apply(ruleSet, result);else ruleSet.push(result);
      }

      return ruleSet;
    }

    if (isFalsish(chunk)) {
      return null;
    }

    /* Handle other components */
    if (isStyledComponent(chunk)) {
      return '.' + chunk.styledComponentId;
    }

    /* Either execute or defer the function */
    if (isFunction(chunk)) {
      if (executionContext) {
        {
          /* Warn if not referring styled component */
          try {
            // eslint-disable-next-line new-cap
            if (reactIs_1(new chunk(executionContext))) {
              console.warn(getComponentName(chunk) + ' is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.');
            }
            // eslint-disable-next-line no-empty
          } catch (e) {}
        }

        return flatten(chunk(executionContext), executionContext, styleSheet);
      } else return chunk;
    }

    if (chunk instanceof Keyframes) {
      if (styleSheet) {
        chunk.inject(styleSheet);
        return chunk.getName();
      } else return chunk;
    }

    /* Handle objects */
    return isPlainObject(chunk) ? objToCss(chunk) : chunk.toString();
  }

  // 

  function css(styles) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    if (isFunction(styles) || isPlainObject(styles)) {
      // $FlowFixMe
      return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
    }

    // $FlowFixMe
    return flatten(interleave(styles, interpolations));
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};

    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );

          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  var checkPropTypes_1 = checkPropTypes;

  var printWarning$1 = function() {};

  {
    printWarning$1 = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if (typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning$1(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        printWarning$1('Invalid argument supplied to oneOf, expected an instance of array.');
        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (propValue.hasOwnProperty(key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.');
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning$1(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = objectAssign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
      Symbol.for &&
      Symbol.for('react.element')) ||
      0xeac7;

    var isValidElement = function(object) {
      return typeof object === 'object' &&
        object !== null &&
        object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
  }
  });

  // 

  function isStaticRules(rules, attrs) {
    for (var i = 0; i < rules.length; i += 1) {
      var rule = rules[i];

      // recursive case
      if (Array.isArray(rule) && !isStaticRules(rule)) {
        return false;
      } else if (isFunction(rule) && !isStyledComponent(rule)) {
        // functions are allowed to be static if they're just being
        // used to get the classname of a nested styled component
        return false;
      }
    }

    if (attrs !== undefined) {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (var key in attrs) {
        var value = attrs[key];
        if (isFunction(value)) {
          return false;
        }
      }
    }

    return true;
  }

  // 

  var GlobalStyle = function () {
    function GlobalStyle(rules, componentId) {
      classCallCheck(this, GlobalStyle);

      this.rules = rules;
      this.componentId = componentId;
      this.isStatic = isStaticRules(rules);

      if (!StyleSheet.master.hasId(componentId)) {
        StyleSheet.master.deferredInject(componentId, []);
      }
    }

    GlobalStyle.prototype.createStyles = function createStyles(executionContext, styleSheet) {
      var flatCSS = flatten(this.rules, executionContext, styleSheet);
      var css = stringifyRules(flatCSS, '');

      styleSheet.inject(this.componentId, css);
    };

    GlobalStyle.prototype.removeStyles = function removeStyles(styleSheet) {
      var componentId = this.componentId;

      if (styleSheet.hasId(componentId)) {
        styleSheet.remove(componentId);
      }
    };

    // TODO: overwrite in-place instead of remove+create?


    GlobalStyle.prototype.renderStyles = function renderStyles(executionContext, styleSheet) {
      this.removeStyles(styleSheet);
      this.createStyles(executionContext, styleSheet);
    };

    return GlobalStyle;
  }();

  var simpleIsEqual = function simpleIsEqual(a, b) {
    return a === b;
  };

  function index (resultFn, isEqual) {
    if (isEqual === void 0) {
      isEqual = simpleIsEqual;
    }

    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;

    var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
      return isEqual(newArg, lastArgs[index]);
    };

    var result = function result() {
      for (var _len = arguments.length, newArgs = new Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
        return lastResult;
      }

      lastResult = resultFn.apply(this, newArgs);
      calledOnce = true;
      lastThis = this;
      lastArgs = newArgs;
      return lastResult;
    };

    return result;
  }

  // 

  var ServerStyleSheet = function () {
    function ServerStyleSheet() {
      classCallCheck(this, ServerStyleSheet);

      /* The master sheet might be reset, so keep a reference here */
      this.masterSheet = StyleSheet.master;
      this.instance = this.masterSheet.clone();
      this.sealed = false;
    }

    /**
     * Mark the ServerStyleSheet as being fully emitted and manually GC it from the
     * StyleSheet singleton.
     */


    ServerStyleSheet.prototype.seal = function seal() {
      if (!this.sealed) {
        /* Remove sealed StyleSheets from the master sheet */
        var index = this.masterSheet.clones.indexOf(this.instance);
        this.masterSheet.clones.splice(index, 1);
        this.sealed = true;
      }
    };

    ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
      if (this.sealed) {
        throw new StyledComponentsError(2);
      }

      return React__default.createElement(
        StyleSheetManager,
        { sheet: this.instance },
        children
      );
    };

    ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
      this.seal();
      return this.instance.toHTML();
    };

    ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
      this.seal();
      return this.instance.toReactElements();
    };

    ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
      var _this = this;

      {
        throw new StyledComponentsError(3);
      }

      /* the tag index keeps track of which tags have already been emitted */
      var instance = this.instance;

      var instanceTagIndex = 0;

      var streamAttr = SC_STREAM_ATTR + '="true"';

      var transformer = new stream.Transform({
        transform: function appendStyleChunks(chunk, /* encoding */_, callback) {
          var tags = instance.tags;

          var html = '';

          /* retrieve html for each new style tag */
          for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
            var tag = tags[instanceTagIndex];
            html += tag.toHTML(streamAttr);
          }

          /* force our StyleSheets to emit entirely new tags */
          instance.sealAllTags();

          /* prepend style html to chunk */
          this.push(html + chunk);
          callback();
        }
      });

      readableStream.on('end', function () {
        return _this.seal();
      });
      readableStream.on('error', function (err) {
        _this.seal();

        // forward the error to the transform stream
        transformer.emit('error', err);
      });

      return readableStream.pipe(transformer);
    };

    return ServerStyleSheet;
  }();

  // 

  var StyleSheetContext = React.createContext();

  var StyleSheetConsumer = StyleSheetContext.Consumer;

  var StyleSheetManager = function (_Component) {
    inherits(StyleSheetManager, _Component);

    function StyleSheetManager(props) {
      classCallCheck(this, StyleSheetManager);

      var _this = possibleConstructorReturn(this, _Component.call(this, props));

      _this.getContext = index(_this.getContext);
      return _this;
    }

    StyleSheetManager.prototype.getContext = function getContext(sheet, target) {
      if (sheet) {
        return sheet;
      } else if (target) {
        return new StyleSheet(target);
      } else {
        throw new StyledComponentsError(4);
      }
    };

    StyleSheetManager.prototype.render = function render() {
      var _props = this.props,
          children = _props.children,
          sheet = _props.sheet,
          target = _props.target;

      var context = this.getContext(sheet, target);
      return React__default.createElement(
        StyleSheetContext.Provider,
        { value: context },
        React__default.Children.only(children)
      );
    };

    return StyleSheetManager;
  }(React.Component);
  StyleSheetManager.propTypes = {
    sheet: propTypes.oneOfType([propTypes.instanceOf(StyleSheet), propTypes.instanceOf(ServerStyleSheet)]),

    target: propTypes.shape({
      appendChild: propTypes.func.isRequired
    })
  };

  // 

  var determineTheme = (function (props, fallbackTheme) {
    var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;

    // Props should take precedence over ThemeProvider, which should take precedence over
    // defaultProps, but React automatically puts defaultProps on props.

    /* eslint-disable react/prop-types, flowtype-errors/show-errors */
    var isDefaultTheme = defaultProps ? props.theme === defaultProps.theme : false;
    var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme || defaultProps.theme;
    /* eslint-enable */

    return theme;
  });

  // 

  var ThemeContext = React.createContext();

  var ThemeConsumer = ThemeContext.Consumer;

  /**
   * Provide a theme to an entire react component tree via context
   */

  var ThemeProvider = function (_Component) {
    inherits(ThemeProvider, _Component);

    function ThemeProvider(props) {
      classCallCheck(this, ThemeProvider);

      var _this = possibleConstructorReturn(this, _Component.call(this, props));

      _this.getContext = index(_this.getContext.bind(_this));
      _this.renderInner = _this.renderInner.bind(_this);
      return _this;
    }

    ThemeProvider.prototype.render = function render() {
      if (!this.props.children) return null;

      return React__default.createElement(
        ThemeContext.Consumer,
        null,
        this.renderInner
      );
    };

    ThemeProvider.prototype.renderInner = function renderInner(outerTheme) {
      var context = this.getContext(this.props.theme, outerTheme);

      return React__default.createElement(
        ThemeContext.Provider,
        { value: context },
        React__default.Children.only(this.props.children)
      );
    };

    /**
     * Get the theme from the props, supporting both (outerTheme) => {}
     * as well as object notation
     */


    ThemeProvider.prototype.getTheme = function getTheme(theme, outerTheme) {
      if (isFunction(theme)) {
        var mergedTheme = theme(outerTheme);

        if (mergedTheme === null || Array.isArray(mergedTheme) || (typeof mergedTheme === 'undefined' ? 'undefined' : _typeof(mergedTheme)) !== 'object') {
          throw new StyledComponentsError(7);
        }

        return mergedTheme;
      }

      if (theme === null || Array.isArray(theme) || (typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) !== 'object') {
        throw new StyledComponentsError(8);
      }

      return _extends({}, outerTheme, theme);
    };

    ThemeProvider.prototype.getContext = function getContext(theme, outerTheme) {
      return this.getTheme(theme, outerTheme);
    };

    return ThemeProvider;
  }(React.Component);

  // 
  // Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
  function murmurhash(c) {
    for (var e = c.length | 0, a = e | 0, d = 0, b; e >= 4;) {
      b = c.charCodeAt(d) & 255 | (c.charCodeAt(++d) & 255) << 8 | (c.charCodeAt(++d) & 255) << 16 | (c.charCodeAt(++d) & 255) << 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), b ^= b >>> 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16) ^ b, e -= 4, ++d;
    }
    switch (e) {
      case 3:
        a ^= (c.charCodeAt(d + 2) & 255) << 16;
      case 2:
        a ^= (c.charCodeAt(d + 1) & 255) << 8;
      case 1:
        a ^= c.charCodeAt(d) & 255, a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
    }
    a ^= a >>> 13;
    a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
    return (a ^ a >>> 15) >>> 0;
  }

  // 

  // place our cache into shared context so it'll persist between HMRs
  if (IS_BROWSER) {
    window.scCGSHMRCache = {};
  }

  function createGlobalStyle(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var id = 'sc-global-' + murmurhash(JSON.stringify(rules));
    var style = new GlobalStyle(rules, id);

    var GlobalStyleComponent = function (_React$Component) {
      inherits(GlobalStyleComponent, _React$Component);

      function GlobalStyleComponent() {
        classCallCheck(this, GlobalStyleComponent);

        var _this = possibleConstructorReturn(this, _React$Component.call(this));

        var _this$constructor = _this.constructor,
            globalStyle = _this$constructor.globalStyle,
            styledComponentId = _this$constructor.styledComponentId;


        if (IS_BROWSER) {
          window.scCGSHMRCache[styledComponentId] = (window.scCGSHMRCache[styledComponentId] || 0) + 1;
        }

        /**
         * This fixes HMR compatiblility. Don't ask me why, but this combination of
         * caching the closure variables via statics and then persisting the statics in
         * state works across HMR where no other combination did. ¯\_(ツ)_/¯
         */
        _this.state = {
          globalStyle: globalStyle,
          styledComponentId: styledComponentId
        };
        return _this;
      }

      GlobalStyleComponent.prototype.componentDidMount = function componentDidMount() {
        if (IS_BROWSER && window.scCGSHMRCache[this.state.styledComponentId] > 1 && !this.props.suppressMultiMountWarning) {
          console.warn('The global style component ' + this.state.styledComponentId + ' was composed and rendered multiple times in your React component tree. Only the last-rendered copy will have its styles remain in <head> (or your StyleSheetManager target.)');
        }
      };

      GlobalStyleComponent.prototype.componentWillUnmount = function componentWillUnmount() {
        if (window.scCGSHMRCache[this.state.styledComponentId]) {
          window.scCGSHMRCache[this.state.styledComponentId] -= 1;
        }
        /**
         * Depending on the order "render" is called this can cause the styles to be lost
         * until the next render pass of the remaining instance, which may
         * not be immediate.
         */
        if (window.scCGSHMRCache[this.state.styledComponentId] === 0) {
          this.state.globalStyle.removeStyles(this.styleSheet);
        }
      };

      GlobalStyleComponent.prototype.render = function render() {
        var _this2 = this;

        if (React__default.Children.count(this.props.children)) {
          console.warn('The global style component ' + this.state.styledComponentId + ' was given child JSX. createGlobalStyle does not render children.');
        }

        return React__default.createElement(
          StyleSheetConsumer,
          null,
          function (styleSheet) {
            _this2.styleSheet = styleSheet || StyleSheet.master;

            var globalStyle = _this2.state.globalStyle;


            if (globalStyle.isStatic) {
              globalStyle.renderStyles(STATIC_EXECUTION_CONTEXT, _this2.styleSheet);

              return null;
            } else {
              return React__default.createElement(
                ThemeConsumer,
                null,
                function (theme) {
                  var defaultProps = _this2.constructor.defaultProps;


                  var context = _extends({}, _this2.props);

                  if (typeof theme !== 'undefined') {
                    context.theme = determineTheme(_this2.props, theme, defaultProps);
                  }

                  globalStyle.renderStyles(context, _this2.styleSheet);

                  return null;
                }
              );
            }
          }
        );
      };

      return GlobalStyleComponent;
    }(React__default.Component);

    GlobalStyleComponent.defaultProps = {
      suppressMultiMountWarning: false
    };
    GlobalStyleComponent.globalStyle = style;
    GlobalStyleComponent.styledComponentId = id;
    GlobalStyleComponent.propTypes = {
      suppressMultiMountWarning: propTypes.bool
    };


    return GlobalStyleComponent;
  }

  // 
  /* eslint-disable no-bitwise */

  /* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
   * counterparts */
  var charsLength = 52;

  /* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
  var getAlphabeticChar = function getAlphabeticChar(code) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
  };

  /* input a number, usually a hash and convert it to base-52 */
  function generateAlphabeticName(code) {
    var name = '';
    var x = void 0;

    /* get a char and divide by alphabet-length */
    for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
      name = getAlphabeticChar(x % charsLength) + name;
    }

    return getAlphabeticChar(x % charsLength) + name;
  }

  // 

  var replaceWhitespace = function replaceWhitespace(str) {
    return str.replace(/\s|\\n/g, '');
  };

  function keyframes(strings) {
    /* Warning if you've used keyframes on React Native */
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      console.warn('`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.');
    }

    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));

    var name = generateAlphabeticName(murmurhash(replaceWhitespace(JSON.stringify(rules))));

    return new Keyframes(name, stringifyRules(rules, name, '@keyframes'));
  }

  var _TYPE_STATICS;

  var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDerivedStateFromProps: true,
    propTypes: true,
    type: true
  };

  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };

  var TYPE_STATICS = (_TYPE_STATICS = {}, _TYPE_STATICS[reactIs_3] = {
    $$typeof: true,
    render: true
  }, _TYPE_STATICS);

  var defineProperty$1 = Object.defineProperty,
      getOwnPropertyNames = Object.getOwnPropertyNames,
      _Object$getOwnPropert = Object.getOwnPropertySymbols,
      getOwnPropertySymbols$1 = _Object$getOwnPropert === undefined ? function () {
    return [];
  } : _Object$getOwnPropert,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
      getPrototypeOf = Object.getPrototypeOf,
      objectPrototype = Object.prototype;
  var arrayPrototype = Array.prototype;


  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components

      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }

      var keys = arrayPrototype.concat(getOwnPropertyNames(sourceComponent),
      // $FlowFixMe
      getOwnPropertySymbols$1(sourceComponent));

      var targetStatics = TYPE_STATICS[targetComponent.$$typeof] || REACT_STATICS;

      var sourceStatics = TYPE_STATICS[sourceComponent.$$typeof] || REACT_STATICS;

      var i = keys.length;
      var descriptor = void 0;
      var key = void 0;

      // eslint-disable-next-line no-plusplus
      while (i--) {
        key = keys[i];

        if (
        // $FlowFixMe
        !KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) &&
        // $FlowFixMe
        !(targetStatics && targetStatics[key])) {
          descriptor = getOwnPropertyDescriptor(sourceComponent, key);

          if (descriptor) {
            try {
              // Avoid failures from read-only properties
              defineProperty$1(targetComponent, key, descriptor);
            } catch (e) {
              /* fail silently */
            }
          }
        }
      }

      return targetComponent;
    }

    return targetComponent;
  }

  // 

  var withTheme = (function (Component) {
    var WithTheme = React__default.forwardRef(function (props, ref) {
      return React__default.createElement(
        ThemeConsumer,
        null,
        function (theme) {
          // $FlowFixMe
          var defaultProps = Component.defaultProps;

          var themeProp = determineTheme(props, theme, defaultProps);

          if (themeProp === undefined) {
            // eslint-disable-next-line no-console
            console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class ' + getComponentName(Component));
          }

          return React__default.createElement(Component, _extends({}, props, { theme: themeProp, ref: ref }));
        }
      );
    });

    hoistNonReactStatics(WithTheme, Component);

    WithTheme.displayName = 'WithTheme(' + getComponentName(Component) + ')';

    return WithTheme;
  });

  // 

  /* eslint-disable */
  var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
    StyleSheet: StyleSheet
  };

  // 

  /* Warning if you've imported this file on React Native */
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    // eslint-disable-next-line no-console
    console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
  }

  /* Warning if there are several instances of styled-components */
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Node.js') === -1 && navigator.userAgent.indexOf('jsdom') === -1) {
    window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

    if (window['__styled-components-init__'] === 1) {
      // eslint-disable-next-line no-console
      console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process ' + 'and makes your application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
    }

    window['__styled-components-init__'] += 1;
  }

  var secondary = /*#__PURE__*/Object.freeze({
    css: css,
    keyframes: keyframes,
    createGlobalStyle: createGlobalStyle,
    isStyledComponent: isStyledComponent,
    ThemeConsumer: ThemeConsumer,
    ThemeProvider: ThemeProvider,
    withTheme: withTheme,
    ServerStyleSheet: ServerStyleSheet,
    StyleSheetManager: StyleSheetManager,
    __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS: __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS
  });

  // 

  function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;

    if (!reactIs_2(tag)) {
      throw new StyledComponentsError(1, String(tag));
    }

    /* This is callable directly as a template function */
    // $FlowFixMe: Not typed to avoid destructuring arguments
    var templateFunction = function templateFunction() {
      return componentConstructor(tag, options, css.apply(undefined, arguments));
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || EMPTY_OBJECT, attrs)
      }));
    };

    return templateFunction;
  }

  function memoize(fn) {
    var cache = {};
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class)|(on[A-Z].*)|((data|aria|x)-.*))$/i;
  var index$1 = memoize(reactPropsRegex.test.bind(reactPropsRegex));

  //

  // 

  var isHMREnabled = typeof module !== 'undefined' && module.hot;

  /* combines hashStr (murmurhash) and nameGenerator for convenience */
  var hasher = function hasher(str) {
    return generateAlphabeticName(murmurhash(str));
  };

  /*
   ComponentStyle is all the CSS-specific stuff, not
   the React-specific stuff.
   */

  var ComponentStyle = function () {
    function ComponentStyle(rules, attrs, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.isStatic = !isHMREnabled && isStaticRules(rules, attrs);
      this.componentId = componentId;

      if (!StyleSheet.master.hasId(componentId)) {
        var placeholder = ['.' + componentId + ' {}'];

        StyleSheet.master.deferredInject(componentId, placeholder);
      }
    }

    /*
       * Flattens a rule set into valid CSS
       * Hashes it, wraps the whole chunk in a .hash1234 {}
       * Returns the hash to be injected on render()
       * */


    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var isStatic = this.isStatic,
          componentId = this.componentId,
          lastClassName = this.lastClassName;

      if (IS_BROWSER && isStatic && lastClassName !== undefined && styleSheet.hasNameForId(componentId, lastClassName)) {
        return lastClassName;
      }

      var flatCSS = flatten(this.rules, executionContext, styleSheet);
      var name = hasher(this.componentId + flatCSS.join(''));
      if (!styleSheet.hasNameForId(componentId, name)) {
        styleSheet.inject(this.componentId, stringifyRules(flatCSS, '.' + name, undefined, componentId), name);
      }

      this.lastClassName = name;
      return name;
    };

    ComponentStyle.generateName = function generateName(str) {
      return hasher(str);
    };

    return ComponentStyle;
  }();

  // 

  var LIMIT = 200;

  var createWarnTooManyClasses = (function (displayName) {
    var generatedClasses = {};
    var warningSeen = false;

    return function (className) {
      if (!warningSeen) {
        generatedClasses[className] = true;
        if (Object.keys(generatedClasses).length >= LIMIT) {
          // Unable to find latestRule in test environment.
          /* eslint-disable no-console, prefer-template */
          console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
          warningSeen = true;
          generatedClasses = {};
        }
      }
    };
  });

  // 
  var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
  var dashesAtEnds = /(^-|-$)/g;

  /**
   * TODO: Explore using CSS.escape when it becomes more available
   * in evergreen browsers.
   */
  function escape(str) {
    return str
    // Replace all possible CSS selectors
    .replace(escapeRegex, '-')

    // Remove extraneous hyphens at the start and end
    .replace(dashesAtEnds, '');
  }

  // 

  function isTag(target) /* : %checks */{
    return typeof target === 'string';
  }

  // 

  function generateDisplayName(target) {
    return isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')';
  }

  // 
  function isDerivedReactComponent(fn) {
    return !!(fn && fn.prototype && fn.prototype.isReactComponent);
  }

  // 

  var classNameUseCheckInjector = (function (target) {
    var elementClassName = '';

    var targetCDM = target.componentDidMount;

    // eslint-disable-next-line no-param-reassign
    target.componentDidMount = function componentDidMount() {
      if (typeof targetCDM === 'function') {
        targetCDM.call(this);
      }

      var classNames = elementClassName.replace(/ +/g, ' ').trim().split(' ');
      // eslint-disable-next-line react/no-find-dom-node
      var node = ReactDOM.findDOMNode(this);
      var selector = classNames.map(function (s) {
        return '.' + s;
      }).join('');

      if (node && node.nodeType === 1 && !classNames.every(function (className) {
        return node.classList && node.classList.contains(className);
      }) && !node.querySelector(selector)) {
        console.warn('It looks like you\'ve wrapped styled() around your React component (' + getComponentName(this.props.forwardedClass.target) + '), but the className prop is not being passed down to a child. No styles will be rendered unless className is composed within your React component.');
      }
    };

    var prevRenderInner = target.renderInner;

    // eslint-disable-next-line no-param-reassign
    target.renderInner = function renderInner() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var element = prevRenderInner.apply(this, args);

      elementClassName = element.props.className;

      return element;
    };
  });

  // 

  var identifiers = {};

  /* We depend on components having unique IDs */
  function generateId(_ComponentStyle, _displayName, parentComponentId) {
    var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);

    /**
     * This ensures uniqueness if two components happen to share
     * the same displayName.
     */
    var nr = (identifiers[displayName] || 0) + 1;
    identifiers[displayName] = nr;

    var componentId = displayName + '-' + _ComponentStyle.generateName(displayName + nr);

    return parentComponentId ? parentComponentId + '-' + componentId : componentId;
  }

  var warnInnerRef = once(function () {
    return (
      // eslint-disable-next-line no-console
      console.warn('The "innerRef" API has been removed in styled-components v4 in favor of React 16 ref forwarding, use "ref" instead like a typical component.')
    );
  });

  // $FlowFixMe

  var StyledComponent = function (_Component) {
    inherits(StyledComponent, _Component);

    function StyledComponent() {
      classCallCheck(this, StyledComponent);

      var _this = possibleConstructorReturn(this, _Component.call(this));

      _this.attrs = {};

      _this.renderOuter = _this.renderOuter.bind(_this);
      _this.renderInner = _this.renderInner.bind(_this);

      if (IS_BROWSER) {
        classNameUseCheckInjector(_this);
      }
      return _this;
    }

    StyledComponent.prototype.render = function render() {
      return React__default.createElement(
        StyleSheetConsumer,
        null,
        this.renderOuter
      );
    };

    StyledComponent.prototype.renderOuter = function renderOuter(styleSheet) {
      this.styleSheet = styleSheet;

      return React__default.createElement(
        ThemeConsumer,
        null,
        this.renderInner
      );
    };

    StyledComponent.prototype.renderInner = function renderInner(theme) {
      var _props$forwardedClass = this.props.forwardedClass,
          componentStyle = _props$forwardedClass.componentStyle,
          defaultProps = _props$forwardedClass.defaultProps,
          styledComponentId = _props$forwardedClass.styledComponentId,
          target = _props$forwardedClass.target;


      var generatedClassName = void 0;
      if (componentStyle.isStatic) {
        generatedClassName = this.generateAndInjectStyles(EMPTY_OBJECT, this.props, this.styleSheet);
      } else if (theme !== undefined) {
        generatedClassName = this.generateAndInjectStyles(determineTheme(this.props, theme, defaultProps), this.props, this.styleSheet);
      } else {
        generatedClassName = this.generateAndInjectStyles(this.props.theme || EMPTY_OBJECT, this.props, this.styleSheet);
      }
      var elementToBeCreated = this.props.as || this.attrs.as || target;
      var isTargetTag = isTag(elementToBeCreated);

      var propsForElement = _extends({}, this.attrs);

      var key = void 0;
      // eslint-disable-next-line guard-for-in
      for (key in this.props) {
        if (key === 'innerRef') {
          warnInnerRef();
        }

        if (key === 'forwardedClass' || key === 'as') continue;else if (key === 'forwardedRef') propsForElement.ref = this.props[key];else if (!isTargetTag || index$1(key)) {
          // Don't pass through non HTML tags through to HTML elements
          propsForElement[key] = key === 'style' && key in this.attrs ? _extends({}, this.attrs[key], this.props[key]) : this.props[key];
        }
      }

      propsForElement.className = [this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

      return React.createElement(elementToBeCreated, propsForElement);
    };

    StyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props, attrs) {
      var context = _extends({}, props, { theme: theme });

      if (attrs === undefined) return context;

      this.attrs = {};

      var attr = void 0;
      var key = void 0;

      /* eslint-disable guard-for-in */
      for (key in attrs) {
        attr = attrs[key];

        this.attrs[key] = isFunction(attr) && !isDerivedReactComponent(attr) && !isStyledComponent(attr) ? attr(context) : attr;
      }
      /* eslint-enable */

      return _extends({}, context, this.attrs);
    };

    StyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      var styleSheet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : StyleSheet.master;
      var _props$forwardedClass2 = props.forwardedClass,
          attrs = _props$forwardedClass2.attrs,
          componentStyle = _props$forwardedClass2.componentStyle,
          warnTooManyClasses = _props$forwardedClass2.warnTooManyClasses;

      // statically styled-components don't need to build an execution context object,
      // and shouldn't be increasing the number of class names

      if (componentStyle.isStatic && attrs === undefined) {
        return componentStyle.generateAndInjectStyles(EMPTY_OBJECT, styleSheet);
      }

      var className = componentStyle.generateAndInjectStyles(this.buildExecutionContext(theme, props, props.forwardedClass.attrs), styleSheet);

      if (warnTooManyClasses) {
        warnTooManyClasses(className);
      }

      return className;
    };

    return StyledComponent;
  }(React.Component);

  function createStyledComponent(target, options, rules) {
    var isTargetStyledComp = isStyledComponent(target);
    var isClass = !isTag(target);

    var _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? generateDisplayName(target) : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(ComponentStyle, options.displayName, options.parentComponentId) : _options$componentId,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? StyledComponent : _options$ParentCompon,
        attrs = options.attrs;


    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : options.componentId || componentId;

    // fold the underlying StyledComponent attrs up (implicit extend)
    var finalAttrs =
    // $FlowFixMe
    isTargetStyledComp && target.attrs ? _extends({}, target.attrs, attrs) : attrs;

    var componentStyle = new ComponentStyle(isTargetStyledComp ? // fold the underlying StyledComponent rules up (implicit extend)
    // $FlowFixMe
    target.componentStyle.rules.concat(rules) : rules, finalAttrs, styledComponentId);

    /**
     * forwardRef creates a new interim component, which we'll take advantage of
     * instead of extending ParentComponent to create _another_ interim class
     */
    var WrappedStyledComponent = React__default.forwardRef(function (props, ref) {
      return React__default.createElement(ParentComponent, _extends({}, props, { forwardedClass: WrappedStyledComponent, forwardedRef: ref }));
    });

    // $FlowFixMe
    WrappedStyledComponent.attrs = finalAttrs;
    // $FlowFixMe
    WrappedStyledComponent.componentStyle = componentStyle;
    WrappedStyledComponent.displayName = displayName;
    // $FlowFixMe
    WrappedStyledComponent.styledComponentId = styledComponentId;

    // fold the underlying StyledComponent target up since we folded the styles
    // $FlowFixMe
    WrappedStyledComponent.target = isTargetStyledComp ? target.target : target;

    // $FlowFixMe
    WrappedStyledComponent.withComponent = function withComponent(tag) {
      var previousComponentId = options.componentId,
          optionsToCopy = objectWithoutProperties(options, ['componentId']);


      var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

      var newOptions = _extends({}, optionsToCopy, {
        attrs: finalAttrs,
        componentId: newComponentId,
        ParentComponent: ParentComponent
      });

      return createStyledComponent(tag, newOptions, rules);
    };

    {
      // $FlowFixMe
      WrappedStyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
    }

    if (isClass) {
      hoistNonReactStatics(WrappedStyledComponent, target, {
        // all SC-specific things should not be hoisted
        attrs: true,
        componentStyle: true,
        displayName: true,
        styledComponentId: true,
        target: true,
        warnTooManyClasses: true,
        withComponent: true
      });
    }

    return WrappedStyledComponent;
  }

  // 
  // Thanks to ReactDOMFactories for this handy list!

  var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

  // SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

  // 

  var styled = function styled(tag) {
    return constructWithOptions(createStyledComponent, tag);
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  // 

  /**
   * eliminates the need to do styled.default since the other APIs
   * are directly assigned as properties to the main function
   * */
  // eslint-disable-next-line guard-for-in
  for (var key in secondary) {
    styled[key] = secondary[key];
  }

  return styled;

}(React,ReactDOM));
;window.styled = styled;
//# sourceMappingURL=styled-components.js.map
