webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(109);


/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

	/* 
	* @Author: zhou qiao
	* @Date:   2019-01-17 21:01:08
	* @Last Modified by:   zhou qiao
	* @Last Modified time: 2019-01-22 19:55:59
	*/

	'use strict';
	__webpack_require__(110);
	var navSimple = __webpack_require__(112);
	var _mm = __webpack_require__(97);

	// 根据传递的type参数决定显示哪一部分的div内容
	$(function() {
	    var type = _mm.getURLParam('type') || 'default',
	    $element = $('.' + type + '-success');
	    $element.show();
	})

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

	/* 
	* @Author: zhou qiao
	* @Date:   2019-01-16 20:59:46
	* @Last Modified by:   zhou qiao
	* @Last Modified time: 2019-01-16 21:07:13
	*/

	'use strict';
	__webpack_require__(113);

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});