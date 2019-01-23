/* 
* @Author: zhou qiao
* @Date:   2019-01-23 20:17:57
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-23 21:02:39
*/

'use strict';
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');


// user-login页面逻辑
var page = {
    init: function() {
        this.onload();
    },

    onload: function() {
       navSide.init({
            name: 'user-center'
       });
       this.loadUserInfo();
    },

    loadUserInfo: function() {

    }

   
};

$(function() {
    page.init();  
});