!function(n){function t(e){if(c[e])return c[e].exports;var d=c[e]={i:e,l:!1,exports:{}};return n[e].call(d.exports,d,d.exports,t),d.l=!0,d.exports}var c={};t.m=n,t.c=c,t.i=function(n){return n},t.d=function(n,c,e){t.o(n,c)||Object.defineProperty(n,c,{configurable:!1,enumerable:!0,get:e})},t.n=function(n){var c=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(c,"a",c),c},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=151)}({151:function(module,exports){eval("(function (window, views, _, tinyMCE) {\n\n\tvar navigator = _.extend({}, {\n\t\tcontent: 'Loading...',\n\t\tbindNode: function bindNode(x, element) {\n\n\t\t\tconsole.log({ bindNode: arguments });\n\n\t\t\tvar frame = tinyMCE.get('content').getWin();\n\n\t\t\tframe.wlSettings = parent.wlSettings;\n\t\t\tframe.wlNavigator = parent.wlNavigator;\n\t\t\tframe.wl.Navigator(element);\n\t\t},\n\t\tunbindNode: function unbindNode() {\n\n\t\t\tconsole.log(arguments);\n\t\t}\n\t});\n\n\tviews.register('wl_navigator', _.extend({}, navigator));\n})(window.parent, window.parent.wp.mce.views, window.parent._, window.parent.tinyMCE);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTUxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zY3JpcHRzL2FkbWluLXRpbnltY2Utdmlld3MvaW5kZXguanM/YTg1YyJdLCJzb3VyY2VzQ29udGVudCI6WyIoXG5cdGZ1bmN0aW9uKCB3aW5kb3csIHZpZXdzLCBfLCB0aW55TUNFICkge1xuXG5cdFx0Y29uc3QgbmF2aWdhdG9yID0gXy5leHRlbmQoIHt9LCB7XG5cdFx0XHRjb250ZW50OiAnTG9hZGluZy4uLicsXG5cdFx0XHRiaW5kTm9kZTogZnVuY3Rpb24oIHgsIGVsZW1lbnQgKSB7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coIHsgYmluZE5vZGU6IGFyZ3VtZW50cyB9ICk7XG5cblx0XHRcdFx0Y29uc3QgZnJhbWUgPSB0aW55TUNFLmdldCggJ2NvbnRlbnQnICkuZ2V0V2luKCk7XG5cblx0XHRcdFx0ZnJhbWUud2xTZXR0aW5ncyA9IHBhcmVudC53bFNldHRpbmdzO1xuXHRcdFx0XHRmcmFtZS53bE5hdmlnYXRvciA9IHBhcmVudC53bE5hdmlnYXRvcjtcblx0XHRcdFx0ZnJhbWUud2wuTmF2aWdhdG9yKCBlbGVtZW50ICk7XG5cblx0XHRcdH0sXG5cdFx0XHR1bmJpbmROb2RlOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyggYXJndW1lbnRzICk7XG5cblx0XHRcdH1cblx0XHR9ICk7XG5cblx0XHR2aWV3cy5yZWdpc3RlciggJ3dsX25hdmlnYXRvcicsIF8uZXh0ZW5kKCB7fSwgbmF2aWdhdG9yICkgKTtcblxuXHR9XG4pKCB3aW5kb3cucGFyZW50LCB3aW5kb3cucGFyZW50LndwLm1jZS52aWV3cywgd2luZG93LnBhcmVudC5fLCB3aW5kb3cucGFyZW50LnRpbnlNQ0UgKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvc2NyaXB0cy9hZG1pbi10aW55bWNlLXZpZXdzL2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFqQkE7QUFDQTtBQW1CQTtBQUVBIiwic291cmNlUm9vdCI6IiJ9")}});