/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./apps/comments/src/comments-tab.js ***!
  \*******************************************/
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
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
// Init Comments tab component
var TabInstance = null;
var commentTab = new OCA.Files.Sidebar.Tab({
  id: 'comments',
  name: t('comments', 'Comments'),
  icon: 'icon-comment',
  mount: function mount(el, fileInfo, context) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (TabInstance) {
                TabInstance.$destroy();
              }

              TabInstance = new OCA.Comments.View('files', {
                // Better integration with vue parent component
                parent: context
              }); // Only mount after we have all the info we need

              _context.next = 4;
              return TabInstance.update(fileInfo.id);

            case 4:
              TabInstance.$mount(el);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  update: function update(fileInfo) {
    TabInstance.update(fileInfo.id);
  },
  destroy: function destroy() {
    TabInstance.$destroy();
    TabInstance = null;
  },
  scrollBottomReached: function scrollBottomReached() {
    TabInstance.onScrollBottomReached();
  }
});
window.addEventListener('DOMContentLoaded', function () {
  if (OCA.Files && OCA.Files.Sidebar) {
    OCA.Files.Sidebar.registerTab(commentTab);
  }
});
/******/ })()
;
//# sourceMappingURL=comments-comments-tab.js.map?v=2779a057582eb64fc82f