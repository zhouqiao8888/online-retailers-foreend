/* 
* @Author: zhou qiao
* @Date:   2019-01-17 21:01:08
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-22 19:55:59
*/

'use strict';
require('./index.css');
var navSimple = require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

// 根据传递的type参数决定显示哪一部分的div内容
$(function() {
    var type = _mm.getURLParam('type') || 'default',
    $element = $('.' + type + '-success');
    $element.show();
})