webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(115);


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

	/* 
	* @Author: zhou qiao
	* @Date:   2019-01-21 20:36:32
	* @Last Modified by:   zhou qiao
	* @Last Modified time: 2019-01-22 20:35:01
	*/

	'use strict';
	var _mm = __webpack_require__(97);

	var _user = {
	    // 用户登录，如果成功则解析，如果失败则拒绝，要自定义解析策略和拒绝策略
	    login: function(userInfo, resolve, reject) {
	        _mm.request({
	            url: _mm.getServerURL('/user/login.do'),
	            data: userInfo,
	            method: 'post',
	            success: resolve,
	            error: reject    
	        });           
	    },

	    // 检查用户名是否已存在
	    checkUsername: function(username, resolve, reject) {
	        _mm.request({
	            url: _mm.getServerURL('/user/checkValid.do'),
	            data: {
	                str: username,
	                type: 'username'
	            },
	            method: 'post',
	            success: resolve,
	            error: reject    
	        });           
	    },

	    // 用户注册
	    register: function(userInfo, resolve, reject) {
	        _mm.request({
	            url: _mm.getServerURL('/user/register.do'),
	            data: userInfo,
	            method: 'post',
	            success: resolve,
	            error: reject    
	        });           
	    },

	    // 获取用户登录信息
	    checkLogin: function(resolve, reject) {
	        _mm.request({
	            url: _mm.getServerURL('/user/getUserInfo.do'),
	            method: 'post',
	            success: resolve,
	            error: reject    
	        });           
	    },

	    // 退出登录
	    loginOut: function(resolve, reject) {
	        _mm.request({
	            url: _mm.getServerURL('/user/loginOut.do'),
	            method: 'post',
	            success: resolve,
	            error: reject    
	        });           
	    }
	};

	module.exports = _user;

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

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

	/* 
	* @Author: zhou qiao
	* @Date:   2019-01-11 14:57:06
	* @Last Modified by:   zhou qiao
	* @Last Modified time: 2019-01-22 20:03:33
	*/

	'use strict';

	__webpack_require__(116);
	__webpack_require__(112);
	var _user = __webpack_require__(104);
	var _mm = __webpack_require__(97);

	// 表单里的错误提示
	var formError = {
	    show: function(errMsg) {
	        $('.error-item').show().find('.error-msg').text(errMsg);
	    },
	    hide: function(errMsg) {
	        $('.error-item').hide().find('.error-msg').text('');
	    }
	};

	// user-login页面逻辑
	var page = {
	    init: function() {
	        this.bindEvent();
	    },

	    bindEvent: function() {
	        var _this = this;
	        // 点击提交按钮
	        $('#submit').click(function() {
	            _this.submit();
	        });
	        // 如果按下回车，也进行提交
	        $('.user-content').keyup(function(e) {
	            if(e.keyCode == 13) {
	                _this.submit();
	            }
	        });
	    },

	    // 提交表单
	    submit: function() {
	        var formData = {
	           username: $.trim($('#username').val()), 
	           password: $.trim($('#password').val())
	        };
	        // 表单验证结果
	        var validateResult = this.formValidate(formData);
	        // 验证成功，进行登录。若登陆成功，进行相应的重定向；否则展示错误信息
	        if(validateResult.status) {
	           _user.login(formData, function(res) {
	                window.location.href = _mm.getURLParam('redirect') || './index.html';
	           }, function(errMsg) {
	                formError.show(errMsg);
	           });
	        }
	        // 验证失败
	        else {
	           formError.show(validateResult.msg); 
	        }
	    },

	    // 表单验证
	    formValidate: function(formData) {
	        var result = {
	            status: false,
	            msg: ''
	        };
	        // 校验用户名是否为空
	        if(!_mm.validate(formData.username, 'require')) {
	            result.msg = '用户名不能为空';
	            return result;
	        }
	        // 校验密码是否为空
	        if(!_mm.validate(formData.password, 'require')) {
	            result.msg = '密码不能为空';
	            return result;
	        }
	        // 通过验证，重置result
	        result.status = true;
	        result.msg = '验证通过';
	        return result;
	    }
	};

	$(function() {
	    page.init();  
	});

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});