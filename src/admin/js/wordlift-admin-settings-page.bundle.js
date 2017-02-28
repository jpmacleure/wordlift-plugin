!function(t){function e(c){if(l[c])return l[c].exports;var n=l[c]={i:c,l:!1,exports:{}};return t[c].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var l={};return e.m=t,e.c=l,e.i=function(t){return t},e.d=function(t,l,c){e.o(t,l)||Object.defineProperty(t,l,{configurable:!1,enumerable:!0,get:c})},e.n=function(t){var l=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(l,"a",l),l},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=256)}({100:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delay__ = __webpack_require__(138);\n/**\n * Validators: Key Validator.\n *\n * Validate WordLift's key in inputs.\n *\n * @since 3.11.0\n */\n\n/**\n * Internal dependencies\n */\n\n\n// Map $ to jQuery.\nvar $ = jQuery;\n\n/**\n * Create a key validator on the element with the specified selector.\n *\n * @since 3.11.0\n * @param {string} selector The element selector.\n */\nvar KeyValidator = function KeyValidator(selector) {\n\t$(selector).on('keyup', function () {\n\t\t// Get a jQuery reference to the object.\n\t\tvar $this = $(this);\n\n\t\t// Remove any preexisting states, including the `untouched` class\n\t\t// which is set initially to prevent displaying the\n\t\t// `valid`/`invalid` indicator.\n\t\t$this.removeClass('untouched valid invalid');\n\n\t\t// Delay execution of the validation.\n\t\t__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__delay__[\"a\" /* default */])($this, function () {\n\t\t\t// Post the validation request.\n\t\t\twp.ajax.post('wl_validate_key', { key: $this.val() }).done(function (data) {\n\t\t\t\t// If the key is valid then set the process class.\n\t\t\t\tif (data && data.valid) {\n\t\t\t\t\t$this.addClass('valid');\n\t\t\t\t} else {\n\t\t\t\t\t$this.addClass('invalid');\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\t});\n};\n\n// Finally export the `KeyValidator` function.\n/* harmony default export */ __webpack_exports__[\"a\"] = KeyValidator;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zY3JpcHRzL2NvbW1vbi9rZXktdmFsaWRhdG9yLmpzP2ZlMDQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWYWxpZGF0b3JzOiBLZXkgVmFsaWRhdG9yLlxuICpcbiAqIFZhbGlkYXRlIFdvcmRMaWZ0J3Mga2V5IGluIGlucHV0cy5cbiAqXG4gKiBAc2luY2UgMy4xMS4wXG4gKi9cblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IGRlbGF5IGZyb20gJy4vZGVsYXknO1xuXG4vLyBNYXAgJCB0byBqUXVlcnkuXG5jb25zdCAkID0galF1ZXJ5O1xuXG4vKipcbiAqIENyZWF0ZSBhIGtleSB2YWxpZGF0b3Igb24gdGhlIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yLlxuICpcbiAqIEBzaW5jZSAzLjExLjBcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBUaGUgZWxlbWVudCBzZWxlY3Rvci5cbiAqL1xuY29uc3QgS2V5VmFsaWRhdG9yID0gKCBzZWxlY3RvciApID0+IHtcblx0JCggc2VsZWN0b3IgKS5vbiggJ2tleXVwJywgZnVuY3Rpb24oKSB7XG5cdFx0Ly8gR2V0IGEgalF1ZXJ5IHJlZmVyZW5jZSB0byB0aGUgb2JqZWN0LlxuXHRcdGNvbnN0ICR0aGlzID0gJCggdGhpcyApO1xuXG5cdFx0Ly8gUmVtb3ZlIGFueSBwcmVleGlzdGluZyBzdGF0ZXMsIGluY2x1ZGluZyB0aGUgYHVudG91Y2hlZGAgY2xhc3Ncblx0XHQvLyB3aGljaCBpcyBzZXQgaW5pdGlhbGx5IHRvIHByZXZlbnQgZGlzcGxheWluZyB0aGVcblx0XHQvLyBgdmFsaWRgL2BpbnZhbGlkYCBpbmRpY2F0b3IuXG5cdFx0JHRoaXMucmVtb3ZlQ2xhc3MoICd1bnRvdWNoZWQgdmFsaWQgaW52YWxpZCcgKTtcblxuXHRcdC8vIERlbGF5IGV4ZWN1dGlvbiBvZiB0aGUgdmFsaWRhdGlvbi5cblx0XHRkZWxheSggJHRoaXMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gUG9zdCB0aGUgdmFsaWRhdGlvbiByZXF1ZXN0LlxuXHRcdFx0d3AuYWpheC5wb3N0KCAnd2xfdmFsaWRhdGVfa2V5JywgeyBrZXk6ICR0aGlzLnZhbCgpIH0gKVxuXHRcdFx0ICAuZG9uZSggZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0XHRcdCAgLy8gSWYgdGhlIGtleSBpcyB2YWxpZCB0aGVuIHNldCB0aGUgcHJvY2VzcyBjbGFzcy5cblx0XHRcdFx0ICBpZiAoIGRhdGEgJiYgZGF0YS52YWxpZCApIHtcblx0XHRcdFx0XHQgICR0aGlzLmFkZENsYXNzKCAndmFsaWQnICk7XG5cdFx0XHRcdCAgfSBlbHNlIHtcblx0XHRcdFx0XHQgICR0aGlzLmFkZENsYXNzKCAnaW52YWxpZCcgKTtcblx0XHRcdFx0ICB9XG5cdFx0XHQgIH0gKTtcblx0XHR9ICk7XG5cdH0gKTtcbn07XG5cbi8vIEZpbmFsbHkgZXhwb3J0IHRoZSBgS2V5VmFsaWRhdG9yYCBmdW5jdGlvbi5cbmV4cG9ydCBkZWZhdWx0IEtleVZhbGlkYXRvcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvc2NyaXB0cy9jb21tb24va2V5LXZhbGlkYXRvci5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Iiwic291cmNlUm9vdCI6IiJ9")},101:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/**\n * Media Uploader.\n *\n * Provide a function to use WordPress' Media Uploader by binding a button's\n * click event.\n *\n * @since 3.11.0\n */\n\n// Set a reference to jQuery.\nvar $ = jQuery;\n\n/**\n * Hook WordPress' Media Uploader.\n *\n * @since 3.11.0\n * @param {string} selector The button's selector.\n * @param {Object} options The Media Uploader's options.\n * @param {Function} callback A callback function which will receive the\n *     selected attachment.\n * @constructor\n */\nvar MediaUploader = function MediaUploader(selector, options, callback) {\n  // Create a WP media uploader.\n  var uploader = wp.media(options);\n\n  // Catch `select` events on the uploader.\n  uploader.on('select', function () {\n    // Get the selected attachment.\n    callback(uploader.state().get('selection').first().toJSON());\n  });\n\n  // Add logo.\n  $(selector).on('click', function () {\n    uploader.open();\n  });\n};\n\n// Finally export the `MediaUploader`.\n/* harmony default export */ __webpack_exports__[\"a\"] = MediaUploader;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zY3JpcHRzL2NvbW1vbi9tZWRpYS11cGxvYWRlci5qcz8xNjMwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTWVkaWEgVXBsb2FkZXIuXG4gKlxuICogUHJvdmlkZSBhIGZ1bmN0aW9uIHRvIHVzZSBXb3JkUHJlc3MnIE1lZGlhIFVwbG9hZGVyIGJ5IGJpbmRpbmcgYSBidXR0b24nc1xuICogY2xpY2sgZXZlbnQuXG4gKlxuICogQHNpbmNlIDMuMTEuMFxuICovXG5cbi8vIFNldCBhIHJlZmVyZW5jZSB0byBqUXVlcnkuXG5jb25zdCAkID0galF1ZXJ5O1xuXG4vKipcbiAqIEhvb2sgV29yZFByZXNzJyBNZWRpYSBVcGxvYWRlci5cbiAqXG4gKiBAc2luY2UgMy4xMS4wXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgVGhlIGJ1dHRvbidzIHNlbGVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIE1lZGlhIFVwbG9hZGVyJ3Mgb3B0aW9ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCByZWNlaXZlIHRoZVxuICogICAgIHNlbGVjdGVkIGF0dGFjaG1lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY29uc3QgTWVkaWFVcGxvYWRlciA9ICggc2VsZWN0b3IsIG9wdGlvbnMsIGNhbGxiYWNrICkgPT4ge1xuXHQvLyBDcmVhdGUgYSBXUCBtZWRpYSB1cGxvYWRlci5cblx0Y29uc3QgdXBsb2FkZXIgPSB3cC5tZWRpYSggb3B0aW9ucyApO1xuXG5cdC8vIENhdGNoIGBzZWxlY3RgIGV2ZW50cyBvbiB0aGUgdXBsb2FkZXIuXG5cdHVwbG9hZGVyLm9uKCAnc2VsZWN0JywgZnVuY3Rpb24oKSB7XG5cdFx0Ly8gR2V0IHRoZSBzZWxlY3RlZCBhdHRhY2htZW50LlxuXHRcdGNhbGxiYWNrKCB1cGxvYWRlci5zdGF0ZSgpLmdldCggJ3NlbGVjdGlvbicgKS5maXJzdCgpLnRvSlNPTigpICk7XG5cdH0gKTtcblxuXHQvLyBBZGQgbG9nby5cblx0JCggc2VsZWN0b3IgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0dXBsb2FkZXIub3BlbigpO1xuXHR9ICk7XG59O1xuXG4vLyBGaW5hbGx5IGV4cG9ydCB0aGUgYE1lZGlhVXBsb2FkZXJgLlxuZXhwb3J0IGRlZmF1bHQgTWVkaWFVcGxvYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvc2NyaXB0cy9jb21tb24vbWVkaWEtdXBsb2FkZXIuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9")},102:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n * Created by david on 21/02/2017.\n */\n\nvar $ = jQuery;\n\n/**\n * Create a Select2 element on the element identified by the selector.\n *\n * @since 3.11.0\n * @param {string} selector The element selector.\n * @param {Object} args Custom options.\n * @constructor\n */\nvar Select2 = function Select2(selector) {\n\tvar args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n\t// Cycle through each element to create `Select2`.\n\t$(selector).each(function () {\n\t\t//\n\t\tvar $this = $(this);\n\n\t\tvar options = _extends({}, {\n\t\t\twidth: '100%',\n\t\t\tdata: $this.data('wl-select2-data'),\n\t\t\tescapeMarkup: function escapeMarkup(markup) {\n\t\t\t\treturn markup;\n\t\t\t},\n\t\t\ttemplateResult: _.template($this.data('wl-select2-template-result')),\n\t\t\ttemplateSelection: _.template($this.data('wl-select2-template-selection'))\n\t\t}, args);\n\n\t\t// Create the tabs and set the default active element.\n\t\t$this.select2(options);\n\t});\n};\n\n// Finally export `Select2`.\n/* harmony default export */ __webpack_exports__[\"a\"] = Select2;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zY3JpcHRzL2NvbW1vbi9zZWxlY3QyLmpzPzUxZTYiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGRhdmlkIG9uIDIxLzAyLzIwMTcuXG4gKi9cblxuY29uc3QgJCA9IGpRdWVyeTtcblxuLyoqXG4gKiBDcmVhdGUgYSBTZWxlY3QyIGVsZW1lbnQgb24gdGhlIGVsZW1lbnQgaWRlbnRpZmllZCBieSB0aGUgc2VsZWN0b3IuXG4gKlxuICogQHNpbmNlIDMuMTEuMFxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFRoZSBlbGVtZW50IHNlbGVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgQ3VzdG9tIG9wdGlvbnMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY29uc3QgU2VsZWN0MiA9ICggc2VsZWN0b3IsIGFyZ3MgPSB7fSApID0+IHtcblx0Ly8gQ3ljbGUgdGhyb3VnaCBlYWNoIGVsZW1lbnQgdG8gY3JlYXRlIGBTZWxlY3QyYC5cblx0JCggc2VsZWN0b3IgKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHQvL1xuXHRcdGNvbnN0ICR0aGlzID0gJCggdGhpcyApO1xuXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHR7fSxcblx0XHRcdHtcblx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcblx0XHRcdFx0ZGF0YTogJHRoaXMuZGF0YSggJ3dsLXNlbGVjdDItZGF0YScgKSxcblx0XHRcdFx0ZXNjYXBlTWFya3VwOiBmdW5jdGlvbiggbWFya3VwICkge1xuXHRcdFx0XHRcdHJldHVybiBtYXJrdXA7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlUmVzdWx0OiBfLnRlbXBsYXRlKCAkdGhpcy5kYXRhKCAnd2wtc2VsZWN0Mi10ZW1wbGF0ZS1yZXN1bHQnICkgKSxcblx0XHRcdFx0dGVtcGxhdGVTZWxlY3Rpb246IF8udGVtcGxhdGUoICR0aGlzLmRhdGEoICd3bC1zZWxlY3QyLXRlbXBsYXRlLXNlbGVjdGlvbicgKSApXG5cdFx0XHR9LFxuXHRcdFx0YXJnc1xuXHRcdCk7XG5cblx0XHQvLyBDcmVhdGUgdGhlIHRhYnMgYW5kIHNldCB0aGUgZGVmYXVsdCBhY3RpdmUgZWxlbWVudC5cblx0XHQkdGhpcy5zZWxlY3QyKCBvcHRpb25zICk7XG5cdH0gKTtcbn07XG5cbi8vIEZpbmFsbHkgZXhwb3J0IGBTZWxlY3QyYC5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3NjcmlwdHMvY29tbW9uL3NlbGVjdDIuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFJQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==")},103:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/**\n * Tabs.\n *\n * Create a tabbed UI.\n *\n * @since 3.11.0\n */\n\n// Set a reference to jQuery.\nvar $ = jQuery;\n\n/**\n * Create a tabbed UI on the element with the specified selector.\n *\n * @since 3.11.0\n * @param {string} selector The selector.\n * @constructor\n */\nvar Tabs = function Tabs(selector) {\n  // Although in jQuery UI 1.12 it's possible to configure the css\n  // classes, WP 4.2 uses jQuery 1.11.\n  $(selector).each(function () {\n    //\n    var $this = $(this);\n\n    // Create the tabs and set the default active element.\n    $this.tabs({ active: $this.data('active') });\n  });\n};\n\n// Finally export `Tabs`.\n/* harmony default export */ __webpack_exports__[\"a\"] = Tabs;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zY3JpcHRzL2NvbW1vbi90YWJzLmpzPzY0NTciXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUYWJzLlxuICpcbiAqIENyZWF0ZSBhIHRhYmJlZCBVSS5cbiAqXG4gKiBAc2luY2UgMy4xMS4wXG4gKi9cblxuLy8gU2V0IGEgcmVmZXJlbmNlIHRvIGpRdWVyeS5cbmNvbnN0ICQgPSBqUXVlcnk7XG5cbi8qKlxuICogQ3JlYXRlIGEgdGFiYmVkIFVJIG9uIHRoZSBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCBzZWxlY3Rvci5cbiAqXG4gKiBAc2luY2UgMy4xMS4wXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmNvbnN0IFRhYnMgPSAoIHNlbGVjdG9yICkgPT4ge1xuXHQvLyBBbHRob3VnaCBpbiBqUXVlcnkgVUkgMS4xMiBpdCdzIHBvc3NpYmxlIHRvIGNvbmZpZ3VyZSB0aGUgY3NzXG5cdC8vIGNsYXNzZXMsIFdQIDQuMiB1c2VzIGpRdWVyeSAxLjExLlxuXHQkKCBzZWxlY3RvciApLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdC8vXG5cdFx0Y29uc3QgJHRoaXMgPSAkKCB0aGlzICk7XG5cblx0XHQvLyBDcmVhdGUgdGhlIHRhYnMgYW5kIHNldCB0aGUgZGVmYXVsdCBhY3RpdmUgZWxlbWVudC5cblx0XHQkdGhpcy50YWJzKCB7IGFjdGl2ZTogJHRoaXMuZGF0YSggJ2FjdGl2ZScgKSB9ICk7XG5cdH0gKTtcbn07XG5cbi8vIEZpbmFsbHkgZXhwb3J0IGBUYWJzYC5cbmV4cG9ydCBkZWZhdWx0IFRhYnM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3NjcmlwdHMvY29tbW9uL3RhYnMuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9")},106:function(module,exports){eval("// removed by extract-text-webpack-plugin//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTA2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvd29yZGxpZnQtYWRtaW4tc2V0dGluZ3MtcGFnZS9zdHlsZXMvaW5kZXguc2Nzcz9kODZhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2NyaXB0cy93b3JkbGlmdC1hZG1pbi1zZXR0aW5ncy1wYWdlL3N0eWxlcy9pbmRleC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==")},138:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/**\n * Delay a function call by half a second.\n *\n * Any function can be delayed using `delay`. The timeout for the call is bound\n * to the provided element. If another function call is delayed on the same\n * element, any previous timeout is cancelled.\n *\n * This function is used to validate in real-time inputs when the user presses\n * a key, but allowing the user to press more keys (hence the delay).\n *\n * @since 3.9.0\n *\n * @param {Object} $elem A jQuery element reference which will hold the timeout\n *     reference.\n * @param {Function} fn The function to call.\n * @param {...Object} args Additional arguments for the callback.\n */\nvar delay = function delay($elem, fn) {\n  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  // Clear a validation timeout.\n  clearTimeout($elem.data('timeout'));\n\n  // Validate the key, after a delay, so that another key is pressed, this\n  // validation is cancelled.\n  $elem.data('timeout', setTimeout.apply(undefined, [fn, 500].concat(args)));\n};\n\n// Finally export the `delay` function.\n/* harmony default export */ __webpack_exports__[\"a\"] = delay;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTM4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zY3JpcHRzL2NvbW1vbi9kZWxheS5qcz82ODQ0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVsYXkgYSBmdW5jdGlvbiBjYWxsIGJ5IGhhbGYgYSBzZWNvbmQuXG4gKlxuICogQW55IGZ1bmN0aW9uIGNhbiBiZSBkZWxheWVkIHVzaW5nIGBkZWxheWAuIFRoZSB0aW1lb3V0IGZvciB0aGUgY2FsbCBpcyBib3VuZFxuICogdG8gdGhlIHByb3ZpZGVkIGVsZW1lbnQuIElmIGFub3RoZXIgZnVuY3Rpb24gY2FsbCBpcyBkZWxheWVkIG9uIHRoZSBzYW1lXG4gKiBlbGVtZW50LCBhbnkgcHJldmlvdXMgdGltZW91dCBpcyBjYW5jZWxsZWQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHZhbGlkYXRlIGluIHJlYWwtdGltZSBpbnB1dHMgd2hlbiB0aGUgdXNlciBwcmVzc2VzXG4gKiBhIGtleSwgYnV0IGFsbG93aW5nIHRoZSB1c2VyIHRvIHByZXNzIG1vcmUga2V5cyAoaGVuY2UgdGhlIGRlbGF5KS5cbiAqXG4gKiBAc2luY2UgMy45LjBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gJGVsZW0gQSBqUXVlcnkgZWxlbWVudCByZWZlcmVuY2Ugd2hpY2ggd2lsbCBob2xkIHRoZSB0aW1lb3V0XG4gKiAgICAgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gYXJncyBBZGRpdGlvbmFsIGFyZ3VtZW50cyBmb3IgdGhlIGNhbGxiYWNrLlxuICovXG5jb25zdCBkZWxheSA9ICggJGVsZW0sIGZuLCAuLi5hcmdzICkgPT4ge1xuXHQvLyBDbGVhciBhIHZhbGlkYXRpb24gdGltZW91dC5cblx0Y2xlYXJUaW1lb3V0KCAkZWxlbS5kYXRhKCAndGltZW91dCcgKSApO1xuXG5cdC8vIFZhbGlkYXRlIHRoZSBrZXksIGFmdGVyIGEgZGVsYXksIHNvIHRoYXQgYW5vdGhlciBrZXkgaXMgcHJlc3NlZCwgdGhpc1xuXHQvLyB2YWxpZGF0aW9uIGlzIGNhbmNlbGxlZC5cblx0JGVsZW0uZGF0YSggJ3RpbWVvdXQnLCBzZXRUaW1lb3V0KCBmbiwgNTAwLCAuLi5hcmdzICkgKTtcbn07XG5cbi8vIEZpbmFsbHkgZXhwb3J0IHRoZSBgZGVsYXlgIGZ1bmN0aW9uLlxuZXhwb3J0IGRlZmF1bHQgZGVsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3NjcmlwdHMvY29tbW9uL2RlbGF5LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=")},256:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_scss__ = __webpack_require__(106);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_index_scss__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_key_validator__ = __webpack_require__(100);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_media_uploader__ = __webpack_require__(101);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_tabs__ = __webpack_require__(103);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_select2__ = __webpack_require__(102);\n/**\n * Entry: wordlift-admin-settings-page.js\n */\n\n/**\n * Internal dependencies\n */\n\n\n\n\n\n\n/**\n * UI interactions on the WordLift Settings page\n *\n * @since 3.11.0\n */\n(function ($, settings) {\n\t$(function () {\n\t\t// Attach the WL key validator to the `#wl-key` element.\n\t\t__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_key_validator__[\"a\" /* default */])('#wl-key');\n\n\t\t// Attach the Media Uploader to the #wl-publisher-logo\n\t\t__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_media_uploader__[\"a\" /* default */])('#wl-publisher-media-uploader', {\n\t\t\ttitle: settings.l10n.logo_selection_title,\n\t\t\tbutton: settings.l10n.logo_selection_button,\n\t\t\tmultiple: false,\n\t\t\tlibrary: { type: 'image' }\n\t\t}, function (attachment) {\n\t\t\t// Set the selected image as the preview image\n\t\t\t$('#wl-publisher-media-uploader-preview').attr('src', attachment.url).show();\n\n\t\t\t// Set the logo id.\n\t\t\t$('#wl-publisher-media-uploader-id').val(attachment.id);\n\t\t});\n\n\t\t// Create the tabs.\n\t\t__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_tabs__[\"a\" /* default */])('.wl-tabs-element');\n\n\t\t// Create the Select2.\n\t\t__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_select2__[\"a\" /* default */])('.wl-select2-element', {\n\t\t\tcontainerCssClass: 'wl-admin-settings-page-select2',\n\t\t\tdropdownCssClass: 'wl-admin-settings-page-select2'\n\t\t});\n\t});\n})(jQuery, wlSettings);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjU2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zY3JpcHRzL3dvcmRsaWZ0LWFkbWluLXNldHRpbmdzLXBhZ2UvaW5kZXguanM/NmE0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVudHJ5OiB3b3JkbGlmdC1hZG1pbi1zZXR0aW5ncy1wYWdlLmpzXG4gKi9cblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcbmltcG9ydCBLZXlWYWxpZGF0b3IgZnJvbSAnLi4vY29tbW9uL2tleS12YWxpZGF0b3InO1xuaW1wb3J0IE1lZGlhVXBsb2FkZXIgZnJvbSAnLi4vY29tbW9uL21lZGlhLXVwbG9hZGVyJztcbmltcG9ydCBUYWJzIGZyb20gJy4uL2NvbW1vbi90YWJzJztcbmltcG9ydCBTZWxlY3QyIGZyb20gJy4uL2NvbW1vbi9zZWxlY3QyJztcblxuLyoqXG4gKiBVSSBpbnRlcmFjdGlvbnMgb24gdGhlIFdvcmRMaWZ0IFNldHRpbmdzIHBhZ2VcbiAqXG4gKiBAc2luY2UgMy4xMS4wXG4gKi9cbihcblx0KCAkLCBzZXR0aW5ncyApID0+IHtcblx0XHQkKCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIEF0dGFjaCB0aGUgV0wga2V5IHZhbGlkYXRvciB0byB0aGUgYCN3bC1rZXlgIGVsZW1lbnQuXG5cdFx0XHRLZXlWYWxpZGF0b3IoICcjd2wta2V5JyApO1xuXG5cdFx0XHQvLyBBdHRhY2ggdGhlIE1lZGlhIFVwbG9hZGVyIHRvIHRoZSAjd2wtcHVibGlzaGVyLWxvZ29cblx0XHRcdE1lZGlhVXBsb2FkZXIoICcjd2wtcHVibGlzaGVyLW1lZGlhLXVwbG9hZGVyJywge1xuXHRcdFx0XHR0aXRsZTogc2V0dGluZ3MubDEwbi5sb2dvX3NlbGVjdGlvbl90aXRsZSxcblx0XHRcdFx0YnV0dG9uOiBzZXR0aW5ncy5sMTBuLmxvZ29fc2VsZWN0aW9uX2J1dHRvbixcblx0XHRcdFx0bXVsdGlwbGU6IGZhbHNlLFxuXHRcdFx0XHRsaWJyYXJ5OiB7IHR5cGU6ICdpbWFnZScgfSxcblx0XHRcdH0sICggYXR0YWNobWVudCApID0+IHtcblx0XHRcdFx0Ly8gU2V0IHRoZSBzZWxlY3RlZCBpbWFnZSBhcyB0aGUgcHJldmlldyBpbWFnZVxuXHRcdFx0XHQkKCAnI3dsLXB1Ymxpc2hlci1tZWRpYS11cGxvYWRlci1wcmV2aWV3JyApLmF0dHIoICdzcmMnLCBhdHRhY2htZW50LnVybCApLnNob3coKTtcblxuXHRcdFx0XHQvLyBTZXQgdGhlIGxvZ28gaWQuXG5cdFx0XHRcdCQoICcjd2wtcHVibGlzaGVyLW1lZGlhLXVwbG9hZGVyLWlkJyApLnZhbCggYXR0YWNobWVudC5pZCApO1xuXHRcdFx0fSApO1xuXG5cdFx0XHQvLyBDcmVhdGUgdGhlIHRhYnMuXG5cdFx0XHRUYWJzKCAnLndsLXRhYnMtZWxlbWVudCcgKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBTZWxlY3QyLlxuXHRcdFx0U2VsZWN0MiggJy53bC1zZWxlY3QyLWVsZW1lbnQnLFxuXHRcdFx0XHRcdCB7XG5cdFx0XHRcdFx0XHQgY29udGFpbmVyQ3NzQ2xhc3M6ICd3bC1hZG1pbi1zZXR0aW5ncy1wYWdlLXNlbGVjdDInLFxuXHRcdFx0XHRcdFx0IGRyb3Bkb3duQ3NzQ2xhc3M6ICd3bC1hZG1pbi1zZXR0aW5ncy1wYWdlLXNlbGVjdDInXG5cdFx0XHRcdFx0IH0gKTtcblx0XHR9ICk7XG5cdH1cbikoIGpRdWVyeSwgd2xTZXR0aW5ncyApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9zY3JpcHRzL3dvcmRsaWZ0LWFkbWluLXNldHRpbmdzLXBhZ2UvaW5kZXguanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBSUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUlBOzs7Ozs7OzsiLCJzb3VyY2VSb290IjoiIn0=")}});