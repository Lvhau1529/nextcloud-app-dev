/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/theming/src/helpers/getBackgroundUrl.js":
/*!******************************************************!*\
  !*** ./apps/theming/src/helpers/getBackgroundUrl.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBackgroundUrl": function() { return /* binding */ getBackgroundUrl; }
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/* harmony import */ var _prefixWithBaseUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prefixWithBaseUrl.js */ "./apps/theming/src/helpers/prefixWithBaseUrl.js");
/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Avior <florian.bouillon@delta-wings.net>
 * @author Julien Veyssier <eneiluj@posteo.net>
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */


var getBackgroundUrl = function getBackgroundUrl(background) {
  var _window$OCA, _window$OCA$Theming;

  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var themingDefaultBackground = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var enabledThemes = ((_window$OCA = window.OCA) === null || _window$OCA === void 0 ? void 0 : (_window$OCA$Theming = _window$OCA.Theming) === null || _window$OCA$Theming === void 0 ? void 0 : _window$OCA$Theming.enabledThemes) || [];
  var isDarkTheme = enabledThemes.length === 0 || enabledThemes[0] === 'default' ? window.matchMedia('(prefers-color-scheme: dark)').matches : enabledThemes.join('').indexOf('dark') !== -1;

  if (background === 'default') {
    if (themingDefaultBackground && themingDefaultBackground !== 'backgroundColor') {
      return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/image/background') + '?v=' + window.OCA.Theming.cacheBuster;
    }

    if (isDarkTheme) {
      return (0,_prefixWithBaseUrl_js__WEBPACK_IMPORTED_MODULE_1__.prefixWithBaseUrl)('eduardo-neves-pedra-azul.jpg');
    }

    return (0,_prefixWithBaseUrl_js__WEBPACK_IMPORTED_MODULE_1__.prefixWithBaseUrl)('kamil-porembinski-clouds.jpg');
  } else if (background === 'custom') {
    return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background') + '?v=' + time;
  }

  return (0,_prefixWithBaseUrl_js__WEBPACK_IMPORTED_MODULE_1__.prefixWithBaseUrl)(background);
};

/***/ }),

/***/ "./apps/theming/src/helpers/prefixWithBaseUrl.js":
/*!*******************************************************!*\
  !*** ./apps/theming/src/helpers/prefixWithBaseUrl.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefixWithBaseUrl": function() { return /* binding */ prefixWithBaseUrl; }
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

var prefixWithBaseUrl = function prefixWithBaseUrl(url) {
  return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateFilePath)('theming', '', 'img/background/') + url;
};

/***/ }),

/***/ "./apps/theming/src/settings.js":
/*!**************************************!*\
  !*** ./apps/theming/src/settings.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _UserThemes_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserThemes.vue */ "./apps/theming/src/UserThemes.vue");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

 // bind to window

vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.OC = OC;
vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.t = t;
var View = vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend(_UserThemes_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
var theming = new View();
theming.$mount('#theming');
theming.$on('update:background', function () {
  // Refresh server-side generated theming CSS
  _toConsumableArray(document.head.querySelectorAll('link.theme')).forEach(function (theme) {
    var url = new URL(theme.href);
    url.searchParams.set('v', Date.now());
    var newTheme = theme.cloneNode();
    newTheme.href = url.toString();

    newTheme.onload = function () {
      return theme.remove();
    };

    document.head.append(newTheme);
  });
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcCheckboxRadioSwitch */ "./node_modules/@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcSettingsSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcSettingsSection */ "./node_modules/@nextcloud/vue/dist/Components/NcSettingsSection.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcSettingsSection__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcSettingsSection__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_BackgroundSettings_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/BackgroundSettings.vue */ "./apps/theming/src/components/BackgroundSettings.vue");
/* harmony import */ var _components_ItemPreview_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/ItemPreview.vue */ "./apps/theming/src/components/ItemPreview.vue");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var availableThemes = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'themes', []);
var enforceTheme = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'enforceTheme', '');
var shortcutsDisabled = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'shortcutsDisabled', false);
var background = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'background');
var themingDefaultBackground = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'themingDefaultBackground');
var isUserThemingDisabled = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'isUserThemingDisabled');
console.debug('Available themes', availableThemes);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'UserThemes',
  components: {
    ItemPreview: _components_ItemPreview_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    NcCheckboxRadioSwitch: (_nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_3___default()),
    NcSettingsSection: (_nextcloud_vue_dist_Components_NcSettingsSection__WEBPACK_IMPORTED_MODULE_4___default()),
    BackgroundSettings: _components_BackgroundSettings_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  data: function data() {
    return {
      availableThemes: availableThemes,
      enforceTheme: enforceTheme,
      shortcutsDisabled: shortcutsDisabled,
      background: background,
      themingDefaultBackground: themingDefaultBackground,
      isUserThemingDisabled: isUserThemingDisabled
    };
  },
  computed: {
    themes: function themes() {
      return this.availableThemes.filter(function (theme) {
        return theme.type === 1;
      });
    },
    fonts: function fonts() {
      return this.availableThemes.filter(function (theme) {
        return theme.type === 2;
      });
    },
    // Selected theme, fallback on first (default) if none
    selectedTheme: function selectedTheme() {
      return this.themes.find(function (theme) {
        return theme.enabled === true;
      }) || this.themes[0];
    },
    description: function description() {
      // using the `t` replace method escape html, we have to do it manually :/
      return t('theming', 'Universal access is very important to us. We follow web standards and check to make everything usable also without mouse, and assistive software such as screenreaders. We aim to be compliant with the {guidelines}Web Content Accessibility Guidelines{linkend} 2.1 on AA level, with the high contrast theme even on AAA level.').replace('{guidelines}', this.guidelinesLink).replace('{linkend}', '</a>');
    },
    guidelinesLink: function guidelinesLink() {
      return '<a target="_blank" href="https://www.w3.org/WAI/standards-guidelines/wcag/" rel="noreferrer nofollow">';
    },
    descriptionDetail: function descriptionDetail() {
      return t('theming', 'If you find any issues, do not hesitate to report them on {issuetracker}our issue tracker{linkend}. And if you want to get involved, come join {designteam}our design team{linkend}!').replace('{issuetracker}', this.issuetrackerLink).replace('{designteam}', this.designteamLink).replace(/\{linkend\}/g, '</a>');
    },
    issuetrackerLink: function issuetrackerLink() {
      return '<a target="_blank" href="https://github.com/nextcloud/server/issues/" rel="noreferrer nofollow">';
    },
    designteamLink: function designteamLink() {
      return '<a target="_blank" href="https://nextcloud.com/design" rel="noreferrer nofollow">';
    }
  },
  watch: {
    shortcutsDisabled: function shortcutsDisabled(newState) {
      this.changeShortcutsDisabled(newState);
    }
  },
  methods: {
    updateBackground: function updateBackground(data) {
      this.background = data.type === 'custom' || data.type === 'default' ? data.type : data.value;
      this.$emit('update:background');
    },
    changeTheme: function changeTheme(_ref) {
      var enabled = _ref.enabled,
          id = _ref.id;
      // Reset selected and select new one
      this.themes.forEach(function (theme) {
        if (theme.id === id && enabled) {
          theme.enabled = true;
          return;
        }

        theme.enabled = false;
      });
      this.updateBodyAttributes();
      this.selectItem(enabled, id);
    },
    changeFont: function changeFont(_ref2) {
      var enabled = _ref2.enabled,
          id = _ref2.id;
      // Reset selected and select new one
      this.fonts.forEach(function (font) {
        if (font.id === id && enabled) {
          font.enabled = true;
          return;
        }

        font.enabled = false;
      });
      this.updateBodyAttributes();
      this.selectItem(enabled, id);
    },
    changeShortcutsDisabled: function changeShortcutsDisabled(newState) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!newState) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
                  url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/provisioning_api/api/v1/config/users/{appId}/{configKey}', {
                    appId: 'theming',
                    configKey: 'shortcuts_disabled'
                  }),
                  data: {
                    configValue: 'yes'
                  },
                  method: 'POST'
                });

              case 3:
                _context.next = 7;
                break;

              case 5:
                _context.next = 7;
                return (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
                  url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/provisioning_api/api/v1/config/users/{appId}/{configKey}', {
                    appId: 'theming',
                    configKey: 'shortcuts_disabled'
                  }),
                  method: 'DELETE'
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updateBodyAttributes: function updateBodyAttributes() {
      var enabledThemesIDs = this.themes.filter(function (theme) {
        return theme.enabled === true;
      }).map(function (theme) {
        return theme.id;
      });
      var enabledFontsIDs = this.fonts.filter(function (font) {
        return font.enabled === true;
      }).map(function (font) {
        return font.id;
      });
      this.themes.forEach(function (theme) {
        document.body.toggleAttribute("data-theme-".concat(theme.id), theme.enabled);
      });
      this.fonts.forEach(function (font) {
        document.body.toggleAttribute("data-theme-".concat(font.id), font.enabled);
      });
      document.body.setAttribute('data-themes', [].concat(_toConsumableArray(enabledThemesIDs), _toConsumableArray(enabledFontsIDs)).join(','));
    },

    /**
     * Commit a change and force reload css
     * Fetching the file again will trigger the server update
     *
     * @param {boolean} enabled the theme state
     * @param {string} themeId the theme ID to change
     */
    selectItem: function selectItem(enabled, themeId) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!enabled) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 4;
                return (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
                  url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/theming/api/v1/theme/{themeId}/enable', {
                    themeId: themeId
                  }),
                  method: 'PUT'
                });

              case 4:
                _context2.next = 8;
                break;

              case 6:
                _context2.next = 8;
                return (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
                  url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/theming/api/v1/theme/{themeId}', {
                    themeId: themeId
                  }),
                  method: 'DELETE'
                });

              case 8:
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0, _context2.t0.response);
                OC.Notification.showTemporary(t('theming', _context2.t0.response.data.ocs.meta.message + '. Unable to apply the setting.'));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/* harmony import */ var _helpers_getBackgroundUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/getBackgroundUrl.js */ "./apps/theming/src/helpers/getBackgroundUrl.js");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.js");
/* harmony import */ var _helpers_prefixWithBaseUrl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/prefixWithBaseUrl.js */ "./apps/theming/src/helpers/prefixWithBaseUrl.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcColorPicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcColorPicker */ "./node_modules/@nextcloud/vue/dist/Components/NcColorPicker.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcColorPicker__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcColorPicker__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _nextcloud_vue_dist_Directives_Tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextcloud/vue/dist/Directives/Tooltip */ "./node_modules/@nextcloud/vue/dist/Directives/Tooltip.js");
/* harmony import */ var _nextcloud_vue_dist_Directives_Tooltip__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Directives_Tooltip__WEBPACK_IMPORTED_MODULE_7__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








var shippedBackgroundList = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('theming', 'shippedBackgrounds');
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'BackgroundSettings',
  directives: {
    Tooltip: (_nextcloud_vue_dist_Directives_Tooltip__WEBPACK_IMPORTED_MODULE_7___default())
  },
  components: {
    NcColorPicker: (_nextcloud_vue_dist_Components_NcColorPicker__WEBPACK_IMPORTED_MODULE_6___default())
  },
  props: {
    background: {
      type: String,
      default: 'default'
    },
    themingDefaultBackground: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      backgroundImage: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background') + '?v=' + Date.now(),
      loading: false,
      Theming: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('theming', 'data', {})
    };
  },
  computed: {
    shippedBackgrounds: function shippedBackgrounds() {
      return Object.keys(shippedBackgroundList).map(function (fileName) {
        return {
          name: fileName,
          url: (0,_helpers_prefixWithBaseUrl_js__WEBPACK_IMPORTED_MODULE_3__.prefixWithBaseUrl)(fileName),
          preview: (0,_helpers_prefixWithBaseUrl_js__WEBPACK_IMPORTED_MODULE_3__.prefixWithBaseUrl)('preview/' + fileName),
          details: shippedBackgroundList[fileName]
        };
      });
    }
  },
  methods: {
    /**
     * Do we need to invert the text if color is too bright?
     *
     * @param {string} color the hex color
     */
    invertTextColor: function invertTextColor(color) {
      return this.calculateLuma(color) > 0.6;
    },

    /**
     * Calculate luminance of provided hex color
     *
     * @param {string} color the hex color
     */
    calculateLuma: function calculateLuma(color) {
      var _this$hexToRGB = this.hexToRGB(color),
          _this$hexToRGB2 = _slicedToArray(_this$hexToRGB, 3),
          red = _this$hexToRGB2[0],
          green = _this$hexToRGB2[1],
          blue = _this$hexToRGB2[2];

      return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
    },

    /**
     * Convert hex color to RGB
     *
     * @param {string} hex the hex color
     */
    hexToRGB: function hexToRGB(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    },
    update: function update(data) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var background, image;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                background = data.type === 'custom' || data.type === 'default' ? data.type : data.value;
                _this.backgroundImage = (0,_helpers_getBackgroundUrl_js__WEBPACK_IMPORTED_MODULE_1__.getBackgroundUrl)(background, data.version, _this.themingDefaultBackground);

                if (!(data.type === 'color' || data.type === 'default' && _this.themingDefaultBackground === 'backgroundColor')) {
                  _context.next = 6;
                  break;
                }

                _this.$emit('update:background', data);

                _this.loading = false;
                return _context.abrupt("return");

              case 6:
                image = new Image();

                image.onload = function () {
                  _this.$emit('update:background', data);

                  _this.loading = false;
                };

                image.src = _this.backgroundImage;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    setDefault: function setDefault() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.loading = 'default';
                _context2.next = 3;
                return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/default'));

              case 3:
                result = _context2.sent;

                _this2.update(result.data);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    setShipped: function setShipped(shipped) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.loading = shipped;
                _context3.next = 3;
                return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/shipped'), {
                  value: shipped
                });

              case 3:
                result = _context3.sent;

                _this3.update(result.data);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    setFile: function setFile(path) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.loading = 'custom';
                _context4.next = 3;
                return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/custom'), {
                  value: path
                });

              case 3:
                result = _context4.sent;

                _this4.update(result.data);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    debouncePickColor: debounce__WEBPACK_IMPORTED_MODULE_5___default()(function () {
      this.pickColor.apply(this, arguments);
    }, 200),
    pickColor: function pickColor(event) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _event$target, _event$target$dataset, _this5$Theming;

        var color, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.loading = 'color';
                color = (event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : (_event$target$dataset = _event$target.dataset) === null || _event$target$dataset === void 0 ? void 0 : _event$target$dataset.color) || ((_this5$Theming = _this5.Theming) === null || _this5$Theming === void 0 ? void 0 : _this5$Theming.color) || '#0082c9';
                _context5.next = 4;
                return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/color'), {
                  value: color
                });

              case 4:
                result = _context5.sent;

                _this5.update(result.data);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    pickFile: function pickFile() {
      var _this6 = this;

      window.OC.dialogs.filepicker(t('theming', 'Insert from {productName}', {
        productName: OC.theme.name
      }), function (path, type) {
        if (type === OC.dialogs.FILEPICKER_TYPE_CHOOSE) {
          _this6.setFile(path);
        }
      }, false, ['image/png', 'image/gif', 'image/jpeg', 'image/svg'], true, OC.dialogs.FILEPICKER_TYPE_CHOOSE);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcCheckboxRadioSwitch */ "./node_modules/@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ItemPreview',
  components: {
    NcCheckboxRadioSwitch: (_nextcloud_vue_dist_Components_NcCheckboxRadioSwitch__WEBPACK_IMPORTED_MODULE_1___default())
  },
  props: {
    enforced: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    theme: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: ''
    },
    unique: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    switchType: function switchType() {
      return this.unique ? 'switch' : 'radio';
    },
    name: function name() {
      return !this.unique ? this.type : null;
    },
    img: function img() {
      return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateFilePath)('theming', 'img', this.theme.id + '.jpg');
    },
    checked: {
      get: function get() {
        return this.selected;
      },
      set: function set(checked) {
        console.debug('Changed theme', this.theme.id, checked); // If this is a radio, we can only enable

        if (!this.unique) {
          this.$emit('change', {
            enabled: true,
            id: this.theme.id
          });
          return;
        } // If this is a switch, we can disable the theme


        this.$emit('change', {
          enabled: checked === true,
          id: this.theme.id
        });
      }
    }
  },
  methods: {
    onToggle: function onToggle() {
      if (this.switchType === 'radio') {
        this.checked = true;
        return;
      } // Invert state


      this.checked = !this.checked;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".theming p[data-v-7ec2e6a8] {\n  max-width: 800px;\n}\n.theming[data-v-7ec2e6a8] a {\n  font-weight: bold;\n}\n.theming[data-v-7ec2e6a8] a:hover, .theming[data-v-7ec2e6a8] a:focus {\n  text-decoration: underline;\n}\n.theming__preview-list[data-v-7ec2e6a8] {\n  --gap: 30px;\n  display: grid;\n  margin-top: var(--gap);\n  column-gap: var(--gap);\n  row-gap: var(--gap);\n  grid-template-columns: 1fr 1fr;\n}\n.background__grid[data-v-7ec2e6a8] {\n  margin-top: 30px;\n}\n@media (max-width: 1440px) {\n.theming__preview-list[data-v-7ec2e6a8] {\n    display: flex;\n    flex-direction: column;\n}\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".background-selector[data-v-2cb9c9e7] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.background-selector .background[data-v-2cb9c9e7] {\n  width: 176px;\n  height: 96px;\n  margin: 8px;\n  background-size: cover;\n  background-position: center center;\n  text-align: center;\n  border-radius: var(--border-radius-large);\n  border: 2px solid var(--color-main-background);\n  overflow: hidden;\n}\n.background-selector .background.current[data-v-2cb9c9e7] {\n  background-image: var(--color-background-dark);\n}\n.background-selector .background.filepicker[data-v-2cb9c9e7], .background-selector .background.default[data-v-2cb9c9e7], .background-selector .background.color[data-v-2cb9c9e7] {\n  border-color: var(--color-border);\n}\n.background-selector .background.color[data-v-2cb9c9e7] {\n  background-color: var(--color-primary-default);\n  color: var(--color-primary-text);\n}\n.background-selector .background.active[data-v-2cb9c9e7], .background-selector .background[data-v-2cb9c9e7]:hover, .background-selector .background[data-v-2cb9c9e7]:focus {\n  border: 2px solid var(--color-primary);\n}\n.background-selector .background.active[data-v-2cb9c9e7]:not(.icon-loading):after {\n  background-image: var(--original-icon-checkmark-white);\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 44px;\n  content: \"\";\n  display: block;\n  height: 100%;\n}\n.background-selector .background.active:not(.icon-loading)[data-color-bright][data-v-2cb9c9e7]:after {\n  background-image: var(--original-icon-checkmark-dark);\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".theming__preview[data-v-5d6fc2af] {\n  --ratio: 16;\n  position: relative;\n  display: flex;\n  justify-content: flex-start;\n  max-width: 800px;\n}\n.theming__preview[data-v-5d6fc2af],\n.theming__preview *[data-v-5d6fc2af] {\n  user-select: none;\n}\n.theming__preview-image[data-v-5d6fc2af] {\n  flex-basis: calc(16px * var(--ratio));\n  flex-shrink: 0;\n  height: calc(10px * var(--ratio));\n  margin-right: var(--gap);\n  cursor: pointer;\n  border-radius: var(--border-radius);\n  background-repeat: no-repeat;\n  background-position: top left;\n  background-size: cover;\n}\n.theming__preview-description[data-v-5d6fc2af] {\n  display: flex;\n  flex-direction: column;\n}\n.theming__preview-description label[data-v-5d6fc2af] {\n  padding: 12px 0;\n}\n.theming__preview--default[data-v-5d6fc2af] {\n  grid-column: span 2;\n}\n.theming__preview-warning[data-v-5d6fc2af] {\n  color: var(--color-warning);\n}\n@media (max-width: 682.6666666667px) {\n.theming__preview[data-v-5d6fc2af] {\n    flex-direction: column;\n}\n.theming__preview-image[data-v-5d6fc2af] {\n    margin: 0;\n}\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_style_index_0_id_7ec2e6a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_style_index_0_id_7ec2e6a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_style_index_0_id_7ec2e6a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_style_index_0_id_7ec2e6a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_style_index_0_id_7ec2e6a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./apps/theming/src/UserThemes.vue":
/*!*****************************************!*\
  !*** ./apps/theming/src/UserThemes.vue ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserThemes_vue_vue_type_template_id_7ec2e6a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true& */ "./apps/theming/src/UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true&");
/* harmony import */ var _UserThemes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserThemes.vue?vue&type=script&lang=js& */ "./apps/theming/src/UserThemes.vue?vue&type=script&lang=js&");
/* harmony import */ var _UserThemes_vue_vue_type_style_index_0_id_7ec2e6a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true& */ "./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserThemes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserThemes_vue_vue_type_template_id_7ec2e6a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _UserThemes_vue_vue_type_template_id_7ec2e6a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7ec2e6a8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/UserThemes.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue":
/*!************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true& */ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true&");
/* harmony import */ var _BackgroundSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BackgroundSettings.vue?vue&type=script&lang=js& */ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js&");
/* harmony import */ var _BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss& */ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BackgroundSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2cb9c9e7",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/BackgroundSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue":
/*!*****************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true& */ "./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true&");
/* harmony import */ var _ItemPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemPreview.vue?vue&type=script&lang=js& */ "./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js&");
/* harmony import */ var _ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true& */ "./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ItemPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5d6fc2af",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/ItemPreview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./apps/theming/src/UserThemes.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./apps/theming/src/UserThemes.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserThemes.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true& ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_style_index_0_id_7ec2e6a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=style&index=0&id=7ec2e6a8&lang=scss&scoped=true&");


/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss&":
/*!**********************************************************************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss&");


/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true& ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true&");


/***/ }),

/***/ "./apps/theming/src/UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true&":
/*!************************************************************************************!*\
  !*** ./apps/theming/src/UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true& ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_template_id_7ec2e6a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_template_id_7ec2e6a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserThemes_vue_vue_type_template_id_7ec2e6a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true&");


/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true& ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true&");


/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true& ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserThemes.vue?vue&type=template&id=7ec2e6a8&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    [
      _c(
        "NcSettingsSection",
        {
          staticClass: "theming",
          attrs: {
            title: _vm.t("theming", "Appearance and accessibility"),
            "limit-width": false,
          },
        },
        [
          _c("p", { domProps: { innerHTML: _vm._s(_vm.description) } }),
          _vm._v(" "),
          _c("p", { domProps: { innerHTML: _vm._s(_vm.descriptionDetail) } }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "theming__preview-list" },
            _vm._l(_vm.themes, function (theme) {
              return _c("ItemPreview", {
                key: theme.id,
                attrs: {
                  enforced: theme.id === _vm.enforceTheme,
                  selected: _vm.selectedTheme.id === theme.id,
                  theme: theme,
                  unique: _vm.themes.length === 1,
                  type: "theme",
                },
                on: { change: _vm.changeTheme },
              })
            }),
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "theming__preview-list" },
            _vm._l(_vm.fonts, function (theme) {
              return _c("ItemPreview", {
                key: theme.id,
                attrs: {
                  selected: theme.enabled,
                  theme: theme,
                  unique: _vm.fonts.length === 1,
                  type: "font",
                },
                on: { change: _vm.changeFont },
              })
            }),
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "NcSettingsSection",
        { attrs: { title: _vm.t("theming", "Keyboard shortcuts") } },
        [
          _c("p", [
            _vm._v(
              _vm._s(
                _vm.t(
                  "theming",
                  "In some cases keyboard shortcuts can interfer with accessibility tools. In order to allow focusing on your tool correctly you can disable all keyboard shortcuts here. This will also disable all available shortcuts in apps."
                )
              )
            ),
          ]),
          _vm._v(" "),
          _c(
            "NcCheckboxRadioSwitch",
            {
              staticClass: "theming__preview-toggle",
              attrs: {
                checked: _vm.shortcutsDisabled,
                name: "shortcuts_disabled",
                type: "switch",
              },
              on: {
                "update:checked": function ($event) {
                  _vm.shortcutsDisabled = $event
                },
                change: _vm.changeShortcutsDisabled,
              },
            },
            [
              _vm._v(
                "\n\t\t\t" +
                  _vm._s(_vm.t("theming", "Disable all keyboard shortcuts")) +
                  "\n\t\t"
              ),
            ]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "NcSettingsSection",
        {
          staticClass: "background",
          attrs: { title: _vm.t("theming", "Background") },
        },
        [
          _vm.isUserThemingDisabled
            ? [
                _c("p", [
                  _vm._v(
                    _vm._s(
                      _vm.t(
                        "theming",
                        "Customization has been disabled by your administrator"
                      )
                    )
                  ),
                ]),
              ]
            : [
                _c("p", [
                  _vm._v(_vm._s(_vm.t("theming", "Set a custom background"))),
                ]),
                _vm._v(" "),
                _c("BackgroundSettings", {
                  staticClass: "background__grid",
                  attrs: {
                    background: _vm.background,
                    "theming-default-background": _vm.themingDefaultBackground,
                  },
                  on: { "update:background": _vm.updateBackground },
                }),
              ],
        ],
        2
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "background-selector" },
    [
      _c(
        "button",
        {
          staticClass: "background filepicker",
          class: { active: _vm.background === "custom" },
          attrs: { tabindex: "0" },
          on: { click: _vm.pickFile },
        },
        [
          _vm._v(
            "\n\t\t" + _vm._s(_vm.t("theming", "Pick from Files")) + "\n\t"
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "background default",
          class: {
            "icon-loading": _vm.loading === "default",
            active: _vm.background === "default",
          },
          attrs: { tabindex: "0" },
          on: { click: _vm.setDefault },
        },
        [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "Default image")) + "\n\t")]
      ),
      _vm._v(" "),
      _c(
        "NcColorPicker",
        {
          on: { input: _vm.debouncePickColor },
          model: {
            value: _vm.Theming.color,
            callback: function ($$v) {
              _vm.$set(_vm.Theming, "color", $$v)
            },
            expression: "Theming.color",
          },
        },
        [
          _c(
            "button",
            {
              staticClass: "background color",
              class: { active: _vm.background === _vm.Theming.color },
              style: {
                backgroundColor: _vm.Theming.color,
                color: _vm.invertTextColor(_vm.Theming.color)
                  ? "#000000"
                  : "#ffffff",
              },
              attrs: {
                tabindex: "0",
                "data-color": _vm.Theming.color,
                "data-color-bright": _vm.invertTextColor(_vm.Theming.color),
              },
            },
            [
              _vm._v(
                "\n\t\t\t" + _vm._s(_vm.t("theming", "Custom color")) + "\n\t\t"
              ),
            ]
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "background color",
          class: { active: _vm.background === _vm.Theming.defaultColor },
          style: {
            color: _vm.invertTextColor(_vm.Theming.defaultColor)
              ? "#000000"
              : "#ffffff",
          },
          attrs: {
            tabindex: "0",
            "data-color": _vm.Theming.defaultColor,
            "data-color-bright": _vm.invertTextColor(_vm.Theming.defaultColor),
          },
          on: { click: _vm.debouncePickColor },
        },
        [
          _vm._v(
            "\n\t\t" + _vm._s(_vm.t("theming", "Plain background")) + "\n\t"
          ),
        ]
      ),
      _vm._v(" "),
      _vm._l(_vm.shippedBackgrounds, function (shippedBackground) {
        return _c("button", {
          directives: [
            {
              name: "tooltip",
              rawName: "v-tooltip",
              value: shippedBackground.details.attribution,
              expression: "shippedBackground.details.attribution",
            },
          ],
          key: shippedBackground.name,
          staticClass: "background",
          class: {
            "icon-loading": _vm.loading === shippedBackground.name,
            active: _vm.background === shippedBackground.name,
          },
          style: {
            "background-image": "url(" + shippedBackground.preview + ")",
          },
          attrs: {
            tabindex: "0",
            "data-color-bright": shippedBackground.details.theming === "dark",
          },
          on: {
            click: function ($event) {
              return _vm.setShipped(shippedBackground.name)
            },
          },
        })
      }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "theming__preview",
      class: "theming__preview--" + _vm.theme.id,
    },
    [
      _c("div", {
        staticClass: "theming__preview-image",
        style: { backgroundImage: "url(" + _vm.img + ")" },
        on: { click: _vm.onToggle },
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "theming__preview-description" },
        [
          _c("h3", [_vm._v(_vm._s(_vm.theme.title))]),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.theme.description))]),
          _vm._v(" "),
          _vm.enforced
            ? _c(
                "span",
                {
                  staticClass: "theming__preview-warning",
                  attrs: { role: "note" },
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.t("theming", "Theme selection is enforced")) +
                      "\n\t\t"
                  ),
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "NcCheckboxRadioSwitch",
            {
              staticClass: "theming__preview-toggle",
              attrs: {
                checked: _vm.checked,
                disabled: _vm.enforced,
                name: _vm.name,
                type: _vm.switchType,
              },
              on: {
                "update:checked": function ($event) {
                  _vm.checked = $event
                },
              },
            },
            [_vm._v("\n\t\t\t" + _vm._s(_vm.theme.enableLabel) + "\n\t\t")]
          ),
        ],
        1
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	!function() {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"theming-theming-settings": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunknextcloud"] = self["webpackChunknextcloud"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["core-common"], function() { return __webpack_require__("./apps/theming/src/settings.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=theming-theming-settings.js.map?v=2a7bf24e79bf78f38bb7