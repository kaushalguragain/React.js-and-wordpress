(this["webpackJsonpvisual_logic"] = this["webpackJsonpvisual_logic"] || []).push([[1],{

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/dist/stylis.mjs");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;
  while (true) {
    previous = character;
    character = Object(stylis__WEBPACK_IMPORTED_MODULE_1__["peek"])(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }
    if (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["token"])(character)) {
      break;
    }
    Object(stylis__WEBPACK_IMPORTED_MODULE_1__["next"])();
  }
  return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["slice"])(begin, stylis__WEBPACK_IMPORTED_MODULE_1__["position"]);
};
var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;
  do {
    switch (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["token"])(character)) {
      case 0:
        // &\f
        if (character === 38 && Object(stylis__WEBPACK_IMPORTED_MODULE_1__["peek"])() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_1__["position"] - 1, points, index);
        break;
      case 2:
        parsed[index] += Object(stylis__WEBPACK_IMPORTED_MODULE_1__["delimit"])(character);
        break;
      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = Object(stylis__WEBPACK_IMPORTED_MODULE_1__["peek"])() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += Object(stylis__WEBPACK_IMPORTED_MODULE_1__["from"])(character);
    }
  } while (character = Object(stylis__WEBPACK_IMPORTED_MODULE_1__["next"])());
  return parsed;
};
var getRules = function getRules(value, points) {
  return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["dealloc"])(toRules(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["alloc"])(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11

var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent ||
  // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value,
    parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case

  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */ && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"

  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;
    if (
    // charcode for l
    value.charCodeAt(0) === 108 &&
    // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
    if (unsafePseudoClasses) {
      var isNested = element.parent === children[0]; // in nested rules comments become children of the "auto-inserted" rule
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? children[0].children :
      // global rule at the root level
      children;
      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];
        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version

        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }
          break;
        }
      }
      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};
var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }
  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user

var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};
var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }
  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["hash"])(value, length)) {
    // color-adjust
    case 5103:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MOZ"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + value + value;
    // order

    case 6165:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + 'flex-' + value + value;
    // align-items

    case 5187:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /(\w+).+(:[^]+)/, stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + 'box-$1$2' + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + 'flex-item-' + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + 'flex-line-pack' + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + 'box-' + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, '-grow', '') + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /([^-])(transform)/g, '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + '$2') + value;
    // cursor

    case 6187:
      return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /(zoom-|grab)/, stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + '$1'), /(image-set)/, stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /(image-set\([^]*)/, stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + '$1' + '$`$1');
    // justify-content

    case 4968:
      return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /(.+:)(flex-)?(.*)/, stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + 'box-pack:$3' + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /(.+)-inline(.+)/, stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["strlen"])(value) - 1 - length > 6) switch (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["charat"])(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["charat"])(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /(.+:)(.+)-([^]+)/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + '$2-$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__["MOZ"] + (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["charat"])(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~Object(stylis__WEBPACK_IMPORTED_MODULE_1__["indexof"])(value, 'stretch') ? prefix(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["charat"])(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["charat"])(value, Object(stylis__WEBPACK_IMPORTED_MODULE_1__["strlen"])(value) - 3 - (~Object(stylis__WEBPACK_IMPORTED_MODULE_1__["indexof"])(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, ':', ':' + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"]) + value;
        // (inline-)?fl(e)x

        case 101:
          return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["charat"])(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + '$2$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + '$2box$3') + value;
      }
      break;
    // writing-mode

    case 5936:
      switch (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["charat"])(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }
      return stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + value + stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + value + value;
  }
  return value;
}
var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case stylis__WEBPACK_IMPORTED_MODULE_1__["DECLARATION"]:
      element["return"] = prefix(element.value, element.length);
      break;
    case stylis__WEBPACK_IMPORTED_MODULE_1__["KEYFRAMES"]:
      return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["serialize"])([Object(stylis__WEBPACK_IMPORTED_MODULE_1__["copy"])(element, {
        value: Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(element.value, '@', '@' + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"])
      })], callback);
    case stylis__WEBPACK_IMPORTED_MODULE_1__["RULESET"]:
      if (element.length) return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["combine"])(element.props, function (value) {
        switch (Object(stylis__WEBPACK_IMPORTED_MODULE_1__["match"])(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["serialize"])([Object(stylis__WEBPACK_IMPORTED_MODULE_1__["copy"])(element, {
              props: [Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /:(read-\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_1__["MOZ"] + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["serialize"])([Object(stylis__WEBPACK_IMPORTED_MODULE_1__["copy"])(element, {
              props: [Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_1__["WEBKIT"] + 'input-$1')]
            }), Object(stylis__WEBPACK_IMPORTED_MODULE_1__["copy"])(element, {
              props: [Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_1__["MOZ"] + '$1')]
            }), Object(stylis__WEBPACK_IMPORTED_MODULE_1__["copy"])(element, {
              props: [Object(stylis__WEBPACK_IMPORTED_MODULE_1__["replace"])(value, /:(plac\w+)/, stylis__WEBPACK_IMPORTED_MODULE_1__["MS"] + 'input-$1')]
            })], callback);
        }
        return '';
      });
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache(options) {
  var key = options.key;
  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');
      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }
      nodesToHydrate.push(node);
    });
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }
    }), incorrectImportAlarm);
  }
  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_1__["stringify"],  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_1__["COMMENT"]) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : undefined];
    var serializer = Object(stylis__WEBPACK_IMPORTED_MODULE_1__["middleware"])(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis(styles) {
      return Object(stylis__WEBPACK_IMPORTED_MODULE_1__["serialize"])(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["compile"])(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__["StyleSheet"]({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
/* harmony default export */ __webpack_exports__["default"] = (createCache);

/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
    i = 0,
    len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^ /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array

  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.

  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
/* harmony default export */ __webpack_exports__["default"] = (murmur2);

/***/ }),

/***/ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */ && prop.charCodeAt(1) === 110
  /* n */ && prop.charCodeAt(2) < 91;
}
/* Z+1 */);

/* harmony default export */ __webpack_exports__["default"] = (isPropValid);

/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}
/* harmony default export */ __webpack_exports__["default"] = (memoize);

/***/ }),

/***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
};
/* harmony default export */ __webpack_exports__["default"] = (hoistNonReactStatics);

/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js ***!
  \**********************************************************************************/
/*! exports provided: C, E, T, _, a, b, c, h, u, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return CacheProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return Emotion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return ThemeContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return __unsafe_useEmotionCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return withTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createEmotionProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hasOwnProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return useTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return withEmotionCache; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");








var hasOwnProperty = {}.hasOwnProperty;
var EmotionCacheContext = /* #__PURE__ */Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(
// we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */Object(_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
  key: 'css'
}) : null);
if (true) {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}
var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(EmotionCacheContext);
};
var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function (props, ref) {
    // the cache will never be null in the browser
    var cache = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
var ThemeContext = /* #__PURE__ */Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({});
if (true) {
  ThemeContext.displayName = 'EmotionThemeContext';
}
var useTheme = function useTheme() {
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
};
var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);
    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }
    return mergedTheme;
  }
  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, outerTheme, theme);
};
var createCacheWithTheme = /* #__PURE__ */Object(_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (outerTheme) {
  return Object(_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }
  return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';
  var render = function render(props, ref) {
    var theme = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
    return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe

  var WithTheme = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return Object(_isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["default"])(WithTheme, Component);
}
var getLastPart = function getLastPart(functionName) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};
var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};
var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};
var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }
  return undefined;
};
var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' &&
  // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }
  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
  // the label hasn't already been computed

  if ( true && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }
  return newProps;
};
var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
    serialized = _ref.serialized,
    isStringTag = _ref.isStringTag;
  Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_5__["registerStyles"])(cache, serialized, isStringTag);
  var rules = Object(_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_7__["useInsertionEffectAlwaysWithSyncFallback"])(function () {
    return Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_5__["insertStyles"])(cache, serialized, isStringTag);
  });
  return null;
};
var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }
  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';
  if (typeof props.className === 'string') {
    className = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_5__["getRegisteredStyles"])(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_6__["serializeStyles"])(registeredStyles, undefined, Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext));
  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];
    if (labelFromStack) {
      serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_6__["serializeStyles"])([serialized, 'label:' + labelFromStack + ';']);
    }
  }
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }
  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(WrappedComponent, newProps));
});
if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js ***!
  \***********************************************************************/
/*! exports provided: CacheProvider, ThemeContext, ThemeProvider, __unsafe_useEmotionCache, useTheme, withEmotionCache, withTheme, ClassNames, Global, createElement, css, jsx, keyframes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassNames", function() { return ClassNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Global", function() { return Global; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return jsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return jsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-6a883da9.browser.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CacheProvider", function() { return _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["C"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeContext", function() { return _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["T"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__unsafe_useEmotionCache", function() { return _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["_"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTheme", function() { return _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["u"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEmotionCache", function() { return _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["w"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["b"]; });

/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");











var pkg = {
  name: "@emotion/react",
  version: "11.10.5",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  exports: {
    ".": {
      module: {
        worker: "./dist/emotion-react.worker.esm.js",
        browser: "./dist/emotion-react.browser.esm.js",
        "default": "./dist/emotion-react.esm.js"
      },
      "default": "./dist/emotion-react.cjs.js"
    },
    "./jsx-runtime": {
      module: {
        worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
        browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
      },
      "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
    },
    "./_isolated-hnrs": {
      module: {
        worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
        browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
      },
      "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
    },
    "./jsx-dev-runtime": {
      module: {
        worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
        browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
      },
      "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
    },
    "./package.json": "./package.json",
    "./types/css-prop": "./types/css-prop.d.ts",
    "./macro": "./macro.js"
  },
  types: "types/index.d.ts",
  files: ["src", "dist", "jsx-runtime", "jsx-dev-runtime", "_isolated-hnrs", "types/*.d.ts", "macro.js", "macro.d.ts", "macro.js.flow"],
  sideEffects: false,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.18.3",
    "@emotion/babel-plugin": "^11.10.5",
    "@emotion/cache": "^11.10.5",
    "@emotion/serialize": "^1.1.1",
    "@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
    "@emotion/utils": "^1.2.0",
    "@emotion/weak-memoize": "^0.3.0",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    "@babel/core": "^7.0.0",
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@babel/core": {
      optional: true
    },
    "@types/react": {
      optional: true
    }
  },
  devDependencies: {
    "@babel/core": "^7.18.5",
    "@definitelytyped/dtslint": "0.0.112",
    "@emotion/css": "11.10.5",
    "@emotion/css-prettifier": "1.1.1",
    "@emotion/server": "11.10.0",
    "@emotion/styled": "11.10.5",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^4.5.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: ["./index.js", "./jsx-runtime.js", "./jsx-dev-runtime.js", "./_isolated-hnrs.js"],
    umdName: "emotionReact",
    exports: {
      envConditions: ["browser", "worker"],
      extra: {
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": "./macro.js"
      }
    }
  }
};
var jsx = function jsx(type, props) {
  var args = arguments;
  if (props == null || !_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["h"].call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"].apply(undefined, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["E"];
  createElementArgArray[1] = Object(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["c"])(type, props);
  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe

  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"].apply(null, createElementArgArray);
};
var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */Object(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["w"])(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && (
  // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }
  var styles = props.styles;
  var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_8__["serializeStyles"])([styles], undefined, Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["T"]));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything

  var sheetRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  Object(_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_9__["useInsertionEffectWithLayoutFallback"])(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");
    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }
    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  Object(_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_9__["useInsertionEffectWithLayoutFallback"])(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
      rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== undefined) {
      // insert keyframes
      Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_7__["insertStyles"])(cache, serialized.next, true);
    }
    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});
if (true) {
  Global.displayName = 'EmotionGlobal';
}
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_8__["serializeStyles"])(args);
}
var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';
  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case 'boolean':
        break;
      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if ( true && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }
            toAdd = '';
            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }
          break;
        }
      default:
        {
          toAdd = arg;
        }
    }
    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }
  return cls;
};
function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_7__["getRegisteredStyles"])(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css(registeredStyles);
}
var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
    serializedArr = _ref.serializedArr;
  var rules = Object(_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_9__["useInsertionEffectAlwaysWithSyncFallback"])(function () {
    for (var i = 0; i < serializedArr.length; i++) {
      var res = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_7__["insertStyles"])(cache, serializedArr[i], false);
    }
  });
  return null;
};
var ClassNames = /* #__PURE__ */Object(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["w"])(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];
  var css = function css() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('css can only be used during render');
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_8__["serializeStyles"])(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_7__["registerStyles"])(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };
  var cx = function cx() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('cx can only be used during render');
    }
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return merge(cache.registered, css, classnames(args));
  };
  var content = {
    css: css,
    cx: cx,
    theme: Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__["T"])
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});
if (true) {
  ClassNames.displayName = 'EmotionClassNames';
}
if (true) {
  var isBrowser = "object" !== 'undefined'; // #1727, #2905 for some reason Jest and Vitest evaluate modules twice if some consuming module gets mocked

  var isTestEnv = typeof jest !== 'undefined' || typeof vi !== 'undefined';
  if (isBrowser && !isTestEnv) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    var globalContext =
    // $FlowIgnore
    typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
    : isBrowser ? window : global;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";
    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }
    globalContext[globalKey] = true;
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/extends.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/extends.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
  \*******************************************************************************/
/*! exports provided: serializeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeStyles", function() { return serializeStyles; });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");



var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};
var processStyleName = /* #__PURE__ */Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});
var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }
  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }
  return value;
};
if (true) {
  var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};
  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }
    var processed = oldProcessStyleValue(key, value);
    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }
  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }
    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }
        if (interpolation.styles !== undefined) {
          var next = interpolation.next;
          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }
          var styles = interpolation.styles + ";";
          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }
          return styles;
        }
        return createStringFromObject(mergedProps, registered, interpolation);
      }
    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }
        break;
      }
    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }
      break;
  } // finalize string values (regular strings and functions interpolated into css calls)

  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = '';
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }
            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }
                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;
if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list

var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }
  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];
  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles += strings[0];
  } // we start at 1 since we've already handled the first arg

  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles += strings[i];
    }
  }
  var sourceMap;
  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time

  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' +
    // $FlowFixMe we know it's not null
    match[1];
  }
  var name = Object(_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;
  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
  return {
    name: name,
    styles: styles,
    next: cursor
  };
};


/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
  \***********************************************************************/
/*! exports provided: StyleSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheet", function() { return StyleSheet; });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */

  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);
  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }
  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}
var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;
    this._insertTag = function (tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet;
}();


/***/ }),

/***/ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");







var testOmitPropsOnStringTag = _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__["default"];
var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' &&
  // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
    serialized = _ref.serialized,
    isStringTag = _ref.isStringTag;
  Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["registerStyles"])(cache, serialized, isStringTag);
  var rules = Object(_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__["useInsertionEffectAlwaysWithSyncFallback"])(function () {
    return Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["insertStyles"])(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled = function createStyled(tag, options) {
  if (true) {
    if (tag === undefined) {
      throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
    }
  }
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if ( true && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        if ( true && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class

    var Styled = Object(_emotion_react__WEBPACK_IMPORTED_MODULE_3__["withEmotionCache"])(function (props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_emotion_react__WEBPACK_IMPORTED_MODULE_3__["ThemeContext"]);
      }
      if (typeof props.className === 'string') {
        className = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["getRegisteredStyles"])(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__["serializeStyles"])(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;
        if (
        // $FlowFixMe
        finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(Insertion, {
        cache: cache,
        serialized: serialized,
        isStringTag: typeof FinalTag === 'string'
      }), /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "development" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string

        return "." + targetClassName;
      }
    });
    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
/* harmony default export */ __webpack_exports__["default"] = (createStyled);

/***/ }),

/***/ "./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");
/* harmony import */ var _base_dist_emotion_styled_base_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/dist/emotion-styled-base.browser.esm.js */ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");








var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',
// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
var newStyled = _base_dist_emotion_styled_base_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__["default"].bind();
tags.forEach(function (tagName) {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName);
});
/* harmony default export */ __webpack_exports__["default"] = (newStyled);

/***/ }),

/***/ "./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/extends.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/extends.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);

/***/ }),

/***/ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js ***!
  \***********************************************************************************************************************************/
/*! exports provided: useInsertionEffectAlwaysWithSyncFallback, useInsertionEffectWithLayoutFallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useInsertionEffectAlwaysWithSyncFallback", function() { return useInsertionEffectAlwaysWithSyncFallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useInsertionEffectWithLayoutFallback", function() { return useInsertionEffectWithLayoutFallback; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var syncFallback = function syncFallback(create) {
  return create();
};
var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"];


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***********************************************************************/
/*! exports provided: getRegisteredStyles, insertStyles, registerStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegisteredStyles", function() { return getRegisteredStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStyles", function() { return insertStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerStyles", function() { return registerStyles; });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if (
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false ||
  // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;
    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);
      current = current.next;
    } while (current !== undefined);
  }
};


/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }
    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};
/* harmony default export */ __webpack_exports__["default"] = (weakMemoize);

/***/ }),

/***/ "./node_modules/@fortawesome/fontawesome-svg-core/index.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-svg-core/index.mjs ***!
  \******************************************************************/
/*! exports provided: noAuto, config, library, dom, parse, findIconDefinition, toHtml, icon, layer, text, counter, api */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noAuto", function() { return noAuto$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "library", function() { return library$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dom", function() { return dom$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIconDefinition", function() { return findIconDefinition$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toHtml", function() { return toHtml$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icon", function() { return icon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "layer", function() { return layer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "counter", function() { return counter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return api; });
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, void 0, groups);
  };
  var _super = RegExp.prototype,
    _groups = new WeakMap();
  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);
    return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
  }
  function buildGroups(result, re) {
    var g = _groups.get(re);
    return Object.keys(g).reduce(function (groups, name) {
      return groups[name] = result[g[name]], groups;
    }, Object.create(null));
  }
  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);
    return result && (result.groups = buildGroups(result, this)), result;
  }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if ("string" == typeof substitution) {
      var groups = _groups.get(this);
      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    }
    if ("function" == typeof substitution) {
      var _this = this;
      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;
        return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
      });
    }
    return _super[Symbol.replace].call(this, str, substitution);
  }, _wrapRegExp.apply(this, arguments);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var noop = function noop() {};
var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER = null;
var _PERFORMANCE = {
  mark: noop,
  measure: noop
};
try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}
var _ref = _WINDOW.navigator || {},
  _ref$userAgent = _ref.userAgent,
  userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var MUTATION_OBSERVER = _MUTATION_OBSERVER;
var PERFORMANCE = _PERFORMANCE;
var IS_BROWSER = !!WINDOW.document;
var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');
var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;
var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var UNITS_IN_GRID = 16;
var DEFAULT_CSS_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
var DATA_FA_I2SVG = 'data-fa-i2svg';
var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
var DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
var DATA_PREFIX = 'data-prefix';
var DATA_ICON = 'data-icon';
var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
var MUTATION_APPROACH_ASYNC = 'async';
var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
var PRODUCTION = function () {
  try {
    return "development" === 'production';
  } catch (e) {
    return false;
  }
}();
var FAMILY_CLASSIC = 'classic';
var FAMILY_SHARP = 'sharp';
var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];
function familyProxy(obj) {
  // Defaults to the classic family if family is not available
  return new Proxy(obj, {
    get: function get(target, prop) {
      return prop in target ? target[prop] : target[FAMILY_CLASSIC];
    }
  });
}
var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
  'fa': 'solid',
  'fas': 'solid',
  'fa-solid': 'solid',
  'far': 'regular',
  'fa-regular': 'regular',
  'fal': 'light',
  'fa-light': 'light',
  'fat': 'thin',
  'fa-thin': 'thin',
  'fad': 'duotone',
  'fa-duotone': 'duotone',
  'fab': 'brands',
  'fa-brands': 'brands',
  'fak': 'kit',
  'fa-kit': 'kit'
}), _defineProperty(_familyProxy, FAMILY_SHARP, {
  'fa': 'solid',
  'fass': 'solid',
  'fa-solid': 'solid'
}), _familyProxy));
var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
  'solid': 'fas',
  'regular': 'far',
  'light': 'fal',
  'thin': 'fat',
  'duotone': 'fad',
  'brands': 'fab',
  'kit': 'fak'
}), _defineProperty(_familyProxy2, FAMILY_SHARP, {
  'solid': 'fass'
}), _familyProxy2));
var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
  'fab': 'fa-brands',
  'fad': 'fa-duotone',
  'fak': 'fa-kit',
  'fal': 'fa-light',
  'far': 'fa-regular',
  'fas': 'fa-solid',
  'fat': 'fa-thin'
}), _defineProperty(_familyProxy3, FAMILY_SHARP, {
  'fass': 'fa-solid'
}), _familyProxy3));
var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
  'fa-brands': 'fab',
  'fa-duotone': 'fad',
  'fa-kit': 'fak',
  'fa-light': 'fal',
  'fa-regular': 'far',
  'fa-solid': 'fas',
  'fa-thin': 'fat'
}), _defineProperty(_familyProxy4, FAMILY_SHARP, {
  'fa-solid': 'fass'
}), _familyProxy4));
var ICON_SELECTION_SYNTAX_PATTERN = /fa(s|r|l|t|d|b|k|ss)?[\-\ ]/; // eslint-disable-line no-useless-escape

var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
var FONT_FAMILY_PATTERN = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i; // TODO: this needs to support fass
// TODO: do we need to handle font-weight for kit SVG pseudo-elements?

var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
  '900': 'fas',
  '400': 'far',
  'normal': 'far',
  '300': 'fal',
  '100': 'fat'
}), _defineProperty(_familyProxy5, FAMILY_SHARP, {
  '900': 'fass'
}), _familyProxy5));
var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
var DUOTONE_CLASSES = {
  GROUP: 'duotone-group',
  SWAP_OPACITY: 'swap-opacity',
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};
var prefixes = new Set();
Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
  return "".concat(n, "x");
})).concat(oneToTwenty.map(function (n) {
  return "w-".concat(n);
}));
var initial = WINDOW.FontAwesomeConfig || {};
function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');
  if (element) {
    return element.getAttribute(attr);
  }
}
function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}
if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  var attrs = [['data-family-prefix', 'familyPrefix'], ['data-css-prefix', 'cssPrefix'], ['data-family-default', 'familyDefault'], ['data-style-default', 'styleDefault'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
  attrs.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      attr = _ref2[0],
      key = _ref2[1];
    var val = coerce(getAttrConfig(attr));
    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}
var _default = {
  styleDefault: 'solid',
  familyDefault: 'classic',
  cssPrefix: DEFAULT_CSS_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: 'async',
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
}; // familyPrefix is deprecated but we must still support it if present

if (initial.familyPrefix) {
  initial.cssPrefix = initial.familyPrefix;
}
var _config = _objectSpread2(_objectSpread2({}, _default), initial);
if (!_config.autoReplaceSvg) _config.observeMutations = false;
var config = {};
Object.keys(_default).forEach(function (key) {
  Object.defineProperty(config, key, {
    enumerable: true,
    set: function set(val) {
      _config[key] = val;
      _onChangeCb.forEach(function (cb) {
        return cb(config);
      });
    },
    get: function get() {
      return _config[key];
    }
  });
}); // familyPrefix is deprecated as of 6.2.0 and should be removed in 7.0.0

Object.defineProperty(config, 'familyPrefix', {
  enumerable: true,
  set: function set(val) {
    _config.cssPrefix = val;
    _onChangeCb.forEach(function (cb) {
      return cb(config);
    });
  },
  get: function get() {
    return _config.cssPrefix;
  }
});
WINDOW.FontAwesomeConfig = config;
var _onChangeCb = [];
function onChange(cb) {
  _onChangeCb.push(cb);
  return function () {
    _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
  };
}
var d = UNITS_IN_GRID;
var meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};
function insertCss(css) {
  if (!css || !IS_DOM) {
    return;
  }
  var style = DOCUMENT.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  var headChildren = DOCUMENT.head.childNodes;
  var beforeChild = null;
  for (var i = headChildren.length - 1; i > -1; i--) {
    var child = headChildren[i];
    var tagName = (child.tagName || '').toUpperCase();
    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }
  DOCUMENT.head.insertBefore(style, beforeChild);
  return css;
}
var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function nextUniqueId() {
  var size = 12;
  var id = '';
  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }
  return id;
}
function toArray(obj) {
  var array = [];
  for (var i = (obj || []).length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}
function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute('class') || '').split(' ').filter(function (i) {
      return i;
    });
  }
}
function htmlEscape(str) {
  return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
    return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
  }, '').trim();
}
function joinStyles(styles) {
  return Object.keys(styles || {}).reduce(function (acc, styleName) {
    return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
  }, '');
}
function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}
function transformForSvg(_ref) {
  var transform = _ref.transform,
    containerWidth = _ref.containerWidth,
    iconWidth = _ref.iconWidth;
  var outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  var inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  var path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer: outer,
    inner: inner,
    path: path
  };
}
function transformForCss(_ref2) {
  var transform = _ref2.transform,
    _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,
    _ref2$startCentered = _ref2.startCentered,
    startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
  var val = '';
  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");
  }
  val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}
var baseStyles = ":root, :host {\n  --fa-font-solid: normal 900 1em/1 \"Font Awesome 6 Solid\";\n  --fa-font-regular: normal 400 1em/1 \"Font Awesome 6 Regular\";\n  --fa-font-light: normal 300 1em/1 \"Font Awesome 6 Light\";\n  --fa-font-thin: normal 100 1em/1 \"Font Awesome 6 Thin\";\n  --fa-font-duotone: normal 900 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-sharp-solid: normal 900 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-brands: normal 400 1em/1 \"Font Awesome 6 Brands\";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}";
function css() {
  var dcp = DEFAULT_CSS_PREFIX;
  var drc = DEFAULT_REPLACEMENT_CLASS;
  var fp = config.cssPrefix;
  var rc = config.replacementClass;
  var s = baseStyles;
  if (fp !== dcp || rc !== drc) {
    var dPatt = new RegExp("\\.".concat(dcp, "\\-"), 'g');
    var customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), 'g');
    var rPatt = new RegExp("\\.".concat(drc), 'g');
    s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }
  return s;
}
var _cssInserted = false;
function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}
var InjectCSS = {
  mixout: function mixout() {
    return {
      dom: {
        css: css,
        insertCss: ensureCss
      }
    };
  },
  hooks: function hooks() {
    return {
      beforeDOMElementCreation: function beforeDOMElementCreation() {
        ensureCss();
      },
      beforeI2svg: function beforeI2svg() {
        ensureCss();
      }
    };
  }
};
var w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w[NAMESPACE_IDENTIFIER];
var functions = [];
var listener = function listener() {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(function (fn) {
    return fn();
  });
};
var loaded = false;
if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}
function domready(fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
}
function toHtml(abstractNodes) {
  var tag = abstractNodes.tag,
    _abstractNodes$attrib = abstractNodes.attributes,
    attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
    _abstractNodes$childr = abstractNodes.children,
    children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;
  if (typeof abstractNodes === 'string') {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
  }
}
function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix: prefix,
      iconName: iconName,
      icon: mapping[prefix][iconName]
    };
  }
}

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */

var bindInternal4 = function bindInternal4(func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */

var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
    length = keys.length,
    iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
    i,
    key,
    result;
  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }
  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }
  return result;
};

/**
 * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
 *
 * Copyright Mathias Bynens <https://mathiasbynens.be/>

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function ucs2decode(string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) {
        // eslint-disable-line eqeqeq
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function toHex(unicode) {
  var decoded = ucs2decode(unicode);
  return decoded.length === 1 ? decoded[0].toString(16) : null;
}
function codePointAt(string, index) {
  var size = string.length;
  var first = string.charCodeAt(index);
  var second;
  if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
    second = string.charCodeAt(index + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}
function normalizeIcons(icons) {
  return Object.keys(icons).reduce(function (acc, iconName) {
    var icon = icons[iconName];
    var expanded = !!icon.icon;
    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }
    return acc;
  }, {});
}
function defineIcons(prefix, icons) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _params$skipHooks = params.skipHooks,
    skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
  var normalized = normalizeIcons(icons);
  if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
    namespace.hooks.addPack(prefix, normalizeIcons(icons));
  } else {
    namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
  }
  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll ease the upgrade process for our users by automatically defining
   * this as well.
   */

  if (prefix === 'fas') {
    defineIcons('fa', icons);
  }
}
var duotonePathRe = [/*#__PURE__*/_wrapRegExp(/path d="((?:(?!")[\s\S])+)".*path d="((?:(?!")[\s\S])+)"/, {
  d1: 1,
  d2: 2
}), /*#__PURE__*/_wrapRegExp(/path class="((?:(?!")[\s\S])+)".*d="((?:(?!")[\s\S])+)".*path class="((?:(?!")[\s\S])+)".*d="((?:(?!")[\s\S])+)"/, {
  cls1: 1,
  d1: 2,
  cls2: 3,
  d2: 4
}), /*#__PURE__*/_wrapRegExp(/path class="((?:(?!")[\s\S])+)".*d="((?:(?!")[\s\S])+)"/, {
  cls1: 1,
  d1: 2
})];
var _LONG_STYLE, _PREFIXES, _PREFIXES_FOR_FAMILY;
var styles = namespace.styles,
  shims = namespace.shims;
var LONG_STYLE = (_LONG_STYLE = {}, _defineProperty(_LONG_STYLE, FAMILY_CLASSIC, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_LONG_STYLE, FAMILY_SHARP, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _LONG_STYLE);
var _defaultUsablePrefix = null;
var _byUnicode = {};
var _byLigature = {};
var _byOldName = {};
var _byOldUnicode = {};
var _byAlias = {};
var PREFIXES = (_PREFIXES = {}, _defineProperty(_PREFIXES, FAMILY_CLASSIC, Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES, FAMILY_SHARP, Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP])), _PREFIXES);
function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}
function getIconName(cssPrefix, cls) {
  var parts = cls.split('-');
  var prefix = parts[0];
  var iconName = parts.slice(1).join('-');
  if (prefix === cssPrefix && iconName !== '' && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}
var build = function build() {
  var lookup = function lookup(reducer) {
    return reduce(styles, function (o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };
  _byUnicode = lookup(function (acc, icon, iconName) {
    if (icon[3]) {
      acc[icon[3]] = iconName;
    }
    if (icon[2]) {
      var aliases = icon[2].filter(function (a) {
        return typeof a === 'number';
      });
      aliases.forEach(function (alias) {
        acc[alias.toString(16)] = iconName;
      });
    }
    return acc;
  });
  _byLigature = lookup(function (acc, icon, iconName) {
    acc[iconName] = iconName;
    if (icon[2]) {
      var aliases = icon[2].filter(function (a) {
        return typeof a === 'string';
      });
      aliases.forEach(function (alias) {
        acc[alias] = iconName;
      });
    }
    return acc;
  });
  _byAlias = lookup(function (acc, icon, iconName) {
    var aliases = icon[2];
    acc[iconName] = iconName;
    aliases.forEach(function (alias) {
      acc[alias] = iconName;
    });
    return acc;
  }); // If we have a Kit, we can't determine if regular is available since we
  // could be auto-fetching it. We'll have to assume that it is available.

  var hasRegular = 'far' in styles || config.autoFetchSvg;
  var shimLookups = reduce(shims, function (acc, shim) {
    var maybeNameMaybeUnicode = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];
    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }
    if (typeof maybeNameMaybeUnicode === 'string') {
      acc.names[maybeNameMaybeUnicode] = {
        prefix: prefix,
        iconName: iconName
      };
    }
    if (typeof maybeNameMaybeUnicode === 'number') {
      acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
        prefix: prefix,
        iconName: iconName
      };
    }
    return acc;
  }, {
    names: {},
    unicodes: {}
  });
  _byOldName = shimLookups.names;
  _byOldUnicode = shimLookups.unicodes;
  _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
    family: config.familyDefault
  });
};
onChange(function (c) {
  _defaultUsablePrefix = getCanonicalPrefix(c.styleDefault, {
    family: config.familyDefault
  });
});
build();
function byUnicode(prefix, unicode) {
  return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
  return (_byLigature[prefix] || {})[ligature];
}
function byAlias(prefix, alias) {
  return (_byAlias[prefix] || {})[alias];
}
function byOldName(name) {
  return _byOldName[name] || {
    prefix: null,
    iconName: null
  };
}
function byOldUnicode(unicode) {
  var oldUnicode = _byOldUnicode[unicode];
  var newUnicode = byUnicode('fas', unicode);
  return oldUnicode || (newUnicode ? {
    prefix: 'fas',
    iconName: newUnicode
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function getDefaultUsablePrefix() {
  return _defaultUsablePrefix;
}
var emptyCanonicalIcon = function emptyCanonicalIcon() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function getCanonicalPrefix(styleOrPrefix) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$family = params.family,
    family = _params$family === void 0 ? FAMILY_CLASSIC : _params$family;
  var style = PREFIX_TO_STYLE[family][styleOrPrefix];
  var prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
  var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
  return prefix || defined || null;
}
var PREFIXES_FOR_FAMILY = (_PREFIXES_FOR_FAMILY = {}, _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_CLASSIC, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_SHARP, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _PREFIXES_FOR_FAMILY);
function getCanonicalIcon(values) {
  var _famProps;
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$skipLookups = params.skipLookups,
    skipLookups = _params$skipLookups === void 0 ? false : _params$skipLookups;
  var famProps = (_famProps = {}, _defineProperty(_famProps, FAMILY_CLASSIC, "".concat(config.cssPrefix, "-").concat(FAMILY_CLASSIC)), _defineProperty(_famProps, FAMILY_SHARP, "".concat(config.cssPrefix, "-").concat(FAMILY_SHARP)), _famProps);
  var givenPrefix = null;
  var family = FAMILY_CLASSIC;
  if (values.includes(famProps[FAMILY_CLASSIC]) || values.some(function (v) {
    return PREFIXES_FOR_FAMILY[FAMILY_CLASSIC].includes(v);
  })) {
    family = FAMILY_CLASSIC;
  }
  if (values.includes(famProps[FAMILY_SHARP]) || values.some(function (v) {
    return PREFIXES_FOR_FAMILY[FAMILY_SHARP].includes(v);
  })) {
    family = FAMILY_SHARP;
  }
  var canonical = values.reduce(function (acc, cls) {
    var iconName = getIconName(config.cssPrefix, cls);
    if (styles[cls]) {
      cls = LONG_STYLE[family].includes(cls) ? LONG_STYLE_TO_PREFIX[family][cls] : cls;
      givenPrefix = cls;
      acc.prefix = cls;
    } else if (PREFIXES[family].indexOf(cls) > -1) {
      givenPrefix = cls;
      acc.prefix = getCanonicalPrefix(cls, {
        family: family
      });
    } else if (iconName) {
      acc.iconName = iconName;
    } else if (cls !== config.replacementClass && cls !== famProps[FAMILY_CLASSIC] && cls !== famProps[FAMILY_SHARP]) {
      acc.rest.push(cls);
    }
    if (!skipLookups && acc.prefix && acc.iconName) {
      var shim = givenPrefix === 'fa' ? byOldName(acc.iconName) : {};
      var aliasIconName = byAlias(acc.prefix, acc.iconName);
      if (shim.prefix) {
        givenPrefix = null;
      }
      acc.iconName = shim.iconName || aliasIconName || acc.iconName;
      acc.prefix = shim.prefix || acc.prefix;
      if (acc.prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
        // Allow a fallback from the regular style to solid if regular is not available
        // but only if we aren't auto-fetching SVGs
        acc.prefix = 'fas';
      }
    }
    return acc;
  }, emptyCanonicalIcon());
  if (values.includes('fa-brands') || values.includes('fab')) {
    canonical.prefix = 'fab';
  }
  if (values.includes('fa-duotone') || values.includes('fad')) {
    canonical.prefix = 'fad';
  }
  if (!canonical.prefix && family === FAMILY_SHARP && (styles['fass'] || config.autoFetchSvg)) {
    canonical.prefix = 'fass';
    canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
  }
  if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
    // The fa prefix is not canonical. So if it has made it through until this point
    // we will shift it to the correct prefix.
    canonical.prefix = getDefaultUsablePrefix() || 'fas';
  }
  return canonical;
}
var Library = /*#__PURE__*/function () {
  function Library() {
    _classCallCheck(this, Library);
    this.definitions = {};
  }
  _createClass(Library, [{
    key: "add",
    value: function add() {
      var _this = this;
      for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }
      var additions = definitions.reduce(this._pullDefinitions, {});
      Object.keys(additions).forEach(function (key) {
        _this.definitions[key] = _objectSpread2(_objectSpread2({}, _this.definitions[key] || {}), additions[key]);
        defineIcons(key, additions[key]); // TODO can we stop doing this? We can't get the icons by 'fa-solid' any longer so this probably needs to change

        var longPrefix = PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC][key];
        if (longPrefix) defineIcons(longPrefix, additions[key]);
        build();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? {
        0: definition
      } : definition;
      Object.keys(normalized).map(function (key) {
        var _normalized$key = normalized[key],
          prefix = _normalized$key.prefix,
          iconName = _normalized$key.iconName,
          icon = _normalized$key.icon;
        var aliases = icon[2];
        if (!additions[prefix]) additions[prefix] = {};
        if (aliases.length > 0) {
          aliases.forEach(function (alias) {
            if (typeof alias === 'string') {
              additions[prefix][alias] = icon;
            }
          });
        }
        additions[prefix][iconName] = icon;
      });
      return additions;
    }
  }]);
  return Library;
}();
var _plugins = [];
var _hooks = {};
var providers = {};
var defaultProviderKeys = Object.keys(providers);
function registerPlugins(nextPlugins, _ref) {
  var obj = _ref.mixoutsTo;
  _plugins = nextPlugins;
  _hooks = {};
  Object.keys(providers).forEach(function (k) {
    if (defaultProviderKeys.indexOf(k) === -1) {
      delete providers[k];
    }
  });
  _plugins.forEach(function (plugin) {
    var mixout = plugin.mixout ? plugin.mixout() : {};
    Object.keys(mixout).forEach(function (tk) {
      if (typeof mixout[tk] === 'function') {
        obj[tk] = mixout[tk];
      }
      if (_typeof(mixout[tk]) === 'object') {
        Object.keys(mixout[tk]).forEach(function (sk) {
          if (!obj[tk]) {
            obj[tk] = {};
          }
          obj[tk][sk] = mixout[tk][sk];
        });
      }
    });
    if (plugin.hooks) {
      var hooks = plugin.hooks();
      Object.keys(hooks).forEach(function (hook) {
        if (!_hooks[hook]) {
          _hooks[hook] = [];
        }
        _hooks[hook].push(hooks[hook]);
      });
    }
    if (plugin.provides) {
      plugin.provides(providers);
    }
  });
  return obj;
}
function chainHooks(hook, accumulator) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var hookFns = _hooks[hook] || [];
  hookFns.forEach(function (hookFn) {
    accumulator = hookFn.apply(null, [accumulator].concat(args)); // eslint-disable-line no-useless-call
  });

  return accumulator;
}
function callHooks(hook) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  var hookFns = _hooks[hook] || [];
  hookFns.forEach(function (hookFn) {
    hookFn.apply(null, args);
  });
  return undefined;
}
function callProvided() {
  var hook = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  return providers[hook] ? providers[hook].apply(null, args) : undefined;
}
function findIconDefinition(iconLookup) {
  if (iconLookup.prefix === 'fa') {
    iconLookup.prefix = 'fas';
  }
  var iconName = iconLookup.iconName;
  var prefix = iconLookup.prefix || getDefaultUsablePrefix();
  if (!iconName) return;
  iconName = byAlias(prefix, iconName) || iconName;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}
var library = new Library();
var noAuto = function noAuto() {
  config.autoReplaceSvg = false;
  config.observeMutations = false;
  callHooks('noAuto');
};
var dom = {
  i2svg: function i2svg() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (IS_DOM) {
      callHooks('beforeI2svg', params);
      callProvided('pseudoElements2svg', params);
      return callProvided('i2svg', params);
    } else {
      return Promise.reject('Operation requires a DOM of some kind.');
    }
  },
  watch: function watch() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var autoReplaceSvgRoot = params.autoReplaceSvgRoot;
    if (config.autoReplaceSvg === false) {
      config.autoReplaceSvg = true;
    }
    config.observeMutations = true;
    domready(function () {
      autoReplace({
        autoReplaceSvgRoot: autoReplaceSvgRoot
      });
      callHooks('watch', params);
    });
  }
};
var parse = {
  icon: function icon(_icon) {
    if (_icon === null) {
      return null;
    }
    if (_typeof(_icon) === 'object' && _icon.prefix && _icon.iconName) {
      return {
        prefix: _icon.prefix,
        iconName: byAlias(_icon.prefix, _icon.iconName) || _icon.iconName
      };
    }
    if (Array.isArray(_icon) && _icon.length === 2) {
      var iconName = _icon[1].indexOf('fa-') === 0 ? _icon[1].slice(3) : _icon[1];
      var prefix = getCanonicalPrefix(_icon[0]);
      return {
        prefix: prefix,
        iconName: byAlias(prefix, iconName) || iconName
      };
    }
    if (typeof _icon === 'string' && (_icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || _icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
      var canonicalIcon = getCanonicalIcon(_icon.split(' '), {
        skipLookups: true
      });
      return {
        prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
        iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
      };
    }
    if (typeof _icon === 'string') {
      var _prefix = getDefaultUsablePrefix();
      return {
        prefix: _prefix,
        iconName: byAlias(_prefix, _icon) || _icon
      };
    }
  }
};
var api = {
  noAuto: noAuto,
  config: config,
  dom: dom,
  parse: parse,
  library: library,
  findIconDefinition: findIconDefinition,
  toHtml: toHtml
};
var autoReplace = function autoReplace() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _params$autoReplaceSv = params.autoReplaceSvgRoot,
    autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
  if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
    node: autoReplaceSvgRoot
  });
};
function domVariants(val, abstractCreator) {
  Object.defineProperty(val, 'abstract', {
    get: abstractCreator
  });
  Object.defineProperty(val, 'html', {
    get: function get() {
      return val.abstract.map(function (a) {
        return toHtml(a);
      });
    }
  });
  Object.defineProperty(val, 'node', {
    get: function get() {
      if (!IS_DOM) return;
      var container = DOCUMENT.createElement('div');
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}
function asIcon(_ref) {
  var children = _ref.children,
    main = _ref.main,
    mask = _ref.mask,
    attributes = _ref.attributes,
    styles = _ref.styles,
    transform = _ref.transform;
  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    var width = main.width,
      height = main.height;
    var offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes['style'] = joinStyles(_objectSpread2(_objectSpread2({}, styles), {}, {
      'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    }));
  }
  return [{
    tag: 'svg',
    attributes: attributes,
    children: children
  }];
}
function asSymbol(_ref) {
  var prefix = _ref.prefix,
    iconName = _ref.iconName,
    children = _ref.children,
    attributes = _ref.attributes,
    symbol = _ref.symbol;
  var id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: 'svg',
    attributes: {
      style: 'display: none;'
    },
    children: [{
      tag: 'symbol',
      attributes: _objectSpread2(_objectSpread2({}, attributes), {}, {
        id: id
      }),
      children: children
    }]
  }];
}
function makeInlineSvgAbstract(params) {
  var _params$icons = params.icons,
    main = _params$icons.main,
    mask = _params$icons.mask,
    prefix = params.prefix,
    iconName = params.iconName,
    transform = params.transform,
    symbol = params.symbol,
    title = params.title,
    maskId = params.maskId,
    titleId = params.titleId,
    extra = params.extra,
    _params$watchable = params.watchable,
    watchable = _params$watchable === void 0 ? false : _params$watchable;
  var _ref = mask.found ? mask : main,
    width = _ref.width,
    height = _ref.height;
  var isUploadedIcon = prefix === 'fak';
  var attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ''].filter(function (c) {
    return extra.classes.indexOf(c) === -1;
  }).filter(function (c) {
    return c !== '' || !!c;
  }).concat(extra.classes).join(' ');
  var content = {
    children: [],
    attributes: _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
      'data-prefix': prefix,
      'data-icon': iconName,
      'class': attrClass,
      'role': extra.attributes.role || 'img',
      'xmlns': 'http://www.w3.org/2000/svg',
      'viewBox': "0 0 ".concat(width, " ").concat(height)
    })
  };
  var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};
  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = '';
  }
  if (title) {
    content.children.push({
      tag: 'title',
      attributes: {
        id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });
    delete content.attributes.title;
  }
  var args = _objectSpread2(_objectSpread2({}, content), {}, {
    prefix: prefix,
    iconName: iconName,
    main: main,
    mask: mask,
    maskId: maskId,
    transform: transform,
    symbol: symbol,
    styles: _objectSpread2(_objectSpread2({}, uploadedIconWidthStyle), extra.styles)
  });
  var _ref2 = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
      children: [],
      attributes: {}
    } : callProvided('generateAbstractIcon', args) || {
      children: [],
      attributes: {}
    },
    children = _ref2.children,
    attributes = _ref2.attributes;
  args.children = children;
  args.attributes = attributes;
  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}
function makeLayersTextAbstract(params) {
  var content = params.content,
    width = params.width,
    height = params.height,
    transform = params.transform,
    title = params.title,
    extra = params.extra,
    _params$watchable2 = params.watchable,
    watchable = _params$watchable2 === void 0 ? false : _params$watchable2;
  var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
    'title': title
  } : {}), {}, {
    'class': extra.classes.join(' ')
  });
  if (watchable) {
    attributes[DATA_FA_I2SVG] = '';
  }
  var styles = _objectSpread2({}, extra.styles);
  if (transformIsMeaningful(transform)) {
    styles['transform'] = transformForCss({
      transform: transform,
      startCentered: true,
      width: width,
      height: height
    });
    styles['-webkit-transform'] = styles['transform'];
  }
  var styleString = joinStyles(styles);
  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }
  var val = [];
  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }
  return val;
}
function makeLayersCounterAbstract(params) {
  var content = params.content,
    title = params.title,
    extra = params.extra;
  var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
    'title': title
  } : {}), {}, {
    'class': extra.classes.join(' ')
  });
  var styleString = joinStyles(extra.styles);
  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }
  var val = [];
  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }
  return val;
}
var styles$1 = namespace.styles;
function asFoundIcon(icon) {
  var width = icon[0];
  var height = icon[1];
  var _icon$slice = icon.slice(4),
    _icon$slice2 = _slicedToArray(_icon$slice, 1),
    vectorData = _icon$slice2[0];
  var element = null;
  if (Array.isArray(vectorData)) {
    element = {
      tag: 'g',
      attributes: {
        class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: 'path',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: 'currentColor',
          d: vectorData[0]
        }
      }, {
        tag: 'path',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: 'currentColor',
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: 'path',
      attributes: {
        fill: 'currentColor',
        d: vectorData
      }
    };
  }
  return {
    found: true,
    width: width,
    height: height,
    icon: element
  };
}
var missingIconResolutionMixin = {
  found: false,
  width: 512,
  height: 512
};
function maybeNotifyMissing(iconName, prefix) {
  if (!PRODUCTION && !config.showMissingIcons && iconName) {
    console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
  }
}
function findIcon(iconName, prefix) {
  var givenPrefix = prefix;
  if (prefix === 'fa' && config.styleDefault !== null) {
    prefix = getDefaultUsablePrefix();
  }
  return new Promise(function (resolve, reject) {
    var val = {
      found: false,
      width: 512,
      height: 512,
      icon: callProvided('missingIconAbstract') || {}
    };
    if (givenPrefix === 'fa') {
      var shim = byOldName(iconName) || {};
      iconName = shim.iconName || iconName;
      prefix = shim.prefix || prefix;
    }
    if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
      var icon = styles$1[prefix][iconName];
      return resolve(asFoundIcon(icon));
    }
    maybeNotifyMissing(iconName, prefix);
    resolve(_objectSpread2(_objectSpread2({}, missingIconResolutionMixin), {}, {
      icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
    }));
  });
}
var noop$1 = function noop() {};
var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};
var preamble = "FA \"6.2.1\"";
var begin = function begin(name) {
  p.mark("".concat(preamble, " ").concat(name, " begins"));
  return function () {
    return end(name);
  };
};
var end = function end(name) {
  p.mark("".concat(preamble, " ").concat(name, " ends"));
  p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
};
var perf = {
  begin: begin,
  end: end
};
var noop$2 = function noop() {};
function isWatched(node) {
  var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
  return typeof i2svg === 'string';
}
function hasPrefixAndIcon(node) {
  var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
  var icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
  return prefix && icon;
}
function hasBeenReplaced(node) {
  return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
}
function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }
  var mutator = mutators[config.autoReplaceSvg];
  return mutator || mutators.replace;
}
function createElementNS(tag) {
  return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
}
function createElement(tag) {
  return DOCUMENT.createElement(tag);
}
function convertSVG(abstractObj) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$ceFn = params.ceFn,
    ceFn = _params$ceFn === void 0 ? abstractObj.tag === 'svg' ? createElementNS : createElement : _params$ceFn;
  if (typeof abstractObj === 'string') {
    return DOCUMENT.createTextNode(abstractObj);
  }
  var tag = ceFn(abstractObj.tag);
  Object.keys(abstractObj.attributes || []).forEach(function (key) {
    tag.setAttribute(key, abstractObj.attributes[key]);
  });
  var children = abstractObj.children || [];
  children.forEach(function (child) {
    tag.appendChild(convertSVG(child, {
      ceFn: ceFn
    }));
  });
  return tag;
}
function nodeAsComment(node) {
  var comment = " ".concat(node.outerHTML, " ");
  /* BEGIN.ATTRIBUTION */

  comment = "".concat(comment, "Font Awesome fontawesome.com ");
  /* END.ATTRIBUTION */

  return comment;
}
var mutators = {
  replace: function replace(mutation) {
    var node = mutation[0];
    if (node.parentNode) {
      mutation[1].forEach(function (abstract) {
        node.parentNode.insertBefore(convertSVG(abstract), node);
      });
      if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
        var comment = DOCUMENT.createComment(nodeAsComment(node));
        node.parentNode.replaceChild(comment, node);
      } else {
        node.remove();
      }
    }
  },
  nest: function nest(mutation) {
    var node = mutation[0];
    var abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
    // Short-circuit to the standard replacement

    if (~classArray(node).indexOf(config.replacementClass)) {
      return mutators.replace(mutation);
    }
    var forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
    delete abstract[0].attributes.id;
    if (abstract[0].attributes.class) {
      var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }
        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(' ');
      if (splitClasses.toNode.length === 0) {
        node.removeAttribute('class');
      } else {
        node.setAttribute('class', splitClasses.toNode.join(' '));
      }
    }
    var newInnerHTML = abstract.map(function (a) {
      return toHtml(a);
    }).join('\n');
    node.setAttribute(DATA_FA_I2SVG, '');
    node.innerHTML = newInnerHTML;
  }
};
function performOperationSync(op) {
  op();
}
function perform(mutations, callback) {
  var callbackFunction = typeof callback === 'function' ? callback : noop$2;
  if (mutations.length === 0) {
    callbackFunction();
  } else {
    var frame = performOperationSync;
    if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
      frame = WINDOW.requestAnimationFrame || performOperationSync;
    }
    frame(function () {
      var mutator = getMutator();
      var mark = perf.begin('mutate');
      mutations.map(mutator);
      mark();
      callbackFunction();
    });
  }
}
var disabled = false;
function disableObservation() {
  disabled = true;
}
function enableObservation() {
  disabled = false;
}
var mo = null;
function observe(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }
  if (!config.observeMutations) {
    return;
  }
  var _options$treeCallback = options.treeCallback,
    treeCallback = _options$treeCallback === void 0 ? noop$2 : _options$treeCallback,
    _options$nodeCallback = options.nodeCallback,
    nodeCallback = _options$nodeCallback === void 0 ? noop$2 : _options$nodeCallback,
    _options$pseudoElemen = options.pseudoElementsCallback,
    pseudoElementsCallback = _options$pseudoElemen === void 0 ? noop$2 : _options$pseudoElemen,
    _options$observeMutat = options.observeMutationsRoot,
    observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
  mo = new MUTATION_OBSERVER(function (objects) {
    if (disabled) return;
    var defaultPrefix = getDefaultUsablePrefix();
    toArray(objects).forEach(function (mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }
        treeCallback(mutationRecord.target);
      }
      if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }
      if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
          var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
            prefix = _getCanonicalIcon.prefix,
            iconName = _getCanonicalIcon.iconName;
          mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
          if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
        } else if (hasBeenReplaced(mutationRecord.target)) {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });
  if (!IS_DOM) return;
  mo.observe(observeMutationsRoot, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });
}
function disconnect() {
  if (!mo) return;
  mo.disconnect();
}
function styleParser(node) {
  var style = node.getAttribute('style');
  var val = [];
  if (style) {
    val = style.split(';').reduce(function (acc, style) {
      var styles = style.split(':');
      var prop = styles[0];
      var value = styles.slice(1);
      if (prop && value.length > 0) {
        acc[prop] = value.join(':').trim();
      }
      return acc;
    }, {});
  }
  return val;
}
function classParser(node) {
  var existingPrefix = node.getAttribute('data-prefix');
  var existingIconName = node.getAttribute('data-icon');
  var innerText = node.innerText !== undefined ? node.innerText.trim() : '';
  var val = getCanonicalIcon(classArray(node));
  if (!val.prefix) {
    val.prefix = getDefaultUsablePrefix();
  }
  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }
  if (val.iconName && val.prefix) {
    return val;
  }
  if (val.prefix && innerText.length > 0) {
    val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
  }
  if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
    val.iconName = node.firstChild.data;
  }
  return val;
}
function attributesParser(node) {
  var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
    if (acc.name !== 'class' && acc.name !== 'style') {
      acc[attr.name] = attr.value;
    }
    return acc;
  }, {});
  var title = node.getAttribute('title');
  var titleId = node.getAttribute('data-fa-title-id');
  if (config.autoA11y) {
    if (title) {
      extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
    } else {
      extraAttributes['aria-hidden'] = 'true';
      extraAttributes['focusable'] = 'false';
    }
  }
  return extraAttributes;
}
function blankMeta() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function parseMeta(node) {
  var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    styleParser: true
  };
  var _classParser = classParser(node),
    iconName = _classParser.iconName,
    prefix = _classParser.prefix,
    extraClasses = _classParser.rest;
  var extraAttributes = attributesParser(node);
  var pluginMeta = chainHooks('parseNodeAttributes', {}, node);
  var extraStyles = parser.styleParser ? styleParser(node) : [];
  return _objectSpread2({
    iconName: iconName,
    title: node.getAttribute('title'),
    titleId: node.getAttribute('data-fa-title-id'),
    prefix: prefix,
    transform: meaninglessTransform,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: false,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    }
  }, pluginMeta);
}
var styles$2 = namespace.styles;
function generateMutation(node) {
  var nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
    styleParser: false
  }) : parseMeta(node);
  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return callProvided('generateLayersText', node, nodeMeta);
  } else {
    return callProvided('generateSvgReplacementMutation', node, nodeMeta);
  }
}
var knownPrefixes = new Set();
FAMILIES.map(function (family) {
  knownPrefixes.add("fa-".concat(family));
});
Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC]).map(knownPrefixes.add.bind(knownPrefixes));
Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP]).map(knownPrefixes.add.bind(knownPrefixes));
knownPrefixes = _toConsumableArray(knownPrefixes);
function onTree(root) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!IS_DOM) return Promise.resolve();
  var htmlClassList = DOCUMENT.documentElement.classList;
  var hclAdd = function hclAdd(suffix) {
    return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  };
  var hclRemove = function hclRemove(suffix) {
    return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  };
  var prefixes = config.autoFetchSvg ? knownPrefixes : FAMILIES.map(function (f) {
    return "fa-".concat(f);
  }).concat(Object.keys(styles$2));
  if (!prefixes.includes('fa')) {
    prefixes.push('fa');
  }
  var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function (p) {
    return ".".concat(p, ":not([").concat(DATA_FA_I2SVG, "])");
  })).join(', ');
  if (prefixesDomQuery.length === 0) {
    return Promise.resolve();
  }
  var candidates = [];
  try {
    candidates = toArray(root.querySelectorAll(prefixesDomQuery));
  } catch (e) {// noop
  }
  if (candidates.length > 0) {
    hclAdd('pending');
    hclRemove('complete');
  } else {
    return Promise.resolve();
  }
  var mark = perf.begin('onTree');
  var mutations = candidates.reduce(function (acc, node) {
    try {
      var mutation = generateMutation(node);
      if (mutation) {
        acc.push(mutation);
      }
    } catch (e) {
      if (!PRODUCTION) {
        if (e.name === 'MissingIcon') {
          console.error(e);
        }
      }
    }
    return acc;
  }, []);
  return new Promise(function (resolve, reject) {
    Promise.all(mutations).then(function (resolvedMutations) {
      perform(resolvedMutations, function () {
        hclAdd('active');
        hclAdd('complete');
        hclRemove('pending');
        if (typeof callback === 'function') callback();
        mark();
        resolve();
      });
    }).catch(function (e) {
      mark();
      reject(e);
    });
  });
}
function onNode(node) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  generateMutation(node).then(function (mutation) {
    if (mutation) {
      perform([mutation], callback);
    }
  });
}
function resolveIcons(next) {
  return function (maybeIconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    var mask = params.mask;
    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }
    return next(iconDefinition, _objectSpread2(_objectSpread2({}, params), {}, {
      mask: mask
    }));
  };
}
var render = function render(iconDefinition) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform = params.transform,
    transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
    _params$symbol = params.symbol,
    symbol = _params$symbol === void 0 ? false : _params$symbol,
    _params$mask = params.mask,
    mask = _params$mask === void 0 ? null : _params$mask,
    _params$maskId = params.maskId,
    maskId = _params$maskId === void 0 ? null : _params$maskId,
    _params$title = params.title,
    title = _params$title === void 0 ? null : _params$title,
    _params$titleId = params.titleId,
    titleId = _params$titleId === void 0 ? null : _params$titleId,
    _params$classes = params.classes,
    classes = _params$classes === void 0 ? [] : _params$classes,
    _params$attributes = params.attributes,
    attributes = _params$attributes === void 0 ? {} : _params$attributes,
    _params$styles = params.styles,
    styles = _params$styles === void 0 ? {} : _params$styles;
  if (!iconDefinition) return;
  var prefix = iconDefinition.prefix,
    iconName = iconDefinition.iconName,
    icon = iconDefinition.icon;
  return domVariants(_objectSpread2({
    type: 'icon'
  }, iconDefinition), function () {
    callHooks('beforeDOMElementCreation', {
      iconDefinition: iconDefinition,
      params: params
    });
    if (config.autoA11y) {
      if (title) {
        attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        attributes['aria-hidden'] = 'true';
        attributes['focusable'] = 'false';
      }
    }
    return makeInlineSvgAbstract({
      icons: {
        main: asFoundIcon(icon),
        mask: mask ? asFoundIcon(mask.icon) : {
          found: false,
          width: null,
          height: null,
          icon: {}
        }
      },
      prefix: prefix,
      iconName: iconName,
      transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
      symbol: symbol,
      title: title,
      maskId: maskId,
      titleId: titleId,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: classes
      }
    });
  });
};
var ReplaceElements = {
  mixout: function mixout() {
    return {
      icon: resolveIcons(render)
    };
  },
  hooks: function hooks() {
    return {
      mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
        accumulator.treeCallback = onTree;
        accumulator.nodeCallback = onNode;
        return accumulator;
      }
    };
  },
  provides: function provides(providers$$1) {
    providers$$1.i2svg = function (params) {
      var _params$node = params.node,
        node = _params$node === void 0 ? DOCUMENT : _params$node,
        _params$callback = params.callback,
        callback = _params$callback === void 0 ? function () {} : _params$callback;
      return onTree(node, callback);
    };
    providers$$1.generateSvgReplacementMutation = function (node, nodeMeta) {
      var iconName = nodeMeta.iconName,
        title = nodeMeta.title,
        titleId = nodeMeta.titleId,
        prefix = nodeMeta.prefix,
        transform = nodeMeta.transform,
        symbol = nodeMeta.symbol,
        mask = nodeMeta.mask,
        maskId = nodeMeta.maskId,
        extra = nodeMeta.extra;
      return new Promise(function (resolve, reject) {
        Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
          found: false,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            main = _ref2[0],
            mask = _ref2[1];
          resolve([node, makeInlineSvgAbstract({
            icons: {
              main: main,
              mask: mask
            },
            prefix: prefix,
            iconName: iconName,
            transform: transform,
            symbol: symbol,
            maskId: maskId,
            title: title,
            titleId: titleId,
            extra: extra,
            watchable: true
          })]);
        }).catch(reject);
      });
    };
    providers$$1.generateAbstractIcon = function (_ref3) {
      var children = _ref3.children,
        attributes = _ref3.attributes,
        main = _ref3.main,
        transform = _ref3.transform,
        styles = _ref3.styles;
      var styleString = joinStyles(styles);
      if (styleString.length > 0) {
        attributes['style'] = styleString;
      }
      var nextChild;
      if (transformIsMeaningful(transform)) {
        nextChild = callProvided('generateAbstractTransformGrouping', {
          main: main,
          transform: transform,
          containerWidth: main.width,
          iconWidth: main.width
        });
      }
      children.push(nextChild || main.icon);
      return {
        children: children,
        attributes: attributes
      };
    };
  }
};
var Layers = {
  mixout: function mixout() {
    return {
      layer: function layer(assembler) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _params$classes = params.classes,
          classes = _params$classes === void 0 ? [] : _params$classes;
        return domVariants({
          type: 'layer'
        }, function () {
          callHooks('beforeDOMElementCreation', {
            assembler: assembler,
            params: params
          });
          var children = [];
          assembler(function (args) {
            Array.isArray(args) ? args.map(function (a) {
              children = children.concat(a.abstract);
            }) : children = children.concat(args.abstract);
          });
          return [{
            tag: 'span',
            attributes: {
              class: ["".concat(config.cssPrefix, "-layers")].concat(_toConsumableArray(classes)).join(' ')
            },
            children: children
          }];
        });
      }
    };
  }
};
var LayersCounter = {
  mixout: function mixout() {
    return {
      counter: function counter(content) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _params$title = params.title,
          title = _params$title === void 0 ? null : _params$title,
          _params$classes = params.classes,
          classes = _params$classes === void 0 ? [] : _params$classes,
          _params$attributes = params.attributes,
          attributes = _params$attributes === void 0 ? {} : _params$attributes,
          _params$styles = params.styles,
          styles = _params$styles === void 0 ? {} : _params$styles;
        return domVariants({
          type: 'counter',
          content: content
        }, function () {
          callHooks('beforeDOMElementCreation', {
            content: content,
            params: params
          });
          return makeLayersCounterAbstract({
            content: content.toString(),
            title: title,
            extra: {
              attributes: attributes,
              styles: styles,
              classes: ["".concat(config.cssPrefix, "-layers-counter")].concat(_toConsumableArray(classes))
            }
          });
        });
      }
    };
  }
};
var LayersText = {
  mixout: function mixout() {
    return {
      text: function text(content) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _params$transform = params.transform,
          transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
          _params$title = params.title,
          title = _params$title === void 0 ? null : _params$title,
          _params$classes = params.classes,
          classes = _params$classes === void 0 ? [] : _params$classes,
          _params$attributes = params.attributes,
          attributes = _params$attributes === void 0 ? {} : _params$attributes,
          _params$styles = params.styles,
          styles = _params$styles === void 0 ? {} : _params$styles;
        return domVariants({
          type: 'text',
          content: content
        }, function () {
          callHooks('beforeDOMElementCreation', {
            content: content,
            params: params
          });
          return makeLayersTextAbstract({
            content: content,
            transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
            title: title,
            extra: {
              attributes: attributes,
              styles: styles,
              classes: ["".concat(config.cssPrefix, "-layers-text")].concat(_toConsumableArray(classes))
            }
          });
        });
      }
    };
  },
  provides: function provides(providers$$1) {
    providers$$1.generateLayersText = function (node, nodeMeta) {
      var title = nodeMeta.title,
        transform = nodeMeta.transform,
        extra = nodeMeta.extra;
      var width = null;
      var height = null;
      if (IS_IE) {
        var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
        var boundingClientRect = node.getBoundingClientRect();
        width = boundingClientRect.width / computedFontSize;
        height = boundingClientRect.height / computedFontSize;
      }
      if (config.autoA11y && !title) {
        extra.attributes['aria-hidden'] = 'true';
      }
      return Promise.resolve([node, makeLayersTextAbstract({
        content: node.innerHTML,
        width: width,
        height: height,
        transform: transform,
        title: title,
        extra: extra,
        watchable: true
      })]);
    };
  }
};
var CLEAN_CONTENT_PATTERN = new RegExp("\"", 'ug');
var SECONDARY_UNICODE_RANGE = [1105920, 1112319];
function hexValueFromContent(content) {
  var cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
  var codePoint = codePointAt(cleaned, 0);
  var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
  var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
  return {
    value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
    isSecondary: isPrependTen || isDoubled
  };
}
function replaceForPosition(node, position) {
  var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
  return new Promise(function (resolve, reject) {
    if (node.getAttribute(pendingAttribute) !== null) {
      // This node is already being processed
      return resolve();
    }
    var children = toArray(node.children);
    var alreadyProcessedPseudoElement = children.filter(function (c) {
      return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
    })[0];
    var styles = WINDOW.getComputedStyle(node, position);
    var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
    var fontWeight = styles.getPropertyValue('font-weight');
    var content = styles.getPropertyValue('content');
    if (alreadyProcessedPseudoElement && !fontFamily) {
      // If we've already processed it but the current computed style does not result in a font-family,
      // that probably means that a class name that was previously present to make the icon has been
      // removed. So we now should delete the icon.
      node.removeChild(alreadyProcessedPseudoElement);
      return resolve();
    } else if (fontFamily && content !== 'none' && content !== '') {
      var _content = styles.getPropertyValue('content');
      var family = ~['Sharp'].indexOf(fontFamily[2]) ? FAMILY_SHARP : FAMILY_CLASSIC;
      var prefix = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(fontFamily[2]) ? STYLE_TO_PREFIX[family][fontFamily[2].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[family][fontWeight];
      var _hexValueFromContent = hexValueFromContent(_content),
        hexValue = _hexValueFromContent.value,
        isSecondary = _hexValueFromContent.isSecondary;
      var isV4 = fontFamily[0].startsWith('FontAwesome');
      var iconName = byUnicode(prefix, hexValue);
      var iconIdentifier = iconName;
      if (isV4) {
        var iconName4 = byOldUnicode(hexValue);
        if (iconName4.iconName && iconName4.prefix) {
          iconName = iconName4.iconName;
          prefix = iconName4.prefix;
        }
      } // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
      // already done so with the same prefix and iconName

      if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
        node.setAttribute(pendingAttribute, iconIdentifier);
        if (alreadyProcessedPseudoElement) {
          // Delete the old one, since we're replacing it with a new one
          node.removeChild(alreadyProcessedPseudoElement);
        }
        var meta = blankMeta();
        var extra = meta.extra;
        extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
        findIcon(iconName, prefix).then(function (main) {
          var abstract = makeInlineSvgAbstract(_objectSpread2(_objectSpread2({}, meta), {}, {
            icons: {
              main: main,
              mask: emptyCanonicalIcon()
            },
            prefix: prefix,
            iconName: iconIdentifier,
            extra: extra,
            watchable: true
          }));
          var element = DOCUMENT.createElement('svg');
          if (position === '::before') {
            node.insertBefore(element, node.firstChild);
          } else {
            node.appendChild(element);
          }
          element.outerHTML = abstract.map(function (a) {
            return toHtml(a);
          }).join('\n');
          node.removeAttribute(pendingAttribute);
          resolve();
        }).catch(reject);
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}
function replace(node) {
  return Promise.all([replaceForPosition(node, '::before'), replaceForPosition(node, '::after')]);
}
function processable(node) {
  return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
}
function searchPseudoElements(root) {
  if (!IS_DOM) return;
  return new Promise(function (resolve, reject) {
    var operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
    var end = perf.begin('searchPseudoElements');
    disableObservation();
    Promise.all(operations).then(function () {
      end();
      enableObservation();
      resolve();
    }).catch(function () {
      end();
      enableObservation();
      reject();
    });
  });
}
var PseudoElements = {
  hooks: function hooks() {
    return {
      mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
        accumulator.pseudoElementsCallback = searchPseudoElements;
        return accumulator;
      }
    };
  },
  provides: function provides(providers$$1) {
    providers$$1.pseudoElements2svg = function (params) {
      var _params$node = params.node,
        node = _params$node === void 0 ? DOCUMENT : _params$node;
      if (config.searchPseudoElements) {
        searchPseudoElements(node);
      }
    };
  }
};
var _unwatched = false;
var MutationObserver$1 = {
  mixout: function mixout() {
    return {
      dom: {
        unwatch: function unwatch() {
          disableObservation();
          _unwatched = true;
        }
      }
    };
  },
  hooks: function hooks() {
    return {
      bootstrap: function bootstrap() {
        observe(chainHooks('mutationObserverCallbacks', {}));
      },
      noAuto: function noAuto() {
        disconnect();
      },
      watch: function watch(params) {
        var observeMutationsRoot = params.observeMutationsRoot;
        if (_unwatched) {
          enableObservation();
        } else {
          observe(chainHooks('mutationObserverCallbacks', {
            observeMutationsRoot: observeMutationsRoot
          }));
        }
      }
    };
  }
};
var parseTransformString = function parseTransformString(transformString) {
  var transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };
  return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
    var parts = n.toLowerCase().split('-');
    var first = parts[0];
    var rest = parts.slice(1).join('-');
    if (first && rest === 'h') {
      acc.flipX = true;
      return acc;
    }
    if (first && rest === 'v') {
      acc.flipY = true;
      return acc;
    }
    rest = parseFloat(rest);
    if (isNaN(rest)) {
      return acc;
    }
    switch (first) {
      case 'grow':
        acc.size = acc.size + rest;
        break;
      case 'shrink':
        acc.size = acc.size - rest;
        break;
      case 'left':
        acc.x = acc.x - rest;
        break;
      case 'right':
        acc.x = acc.x + rest;
        break;
      case 'up':
        acc.y = acc.y - rest;
        break;
      case 'down':
        acc.y = acc.y + rest;
        break;
      case 'rotate':
        acc.rotate = acc.rotate + rest;
        break;
    }
    return acc;
  }, transform);
};
var PowerTransforms = {
  mixout: function mixout() {
    return {
      parse: {
        transform: function transform(transformString) {
          return parseTransformString(transformString);
        }
      }
    };
  },
  hooks: function hooks() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var transformString = node.getAttribute('data-fa-transform');
        if (transformString) {
          accumulator.transform = parseTransformString(transformString);
        }
        return accumulator;
      }
    };
  },
  provides: function provides(providers) {
    providers.generateAbstractTransformGrouping = function (_ref) {
      var main = _ref.main,
        transform = _ref.transform,
        containerWidth = _ref.containerWidth,
        iconWidth = _ref.iconWidth;
      var outer = {
        transform: "translate(".concat(containerWidth / 2, " 256)")
      };
      var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
      var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
      var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
      var inner = {
        transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
      };
      var path = {
        transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
      };
      var operations = {
        outer: outer,
        inner: inner,
        path: path
      };
      return {
        tag: 'g',
        attributes: _objectSpread2({}, operations.outer),
        children: [{
          tag: 'g',
          attributes: _objectSpread2({}, operations.inner),
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: _objectSpread2(_objectSpread2({}, main.icon.attributes), operations.path)
          }]
        }]
      };
    };
  }
};
var ALL_SPACE = {
  x: 0,
  y: 0,
  width: '100%',
  height: '100%'
};
function fillBlack(abstract) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = 'black';
  }
  return abstract;
}
function deGroup(abstract) {
  if (abstract.tag === 'g') {
    return abstract.children;
  } else {
    return [abstract];
  }
}
var Masks = {
  hooks: function hooks() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var maskData = node.getAttribute('data-fa-mask');
        var mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(function (i) {
          return i.trim();
        }));
        if (!mask.prefix) {
          mask.prefix = getDefaultUsablePrefix();
        }
        accumulator.mask = mask;
        accumulator.maskId = node.getAttribute('data-fa-mask-id');
        return accumulator;
      }
    };
  },
  provides: function provides(providers) {
    providers.generateAbstractMask = function (_ref) {
      var children = _ref.children,
        attributes = _ref.attributes,
        main = _ref.main,
        mask = _ref.mask,
        explicitMaskId = _ref.maskId,
        transform = _ref.transform;
      var mainWidth = main.width,
        mainPath = main.icon;
      var maskWidth = mask.width,
        maskPath = mask.icon;
      var trans = transformForSvg({
        transform: transform,
        containerWidth: maskWidth,
        iconWidth: mainWidth
      });
      var maskRect = {
        tag: 'rect',
        attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
          fill: 'white'
        })
      };
      var maskInnerGroupChildrenMixin = mainPath.children ? {
        children: mainPath.children.map(fillBlack)
      } : {};
      var maskInnerGroup = {
        tag: 'g',
        attributes: _objectSpread2({}, trans.inner),
        children: [fillBlack(_objectSpread2({
          tag: mainPath.tag,
          attributes: _objectSpread2(_objectSpread2({}, mainPath.attributes), trans.path)
        }, maskInnerGroupChildrenMixin))]
      };
      var maskOuterGroup = {
        tag: 'g',
        attributes: _objectSpread2({}, trans.outer),
        children: [maskInnerGroup]
      };
      var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
      var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
      var maskTag = {
        tag: 'mask',
        attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
          id: maskId,
          maskUnits: 'userSpaceOnUse',
          maskContentUnits: 'userSpaceOnUse'
        }),
        children: [maskRect, maskOuterGroup]
      };
      var defs = {
        tag: 'defs',
        children: [{
          tag: 'clipPath',
          attributes: {
            id: clipId
          },
          children: deGroup(maskPath)
        }, maskTag]
      };
      children.push(defs, {
        tag: 'rect',
        attributes: _objectSpread2({
          fill: 'currentColor',
          'clip-path': "url(#".concat(clipId, ")"),
          mask: "url(#".concat(maskId, ")")
        }, ALL_SPACE)
      });
      return {
        children: children,
        attributes: attributes
      };
    };
  }
};
var MissingIconIndicator = {
  provides: function provides(providers) {
    var reduceMotion = false;
    if (WINDOW.matchMedia) {
      reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    providers.missingIconAbstract = function () {
      var gChildren = [];
      var FILL = {
        fill: 'currentColor'
      };
      var ANIMATION_BASE = {
        attributeType: 'XML',
        repeatCount: 'indefinite',
        dur: '2s'
      }; // Ring

      gChildren.push({
        tag: 'path',
        attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
          d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
        })
      });
      var OPACITY_ANIMATE = _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
        attributeName: 'opacity'
      });
      var dot = {
        tag: 'circle',
        attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
          cx: '256',
          cy: '364',
          r: '28'
        }),
        children: []
      };
      if (!reduceMotion) {
        dot.children.push({
          tag: 'animate',
          attributes: _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
            attributeName: 'r',
            values: '28;14;28;28;14;28;'
          })
        }, {
          tag: 'animate',
          attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
            values: '1;0;1;1;0;1;'
          })
        });
      }
      gChildren.push(dot);
      gChildren.push({
        tag: 'path',
        attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
          opacity: '1',
          d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
        }),
        children: reduceMotion ? [] : [{
          tag: 'animate',
          attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
            values: '1;0;0;0;0;1;'
          })
        }]
      });
      if (!reduceMotion) {
        // Exclamation
        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            opacity: '0',
            d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
          }),
          children: [{
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: '0;0;1;1;0;0;'
            })
          }]
        });
      }
      return {
        tag: 'g',
        attributes: {
          'class': 'missing'
        },
        children: gChildren
      };
    };
  }
};
var SvgSymbols = {
  hooks: function hooks() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var symbolData = node.getAttribute('data-fa-symbol');
        var symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
        accumulator['symbol'] = symbol;
        return accumulator;
      }
    };
  }
};
var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];
registerPlugins(plugins, {
  mixoutsTo: api
});
var noAuto$1 = api.noAuto;
var config$1 = api.config;
var library$1 = api.library;
var dom$1 = api.dom;
var parse$1 = api.parse;
var findIconDefinition$1 = api.findIconDefinition;
var toHtml$1 = api.toHtml;
var icon = api.icon;
var layer = api.layer;
var text = api.text;
var counter = api.counter;


/***/ }),

/***/ "./node_modules/@fortawesome/free-brands-svg-icons/index.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/@fortawesome/free-brands-svg-icons/index.mjs ***!
  \*******************************************************************/
/*! exports provided: fab, prefix, faMonero, faHooli, faYelp, faCcVisa, faLastfm, faShopware, faCreativeCommonsNc, faAws, faRedhat, faYoast, faCloudflare, faUps, faWpexplorer, faDyalog, faBity, faStackpath, faBuysellads, faFirstOrder, faModx, faGuilded, faVnv, faSquareJs, faJsSquare, faMicrosoft, faQq, faOrcid, faJava, faInvision, faCreativeCommonsPdAlt, faCentercode, faGlideG, faDrupal, faHireAHelper, faCreativeCommonsBy, faUnity, faWhmcs, faRocketchat, faVk, faUntappd, faMailchimp, faCss3Alt, faSquareReddit, faRedditSquare, faVimeoV, faContao, faSquareFontAwesome, faDeskpro, faSistrix, faSquareInstagram, faInstagramSquare, faBattleNet, faTheRedYeti, faSquareHackerNews, faHackerNewsSquare, faEdge, faNapster, faSquareSnapchat, faSnapchatSquare, faGooglePlusG, faArtstation, faMarkdown, faSourcetree, faGooglePlus, faDiaspora, faFoursquare, faStackOverflow, faGithubAlt, faPhoenixSquadron, faPagelines, faAlgolia, faRedRiver, faCreativeCommonsSa, faSafari, faGoogle, faSquareFontAwesomeStroke, faFontAwesomeAlt, faAtlassian, faLinkedinIn, faDigitalOcean, faNimblr, faChromecast, faEvernote, faHackerNews, faCreativeCommonsSampling, faAdversal, faCreativeCommons, faWatchmanMonitoring, faFonticons, faWeixin, faShirtsinbulk, faCodepen, faGitAlt, faLyft, faRev, faWindows, faWizardsOfTheCoast, faSquareViadeo, faViadeoSquare, faMeetup, faCentos, faAdn, faCloudsmith, faPiedPiperAlt, faSquareDribbble, faDribbbleSquare, faCodiepie, faNode, faMix, faSteam, faCcApplePay, faScribd, faOpenid, faInstalod, faExpeditedssl, faSellcast, faSquareTwitter, faTwitterSquare, faRProject, faDelicious, faFreebsd, faVuejs, faAccusoft, faIoxhost, faFonticonsFi, faAppStore, faCcMastercard, faItunesNote, faGolang, faKickstarter, faGrav, faWeibo, faUncharted, faFirstdraft, faSquareYoutube, faYoutubeSquare, faWikipediaW, faWpressr, faRendact, faAngellist, faGalacticRepublic, faNfcDirectional, faSkype, faJoget, faFedora, faStripeS, faMeta, faLaravel, faHotjar, faBluetoothB, faStickerMule, faCreativeCommonsZero, faHips, faBehance, faReddit, faDiscord, faChrome, faAppStoreIos, faCcDiscover, faWpbeginner, faConfluence, faMdb, faDochub, faAccessibleIcon, faEbay, faAmazon, faUnsplash, faYarn, faSquareSteam, faSteamSquare, fa500px, faSquareVimeo, faVimeoSquare, faAsymmetrik, faFontAwesome, faFontAwesomeFlag, faFontAwesomeLogoFull, faGratipay, faApple, faHive, faGitkraken, faKeybase, faApplePay, faPadlet, faAmazonPay, faSquareGithub, faGithubSquare, faStumbleupon, faFedex, faPhoenixFramework, faShopify, faNeos, faHackerrank, faResearchgate, faSwift, faAngular, faSpeakap, faAngrycreative, faYCombinator, faEmpire, faEnvira, faSquareGitlab, faGitlabSquare, faStudiovinari, faPiedPiper, faWordpress, faProductHunt, faFirefox, faLinode, faGoodreads, faSquareOdnoklassniki, faOdnoklassnikiSquare, faJsfiddle, faSith, faThemeisle, faPage4, faHashnode, faReact, faCcPaypal, faSquarespace, faCcStripe, faCreativeCommonsShare, faBitcoin, faKeycdn, faOpera, faItchIo, faUmbraco, faGalacticSenate, faUbuntu, faDraft2digital, faStripe, faHouzz, faGg, faDhl, faSquarePinterest, faPinterestSquare, faXing, faBlackberry, faCreativeCommonsPd, faPlaystation, faQuinscape, faLess, faBloggerB, faOpencart, faVine, faPaypal, faGitlab, faTypo3, faRedditAlien, faYahoo, faDailymotion, faAffiliatetheme, faPiedPiperPp, faBootstrap, faOdnoklassniki, faNfcSymbol, faEthereum, faSpeakerDeck, faCreativeCommonsNcEu, faPatreon, faAvianex, faEllo, faGofore, faBimobject, faFacebookF, faSquareGooglePlus, faGooglePlusSquare, faMandalorian, faFirstOrderAlt, faOsi, faGoogleWallet, faDAndDBeyond, faPeriscope, faFulcrum, faCloudscale, faForumbee, faMizuni, faSchlix, faSquareXing, faXingSquare, faBandcamp, faWpforms, faCloudversify, faUsps, faMegaport, faMagento, faSpotify, faOptinMonster, faFly, faAviato, faItunes, faCuttlefish, faBlogger, faFlickr, faViber, faSoundcloud, faDigg, faTencentWeibo, faSymfony, faMaxcdn, faEtsy, faFacebookMessenger, faAudible, faThinkPeaks, faBilibili, faErlang, faCottonBureau, faDashcube, fa42Group, faInnosoft, faStackExchange, faElementor, faSquarePiedPiper, faPiedPiperSquare, faCreativeCommonsNd, faPalfed, faSuperpowers, faResolving, faXbox, faSearchengin, faTiktok, faSquareFacebook, faFacebookSquare, faRenren, faLinux, faGlide, faLinkedin, faHubspot, faDeploydog, faTwitch, faRavelry, faMixer, faSquareLastfm, faLastfmSquare, faVimeo, faMendeley, faUniregistry, faFigma, faCreativeCommonsRemix, faCcAmazonPay, faDropbox, faInstagram, faCmplid, faFacebook, faGripfire, faJediOrder, faUikit, faFortAwesomeAlt, faPhabricator, faUssunnah, faEarlybirds, faTradeFederation, faAutoprefixer, faWhatsapp, faSlideshare, faGooglePlay, faViadeo, faLine, faGoogleDrive, faServicestack, faSimplybuilt, faBitbucket, faImdb, faDeezer, faRaspberryPi, faJira, faDocker, faScreenpal, faBluetooth, faGitter, faDAndD, faMicroblog, faCcDinersClub, faGgCircle, faPiedPiperHat, faKickstarterK, faYandex, faReadme, faHtml5, faSellsy, faSass, faWirsindhandwerk, faWsh, faBuromobelexperte, faSalesforce, faOctopusDeploy, faMedapps, faNs8, faPinterestP, faApper, faFortAwesome, faWaze, faCcJcb, faSnapchat, faSnapchatGhost, faFantasyFlightGames, faRust, faWix, faSquareBehance, faBehanceSquare, faSupple, faRebel, faCss3, faStaylinked, faKaggle, faSpaceAwesome, faDeviantart, faCpanel, faGoodreadsG, faSquareGit, faGitSquare, faSquareTumblr, faTumblrSquare, faTrello, faCreativeCommonsNcJp, faGetPocket, faPerbyte, faGrunt, faWeebly, faConnectdevelop, faLeanpub, faBlackTie, faThemeco, faPython, faAndroid, faBots, faFreeCodeCamp, faHornbill, faJs, faIdeal, faGit, faDev, faSketch, faYandexInternational, faCcAmex, faUber, faGithub, faPhp, faAlipay, faYoutube, faSkyatlas, faFirefoxBrowser, faReplyd, faSuse, faJenkins, faTwitter, faRockrms, faPinterest, faBuffer, faNpm, faYammer, faBtc, faDribbble, faStumbleuponCircle, faInternetExplorer, faTelegram, faTelegramPlane, faOldRepublic, faSquareWhatsapp, faWhatsappSquare, faNodeJs, faEdgeLegacy, faSlack, faSlackHash, faMedrt, faUsb, faTumblr, faVaadin, faQuora, faReacteurope, faMedium, faMediumM, faAmilia, faMixcloud, faFlipboard, faViacoin, faCriticalRole, faSitrox, faDiscourse, faJoomla, faMastodon, faAirbnb, faWolfPackBattalion, faBuyNLarge, faGulp, faCreativeCommonsSamplingPlus, faStrava, faEmber, faCanadianMapleLeaf, faTeamspeak, faPushed, faWordpressSimple, faNutritionix, faWodu, faGooglePay, faIntercom, faZhihu, faKorvue, faPix, faSteamSymbol */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fab", function() { return icons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefix", function() { return prefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMonero", function() { return faMonero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHooli", function() { return faHooli; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYelp", function() { return faYelp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcVisa", function() { return faCcVisa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLastfm", function() { return faLastfm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faShopware", function() { return faShopware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsNc", function() { return faCreativeCommonsNc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAws", function() { return faAws; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRedhat", function() { return faRedhat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYoast", function() { return faYoast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCloudflare", function() { return faCloudflare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUps", function() { return faUps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWpexplorer", function() { return faWpexplorer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDyalog", function() { return faDyalog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBity", function() { return faBity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStackpath", function() { return faStackpath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBuysellads", function() { return faBuysellads; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFirstOrder", function() { return faFirstOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faModx", function() { return faModx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGuilded", function() { return faGuilded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVnv", function() { return faVnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareJs", function() { return faSquareJs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJsSquare", function() { return faJsSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMicrosoft", function() { return faMicrosoft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faQq", function() { return faQq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOrcid", function() { return faOrcid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJava", function() { return faJava; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faInvision", function() { return faInvision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsPdAlt", function() { return faCreativeCommonsPdAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCentercode", function() { return faCentercode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGlideG", function() { return faGlideG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDrupal", function() { return faDrupal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHireAHelper", function() { return faHireAHelper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsBy", function() { return faCreativeCommonsBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUnity", function() { return faUnity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWhmcs", function() { return faWhmcs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRocketchat", function() { return faRocketchat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVk", function() { return faVk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUntappd", function() { return faUntappd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMailchimp", function() { return faMailchimp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCss3Alt", function() { return faCss3Alt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareReddit", function() { return faSquareReddit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRedditSquare", function() { return faRedditSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVimeoV", function() { return faVimeoV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faContao", function() { return faContao; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareFontAwesome", function() { return faSquareFontAwesome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDeskpro", function() { return faDeskpro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSistrix", function() { return faSistrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareInstagram", function() { return faSquareInstagram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faInstagramSquare", function() { return faInstagramSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBattleNet", function() { return faBattleNet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTheRedYeti", function() { return faTheRedYeti; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareHackerNews", function() { return faSquareHackerNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHackerNewsSquare", function() { return faHackerNewsSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEdge", function() { return faEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNapster", function() { return faNapster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareSnapchat", function() { return faSquareSnapchat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSnapchatSquare", function() { return faSnapchatSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGooglePlusG", function() { return faGooglePlusG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faArtstation", function() { return faArtstation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMarkdown", function() { return faMarkdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSourcetree", function() { return faSourcetree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGooglePlus", function() { return faGooglePlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDiaspora", function() { return faDiaspora; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFoursquare", function() { return faFoursquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStackOverflow", function() { return faStackOverflow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGithubAlt", function() { return faGithubAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPhoenixSquadron", function() { return faPhoenixSquadron; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPagelines", function() { return faPagelines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAlgolia", function() { return faAlgolia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRedRiver", function() { return faRedRiver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsSa", function() { return faCreativeCommonsSa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSafari", function() { return faSafari; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGoogle", function() { return faGoogle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareFontAwesomeStroke", function() { return faSquareFontAwesomeStroke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFontAwesomeAlt", function() { return faFontAwesomeAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAtlassian", function() { return faAtlassian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLinkedinIn", function() { return faLinkedinIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDigitalOcean", function() { return faDigitalOcean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNimblr", function() { return faNimblr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faChromecast", function() { return faChromecast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEvernote", function() { return faEvernote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHackerNews", function() { return faHackerNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsSampling", function() { return faCreativeCommonsSampling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAdversal", function() { return faAdversal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommons", function() { return faCreativeCommons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWatchmanMonitoring", function() { return faWatchmanMonitoring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFonticons", function() { return faFonticons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWeixin", function() { return faWeixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faShirtsinbulk", function() { return faShirtsinbulk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCodepen", function() { return faCodepen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGitAlt", function() { return faGitAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLyft", function() { return faLyft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRev", function() { return faRev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWindows", function() { return faWindows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWizardsOfTheCoast", function() { return faWizardsOfTheCoast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareViadeo", function() { return faSquareViadeo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faViadeoSquare", function() { return faViadeoSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMeetup", function() { return faMeetup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCentos", function() { return faCentos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAdn", function() { return faAdn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCloudsmith", function() { return faCloudsmith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPiedPiperAlt", function() { return faPiedPiperAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareDribbble", function() { return faSquareDribbble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDribbbleSquare", function() { return faDribbbleSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCodiepie", function() { return faCodiepie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNode", function() { return faNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMix", function() { return faMix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSteam", function() { return faSteam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcApplePay", function() { return faCcApplePay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faScribd", function() { return faScribd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOpenid", function() { return faOpenid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faInstalod", function() { return faInstalod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faExpeditedssl", function() { return faExpeditedssl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSellcast", function() { return faSellcast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareTwitter", function() { return faSquareTwitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTwitterSquare", function() { return faTwitterSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRProject", function() { return faRProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDelicious", function() { return faDelicious; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFreebsd", function() { return faFreebsd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVuejs", function() { return faVuejs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAccusoft", function() { return faAccusoft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faIoxhost", function() { return faIoxhost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFonticonsFi", function() { return faFonticonsFi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAppStore", function() { return faAppStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcMastercard", function() { return faCcMastercard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faItunesNote", function() { return faItunesNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGolang", function() { return faGolang; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faKickstarter", function() { return faKickstarter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGrav", function() { return faGrav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWeibo", function() { return faWeibo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUncharted", function() { return faUncharted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFirstdraft", function() { return faFirstdraft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareYoutube", function() { return faSquareYoutube; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYoutubeSquare", function() { return faYoutubeSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWikipediaW", function() { return faWikipediaW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWpressr", function() { return faWpressr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRendact", function() { return faRendact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAngellist", function() { return faAngellist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGalacticRepublic", function() { return faGalacticRepublic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNfcDirectional", function() { return faNfcDirectional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSkype", function() { return faSkype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJoget", function() { return faJoget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFedora", function() { return faFedora; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStripeS", function() { return faStripeS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMeta", function() { return faMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLaravel", function() { return faLaravel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHotjar", function() { return faHotjar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBluetoothB", function() { return faBluetoothB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStickerMule", function() { return faStickerMule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsZero", function() { return faCreativeCommonsZero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHips", function() { return faHips; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBehance", function() { return faBehance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faReddit", function() { return faReddit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDiscord", function() { return faDiscord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faChrome", function() { return faChrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAppStoreIos", function() { return faAppStoreIos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcDiscover", function() { return faCcDiscover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWpbeginner", function() { return faWpbeginner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faConfluence", function() { return faConfluence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMdb", function() { return faMdb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDochub", function() { return faDochub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAccessibleIcon", function() { return faAccessibleIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEbay", function() { return faEbay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAmazon", function() { return faAmazon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUnsplash", function() { return faUnsplash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYarn", function() { return faYarn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareSteam", function() { return faSquareSteam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSteamSquare", function() { return faSteamSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fa500px", function() { return fa500px; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareVimeo", function() { return faSquareVimeo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVimeoSquare", function() { return faVimeoSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAsymmetrik", function() { return faAsymmetrik; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFontAwesome", function() { return faFontAwesome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFontAwesomeFlag", function() { return faFontAwesomeFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFontAwesomeLogoFull", function() { return faFontAwesomeLogoFull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGratipay", function() { return faGratipay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faApple", function() { return faApple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHive", function() { return faHive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGitkraken", function() { return faGitkraken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faKeybase", function() { return faKeybase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faApplePay", function() { return faApplePay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPadlet", function() { return faPadlet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAmazonPay", function() { return faAmazonPay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareGithub", function() { return faSquareGithub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGithubSquare", function() { return faGithubSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStumbleupon", function() { return faStumbleupon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFedex", function() { return faFedex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPhoenixFramework", function() { return faPhoenixFramework; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faShopify", function() { return faShopify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNeos", function() { return faNeos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHackerrank", function() { return faHackerrank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faResearchgate", function() { return faResearchgate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSwift", function() { return faSwift; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAngular", function() { return faAngular; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSpeakap", function() { return faSpeakap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAngrycreative", function() { return faAngrycreative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYCombinator", function() { return faYCombinator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEmpire", function() { return faEmpire; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEnvira", function() { return faEnvira; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareGitlab", function() { return faSquareGitlab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGitlabSquare", function() { return faGitlabSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStudiovinari", function() { return faStudiovinari; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPiedPiper", function() { return faPiedPiper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWordpress", function() { return faWordpress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faProductHunt", function() { return faProductHunt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFirefox", function() { return faFirefox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLinode", function() { return faLinode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGoodreads", function() { return faGoodreads; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareOdnoklassniki", function() { return faSquareOdnoklassniki; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOdnoklassnikiSquare", function() { return faOdnoklassnikiSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJsfiddle", function() { return faJsfiddle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSith", function() { return faSith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faThemeisle", function() { return faThemeisle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPage4", function() { return faPage4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHashnode", function() { return faHashnode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faReact", function() { return faReact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcPaypal", function() { return faCcPaypal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquarespace", function() { return faSquarespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcStripe", function() { return faCcStripe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsShare", function() { return faCreativeCommonsShare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBitcoin", function() { return faBitcoin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faKeycdn", function() { return faKeycdn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOpera", function() { return faOpera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faItchIo", function() { return faItchIo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUmbraco", function() { return faUmbraco; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGalacticSenate", function() { return faGalacticSenate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUbuntu", function() { return faUbuntu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDraft2digital", function() { return faDraft2digital; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStripe", function() { return faStripe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHouzz", function() { return faHouzz; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGg", function() { return faGg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDhl", function() { return faDhl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquarePinterest", function() { return faSquarePinterest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPinterestSquare", function() { return faPinterestSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faXing", function() { return faXing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBlackberry", function() { return faBlackberry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsPd", function() { return faCreativeCommonsPd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPlaystation", function() { return faPlaystation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faQuinscape", function() { return faQuinscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLess", function() { return faLess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBloggerB", function() { return faBloggerB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOpencart", function() { return faOpencart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVine", function() { return faVine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPaypal", function() { return faPaypal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGitlab", function() { return faGitlab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTypo3", function() { return faTypo3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRedditAlien", function() { return faRedditAlien; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYahoo", function() { return faYahoo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDailymotion", function() { return faDailymotion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAffiliatetheme", function() { return faAffiliatetheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPiedPiperPp", function() { return faPiedPiperPp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBootstrap", function() { return faBootstrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOdnoklassniki", function() { return faOdnoklassniki; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNfcSymbol", function() { return faNfcSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEthereum", function() { return faEthereum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSpeakerDeck", function() { return faSpeakerDeck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsNcEu", function() { return faCreativeCommonsNcEu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPatreon", function() { return faPatreon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAvianex", function() { return faAvianex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEllo", function() { return faEllo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGofore", function() { return faGofore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBimobject", function() { return faBimobject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFacebookF", function() { return faFacebookF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareGooglePlus", function() { return faSquareGooglePlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGooglePlusSquare", function() { return faGooglePlusSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMandalorian", function() { return faMandalorian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFirstOrderAlt", function() { return faFirstOrderAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOsi", function() { return faOsi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGoogleWallet", function() { return faGoogleWallet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDAndDBeyond", function() { return faDAndDBeyond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPeriscope", function() { return faPeriscope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFulcrum", function() { return faFulcrum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCloudscale", function() { return faCloudscale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faForumbee", function() { return faForumbee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMizuni", function() { return faMizuni; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSchlix", function() { return faSchlix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareXing", function() { return faSquareXing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faXingSquare", function() { return faXingSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBandcamp", function() { return faBandcamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWpforms", function() { return faWpforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCloudversify", function() { return faCloudversify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUsps", function() { return faUsps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMegaport", function() { return faMegaport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMagento", function() { return faMagento; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSpotify", function() { return faSpotify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOptinMonster", function() { return faOptinMonster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFly", function() { return faFly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAviato", function() { return faAviato; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faItunes", function() { return faItunes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCuttlefish", function() { return faCuttlefish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBlogger", function() { return faBlogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFlickr", function() { return faFlickr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faViber", function() { return faViber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSoundcloud", function() { return faSoundcloud; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDigg", function() { return faDigg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTencentWeibo", function() { return faTencentWeibo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSymfony", function() { return faSymfony; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMaxcdn", function() { return faMaxcdn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEtsy", function() { return faEtsy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFacebookMessenger", function() { return faFacebookMessenger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAudible", function() { return faAudible; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faThinkPeaks", function() { return faThinkPeaks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBilibili", function() { return faBilibili; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faErlang", function() { return faErlang; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCottonBureau", function() { return faCottonBureau; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDashcube", function() { return faDashcube; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fa42Group", function() { return fa42Group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faInnosoft", function() { return faInnosoft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStackExchange", function() { return faStackExchange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faElementor", function() { return faElementor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquarePiedPiper", function() { return faSquarePiedPiper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPiedPiperSquare", function() { return faPiedPiperSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsNd", function() { return faCreativeCommonsNd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPalfed", function() { return faPalfed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSuperpowers", function() { return faSuperpowers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faResolving", function() { return faResolving; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faXbox", function() { return faXbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSearchengin", function() { return faSearchengin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTiktok", function() { return faTiktok; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareFacebook", function() { return faSquareFacebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFacebookSquare", function() { return faFacebookSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRenren", function() { return faRenren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLinux", function() { return faLinux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGlide", function() { return faGlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLinkedin", function() { return faLinkedin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHubspot", function() { return faHubspot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDeploydog", function() { return faDeploydog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTwitch", function() { return faTwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRavelry", function() { return faRavelry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMixer", function() { return faMixer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareLastfm", function() { return faSquareLastfm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLastfmSquare", function() { return faLastfmSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVimeo", function() { return faVimeo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMendeley", function() { return faMendeley; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUniregistry", function() { return faUniregistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFigma", function() { return faFigma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsRemix", function() { return faCreativeCommonsRemix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcAmazonPay", function() { return faCcAmazonPay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDropbox", function() { return faDropbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faInstagram", function() { return faInstagram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCmplid", function() { return faCmplid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFacebook", function() { return faFacebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGripfire", function() { return faGripfire; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJediOrder", function() { return faJediOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUikit", function() { return faUikit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFortAwesomeAlt", function() { return faFortAwesomeAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPhabricator", function() { return faPhabricator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUssunnah", function() { return faUssunnah; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEarlybirds", function() { return faEarlybirds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTradeFederation", function() { return faTradeFederation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAutoprefixer", function() { return faAutoprefixer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWhatsapp", function() { return faWhatsapp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSlideshare", function() { return faSlideshare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGooglePlay", function() { return faGooglePlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faViadeo", function() { return faViadeo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLine", function() { return faLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGoogleDrive", function() { return faGoogleDrive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faServicestack", function() { return faServicestack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSimplybuilt", function() { return faSimplybuilt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBitbucket", function() { return faBitbucket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faImdb", function() { return faImdb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDeezer", function() { return faDeezer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRaspberryPi", function() { return faRaspberryPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJira", function() { return faJira; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDocker", function() { return faDocker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faScreenpal", function() { return faScreenpal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBluetooth", function() { return faBluetooth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGitter", function() { return faGitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDAndD", function() { return faDAndD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMicroblog", function() { return faMicroblog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcDinersClub", function() { return faCcDinersClub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGgCircle", function() { return faGgCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPiedPiperHat", function() { return faPiedPiperHat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faKickstarterK", function() { return faKickstarterK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYandex", function() { return faYandex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faReadme", function() { return faReadme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHtml5", function() { return faHtml5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSellsy", function() { return faSellsy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSass", function() { return faSass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWirsindhandwerk", function() { return faWirsindhandwerk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWsh", function() { return faWsh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBuromobelexperte", function() { return faBuromobelexperte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSalesforce", function() { return faSalesforce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOctopusDeploy", function() { return faOctopusDeploy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMedapps", function() { return faMedapps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNs8", function() { return faNs8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPinterestP", function() { return faPinterestP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faApper", function() { return faApper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFortAwesome", function() { return faFortAwesome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWaze", function() { return faWaze; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcJcb", function() { return faCcJcb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSnapchat", function() { return faSnapchat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSnapchatGhost", function() { return faSnapchatGhost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFantasyFlightGames", function() { return faFantasyFlightGames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRust", function() { return faRust; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWix", function() { return faWix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareBehance", function() { return faSquareBehance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBehanceSquare", function() { return faBehanceSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSupple", function() { return faSupple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRebel", function() { return faRebel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCss3", function() { return faCss3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStaylinked", function() { return faStaylinked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faKaggle", function() { return faKaggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSpaceAwesome", function() { return faSpaceAwesome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDeviantart", function() { return faDeviantart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCpanel", function() { return faCpanel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGoodreadsG", function() { return faGoodreadsG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareGit", function() { return faSquareGit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGitSquare", function() { return faGitSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareTumblr", function() { return faSquareTumblr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTumblrSquare", function() { return faTumblrSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTrello", function() { return faTrello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsNcJp", function() { return faCreativeCommonsNcJp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGetPocket", function() { return faGetPocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPerbyte", function() { return faPerbyte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGrunt", function() { return faGrunt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWeebly", function() { return faWeebly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faConnectdevelop", function() { return faConnectdevelop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faLeanpub", function() { return faLeanpub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBlackTie", function() { return faBlackTie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faThemeco", function() { return faThemeco; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPython", function() { return faPython; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAndroid", function() { return faAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBots", function() { return faBots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFreeCodeCamp", function() { return faFreeCodeCamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faHornbill", function() { return faHornbill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJs", function() { return faJs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faIdeal", function() { return faIdeal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGit", function() { return faGit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDev", function() { return faDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSketch", function() { return faSketch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYandexInternational", function() { return faYandexInternational; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCcAmex", function() { return faCcAmex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUber", function() { return faUber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGithub", function() { return faGithub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPhp", function() { return faPhp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAlipay", function() { return faAlipay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYoutube", function() { return faYoutube; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSkyatlas", function() { return faSkyatlas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFirefoxBrowser", function() { return faFirefoxBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faReplyd", function() { return faReplyd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSuse", function() { return faSuse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJenkins", function() { return faJenkins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTwitter", function() { return faTwitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faRockrms", function() { return faRockrms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPinterest", function() { return faPinterest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBuffer", function() { return faBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNpm", function() { return faNpm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faYammer", function() { return faYammer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBtc", function() { return faBtc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDribbble", function() { return faDribbble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStumbleuponCircle", function() { return faStumbleuponCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faInternetExplorer", function() { return faInternetExplorer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTelegram", function() { return faTelegram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTelegramPlane", function() { return faTelegramPlane; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faOldRepublic", function() { return faOldRepublic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSquareWhatsapp", function() { return faSquareWhatsapp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWhatsappSquare", function() { return faWhatsappSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNodeJs", function() { return faNodeJs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEdgeLegacy", function() { return faEdgeLegacy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSlack", function() { return faSlack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSlackHash", function() { return faSlackHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMedrt", function() { return faMedrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faUsb", function() { return faUsb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTumblr", function() { return faTumblr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faVaadin", function() { return faVaadin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faQuora", function() { return faQuora; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faReacteurope", function() { return faReacteurope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMedium", function() { return faMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMediumM", function() { return faMediumM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAmilia", function() { return faAmilia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMixcloud", function() { return faMixcloud; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faFlipboard", function() { return faFlipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faViacoin", function() { return faViacoin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCriticalRole", function() { return faCriticalRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSitrox", function() { return faSitrox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faDiscourse", function() { return faDiscourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faJoomla", function() { return faJoomla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faMastodon", function() { return faMastodon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faAirbnb", function() { return faAirbnb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWolfPackBattalion", function() { return faWolfPackBattalion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faBuyNLarge", function() { return faBuyNLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGulp", function() { return faGulp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCreativeCommonsSamplingPlus", function() { return faCreativeCommonsSamplingPlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faStrava", function() { return faStrava; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faEmber", function() { return faEmber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faCanadianMapleLeaf", function() { return faCanadianMapleLeaf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faTeamspeak", function() { return faTeamspeak; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPushed", function() { return faPushed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWordpressSimple", function() { return faWordpressSimple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faNutritionix", function() { return faNutritionix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faWodu", function() { return faWodu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faGooglePay", function() { return faGooglePay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faIntercom", function() { return faIntercom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faZhihu", function() { return faZhihu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faKorvue", function() { return faKorvue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faPix", function() { return faPix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "faSteamSymbol", function() { return faSteamSymbol; });
var prefix = "fab";
var faMonero = {
  prefix: 'fab',
  iconName: 'monero',
  icon: [496, 512, [], "f3d0", "M352 384h108.4C417 455.9 338.1 504 248 504S79 455.9 35.6 384H144V256.2L248 361l104-105v128zM88 336V128l159.4 159.4L408 128v208h74.8c8.5-25.1 13.2-52 13.2-80C496 119 385 8 248 8S0 119 0 256c0 28 4.6 54.9 13.2 80H88z"]
};
var faHooli = {
  prefix: 'fab',
  iconName: 'hooli',
  icon: [640, 512, [], "f427", "M144.5 352l38.3.8c-13.2-4.6-26-10.2-38.3-16.8zm57.7-5.3v5.3l-19.4.8c36.5 12.5 69.9 14.2 94.7 7.2-19.9.2-45.8-2.6-75.3-13.3zm408.9-115.2c15.9 0 28.9-12.9 28.9-28.9s-12.9-24.5-28.9-24.5c-15.9 0-28.9 8.6-28.9 24.5s12.9 28.9 28.9 28.9zm-29 120.5H640V241.5h-57.9zm-73.7 0h57.9V156.7L508.4 184zm-31-119.4c-18.2-18.2-50.4-17.1-50.4-17.1s-32.3-1.1-50.4 17.1c-18.2 18.2-16.8 33.9-16.8 52.6s-1.4 34.3 16.8 52.5 50.4 17.1 50.4 17.1 32.3 1.1 50.4-17.1c18.2-18.2 16.8-33.8 16.8-52.5-.1-18.8 1.3-34.5-16.8-52.6zm-39.8 71.9c0 3.6-1.8 12.5-10.7 12.5s-10.7-8.9-10.7-12.5v-40.4c0-8.7 7.3-10.9 10.7-10.9s10.7 2.1 10.7 10.9zm-106.2-71.9c-18.2-18.2-50.4-17.1-50.4-17.1s-32.2-1.1-50.4 17.1c-1.9 1.9-3.7 3.9-5.3 6-38.2-29.6-72.5-46.5-102.1-61.1v-20.7l-22.5 10.6c-54.4-22.1-89-18.2-97.3.1 0 0-24.9 32.8 61.8 110.8V352h57.9v-28.6c-6.5-4.2-13-8.7-19.4-13.6-14.8-11.2-27.4-21.6-38.4-31.4v-31c13.1 14.7 30.5 31.4 53.4 50.3l4.5 3.6v-29.8c0-6.9 1.7-18.2 10.8-18.2s10.6 6.9 10.6 15V317c18 12.2 37.3 22.1 57.7 29.6v-93.9c0-18.7-13.4-37.4-40.6-37.4-15.8-.1-30.5 8.2-38.5 21.9v-54.3c41.9 20.9 83.9 46.5 99.9 58.3-10.2 14.6-9.3 28.1-9.3 43.7 0 18.7-1.4 34.3 16.8 52.5s50.4 17.1 50.4 17.1 32.3 1.1 50.4-17.1c18.2-18.2 16.7-33.8 16.7-52.5 0-18.5 1.5-34.2-16.7-52.3zM65.2 184v63.3c-48.7-54.5-38.9-76-35.2-79.1 13.5-11.4 37.5-8 64.4 2.1zm226.5 120.5c0 3.6-1.8 12.5-10.7 12.5s-10.7-8.9-10.7-12.5v-40.4c0-8.7 7.3-10.9 10.7-10.9s10.7 2.1 10.7 10.9z"]
};
var faYelp = {
  prefix: 'fab',
  iconName: 'yelp',
  icon: [384, 512, [], "f1e9", "M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92l58.81 94a22.93 22.93 0 0 0 34 5.5 198.36 198.36 0 0 0 52.71-67.61A23 23 0 0 0 364.17 370l-105.42-34.26c-20.31-6.5-37.81 15.8-26.51 33.91zm148.33-132.23a197.44 197.44 0 0 0-50.41-69.31 22.85 22.85 0 0 0-34 4.4l-62 91.92c-11.9 17.7 4.7 40.61 25.2 34.71L366 268.63a23 23 0 0 0 14.61-31.21zM62.11 30.18a22.86 22.86 0 0 0-9.9 32l104.12 180.44c11.7 20.2 42.61 11.9 42.61-11.4V22.88a22.67 22.67 0 0 0-24.5-22.8 320.37 320.37 0 0 0-112.33 30.1z"]
};
var faCcVisa = {
  prefix: 'fab',
  iconName: 'cc-visa',
  icon: [576, 512, [], "f1f0", "M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"]
};
var faLastfm = {
  prefix: 'fab',
  iconName: 'lastfm',
  icon: [512, 512, [], "f202", "M225.8 367.1l-18.8-51s-30.5 34-76.2 34c-40.5 0-69.2-35.2-69.2-91.5 0-72.1 36.4-97.9 72.1-97.9 66.5 0 74.8 53.3 100.9 134.9 18.8 56.9 54 102.6 155.4 102.6 72.7 0 122-22.3 122-80.9 0-72.9-62.7-80.6-115-92.1-25.8-5.9-33.4-16.4-33.4-34 0-19.9 15.8-31.7 41.6-31.7 28.2 0 43.4 10.6 45.7 35.8l58.6-7c-4.7-52.8-41.1-74.5-100.9-74.5-52.8 0-104.4 19.9-104.4 83.9 0 39.9 19.4 65.1 68 76.8 44.9 10.6 79.8 13.8 79.8 45.7 0 21.7-21.1 30.5-61 30.5-59.2 0-83.9-31.1-97.9-73.9-32-96.8-43.6-163-161.3-163C45.7 113.8 0 168.3 0 261c0 89.1 45.7 137.2 127.9 137.2 66.2 0 97.9-31.1 97.9-31.1z"]
};
var faShopware = {
  prefix: 'fab',
  iconName: 'shopware',
  icon: [512, 512, [], "f5b5", "M403.5 455.41A246.17 246.17 0 0 1 256 504C118.81 504 8 393 8 256 8 118.81 119 8 256 8a247.39 247.39 0 0 1 165.7 63.5 3.57 3.57 0 0 1-2.86 6.18A418.62 418.62 0 0 0 362.13 74c-129.36 0-222.4 53.47-222.4 155.35 0 109 92.13 145.88 176.83 178.73 33.64 13 65.4 25.36 87 41.59a3.58 3.58 0 0 1 0 5.72zM503 233.09a3.64 3.64 0 0 0-1.27-2.44c-51.76-43-93.62-60.48-144.48-60.48-84.13 0-80.25 52.17-80.25 53.63 0 42.6 52.06 62 112.34 84.49 31.07 11.59 63.19 23.57 92.68 39.93a3.57 3.57 0 0 0 5-1.82A249 249 0 0 0 503 233.09z"]
};
var faCreativeCommonsNc = {
  prefix: 'fab',
  iconName: 'creative-commons-nc',
  icon: [496, 512, [], "f4e8", "M247.6 8C387.4 8 496 115.9 496 256c0 147.2-118.5 248-248.4 248C113.1 504 0 393.2 0 256 0 123.1 104.7 8 247.6 8zM55.8 189.1c-7.4 20.4-11.1 42.7-11.1 66.9 0 110.9 92.1 202.4 203.7 202.4 122.4 0 177.2-101.8 178.5-104.1l-93.4-41.6c-7.7 37.1-41.2 53-68.2 55.4v38.1h-28.8V368c-27.5-.3-52.6-10.2-75.3-29.7l34.1-34.5c31.7 29.4 86.4 31.8 86.4-2.2 0-6.2-2.2-11.2-6.6-15.1-14.2-6-1.8-.1-219.3-97.4zM248.4 52.3c-38.4 0-112.4 8.7-170.5 93l94.8 42.5c10-31.3 40.4-42.9 63.8-44.3v-38.1h28.8v38.1c22.7 1.2 43.4 8.9 62 23L295 199.7c-42.7-29.9-83.5-8-70 11.1 53.4 24.1 43.8 19.8 93 41.6l127.1 56.7c4.1-17.4 6.2-35.1 6.2-53.1 0-57-19.8-105-59.3-143.9-39.3-39.9-87.2-59.8-143.6-59.8z"]
};
var faAws = {
  prefix: 'fab',
  iconName: 'aws',
  icon: [640, 512, [], "f375", "M180.41 203.01c-.72 22.65 10.6 32.68 10.88 39.05a8.164 8.164 0 0 1-4.1 6.27l-12.8 8.96a10.66 10.66 0 0 1-5.63 1.92c-.43-.02-8.19 1.83-20.48-25.61a78.608 78.608 0 0 1-62.61 29.45c-16.28.89-60.4-9.24-58.13-56.21-1.59-38.28 34.06-62.06 70.93-60.05 7.1.02 21.6.37 46.99 6.27v-15.62c2.69-26.46-14.7-46.99-44.81-43.91-2.4.01-19.4-.5-45.84 10.11-7.36 3.38-8.3 2.82-10.75 2.82-7.41 0-4.36-21.48-2.94-24.2 5.21-6.4 35.86-18.35 65.94-18.18a76.857 76.857 0 0 1 55.69 17.28 70.285 70.285 0 0 1 17.67 52.36l-.01 69.29zM93.99 235.4c32.43-.47 46.16-19.97 49.29-30.47 2.46-10.05 2.05-16.41 2.05-27.4-9.67-2.32-23.59-4.85-39.56-4.87-15.15-1.14-42.82 5.63-41.74 32.26-1.24 16.79 11.12 31.4 29.96 30.48zm170.92 23.05c-7.86.72-11.52-4.86-12.68-10.37l-49.8-164.65c-.97-2.78-1.61-5.65-1.92-8.58a4.61 4.61 0 0 1 3.86-5.25c.24-.04-2.13 0 22.25 0 8.78-.88 11.64 6.03 12.55 10.37l35.72 140.83 33.16-140.83c.53-3.22 2.94-11.07 12.8-10.24h17.16c2.17-.18 11.11-.5 12.68 10.37l33.42 142.63L420.98 80.1c.48-2.18 2.72-11.37 12.68-10.37h19.72c.85-.13 6.15-.81 5.25 8.58-.43 1.85 3.41-10.66-52.75 169.9-1.15 5.51-4.82 11.09-12.68 10.37h-18.69c-10.94 1.15-12.51-9.66-12.68-10.75L328.67 110.7l-32.78 136.99c-.16 1.09-1.73 11.9-12.68 10.75h-18.3zm273.48 5.63c-5.88.01-33.92-.3-57.36-12.29a12.802 12.802 0 0 1-7.81-11.91v-10.75c0-8.45 6.2-6.9 8.83-5.89 10.04 4.06 16.48 7.14 28.81 9.6 36.65 7.53 52.77-2.3 56.72-4.48 13.15-7.81 14.19-25.68 5.25-34.95-10.48-8.79-15.48-9.12-53.13-21-4.64-1.29-43.7-13.61-43.79-52.36-.61-28.24 25.05-56.18 69.52-55.95 12.67-.01 46.43 4.13 55.57 15.62 1.35 2.09 2.02 4.55 1.92 7.04v10.11c0 4.44-1.62 6.66-4.87 6.66-7.71-.86-21.39-11.17-49.16-10.75-6.89-.36-39.89.91-38.41 24.97-.43 18.96 26.61 26.07 29.7 26.89 36.46 10.97 48.65 12.79 63.12 29.58 17.14 22.25 7.9 48.3 4.35 55.44-19.08 37.49-68.42 34.44-69.26 34.42zm40.2 104.86c-70.03 51.72-171.69 79.25-258.49 79.25A469.127 469.127 0 0 1 2.83 327.46c-6.53-5.89-.77-13.96 7.17-9.47a637.37 637.37 0 0 0 316.88 84.12 630.22 630.22 0 0 0 241.59-49.55c11.78-5 21.77 7.8 10.12 16.38zm29.19-33.29c-8.96-11.52-59.28-5.38-81.81-2.69-6.79.77-7.94-5.12-1.79-9.47 40.07-28.17 105.88-20.1 113.44-10.63 7.55 9.47-2.05 75.41-39.56 106.91-5.76 4.87-11.27 2.3-8.71-4.1 8.44-21.25 27.39-68.49 18.43-80.02z"]
};
var faRedhat = {
  prefix: 'fab',
  iconName: 'redhat',
  icon: [512, 512, [], "f7bc", "M341.52 285.56c33.65 0 82.34-6.94 82.34-47 .22-6.74.86-1.82-20.88-96.24-4.62-19.15-8.68-27.84-42.31-44.65-26.09-13.34-82.92-35.37-99.73-35.37-15.66 0-20.2 20.17-38.87 20.17-18 0-31.31-15.06-48.12-15.06-16.14 0-26.66 11-34.78 33.62-27.5 77.55-26.28 74.27-26.12 78.27 0 24.8 97.64 106.11 228.47 106.11M429 254.84c4.65 22 4.65 24.35 4.65 27.25 0 37.66-42.33 58.56-98 58.56-125.74.08-235.91-73.65-235.91-122.33a49.55 49.55 0 0 1 4.06-19.72C58.56 200.86 0 208.93 0 260.63c0 84.67 200.63 189 359.49 189 121.79 0 152.51-55.08 152.51-98.58 0-34.21-29.59-73.05-82.93-96.24"]
};
var faYoast = {
  prefix: 'fab',
  iconName: 'yoast',
  icon: [448, 512, [], "f2b1", "M91.3 76h186l-7 18.9h-179c-39.7 0-71.9 31.6-71.9 70.3v205.4c0 35.4 24.9 70.3 84 70.3V460H91.3C41.2 460 0 419.8 0 370.5V165.2C0 115.9 40.7 76 91.3 76zm229.1-56h66.5C243.1 398.1 241.2 418.9 202.2 459.3c-20.8 21.6-49.3 31.7-78.3 32.7v-51.1c49.2-7.7 64.6-49.9 64.6-75.3 0-20.1.6-12.6-82.1-223.2h61.4L218.2 299 320.4 20zM448 161.5V460H234c6.6-9.6 10.7-16.3 12.1-19.4h182.5V161.5c0-32.5-17.1-51.9-48.2-62.9l6.7-17.6c41.7 13.6 60.9 43.1 60.9 80.5z"]
};
var faCloudflare = {
  prefix: 'fab',
  iconName: 'cloudflare',
  icon: [640, 512, [], "e07d", "M407.906,319.913l-230.8-2.928a4.58,4.58,0,0,1-3.632-1.926,4.648,4.648,0,0,1-.494-4.147,6.143,6.143,0,0,1,5.361-4.076L411.281,303.9c27.631-1.26,57.546-23.574,68.022-50.784l13.286-34.542a7.944,7.944,0,0,0,.524-2.936,7.735,7.735,0,0,0-.164-1.631A151.91,151.91,0,0,0,201.257,198.4,68.12,68.12,0,0,0,94.2,269.59C41.924,271.106,0,313.728,0,366.12a96.054,96.054,0,0,0,1.029,13.958,4.508,4.508,0,0,0,4.445,3.871l426.1.051c.043,0,.08-.019.122-.02a5.606,5.606,0,0,0,5.271-4l3.273-11.265c3.9-13.4,2.448-25.8-4.1-34.9C430.124,325.423,420.09,320.487,407.906,319.913ZM513.856,221.1c-2.141,0-4.271.062-6.391.164a3.771,3.771,0,0,0-3.324,2.653l-9.077,31.193c-3.9,13.4-2.449,25.786,4.1,34.89,6.02,8.4,16.054,13.323,28.238,13.9l49.2,2.939a4.491,4.491,0,0,1,3.51,1.894,4.64,4.64,0,0,1,.514,4.169,6.153,6.153,0,0,1-5.351,4.075l-51.125,2.939c-27.754,1.27-57.669,23.574-68.145,50.784l-3.695,9.606a2.716,2.716,0,0,0,2.427,3.68c.046,0,.088.017.136.017h175.91a4.69,4.69,0,0,0,4.539-3.37,124.807,124.807,0,0,0,4.682-34C640,277.3,583.524,221.1,513.856,221.1Z"]
};
var faUps = {
  prefix: 'fab',
  iconName: 'ups',
  icon: [384, 512, [], "f7e0", "M103.2 303c-5.2 3.6-32.6 13.1-32.6-19V180H37.9v102.6c0 74.9 80.2 51.1 97.9 39V180h-32.6zM4 74.82v220.9c0 103.7 74.9 135.2 187.7 184.1 112.4-48.9 187.7-80.2 187.7-184.1V74.82c-116.3-61.6-281.8-49.6-375.4 0zm358.1 220.9c0 86.6-53.2 113.6-170.4 165.3-117.5-51.8-170.5-78.7-170.5-165.3v-126.4c102.3-93.8 231.6-100 340.9-89.8zm-209.6-107.4v212.8h32.7v-68.7c24.4 7.3 71.7-2.6 71.7-78.5 0-97.4-80.7-80.92-104.4-65.6zm32.7 117.3v-100.3c8.4-4.2 38.4-12.7 38.4 49.3 0 67.9-36.4 51.8-38.4 51zm79.1-86.4c.1 47.3 51.6 42.5 52.2 70.4.6 23.5-30.4 23-50.8 4.9v30.1c36.2 21.5 81.9 8.1 83.2-33.5 1.7-51.5-54.1-46.6-53.4-73.2.6-20.3 30.6-20.5 48.5-2.2v-28.4c-28.5-22-79.9-9.2-79.7 31.9z"]
};
var faWpexplorer = {
  prefix: 'fab',
  iconName: 'wpexplorer',
  icon: [512, 512, [], "f2de", "M512 256c0 141.2-114.7 256-256 256C114.8 512 0 397.3 0 256S114.7 0 256 0s256 114.7 256 256zm-32 0c0-123.2-100.3-224-224-224C132.5 32 32 132.5 32 256s100.5 224 224 224 224-100.5 224-224zM160.9 124.6l86.9 37.1-37.1 86.9-86.9-37.1 37.1-86.9zm110 169.1l46.6 94h-14.6l-50-100-48.9 100h-14l51.1-106.9-22.3-9.4 6-14 68.6 29.1-6 14.3-16.5-7.1zm-11.8-116.3l68.6 29.4-29.4 68.3L230 246l29.1-68.6zm80.3 42.9l54.6 23.1-23.4 54.3-54.3-23.1 23.1-54.3z"]
};
var faDyalog = {
  prefix: 'fab',
  iconName: 'dyalog',
  icon: [416, 512, [], "f399", "M0 32v119.2h64V96h107.2C284.6 96 352 176.2 352 255.9 352 332 293.4 416 171.2 416H0v64h171.2C331.9 480 416 367.3 416 255.9c0-58.7-22.1-113.4-62.3-154.3C308.9 56 245.7 32 171.2 32H0z"]
};
var faBity = {
  prefix: 'fab',
  iconName: 'bity',
  icon: [496, 512, [], "f37a", "M78.4 67.2C173.8-22 324.5-24 421.5 71c14.3 14.1-6.4 37.1-22.4 21.5-84.8-82.4-215.8-80.3-298.9-3.2-16.3 15.1-36.5-8.3-21.8-22.1zm98.9 418.6c19.3 5.7 29.3-23.6 7.9-30C73 421.9 9.4 306.1 37.7 194.8c5-19.6-24.9-28.1-30.2-7.1-32.1 127.4 41.1 259.8 169.8 298.1zm148.1-2c121.9-40.2 192.9-166.9 164.4-291-4.5-19.7-34.9-13.8-30 7.9 24.2 107.7-37.1 217.9-143.2 253.4-21.2 7-10.4 36 8.8 29.7zm-62.9-79l.2-71.8c0-8.2-6.6-14.8-14.8-14.8-8.2 0-14.8 6.7-14.8 14.8l-.2 71.8c0 8.2 6.6 14.8 14.8 14.8s14.8-6.6 14.8-14.8zm71-269c2.1 90.9 4.7 131.9-85.5 132.5-92.5-.7-86.9-44.3-85.5-132.5 0-21.8-32.5-19.6-32.5 0v71.6c0 69.3 60.7 90.9 118 90.1 57.3.8 118-20.8 118-90.1v-71.6c0-19.6-32.5-21.8-32.5 0z"]
};
var faStackpath = {
  prefix: 'fab',
  iconName: 'stackpath',
  icon: [448, 512, [], "f842", "M244.6 232.4c0 8.5-4.26 20.49-21.34 20.49h-19.61v-41.47h19.61c17.13 0 21.34 12.36 21.34 20.98zM448 32v448H0V32zM151.3 287.84c0-21.24-12.12-34.54-46.72-44.85-20.57-7.41-26-10.91-26-18.63s7-14.61 20.41-14.61c14.09 0 20.79 8.45 20.79 18.35h30.7l.19-.57c.5-19.57-15.06-41.65-51.12-41.65-23.37 0-52.55 10.75-52.55 38.29 0 19.4 9.25 31.29 50.74 44.37 17.26 6.15 21.91 10.4 21.91 19.48 0 15.2-19.13 14.23-19.47 14.23-20.4 0-25.65-9.1-25.65-21.9h-30.8l-.18.56c-.68 31.32 28.38 45.22 56.63 45.22 29.98 0 51.12-13.55 51.12-38.29zm125.38-55.63c0-25.3-18.43-45.46-53.42-45.46h-51.78v138.18h32.17v-47.36h19.61c30.25 0 53.42-15.95 53.42-45.36zM297.94 325L347 186.78h-31.09L268 325zm106.52-138.22h-31.09L325.46 325h29.94z"]
};
var faBuysellads = {
  prefix: 'fab',
  iconName: 'buysellads',
  icon: [448, 512, [], "f20d", "M224 150.7l42.9 160.7h-85.8L224 150.7zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-65.3 325.3l-94.5-298.7H159.8L65.3 405.3H156l111.7-91.6 24.2 91.6h90.8z"]
};
var faFirstOrder = {
  prefix: 'fab',
  iconName: 'first-order',
  icon: [448, 512, [], "f2b0", "M12.9 229.2c.1-.1.2-.3.3-.4 0 .1 0 .3-.1.4h-.2zM224 96.6c-7.1 0-14.6.6-21.4 1.7l3.7 67.4-22-64c-14.3 3.7-27.7 9.4-40 16.6l29.4 61.4-45.1-50.9c-11.4 8.9-21.7 19.1-30.6 30.9l50.6 45.4-61.1-29.7c-7.1 12.3-12.9 25.7-16.6 40l64.3 22.6-68-4c-.9 7.1-1.4 14.6-1.4 22s.6 14.6 1.4 21.7l67.7-4-64 22.6c3.7 14.3 9.4 27.7 16.6 40.3l61.1-29.7L97.7 352c8.9 11.7 19.1 22.3 30.9 30.9l44.9-50.9-29.5 61.4c12.3 7.4 25.7 13.1 40 16.9l22.3-64.6-4 68c7.1 1.1 14.6 1.7 21.7 1.7 7.4 0 14.6-.6 21.7-1.7l-4-68.6 22.6 65.1c14.3-4 27.7-9.4 40-16.9L274.9 332l44.9 50.9c11.7-8.9 22-19.1 30.6-30.9l-50.6-45.1 61.1 29.4c7.1-12.3 12.9-25.7 16.6-40.3l-64-22.3 67.4 4c1.1-7.1 1.4-14.3 1.4-21.7s-.3-14.9-1.4-22l-67.7 4 64-22.3c-3.7-14.3-9.1-28-16.6-40.3l-60.9 29.7 50.6-45.4c-8.9-11.7-19.1-22-30.6-30.9l-45.1 50.9 29.4-61.1c-12.3-7.4-25.7-13.1-40-16.9L241.7 166l4-67.7c-7.1-1.2-14.3-1.7-21.7-1.7zM443.4 128v256L224 512 4.6 384V128L224 0l219.4 128zm-17.1 10.3L224 20.9 21.7 138.3v235.1L224 491.1l202.3-117.7V138.3zM224 37.1l187.7 109.4v218.9L224 474.9 36.3 365.4V146.6L224 37.1zm0 50.9c-92.3 0-166.9 75.1-166.9 168 0 92.6 74.6 167.7 166.9 167.7 92 0 166.9-75.1 166.9-167.7 0-92.9-74.9-168-166.9-168z"]
};
var faModx = {
  prefix: 'fab',
  iconName: 'modx',
  icon: [448, 512, [], "f285", "M356 241.8l36.7 23.7V480l-133-83.8L356 241.8zM440 75H226.3l-23 37.8 153.5 96.5L440 75zm-89 142.8L55.2 32v214.5l46 29L351 217.8zM97 294.2L8 437h213.7l125-200.5L97 294.2z"]
};
var faGuilded = {
  prefix: 'fab',
  iconName: 'guilded',
  icon: [448, 512, [], "e07e", "M443.427,64H4.571c0,103.26,22.192,180.06,43.418,222.358C112.046,414.135,224,448,225.256,448a312.824,312.824,0,0,0,140.55-103.477c25.907-33.923,53.1-87.19,65.916-145.761H171.833c4.14,36.429,22.177,67.946,45.1,86.944h88.589c-17.012,28.213-48.186,54.4-80.456,69.482-31.232-13.259-69.09-46.544-96.548-98.362-26.726-53.833-27.092-105.883-27.092-105.883H437.573A625.91,625.91,0,0,0,443.427,64Z"]
};
var faVnv = {
  prefix: 'fab',
  iconName: 'vnv',
  icon: [640, 512, [], "f40b", "M104.9 352c-34.1 0-46.4-30.4-46.4-30.4L2.6 210.1S-7.8 192 13 192h32.8c10.4 0 13.2 8.7 18.8 18.1l36.7 74.5s5.2 13.1 21.1 13.1 21.1-13.1 21.1-13.1l36.7-74.5c5.6-9.5 8.4-18.1 18.8-18.1h32.8c20.8 0 10.4 18.1 10.4 18.1l-55.8 111.5S174.2 352 140 352h-35.1zm395 0c-34.1 0-46.4-30.4-46.4-30.4l-55.9-111.5S387.2 192 408 192h32.8c10.4 0 13.2 8.7 18.8 18.1l36.7 74.5s5.2 13.1 21.1 13.1 21.1-13.1 21.1-13.1l36.8-74.5c5.6-9.5 8.4-18.1 18.8-18.1H627c20.8 0 10.4 18.1 10.4 18.1l-55.9 111.5S569.3 352 535.1 352h-35.2zM337.6 192c34.1 0 46.4 30.4 46.4 30.4l55.9 111.5s10.4 18.1-10.4 18.1h-32.8c-10.4 0-13.2-8.7-18.8-18.1l-36.7-74.5s-5.2-13.1-21.1-13.1c-15.9 0-21.1 13.1-21.1 13.1l-36.7 74.5c-5.6 9.4-8.4 18.1-18.8 18.1h-32.9c-20.8 0-10.4-18.1-10.4-18.1l55.9-111.5s12.2-30.4 46.4-30.4h35.1z"]
};
var faSquareJs = {
  prefix: 'fab',
  iconName: 'square-js',
  icon: [448, 512, ["js-square"], "f3b9", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"]
};
var faJsSquare = faSquareJs;
var faMicrosoft = {
  prefix: 'fab',
  iconName: 'microsoft',
  icon: [448, 512, [], "f3ca", "M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"]
};
var faQq = {
  prefix: 'fab',
  iconName: 'qq',
  icon: [448, 512, [], "f1d6", "M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z"]
};
var faOrcid = {
  prefix: 'fab',
  iconName: 'orcid',
  icon: [512, 512, [], "f8d2", "M294.75 188.19h-45.92V342h47.47c67.62 0 83.12-51.34 83.12-76.91 0-41.64-26.54-76.9-84.67-76.9zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-80.79 360.76h-29.84v-207.5h29.84zm-14.92-231.14a19.57 19.57 0 1 1 19.57-19.57 19.64 19.64 0 0 1-19.57 19.57zM300 369h-81V161.26h80.6c76.73 0 110.44 54.83 110.44 103.85C410 318.39 368.38 369 300 369z"]
};
var faJava = {
  prefix: 'fab',
  iconName: 'java',
  icon: [384, 512, [], "f4e4", "M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1-2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0-8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6.7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.84 509.4 401 461.3 348 437.4zM124.44 396c-78.7 22 47.9 67.4 148.1 24.5a185.89 185.89 0 0 1-28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.64 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1-21.1-12.8z"]
};
var faInvision = {
  prefix: 'fab',
  iconName: 'invision',
  icon: [448, 512, [], "f7b0", "M407.4 32H40.6C18.2 32 0 50.2 0 72.6v366.8C0 461.8 18.2 480 40.6 480h366.8c22.4 0 40.6-18.2 40.6-40.6V72.6c0-22.4-18.2-40.6-40.6-40.6zM176.1 145.6c.4 23.4-22.4 27.3-26.6 27.4-14.9 0-27.1-12-27.1-27 .1-35.2 53.1-35.5 53.7-.4zM332.8 377c-65.6 0-34.1-74-25-106.6 14.1-46.4-45.2-59-59.9.7l-25.8 103.3H177l8.1-32.5c-31.5 51.8-94.6 44.4-94.6-4.3.1-14.3.9-14 23-104.1H81.7l9.7-35.6h76.4c-33.6 133.7-32.6 126.9-32.9 138.2 0 20.9 40.9 13.5 57.4-23.2l19.8-79.4h-32.3l9.7-35.6h68.8l-8.9 40.5c40.5-75.5 127.9-47.8 101.8 38-14.2 51.1-14.6 50.7-14.9 58.8 0 15.5 17.5 22.6 31.8-16.9L386 325c-10.5 36.7-29.4 52-53.2 52z"]
};
var faCreativeCommonsPdAlt = {
  prefix: 'fab',
  iconName: 'creative-commons-pd-alt',
  icon: [496, 512, [], "f4ed", "M247.6 8C104.7 8 0 123.1 0 256c0 138.5 113.6 248 247.6 248C377.5 504 496 403.1 496 256 496 118.1 389.4 8 247.6 8zm.8 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.4 85.5-203.3 203.7-203.3 112.6 0 202.9 89.5 202.8 203.3 0 121.7-99.6 202.8-202.8 202.8zM316.7 186h-53.2v137.2h53.2c21.4 0 70-5.1 70-68.6 0-63.4-48.6-68.6-70-68.6zm.8 108.5h-19.9v-79.7l19.4-.1c3.8 0 35-2.1 35 39.9 0 24.6-10.5 39.9-34.5 39.9zM203.7 186h-68.2v137.3h34.6V279h27c54.1 0 57.1-37.5 57.1-46.5 0-31-16.8-46.5-50.5-46.5zm-4.9 67.3h-29.2v-41.6h28.3c30.9 0 28.8 41.6.9 41.6z"]
};
var faCentercode = {
  prefix: 'fab',
  iconName: 'centercode',
  icon: [512, 512, [], "f380", "M329.2 268.6c-3.8 35.2-35.4 60.6-70.6 56.8-35.2-3.8-60.6-35.4-56.8-70.6 3.8-35.2 35.4-60.6 70.6-56.8 35.1 3.8 60.6 35.4 56.8 70.6zm-85.8 235.1C96.7 496-8.2 365.5 10.1 224.3c11.2-86.6 65.8-156.9 139.1-192 161-77.1 349.7 37.4 354.7 216.6 4.1 147-118.4 262.2-260.5 254.8zm179.9-180c27.9-118-160.5-205.9-237.2-234.2-57.5 56.3-69.1 188.6-33.8 344.4 68.8 15.8 169.1-26.4 271-110.2z"]
};
var faGlideG = {
  prefix: 'fab',
  iconName: 'glide-g',
  icon: [448, 512, [], "f2a6", "M407.1 211.2c-3.5-1.4-11.6-3.8-15.4-3.8-37.1 0-62.2 16.8-93.5 34.5l-.9-.9c7-47.3 23.5-91.9 23.5-140.4C320.8 29.1 282.6 0 212.4 0 97.3 0 39 113.7 39 198.4 39 286.3 90.3 335 177.6 335c12 0 11-1 11 3.8-16.9 128.9-90.8 133.1-90.8 94.6 0-39.2 45-58.6 45.5-61-.3-12.2-47-27.6-58.9-27.6-33.9.1-52.4 51.2-52.4 79.3C32 476 64.8 512 117.5 512c77.4 0 134-77.8 151.4-145.4 15.1-60.5 11.2-63.3 19.7-67.6 32.2-16.2 57.5-27 93.8-27 17.8 0 30.5 3.7 58.9 8.4 2.9 0 6.7-2.9 6.7-5.8 0-8-33.4-60.5-40.9-63.4zm-175.3-84.4c-9.3 44.7-18.6 89.6-27.8 134.3-2.3 10.2-13.3 7.8-22 7.8-38.3 0-49-41.8-49-73.1 0-47 18-109.3 61.8-133.4 7-4.1 14.8-6.7 22.6-6.7 18.6 0 20 13.3 20 28.7-.1 14.3-2.7 28.5-5.6 42.4z"]
};
var faDrupal = {
  prefix: 'fab',
  iconName: 'drupal',
  icon: [448, 512, [], "f1a9", "M303.973,108.136C268.2,72.459,234.187,38.35,224.047,0c-9.957,38.35-44.25,72.459-80.019,108.136C90.467,161.7,29.716,222.356,29.716,313.436c-2.337,107.3,82.752,196.18,190.053,198.517S415.948,429.2,418.285,321.9q.091-4.231,0-8.464C418.285,222.356,357.534,161.7,303.973,108.136Zm-174.326,223a130.282,130.282,0,0,0-15.211,24.153,4.978,4.978,0,0,1-3.319,2.766h-1.659c-4.333,0-9.219-8.481-9.219-8.481h0c-1.29-2.028-2.489-4.149-3.687-6.361l-.83-1.752c-11.247-25.72-1.475-62.318-1.475-62.318h0a160.585,160.585,0,0,1,23.231-49.873A290.8,290.8,0,0,1,138.5,201.613l9.219,9.219,43.512,44.434a4.979,4.979,0,0,1,0,6.638L145.78,312.33h0Zm96.612,127.311a67.2,67.2,0,0,1-49.781-111.915c14.2-16.871,31.528-33.464,50.334-55.313,22.309,23.785,36.875,40.1,51.164,57.986a28.413,28.413,0,0,1,2.95,4.425,65.905,65.905,0,0,1,11.984,37.981,66.651,66.651,0,0,1-66.466,66.836ZM352.371,351.6h0a7.743,7.743,0,0,1-6.176,5.347H344.9a11.249,11.249,0,0,1-6.269-5.07h0a348.21,348.21,0,0,0-39.456-48.952L281.387,284.49,222.3,223.185a497.888,497.888,0,0,1-35.4-36.322,12.033,12.033,0,0,0-.922-1.382,35.4,35.4,0,0,1-4.7-9.219V174.51a31.346,31.346,0,0,1,9.218-27.656c11.432-11.431,22.955-22.954,33.833-34.939,11.984,13.275,24.8,26,37.428,38.627h0a530.991,530.991,0,0,1,69.6,79.1,147.494,147.494,0,0,1,27.011,83.8A134.109,134.109,0,0,1,352.371,351.6Z"]
};
var faHireAHelper = {
  prefix: 'fab',
  iconName: 'hire-a-helper',
  icon: [512, 512, [], "f3b0", "M443.1 0H71.9C67.9 37.3 37.4 67.8 0 71.7v371.5c37.4 4.9 66 32.4 71.9 68.8h372.2c3-36.4 32.5-65.8 67.9-69.8V71.7c-36.4-5.9-65-35.3-68.9-71.7zm-37 404.9c-36.3 0-18.8-2-55.1-2-35.8 0-21 2-56.1 2-5.9 0-4.9-8.2 0-9.8 22.8-7.6 22.9-10.2 24.6-12.8 10.4-15.6 5.9-83 5.9-113 0-5.3-6.4-12.8-13.8-12.8H200.4c-7.4 0-13.8 7.5-13.8 12.8 0 30-4.5 97.4 5.9 113 1.7 2.5 1.8 5.2 24.6 12.8 4.9 1.6 6 9.8 0 9.8-35.1 0-20.3-2-56.1-2-36.3 0-18.8 2-55.1 2-7.9 0-5.8-10.8 0-10.8 10.2-3.4 13.5-3.5 21.7-13.8 7.7-12.9 7.9-44.4 7.9-127.8V151.3c0-22.2-12.2-28.3-28.6-32.4-8.8-2.2-4-11.8 1-11.8 36.5 0 20.6 2 57.1 2 32.7 0 16.5-2 49.2-2 3.3 0 8.5 8.3 1 10.8-4.9 1.6-27.6 3.7-27.6 39.3 0 45.6-.2 55.8 1 68.8 0 1.3 2.3 12.8 12.8 12.8h109.2c10.5 0 12.8-11.5 12.8-12.8 1.2-13 1-23.2 1-68.8 0-35.6-22.7-37.7-27.6-39.3-7.5-2.5-2.3-10.8 1-10.8 32.7 0 16.5 2 49.2 2 36.5 0 20.6-2 57.1-2 4.9 0 9.9 9.6 1 11.8-16.4 4.1-28.6 10.3-28.6 32.4v101.2c0 83.4.1 114.9 7.9 127.8 8.2 10.2 11.4 10.4 21.7 13.8 5.8 0 7.8 10.8 0 10.8z"]
};
var faCreativeCommonsBy = {
  prefix: 'fab',
  iconName: 'creative-commons-by',
  icon: [496, 512, [], "f4e7", "M314.9 194.4v101.4h-28.3v120.5h-77.1V295.9h-28.3V194.4c0-4.4 1.6-8.2 4.6-11.3 3.1-3.1 6.9-4.7 11.3-4.7H299c4.1 0 7.8 1.6 11.1 4.7 3.1 3.2 4.8 6.9 4.8 11.3zm-101.5-63.7c0-23.3 11.5-35 34.5-35s34.5 11.7 34.5 35c0 23-11.5 34.5-34.5 34.5s-34.5-11.5-34.5-34.5zM247.6 8C389.4 8 496 118.1 496 256c0 147.1-118.5 248-248.4 248C113.6 504 0 394.5 0 256 0 123.1 104.7 8 247.6 8zm.8 44.7C130.2 52.7 44.7 150.6 44.7 256c0 109.8 91.2 202.8 203.7 202.8 103.2 0 202.8-81.1 202.8-202.8.1-113.8-90.2-203.3-202.8-203.3z"]
};
var faUnity = {
  prefix: 'fab',
  iconName: 'unity',
  icon: [448, 512, [], "e049", "M243.583 91.6027L323.695 138.384C326.575 140.026 326.68 144.583 323.695 146.225L228.503 201.854C225.623 203.55 222.22 203.444 219.549 201.854L124.357 146.225C121.425 144.636 121.373 139.973 124.357 138.384L204.417 91.6027V0L0 119.417V358.252L78.3843 312.477V218.914C78.3319 215.576 82.2066 213.192 85.0865 214.993L180.279 270.622C183.159 272.318 184.782 275.338 184.782 278.464V389.669C184.834 393.007 180.959 395.391 178.079 393.589L97.9673 346.808L19.583 392.583L224 512L428.417 392.583L350.033 346.808L269.921 393.589C267.093 395.338 263.114 393.06 263.218 389.669V278.464C263.218 275.126 265.051 272.159 267.721 270.622L362.914 214.993C365.741 213.245 369.72 215.47 369.616 218.914V312.477L448 358.252V119.417L243.583 0V91.6027Z"]
};
var faWhmcs = {
  prefix: 'fab',
  iconName: 'whmcs',
  icon: [448, 512, [], "f40d", "M448 161v-21.3l-28.5-8.8-2.2-10.4 20.1-20.7L427 80.4l-29 7.5-7.2-7.5 7.5-28.2-19.1-11.6-21.3 21-10.7-3.2-7-26.4h-22.6l-6.2 26.4-12.1 3.2-19.7-21-19.4 11 8.1 27.7-8.1 8.4-28.5-7.5-11 19.1 20.7 21-2.9 10.4-28.5 7.8-.3 21.7 28.8 7.5 2.4 12.1-20.1 19.9 10.4 18.5 29.6-7.5 7.2 8.6-8.1 26.9 19.9 11.6 19.4-20.4 11.6 2.9 6.7 28.5 22.6.3 6.7-28.8 11.6-3.5 20.7 21.6 20.4-12.1-8.8-28 7.8-8.1 28.8 8.8 10.3-20.1-20.9-18.8 2.2-12.1 29.1-7zm-119.2 45.2c-31.3 0-56.8-25.4-56.8-56.8s25.4-56.8 56.8-56.8 56.8 25.4 56.8 56.8c0 31.5-25.4 56.8-56.8 56.8zm72.3 16.4l46.9 14.5V277l-55.1 13.4-4.1 22.7 38.9 35.3-19.2 37.9-54-16.7-14.6 15.2 16.7 52.5-38.3 22.7-38.9-40.5-21.7 6.6-12.6 54-42.4-.5-12.6-53.6-21.7-5.6-36.4 38.4-37.4-21.7 15.2-50.5-13.7-16.1-55.5 14.1-19.7-34.8 37.9-37.4-4.8-22.8-54-14.1.5-40.9L54 219.9l5.7-19.7-38.9-39.4L41.5 125l53.6 14.1 15.2-15.7-15.2-52 36.4-20.7 36.8 39.4L191 84l11.6-52H245l11.6 45.9L234 72l-6.3-1.7-3.3 5.7-11 19.1-3.3 5.6 4.6 4.6 17.2 17.4-.3 1-23.8 6.5-6.2 1.7-.1 6.4-.2 12.9C153.8 161.6 118 204 118 254.7c0 58.3 47.3 105.7 105.7 105.7 50.5 0 92.7-35.4 103.2-82.8l13.2.2 6.9.1 1.6-6.7 5.6-24 1.9-.6 17.1 17.8 4.7 4.9 5.8-3.4 20.4-12.1 5.8-3.5-2-6.5-6.8-21.2z"]
};
var faRocketchat = {
  prefix: 'fab',
  iconName: 'rocketchat',
  icon: [576, 512, [], "f3e8", "M284.046,224.8a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,284.046,224.8Zm-110.45,0a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,173.6,224.8Zm220.923,0a34.114,34.114,0,1,0,34.317,34.113A34.215,34.215,0,0,0,394.519,224.8Zm153.807-55.319c-15.535-24.172-37.31-45.57-64.681-63.618-52.886-34.817-122.374-54-195.666-54a405.975,405.975,0,0,0-72.032,6.357,238.524,238.524,0,0,0-49.51-36.588C99.684-11.7,40.859.711,11.135,11.421A14.291,14.291,0,0,0,5.58,34.782C26.542,56.458,61.222,99.3,52.7,138.252c-33.142,33.9-51.112,74.776-51.112,117.337,0,43.372,17.97,84.248,51.112,118.148,8.526,38.956-26.154,81.816-47.116,103.491a14.284,14.284,0,0,0,5.555,23.34c29.724,10.709,88.549,23.147,155.324-10.2a238.679,238.679,0,0,0,49.51-36.589A405.972,405.972,0,0,0,288,460.14c73.313,0,142.8-19.159,195.667-53.975,27.371-18.049,49.145-39.426,64.679-63.619,17.309-26.923,26.07-55.916,26.07-86.125C574.394,225.4,565.634,196.43,548.326,169.485ZM284.987,409.9a345.65,345.65,0,0,1-89.446-11.5l-20.129,19.393a184.366,184.366,0,0,1-37.138,27.585,145.767,145.767,0,0,1-52.522,14.87c.983-1.771,1.881-3.563,2.842-5.356q30.258-55.68,16.325-100.078c-32.992-25.962-52.778-59.2-52.778-95.4,0-83.1,104.254-150.469,232.846-150.469s232.867,67.373,232.867,150.469C517.854,342.525,413.6,409.9,284.987,409.9Z"]
};
var faVk = {
  prefix: 'fab',
  iconName: 'vk',
  icon: [448, 512, [], "f189", "M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z"]
};
var faUntappd = {
  prefix: 'fab',
  iconName: 'untappd',
  icon: [640, 512, [], "f405", "M401.3 49.9c-79.8 160.1-84.6 152.5-87.9 173.2l-5.2 32.8c-1.9 12-6.6 23.5-13.7 33.4L145.6 497.1c-7.6 10.6-20.4 16.2-33.4 14.6-40.3-5-77.8-32.2-95.3-68.5-5.7-11.8-4.5-25.8 3.1-36.4l148.9-207.9c7.1-9.9 16.4-18 27.2-23.7l29.3-15.5c18.5-9.8 9.7-11.9 135.6-138.9 1-4.8 1-7.3 3.6-8 3-.7 6.6-1 6.3-4.6l-.4-4.6c-.2-1.9 1.3-3.6 3.2-3.6 4.5-.1 13.2 1.2 25.6 10 12.3 8.9 16.4 16.8 17.7 21.1.6 1.8-.6 3.7-2.4 4.2l-4.5 1.1c-3.4.9-2.5 4.4-2.3 7.4.1 2.8-2.3 3.6-6.5 6.1zM230.1 36.4c3.4.9 2.5 4.4 2.3 7.4-.2 2.7 2.1 3.5 6.4 6 7.9 15.9 15.3 30.5 22.2 44 .7 1.3 2.3 1.5 3.3.5 11.2-12 24.6-26.2 40.5-42.6 1.3-1.4 1.4-3.5.1-4.9-8-8.2-16.5-16.9-25.6-26.1-1-4.7-1-7.3-3.6-8-3-.8-6.6-1-6.3-4.6.3-3.3 1.4-8.1-2.8-8.2-4.5-.1-13.2 1.1-25.6 10-12.3 8.9-16.4 16.8-17.7 21.1-1.4 4.2 3.6 4.6 6.8 5.4zM620 406.7L471.2 198.8c-13.2-18.5-26.6-23.4-56.4-39.1-11.2-5.9-14.2-10.9-30.5-28.9-1-1.1-2.9-.9-3.6.5-46.3 88.8-47.1 82.8-49 94.8-1.7 10.7-1.3 20 .3 29.8 1.9 12 6.6 23.5 13.7 33.4l148.9 207.9c7.6 10.6 20.2 16.2 33.1 14.7 40.3-4.9 78-32 95.7-68.6 5.4-11.9 4.3-25.9-3.4-36.6z"]
};
var faMailchimp = {
  prefix: 'fab',
  iconName: 'mailchimp',
  icon: [448, 512, [], "f59e", "M330.61 243.52a36.15 36.15 0 0 1 9.3 0c1.66-3.83 1.95-10.43.45-17.61-2.23-10.67-5.25-17.14-11.48-16.13s-6.47 8.74-4.24 19.42c1.26 6 3.49 11.14 6 14.32zM277.05 252c4.47 2 7.2 3.26 8.28 2.13 1.89-1.94-3.48-9.39-12.12-13.09a31.44 31.44 0 0 0-30.61 3.68c-3 2.18-5.81 5.22-5.41 7.06.85 3.74 10-2.71 22.6-3.48 7-.44 12.8 1.75 17.26 3.71zm-9 5.13c-9.07 1.42-15 6.53-13.47 10.1.9.34 1.17.81 5.21-.81a37 37 0 0 1 18.72-1.95c2.92.34 4.31.52 4.94-.49 1.46-2.22-5.71-8-15.39-6.85zm54.17 17.1c3.38-6.87-10.9-13.93-14.3-7s10.92 13.88 14.32 6.97zm15.66-20.47c-7.66-.13-7.95 15.8-.26 15.93s7.98-15.81.28-15.96zm-218.79 78.9c-1.32.31-6 1.45-8.47-2.35-5.2-8 11.11-20.38 3-35.77-9.1-17.47-27.82-13.54-35.05-5.54-8.71 9.6-8.72 23.54-5 24.08 4.27.57 4.08-6.47 7.38-11.63a12.83 12.83 0 0 1 17.85-3.72c11.59 7.59 1.37 17.76 2.28 28.62 1.39 16.68 18.42 16.37 21.58 9a2.08 2.08 0 0 0-.2-2.33c.03.89.68-1.3-3.35-.39zm299.72-17.07c-3.35-11.73-2.57-9.22-6.78-20.52 2.45-3.67 15.29-24-3.07-43.25-10.4-10.92-33.9-16.54-41.1-18.54-1.5-11.39 4.65-58.7-21.52-83 20.79-21.55 33.76-45.29 33.73-65.65-.06-39.16-48.15-51-107.42-26.47l-12.55 5.33c-.06-.05-22.71-22.27-23.05-22.57C169.5-18-41.77 216.81 25.78 273.85l14.76 12.51a72.49 72.49 0 0 0-4.1 33.5c3.36 33.4 36 60.42 67.53 60.38 57.73 133.06 267.9 133.28 322.29 3 1.74-4.47 9.11-24.61 9.11-42.38s-10.09-25.27-16.53-25.27zm-316 48.16c-22.82-.61-47.46-21.15-49.91-45.51-6.17-61.31 74.26-75.27 84-12.33 4.54 29.64-4.67 58.49-34.12 57.81zM84.3 249.55C69.14 252.5 55.78 261.09 47.6 273c-4.88-4.07-14-12-15.59-15-13.01-24.85 14.24-73 33.3-100.21C112.42 90.56 186.19 39.68 220.36 48.91c5.55 1.57 23.94 22.89 23.94 22.89s-34.15 18.94-65.8 45.35c-42.66 32.85-74.89 80.59-94.2 132.4zM323.18 350.7s-35.74 5.3-69.51-7.07c6.21-20.16 27 6.1 96.4-13.81 15.29-4.38 35.37-13 51-25.35a102.85 102.85 0 0 1 7.12 24.28c3.66-.66 14.25-.52 11.44 18.1-3.29 19.87-11.73 36-25.93 50.84A106.86 106.86 0 0 1 362.55 421a132.45 132.45 0 0 1-20.34 8.58c-53.51 17.48-108.3-1.74-126-43a66.33 66.33 0 0 1-3.55-9.74c-7.53-27.2-1.14-59.83 18.84-80.37 1.23-1.31 2.48-2.85 2.48-4.79a8.45 8.45 0 0 0-1.92-4.54c-7-10.13-31.19-27.4-26.33-60.83 3.5-24 24.49-40.91 44.07-39.91l5 .29c8.48.5 15.89 1.59 22.88 1.88 11.69.5 22.2-1.19 34.64-11.56 4.2-3.5 7.57-6.54 13.26-7.51a17.45 17.45 0 0 1 13.6 2.24c10 6.64 11.4 22.73 11.92 34.49.29 6.72 1.1 23 1.38 27.63.63 10.67 3.43 12.17 9.11 14 3.19 1.05 6.15 1.83 10.51 3.06 13.21 3.71 21 7.48 26 12.31a16.38 16.38 0 0 1 4.74 9.29c1.56 11.37-8.82 25.4-36.31 38.16-46.71 21.68-93.68 14.45-100.48 13.68-20.15-2.71-31.63 23.32-19.55 41.15 22.64 33.41 122.4 20 151.37-21.35.69-1 .12-1.59-.73-1-41.77 28.58-97.06 38.21-128.46 26-4.77-1.85-14.73-6.44-15.94-16.67 43.6 13.49 71 .74 71 .74s2.03-2.79-.56-2.53zm-68.47-5.7zm-83.4-187.5c16.74-19.35 37.36-36.18 55.83-45.63a.73.73 0 0 1 1 1c-1.46 2.66-4.29 8.34-5.19 12.65a.75.75 0 0 0 1.16.79c11.49-7.83 31.48-16.22 49-17.3a.77.77 0 0 1 .52 1.38 41.86 41.86 0 0 0-7.71 7.74.75.75 0 0 0 .59 1.19c12.31.09 29.66 4.4 41 10.74.76.43.22 1.91-.64 1.72-69.55-15.94-123.08 18.53-134.5 26.83a.76.76 0 0 1-1-1.12z"]
};
var faCss3Alt = {
  prefix: 'fab',
  iconName: 'css3-alt',
  icon: [384, 512, [], "f38b", "M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"]
};
var faSquareReddit = {
  prefix: 'fab',
  iconName: 'square-reddit',
  icon: [448, 512, ["reddit-square"], "f1a2", "M283.2 345.5c2.7 2.7 2.7 6.8 0 9.2-24.5 24.5-93.8 24.6-118.4 0-2.7-2.4-2.7-6.5 0-9.2 2.4-2.4 6.5-2.4 8.9 0 18.7 19.2 81 19.6 100.5 0 2.4-2.3 6.6-2.3 9 0zm-91.3-53.8c0-14.9-11.9-26.8-26.5-26.8-14.9 0-26.8 11.9-26.8 26.8 0 14.6 11.9 26.5 26.8 26.5 14.6 0 26.5-11.9 26.5-26.5zm90.7-26.8c-14.6 0-26.5 11.9-26.5 26.8 0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-11.9 26.8-26.5 0-14.9-11.9-26.8-26.8-26.8zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-99.7 140.6c-10.1 0-19 4.2-25.6 10.7-24.1-16.7-56.5-27.4-92.5-28.6l18.7-84.2 59.5 13.4c0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-12.2 26.8-26.8 0-14.6-11.9-26.8-26.8-26.8-10.4 0-19.3 6.2-23.8 14.9l-65.7-14.6c-3.3-.9-6.5 1.5-7.4 4.8l-20.5 92.8c-35.7 1.5-67.8 12.2-91.9 28.9-6.5-6.8-15.8-11-25.9-11-37.5 0-49.8 50.4-15.5 67.5-1.2 5.4-1.8 11-1.8 16.7 0 56.5 63.7 102.3 141.9 102.3 78.5 0 142.2-45.8 142.2-102.3 0-5.7-.6-11.6-2.1-17 33.6-17.2 21.2-67.2-16.1-67.2z"]
};
var faRedditSquare = faSquareReddit;
var faVimeoV = {
  prefix: 'fab',
  iconName: 'vimeo-v',
  icon: [448, 512, [], "f27d", "M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z"]
};
var faContao = {
  prefix: 'fab',
  iconName: 'contao',
  icon: [512, 512, [], "f26d", "M45.4 305c14.4 67.1 26.4 129 68.2 175H34c-18.7 0-34-15.2-34-34V66c0-18.7 15.2-34 34-34h57.7C77.9 44.6 65.6 59.2 54.8 75.6c-45.4 70-27 146.8-9.4 229.4zM478 32h-90.2c21.4 21.4 39.2 49.5 52.7 84.1l-137.1 29.3c-14.9-29-37.8-53.3-82.6-43.9-24.6 5.3-41 19.3-48.3 34.6-8.8 18.7-13.2 39.8 8.2 140.3 21.1 100.2 33.7 117.7 49.5 131.2 12.9 11.1 33.4 17 58.3 11.7 44.5-9.4 55.7-40.7 57.4-73.2l137.4-29.6c3.2 71.5-18.7 125.2-57.4 163.6H478c18.7 0 34-15.2 34-34V66c0-18.8-15.2-34-34-34z"]
};
var faSquareFontAwesome = {
  prefix: 'fab',
  iconName: 'square-font-awesome',
  icon: [448, 512, [], "e5ad", "M384.5,32.5h-320c-35.3,0-64,28.7-64,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64v-320 C448.5,61.2,419.8,32.5,384.5,32.5z M336.5,312.5c-31.6,11.2-41.2,16-59.8,16c-31.4,0-43.2-16-74.6-16c-10.2,0-18.2,1.6-25.6,4v-32 c7.4-2.2,15.4-4,25.6-4c31.2,0,43.2,16,74.6,16c10.2,0,17.8-1.4,27.8-4.6v-96c-10,3.2-17.6,4.6-27.8,4.6c-31.4,0-43.2-16-74.6-16 c-25.4,0-37.4,10.4-57.6,14.4v153.6c0,8.8-7.2,16-16,16c-8.8,0-16-7.2-16-16v-192c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v6.4 c20.2-4,32.2-14.4,57.6-14.4c31.2,0,43.2,16,74.6,16c18.6,0,28.2-4.8,59.8-16V312.5z"]
};
var faDeskpro = {
  prefix: 'fab',
  iconName: 'deskpro',
  icon: [480, 512, [], "f38f", "M205.9 512l31.1-38.4c12.3-.2 25.6-1.4 36.5-6.6 38.9-18.6 38.4-61.9 38.3-63.8-.1-5-.8-4.4-28.9-37.4H362c-.2 50.1-7.3 68.5-10.2 75.7-9.4 23.7-43.9 62.8-95.2 69.4-8.7 1.1-32.8 1.2-50.7 1.1zm200.4-167.7c38.6 0 58.5-13.6 73.7-30.9l-175.5-.3-17.4 31.3 119.2-.1zm-43.6-223.9v168.3h-73.5l-32.7 55.5H250c-52.3 0-58.1-56.5-58.3-58.9-1.2-13.2-21.3-11.6-20.1 1.8 1.4 15.8 8.8 40 26.4 57.1h-91c-25.5 0-110.8-26.8-107-114V16.9C0 .9 9.7.3 15 .1h82c.2 0 .3.1.5.1 4.3-.4 50.1-2.1 50.1 43.7 0 13.3 20.2 13.4 20.2 0 0-18.2-5.5-32.8-15.8-43.7h84.2c108.7-.4 126.5 79.4 126.5 120.2zm-132.5 56l64 29.3c13.3-45.5-42.2-71.7-64-29.3z"]
};
var faSistrix = {
  prefix: 'fab',
  iconName: 'sistrix',
  icon: [448, 512, [], "f3ee", "M448 449L301.2 300.2c20-27.9 31.9-62.2 31.9-99.2 0-93.1-74.7-168.9-166.5-168.9C74.7 32 0 107.8 0 200.9s74.7 168.9 166.5 168.9c39.8 0 76.3-14.2 105-37.9l146 148.1 30.5-31zM166.5 330.8c-70.6 0-128.1-58.3-128.1-129.9S95.9 71 166.5 71s128.1 58.3 128.1 129.9-57.4 129.9-128.1 129.9z"]
};
var faSquareInstagram = {
  prefix: 'fab',
  iconName: 'square-instagram',
  icon: [448, 512, ["instagram-square"], "e055", "M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"]
};
var faInstagramSquare = faSquareInstagram;
var faBattleNet = {
  prefix: 'fab',
  iconName: 'battle-net',
  icon: [512, 512, [], "f835", "M448.61 225.62c26.87.18 35.57-7.43 38.92-12.37 12.47-16.32-7.06-47.6-52.85-71.33 17.76-33.58 30.11-63.68 36.34-85.3 3.38-11.83 1.09-19 .45-20.25-1.72 10.52-15.85 48.46-48.2 100.05-25-11.22-56.52-20.1-93.77-23.8-8.94-16.94-34.88-63.86-60.48-88.93C252.18 7.14 238.7 1.07 228.18.22h-.05c-13.83-1.55-22.67 5.85-27.4 11-17.2 18.53-24.33 48.87-25 84.07-7.24-12.35-17.17-24.63-28.5-25.93h-.18c-20.66-3.48-38.39 29.22-36 81.29-38.36 1.38-71 5.75-93 11.23-9.9 2.45-16.22 7.27-17.76 9.72 1-.38 22.4-9.22 111.56-9.22 5.22 53 29.75 101.82 26 93.19-9.73 15.4-38.24 62.36-47.31 97.7-5.87 22.88-4.37 37.61.15 47.14 5.57 12.75 16.41 16.72 23.2 18.26 25 5.71 55.38-3.63 86.7-21.14-7.53 12.84-13.9 28.51-9.06 39.34 7.31 19.65 44.49 18.66 88.44-9.45 20.18 32.18 40.07 57.94 55.7 74.12a39.79 39.79 0 0 0 8.75 7.09c5.14 3.21 8.58 3.37 8.58 3.37-8.24-6.75-34-38-62.54-91.78 22.22-16 45.65-38.87 67.47-69.27 122.82 4.6 143.29-24.76 148-31.64 14.67-19.88 3.43-57.44-57.32-93.69zm-77.85 106.22c23.81-37.71 30.34-67.77 29.45-92.33 27.86 17.57 47.18 37.58 49.06 58.83 1.14 12.93-8.1 29.12-78.51 33.5zM216.9 387.69c9.76-6.23 19.53-13.12 29.2-20.49 6.68 13.33 13.6 26.1 20.6 38.19-40.6 21.86-68.84 12.76-49.8-17.7zm215-171.35c-10.29-5.34-21.16-10.34-32.38-15.05a722.459 722.459 0 0 0 22.74-36.9c39.06 24.1 45.9 53.18 9.64 51.95zM279.18 398c-5.51-11.35-11-23.5-16.5-36.44 43.25 1.27 62.42-18.73 63.28-20.41 0 .07-25 15.64-62.53 12.25a718.78 718.78 0 0 0 85.06-84q13.06-15.31 24.93-31.11c-.36-.29-1.54-3-16.51-12-51.7 60.27-102.34 98-132.75 115.92-20.59-11.18-40.84-31.78-55.71-61.49-20-39.92-30-82.39-31.57-116.07 12.3.91 25.27 2.17 38.85 3.88-22.29 36.8-14.39 63-13.47 64.23 0-.07-.95-29.17 20.14-59.57a695.23 695.23 0 0 0 44.67 152.84c.93-.38 1.84.88 18.67-8.25-26.33-74.47-33.76-138.17-34-173.43 20-12.42 48.18-19.8 81.63-17.81 44.57 2.67 86.36 15.25 116.32 30.71q-10.69 15.66-23.33 32.47C365.63 152 339.1 145.84 337.5 146c.11 0 25.9 14.07 41.52 47.22a717.63 717.63 0 0 0-115.34-31.71 646.608 646.608 0 0 0-39.39-6.05c-.07.45-1.81 1.85-2.16 20.33C300 190.28 358.78 215.68 389.36 233c.74 23.55-6.95 51.61-25.41 79.57-24.6 37.31-56.39 67.23-84.77 85.43zm27.4-287c-44.56-1.66-73.58 7.43-94.69 20.67 2-52.3 21.31-76.38 38.21-75.28C267 52.15 305 108.55 306.58 111zm-130.65 3.1c.48 12.11 1.59 24.62 3.21 37.28-14.55-.85-28.74-1.25-42.4-1.26-.08 3.24-.12-51 24.67-49.59h.09c5.76 1.09 10.63 6.88 14.43 13.57zm-28.06 162c20.76 39.7 43.3 60.57 65.25 72.31-46.79 24.76-77.53 20-84.92 4.51-.2-.21-11.13-15.3 19.67-76.81zm210.06 74.8"]
};
var faTheRedYeti = {
  prefix: 'fab',
  iconName: 'the-red-yeti',
  icon: [512, 512, [], "f69d", "M488.23 241.7l20.7 7.1c-9.6-23.9-23.9-37-31.7-44.8l7.1-18.2c.2 0 12.3-27.8-2.5-30.7-.6-11.3-6.6-27-18.4-27-7.6-10.6-17.7-12.3-30.7-5.9a122.2 122.2 0 0 0-25.3 16.5c-5.3-6.4-3 .4-3-29.8-37.1-24.3-45.4-11.7-74.8 3l.5.5a239.36 239.36 0 0 0-68.4-13.3c-5.5-8.7-18.6-19.1-25.1-25.1l24.8 7.1c-5.5-5.5-26.8-12.9-34.2-15.2 18.2-4.1 29.8-20.8 42.5-33-34.9-10.1-67.9-5.9-97.9 11.8l12-44.2L182 0c-31.6 24.2-33 41.9-33.7 45.5-.9-2.4-6.3-19.6-15.2-27a35.12 35.12 0 0 0-.5 25.3c3 8.4 5.9 14.8 8.4 18.9-16-3.3-28.3-4.9-49.2 0h-3.7l33 14.3a194.26 194.26 0 0 0-46.7 67.4l-1.7 8.4 1.7 1.7 7.6-4.7c-3.3 11.6-5.3 19.4-6.6 25.8a200.18 200.18 0 0 0-27.8 40.3c-15 1-31.8 10.8-40.3 14.3l3 3.4 28.8 1c-.5 1-.7 2.2-1.2 3.2-7.3 6.4-39.8 37.7-33 80.7l20.2-22.4c.5 1.7.7 3.4 1.2 5.2 0 25.5.4 89.6 64.9 150.5 43.6 40 96 60.2 157.5 60.2 121.7 0 223-87.3 223-211.5 6.8-9.7-1.2 3 16.7-25.1l13 14.3 2.5-.5A181.84 181.84 0 0 0 495 255a44.74 44.74 0 0 0-6.8-13.3zM398 111.2l-.5 21.9c5.5 18.1 16.9 17.2 22.4 17.2l-3.4-4.7 22.4-5.4a242.44 242.44 0 0 1-27 0c12.8-2.1 33.3-29 43-11.3 3.4 7.6 6.4 17.2 9.3 27.8l1.7-5.9a56.38 56.38 0 0 1-1.7-15.2c5.4.5 8.8 3.4 9.3 10.1.5 6.4 1.7 14.8 3.4 25.3l4.7-11.3c4.6 0 4.5-3.6-2.5 20.7-20.9-8.7-35.1-8.4-46.5-8.4l18.2-16c-25.3 8.2-33 10.8-54.8 20.9-1.1-5.4-5-13.5-16-19.9-3.2 3.8-2.8.9-.7 14.8h-2.5a62.32 62.32 0 0 0-8.4-23.1l4.2-3.4c8.4-7.1 11.8-14.3 10.6-21.9-.5-6.4-5.4-13.5-13.5-20.7 5.6-3.4 15.2-.4 28.3 8.5zm-39.6-10.1c2.7 1.9 11.4 5.4 18.9 17.2 4.2 8.4 4 9.8 3.4 11.1-.5 2.4-.5 4.3-3 7.1-1.7 2.5-5.4 4.7-11.8 7.6-7.6-13-16.5-23.6-27.8-31.2zM91 143.1l1.2-1.7c1.2-2.9 4.2-7.6 9.3-15.2l2.5-3.4-13 12.3 5.4-4.7-10.1 9.3-4.2 1.2c12.3-24.1 23.1-41.3 32.5-50.2 9.3-9.3 16-16 20.2-19.4l-6.4 1.2c-11.3-4.2-19.4-7.1-24.8-8.4 2.5-.5 3.7-.5 3.2-.5 10.3 0 17.5.5 20.9 1.2a52.35 52.35 0 0 0 16 2.5l.5-1.7-8.4-35.8 13.5 29a42.89 42.89 0 0 0 5.9-14.3c1.7-6.4 5.4-13 10.1-19.4s7.6-10.6 9.3-11.3a234.68 234.68 0 0 0-6.4 25.3l-1.7 7.1-.5 4.7 2.5 2.5C190.4 39.9 214 34 239.8 34.5l21.1.5c-11.8 13.5-27.8 21.9-48.5 24.8a201.26 201.26 0 0 1-23.4 2.9l-.2-.5-2.5-1.2a20.75 20.75 0 0 0-14 2c-2.5-.2-4.9-.5-7.1-.7l-2.5 1.7.5 1.2c2 .2 3.9.5 6.2.7l-2 3.4 3.4-.5-10.6 11.3c-4.2 3-5.4 6.4-4.2 9.3l5.4-3.4h1.2a39.4 39.4 0 0 1 25.3-15.2v-3c6.4.5 13 1 19.4 1.2 6.4 0 8.4.5 5.4 1.2a189.6 189.6 0 0 1 20.7 13.5c13.5 10.1 23.6 21.9 30 35.4 8.8 18.2 13.5 37.1 13.5 56.6a141.13 141.13 0 0 1-3 28.3 209.91 209.91 0 0 1-16 46l2.5.5c18.2-19.7 41.9-16 49.2-16l-6.4 5.9 22.4 17.7-1.7 30.7c-5.4-12.3-16.5-21.1-33-27.8 16.5 14.8 23.6 21.1 21.9 20.2-4.8-2.8-3.5-1.9-10.8-3.7 4.1 4.1 17.5 18.8 18.2 20.7l.2.2-.2.2c0 1.8 1.6-1.2-14 22.9-75.2-15.3-106.27-42.7-141.2-63.2l11.8 1.2c-11.8-18.5-15.6-17.7-38.4-26.1L149 225c-8.8-3-18.2-3-28.3.5l7.6-10.6-1.2-1.7c-14.9 4.3-19.8 9.2-22.6 11.3-1.1-5.5-2.8-12.4-12.3-28.8l-1.2 27-13.2-5c1.5-25.2 5.4-50.5 13.2-74.6zm276.5 330c-49.9 25-56.1 22.4-59 23.9-29.8-11.8-50.9-31.7-63.5-58.8l30 16.5c-9.8-9.3-18.3-16.5-38.4-44.3l11.8 23.1-17.7-7.6c14.2 21.1 23.5 51.7 66.6 73.5-120.8 24.2-199-72.1-200.9-74.3a262.57 262.57 0 0 0 35.4 24.8c3.4 1.7 7.1 2.5 10.1 1.2l-16-20.7c9.2 4.2 9.5 4.5 69.1 29-42.5-20.7-73.8-40.8-93.2-60.2-.5 6.4-1.2 10.1-1.2 10.1a80.25 80.25 0 0 1 20.7 26.6c-39-18.9-57.6-47.6-71.3-82.6 49.9 55.1 118.9 37.5 120.5 37.1 34.8 16.4 69.9 23.6 113.9 10.6 3.3 0 20.3 17 25.3 39.1l4.2-3-2.5-23.6c9 9 24.9 22.6 34.4 13-15.6-5.3-23.5-9.5-29.5-31.7 4.6 4.2 7.6 9 27.8 15l1.2-1.2-10.5-14.2c11.7-4.8-3.5 1 32-10.8 4.3 34.3 9 49.2.7 89.5zm115.3-214.4l-2.5.5 3 9.3c-3.5 5.9-23.7 44.3-71.6 79.7-39.5 29.8-76.6 39.1-80.9 40.3l-7.6-7.1-1.2 3 14.3 16-7.1-4.7 3.4 4.2h-1.2l-21.9-13.5 9.3 26.6-19-27.9-1.2 2.5 7.6 29c-6.1-8.2-21-32.6-56.8-39.6l32.5 21.2a214.82 214.82 0 0 1-93.2-6.4c-4.2-1.2-8.9-2.5-13.5-4.2l1.2-3-44.8-22.4 26.1 22.4c-57.7 9.1-113-25.4-126.4-83.4l-2.5-16.4-22.27 22.3c19.5-57.5 25.6-57.9 51.4-70.1-9.1-5.3-1.6-3.3-38.4-9.3 15.8-5.8 33-15.4 73 5.2a18.5 18.5 0 0 1 3.7-1.7c.6-3.2.4-.8 1-11.8 3.9 10 3.6 8.7 3 9.3l1.7.5c12.7-6.5 8.9-4.5 17-8.9l-5.4 13.5 22.3-5.8-8.4 8.4 2.5 2.5c4.5-1.8 30.3 3.4 40.8 16l-23.6-2.5c39.4 23 51.5 54 55.8 69.6l1.7-1.2c-2.8-22.3-12.4-33.9-16-40.1 4.2 5 39.2 34.6 110.4 46-11.3-.5-23.1 5.4-34.9 18.9l46.7-20.2-9.3 21.9c7.6-10.1 14.8-23.6 21.2-39.6v-.5l1.2-3-1.2 16c13.5-41.8 25.3-78.5 35.4-109.7l13.5-27.8v-2l-5.4-4.2h10.1l5.9 4.2 2.5-1.2-3.4-16 12.3 18.9 41.8-20.2-14.8 13 .5 2.9 17.7-.5a184 184 0 0 1 33 4.2l-23.6 2.5-1.2 3 26.6 23.1a254.21 254.21 0 0 1 27 32c-11.2-3.3-10.3-3.4-21.2-3.4l12.3 32.5zm-6.1-71.3l-3.9 13-14.3-11.8zm-254.8 7.1c1.7 10.6 4.7 17.7 8.8 21.9-9.3 6.6-27.5 13.9-46.5 16l.5 1.2a50.22 50.22 0 0 0 24.8-2.5l-7.1 13c4.2-1.7 10.1-7.1 17.7-14.8 11.9-5.5 12.7-5.1 20.2-16-12.7-6.4-15.7-13.7-18.4-18.8zm3.7-102.3c-6.4-3.4-10.6 3-12.3 18.9s2.5 29.5 11.8 39.6 18.2 10.6 26.1 3 3.4-23.6-11.3-47.7a39.57 39.57 0 0 0-14.27-13.8zm-4.7 46.3c5.4 2.2 10.5 1.9 12.3-10.6v-4.7l-1.2.5c-4.3-3.1-2.5-4.5-1.7-6.2l.5-.5c-.9-1.2-5-8.1-12.5 4.7-.5-13.5.5-21.9 3-24.8 1.2-2.5 4.7-1.2 11.3 4.2 6.4 5.4 11.3 16 15.2 32.5 6.5 28-19.8 26.2-26.9 4.9zm-45-5.5c1.6.3 9.3-1.1 9.3-14.8h-.5c-5.4-1.1-2.2-5.5-.7-5.9-1.7-3-3.4-4.2-5.4-4.7-8.1 0-11.6 12.7-8.1 21.2a7.51 7.51 0 0 0 5.43 4.2zM216 82.9l-2.5.5.5 3a48.94 48.94 0 0 1 26.1 5.9c-2.5-5.5-10-14.3-28.3-14.3l.5 2.5zm-71.8 49.4c21.7 16.8 16.5 21.4 46.5 23.6l-2.9-4.7a42.67 42.67 0 0 0 14.8-28.3c1.7-16-1.2-29.5-8.8-41.3l13-7.6a2.26 2.26 0 0 0-.5-1.7 14.21 14.21 0 0 0-13.5 1.7c-12.7 6.7-28 20.9-29 22.4-1.7 1.7-3.4 5.9-5.4 13.5a99.61 99.61 0 0 0-2.9 23.6c-4.7-8-10.5-6.4-19.9-5.9l7.1 7.6c-16.5 0-23.3 15.4-23.6 16 6.8 0 4.6-7.6 30-12.3-4.3-6.3-3.3-5-4.9-6.6zm18.7-18.7c1.2-7.6 3.4-13 6.4-17.2 5.4-6.4 10.6-10.1 16-11.8 4.2-1.7 7.1 1.2 10.1 9.3a72.14 72.14 0 0 1 3 25.3c-.5 9.3-3.4 17.2-8.4 23.1-2.9 3.4-5.4 5.9-6.4 7.6a39.21 39.21 0 0 1-11.3-.5l-7.1-3.4-5.4-6.4c.8-10 1.3-18.8 3.1-26zm42 56.1c-34.8 14.4-34.7 14-36.1 14.3-20.8 4.7-19-24.4-18.9-24.8l5.9-1.2-.5-2.5c-20.2-2.6-31 4.2-32.5 4.9.5.5 3 3.4 5.9 9.3 4.2-6.4 8.8-10.1 15.2-10.6a83.47 83.47 0 0 0 1.7 33.7c.1.5 2.6 17.4 27.5 24.1 11.3 3 27 1.2 48.9-5.4l-9.2.5c-4.2-14.8-6.4-24.8-5.9-29.5 11.3-8.8 21.9-11.3 30.7-7.6h2.5l-11.8-7.6-7.1.5c-5.9 1.2-12.3 4.2-19.4 8.4z"]
};
var faSquareHackerNews = {
  prefix: 'fab',
  iconName: 'square-hacker-news',
  icon: [448, 512, ["hacker-news-square"], "f3af", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.2 229.2H21c.1-.1.2-.3.3-.4 0 .1 0 .3-.1.4zm218 53.9V384h-31.4V281.3L128 128h37.3c52.5 98.3 49.2 101.2 59.3 125.6 12.3-27 5.8-24.4 60.6-125.6H320l-80.8 155.1z"]
};
var faHackerNewsSquare = faSquareHackerNews;
var faEdge = {
  prefix: 'fab',
  iconName: 'edge',
  icon: [512, 512, [], "f282", "M120.1 37.44C161.1 12.23 207.7-.7753 255 .0016C423 .0016 512 123.8 512 219.5C511.9 252.2 499 283.4 476.1 306.7C453.2 329.9 422.1 343.2 389.4 343.7C314.2 343.7 297.9 320.6 297.9 311.7C297.9 307.9 299.1 305.5 302.7 302.3L303.7 301.1L304.1 299.5C314.6 288 320 273.3 320 257.9C320 179.2 237.8 115.2 136 115.2C98.46 114.9 61.46 124.1 28.48 142.1C55.48 84.58 111.2 44.5 119.8 38.28C120.6 37.73 120.1 37.44 120.1 37.44V37.44zM135.7 355.5C134.3 385.5 140.3 415.5 152.1 442.7C165.7 469.1 184.8 493.7 208.6 512C149.1 500.5 97.11 468.1 59.2 422.7C21.12 376.3 0 318.4 0 257.9C0 206.7 62.4 163.5 136 163.5C172.6 162.9 208.4 174.4 237.8 196.2L234.2 197.4C182.7 215 135.7 288.1 135.7 355.5V355.5zM469.8 400L469.1 400.1C457.3 418.9 443.2 435.2 426.9 449.6C396.1 477.6 358.8 495.1 318.1 499.5C299.5 499.8 281.3 496.3 264.3 488.1C238.7 477.8 217.2 458.1 202.7 435.1C188.3 411.2 181.6 383.4 183.7 355.5C183.1 335.4 189.1 315.2 198.7 297.3C212.6 330.4 236.2 358.6 266.3 378.1C296.4 397.6 331.8 407.6 367.7 406.7C398.7 407 429.8 400 457.9 386.2L459.8 385.3C463.7 383 467.5 381.4 471.4 385.3C475.9 390.2 473.2 394.5 470.2 399.3C470 399.5 469.9 399.8 469.8 400V400z"]
};
var faNapster = {
  prefix: 'fab',
  iconName: 'napster',
  icon: [496, 512, [], "f3d2", "M298.3 373.6c-14.2 13.6-31.3 24.1-50.4 30.5-19-6.4-36.2-16.9-50.3-30.5h100.7zm44-199.6c20-16.9 43.6-29.2 69.6-36.2V299c0 219.4-328 217.6-328 .3V137.7c25.9 6.9 49.6 19.6 69.5 36.4 56.8-40 132.5-39.9 188.9-.1zm-208.8-58.5c64.4-60 164.3-60.1 228.9-.2-7.1 3.5-13.9 7.3-20.6 11.5-58.7-30.5-129.2-30.4-187.9.1-6.3-4-13.9-8.2-20.4-11.4zM43.8 93.2v69.3c-58.4 36.5-58.4 121.1.1 158.3 26.4 245.1 381.7 240.3 407.6 1.5l.3-1.7c58.7-36.3 58.9-121.7.2-158.2V93.2c-17.3.5-34 3-50.1 7.4-82-91.5-225.5-91.5-307.5.1-16.3-4.4-33.1-7-50.6-7.5zM259.2 352s36-.3 61.3-1.5c10.2-.5 21.1-4 25.5-6.5 26.3-15.1 25.4-39.2 26.2-47.4-79.5-.6-99.9-3.9-113 55.4zm-135.5-55.3c.8 8.2-.1 32.3 26.2 47.4 4.4 2.5 15.2 6 25.5 6.5 25.3 1.1 61.3 1.5 61.3 1.5-13.2-59.4-33.7-56.1-113-55.4zm169.1 123.4c-3.2-5.3-6.9-7.3-6.9-7.3-24.8 7.3-52.2 6.9-75.9 0 0 0-2.9 1.5-6.4 6.6-2.8 4.1-3.7 9.6-3.7 9.6 29.1 17.6 67.1 17.6 96.2 0-.1-.1-.3-4-3.3-8.9z"]
};
var faSquareSnapchat = {
  prefix: 'fab',
  iconName: 'square-snapchat',
  icon: [448, 512, ["snapchat-square"], "f2ad", "M384,32H64A64,64,0,0,0,0,96V416a64,64,0,0,0,64,64H384a64,64,0,0,0,64-64V96A64,64,0,0,0,384,32Zm-3.907,319.309-.083.1a32.364,32.364,0,0,1-8.717,6.823,90.26,90.26,0,0,1-20.586,8.2,12.694,12.694,0,0,0-3.852,1.76c-2.158,1.909-2.1,4.64-4.4,8.55a23.137,23.137,0,0,1-6.84,7.471c-6.707,4.632-14.244,4.923-22.23,5.23-7.214.274-15.39.581-24.729,3.669-3.761,1.245-7.753,3.694-12.377,6.533-11.265,6.9-26.68,16.353-52.3,16.353s-40.925-9.4-52.106-16.279c-4.657-2.888-8.675-5.362-12.543-6.64-9.339-3.08-17.516-3.4-24.729-3.67-7.986-.307-15.523-.6-22.231-5.229a23.085,23.085,0,0,1-6.01-6.11c-3.2-4.632-2.855-7.8-5.254-9.895a13.428,13.428,0,0,0-4.1-1.834,89.986,89.986,0,0,1-20.313-8.127,32.905,32.905,0,0,1-8.3-6.284c-6.583-6.757-8.276-14.776-5.686-21.824,3.436-9.338,11.571-12.111,19.4-16.262,14.776-8.027,26.348-18.055,34.433-29.884a68.236,68.236,0,0,0,5.985-10.567c.789-2.158.772-3.329.241-4.416a7.386,7.386,0,0,0-2.208-2.217c-2.532-1.676-5.113-3.353-6.882-4.5-3.27-2.141-5.868-3.818-7.529-4.98-6.267-4.383-10.65-9.04-13.4-14.245a28.4,28.4,0,0,1-1.369-23.584c4.134-10.924,14.469-17.706,26.978-17.706a37.141,37.141,0,0,1,7.845.83c.689.15,1.37.307,2.042.482-.108-7.43.058-15.357.722-23.119,2.358-27.261,11.912-41.589,21.874-52.994a86.836,86.836,0,0,1,22.28-17.931C188.254,100.383,205.312,96,224,96s35.828,4.383,50.944,13.016a87.169,87.169,0,0,1,22.239,17.9c9.961,11.406,19.516,25.709,21.874,52.995a231.194,231.194,0,0,1,.713,23.118c.673-.174,1.362-.332,2.051-.481a37.131,37.131,0,0,1,7.844-.83c12.5,0,22.82,6.782,26.971,17.706a28.37,28.37,0,0,1-1.4,23.559c-2.74,5.2-7.123,9.861-13.39,14.244-1.668,1.187-4.258,2.864-7.529,4.981-1.835,1.187-4.541,2.947-7.164,4.682a6.856,6.856,0,0,0-1.951,2.034c-.506,1.046-.539,2.191.166,4.208a69.015,69.015,0,0,0,6.085,10.792c8.268,12.1,20.188,22.313,35.454,30.407,1.486.772,2.98,1.5,4.441,2.258.722.332,1.569.763,2.491,1.3,4.9,2.723,9.2,6.01,11.455,12.153C387.821,336.915,386.269,344.7,380.093,351.309Zm-16.719-18.461c-50.313-24.314-58.332-61.918-58.689-64.749-.431-3.379-.921-6.035,2.806-9.472,3.594-3.328,19.541-13.19,23.965-16.278,7.33-5.114,10.534-10.219,8.16-16.495-1.66-4.316-5.686-5.976-9.961-5.976a18.5,18.5,0,0,0-3.993.448c-8.035,1.743-15.838,5.769-20.354,6.857a7.1,7.1,0,0,1-1.66.224c-2.408,0-3.279-1.071-3.088-3.968.564-8.783,1.759-25.925.373-41.937-1.884-22.032-8.99-32.948-17.432-42.6-4.051-4.624-23.135-24.654-59.536-24.654S168.53,134.359,164.479,139c-8.434,9.654-15.531,20.57-17.432,42.6-1.386,16.013-.141,33.147.373,41.937.166,2.756-.68,3.968-3.088,3.968a7.1,7.1,0,0,1-1.66-.224c-4.507-1.087-12.31-5.113-20.346-6.856a18.494,18.494,0,0,0-3.993-.449c-4.25,0-8.3,1.636-9.961,5.977-2.374,6.276.847,11.381,8.168,16.494,4.425,3.088,20.371,12.958,23.966,16.279,3.719,3.437,3.237,6.093,2.805,9.471-.356,2.79-8.384,40.394-58.689,64.749-2.946,1.428-7.96,4.45.88,9.331,13.88,7.628,23.111,6.807,30.3,11.43,6.093,3.927,2.5,12.394,6.923,15.449,5.454,3.76,21.583-.266,42.335,6.6,17.433,5.744,28.116,22.015,58.963,22.015s41.788-16.3,58.938-21.973c20.795-6.865,36.89-2.839,42.336-6.6,4.433-3.055.822-11.522,6.923-15.448,7.181-4.624,16.411-3.8,30.3-11.472C371.36,337.355,366.346,334.333,363.374,332.848Z"]
};
var faSnapchatSquare = faSquareSnapchat;
var faGooglePlusG = {
  prefix: 'fab',
  iconName: 'google-plus-g',
  icon: [640, 512, [], "f0d5", "M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"]
};
var faArtstation = {
  prefix: 'fab',
  iconName: 'artstation',
  icon: [512, 512, [], "f77a", "M2 377.4l43 74.3A51.35 51.35 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 59.3A51.38 51.38 0 0 0 290.2 32h-88.4l257.3 447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200L44 304.5z"]
};
var faMarkdown = {
  prefix: 'fab',
  iconName: 'markdown',
  icon: [640, 512, [], "f60f", "M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"]
};
var faSourcetree = {
  prefix: 'fab',
  iconName: 'sourcetree',
  icon: [448, 512, [], "f7d3", "M427.2 203c0-112.1-90.9-203-203-203C112.1-.2 21.2 90.6 21 202.6A202.86 202.86 0 0 0 161.5 396v101.7a14.3 14.3 0 0 0 14.3 14.3h96.4a14.3 14.3 0 0 0 14.3-14.3V396.1A203.18 203.18 0 0 0 427.2 203zm-271.6 0c0-90.8 137.3-90.8 137.3 0-.1 89.9-137.3 91-137.3 0z"]
};
var faGooglePlus = {
  prefix: 'fab',
  iconName: 'google-plus',
  icon: [512, 512, [], "f2b3", "M256,8C119.1,8,8,119.1,8,256S119.1,504,256,504,504,392.9,504,256,392.9,8,256,8ZM185.3,380a124,124,0,0,1,0-248c31.3,0,60.1,11,83,32.3l-33.6,32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9,0-77.2,35.5-77.2,78.1S142.3,334,185.3,334c32.6,0,64.9-19.1,70.1-53.3H185.3V238.1H302.2a109.2,109.2,0,0,1,1.9,20.7c0,70.8-47.5,121.2-118.8,121.2ZM415.5,273.8v35.5H380V273.8H344.5V238.3H380V202.8h35.5v35.5h35.2v35.5Z"]
};
var faDiaspora = {
  prefix: 'fab',
  iconName: 'diaspora',
  icon: [512, 512, [], "f791", "M251.64 354.55c-1.4 0-88 119.9-88.7 119.9S76.34 414 76 413.25s86.6-125.7 86.6-127.4c0-2.2-129.6-44-137.6-47.1-1.3-.5 31.4-101.8 31.7-102.1.6-.7 144.4 47 145.5 47 .4 0 .9-.6 1-1.3.4-2 1-148.6 1.7-149.6.8-1.2 104.5-.7 105.1-.3 1.5 1 3.5 156.1 6.1 156.1 1.4 0 138.7-47 139.3-46.3.8.9 31.9 102.2 31.5 102.6-.9.9-140.2 47.1-140.6 48.8-.3 1.4 82.8 122.1 82.5 122.9s-85.5 63.5-86.3 63.5c-1-.2-89-125.5-90.9-125.5z"]
};
var faFoursquare = {
  prefix: 'fab',
  iconName: 'foursquare',
  icon: [368, 512, [], "f180", "M323.1 3H49.9C12.4 3 0 31.3 0 49.1v433.8c0 20.3 12.1 27.7 18.2 30.1 6.2 2.5 22.8 4.6 32.9-7.1C180 356.5 182.2 354 182.2 354c3.1-3.4 3.4-3.1 6.8-3.1h83.4c35.1 0 40.6-25.2 44.3-39.7l48.6-243C373.8 25.8 363.1 3 323.1 3zm-16.3 73.8l-11.4 59.7c-1.2 6.5-9.5 13.2-16.9 13.2H172.1c-12 0-20.6 8.3-20.6 20.3v13c0 12 8.6 20.6 20.6 20.6h90.4c8.3 0 16.6 9.2 14.8 18.2-1.8 8.9-10.5 53.8-11.4 58.8-.9 4.9-6.8 13.5-16.9 13.5h-73.5c-13.5 0-17.2 1.8-26.5 12.6 0 0-8.9 11.4-89.5 108.3-.9.9-1.8.6-1.8-.3V75.9c0-7.7 6.8-16.6 16.6-16.6h219c8.2 0 15.6 7.7 13.5 17.5z"]
};
var faStackOverflow = {
  prefix: 'fab',
  iconName: 'stack-overflow',
  icon: [384, 512, [], "f16c", "M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"]
};
var faGithubAlt = {
  prefix: 'fab',
  iconName: 'github-alt',
  icon: [480, 512, [], "f113", "M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"]
};
var faPhoenixSquadron = {
  prefix: 'fab',
  iconName: 'phoenix-squadron',
  icon: [512, 512, [], "f511", "M96 63.38C142.49 27.25 201.55 7.31 260.51 8.81c29.58-.38 59.11 5.37 86.91 15.33-24.13-4.63-49-6.34-73.38-2.45C231.17 27 191 48.84 162.21 80.87c5.67-1 10.78-3.67 16-5.86 18.14-7.87 37.49-13.26 57.23-14.83 19.74-2.13 39.64-.43 59.28 1.92-14.42 2.79-29.12 4.57-43 9.59-34.43 11.07-65.27 33.16-86.3 62.63-13.8 19.71-23.63 42.86-24.67 67.13-.35 16.49 5.22 34.81 19.83 44a53.27 53.27 0 0 0 37.52 6.74c15.45-2.46 30.07-8.64 43.6-16.33 11.52-6.82 22.67-14.55 32-24.25 3.79-3.22 2.53-8.45 2.62-12.79-2.12-.34-4.38-1.11-6.3.3a203 203 0 0 1-35.82 15.37c-20 6.17-42.16 8.46-62.1.78 12.79 1.73 26.06.31 37.74-5.44 20.23-9.72 36.81-25.2 54.44-38.77a526.57 526.57 0 0 1 88.9-55.31c25.71-12 52.94-22.78 81.57-24.12-15.63 13.72-32.15 26.52-46.78 41.38-14.51 14-27.46 29.5-40.11 45.18-3.52 4.6-8.95 6.94-13.58 10.16a150.7 150.7 0 0 0-51.89 60.1c-9.33 19.68-14.5 41.85-11.77 63.65 1.94 13.69 8.71 27.59 20.9 34.91 12.9 8 29.05 8.07 43.48 5.1 32.8-7.45 61.43-28.89 81-55.84 20.44-27.52 30.52-62.2 29.16-96.35-.52-7.5-1.57-15-1.66-22.49 8 19.48 14.82 39.71 16.65 60.83 2 14.28.75 28.76-1.62 42.9-1.91 11-5.67 21.51-7.78 32.43a165 165 0 0 0 39.34-81.07 183.64 183.64 0 0 0-14.21-104.64c20.78 32 32.34 69.58 35.71 107.48.49 12.73.49 25.51 0 38.23A243.21 243.21 0 0 1 482 371.34c-26.12 47.34-68 85.63-117.19 108-78.29 36.23-174.68 31.32-248-14.68A248.34 248.34 0 0 1 25.36 366 238.34 238.34 0 0 1 0 273.08v-31.34C3.93 172 40.87 105.82 96 63.38m222 80.33a79.13 79.13 0 0 0 16-4.48c5-1.77 9.24-5.94 10.32-11.22-8.96 4.99-17.98 9.92-26.32 15.7z"]
};
var faPagelines = {
  prefix: 'fab',
  iconName: 'pagelines',
  icon: [384, 512, [], "f18c", "M384 312.7c-55.1 136.7-187.1 54-187.1 54-40.5 81.8-107.4 134.4-184.6 134.7-16.1 0-16.6-24.4 0-24.4 64.4-.3 120.5-42.7 157.2-110.1-41.1 15.9-118.6 27.9-161.6-82.2 109-44.9 159.1 11.2 178.3 45.5 9.9-24.4 17-50.9 21.6-79.7 0 0-139.7 21.9-149.5-98.1 119.1-47.9 152.6 76.7 152.6 76.7 1.6-16.7 3.3-52.6 3.3-53.4 0 0-106.3-73.7-38.1-165.2 124.6 43 61.4 162.4 61.4 162.4.5 1.6.5 23.8 0 33.4 0 0 45.2-89 136.4-57.5-4.2 134-141.9 106.4-141.9 106.4-4.4 27.4-11.2 53.4-20 77.5 0 0 83-91.8 172-20z"]
};
var faAlgolia = {
  prefix: 'fab',
  iconName: 'algolia',
  icon: [448, 512, [], "f36c", "M229.3 182.6c-49.3 0-89.2 39.9-89.2 89.2 0 49.3 39.9 89.2 89.2 89.2s89.2-39.9 89.2-89.2c0-49.3-40-89.2-89.2-89.2zm62.7 56.6l-58.9 30.6c-1.8.9-3.8-.4-3.8-2.3V201c0-1.5 1.3-2.7 2.7-2.6 26.2 1 48.9 15.7 61.1 37.1.7 1.3.2 3-1.1 3.7zM389.1 32H58.9C26.4 32 0 58.4 0 90.9V421c0 32.6 26.4 59 58.9 59H389c32.6 0 58.9-26.4 58.9-58.9V90.9C448 58.4 421.6 32 389.1 32zm-202.6 84.7c0-10.8 8.7-19.5 19.5-19.5h45.3c10.8 0 19.5 8.7 19.5 19.5v15.4c0 1.8-1.7 3-3.3 2.5-12.3-3.4-25.1-5.1-38.1-5.1-13.5 0-26.7 1.8-39.4 5.5-1.7.5-3.4-.8-3.4-2.5v-15.8zm-84.4 37l9.2-9.2c7.6-7.6 19.9-7.6 27.5 0l7.7 7.7c1.1 1.1 1 3-.3 4-6.2 4.5-12.1 9.4-17.6 14.9-5.4 5.4-10.4 11.3-14.8 17.4-1 1.3-2.9 1.5-4 .3l-7.7-7.7c-7.6-7.5-7.6-19.8 0-27.4zm127.2 244.8c-70 0-126.6-56.7-126.6-126.6s56.7-126.6 126.6-126.6c70 0 126.6 56.6 126.6 126.6 0 69.8-56.7 126.6-126.6 126.6z"]
};
var faRedRiver = {
  prefix: 'fab',
  iconName: 'red-river',
  icon: [448, 512, [], "f3e3", "M353.2 32H94.8C42.4 32 0 74.4 0 126.8v258.4C0 437.6 42.4 480 94.8 480h258.4c52.4 0 94.8-42.4 94.8-94.8V126.8c0-52.4-42.4-94.8-94.8-94.8zM144.9 200.9v56.3c0 27-21.9 48.9-48.9 48.9V151.9c0-13.2 10.7-23.9 23.9-23.9h154.2c0 27-21.9 48.9-48.9 48.9h-56.3c-12.3-.6-24.6 11.6-24 24zm176.3 72h-56.3c-12.3-.6-24.6 11.6-24 24v56.3c0 27-21.9 48.9-48.9 48.9V247.9c0-13.2 10.7-23.9 23.9-23.9h154.2c0 27-21.9 48.9-48.9 48.9z"]
};
var faCreativeCommonsSa = {
  prefix: 'fab',
  iconName: 'creative-commons-sa',
  icon: [496, 512, [], "f4ef", "M247.6 8C389.4 8 496 118.1 496 256c0 147.1-118.5 248-248.4 248C113.6 504 0 394.5 0 256 0 123.1 104.7 8 247.6 8zm.8 44.7C130.2 52.7 44.7 150.6 44.7 256c0 109.8 91.2 202.8 203.7 202.8 103.2 0 202.8-81.1 202.8-202.8.1-113.8-90.2-203.3-202.8-203.3zM137.7 221c13-83.9 80.5-95.7 108.9-95.7 99.8 0 127.5 82.5 127.5 134.2 0 63.6-41 132.9-128.9 132.9-38.9 0-99.1-20-109.4-97h62.5c1.5 30.1 19.6 45.2 54.5 45.2 23.3 0 58-18.2 58-82.8 0-82.5-49.1-80.6-56.7-80.6-33.1 0-51.7 14.6-55.8 43.8h18.2l-49.2 49.2-49-49.2h19.4z"]
};
var faSafari = {
  prefix: 'fab',
  iconName: 'safari',
  icon: [512, 512, [], "f267", "M274.69,274.69l-37.38-37.38L166,346ZM256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8ZM411.85,182.79l14.78-6.13A8,8,0,0,1,437.08,181h0a8,8,0,0,1-4.33,10.46L418,197.57a8,8,0,0,1-10.45-4.33h0A8,8,0,0,1,411.85,182.79ZM314.43,94l6.12-14.78A8,8,0,0,1,331,74.92h0a8,8,0,0,1,4.33,10.45l-6.13,14.78a8,8,0,0,1-10.45,4.33h0A8,8,0,0,1,314.43,94ZM256,60h0a8,8,0,0,1,8,8V84a8,8,0,0,1-8,8h0a8,8,0,0,1-8-8V68A8,8,0,0,1,256,60ZM181,74.92a8,8,0,0,1,10.46,4.33L197.57,94a8,8,0,1,1-14.78,6.12l-6.13-14.78A8,8,0,0,1,181,74.92Zm-63.58,42.49h0a8,8,0,0,1,11.31,0L140,128.72A8,8,0,0,1,140,140h0a8,8,0,0,1-11.31,0l-11.31-11.31A8,8,0,0,1,117.41,117.41ZM60,256h0a8,8,0,0,1,8-8H84a8,8,0,0,1,8,8h0a8,8,0,0,1-8,8H68A8,8,0,0,1,60,256Zm40.15,73.21-14.78,6.13A8,8,0,0,1,74.92,331h0a8,8,0,0,1,4.33-10.46L94,314.43a8,8,0,0,1,10.45,4.33h0A8,8,0,0,1,100.15,329.21Zm4.33-136h0A8,8,0,0,1,94,197.57l-14.78-6.12A8,8,0,0,1,74.92,181h0a8,8,0,0,1,10.45-4.33l14.78,6.13A8,8,0,0,1,104.48,193.24ZM197.57,418l-6.12,14.78a8,8,0,0,1-14.79-6.12l6.13-14.78A8,8,0,1,1,197.57,418ZM264,444a8,8,0,0,1-8,8h0a8,8,0,0,1-8-8V428a8,8,0,0,1,8-8h0a8,8,0,0,1,8,8Zm67-6.92h0a8,8,0,0,1-10.46-4.33L314.43,418a8,8,0,0,1,4.33-10.45h0a8,8,0,0,1,10.45,4.33l6.13,14.78A8,8,0,0,1,331,437.08Zm63.58-42.49h0a8,8,0,0,1-11.31,0L372,383.28A8,8,0,0,1,372,372h0a8,8,0,0,1,11.31,0l11.31,11.31A8,8,0,0,1,394.59,394.59ZM286.25,286.25,110.34,401.66,225.75,225.75,401.66,110.34ZM437.08,331h0a8,8,0,0,1-10.45,4.33l-14.78-6.13a8,8,0,0,1-4.33-10.45h0A8,8,0,0,1,418,314.43l14.78,6.12A8,8,0,0,1,437.08,331ZM444,264H428a8,8,0,0,1-8-8h0a8,8,0,0,1,8-8h16a8,8,0,0,1,8,8h0A8,8,0,0,1,444,264Z"]
};
var faGoogle = {
  prefix: 'fab',
  iconName: 'google',
  icon: [488, 512, [], "f1a0", "M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"]
};
var faSquareFontAwesomeStroke = {
  prefix: 'fab',
  iconName: 'square-font-awesome-stroke',
  icon: [448, 512, ["font-awesome-alt"], "f35c", "M201.6,152c-25.4,0-37.4,10.4-57.6,14.4V160c0-8.8-7.2-16-16-16s-16,7.2-16,16v192c0,0.8,0.1,1.6,0.2,2.4 c0.1,0.4,0.1,0.8,0.2,1.2c1.6,7.1,8,12.4,15.6,12.4s14-5.3,15.6-12.4c0.1-0.4,0.2-0.8,0.2-1.2c0.1-0.8,0.2-1.6,0.2-2.4V198.4 c4-0.8,7.7-1.8,11.2-3c14.3-4.7,26-11.4,46.4-11.4c31.4,0,43.2,16,74.6,16c8.9,0,15.9-1.1,24.2-3.5c1.2-0.3,2.4-0.7,3.6-1.1v96 c-10,3.2-17.6,4.6-27.8,4.6c-31.4,0-43.4-16-74.6-16c-10.2,0-18.2,1.8-25.6,4v32c7.4-2.4,15.4-4,25.6-4c31.4,0,43.2,16,74.6,16 c18.6,0,28.2-4.8,59.8-16V152c-31.6,11.2-41.2,16-59.8,16C244.8,168,232.8,152,201.6,152z M384,32H64C28.7,32,0,60.7,0,96v320 c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V96C448,60.7,419.3,32,384,32z M416,416c0,17.6-14.4,32-32,32H64 c-17.6,0-32-14.4-32-32V96c0-17.6,14.4-32,32-32h320c17.6,0,32,14.4,32,32V416z"]
};
var faFontAwesomeAlt = faSquareFontAwesomeStroke;
var faAtlassian = {
  prefix: 'fab',
  iconName: 'atlassian',
  icon: [512, 512, [], "f77b", "M152.2 236.4c-7.7-8.2-19.7-7.7-24.8 2.8L1.6 490.2c-5 10 2.4 21.7 13.4 21.7h175c5.8.1 11-3.2 13.4-8.4 37.9-77.8 15.1-196.3-51.2-267.1zM244.4 8.1c-122.3 193.4-8.5 348.6 65 495.5 2.5 5.1 7.7 8.4 13.4 8.4H497c11.2 0 18.4-11.8 13.4-21.7 0 0-234.5-470.6-240.4-482.3-5.3-10.6-18.8-10.8-25.6.1z"]
};
var faLinkedinIn = {
  prefix: 'fab',
  iconName: 'linkedin-in',
  icon: [448, 512, [], "f0e1", "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"]
};
var faDigitalOcean = {
  prefix: 'fab',
  iconName: 'digital-ocean',
  icon: [512, 512, [], "f391", "M87 481.8h73.7v-73.6H87zM25.4 346.6v61.6H87v-61.6zm466.2-169.7c-23-74.2-82.4-133.3-156.6-156.6C164.9-32.8 8 93.7 8 255.9h95.8c0-101.8 101-180.5 208.1-141.7 39.7 14.3 71.5 46.1 85.8 85.7 39.1 107-39.7 207.8-141.4 208v.3h-.3V504c162.6 0 288.8-156.8 235.6-327.1zm-235.3 231v-95.3h-95.6v95.6H256v-.3z"]
};
var faNimblr = {
  prefix: 'fab',
  iconName: 'nimblr',
  icon: [384, 512, [], "f5a8", "M246.6 299.29c15.57 0 27.15 11.46 27.15 27s-11.62 27-27.15 27c-15.7 0-27.15-11.57-27.15-27s11.55-27 27.15-27zM113 326.25c0-15.61 11.68-27 27.15-27s27.15 11.46 27.15 27-11.47 27-27.15 27c-15.44 0-27.15-11.31-27.15-27M191.76 159C157 159 89.45 178.77 59.25 227L14 0v335.48C14 433.13 93.61 512 191.76 512s177.76-78.95 177.76-176.52S290.13 159 191.76 159zm0 308.12c-73.27 0-132.51-58.9-132.51-131.59s59.24-131.59 132.51-131.59 132.51 58.86 132.51 131.54S265 467.07 191.76 467.07z"]
};
var faChromecast = {
  prefix: 'fab',
  iconName: 'chromecast',
  icon: [512, 512, [], "f838", "M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"]
};
var faEvernote = {
  prefix: 'fab',
  iconName: 'evernote',
  icon: [384, 512, [], "f839", "M120.82 132.21c1.6 22.31-17.55 21.59-21.61 21.59-68.93 0-73.64-1-83.58 3.34-.56.22-.74 0-.37-.37L123.79 46.45c.38-.37.6-.22.38.37-4.35 9.99-3.35 15.09-3.35 85.39zm79 308c-14.68-37.08 13-76.93 52.52-76.62 17.49 0 22.6 23.21 7.95 31.42-6.19 3.3-24.95 1.74-25.14 19.2-.05 17.09 19.67 25 31.2 24.89A45.64 45.64 0 0 0 312 393.45v-.08c0-11.63-7.79-47.22-47.54-55.34-7.72-1.54-65-6.35-68.35-50.52-3.74 16.93-17.4 63.49-43.11 69.09-8.74 1.94-69.68 7.64-112.92-36.77 0 0-18.57-15.23-28.23-57.95-3.38-15.75-9.28-39.7-11.14-62 0-18 11.14-30.45 25.07-32.2 81 0 90 2.32 101-7.8 9.82-9.24 7.8-15.5 7.8-102.78 1-8.3 7.79-30.81 53.41-24.14 6 .86 31.91 4.18 37.48 30.64l64.26 11.15c20.43 3.71 70.94 7 80.6 57.94 22.66 121.09 8.91 238.46 7.8 238.46C362.15 485.53 267.06 480 267.06 480c-18.95-.23-54.25-9.4-67.27-39.83zm80.94-204.84c-1 1.92-2.2 6 .85 7 14.09 4.93 39.75 6.84 45.88 5.53 3.11-.25 3.05-4.43 2.48-6.65-3.53-21.85-40.83-26.5-49.24-5.92z"]
};
var faHackerNews = {
  prefix: 'fab',
  iconName: 'hacker-news',
  icon: [448, 512, [], "f1d4", "M0 32v448h448V32H0zm21.2 197.2H21c.1-.1.2-.3.3-.4 0 .1 0 .3-.1.4zm218 53.9V384h-31.4V281.3L128 128h37.3c52.5 98.3 49.2 101.2 59.3 125.6 12.3-27 5.8-24.4 60.6-125.6H320l-80.8 155.1z"]
};
var faCreativeCommonsSampling = {
  prefix: 'fab',
  iconName: 'creative-commons-sampling',
  icon: [496, 512, [], "f4f0", "M247.6 8C389.4 8 496 118.1 496 256c0 147.1-118.5 248-248.4 248C113.6 504 0 394.5 0 256 0 123.1 104.7 8 247.6 8zm.8 44.7C130.2 52.7 44.7 150.6 44.7 256c0 109.8 91.2 202.8 203.7 202.8 103.2 0 202.8-81.1 202.8-202.8.1-113.8-90.2-203.3-202.8-203.3zm3.6 53.2c2.8-.3 11.5 1 11.5 11.5l6.6 107.2 4.9-59.3c0-6 4.7-10.6 10.6-10.6 5.9 0 10.6 4.7 10.6 10.6 0 2.5-.5-5.7 5.7 81.5l5.8-64.2c.3-2.9 2.9-9.3 10.2-9.3 3.8 0 9.9 2.3 10.6 8.9l11.5 96.5 5.3-12.8c1.8-4.4 5.2-6.6 10.2-6.6h58v21.3h-50.9l-18.2 44.3c-3.9 9.9-19.5 9.1-20.8-3.1l-4-31.9-7.5 92.6c-.3 3-3 9.3-10.2 9.3-3 0-9.8-2.1-10.6-9.3 0-1.9.6 5.8-6.2-77.9l-5.3 72.2c-1.1 4.8-4.8 9.3-10.6 9.3-2.9 0-9.8-2-10.6-9.3 0-1.9.5 6.7-5.8-87.7l-5.8 94.8c0 6.3-3.6 12.4-10.6 12.4-5.2 0-10.6-4.1-10.6-12l-5.8-87.7c-5.8 92.5-5.3 84-5.3 85.9-1.1 4.8-4.8 9.3-10.6 9.3-3 0-9.8-2.1-10.6-9.3 0-.7-.4-1.1-.4-2.6l-6.2-88.6L182 348c-.7 6.5-6.7 9.3-10.6 9.3-5.8 0-9.6-4.1-10.6-8.9L149.7 272c-2 4-3.5 8.4-11.1 8.4H87.2v-21.3H132l13.7-27.9c4.4-9.9 18.2-7.2 19.9 2.7l3.1 20.4 8.4-97.9c0-6 4.8-10.6 10.6-10.6.5 0 10.6-.2 10.6 12.4l4.9 69.1 6.6-92.6c0-10.1 9.5-10.6 10.2-10.6.6 0 10.6.7 10.6 10.6l5.3 80.6 6.2-97.9c.1-1.1-.6-10.3 9.9-11.5z"]
};
var faAdversal = {
  prefix: 'fab',
  iconName: 'adversal',
  icon: [512, 512, [], "f36a", "M482.1 32H28.7C5.8 32 0 37.9 0 60.9v390.2C0 474.4 5.8 480 28.7 480h453.4c24.4 0 29.9-5.2 29.9-29.7V62.2c0-24.6-5.4-30.2-29.9-30.2zM178.4 220.3c-27.5-20.2-72.1-8.7-84.2 23.4-4.3 11.1-9.3 9.5-17.5 8.3-9.7-1.5-17.2-3.2-22.5-5.5-28.8-11.4 8.6-55.3 24.9-64.3 41.1-21.4 83.4-22.2 125.3-4.8 40.9 16.8 34.5 59.2 34.5 128.5 2.7 25.8-4.3 58.3 9.3 88.8 1.9 4.4.4 7.9-2.7 10.7-8.4 6.7-39.3 2.2-46.6-7.4-1.9-2.2-1.8-3.6-3.9-6.2-3.6-3.9-7.3-2.2-11.9 1-57.4 36.4-140.3 21.4-147-43.3-3.1-29.3 12.4-57.1 39.6-71 38.2-19.5 112.2-11.8 114-30.9 1.1-10.2-1.9-20.1-11.3-27.3zm286.7 222c0 15.1-11.1 9.9-17.8 9.9H52.4c-7.4 0-18.2 4.8-17.8-10.7.4-13.9 10.5-9.1 17.1-9.1 132.3-.4 264.5-.4 396.8 0 6.8 0 16.6-4.4 16.6 9.9zm3.8-340.5v291c0 5.7-.7 13.9-8.1 13.9-12.4-.4-27.5 7.1-36.1-5.6-5.8-8.7-7.8-4-12.4-1.2-53.4 29.7-128.1 7.1-144.4-85.2-6.1-33.4-.7-67.1 15.7-100 11.8-23.9 56.9-76.1 136.1-30.5v-71c0-26.2-.1-26.2 26-26.2 3.1 0 6.6.4 9.7 0 10.1-.8 13.6 4.4 13.6 14.3-.1.2-.1.3-.1.5zm-51.5 232.3c-19.5 47.6-72.9 43.3-90 5.2-15.1-33.3-15.5-68.2.4-101.5 16.3-34.1 59.7-35.7 81.5-4.8 20.6 28.8 14.9 84.6 8.1 101.1zm-294.8 35.3c-7.5-1.3-33-3.3-33.7-27.8-.4-13.9 7.8-23 19.8-25.8 24.4-5.9 49.3-9.9 73.7-14.7 8.9-2 7.4 4.4 7.8 9.5 1.4 33-26.1 59.2-67.6 58.8z"]
};
var faCreativeCommons = {
  prefix: 'fab',
  iconName: 'creative-commons',
  icon: [496, 512, [], "f25e", "M245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93-22.13 0-33.22 14.61-33.22 43.84 0 23.57 9.21 43.84 33.22 43.84 14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98-22.6 0-73.96-10.32-73.96-77.05 0-58.69 43-77.06 72.63-77.06 30.72-.01 52.7 11.95 65.99 35.86zm143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93-22.14 0-33.22 14.61-33.22 43.84 0 23.55 9.23 43.84 33.22 43.84 14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98-22.69 0-73.96-9.87-73.96-77.05 0-58.67 42.97-77.06 72.63-77.06 30.71-.01 52.58 11.95 65.56 35.86zM247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248 129.93 0 248.44-100.87 248.44-248 0-137.87-106.62-248-248.44-248zm.87 450.81c-112.54 0-203.7-93.04-203.7-202.81 0-105.42 85.43-203.27 203.72-203.27 112.53 0 202.82 89.46 202.82 203.26-.01 121.69-99.68 202.82-202.84 202.82z"]
};
var faWatchmanMonitoring = {
  prefix: 'fab',
  iconName: 'watchman-monitoring',
  icon: [512, 512, [], "e087", "M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM121.69,429.122C70.056,388.972,36.741,326.322,36.741,256a218.519,218.519,0,0,1,9.587-64.122l102.9-17.895-.121,10.967-13.943,2.013s-.144,12.5-.144,19.549a12.778,12.778,0,0,0,4.887,10.349l9.468,7.4Zm105.692-283.27,8.48-7.618s6.934-5.38-.143-9.344c-7.188-4.024-39.53-34.5-39.53-34.5-5.348-5.477-8.257-7.347-15.46,0,0,0-32.342,30.474-39.529,34.5-7.078,3.964-.144,9.344-.144,9.344l8.481,7.618-.048,4.369L75.982,131.045c39.644-56.938,105.532-94.3,180.018-94.3A218.754,218.754,0,0,1,420.934,111.77l-193.512,37.7Zm34.063,329.269-33.9-250.857,9.467-7.4a12.778,12.778,0,0,0,4.888-10.349c0-7.044-.144-19.549-.144-19.549l-13.943-2.013-.116-10.474,241.711,31.391A218.872,218.872,0,0,1,475.259,256C475.259,375.074,379.831,472.212,261.445,475.121Z"]
};
var faFonticons = {
  prefix: 'fab',
  iconName: 'fonticons',
  icon: [448, 512, [], "f280", "M0 32v448h448V32zm187 140.9c-18.4 0-19 9.9-19 27.4v23.3c0 2.4-3.5 4.4-.6 4.4h67.4l-11.1 37.3H168v112.9c0 5.8-2 6.7 3.2 7.3l43.5 4.1v25.1H84V389l21.3-2c5.2-.6 6.7-2.3 6.7-7.9V267.7c0-2.3-2.9-2.3-5.8-2.3H84V228h28v-21c0-49.6 26.5-70 77.3-70 34.1 0 64.7 8.2 64.7 52.8l-50.7 6.1c.3-18.7-4.4-23-16.3-23zm74.3 241.8v-25.1l20.4-2.6c5.2-.6 7.6-1.7 7.6-7.3V271.8c0-4.1-2.9-6.7-6.7-7.9l-24.2-6.4 6.7-29.5h80.2v151.7c0 5.8-2.6 6.4 2.9 7.3l15.7 2.6v25.1zm80.8-255.5l9 33.2-7.3 7.3-31.2-16.6-31.2 16.6-7.3-7.3 9-33.2-21.8-24.2 3.5-9.6h27.7l15.5-28h9.3l15.5 28h27.7l3.5 9.6z"]
};
var faWeixin = {
  prefix: 'fab',
  iconName: 'weixin',
  icon: [576, 512, [], "f1d7", "M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"]
};
var faShirtsinbulk = {
  prefix: 'fab',
  iconName: 'shirtsinbulk',
  icon: [448, 512, [], "f214", "M100 410.3l30.6 13.4 4.4-9.9-30.6-13.4zm39.4 17.5l30.6 13.4 4.4-9.9-30.6-13.4zm172.1-14l4.4 9.9 30.6-13.4-4.4-9.9zM179.1 445l30.3 13.7 4.4-9.9-30.3-13.4zM60.4 392.8L91 406.2l4.4-9.6-30.6-13.7zm211.4 38.5l4.4 9.9 30.6-13.4-4.4-9.9zm-39.3 17.5l4.4 9.9 30.6-13.7-4.4-9.6zm118.4-52.2l4.4 9.6 30.6-13.4-4.4-9.9zM170 46.6h-33.5v10.5H170zm-47.2 0H89.2v10.5h33.5zm-47.3 0H42.3v10.5h33.3zm141.5 0h-33.2v10.5H217zm94.5 0H278v10.5h33.5zm47.3 0h-33.5v10.5h33.5zm-94.6 0H231v10.5h33.2zm141.5 0h-33.3v10.5h33.3zM52.8 351.1H42v33.5h10.8zm70-215.9H89.2v10.5h33.5zm-70 10.6h22.8v-10.5H42v33.5h10.8zm168.9 228.6c50.5 0 91.3-40.8 91.3-91.3 0-50.2-40.8-91.3-91.3-91.3-50.2 0-91.3 41.1-91.3 91.3 0 50.5 41.1 91.3 91.3 91.3zm-48.2-111.1c0-25.4 29.5-31.8 49.6-31.8 16.9 0 29.2 5.8 44.3 12l-8.8 16.9h-.9c-6.4-9.9-24.8-13.1-35.6-13.1-9 0-29.8 1.8-29.8 14.9 0 21.6 78.5-10.2 78.5 37.9 0 25.4-31.5 31.2-51 31.2-18.1 0-32.4-2.9-47.2-12.2l9-18.4h.9c6.1 12.2 23.6 14.9 35.9 14.9 8.7 0 32.7-1.2 32.7-14.3 0-26.1-77.6 6.3-77.6-38zM52.8 178.4H42V212h10.8zm342.4 206.2H406v-33.5h-10.8zM52.8 307.9H42v33.5h10.8zM0 3.7v406l221.7 98.6L448 409.7V3.7zm418.8 387.1L222 476.5 29.2 390.8V120.7h389.7v270.1zm0-299.3H29.2V32.9h389.7v58.6zm-366 130.1H42v33.5h10.8zm0 43.2H42v33.5h10.8zM170 135.2h-33.5v10.5H170zm225.2 163.1H406v-33.5h-10.8zm0-43.2H406v-33.5h-10.8zM217 135.2h-33.2v10.5H217zM395.2 212H406v-33.5h-10.8zm0 129.5H406V308h-10.8zm-131-206.3H231v10.5h33.2zm47.3 0H278v10.5h33.5zm83.7 33.6H406v-33.5h-33.5v10.5h22.8zm-36.4-33.6h-33.5v10.5h33.5z"]
};
var faCodepen = {
  prefix: 'fab',
  iconName: 'codepen',
  icon: [512, 512, [], "f1cb", "M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z"]
};
var faGitAlt = {
  prefix: 'fab',
  iconName: 'git-alt',
  icon: [448, 512, [], "f841", "M439.55 236.05L244 40.45a28.87 28.87 0 0 0-40.81 0l-40.66 40.63 51.52 51.52c27.06-9.14 52.68 16.77 43.39 43.68l49.66 49.66c34.23-11.8 61.18 31 35.47 56.69-26.49 26.49-70.21-2.87-56-37.34L240.22 199v121.85c25.3 12.54 22.26 41.85 9.08 55a34.34 34.34 0 0 1-48.55 0c-17.57-17.6-11.07-46.91 11.25-56v-123c-20.8-8.51-24.6-30.74-18.64-45L142.57 101 8.45 235.14a28.86 28.86 0 0 0 0 40.81l195.61 195.6a28.86 28.86 0 0 0 40.8 0l194.69-194.69a28.86 28.86 0 0 0 0-40.81z"]
};
var faLyft = {
  prefix: 'fab',
  iconName: 'lyft',
  icon: [512, 512, [], "f3c3", "M0 81.1h77.8v208.7c0 33.1 15 52.8 27.2 61-12.7 11.1-51.2 20.9-80.2-2.8C7.8 334 0 310.7 0 289V81.1zm485.9 173.5v-22h23.8v-76.8h-26.1c-10.1-46.3-51.2-80.7-100.3-80.7-56.6 0-102.7 46-102.7 102.7V357c16 2.3 35.4-.3 51.7-14 17.1-14 24.8-37.2 24.8-59v-6.7h38.8v-76.8h-38.8v-23.3c0-34.6 52.2-34.6 52.2 0v77.1c0 56.6 46 102.7 102.7 102.7v-76.5c-14.5 0-26.1-11.7-26.1-25.9zm-294.3-99v113c0 15.4-23.8 15.4-23.8 0v-113H91v132.7c0 23.8 8 54 45 63.9 37 9.8 58.2-10.6 58.2-10.6-2.1 13.4-14.5 23.3-34.9 25.3-15.5 1.6-35.2-3.6-45-7.8v70.3c25.1 7.5 51.5 9.8 77.6 4.7 47.1-9.1 76.8-48.4 76.8-100.8V155.1h-77.1v.5z"]
};
var faRev = {
  prefix: 'fab',
  iconName: 'rev',
  icon: [448, 512, [], "f5b2", "M289.67 274.89a65.57 65.57 0 1 1-65.56-65.56 65.64 65.64 0 0 1 65.56 65.56zm139.55-5.05h-.13a204.69 204.69 0 0 0-74.32-153l-45.38 26.2a157.07 157.07 0 0 1 71.81 131.84C381.2 361.5 310.73 432 224.11 432S67 361.5 67 274.88c0-81.88 63-149.27 143-156.43v39.12l108.77-62.79L210 32v38.32c-106.7 7.25-191 96-191 204.57 0 111.59 89.12 202.29 200.06 205v.11h210.16V269.84z"]
};
var faWindows = {
  prefix: 'fab',
  iconName: 'windows',
  icon: [448, 512, [], "f17a", "M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"]
};
var faWizardsOfTheCoast = {
  prefix: 'fab',
  iconName: 'wizards-of-the-coast',
  icon: [640, 512, [], "f730", "M219.19 345.69c-1.9 1.38-11.07 8.44-.26 23.57 4.64 6.42 14.11 12.79 21.73 6.55 6.5-4.88 7.35-12.92.26-23.04-5.47-7.76-14.28-12.88-21.73-7.08zm336.75 75.94c-.34 1.7-.55 1.67.79 0 2.09-4.19 4.19-10.21 4.98-19.9 3.14-38.49-40.33-71.49-101.34-78.03-54.73-6.02-124.38 9.17-188.8 60.49l-.26 1.57c2.62 4.98 4.98 10.74 3.4 21.21l.79.26c63.89-58.4 131.19-77.25 184.35-73.85 58.4 3.67 100.03 34.04 100.03 68.08-.01 9.96-2.63 15.72-3.94 20.17zM392.28 240.42c.79 7.07 4.19 10.21 9.17 10.47 5.5.26 9.43-2.62 10.47-6.55.79-3.4 2.09-29.85 2.09-29.85s-11.26 6.55-14.93 10.47c-3.66 3.68-7.33 8.39-6.8 15.46zm-50.02-151.1C137.75 89.32 13.1 226.8.79 241.2c-1.05.52-1.31.79.79 1.31 60.49 16.5 155.81 81.18 196.13 202.16l1.05.26c55.25-69.92 140.88-128.05 236.99-128.05 80.92 0 130.15 42.16 130.15 80.39 0 18.33-6.55 33.52-22.26 46.35 0 .96-.2.79.79.79 14.66-10.74 27.5-28.8 27.5-48.18 0-22.78-12.05-38.23-12.05-38.23 7.07 7.07 10.74 16.24 10.74 16.24 5.76-40.85 26.97-62.32 26.97-62.32-2.36-9.69-6.81-17.81-6.81-17.81 7.59 8.12 14.4 27.5 14.4 41.37 0 10.47-3.4 22.78-12.57 31.95l.26.52c8.12-4.98 16.5-16.76 16.5-37.97 0-15.71-4.71-25.92-4.71-25.92 5.76-5.24 11.26-9.17 15.97-11.78.79 3.4 2.09 9.69 2.36 14.93 0 1.05.79 1.83 1.05 0 .79-5.76-.26-16.24-.26-16.5 6.02-3.14 9.69-4.45 9.69-4.45C617.74 176 489.43 89.32 342.26 89.32zm-99.24 289.62c-11.06 8.99-24.2 4.08-30.64-4.19-7.45-9.58-6.76-24.09 4.19-32.47 14.85-11.35 27.08-.49 31.16 5.5.28.39 12.13 16.57-4.71 31.16zm2.09-136.43l9.43-17.81 11.78 70.96-12.57 6.02-24.62-28.8 14.14-26.71 3.67 4.45-1.83-8.11zm18.59 117.58l-.26-.26c2.05-4.1-2.5-6.61-17.54-31.69-1.31-2.36-3.14-2.88-4.45-2.62l-.26-.52c7.86-5.76 15.45-10.21 25.4-15.71l.52.26c1.31 1.83 2.09 2.88 3.4 4.71l-.26.52c-1.05-.26-2.36-.79-5.24.26-2.09.79-7.86 3.67-12.31 7.59v1.31c1.57 2.36 3.93 6.55 5.76 9.69h.26c10.05-6.28 7.56-4.55 11.52-7.86h.26c.52 1.83.52 1.83 1.83 5.5l-.26.26c-3.06.61-4.65.34-11.52 5.5v.26c9.46 17.02 11.01 16.75 12.57 15.97l.26.26c-2.34 1.59-6.27 4.21-9.68 6.57zm55.26-32.47c-3.14 1.57-6.02 2.88-9.95 4.98l-.26-.26c1.29-2.59 1.16-2.71-11.78-32.47l-.26-.26c-.15 0-8.9 3.65-9.95 7.33h-.52l-1.05-5.76.26-.52c7.29-4.56 25.53-11.64 27.76-12.57l.52.26 3.14 4.98-.26.52c-3.53-1.76-7.35.76-12.31 2.62v.26c12.31 32.01 12.67 30.64 14.66 30.64v.25zm44.77-16.5c-4.19 1.05-5.24 1.31-9.69 2.88l-.26-.26.52-4.45c-1.05-3.4-3.14-11.52-3.67-13.62l-.26-.26c-3.4.79-8.9 2.62-12.83 3.93l-.26.26c.79 2.62 3.14 9.95 4.19 13.88.79 2.36 1.83 2.88 2.88 3.14v.52c-3.67 1.05-7.07 2.62-10.21 3.93l-.26-.26c1.05-1.31 1.05-2.88.26-4.98-1.05-3.14-8.12-23.83-9.17-27.23-.52-1.83-1.57-3.14-2.62-3.14v-.52c3.14-1.05 6.02-2.09 10.74-3.4l.26.26-.26 4.71c1.31 3.93 2.36 7.59 3.14 9.69h.26c3.93-1.31 9.43-2.88 12.83-3.93l.26-.26-2.62-9.43c-.52-1.83-1.05-3.4-2.62-3.93v-.26c4.45-1.05 7.33-1.83 10.74-2.36l.26.26c-1.05 1.31-1.05 2.88-.52 4.45 1.57 6.28 4.71 20.43 6.28 26.45.54 2.62 1.85 3.41 2.63 3.93zm32.21-6.81l-.26.26c-4.71.52-14.14 2.36-22.52 4.19l-.26-.26.79-4.19c-1.57-7.86-3.4-18.59-4.98-26.19-.26-1.83-.79-2.88-2.62-3.67l.79-.52c9.17-1.57 20.16-2.36 24.88-2.62l.26.26c.52 2.36.79 3.14 1.57 5.5l-.26.26c-1.14-1.14-3.34-3.2-16.24-.79l-.26.26c.26 1.57 1.05 6.55 1.57 9.95l.26.26c9.52-1.68 4.76-.06 10.74-2.36h.26c0 1.57-.26 1.83-.26 5.24h-.26c-4.81-1.03-2.15-.9-10.21 0l-.26.26c.26 2.09 1.57 9.43 2.09 12.57l.26.26c1.15.38 14.21-.65 16.24-4.71h.26c-.53 2.38-1.05 4.21-1.58 6.04zm10.74-44.51c-4.45 2.36-8.12 2.88-11 2.88-.25.02-11.41 1.09-17.54-9.95-6.74-10.79-.98-25.2 5.5-31.69 8.8-8.12 23.35-10.1 28.54-17.02 8.03-10.33-13.04-22.31-29.59-5.76l-2.62-2.88 5.24-16.24c25.59-1.57 45.2-3.04 50.02 16.24.79 3.14 0 9.43-.26 12.05 0 2.62-1.83 18.85-2.09 23.04-.52 4.19-.79 18.33-.79 20.69.26 2.36.52 4.19 1.57 5.5 1.57 1.83 5.76 1.83 5.76 1.83l-.79 4.71c-11.82-1.07-10.28-.59-20.43-1.05-3.22-5.15-2.23-3.28-4.19-7.86 0 .01-4.19 3.94-7.33 5.51zm37.18 21.21c-6.35-10.58-19.82-7.16-21.73 5.5-2.63 17.08 14.3 19.79 20.69 10.21l.26.26c-.52 1.83-1.83 6.02-1.83 6.28l-.52.52c-10.3 6.87-28.5-2.5-25.66-18.59 1.94-10.87 14.44-18.93 28.8-9.95l.26.52c0 1.06-.27 3.41-.27 5.25zm5.77-87.73v-6.55c.69 0 19.65 3.28 27.76 7.33l-1.57 17.54s10.21-9.43 15.45-10.74c5.24-1.57 14.93 7.33 14.93 7.33l-11.26 11.26c-12.07-6.35-19.59-.08-20.69.79-5.29 38.72-8.6 42.17 4.45 46.09l-.52 4.71c-17.55-4.29-18.53-4.5-36.92-7.33l.79-4.71c7.25 0 7.48-5.32 7.59-6.81 0 0 4.98-53.16 4.98-55.25-.02-2.87-4.99-3.66-4.99-3.66zm10.99 114.44c-8.12-2.09-14.14-11-10.74-20.69 3.14-9.43 12.31-12.31 18.85-10.21 9.17 2.62 12.83 11.78 10.74 19.38-2.61 8.9-9.42 13.87-18.85 11.52zm42.16 9.69c-2.36-.52-7.07-2.36-8.64-2.88v-.26l1.57-1.83c.59-8.24.59-7.27.26-7.59-4.82-1.81-6.66-2.36-7.07-2.36-1.31 1.83-2.88 4.45-3.67 5.5l-.79 3.4v.26c-1.31-.26-3.93-1.31-6.02-1.57v-.26l2.62-1.83c3.4-4.71 9.95-14.14 13.88-20.16v-2.09l.52-.26c2.09.79 5.5 2.09 7.59 2.88.48.48.18-1.87-1.05 25.14-.24 1.81.02 2.6.8 3.91zm-4.71-89.82c11.25-18.27 30.76-16.19 34.04-3.4L539.7 198c2.34-6.25-2.82-9.9-4.45-11.26l1.83-3.67c12.22 10.37 16.38 13.97 22.52 20.43-25.91 73.07-30.76 80.81-24.62 84.32l-1.83 4.45c-6.37-3.35-8.9-4.42-17.81-8.64l2.09-6.81c-.26-.26-3.93 3.93-9.69 3.67-19.06-1.3-22.89-31.75-9.67-52.9zm29.33 79.34c0-5.71-6.34-7.89-7.86-5.24-1.31 2.09 1.05 4.98 2.88 8.38 1.57 2.62 2.62 6.28 1.05 9.43-2.64 6.34-12.4 5.31-15.45-.79 0-.7-.27.09 1.83-4.71l.79-.26c-.57 5.66 6.06 9.61 8.38 4.98 1.05-2.09-.52-5.5-2.09-8.38-1.57-2.62-3.67-6.28-1.83-9.69 2.72-5.06 11.25-4.47 14.66 2.36v.52l-2.36 3.4zm21.21 13.36c-1.96-3.27-.91-2.14-4.45-4.71h-.26c-2.36 4.19-5.76 10.47-8.64 16.24-1.31 2.36-1.05 3.4-.79 3.93l-.26.26-5.76-4.45.26-.26 2.09-1.31c3.14-5.76 6.55-12.05 9.17-17.02v-.26c-2.64-1.98-1.22-1.51-6.02-1.83v-.26l3.14-3.4h.26c3.67 2.36 9.95 6.81 12.31 8.9l.26.26-1.31 3.91zm27.23-44.26l-2.88-2.88c.79-2.36 1.83-4.98 2.09-7.59.75-9.74-11.52-11.84-11.52-4.98 0 4.98 7.86 19.38 7.86 27.76 0 10.21-5.76 15.71-13.88 16.5-8.38.79-20.16-10.47-20.16-10.47l4.98-14.4 2.88 2.09c-2.97 17.8 17.68 20.37 13.35 5.24-1.06-4.02-18.75-34.2 2.09-38.23 13.62-2.36 23.04 16.5 23.04 16.5l-7.85 10.46zm35.62-10.21c-11-30.38-60.49-127.53-191.95-129.62-53.42-1.05-94.27 15.45-132.76 37.97l85.63-9.17-91.39 20.69 25.14 19.64-3.93-16.5c7.5-1.71 39.15-8.45 66.77-8.9l-22.26 80.39c13.61-.7 18.97-8.98 19.64-22.78l4.98-1.05.26 26.71c-22.46 3.21-37.3 6.69-49.49 9.95l13.09-43.21-61.54-36.66 2.36 8.12 10.21 4.98c6.28 18.59 19.38 56.56 20.43 58.66 1.95 4.28 3.16 5.78 12.05 4.45l1.05 4.98c-16.08 4.86-23.66 7.61-39.02 14.4l-2.36-4.71c4.4-2.94 8.73-3.94 5.5-12.83-23.7-62.5-21.48-58.14-22.78-59.44l2.36-4.45 33.52 67.3c-3.84-11.87 1.68 1.69-32.99-78.82l-41.9 88.51 4.71-13.88-35.88-42.16 27.76 93.48-11.78 8.38C95 228.58 101.05 231.87 93.23 231.52c-5.5-.26-13.62 5.5-13.62 5.5L74.63 231c30.56-23.53 31.62-24.33 58.4-42.68l4.19 7.07s-5.76 4.19-7.86 7.07c-5.9 9.28 1.67 13.28 61.8 75.68l-18.85-58.92 39.8-10.21 25.66 30.64 4.45-12.31-4.98-24.62 13.09-3.4.52 3.14 3.67-10.47-94.27 29.33 11.26-4.98-13.62-42.42 17.28-9.17 30.11 36.14 28.54-13.09c-1.41-7.47-2.47-14.5-4.71-19.64l17.28 13.88 4.71-2.09-59.18-42.68 23.08 11.5c18.98-6.07 25.23-7.47 32.21-9.69l2.62 11c-12.55 12.55 1.43 16.82 6.55 19.38l-13.62-61.01 12.05 28.28c4.19-1.31 7.33-2.09 7.33-2.09l2.62 8.64s-3.14 1.05-6.28 2.09l8.9 20.95 33.78-65.73-20.69 61.01c42.42-24.09 81.44-36.66 131.98-35.88 67.04 1.05 167.33 40.85 199.8 139.83.78 2.1-.01 2.63-.79.27zM203.48 152.43s1.83-.52 4.19-1.31l9.43 7.59c-.4 0-3.44-.25-11.26 2.36l-2.36-8.64zm143.76 38.5c-1.57-.6-26.46-4.81-33.26 20.69l21.73 17.02 11.53-37.71zM318.43 67.07c-58.4 0-106.05 12.05-114.96 14.4v.79c8.38 2.09 14.4 4.19 21.21 11.78l1.57.26c6.55-1.83 48.97-13.88 110.24-13.88 180.16 0 301.67 116.79 301.67 223.37v9.95c0 1.31.79 2.62 1.05.52.52-2.09.79-8.64.79-19.64.26-83.79-96.63-227.55-321.57-227.55zm211.06 169.68c1.31-5.76 0-12.31-7.33-13.09-9.62-1.13-16.14 23.79-17.02 33.52-.79 5.5-1.31 14.93 6.02 14.93 4.68-.01 9.72-.91 18.33-35.36zm-61.53 42.95c-2.62-.79-9.43-.79-12.57 10.47-1.83 6.81.52 13.35 6.02 14.66 3.67 1.05 8.9.52 11.78-10.74 2.62-9.94-1.83-13.61-5.23-14.39zM491 300.65c1.83.52 3.14 1.05 5.76 1.83 0-1.83.52-8.38.79-12.05-1.05 1.31-5.5 8.12-6.55 9.95v.27z"]
};
var faSquareViadeo = {
  prefix: 'fab',
  iconName: 'square-viadeo',
  icon: [448, 512, ["viadeo-square"], "f2aa", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM280.7 381.2c-42.4 46.2-120 46.6-162.4 0-68-73.6-19.8-196.1 81.2-196.1 13.3 0 26.6 2.1 39.1 6.7-4.3 8.4-7.3 17.6-8.4 27.1-9.7-4.1-20.2-6-30.7-6-48.8 0-84.6 41.7-84.6 88.9 0 43 28.5 78.7 69.5 85.9 61.5-24 72.9-117.6 72.9-175 0-7.3 0-14.8-.6-22.1-11.2-32.9-26.6-64.6-44.2-94.5 27.1 18.3 41.9 62.5 44.2 94.1v.4c7.7 22.5 11.8 46.2 11.8 70 0 54.1-21.9 99-68.3 128.2l-2.4.2c50 1 86.2-38.6 86.2-87.2 0-12.2-2.1-24.3-6.9-35.7 9.5-1.9 18.5-5.6 26.4-10.5 15.3 36.6 12.6 87.3-22.8 125.6zM309 233.7c-13.3 0-25.1-7.1-34.4-16.1 21.9-12 49.6-30.7 62.3-53 1.5-3 4.1-8.6 4.5-12-12.5 27.9-44.2 49.8-73.9 56.7-4.7-7.3-7.5-15.5-7.5-24.3 0-10.3 5.2-24.1 12.9-31.6 21.6-20.5 53-8.5 72.4-50 32.5 46.2 13.1 130.3-36.3 130.3z"]
};
var faViadeoSquare = faSquareViadeo;
var faMeetup = {
  prefix: 'fab',
  iconName: 'meetup',
  icon: [512, 512, [], "f2e0", "M99 414.3c1.1 5.7-2.3 11.1-8 12.3-5.4 1.1-10.9-2.3-12-8-1.1-5.4 2.3-11.1 7.7-12.3 5.4-1.2 11.1 2.3 12.3 8zm143.1 71.4c-6.3 4.6-8 13.4-3.7 20 4.6 6.6 13.4 8.3 20 3.7 6.3-4.6 8-13.4 3.4-20-4.2-6.5-13.1-8.3-19.7-3.7zm-86-462.3c6.3-1.4 10.3-7.7 8.9-14-1.1-6.6-7.4-10.6-13.7-9.1-6.3 1.4-10.3 7.7-9.1 14 1.4 6.6 7.6 10.6 13.9 9.1zM34.4 226.3c-10-6.9-23.7-4.3-30.6 6-6.9 10-4.3 24 5.7 30.9 10 7.1 23.7 4.6 30.6-5.7 6.9-10.4 4.3-24.1-5.7-31.2zm272-170.9c10.6-6.3 13.7-20 7.7-30.3-6.3-10.6-19.7-14-30-7.7s-13.7 20-7.4 30.6c6 10.3 19.4 13.7 29.7 7.4zm-191.1 58c7.7-5.4 9.4-16 4.3-23.7s-15.7-9.4-23.1-4.3c-7.7 5.4-9.4 16-4.3 23.7 5.1 7.8 15.6 9.5 23.1 4.3zm372.3 156c-7.4 1.7-12.3 9.1-10.6 16.9 1.4 7.4 8.9 12.3 16.3 10.6 7.4-1.4 12.3-8.9 10.6-16.6-1.5-7.4-8.9-12.3-16.3-10.9zm39.7-56.8c-1.1-5.7-6.6-9.1-12-8-5.7 1.1-9.1 6.9-8 12.6 1.1 5.4 6.6 9.1 12.3 8 5.4-1.5 9.1-6.9 7.7-12.6zM447 138.9c-8.6 6-10.6 17.7-4.9 26.3 5.7 8.6 17.4 10.6 26 4.9 8.3-6 10.3-17.7 4.6-26.3-5.7-8.7-17.4-10.9-25.7-4.9zm-6.3 139.4c26.3 43.1 15.1 100-26.3 129.1-17.4 12.3-37.1 17.7-56.9 17.1-12 47.1-69.4 64.6-105.1 32.6-1.1.9-2.6 1.7-3.7 2.9-39.1 27.1-92.3 17.4-119.4-22.3-9.7-14.3-14.6-30.6-15.1-46.9-65.4-10.9-90-94-41.1-139.7-28.3-46.9.6-107.4 53.4-114.9C151.6 70 234.1 38.6 290.1 82c67.4-22.3 136.3 29.4 130.9 101.1 41.1 12.6 52.8 66.9 19.7 95.2zm-70 74.3c-3.1-20.6-40.9-4.6-43.1-27.1-3.1-32 43.7-101.1 40-128-3.4-24-19.4-29.1-33.4-29.4-13.4-.3-16.9 2-21.4 4.6-2.9 1.7-6.6 4.9-11.7-.3-6.3-6-11.1-11.7-19.4-12.9-12.3-2-17.7 2-26.6 9.7-3.4 2.9-12 12.9-20 9.1-3.4-1.7-15.4-7.7-24-11.4-16.3-7.1-40 4.6-48.6 20-12.9 22.9-38 113.1-41.7 125.1-8.6 26.6 10.9 48.6 36.9 47.1 11.1-.6 18.3-4.6 25.4-17.4 4-7.4 41.7-107.7 44.6-112.6 2-3.4 8.9-8 14.6-5.1 5.7 3.1 6.9 9.4 6 15.1-1.1 9.7-28 70.9-28.9 77.7-3.4 22.9 26.9 26.6 38.6 4 3.7-7.1 45.7-92.6 49.4-98.3 4.3-6.3 7.4-8.3 11.7-8 3.1 0 8.3.9 7.1 10.9-1.4 9.4-35.1 72.3-38.9 87.7-4.6 20.6 6.6 41.4 24.9 50.6 11.4 5.7 62.5 15.7 58.5-11.1zm5.7 92.3c-10.3 7.4-12.9 22-5.7 32.6 7.1 10.6 21.4 13.1 32 6 10.6-7.4 13.1-22 6-32.6-7.4-10.6-21.7-13.5-32.3-6z"]
};
var faCentos = {
  prefix: 'fab',
  iconName: 'centos',
  icon: [448, 512, [], "f789", "M289.6 97.5l31.6 31.7-76.3 76.5V97.5zm-162.4 31.7l76.3 76.5V97.5h-44.7zm41.5-41.6h44.7v127.9l10.8 10.8 10.8-10.8V87.6h44.7L224.2 32zm26.2 168.1l-10.8-10.8H55.5v-44.8L0 255.7l55.5 55.6v-44.8h128.6l10.8-10.8zm79.3-20.7h107.9v-44.8l-31.6-31.7zm173.3 20.7L392 200.1v44.8H264.3l-10.8 10.8 10.8 10.8H392v44.8l55.5-55.6zM65.4 176.2l32.5-31.7 90.3 90.5h15.3v-15.3l-90.3-90.5 31.6-31.7H65.4zm316.7-78.7h-78.5l31.6 31.7-90.3 90.5V235h15.3l90.3-90.5 31.6 31.7zM203.5 413.9V305.8l-76.3 76.5 31.6 31.7h44.7zM65.4 235h108.8l-76.3-76.5-32.5 31.7zm316.7 100.2l-31.6 31.7-90.3-90.5h-15.3v15.3l90.3 90.5-31.6 31.7h78.5zm0-58.8H274.2l76.3 76.5 31.6-31.7zm-60.9 105.8l-76.3-76.5v108.1h44.7zM97.9 352.9l76.3-76.5H65.4v44.8zm181.8 70.9H235V295.9l-10.8-10.8-10.8 10.8v127.9h-44.7l55.5 55.6zm-166.5-41.6l90.3-90.5v-15.3h-15.3l-90.3 90.5-32.5-31.7v78.7h79.4z"]
};
var faAdn = {
  prefix: 'fab',
  iconName: 'adn',
  icon: [496, 512, [], "f170", "M248 167.5l64.9 98.8H183.1l64.9-98.8zM496 256c0 136.9-111.1 248-248 248S0 392.9 0 256 111.1 8 248 8s248 111.1 248 248zm-99.8 82.7L248 115.5 99.8 338.7h30.4l33.6-51.7h168.6l33.6 51.7h30.2z"]
};
var faCloudsmith = {
  prefix: 'fab',
  iconName: 'cloudsmith',
  icon: [332, 512, [], "f384", "M332.5 419.9c0 46.4-37.6 84.1-84 84.1s-84-37.7-84-84.1 37.6-84 84-84 84 37.6 84 84zm-84-243.9c46.4 0 80-37.6 80-84s-33.6-84-80-84-88 37.6-88 84-29.6 76-76 76-84 41.6-84 88 37.6 80 84 80 84-33.6 84-80 33.6-80 80-80z"]
};
var faPiedPiperAlt = {
  prefix: 'fab',
  iconName: 'pied-piper-alt',
  icon: [576, 512, [], "f1a8", "M244 246c-3.2-2-6.3-2.9-10.1-2.9-6.6 0-12.6 3.2-19.3 3.7l1.7 4.9zm135.9 197.9c-19 0-64.1 9.5-79.9 19.8l6.9 45.1c35.7 6.1 70.1 3.6 106-9.8-4.8-10-23.5-55.1-33-55.1zM340.8 177c6.6 2.8 11.5 9.2 22.7 22.1 2-1.4 7.5-5.2 7.5-8.6 0-4.9-11.8-13.2-13.2-23 11.2-5.7 25.2-6 37.6-8.9 68.1-16.4 116.3-52.9 146.8-116.7C548.3 29.3 554 16.1 554.6 2l-2 2.6c-28.4 50-33 63.2-81.3 100-31.9 24.4-69.2 40.2-106.6 54.6l-6.3-.3v-21.8c-19.6 1.6-19.7-14.6-31.6-23-18.7 20.6-31.6 40.8-58.9 51.1-12.7 4.8-19.6 10-25.9 21.8 34.9-16.4 91.2-13.5 98.8-10zM555.5 0l-.6 1.1-.3.9.6-.6zm-59.2 382.1c-33.9-56.9-75.3-118.4-150-115.5l-.3-6c-1.1-13.5 32.8 3.2 35.1-31l-14.4 7.2c-19.8-45.7-8.6-54.3-65.5-54.3-14.7 0-26.7 1.7-41.4 4.6 2.9 18.6 2.2 36.7-10.9 50.3l19.5 5.5c-1.7 3.2-2.9 6.3-2.9 9.8 0 21 42.8 2.9 42.8 33.6 0 18.4-36.8 60.1-54.9 60.1-8 0-53.7-50-53.4-60.1l.3-4.6 52.3-11.5c13-2.6 12.3-22.7-2.9-22.7-3.7 0-43.1 9.2-49.4 10.6-2-5.2-7.5-14.1-13.8-14.1-3.2 0-6.3 3.2-9.5 4-9.2 2.6-31 2.9-21.5 20.1L15.9 298.5c-5.5 1.1-8.9 6.3-8.9 11.8 0 6 5.5 10.9 11.5 10.9 8 0 131.3-28.4 147.4-32.2 2.6 3.2 4.6 6.3 7.8 8.6 20.1 14.4 59.8 85.9 76.4 85.9 24.1 0 58-22.4 71.3-41.9 3.2-4.3 6.9-7.5 12.4-6.9.6 13.8-31.6 34.2-33 43.7-1.4 10.2-1 35.2-.3 41.1 26.7 8.1 52-3.6 77.9-2.9 4.3-21 10.6-41.9 9.8-63.5l-.3-9.5c-1.4-34.2-10.9-38.5-34.8-58.6-1.1-1.1-2.6-2.6-3.7-4 2.2-1.4 1.1-1 4.6-1.7 88.5 0 56.3 183.6 111.5 229.9 33.1-15 72.5-27.9 103.5-47.2-29-25.6-52.6-45.7-72.7-79.9zm-196.2 46.1v27.2l11.8-3.4-2.9-23.8zm-68.7-150.4l24.1 61.2 21-13.8-31.3-50.9zm84.4 154.9l2 12.4c9-1.5 58.4-6.6 58.4-14.1 0-1.4-.6-3.2-.9-4.6-26.8 0-36.9 3.8-59.5 6.3z"]
};
var faSquareDribbble = {
  prefix: 'fab',
  iconName: 'square-dribbble',
  icon: [448, 512, ["dribbble-square"], "f397", "M90.2 228.2c8.9-42.4 37.4-77.7 75.7-95.7 3.6 4.9 28 38.8 50.7 79-64 17-120.3 16.8-126.4 16.7zM314.6 154c-33.6-29.8-79.3-41.1-122.6-30.6 3.8 5.1 28.6 38.9 51 80 48.6-18.3 69.1-45.9 71.6-49.4zM140.1 364c40.5 31.6 93.3 36.7 137.3 18-2-12-10-53.8-29.2-103.6-55.1 18.8-93.8 56.4-108.1 85.6zm98.8-108.2c-3.4-7.8-7.2-15.5-11.1-23.2C159.6 253 93.4 252.2 87.4 252c0 1.4-.1 2.8-.1 4.2 0 35.1 13.3 67.1 35.1 91.4 22.2-37.9 67.1-77.9 116.5-91.8zm34.9 16.3c17.9 49.1 25.1 89.1 26.5 97.4 30.7-20.7 52.5-53.6 58.6-91.6-4.6-1.5-42.3-12.7-85.1-5.8zm-20.3-48.4c4.8 9.8 8.3 17.8 12 26.8 45.5-5.7 90.7 3.4 95.2 4.4-.3-32.3-11.8-61.9-30.9-85.1-2.9 3.9-25.8 33.2-76.3 53.9zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-64 176c0-88.2-71.8-160-160-160S64 167.8 64 256s71.8 160 160 160 160-71.8 160-160z"]
};
var faDribbbleSquare = faSquareDribbble;
var faCodiepie = {
  prefix: 'fab',
  iconName: 'codiepie',
  icon: [472, 512, [], "f284", "M422.5 202.9c30.7 0 33.5 53.1-.3 53.1h-10.8v44.3h-26.6v-97.4h37.7zM472 352.6C429.9 444.5 350.4 504 248 504 111 504 0 393 0 256S111 8 248 8c97.4 0 172.8 53.7 218.2 138.4l-186 108.8L472 352.6zm-38.5 12.5l-60.3-30.7c-27.1 44.3-70.4 71.4-122.4 71.4-82.5 0-149.2-66.7-149.2-148.9 0-82.5 66.7-149.2 149.2-149.2 48.4 0 88.9 23.5 116.9 63.4l59.5-34.6c-40.7-62.6-104.7-100-179.2-100-121.2 0-219.5 98.3-219.5 219.5S126.8 475.5 248 475.5c78.6 0 146.5-42.1 185.5-110.4z"]
};
var faNode = {
  prefix: 'fab',
  iconName: 'node',
  icon: [640, 512, [], "f419", "M316.3 452c-2.1 0-4.2-.6-6.1-1.6L291 439c-2.9-1.6-1.5-2.2-.5-2.5 3.8-1.3 4.6-1.6 8.7-4 .4-.2 1-.1 1.4.1l14.8 8.8c.5.3 1.3.3 1.8 0L375 408c.5-.3.9-.9.9-1.6v-66.7c0-.7-.3-1.3-.9-1.6l-57.8-33.3c-.5-.3-1.2-.3-1.8 0l-57.8 33.3c-.6.3-.9 1-.9 1.6v66.7c0 .6.4 1.2.9 1.5l15.8 9.1c8.6 4.3 13.9-.8 13.9-5.8v-65.9c0-.9.7-1.7 1.7-1.7h7.3c.9 0 1.7.7 1.7 1.7v65.9c0 11.5-6.2 18-17.1 18-3.3 0-6 0-13.3-3.6l-15.2-8.7c-3.7-2.2-6.1-6.2-6.1-10.5v-66.7c0-4.3 2.3-8.4 6.1-10.5l57.8-33.4c3.7-2.1 8.5-2.1 12.1 0l57.8 33.4c3.7 2.2 6.1 6.2 6.1 10.5v66.7c0 4.3-2.3 8.4-6.1 10.5l-57.8 33.4c-1.7 1.1-3.8 1.7-6 1.7zm46.7-65.8c0-12.5-8.4-15.8-26.2-18.2-18-2.4-19.8-3.6-19.8-7.8 0-3.5 1.5-8.1 14.8-8.1 11.9 0 16.3 2.6 18.1 10.6.2.8.8 1.3 1.6 1.3h7.5c.5 0 .9-.2 1.2-.5.3-.4.5-.8.4-1.3-1.2-13.8-10.3-20.2-28.8-20.2-16.5 0-26.3 7-26.3 18.6 0 12.7 9.8 16.1 25.6 17.7 18.9 1.9 20.4 4.6 20.4 8.3 0 6.5-5.2 9.2-17.4 9.2-15.3 0-18.7-3.8-19.8-11.4-.1-.8-.8-1.4-1.7-1.4h-7.5c-.9 0-1.7.7-1.7 1.7 0 9.7 5.3 21.3 30.6 21.3 18.5 0 29-7.2 29-19.8zm54.5-50.1c0 6.1-5 11.1-11.1 11.1s-11.1-5-11.1-11.1c0-6.3 5.2-11.1 11.1-11.1 6-.1 11.1 4.8 11.1 11.1zm-1.8 0c0-5.2-4.2-9.3-9.4-9.3-5.1 0-9.3 4.1-9.3 9.3 0 5.2 4.2 9.4 9.3 9.4 5.2-.1 9.4-4.3 9.4-9.4zm-4.5 6.2h-2.6c-.1-.6-.5-3.8-.5-3.9-.2-.7-.4-1.1-1.3-1.1h-2.2v5h-2.4v-12.5h4.3c1.5 0 4.4 0 4.4 3.3 0 2.3-1.5 2.8-2.4 3.1 1.7.1 1.8 1.2 2.1 2.8.1 1 .3 2.7.6 3.3zm-2.8-8.8c0-1.7-1.2-1.7-1.8-1.7h-2v3.5h1.9c1.6 0 1.9-1.1 1.9-1.8zM137.3 191c0-2.7-1.4-5.1-3.7-6.4l-61.3-35.3c-1-.6-2.2-.9-3.4-1h-.6c-1.2 0-2.3.4-3.4 1L3.7 184.6C1.4 185.9 0 188.4 0 191l.1 95c0 1.3.7 2.5 1.8 3.2 1.1.7 2.5.7 3.7 0L42 268.3c2.3-1.4 3.7-3.8 3.7-6.4v-44.4c0-2.6 1.4-5.1 3.7-6.4l15.5-8.9c1.2-.7 2.4-1 3.7-1 1.3 0 2.6.3 3.7 1l15.5 8.9c2.3 1.3 3.7 3.8 3.7 6.4v44.4c0 2.6 1.4 5.1 3.7 6.4l36.4 20.9c1.1.7 2.6.7 3.7 0 1.1-.6 1.8-1.9 1.8-3.2l.2-95zM472.5 87.3v176.4c0 2.6-1.4 5.1-3.7 6.4l-61.3 35.4c-2.3 1.3-5.1 1.3-7.4 0l-61.3-35.4c-2.3-1.3-3.7-3.8-3.7-6.4v-70.8c0-2.6 1.4-5.1 3.7-6.4l61.3-35.4c2.3-1.3 5.1-1.3 7.4 0l15.3 8.8c1.7 1 3.9-.3 3.9-2.2v-94c0-2.8 3-4.6 5.5-3.2l36.5 20.4c2.3 1.2 3.8 3.7 3.8 6.4zm-46 128.9c0-.7-.4-1.3-.9-1.6l-21-12.2c-.6-.3-1.3-.3-1.9 0l-21 12.2c-.6.3-.9.9-.9 1.6v24.3c0 .7.4 1.3.9 1.6l21 12.1c.6.3 1.3.3 1.8 0l21-12.1c.6-.3.9-.9.9-1.6v-24.3zm209.8-.7c2.3-1.3 3.7-3.8 3.7-6.4V192c0-2.6-1.4-5.1-3.7-6.4l-60.9-35.4c-2.3-1.3-5.1-1.3-7.4 0l-61.3 35.4c-2.3 1.3-3.7 3.8-3.7 6.4v70.8c0 2.7 1.4 5.1 3.7 6.4l60.9 34.7c2.2 1.3 5 1.3 7.3 0l36.8-20.5c2.5-1.4 2.5-5 0-6.4L550 241.6c-1.2-.7-1.9-1.9-1.9-3.2v-22.2c0-1.3.7-2.5 1.9-3.2l19.2-11.1c1.1-.7 2.6-.7 3.7 0l19.2 11.1c1.1.7 1.9 1.9 1.9 3.2v17.4c0 2.8 3.1 4.6 5.6 3.2l36.7-21.3zM559 219c-.4.3-.7.7-.7 1.2v13.6c0 .5.3 1 .7 1.2l11.8 6.8c.4.3 1 .3 1.4 0L584 235c.4-.3.7-.7.7-1.2v-13.6c0-.5-.3-1-.7-1.2l-11.8-6.8c-.4-.3-1-.3-1.4 0L559 219zm-254.2 43.5v-70.4c0-2.6-1.6-5.1-3.9-6.4l-61.1-35.2c-2.1-1.2-5-1.4-7.4 0l-61.1 35.2c-2.3 1.3-3.9 3.7-3.9 6.4v70.4c0 2.8 1.9 5.2 4 6.4l61.2 35.2c2.4 1.4 5.2 1.3 7.4 0l61-35.2c1.8-1 3.1-2.7 3.6-4.7.1-.5.2-1.1.2-1.7zm-74.3-124.9l-.8.5h1.1l-.3-.5zm76.2 130.2l-.4-.7v.9l.4-.2z"]
};
var faMix = {
  prefix: 'fab',
  iconName: 'mix',
  icon: [448, 512, [], "f3cb", "M0 64v348.9c0 56.2 88 58.1 88 0V174.3c7.9-52.9 88-50.4 88 6.5v175.3c0 57.9 96 58 96 0V240c5.3-54.7 88-52.5 88 4.3v23.8c0 59.9 88 56.6 88 0V64H0z"]
};
var faSteam = {
  prefix: 'fab',
  iconName: 'steam',
  icon: [496, 512, [], "f1b6", "M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z"]
};
var faCcApplePay = {
  prefix: 'fab',
  iconName: 'cc-apple-pay',
  icon: [576, 512, [], "f416", "M302.2 218.4c0 17.2-10.5 27.1-29 27.1h-24.3v-54.2h24.4c18.4 0 28.9 9.8 28.9 27.1zm47.5 62.6c0 8.3 7.2 13.7 18.5 13.7 14.4 0 25.2-9.1 25.2-21.9v-7.7l-23.5 1.5c-13.3.9-20.2 5.8-20.2 14.4zM576 79v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM127.8 197.2c8.4.7 16.8-4.2 22.1-10.4 5.2-6.4 8.6-15 7.7-23.7-7.4.3-16.6 4.9-21.9 11.3-4.8 5.5-8.9 14.4-7.9 22.8zm60.6 74.5c-.2-.2-19.6-7.6-19.8-30-.2-18.7 15.3-27.7 16-28.2-8.8-13-22.4-14.4-27.1-14.7-12.2-.7-22.6 6.9-28.4 6.9-5.9 0-14.7-6.6-24.3-6.4-12.5.2-24.2 7.3-30.5 18.6-13.1 22.6-3.4 56 9.3 74.4 6.2 9.1 13.7 19.1 23.5 18.7 9.3-.4 13-6 24.2-6 11.3 0 14.5 6 24.3 5.9 10.2-.2 16.5-9.1 22.8-18.2 6.9-10.4 9.8-20.4 10-21zm135.4-53.4c0-26.6-18.5-44.8-44.9-44.8h-51.2v136.4h21.2v-46.6h29.3c26.8 0 45.6-18.4 45.6-45zm90 23.7c0-19.7-15.8-32.4-40-32.4-22.5 0-39.1 12.9-39.7 30.5h19.1c1.6-8.4 9.4-13.9 20-13.9 13 0 20.2 6 20.2 17.2v7.5l-26.4 1.6c-24.6 1.5-37.9 11.6-37.9 29.1 0 17.7 13.7 29.4 33.4 29.4 13.3 0 25.6-6.7 31.2-17.4h.4V310h19.6v-68zM516 210.9h-21.5l-24.9 80.6h-.4l-24.9-80.6H422l35.9 99.3-1.9 6c-3.2 10.2-8.5 14.2-17.9 14.2-1.7 0-4.9-.2-6.2-.3v16.4c1.2.4 6.5.5 8.1.5 20.7 0 30.4-7.9 38.9-31.8L516 210.9z"]
};
var faScribd = {
  prefix: 'fab',
  iconName: 'scribd',
  icon: [384, 512, [], "f28a", "M42.3 252.7c-16.1-19-24.7-45.9-24.8-79.9 0-100.4 75.2-153.1 167.2-153.1 98.6-1.6 156.8 49 184.3 70.6l-50.5 72.1-37.3-24.6 26.9-38.6c-36.5-24-79.4-36.5-123-35.8-50.7-.8-111.7 27.2-111.7 76.2 0 18.7 11.2 20.7 28.6 15.6 23.3-5.3 41.9.6 55.8 14 26.4 24.3 23.2 67.6-.7 91.9-29.2 29.5-85.2 27.3-114.8-8.4zm317.7 5.9c-15.5-18.8-38.9-29.4-63.2-28.6-38.1-2-71.1 28-70.5 67.2-.7 16.8 6 33 18.4 44.3 14.1 13.9 33 19.7 56.3 14.4 17.4-5.1 28.6-3.1 28.6 15.6 0 4.3-.5 8.5-1.4 12.7-16.7 40.9-59.5 64.4-121.4 64.4-51.9.2-102.4-16.4-144.1-47.3l33.7-39.4-35.6-27.4L0 406.3l15.4 13.8c52.5 46.8 120.4 72.5 190.7 72.2 51.4 0 94.4-10.5 133.6-44.1 57.1-51.4 54.2-149.2 20.3-189.6z"]
};
var faOpenid = {
  prefix: 'fab',
  iconName: 'openid',
  icon: [448, 512, [], "f19b", "M271.5 432l-68 32C88.5 453.7 0 392.5 0 318.2c0-71.5 82.5-131 191.7-144.3v43c-71.5 12.5-124 53-124 101.3 0 51 58.5 93.3 135.7 103v-340l68-33.2v384zM448 291l-131.3-28.5 36.8-20.7c-19.5-11.5-43.5-20-70-24.8v-43c46.2 5.5 87.7 19.5 120.3 39.3l35-19.8L448 291z"]
};
var faInstalod = {
  prefix: 'fab',
  iconName: 'instalod',
  icon: [512, 512, [], "e081", "M153.384,480H387.113L502.554,275.765,204.229,333.211ZM504.726,240.078,387.113,32H155.669L360.23,267.9ZM124.386,48.809,7.274,256,123.236,461.154,225.627,165.561Z"]
};
var faExpeditedssl = {
  prefix: 'fab',
  iconName: 'expeditedssl',
  icon: [496, 512, [], "f23e", "M248 43.4C130.6 43.4 35.4 138.6 35.4 256S130.6 468.6 248 468.6 460.6 373.4 460.6 256 365.4 43.4 248 43.4zm-97.4 132.9c0-53.7 43.7-97.4 97.4-97.4s97.4 43.7 97.4 97.4v26.6c0 5-3.9 8.9-8.9 8.9h-17.7c-5 0-8.9-3.9-8.9-8.9v-26.6c0-82.1-124-82.1-124 0v26.6c0 5-3.9 8.9-8.9 8.9h-17.7c-5 0-8.9-3.9-8.9-8.9v-26.6zM389.7 380c0 9.7-8 17.7-17.7 17.7H124c-9.7 0-17.7-8-17.7-17.7V238.3c0-9.7 8-17.7 17.7-17.7h248c9.7 0 17.7 8 17.7 17.7V380zm-248-137.3v132.9c0 2.5-1.9 4.4-4.4 4.4h-8.9c-2.5 0-4.4-1.9-4.4-4.4V242.7c0-2.5 1.9-4.4 4.4-4.4h8.9c2.5 0 4.4 1.9 4.4 4.4zm141.7 48.7c0 13-7.2 24.4-17.7 30.4v31.6c0 5-3.9 8.9-8.9 8.9h-17.7c-5 0-8.9-3.9-8.9-8.9v-31.6c-10.5-6.1-17.7-17.4-17.7-30.4 0-19.7 15.8-35.4 35.4-35.4s35.5 15.8 35.5 35.4zM248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 478.3C121 486.3 17.7 383 17.7 256S121 25.7 248 25.7 478.3 129 478.3 256 375 486.3 248 486.3z"]
};
var faSellcast = {
  prefix: 'fab',
  iconName: 'sellcast',
  icon: [448, 512, [], "f2da", "M353.4 32H94.7C42.6 32 0 74.6 0 126.6v258.7C0 437.4 42.6 480 94.7 480h258.7c52.1 0 94.7-42.6 94.7-94.6V126.6c0-52-42.6-94.6-94.7-94.6zm-50 316.4c-27.9 48.2-89.9 64.9-138.2 37.2-22.9 39.8-54.9 8.6-42.3-13.2l15.7-27.2c5.9-10.3 19.2-13.9 29.5-7.9 18.6 10.8-.1-.1 18.5 10.7 27.6 15.9 63.4 6.3 79.4-21.3 15.9-27.6 6.3-63.4-21.3-79.4-17.8-10.2-.6-.4-18.6-10.6-24.6-14.2-3.4-51.9 21.6-37.5 18.6 10.8-.1-.1 18.5 10.7 48.4 28 65.1 90.3 37.2 138.5zm21.8-208.8c-17 29.5-16.3 28.8-19 31.5-6.5 6.5-16.3 8.7-26.5 3.6-18.6-10.8.1.1-18.5-10.7-27.6-15.9-63.4-6.3-79.4 21.3s-6.3 63.4 21.3 79.4c0 0 18.5 10.6 18.6 10.6 24.6 14.2 3.4 51.9-21.6 37.5-18.6-10.8.1.1-18.5-10.7-48.2-27.8-64.9-90.1-37.1-138.4 27.9-48.2 89.9-64.9 138.2-37.2l4.8-8.4c14.3-24.9 52-3.3 37.7 21.5z"]
};
var faSquareTwitter = {
  prefix: 'fab',
  iconName: 'square-twitter',
  icon: [448, 512, ["twitter-square"], "f081", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"]
};
var faTwitterSquare = faSquareTwitter;
var faRProject = {
  prefix: 'fab',
  iconName: 'r-project',
  icon: [581, 512, [], "f4f7", "M581 226.6C581 119.1 450.9 32 290.5 32S0 119.1 0 226.6C0 322.4 103.3 402 239.4 418.1V480h99.1v-61.5c24.3-2.7 47.6-7.4 69.4-13.9L448 480h112l-67.4-113.7c54.5-35.4 88.4-84.9 88.4-139.7zm-466.8 14.5c0-73.5 98.9-133 220.8-133s211.9 40.7 211.9 133c0 50.1-26.5 85-70.3 106.4-2.4-1.6-4.7-2.9-6.4-3.7-10.2-5.2-27.8-10.5-27.8-10.5s86.6-6.4 86.6-92.7-90.6-87.9-90.6-87.9h-199V361c-74.1-21.5-125.2-67.1-125.2-119.9zm225.1 38.3v-55.6c57.8 0 87.8-6.8 87.8 27.3 0 36.5-38.2 28.3-87.8 28.3zm-.9 72.5H365c10.8 0 18.9 11.7 24 19.2-16.1 1.9-33 2.8-50.6 2.9v-22.1z"]
};
var faDelicious = {
  prefix: 'fab',
  iconName: 'delicious',
  icon: [448, 512, [], "f1a5", "M446.5 68c-.4-1.5-.9-3-1.4-4.5-.9-2.5-2-4.8-3.3-7.1-1.4-2.4-3-4.8-4.7-6.9-2.1-2.5-4.4-4.8-6.9-6.8-1.1-.9-2.2-1.7-3.3-2.5-1.3-.9-2.6-1.7-4-2.4-1.8-1-3.6-1.8-5.5-2.5-1.7-.7-3.5-1.3-5.4-1.7-3.8-1-7.9-1.5-12-1.5H48C21.5 32 0 53.5 0 80v352c0 4.1.5 8.2 1.5 12 2 7.7 5.8 14.6 11 20.3 1 1.1 2.1 2.2 3.3 3.3 5.7 5.2 12.6 9 20.3 11 3.8 1 7.9 1.5 12 1.5h352c26.5 0 48-21.5 48-48V80c-.1-4.1-.6-8.2-1.6-12zM416 432c0 8.8-7.2 16-16 16H224V256H32V80c0-8.8 7.2-16 16-16h176v192h192z"]
};
var faFreebsd = {
  prefix: 'fab',
  iconName: 'freebsd',
  icon: [448, 512, [], "f3a4", "M303.7 96.2c11.1-11.1 115.5-77 139.2-53.2 23.7 23.7-42.1 128.1-53.2 139.2-11.1 11.1-39.4.9-63.1-22.9-23.8-23.7-34.1-52-22.9-63.1zM109.9 68.1C73.6 47.5 22 24.6 5.6 41.1c-16.6 16.6 7.1 69.4 27.9 105.7 18.5-32.2 44.8-59.3 76.4-78.7zM406.7 174c3.3 11.3 2.7 20.7-2.7 26.1-20.3 20.3-87.5-27-109.3-70.1-18-32.3-11.1-53.4 14.9-48.7 5.7-3.6 12.3-7.6 19.6-11.6-29.8-15.5-63.6-24.3-99.5-24.3-119.1 0-215.6 96.5-215.6 215.6 0 119 96.5 215.6 215.6 215.6S445.3 380.1 445.3 261c0-38.4-10.1-74.5-27.7-105.8-3.9 7-7.6 13.3-10.9 18.8z"]
};
var faVuejs = {
  prefix: 'fab',
  iconName: 'vuejs',
  icon: [448, 512, [], "f41f", "M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z"]
};
var faAccusoft = {
  prefix: 'fab',
  iconName: 'accusoft',
  icon: [640, 512, [], "f369", "M322.1 252v-1l-51.2-65.8s-12 1.6-25 15.1c-9 9.3-242.1 239.1-243.4 240.9-7 10 1.6 6.8 15.7 1.7.8 0 114.5-36.6 114.5-36.6.5-.6-.1-.1.6-.6-.4-5.1-.8-26.2-1-27.7-.6-5.2 2.2-6.9 7-8.9l92.6-33.8c.6-.8 88.5-81.7 90.2-83.3zm160.1 120.1c13.3 16.1 20.7 13.3 30.8 9.3 3.2-1.2 115.4-47.6 117.8-48.9 8-4.3-1.7-16.7-7.2-23.4-2.1-2.5-205.1-245.6-207.2-248.3-9.7-12.2-14.3-12.9-38.4-12.8-10.2 0-106.8.5-116.5.6-19.2.1-32.9-.3-19.2 16.9C250 75 476.5 365.2 482.2 372.1zm152.7 1.6c-2.3-.3-24.6-4.7-38-7.2 0 0-115 50.4-117.5 51.6-16 7.3-26.9-3.2-36.7-14.6l-57.1-74c-5.4-.9-60.4-9.6-65.3-9.3-3.1.2-9.6.8-14.4 2.9-4.9 2.1-145.2 52.8-150.2 54.7-5.1 2-11.4 3.6-11.1 7.6.2 2.5 2 2.6 4.6 3.5 2.7.8 300.9 67.6 308 69.1 15.6 3.3 38.5 10.5 53.6 1.7 2.1-1.2 123.8-76.4 125.8-77.8 5.4-4 4.3-6.8-1.7-8.2z"]
};
var faIoxhost = {
  prefix: 'fab',
  iconName: 'ioxhost',
  icon: [640, 512, [], "f208", "M616 160h-67.3C511.2 70.7 422.9 8 320 8 183 8 72 119 72 256c0 16.4 1.6 32.5 4.7 48H24c-13.3 0-24 10.8-24 24 0 13.3 10.7 24 24 24h67.3c37.5 89.3 125.8 152 228.7 152 137 0 248-111 248-248 0-16.4-1.6-32.5-4.7-48H616c13.3 0 24-10.8 24-24 0-13.3-10.7-24-24-24zm-96 96c0 110.5-89.5 200-200 200-75.7 0-141.6-42-175.5-104H424c13.3 0 24-10.8 24-24 0-13.3-10.7-24-24-24H125.8c-3.8-15.4-5.8-31.4-5.8-48 0-110.5 89.5-200 200-200 75.7 0 141.6 42 175.5 104H216c-13.3 0-24 10.8-24 24 0 13.3 10.7 24 24 24h298.2c3.8 15.4 5.8 31.4 5.8 48zm-304-24h208c13.3 0 24 10.7 24 24 0 13.2-10.7 24-24 24H216c-13.3 0-24-10.7-24-24 0-13.2 10.7-24 24-24z"]
};
var faFonticonsFi = {
  prefix: 'fab',
  iconName: 'fonticons-fi',
  icon: [384, 512, [], "f3a2", "M114.4 224h92.4l-15.2 51.2h-76.4V433c0 8-2.8 9.2 4.4 10l59.6 5.6V483H0v-35.2l29.2-2.8c7.2-.8 9.2-3.2 9.2-10.8V278.4c0-3.2-4-3.2-8-3.2H0V224h38.4v-28.8c0-68 36.4-96 106-96 46.8 0 88.8 11.2 88.8 72.4l-69.6 8.4c.4-25.6-6-31.6-22.4-31.6-25.2 0-26 13.6-26 37.6v32c0 3.2-4.8 6-.8 6zM384 483H243.2v-34.4l28-3.6c7.2-.8 10.4-2.4 10.4-10V287c0-5.6-4-9.2-9.2-10.8l-33.2-8.8 9.2-40.4h110v208c0 8-3.6 8.8 4 10l21.6 3.6V483zm-30-347.2l12.4 45.6-10 10-42.8-22.8-42.8 22.8-10-10 12.4-45.6-30-36.4 4.8-10h38L307.2 51H320l21.2 38.4h38l4.8 13.2-30 33.2z"]
};
var faAppStore = {
  prefix: 'fab',
  iconName: 'app-store',
  icon: [512, 512, [], "f36f", "M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"]
};
var faCcMastercard = {
  prefix: 'fab',
  iconName: 'cc-mastercard',
  icon: [576, 512, [], "f1f1", "M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-1.1.3-.3.5-.3.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3 1.1.5s.2.6.5 1.1zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7.8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8.3-1.4.3-.5.3-.8.5-1.1.8-.5.3-.8.8-.8 1.1-.3.5-.3 1.1-.3 1.6 0 .3 0 .8.3 1.4 0 .3.3.8.8 1.1.3.3.5.5 1.1.8.5.3 1.1.3 1.4.3.5 0 1.1 0 1.6-.3.3-.3.8-.5 1.1-.8.3-.3.5-.8.8-1.1.3-.6.3-1.1.3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4.1 138.5-61.9 138.5-138.4z"]
};
var faItunesNote = {
  prefix: 'fab',
  iconName: 'itunes-note',
  icon: [384, 512, [], "f3b5", "M381.9 388.2c-6.4 27.4-27.2 42.8-55.1 48-24.5 4.5-44.9 5.6-64.5-10.2-23.9-20.1-24.2-53.4-2.7-74.4 17-16.2 40.9-19.5 76.8-25.8 6-1.1 11.2-2.5 15.6-7.4 6.4-7.2 4.4-4.1 4.4-163.2 0-11.2-5.5-14.3-17-12.3-8.2 1.4-185.7 34.6-185.7 34.6-10.2 2.2-13.4 5.2-13.4 16.7 0 234.7 1.1 223.9-2.5 239.5-4.2 18.2-15.4 31.9-30.2 39.5-16.8 9.3-47.2 13.4-63.4 10.4-43.2-8.1-58.4-58-29.1-86.6 17-16.2 40.9-19.5 76.8-25.8 6-1.1 11.2-2.5 15.6-7.4 10.1-11.5 1.8-256.6 5.2-270.2.8-5.2 3-9.6 7.1-12.9 4.2-3.5 11.8-5.5 13.4-5.5 204-38.2 228.9-43.1 232.4-43.1 11.5-.8 18.1 6 18.1 17.6.2 344.5 1.1 326-1.8 338.5z"]
};
var faGolang = {
  prefix: 'fab',
  iconName: 'golang',
  icon: [640, 512, [], "e40f", "M400.1 194.8C389.2 197.6 380.2 199.1 371 202.4C363.7 204.3 356.3 206.3 347.8 208.5L347.2 208.6C343 209.8 342.6 209.9 338.7 205.4C334 200.1 330.6 196.7 324.1 193.5C304.4 183.9 285.4 186.7 267.7 198.2C246.5 211.9 235.6 232.2 235.9 257.4C236.2 282.4 253.3 302.9 277.1 306.3C299.1 309.1 316.9 301.7 330.9 285.8C333 283.2 334.9 280.5 337 277.5V277.5L337 277.5C337.8 276.5 338.5 275.4 339.3 274.2H279.2C272.7 274.2 271.1 270.2 273.3 264.9C277.3 255.2 284.8 239 289.2 230.9C290.1 229.1 292.3 225.1 296.1 225.1H397.2C401.7 211.7 409 198.2 418.8 185.4C441.5 155.5 468.1 139.9 506 133.4C537.8 127.8 567.7 130.9 594.9 149.3C619.5 166.1 634.7 188.9 638.8 218.8C644.1 260.9 631.9 295.1 602.1 324.4C582.4 345.3 557.2 358.4 528.2 364.3C522.6 365.3 517.1 365.8 511.7 366.3C508.8 366.5 506 366.8 503.2 367.1C474.9 366.5 449 358.4 427.2 339.7C411.9 326.4 401.3 310.1 396.1 291.2C392.4 298.5 388.1 305.6 382.1 312.3C360.5 341.9 331.2 360.3 294.2 365.2C263.6 369.3 235.3 363.4 210.3 344.7C187.3 327.2 174.2 304.2 170.8 275.5C166.7 241.5 176.7 210.1 197.2 184.2C219.4 155.2 248.7 136.8 284.5 130.3C313.8 124.1 341.8 128.4 367.1 145.6C383.6 156.5 395.4 171.4 403.2 189.5C405.1 192.3 403.8 193.9 400.1 194.8zM48.3 200.4C47.05 200.4 46.74 199.8 47.36 198.8L53.91 190.4C54.53 189.5 56.09 188.9 57.34 188.9H168.6C169.8 188.9 170.1 189.8 169.5 190.7L164.2 198.8C163.6 199.8 162 200.7 161.1 200.7L48.3 200.4zM1.246 229.1C0 229.1-.3116 228.4 .3116 227.5L6.855 219.1C7.479 218.2 9.037 217.5 10.28 217.5H152.4C153.6 217.5 154.2 218.5 153.9 219.4L151.4 226.9C151.1 228.1 149.9 228.8 148.6 228.8L1.246 229.1zM75.72 255.9C75.1 256.8 75.41 257.7 76.65 257.7L144.6 258C145.5 258 146.8 257.1 146.8 255.9L147.4 248.4C147.4 247.1 146.8 246.2 145.5 246.2H83.2C81.95 246.2 80.71 247.1 80.08 248.1L75.72 255.9zM577.2 237.9C577 235.3 576.9 233.1 576.5 230.9C570.9 200.1 542.5 182.6 512.9 189.5C483.9 196 465.2 214.4 458.4 243.7C452.8 268 464.6 292.6 487 302.6C504.2 310.1 521.3 309.2 537.8 300.7C562.4 287.1 575.8 268 577.4 241.2C577.3 240 577.3 238.9 577.2 237.9z"]
};
var faKickstarter = {
  prefix: 'fab',
  iconName: 'kickstarter',
  icon: [448, 512, [], "f3bb", "M400 480H48c-26.4 0-48-21.6-48-48V80c0-26.4 21.6-48 48-48h352c26.4 0 48 21.6 48 48v352c0 26.4-21.6 48-48 48zM199.6 178.5c0-30.7-17.6-45.1-39.7-45.1-25.8 0-40 19.8-40 44.5v154.8c0 25.8 13.7 45.6 40.5 45.6 21.5 0 39.2-14 39.2-45.6v-41.8l60.6 75.7c12.3 14.9 39 16.8 55.8 0 14.6-15.1 14.8-36.8 4-50.4l-49.1-62.8 40.5-58.7c9.4-13.5 9.5-34.5-5.6-49.1-16.4-15.9-44.6-17.3-61.4 7l-44.8 64.7v-38.8z"]
};
var faGrav = {
  prefix: 'fab',
  iconName: 'grav',
  icon: [512, 512, [], "f2d6", "M301.1 212c4.4 4.4 4.4 11.9 0 16.3l-9.7 9.7c-4.4 4.7-11.9 4.7-16.6 0l-10.5-10.5c-4.4-4.7-4.4-11.9 0-16.6l9.7-9.7c4.4-4.4 11.9-4.4 16.6 0l10.5 10.8zm-30.2-19.7c3-3 3-7.8 0-10.5-2.8-3-7.5-3-10.5 0-2.8 2.8-2.8 7.5 0 10.5 3.1 2.8 7.8 2.8 10.5 0zm-26 5.3c-3 2.8-3 7.5 0 10.2 2.8 3 7.5 3 10.5 0 2.8-2.8 2.8-7.5 0-10.2-3-3-7.7-3-10.5 0zm72.5-13.3c-19.9-14.4-33.8-43.2-11.9-68.1 21.6-24.9 40.7-17.2 59.8.8 11.9 11.3 29.3 24.9 17.2 48.2-12.5 23.5-45.1 33.2-65.1 19.1zm47.7-44.5c-8.9-10-23.3 6.9-15.5 16.1 7.4 9 32.1 2.4 15.5-16.1zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-66.2 42.6c2.5-16.1-20.2-16.6-25.2-25.7-13.6-24.1-27.7-36.8-54.5-30.4 11.6-8 23.5-6.1 23.5-6.1.3-6.4 0-13-9.4-24.9 3.9-12.5.3-22.4.3-22.4 15.5-8.6 26.8-24.4 29.1-43.2 3.6-31-18.8-59.2-49.8-62.8-22.1-2.5-43.7 7.7-54.3 25.7-23.2 40.1 1.4 70.9 22.4 81.4-14.4-1.4-34.3-11.9-40.1-34.3-6.6-25.7 2.8-49.8 8.9-61.4 0 0-4.4-5.8-8-8.9 0 0-13.8 0-24.6 5.3 11.9-15.2 25.2-14.4 25.2-14.4 0-6.4-.6-14.9-3.6-21.6-5.4-11-23.8-12.9-31.7 2.8.1-.2.3-.4.4-.5-5 11.9-1.1 55.9 16.9 87.2-2.5 1.4-9.1 6.1-13 10-21.6 9.7-56.2 60.3-56.2 60.3-28.2 10.8-77.2 50.9-70.6 79.7.3 3 1.4 5.5 3 7.5-2.8 2.2-5.5 5-8.3 8.3-11.9 13.8-5.3 35.2 17.7 24.4 15.8-7.2 29.6-20.2 36.3-30.4 0 0-5.5-5-16.3-4.4 27.7-6.6 34.3-9.4 46.2-9.1 8 3.9 8-34.3 8-34.3 0-14.7-2.2-31-11.1-41.5 12.5 12.2 29.1 32.7 28 60.6-.8 18.3-15.2 23-15.2 23-9.1 16.6-43.2 65.9-30.4 106 0 0-9.7-14.9-10.2-22.1-17.4 19.4-46.5 52.3-24.6 64.5 26.6 14.7 108.8-88.6 126.2-142.3 34.6-20.8 55.4-47.3 63.9-65 22 43.5 95.3 94.5 101.1 59z"]
};
var faWeibo = {
  prefix: 'fab',
  iconName: 'weibo',
  icon: [512, 512, [], "f18a", "M407 177.6c7.6-24-13.4-46.8-37.4-41.7-22 4.8-28.8-28.1-7.1-32.8 50.1-10.9 92.3 37.1 76.5 84.8-6.8 21.2-38.8 10.8-32-10.3zM214.8 446.7C108.5 446.7 0 395.3 0 310.4c0-44.3 28-95.4 76.3-143.7C176 67 279.5 65.8 249.9 161c-4 13.1 12.3 5.7 12.3 6 79.5-33.6 140.5-16.8 114 51.4-3.7 9.4 1.1 10.9 8.3 13.1 135.7 42.3 34.8 215.2-169.7 215.2zm143.7-146.3c-5.4-55.7-78.5-94-163.4-85.7-84.8 8.6-148.8 60.3-143.4 116s78.5 94 163.4 85.7c84.8-8.6 148.8-60.3 143.4-116zM347.9 35.1c-25.9 5.6-16.8 43.7 8.3 38.3 72.3-15.2 134.8 52.8 111.7 124-7.4 24.2 29.1 37 37.4 12 31.9-99.8-55.1-195.9-157.4-174.3zm-78.5 311c-17.1 38.8-66.8 60-109.1 46.3-40.8-13.1-58-53.4-40.3-89.7 17.7-35.4 63.1-55.4 103.4-45.1 42 10.8 63.1 50.2 46 88.5zm-86.3-30c-12.9-5.4-30 .3-38 12.9-8.3 12.9-4.3 28 8.6 34 13.1 6 30.8.3 39.1-12.9 8-13.1 3.7-28.3-9.7-34zm32.6-13.4c-5.1-1.7-11.4.6-14.3 5.4-2.9 5.1-1.4 10.6 3.7 12.9 5.1 2 11.7-.3 14.6-5.4 2.8-5.2 1.1-10.9-4-12.9z"]
};
var faUncharted = {
  prefix: 'fab',
  iconName: 'uncharted',
  icon: [448, 512, [], "e084", "M171.73,232.813A5.381,5.381,0,0,0,176.7,229.5,48.081,48.081,0,0,1,191.6,204.244c1.243-.828,1.657-2.484,1.657-4.141a4.22,4.22,0,0,0-2.071-3.312L74.429,128.473,148.958,85a9.941,9.941,0,0,0,4.968-8.281,9.108,9.108,0,0,0-4.968-8.281L126.6,55.6a9.748,9.748,0,0,0-9.523,0l-100.2,57.966a9.943,9.943,0,0,0-4.969,8.281V236.954a9.109,9.109,0,0,0,4.969,8.281L39.235,258.07a8.829,8.829,0,0,0,4.968,1.242,9.4,9.4,0,0,0,6.625-2.484,10.8,10.8,0,0,0,2.9-7.039V164.5L169.66,232.4A4.5,4.5,0,0,0,171.73,232.813ZM323.272,377.73a12.478,12.478,0,0,0-4.969,1.242l-74.528,43.062V287.882c0-2.9-2.9-5.8-6.211-4.555a53.036,53.036,0,0,1-28.984.414,4.86,4.86,0,0,0-6.21,4.555V421.619l-74.529-43.061a8.83,8.83,0,0,0-4.969-1.242,9.631,9.631,0,0,0-9.523,9.523v26.085a9.107,9.107,0,0,0,4.969,8.281l100.2,57.553A8.829,8.829,0,0,0,223.486,480a11.027,11.027,0,0,0,4.969-1.242l100.2-57.553a9.941,9.941,0,0,0,4.968-8.281V386.839C332.8,382.285,328.24,377.73,323.272,377.73ZM286.007,78a23,23,0,1,0-23-23A23,23,0,0,0,286.007,78Zm63.627-10.086a23,23,0,1,0,23,23A23,23,0,0,0,349.634,67.914ZM412.816,151.6a23,23,0,1,0-23-23A23,23,0,0,0,412.816,151.6Zm-63.182-9.2a23,23,0,1,0,23,23A23,23,0,0,0,349.634,142.4Zm-63.627,83.244a23,23,0,1,0-23-23A23,23,0,0,0,286.007,225.648Zm-62.074,36.358a23,23,0,1,0-23-23A23,23,0,0,0,223.933,262.006Zm188.883-82.358a23,23,0,1,0,23,23A23,23,0,0,0,412.816,179.648Zm0,72.272a23,23,0,1,0,23,23A23,23,0,0,0,412.816,251.92Z"]
};
var faFirstdraft = {
  prefix: 'fab',
  iconName: 'firstdraft',
  icon: [384, 512, [], "f3a1", "M384 192h-64v128H192v128H0v-25.6h166.4v-128h128v-128H384V192zm-25.6 38.4v128h-128v128H64V512h192V384h128V230.4h-25.6zm25.6 192h-89.6V512H320v-64h64v-25.6zM0 0v384h128V256h128V128h128V0H0z"]
};
var faSquareYoutube = {
  prefix: 'fab',
  iconName: 'square-youtube',
  icon: [448, 512, [61798, "youtube-square"], "f431", "M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"]
};
var faYoutubeSquare = faSquareYoutube;
var faWikipediaW = {
  prefix: 'fab',
  iconName: 'wikipedia-w',
  icon: [640, 512, [], "f266", "M640 51.2l-.3 12.2c-28.1.8-45 15.8-55.8 40.3-25 57.8-103.3 240-155.3 358.6H415l-81.9-193.1c-32.5 63.6-68.3 130-99.2 193.1-.3.3-15 0-15-.3C172 352.3 122.8 243.4 75.8 133.4 64.4 106.7 26.4 63.4.2 63.7c0-3.1-.3-10-.3-14.2h161.9v13.9c-19.2 1.1-52.8 13.3-43.3 34.2 21.9 49.7 103.6 240.3 125.6 288.6 15-29.7 57.8-109.2 75.3-142.8-13.9-28.3-58.6-133.9-72.8-160-9.7-17.8-36.1-19.4-55.8-19.7V49.8l142.5.3v13.1c-19.4.6-38.1 7.8-29.4 26.1 18.9 40 30.6 68.1 48.1 104.7 5.6-10.8 34.7-69.4 48.1-100.8 8.9-20.6-3.9-28.6-38.6-29.4.3-3.6 0-10.3.3-13.6 44.4-.3 111.1-.3 123.1-.6v13.6c-22.5.8-45.8 12.8-58.1 31.7l-59.2 122.8c6.4 16.1 63.3 142.8 69.2 156.7L559.2 91.8c-8.6-23.1-36.4-28.1-47.2-28.3V49.6l127.8 1.1.2.5z"]
};
var faWpressr = {
  prefix: 'fab',
  iconName: 'wpressr',
  icon: [496, 512, ["rendact"], "f3e4", "M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm171.33 158.6c-15.18 34.51-30.37 69.02-45.63 103.5-2.44 5.51-6.89 8.24-12.97 8.24-23.02-.01-46.03.06-69.05-.05-5.12-.03-8.25 1.89-10.34 6.72-10.19 23.56-20.63 47-30.95 70.5-1.54 3.51-4.06 5.29-7.92 5.29-45.94-.01-91.87-.02-137.81 0-3.13 0-5.63-1.15-7.72-3.45-11.21-12.33-22.46-24.63-33.68-36.94-2.69-2.95-2.79-6.18-1.21-9.73 8.66-19.54 17.27-39.1 25.89-58.66 12.93-29.35 25.89-58.69 38.75-88.08 1.7-3.88 4.28-5.68 8.54-5.65 14.24.1 28.48.02 42.72.05 6.24.01 9.2 4.84 6.66 10.59-13.6 30.77-27.17 61.55-40.74 92.33-5.72 12.99-11.42 25.99-17.09 39-3.91 8.95 7.08 11.97 10.95 5.6.23-.37-1.42 4.18 30.01-67.69 1.36-3.1 3.41-4.4 6.77-4.39 15.21.08 30.43.02 45.64.04 5.56.01 7.91 3.64 5.66 8.75-8.33 18.96-16.71 37.9-24.98 56.89-4.98 11.43 8.08 12.49 11.28 5.33.04-.08 27.89-63.33 32.19-73.16 2.02-4.61 5.44-6.51 10.35-6.5 26.43.05 52.86 0 79.29.05 12.44.02 13.93-13.65 3.9-13.64-25.26.03-50.52.02-75.78.02-6.27 0-7.84-2.47-5.27-8.27 5.78-13.06 11.59-26.11 17.3-39.21 1.73-3.96 4.52-5.79 8.84-5.78 23.09.06 25.98.02 130.78.03 6.08-.01 8.03 2.79 5.62 8.27z"]
};
var faRendact = faWpressr;
var faAngellist = {
  prefix: 'fab',
  iconName: 'angellist',
  icon: [448, 512, [], "f209", "M347.1 215.4c11.7-32.6 45.4-126.9 45.4-157.1 0-26.6-15.7-48.9-43.7-48.9-44.6 0-84.6 131.7-97.1 163.1C242 144 196.6 0 156.6 0c-31.1 0-45.7 22.9-45.7 51.7 0 35.3 34.2 126.8 46.6 162-6.3-2.3-13.1-4.3-20-4.3-23.4 0-48.3 29.1-48.3 52.6 0 8.9 4.9 21.4 8 29.7-36.9 10-51.1 34.6-51.1 71.7C46 435.6 114.4 512 210.6 512c118 0 191.4-88.6 191.4-202.9 0-43.1-6.9-82-54.9-93.7zM311.7 108c4-12.3 21.1-64.3 37.1-64.3 8.6 0 10.9 8.9 10.9 16 0 19.1-38.6 124.6-47.1 148l-34-6 33.1-93.7zM142.3 48.3c0-11.9 14.5-45.7 46.3 47.1l34.6 100.3c-15.6-1.3-27.7-3-35.4 1.4-10.9-28.8-45.5-119.7-45.5-148.8zM140 244c29.3 0 67.1 94.6 67.1 107.4 0 5.1-4.9 11.4-10.6 11.4-20.9 0-76.9-76.9-76.9-97.7.1-7.7 12.7-21.1 20.4-21.1zm184.3 186.3c-29.1 32-66.3 48.6-109.7 48.6-59.4 0-106.3-32.6-128.9-88.3-17.1-43.4 3.8-68.3 20.6-68.3 11.4 0 54.3 60.3 54.3 73.1 0 4.9-7.7 8.3-11.7 8.3-16.1 0-22.4-15.5-51.1-51.4-29.7 29.7 20.5 86.9 58.3 86.9 26.1 0 43.1-24.2 38-42 3.7 0 8.3.3 11.7-.6 1.1 27.1 9.1 59.4 41.7 61.7 0-.9 2-7.1 2-7.4 0-17.4-10.6-32.6-10.6-50.3 0-28.3 21.7-55.7 43.7-71.7 8-6 17.7-9.7 27.1-13.1 9.7-3.7 20-8 27.4-15.4-1.1-11.2-5.7-21.1-16.9-21.1-27.7 0-120.6 4-120.6-39.7 0-6.7.1-13.1 17.4-13.1 32.3 0 114.3 8 138.3 29.1 18.1 16.1 24.3 113.2-31 174.7zm-98.6-126c9.7 3.1 19.7 4 29.7 6-7.4 5.4-14 12-20.3 19.1-2.8-8.5-6.2-16.8-9.4-25.1z"]
};
var faGalacticRepublic = {
  prefix: 'fab',
  iconName: 'galactic-republic',
  icon: [496, 512, [], "f50c", "M248 504C111.25 504 0 392.75 0 256S111.25 8 248 8s248 111.25 248 248-111.25 248-248 248zm0-479.47C120.37 24.53 16.53 128.37 16.53 256S120.37 487.47 248 487.47 479.47 383.63 479.47 256 375.63 24.53 248 24.53zm27.62 21.81v24.62a185.933 185.933 0 0 1 83.57 34.54l17.39-17.36c-28.75-22.06-63.3-36.89-100.96-41.8zm-55.37.07c-37.64 4.94-72.16 19.8-100.88 41.85l17.28 17.36h.08c24.07-17.84 52.55-30.06 83.52-34.67V46.41zm12.25 50.17v82.87c-10.04 2.03-19.42 5.94-27.67 11.42l-58.62-58.59-21.93 21.93 58.67 58.67c-5.47 8.23-9.45 17.59-11.47 27.62h-82.9v31h82.9c2.02 10.02 6.01 19.31 11.47 27.54l-58.67 58.69 21.93 21.93 58.62-58.62a77.873 77.873 0 0 0 27.67 11.47v82.9h31v-82.9c10.05-2.03 19.37-6.06 27.62-11.55l58.67 58.69 21.93-21.93-58.67-58.69c5.46-8.23 9.47-17.52 11.5-27.54h82.87v-31h-82.87c-2.02-10.02-6.03-19.38-11.5-27.62l58.67-58.67-21.93-21.93-58.67 58.67c-8.25-5.49-17.57-9.47-27.62-11.5V96.58h-31zm183.24 30.72l-17.36 17.36a186.337 186.337 0 0 1 34.67 83.67h24.62c-4.95-37.69-19.83-72.29-41.93-101.03zm-335.55.13c-22.06 28.72-36.91 63.26-41.85 100.91h24.65c4.6-30.96 16.76-59.45 34.59-83.52l-17.39-17.39zM38.34 283.67c4.92 37.64 19.75 72.18 41.8 100.9l17.36-17.39c-17.81-24.07-29.92-52.57-34.51-83.52H38.34zm394.7 0c-4.61 30.99-16.8 59.5-34.67 83.6l17.36 17.36c22.08-28.74 36.98-63.29 41.93-100.96h-24.62zM136.66 406.38l-17.36 17.36c28.73 22.09 63.3 36.98 100.96 41.93v-24.64c-30.99-4.63-59.53-16.79-83.6-34.65zm222.53.05c-24.09 17.84-52.58 30.08-83.57 34.67v24.57c37.67-4.92 72.21-19.79 100.96-41.85l-17.31-17.39h-.08z"]
};
var faNfcDirectional = {
  prefix: 'fab',
  iconName: 'nfc-directional',
  icon: [512, 512, [], "e530", "M211.8 488.6C213.4 491.1 213.9 494.2 213.2 497.1C212.6 500 210.8 502.6 208.3 504.2C205.7 505.8 202.7 506.3 199.7 505.7C138.3 491.8 84.1 455.8 47.53 404.5C10.97 353.2-5.395 290.3 1.57 227.7C8.536 165 38.34 107.2 85.29 65.21C132.2 23.2 193-.0131 256 0C257.5 0 258.1 .2931 260.3 .8627C261.7 1.432 262.1 2.267 264 3.319C265.1 4.371 265.9 5.619 266.5 6.993C267 8.367 267.3 9.839 267.3 11.32V112.3L291.8 86.39C292.8 85.31 294 84.44 295.4 83.84C296.7 83.23 298.2 82.9 299.7 82.86C301.2 82.81 302.6 83.06 304 83.59C305.4 84.12 306.7 84.92 307.8 85.94C308.8 86.96 309.7 88.18 310.3 89.54C310.9 90.89 311.3 92.35 311.3 93.84C311.3 95.32 311.1 96.8 310.6 98.18C310 99.57 309.2 100.8 308.2 101.9L264.2 148.5C263.1 149.6 261.9 150.5 260.5 151.1C259 151.7 257.5 152 255.1 152C254.5 152 252.9 151.7 251.5 151.1C250.1 150.5 248.8 149.6 247.8 148.5L203.7 101.9C201.7 99.74 200.6 96.83 200.7 93.84C200.7 90.84 202 87.1 204.2 85.94C206.4 83.88 209.3 82.77 212.3 82.86C215.3 82.94 218.1 84.21 220.2 86.39L244.7 112.4V22.89C188.3 25.64 134.9 48.73 94.23 87.87C53.58 127 28.49 179.6 23.61 235.8C18.73 292 34.38 348.1 67.68 393.7C100.1 439.2 149.7 471.2 204.7 483.6C207.6 484.3 210.2 486.1 211.8 488.6L211.8 488.6zM171.4 126.1C170.6 127.4 169.5 128.5 168.3 129.3C147.8 143.2 131.1 161.9 119.5 183.8C107.9 205.7 101.8 230.1 101.8 254.9C101.8 279.7 107.9 304.1 119.5 325.1C131.1 347.9 147.8 366.6 168.3 380.5C170.8 382.2 172.5 384.8 173 387.8C173.6 390.7 172.1 393.8 171.3 396.2C169.6 398.7 166.1 400.4 164 400.1C161.1 401.5 158 400.9 155.6 399.2C132 383.2 112.8 361.7 99.46 336.5C86.15 311.4 79.19 283.4 79.19 254.9C79.19 226.5 86.15 198.4 99.46 173.3C112.8 148.1 132 126.6 155.6 110.6C156.8 109.8 158.2 109.2 159.6 108.8C161.1 108.5 162.6 108.5 164.1 108.8C165.5 109 166.9 109.6 168.2 110.4C169.5 111.2 170.5 112.3 171.4 113.5C172.2 114.7 172.8 116.1 173.1 117.6C173.4 119.1 173.4 120.6 173.1 122C172.8 123.5 172.3 124.9 171.4 126.1H171.4zM340.9 383.5C341.7 382.3 342.8 381.2 343.1 380.4V380.3C364.4 366.3 381.1 347.6 392.7 325.7C404.2 303.9 410.2 279.5 410.2 254.8C410.2 230.1 404.2 205.7 392.7 183.8C381.1 161.1 364.4 143.3 343.1 129.3C342.8 128.5 341.7 127.4 340.9 126.2C340.1 124.9 339.5 123.5 339.3 122.1C338.1 120.6 339 119.1 339.3 117.7C339.6 116.2 340.2 114.8 341 113.6C341.9 112.4 342.1 111.3 344.2 110.5C345.4 109.7 346.8 109.2 348.3 108.9C349.8 108.6 351.2 108.6 352.7 108.9C354.2 109.2 355.5 109.8 356.8 110.7C380.2 126.7 399.5 148.2 412.7 173.3C426 198.4 432.1 226.4 432.1 254.8C432.1 283.3 426 311.3 412.7 336.4C399.5 361.5 380.2 383 356.8 399C355.5 399.9 354.2 400.5 352.7 400.8C351.2 401.1 349.8 401.1 348.3 400.8C346.8 400.5 345.4 399.1 344.2 399.2C342.1 398.4 341.9 397.3 341 396.1C340.2 394.9 339.6 393.5 339.3 392C339 390.6 338.1 389.1 339.3 387.6C339.5 386.2 340.1 384.8 340.9 383.5V383.5zM312.3 6.307C368.5 19.04 418.7 50.28 455 95.01C485.4 132.6 504.6 178 510.3 226C515.9 274 507.9 322.7 487.1 366.3C466.2 409.9 433.5 446.8 392.6 472.6C351.7 498.3 304.4 512 256 512C254.5 512 253.1 511.7 251.7 511.1C250.3 510.6 249.1 509.7 248 508.7C246.1 507.6 246.1 506.4 245.6 505C245 503.6 244.7 502.2 244.7 500.7V401.5L220.2 427.5C218.1 429.7 215.3 430.1 212.3 431.1C209.3 431.2 206.4 430 204.2 427.1C202 425.9 200.7 423.1 200.7 420.1C200.6 417.1 201.7 414.2 203.7 412L247.8 365.4C249.1 363.2 252.9 362 255.1 362C259.1 362 262 363.2 264.2 365.4L308.2 412C310.3 414.2 311.4 417.1 311.3 420.1C311.2 423.1 309.9 425.9 307.8 427.1C305.6 430 302.7 431.2 299.7 431.1C296.7 430.1 293.8 429.7 291.8 427.5L267.3 401.6V489.1C323.7 486.3 377.1 463.3 417.8 424.1C458.5 384.1 483.6 332.4 488.5 276.2C493.3 219.1 477.7 163.9 444.4 118.3C411.1 72.75 362.4 40.79 307.4 28.36C305.9 28.03 304.6 27.42 303.3 26.57C302.1 25.71 301.1 24.63 300.3 23.37C299.5 22.12 298.1 20.72 298.7 19.26C298.5 17.8 298.5 16.3 298.8 14.85C299.2 13.41 299.8 12.04 300.6 10.82C301.5 9.61 302.6 8.577 303.8 7.784C305.1 6.99 306.5 6.451 307.9 6.198C309.4 5.945 310.9 5.982 312.3 6.307L312.3 6.307zM353.1 256.1C353.1 287.5 335.6 317.2 303.8 339.6C301.7 341.1 299 341.9 296.4 341.6C293.7 341.4 291.2 340.3 289.4 338.4L219.3 268.6C217.1 266.5 215.1 263.6 215.9 260.6C215.9 257.6 217.1 254.7 219.2 252.6C221.4 250.5 224.2 249.3 227.2 249.3C230.2 249.3 233.1 250.5 235.2 252.6L298.3 315.4C319.1 298.3 330.5 277.5 330.5 256.1C330.5 232.2 316.4 209.1 290.8 191C288.3 189.3 286.7 186.7 286.2 183.7C285.7 180.8 286.3 177.7 288.1 175.3C289.8 172.8 292.4 171.2 295.4 170.7C298.3 170.2 301.4 170.8 303.8 172.6C335.6 195 353.1 224.7 353.1 256.1V256.1zM216.7 341.5C213.7 342 210.7 341.3 208.2 339.6C176.5 317.2 158.1 287.5 158.1 256.1C158.1 224.7 176.5 195 208.2 172.6C210.4 171 213.1 170.3 215.7 170.5C218.4 170.8 220.8 171.9 222.7 173.8L292.8 243.6C294.9 245.7 296.1 248.6 296.1 251.6C296.1 254.6 294.1 257.4 292.8 259.6C290.7 261.7 287.8 262.9 284.9 262.9C281.9 262.9 278.1 261.7 276.9 259.6L213.8 196.7C192.9 214 181.6 234.7 181.6 256.1C181.6 279.1 195.7 303.1 221.3 321.1C223.7 322.9 225.4 325.5 225.9 328.5C226.4 331.4 225.7 334.4 224 336.9C222.3 339.3 219.6 341 216.7 341.5L216.7 341.5z"]
};
var faSkype = {
  prefix: 'fab',
  iconName: 'skype',
  icon: [448, 512, [], "f17e", "M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"]
};
var faJoget = {
  prefix: 'fab',
  iconName: 'joget',
  icon: [496, 512, [], "f3b7", "M378.1 45C337.6 19.9 292.6 8 248.2 8 165 8 83.8 49.9 36.9 125.9c-71.9 116.6-35.6 269.3 81 341.2s269.3 35.6 341.2-80.9c71.9-116.6 35.6-269.4-81-341.2zm51.8 323.2c-40.4 65.5-110.4 101.5-182 101.5-6.8 0-13.6-.4-20.4-1-9-13.6-19.9-33.3-23.7-42.4-5.7-13.7-27.2-45.6 31.2-67.1 51.7-19.1 176.7-16.5 208.8-17.6-4 9-8.6 17.9-13.9 26.6zm-200.8-86.3c-55.5-1.4-81.7-20.8-58.5-48.2s51.1-40.7 68.9-51.2c17.9-10.5 27.3-33.7-23.6-29.7C87.3 161.5 48.6 252.1 37.6 293c-8.8-49.7-.1-102.7 28.5-149.1C128 43.4 259.6 12.2 360.1 74.1c74.8 46.1 111.2 130.9 99.3 212.7-24.9-.5-179.3-3.6-230.3-4.9zm183.8-54.8c-22.7-6-57 11.3-86.7 27.2-29.7 15.8-31.1 8.2-31.1 8.2s40.2-28.1 50.7-34.5 31.9-14 13.4-24.6c-3.2-1.8-6.7-2.7-10.4-2.7-17.8 0-41.5 18.7-67.5 35.6-31.5 20.5-65.3 31.3-65.3 31.3l169.5-1.6 46.5-23.4s3.6-9.5-19.1-15.5z"]
};
var faFedora = {
  prefix: 'fab',
  iconName: 'fedora',
  icon: [448, 512, [], "f798", "M.0413 255.8C.1219 132.2 100.3 32 224 32C347.7 32 448 132.3 448 256C448 379.7 347.8 479.9 224.1 480H50.93C22.84 480 .0832 457.3 .0416 429.2H0V255.8H.0413zM342.6 192.7C342.6 153 307 124.2 269.4 124.2C234.5 124.2 203.6 150.5 199.3 184.1C199.1 187.9 198.9 189.1 198.9 192.6C198.8 213.7 198.9 235.4 198.1 257C199 283.1 199.1 309.1 198.1 333.6C198.1 360.7 178.7 379.1 153.4 379.1C128.1 379.1 107.6 358.9 107.6 333.6C108.1 305.9 130.2 288.3 156.1 287.5H156.3L182.6 287.3V250L156.3 250.2C109.2 249.8 71.72 286.7 70.36 333.6C70.36 379.2 107.9 416.5 153.4 416.5C196.4 416.5 232.1 382.9 236 340.9L236.2 287.4L268.8 287.1C294.1 287.3 293.8 249.3 268.6 249.8L236.2 250.1C236.2 243.7 236.3 237.3 236.3 230.9C236.4 218.2 236.4 205.5 236.2 192.7C236.3 176.2 252 161.5 269.4 161.5C286.9 161.5 305.3 170.2 305.3 192.7C305.3 195.9 305.2 197.8 305 199C303.1 209.5 310.2 219.4 320.7 220.9C331.3 222.4 340.9 214.8 341.9 204.3C342.5 200.1 342.6 196.4 342.6 192.7H342.6z"]
};
var faStripeS = {
  prefix: 'fab',
  iconName: 'stripe-s',
  icon: [384, 512, [], "f42a", "M155.3 154.6c0-22.3 18.6-30.9 48.4-30.9 43.4 0 98.5 13.3 141.9 36.7V26.1C298.3 7.2 251.1 0 203.8 0 88.1 0 11 60.4 11 161.4c0 157.9 216.8 132.3 216.8 200.4 0 26.4-22.9 34.9-54.7 34.9-47.2 0-108.2-19.5-156.1-45.5v128.5a396.09 396.09 0 0 0 156 32.4c118.6 0 200.3-51 200.3-153.6 0-170.2-218-139.7-218-203.9z"]
};
var faMeta = {
  prefix: 'fab',
  iconName: 'meta',
  icon: [640, 512, [], "e49b", "M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.42 466.4 0 409.1 0 320.5C0 177.5 79.78 42.4 183.9 42.4C234.1 42.4 277.7 67.08 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.22 217.8 69.22 321.7C69.22 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.08 454.9 97.08C421.7 97.08 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"]
};
var faLaravel = {
  prefix: 'fab',
  iconName: 'laravel',
  icon: [512, 512, [], "f3bd", "M504.4,115.83a5.72,5.72,0,0,0-.28-.68,8.52,8.52,0,0,0-.53-1.25,6,6,0,0,0-.54-.71,9.36,9.36,0,0,0-.72-.94c-.23-.22-.52-.4-.77-.6a8.84,8.84,0,0,0-.9-.68L404.4,55.55a8,8,0,0,0-8,0L300.12,111h0a8.07,8.07,0,0,0-.88.69,7.68,7.68,0,0,0-.78.6,8.23,8.23,0,0,0-.72.93c-.17.24-.39.45-.54.71a9.7,9.7,0,0,0-.52,1.25c-.08.23-.21.44-.28.68a8.08,8.08,0,0,0-.28,2.08V223.18l-80.22,46.19V63.44a7.8,7.8,0,0,0-.28-2.09c-.06-.24-.2-.45-.28-.68a8.35,8.35,0,0,0-.52-1.24c-.14-.26-.37-.47-.54-.72a9.36,9.36,0,0,0-.72-.94,9.46,9.46,0,0,0-.78-.6,9.8,9.8,0,0,0-.88-.68h0L115.61,1.07a8,8,0,0,0-8,0L11.34,56.49h0a6.52,6.52,0,0,0-.88.69,7.81,7.81,0,0,0-.79.6,8.15,8.15,0,0,0-.71.93c-.18.25-.4.46-.55.72a7.88,7.88,0,0,0-.51,1.24,6.46,6.46,0,0,0-.29.67,8.18,8.18,0,0,0-.28,2.1v329.7a8,8,0,0,0,4,6.95l192.5,110.84a8.83,8.83,0,0,0,1.33.54c.21.08.41.2.63.26a7.92,7.92,0,0,0,4.1,0c.2-.05.37-.16.55-.22a8.6,8.6,0,0,0,1.4-.58L404.4,400.09a8,8,0,0,0,4-6.95V287.88l92.24-53.11a8,8,0,0,0,4-7V117.92A8.63,8.63,0,0,0,504.4,115.83ZM111.6,17.28h0l80.19,46.15-80.2,46.18L31.41,63.44Zm88.25,60V278.6l-46.53,26.79-33.69,19.4V123.5l46.53-26.79Zm0,412.78L23.37,388.5V77.32L57.06,96.7l46.52,26.8V338.68a6.94,6.94,0,0,0,.12.9,8,8,0,0,0,.16,1.18h0a5.92,5.92,0,0,0,.38.9,6.38,6.38,0,0,0,.42,1v0a8.54,8.54,0,0,0,.6.78,7.62,7.62,0,0,0,.66.84l0,0c.23.22.52.38.77.58a8.93,8.93,0,0,0,.86.66l0,0,0,0,92.19,52.18Zm8-106.17-80.06-45.32,84.09-48.41,92.26-53.11,80.13,46.13-58.8,33.56Zm184.52,4.57L215.88,490.11V397.8L346.6,323.2l45.77-26.15Zm0-119.13L358.68,250l-46.53-26.79V131.79l33.69,19.4L392.37,178Zm8-105.28-80.2-46.17,80.2-46.16,80.18,46.15Zm8,105.28V178L455,151.19l33.68-19.4v91.39h0Z"]
};
var faHotjar = {
  prefix: 'fab',
  iconName: 'hotjar',
  icon: [448, 512, [], "f3b1", "M414.9 161.5C340.2 29 121.1 0 121.1 0S222.2 110.4 93 197.7C11.3 252.8-21 324.4 14 402.6c26.8 59.9 83.5 84.3 144.6 93.4-29.2-55.1-6.6-122.4-4.1-129.6 57.1 86.4 165 0 110.8-93.9 71 15.4 81.6 138.6 27.1 215.5 80.5-25.3 134.1-88.9 148.8-145.6 15.5-59.3 3.7-127.9-26.3-180.9z"]
};
var faBluetoothB = {
  prefix: 'fab',
  iconName: 'bluetooth-b',
  icon: [320, 512, [], "f294", "M196.48 260.023l92.626-103.333L143.125 0v206.33l-86.111-86.111-31.406 31.405 108.061 108.399L25.608 368.422l31.406 31.405 86.111-86.111L145.84 512l148.552-148.644-97.912-103.333zm40.86-102.996l-49.977 49.978-.338-100.295 50.315 50.317zM187.363 313.04l49.977 49.978-50.315 50.316.338-100.294z"]
};
var faStickerMule = {
  prefix: 'fab',
  iconName: 'sticker-mule',
  icon: [576, 512, [], "f3f7", "M561.7 199.6c-1.3.3.3 0 0 0zm-6.2-77.4c-7.7-22.3-5.1-7.2-13.4-36.9-1.6-6.5-3.6-14.5-6.2-20-4.4-8.7-4.6-7.5-4.6-9.5 0-5.3 30.7-45.3 19-46.9-5.7-.6-12.2 11.6-20.6 17-8.6 4.2-8 5-10.3 5-2.6 0-5.7-3-6.2-5-2-5.7 1.9-25.9-3.6-25.9-3.6 0-12.3 24.8-17 25.8-5.2 1.3-27.9-11.4-75.1 18-25.3 13.2-86.9 65.2-87 65.3-6.7 4.7-20 4.7-35.5 16-44.4 30.1-109.6 9.4-110.7 9-110.6-26.8-128-15.2-159 11.5-20.8 17.9-23.7 36.5-24.2 38.9-4.2 20.4 5.2 48.3 6.7 64.3 1.8 19.3-2.7 17.7 7.7 98.3.5 1 4.1 0 5.1 1.5 0 8.4-3.8 12.1-4.1 13-1.5 4.5-1.5 10.5 0 16 2.3 8.2 8.2 37.2 8.2 46.9 0 41.8.4 44 2.6 49.4 3.9 10 12.5 9.1 17 12 3.1 3.5-.5 8.5 1 12.5.5 2 3.6 4 6.2 5 9.2 3.6 27 .3 29.9-2.5 1.6-1.5.5-4.5 3.1-5 5.1 0 10.8-.5 14.4-2.5 5.1-2.5 4.1-6 1.5-10.5-.4-.8-7-13.3-9.8-16-2.1-2-5.1-3-7.2-4.5-5.8-4.9-10.3-19.4-10.3-19.5-4.6-19.4-10.3-46.3-4.1-66.8 4.6-17.2 39.5-87.7 39.6-87.8 4.1-6.5 17-11.5 27.3-7 6 1.9 19.3 22 65.4 30.9 47.9 8.7 97.4-2 112.2-2 2.8 2-1.9 13-.5 38.9 0 26.4-.4 13.7-4.1 29.9-2.2 9.7 3.4 23.2-1.5 46.9-1.4 9.8-9.9 32.7-8.2 43.4.5 1 1 2 1.5 3.5.5 4.5 1.5 8.5 4.6 10 7.3 3.6 12-3.5 9.8 11.5-.7 3.1-2.6 12 1.5 15 4.4 3.7 30.6 3.4 36.5.5 2.6-1.5 1.6-4.5 6.4-7.4 1.9-.9 11.3-.4 11.3-6.5.3-1.8-9.2-19.9-9.3-20-2.6-3.5-9.2-4.5-11.3-8-6.9-10.1-1.7-52.6.5-59.4 3-11 5.6-22.4 8.7-32.4 11-42.5 10.3-50.6 16.5-68.3.8-1.8 6.4-23.1 10.3-29.9 9.3-17 21.7-32.4 33.5-47.4 18-22.9 34-46.9 52-69.8 6.1-7 8.2-13.7 18-8 10.8 5.7 21.6 7 31.9 17 14.6 12.8 10.2 18.2 11.8 22.9 1.5 5 7.7 10.5 14.9 9.5 10.4-2 13-2.5 13.4-2.5 2.6-.5 5.7-5 7.2-8 3.1-5.5 7.2-9 7.2-16.5 0-7.7-.4-2.8-20.6-52.9z"]
};
var faCreativeCommonsZero = {
  prefix: 'fab',
  iconName: 'creative-commons-zero',
  icon: [496, 512, [], "f4f3", "M247.6 8C389.4 8 496 118.1 496 256c0 147.1-118.5 248-248.4 248C113.6 504 0 394.5 0 256 0 123.1 104.7 8 247.6 8zm.8 44.7C130.2 52.7 44.7 150.6 44.7 256c0 109.8 91.2 202.8 203.7 202.8 103.2 0 202.8-81.1 202.8-202.8.1-113.8-90.2-203.3-202.8-203.3zm-.4 60.5c-81.9 0-102.5 77.3-102.5 142.8 0 65.5 20.6 142.8 102.5 142.8S350.5 321.5 350.5 256c0-65.5-20.6-142.8-102.5-142.8zm0 53.9c3.3 0 6.4.5 9.2 1.2 5.9 5.1 8.8 12.1 3.1 21.9l-54.5 100.2c-1.7-12.7-1.9-25.1-1.9-34.4 0-28.8 2-88.9 44.1-88.9zm40.8 46.2c2.9 15.4 3.3 31.4 3.3 42.7 0 28.9-2 88.9-44.1 88.9-13.5 0-32.6-7.7-20.1-26.4l60.9-105.2z"]
};
var faHips = {
  prefix: 'fab',
  iconName: 'hips',
  icon: [640, 512, [], "f452", "M251.6 157.6c0-1.9-.9-2.8-2.8-2.8h-40.9c-1.6 0-2.7 1.4-2.7 2.8v201.8c0 1.4 1.1 2.8 2.7 2.8h40.9c1.9 0 2.8-.9 2.8-2.8zM156.5 168c-16.1-11.8-36.3-17.9-60.3-18-18.1-.1-34.6 3.7-49.8 11.4V80.2c0-1.8-.9-2.7-2.8-2.7H2.7c-1.8 0-2.7.9-2.7 2.7v279.2c0 1.9.9 2.8 2.7 2.8h41c1.9 0 2.8-.9 2.8-2.8V223.3c0-.8-2.8-27 45.8-27 48.5 0 45.8 26.1 45.8 27v122.6c0 9 7.3 16.3 16.4 16.3h27.3c1.8 0 2.7-.9 2.7-2.8V223.3c0-23.4-9.3-41.8-28-55.3zm478.4 110.1c-6.8-15.7-18.4-27-34.9-34.1l-57.6-25.3c-8.6-3.6-9.2-11.2-2.6-16.1 7.4-5.5 44.3-13.9 84 6.8 1.7 1 4-.3 4-2.4v-44.7c0-1.3-.6-2.1-1.9-2.6-17.7-6.6-36.1-9.9-55.1-9.9-26.5 0-45.3 5.8-58.5 15.4-.5.4-28.4 20-22.7 53.7 3.4 19.6 15.8 34.2 37.2 43.6l53.6 23.5c11.6 5.1 15.2 13.3 12.2 21.2-3.7 9.1-13.2 13.6-36.5 13.6-24.3 0-44.7-8.9-58.4-19.1-2.1-1.4-4.4.2-4.4 2.3v34.4c0 10.4 4.9 17.3 14.6 20.7 15.6 5.5 31.6 8.2 48.2 8.2 12.7 0 25.8-1.2 36.3-4.3.7-.3 36-8.9 45.6-45.8 3.5-13.5 2.4-26.5-3.1-39.1zM376.2 149.8c-31.7 0-104.2 20.1-104.2 103.5v183.5c0 .8.6 2.7 2.7 2.7h40.9c1.9 0 2.8-.9 2.8-2.7V348c16.5 12.7 35.8 19.1 57.7 19.1 60.5 0 108.7-48.5 108.7-108.7.1-60.3-48.2-108.6-108.6-108.6zm0 170.9c-17.2 0-31.9-6.1-44-18.2-12.2-12.2-18.2-26.8-18.2-44 0-34.5 27.6-62.2 62.2-62.2 34.5 0 62.2 27.6 62.2 62.2.1 34.3-27.3 62.2-62.2 62.2zM228.3 72.5c-15.9 0-28.8 12.9-28.9 28.9 0 15.6 12.7 28.9 28.9 28.9s28.9-13.1 28.9-28.9c0-16.2-13-28.9-28.9-28.9z"]
};
var faBehance = {
  prefix: 'fab',
  iconName: 'behance',
  icon: [576, 512, [], "f1b4", "M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"]
};
var faReddit = {
  prefix: 'fab',
  iconName: 'reddit',
  icon: [512, 512, [], "f1a1", "M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"]
};
var faDiscord = {
  prefix: 'fab',
  iconName: 'discord',
  icon: [640, 512, [], "f392", "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"]
};
var faChrome = {
  prefix: 'fab',
  iconName: 'chrome',
  icon: [512, 512, [], "f268", "M0 256C0 209.4 12.47 165.6 34.27 127.1L144.1 318.3C166 357.5 207.9 384 256 384C270.3 384 283.1 381.7 296.8 377.4L220.5 509.6C95.9 492.3 0 385.3 0 256zM365.1 321.6C377.4 302.4 384 279.1 384 256C384 217.8 367.2 183.5 340.7 160H493.4C505.4 189.6 512 222.1 512 256C512 397.4 397.4 511.1 256 512L365.1 321.6zM477.8 128H256C193.1 128 142.3 172.1 130.5 230.7L54.19 98.47C101 38.53 174 0 256 0C350.8 0 433.5 51.48 477.8 128V128zM168 256C168 207.4 207.4 168 256 168C304.6 168 344 207.4 344 256C344 304.6 304.6 344 256 344C207.4 344 168 304.6 168 256z"]
};
var faAppStoreIos = {
  prefix: 'fab',
  iconName: 'app-store-ios',
  icon: [448, 512, [], "f370", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z"]
};
var faCcDiscover = {
  prefix: 'fab',
  iconName: 'cc-discover',
  icon: [576, 512, [], "f1f2", "M520.4 196.1c0-7.9-5.5-12.1-15.6-12.1h-4.9v24.9h4.7c10.3 0 15.8-4.4 15.8-12.8zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-44.1 138.9c22.6 0 52.9-4.1 52.9 24.4 0 12.6-6.6 20.7-18.7 23.2l25.8 34.4h-19.6l-22.2-32.8h-2.2v32.8h-16zm-55.9.1h45.3v14H444v18.2h28.3V217H444v22.2h29.3V253H428zm-68.7 0l21.9 55.2 22.2-55.2h17.5l-35.5 84.2h-8.6l-35-84.2zm-55.9-3c24.7 0 44.6 20 44.6 44.6 0 24.7-20 44.6-44.6 44.6-24.7 0-44.6-20-44.6-44.6 0-24.7 20-44.6 44.6-44.6zm-49.3 6.1v19c-20.1-20.1-46.8-4.7-46.8 19 0 25 27.5 38.5 46.8 19.2v19c-29.7 14.3-63.3-5.7-63.3-38.2 0-31.2 33.1-53 63.3-38zm-97.2 66.3c11.4 0 22.4-15.3-3.3-24.4-15-5.5-20.2-11.4-20.2-22.7 0-23.2 30.6-31.4 49.7-14.3l-8.4 10.8c-10.4-11.6-24.9-6.2-24.9 2.5 0 4.4 2.7 6.9 12.3 10.3 18.2 6.6 23.6 12.5 23.6 25.6 0 29.5-38.8 37.4-56.6 11.3l10.3-9.9c3.7 7.1 9.9 10.8 17.5 10.8zM55.4 253H32v-82h23.4c26.1 0 44.1 17 44.1 41.1 0 18.5-13.2 40.9-44.1 40.9zm67.5 0h-16v-82h16zM544 433c0 8.2-6.8 15-15 15H128c189.6-35.6 382.7-139.2 416-160zM74.1 191.6c-5.2-4.9-11.6-6.6-21.9-6.6H48v54.2h4.2c10.3 0 17-2 21.9-6.4 5.7-5.2 8.9-12.8 8.9-20.7s-3.2-15.5-8.9-20.5z"]
};
var faWpbeginner = {
  prefix: 'fab',
  iconName: 'wpbeginner',
  icon: [512, 512, [], "f297", "M462.799 322.374C519.01 386.682 466.961 480 370.944 480c-39.602 0-78.824-17.687-100.142-50.04-6.887.356-22.702.356-29.59 0C219.848 462.381 180.588 480 141.069 480c-95.49 0-148.348-92.996-91.855-157.626C-29.925 190.523 80.479 32 256.006 32c175.632 0 285.87 158.626 206.793 290.374zm-339.647-82.972h41.529v-58.075h-41.529v58.075zm217.18 86.072v-23.839c-60.506 20.915-132.355 9.198-187.589-33.971l.246 24.897c51.101 46.367 131.746 57.875 187.343 32.913zm-150.753-86.072h166.058v-58.075H189.579v58.075z"]
};
var faConfluence = {
  prefix: 'fab',
  iconName: 'confluence',
  icon: [512, 512, [], "f78d", "M2.3 412.2c-4.5 7.6-2.1 17.5 5.5 22.2l105.9 65.2c7.7 4.7 17.7 2.4 22.4-5.3 0-.1.1-.2.1-.2 67.1-112.2 80.5-95.9 280.9-.7 8.1 3.9 17.8.4 21.7-7.7.1-.1.1-.3.2-.4l50.4-114.1c3.6-8.1-.1-17.6-8.1-21.3-22.2-10.4-66.2-31.2-105.9-50.3C127.5 179 44.6 345.3 2.3 412.2zm507.4-312.1c4.5-7.6 2.1-17.5-5.5-22.2L398.4 12.8c-7.5-5-17.6-3.1-22.6 4.4-.2.3-.4.6-.6 1-67.3 112.6-81.1 95.6-280.6.9-8.1-3.9-17.8-.4-21.7 7.7-.1.1-.1.3-.2.4L22.2 141.3c-3.6 8.1.1 17.6 8.1 21.3 22.2 10.4 66.3 31.2 106 50.4 248 120 330.8-45.4 373.4-112.9z"]
};
var faMdb = {
  prefix: 'fab',
  iconName: 'mdb',
  icon: [576, 512, [], "f8ca", "M17.37 160.41L7 352h43.91l5.59-79.83L84.43 352h44.71l25.54-77.43 4.79 77.43H205l-12.79-191.59H146.7L106 277.74 63.67 160.41zm281 0h-47.9V352h47.9s95 .8 94.2-95.79c-.78-94.21-94.18-95.78-94.18-95.78zm-1.2 146.46V204.78s46 4.27 46.8 50.57-46.78 51.54-46.78 51.54zm238.29-74.24a56.16 56.16 0 0 0 8-38.31c-5.34-35.76-55.08-34.32-55.08-34.32h-51.9v191.58H482s87 4.79 87-63.85c0-43.14-33.52-55.08-33.52-55.08zm-51.9-31.94s13.57-1.59 16 9.59c1.43 6.66-4 12-4 12h-12v-21.57zm-.1 109.46l.1-24.92V267h.08s41.58-4.73 41.19 22.43c-.33 25.65-41.35 20.74-41.35 20.74z"]
};
var faDochub = {
  prefix: 'fab',
  iconName: 'dochub',
  icon: [416, 512, [], "f394", "M397.9 160H256V19.6L397.9 160zM304 192v130c0 66.8-36.5 100.1-113.3 100.1H96V84.8h94.7c12 0 23.1.8 33.1 2.5v-84C212.9 1.1 201.4 0 189.2 0H0v512h189.2C329.7 512 400 447.4 400 318.1V192h-96z"]
};
var faAccessibleIcon = {
  prefix: 'fab',
  iconName: 'accessible-icon',
  icon: [448, 512, [62107], "f368", "M423.9 255.8L411 413.1c-3.3 40.7-63.9 35.1-60.6-4.9l10-122.5-41.1 2.3c10.1 20.7 15.8 43.9 15.8 68.5 0 41.2-16.1 78.7-42.3 106.5l-39.3-39.3c57.9-63.7 13.1-167.2-74-167.2-25.9 0-49.5 9.9-67.2 26L73 243.2c22-20.7 50.1-35.1 81.4-40.2l75.3-85.7-42.6-24.8-51.6 46c-30 26.8-70.6-18.5-40.5-45.4l68-60.7c9.8-8.8 24.1-10.2 35.5-3.6 0 0 139.3 80.9 139.5 81.1 16.2 10.1 20.7 36 6.1 52.6L285.7 229l106.1-5.9c18.5-1.1 33.6 14.4 32.1 32.7zm-64.9-154c28.1 0 50.9-22.8 50.9-50.9C409.9 22.8 387.1 0 359 0c-28.1 0-50.9 22.8-50.9 50.9 0 28.1 22.8 50.9 50.9 50.9zM179.6 456.5c-80.6 0-127.4-90.6-82.7-156.1l-39.7-39.7C36.4 287 24 320.3 24 356.4c0 130.7 150.7 201.4 251.4 122.5l-39.7-39.7c-16 10.9-35.3 17.3-56.1 17.3z"]
};
var faEbay = {
  prefix: 'fab',
  iconName: 'ebay',
  icon: [640, 512, [], "f4f4", "M606 189.5l-54.8 109.9-54.9-109.9h-37.5l10.9 20.6c-11.5-19-35.9-26-63.3-26-31.8 0-67.9 8.7-71.5 43.1h33.7c1.4-13.8 15.7-21.8 35-21.8 26 0 41 9.6 41 33v3.4c-12.7 0-28 .1-41.7.4-42.4.9-69.6 10-76.7 34.4 1-5.2 1.5-10.6 1.5-16.2 0-52.1-39.7-76.2-75.4-76.2-21.3 0-43 5.5-58.7 24.2v-80.6h-32.1v169.5c0 10.3-.6 22.9-1.1 33.1h31.5c.7-6.3 1.1-12.9 1.1-19.5 13.6 16.6 35.4 24.9 58.7 24.9 36.9 0 64.9-21.9 73.3-54.2-.5 2.8-.7 5.8-.7 9 0 24.1 21.1 45 60.6 45 26.6 0 45.8-5.7 61.9-25.5 0 6.6.3 13.3 1.1 20.2h29.8c-.7-8.2-1-17.5-1-26.8v-65.6c0-9.3-1.7-17.2-4.8-23.8l61.5 116.1-28.5 54.1h35.9L640 189.5zM243.7 313.8c-29.6 0-50.2-21.5-50.2-53.8 0-32.4 20.6-53.8 50.2-53.8 29.8 0 50.2 21.4 50.2 53.8 0 32.3-20.4 53.8-50.2 53.8zm200.9-47.3c0 30-17.9 48.4-51.6 48.4-25.1 0-35-13.4-35-25.8 0-19.1 18.1-24.4 47.2-25.3 13.1-.5 27.6-.6 39.4-.6zm-411.9 1.6h128.8v-8.5c0-51.7-33.1-75.4-78.4-75.4-56.8 0-83 30.8-83 77.6 0 42.5 25.3 74 82.5 74 31.4 0 68-11.7 74.4-46.1h-33.1c-12 35.8-87.7 36.7-91.2-21.6zm95-21.4H33.3c6.9-56.6 92.1-54.7 94.4 0z"]
};
var faAmazon = {
  prefix: 'fab',
  iconName: 'amazon',
  icon: [448, 512, [], "f270", "M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"]
};
var faUnsplash = {
  prefix: 'fab',
  iconName: 'unsplash',
  icon: [448, 512, [], "e07c", "M448,230.17V480H0V230.17H141.13V355.09H306.87V230.17ZM306.87,32H141.13V156.91H306.87Z"]
};
var faYarn = {
  prefix: 'fab',
  iconName: 'yarn',
  icon: [496, 512, [], "f7e3", "M393.9 345.2c-39 9.3-48.4 32.1-104 47.4 0 0-2.7 4-10.4 5.8-13.4 3.3-63.9 6-68.5 6.1-12.4.1-19.9-3.2-22-8.2-6.4-15.3 9.2-22 9.2-22-8.1-5-9-9.9-9.8-8.1-2.4 5.8-3.6 20.1-10.1 26.5-8.8 8.9-25.5 5.9-35.3.8-10.8-5.7.8-19.2.8-19.2s-5.8 3.4-10.5-3.6c-6-9.3-17.1-37.3 11.5-62-1.3-10.1-4.6-53.7 40.6-85.6 0 0-20.6-22.8-12.9-43.3 5-13.4 7-13.3 8.6-13.9 5.7-2.2 11.3-4.6 15.4-9.1 20.6-22.2 46.8-18 46.8-18s12.4-37.8 23.9-30.4c3.5 2.3 16.3 30.6 16.3 30.6s13.6-7.9 15.1-5c8.2 16 9.2 46.5 5.6 65.1-6.1 30.6-21.4 47.1-27.6 57.5-1.4 2.4 16.5 10 27.8 41.3 10.4 28.6 1.1 52.7 2.8 55.3.8 1.4 13.7.8 36.4-13.2 12.8-7.9 28.1-16.9 45.4-17 16.7-.5 17.6 19.2 4.9 22.2zM496 256c0 136.9-111.1 248-248 248S0 392.9 0 256 111.1 8 248 8s248 111.1 248 248zm-79.3 75.2c-1.7-13.6-13.2-23-28-22.8-22 .3-40.5 11.7-52.8 19.2-4.8 3-8.9 5.2-12.4 6.8 3.1-44.5-22.5-73.1-28.7-79.4 7.8-11.3 18.4-27.8 23.4-53.2 4.3-21.7 3-55.5-6.9-74.5-1.6-3.1-7.4-11.2-21-7.4-9.7-20-13-22.1-15.6-23.8-1.1-.7-23.6-16.4-41.4 28-12.2.9-31.3 5.3-47.5 22.8-2 2.2-5.9 3.8-10.1 5.4h.1c-8.4 3-12.3 9.9-16.9 22.3-6.5 17.4.2 34.6 6.8 45.7-17.8 15.9-37 39.8-35.7 82.5-34 36-11.8 73-5.6 79.6-1.6 11.1 3.7 19.4 12 23.8 12.6 6.7 30.3 9.6 43.9 2.8 4.9 5.2 13.8 10.1 30 10.1 6.8 0 58-2.9 72.6-6.5 6.8-1.6 11.5-4.5 14.6-7.1 9.8-3.1 36.8-12.3 62.2-28.7 18-11.7 24.2-14.2 37.6-17.4 12.9-3.2 21-15.1 19.4-28.2z"]
};
var faSquareSteam = {
  prefix: 'fab',
  iconName: 'square-steam',
  icon: [448, 512, ["steam-square"], "f1b7", "M185.2 356.5c7.7-18.5-1-39.7-19.6-47.4l-29.5-12.2c11.4-4.3 24.3-4.5 36.4.5 12.2 5.1 21.6 14.6 26.7 26.7 5 12.2 5 25.6-.1 37.7-10.5 25.1-39.4 37-64.6 26.5-11.6-4.8-20.4-13.6-25.4-24.2l28.5 11.8c18.6 7.8 39.9-.9 47.6-19.4zM400 32H48C21.5 32 0 53.5 0 80v160.7l116.6 48.1c12-8.2 26.2-12.1 40.7-11.3l55.4-80.2v-1.1c0-48.2 39.3-87.5 87.6-87.5s87.6 39.3 87.6 87.5c0 49.2-40.9 88.7-89.6 87.5l-79 56.3c1.6 38.5-29.1 68.8-65.7 68.8-31.8 0-58.5-22.7-64.5-52.7L0 319.2V432c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-99.7 222.5c-32.2 0-58.4-26.1-58.4-58.3s26.2-58.3 58.4-58.3 58.4 26.2 58.4 58.3-26.2 58.3-58.4 58.3zm.1-14.6c24.2 0 43.9-19.6 43.9-43.8 0-24.2-19.6-43.8-43.9-43.8-24.2 0-43.9 19.6-43.9 43.8 0 24.2 19.7 43.8 43.9 43.8z"]
};
var faSteamSquare = faSquareSteam;
var fa500px = {
  prefix: 'fab',
  iconName: '500px',
  icon: [448, 512, [], "f26e", "M103.3 344.3c-6.5-14.2-6.9-18.3 7.4-23.1 25.6-8 8 9.2 43.2 49.2h.3v-93.9c1.2-50.2 44-92.2 97.7-92.2 53.9 0 97.7 43.5 97.7 96.8 0 63.4-60.8 113.2-128.5 93.3-10.5-4.2-2.1-31.7 8.5-28.6 53 0 89.4-10.1 89.4-64.4 0-61-77.1-89.6-116.9-44.6-23.5 26.4-17.6 42.1-17.6 157.6 50.7 31 118.3 22 160.4-20.1 24.8-24.8 38.5-58 38.5-93 0-35.2-13.8-68.2-38.8-93.3-24.8-24.8-57.8-38.5-93.3-38.5s-68.8 13.8-93.5 38.5c-.3.3-16 16.5-21.2 23.9l-.5.6c-3.3 4.7-6.3 9.1-20.1 6.1-6.9-1.7-14.3-5.8-14.3-11.8V20c0-5 3.9-10.5 10.5-10.5h241.3c8.3 0 8.3 11.6 8.3 15.1 0 3.9 0 15.1-8.3 15.1H130.3v132.9h.3c104.2-109.8 282.8-36 282.8 108.9 0 178.1-244.8 220.3-310.1 62.8zm63.3-260.8c-.5 4.2 4.6 24.5 14.6 20.6C306 56.6 384 144.5 390.6 144.5c4.8 0 22.8-15.3 14.3-22.8-93.2-89-234.5-57-238.3-38.2zM393 414.7C283 524.6 94 475.5 61 310.5c0-12.2-30.4-7.4-28.9 3.3 24 173.4 246 256.9 381.6 121.3 6.9-7.8-12.6-28.4-20.7-20.4zM213.6 306.6c0 4 4.3 7.3 5.5 8.5 3 3 6.1 4.4 8.5 4.4 3.8 0 2.6.2 22.3-19.5 19.6 19.3 19.1 19.5 22.3 19.5 5.4 0 18.5-10.4 10.7-18.2L265.6 284l18.2-18.2c6.3-6.8-10.1-21.8-16.2-15.7L249.7 268c-18.6-18.8-18.4-19.5-21.5-19.5-5 0-18 11.7-12.4 17.3L234 284c-18.1 17.9-20.4 19.2-20.4 22.6z"]
};
var faSquareVimeo = {
  prefix: 'fab',
  iconName: 'square-vimeo',
  icon: [448, 512, ["vimeo-square"], "f194", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-16.2 149.6c-1.4 31.1-23.2 73.8-65.3 127.9-43.5 56.5-80.3 84.8-110.4 84.8-18.7 0-34.4-17.2-47.3-51.6-25.2-92.3-35.9-146.4-56.7-146.4-2.4 0-10.8 5-25.1 15.1L64 192c36.9-32.4 72.1-68.4 94.1-70.4 24.9-2.4 40.2 14.6 46 51.1 20.5 129.6 29.6 149.2 66.8 90.5 13.4-21.2 20.6-37.2 21.5-48.3 3.4-32.8-25.6-30.6-45.2-22.2 15.7-51.5 45.8-76.5 90.1-75.1 32.9 1 48.4 22.4 46.5 64z"]
};
var faVimeoSquare = faSquareVimeo;
var faAsymmetrik = {
  prefix: 'fab',
  iconName: 'asymmetrik',
  icon: [576, 512, [], "f372", "M517.5 309.2c38.8-40 58.1-80 58.5-116.1.8-65.5-59.4-118.2-169.4-135C277.9 38.4 118.1 73.6 0 140.5 52 114 110.6 92.3 170.7 82.3c74.5-20.5 153-25.4 221.3-14.8C544.5 91.3 588.8 195 490.8 299.2c-10.2 10.8-22 21.1-35 30.6L304.9 103.4 114.7 388.9c-65.6-29.4-76.5-90.2-19.1-151.2 20.8-22.2 48.3-41.9 79.5-58.1 20-12.2 39.7-22.6 62-30.7-65.1 20.3-122.7 52.9-161.6 92.9-27.7 28.6-41.4 57.1-41.7 82.9-.5 35.1 23.4 65.1 68.4 83l-34.5 51.7h101.6l22-34.4c22.2 1 45.3 0 68.6-2.7l-22.8 37.1h135.5L340 406.3c18.6-5.3 36.9-11.5 54.5-18.7l45.9 71.8H542L468.6 349c18.5-12.1 35-25.5 48.9-39.8zm-187.6 80.5l-25-40.6-32.7 53.3c-23.4 3.5-46.7 5.1-69.2 4.4l101.9-159.3 78.7 123c-17.2 7.4-35.3 13.9-53.7 19.2z"]
};
var faFontAwesome = {
  prefix: 'fab',
  iconName: 'font-awesome',
  icon: [448, 512, [62501, 62694, "font-awesome-flag", "font-awesome-logo-full"], "f2b4", "M448 48V384C385 407 366 416 329 416C266 416 242 384 179 384C159 384 143 388 128 392V328C143 324 159 320 179 320C242 320 266 352 329 352C349 352 364 349 384 343V135C364 141 349 144 329 144C266 144 242 112 179 112C128 112 104 133 64 141V448C64 466 50 480 32 480S0 466 0 448V64C0 46 14 32 32 32S64 46 64 64V77C104 69 128 48 179 48C242 48 266 80 329 80C366 80 385 71 448 48Z"]
};
var faFontAwesomeFlag = faFontAwesome;
var faFontAwesomeLogoFull = faFontAwesome;
var faGratipay = {
  prefix: 'fab',
  iconName: 'gratipay',
  icon: [496, 512, [], "f184", "M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm114.6 226.4l-113 152.7-112.7-152.7c-8.7-11.9-19.1-50.4 13.6-72 28.1-18.1 54.6-4.2 68.5 11.9 15.9 17.9 46.6 16.9 61.7 0 13.9-16.1 40.4-30 68.1-11.9 32.9 21.6 22.6 60 13.8 72z"]
};
var faApple = {
  prefix: 'fab',
  iconName: 'apple',
  icon: [384, 512, [], "f179", "M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"]
};
var faHive = {
  prefix: 'fab',
  iconName: 'hive',
  icon: [512, 512, [], "e07f", "M260.353,254.878,131.538,33.1a2.208,2.208,0,0,0-3.829.009L.3,254.887A2.234,2.234,0,0,0,.3,257.122L129.116,478.9a2.208,2.208,0,0,0,3.83-.009L260.358,257.113A2.239,2.239,0,0,0,260.353,254.878Zm39.078-25.713a2.19,2.19,0,0,0,1.9,1.111h66.509a2.226,2.226,0,0,0,1.9-3.341L259.115,33.111a2.187,2.187,0,0,0-1.9-1.111H190.707a2.226,2.226,0,0,0-1.9,3.341ZM511.7,254.886,384.9,33.112A2.2,2.2,0,0,0,382.99,32h-66.6a2.226,2.226,0,0,0-1.906,3.34L440.652,256,314.481,476.66a2.226,2.226,0,0,0,1.906,3.34h66.6a2.2,2.2,0,0,0,1.906-1.112L511.7,257.114A2.243,2.243,0,0,0,511.7,254.886ZM366.016,284.917H299.508a2.187,2.187,0,0,0-1.9,1.111l-108.8,190.631a2.226,2.226,0,0,0,1.9,3.341h66.509a2.187,2.187,0,0,0,1.9-1.111l108.8-190.631A2.226,2.226,0,0,0,366.016,284.917Z"]
};
var faGitkraken = {
  prefix: 'fab',
  iconName: 'gitkraken',
  icon: [592, 512, [], "f3a6", "M565.7 118.1c-2.3-6.1-9.3-9.2-15.3-6.6-5.7 2.4-8.5 8.9-6.3 14.6 10.9 29 16.9 60.5 16.9 93.3 0 134.6-100.3 245.7-230.2 262.7V358.4c7.9-1.5 15.5-3.6 23-6.2v104c106.7-25.9 185.9-122.1 185.9-236.8 0-91.8-50.8-171.8-125.8-213.3-5.7-3.2-13-.9-15.9 5-2.7 5.5-.6 12.2 4.7 15.1 67.9 37.6 113.9 110 113.9 193.2 0 93.3-57.9 173.1-139.8 205.4v-92.2c14.2-4.5 24.9-17.7 24.9-33.5 0-13.1-6.8-24.4-17.3-30.5 8.3-79.5 44.5-58.6 44.5-83.9V170c0-38-87.9-161.8-129-164.7-2.5-.2-5-.2-7.6 0C251.1 8.3 163.2 132 163.2 170v14.8c0 25.3 36.3 4.3 44.5 83.9-10.6 6.1-17.3 17.4-17.3 30.5 0 15.8 10.6 29 24.8 33.5v92.2c-81.9-32.2-139.8-112-139.8-205.4 0-83.1 46-155.5 113.9-193.2 5.4-3 7.4-9.6 4.7-15.1-2.9-5.9-10.1-8.2-15.9-5-75 41.5-125.8 121.5-125.8 213.3 0 114.7 79.2 210.8 185.9 236.8v-104c7.6 2.5 15.1 4.6 23 6.2v123.7C131.4 465.2 31 354.1 31 219.5c0-32.8 6-64.3 16.9-93.3 2.2-5.8-.6-12.2-6.3-14.6-6-2.6-13 .4-15.3 6.6C14.5 149.7 8 183.8 8 219.5c0 155.1 122.6 281.6 276.3 287.8V361.4c6.8.4 15 .5 23.4 0v145.8C461.4 501.1 584 374.6 584 219.5c0-35.7-6.5-69.8-18.3-101.4zM365.9 275.5c13 0 23.7 10.5 23.7 23.7 0 13.1-10.6 23.7-23.7 23.7-13 0-23.7-10.5-23.7-23.7 0-13.1 10.6-23.7 23.7-23.7zm-139.8 47.3c-13.2 0-23.7-10.7-23.7-23.7s10.5-23.7 23.7-23.7c13.1 0 23.7 10.6 23.7 23.7 0 13-10.5 23.7-23.7 23.7z"]
};
var faKeybase = {
  prefix: 'fab',
  iconName: 'keybase',
  icon: [448, 512, [], "f4f5", "M286.17 419a18 18 0 1 0 18 18 18 18 0 0 0-18-18zm111.92-147.6c-9.5-14.62-39.37-52.45-87.26-73.71q-9.1-4.06-18.38-7.27a78.43 78.43 0 0 0-47.88-104.13c-12.41-4.1-23.33-6-32.41-5.77-.6-2-1.89-11 9.4-35L198.66 32l-5.48 7.56c-8.69 12.06-16.92 23.55-24.34 34.89a51 51 0 0 0-8.29-1.25c-41.53-2.45-39-2.33-41.06-2.33-50.61 0-50.75 52.12-50.75 45.88l-2.36 36.68c-1.61 27 19.75 50.21 47.63 51.85l8.93.54a214 214 0 0 0-46.29 35.54C14 304.66 14 374 14 429.77v33.64l23.32-29.8a148.6 148.6 0 0 0 14.56 37.56c5.78 10.13 14.87 9.45 19.64 7.33 4.21-1.87 10-6.92 3.75-20.11a178.29 178.29 0 0 1-15.76-53.13l46.82-59.83-24.66 74.11c58.23-42.4 157.38-61.76 236.25-38.59 34.2 10.05 67.45.69 84.74-23.84.72-1 1.2-2.16 1.85-3.22a156.09 156.09 0 0 1 2.8 28.43c0 23.3-3.69 52.93-14.88 81.64-2.52 6.46 1.76 14.5 8.6 15.74 7.42 1.57 15.33-3.1 18.37-11.15C429 443 434 414 434 382.32c0-38.58-13-77.46-35.91-110.92zM142.37 128.58l-15.7-.93-1.39 21.79 13.13.78a93 93 0 0 0 .32 19.57l-22.38-1.34a12.28 12.28 0 0 1-11.76-12.79L107 119c1-12.17 13.87-11.27 13.26-11.32l29.11 1.73a144.35 144.35 0 0 0-7 19.17zm148.42 172.18a10.51 10.51 0 0 1-14.35-1.39l-9.68-11.49-34.42 27a8.09 8.09 0 0 1-11.13-1.08l-15.78-18.64a7.38 7.38 0 0 1 1.34-10.34l34.57-27.18-14.14-16.74-17.09 13.45a7.75 7.75 0 0 1-10.59-1s-3.72-4.42-3.8-4.53a7.38 7.38 0 0 1 1.37-10.34L214 225.19s-18.51-22-18.6-22.14a9.56 9.56 0 0 1 1.74-13.42 10.38 10.38 0 0 1 14.3 1.37l81.09 96.32a9.58 9.58 0 0 1-1.74 13.44zM187.44 419a18 18 0 1 0 18 18 18 18 0 0 0-18-18z"]
};
var faApplePay = {
  prefix: 'fab',
  iconName: 'apple-pay',
  icon: [640, 512, [], "f415", "M116.9 158.5c-7.5 8.9-19.5 15.9-31.5 14.9-1.5-12 4.4-24.8 11.3-32.6 7.5-9.1 20.6-15.6 31.3-16.1 1.2 12.4-3.7 24.7-11.1 33.8m10.9 17.2c-17.4-1-32.3 9.9-40.5 9.9-8.4 0-21-9.4-34.8-9.1-17.9.3-34.5 10.4-43.6 26.5-18.8 32.3-4.9 80 13.3 106.3 8.9 13 19.5 27.3 33.5 26.8 13.3-.5 18.5-8.6 34.5-8.6 16.1 0 20.8 8.6 34.8 8.4 14.5-.3 23.6-13 32.5-26 10.1-14.8 14.3-29.1 14.5-29.9-.3-.3-28-10.9-28.3-42.9-.3-26.8 21.9-39.5 22.9-40.3-12.5-18.6-32-20.6-38.8-21.1m100.4-36.2v194.9h30.3v-66.6h41.9c38.3 0 65.1-26.3 65.1-64.3s-26.4-64-64.1-64h-73.2zm30.3 25.5h34.9c26.3 0 41.3 14 41.3 38.6s-15 38.8-41.4 38.8h-34.8V165zm162.2 170.9c19 0 36.6-9.6 44.6-24.9h.6v23.4h28v-97c0-28.1-22.5-46.3-57.1-46.3-32.1 0-55.9 18.4-56.8 43.6h27.3c2.3-12 13.4-19.9 28.6-19.9 18.5 0 28.9 8.6 28.9 24.5v10.8l-37.8 2.3c-35.1 2.1-54.1 16.5-54.1 41.5.1 25.2 19.7 42 47.8 42zm8.2-23.1c-16.1 0-26.4-7.8-26.4-19.6 0-12.3 9.9-19.4 28.8-20.5l33.6-2.1v11c0 18.2-15.5 31.2-36 31.2zm102.5 74.6c29.5 0 43.4-11.3 55.5-45.4L640 193h-30.8l-35.6 115.1h-.6L537.4 193h-31.6L557 334.9l-2.8 8.6c-4.6 14.6-12.1 20.3-25.5 20.3-2.4 0-7-.3-8.9-.5v23.4c1.8.4 9.3.7 11.6.7z"]
};
var faPadlet = {
  prefix: 'fab',
  iconName: 'padlet',
  icon: [640, 512, [], "e4a0", "M297.9 0L298 .001C305.6 .1078 312.4 4.72 315.5 11.78L447.5 320.3L447.8 320.2L448 320.6L445.2 330.6L402.3 488.6C398.6 504.8 382.6 514.9 366.5 511.2L298.1 495.6L229.6 511.2C213.5 51