webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(93);


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(94);
	__webpack_require__(101);
	var navSide = __webpack_require__(105);
	var _mm = __webpack_require__(97);


	navSide.init({
	    name: 'about'
	});

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

	/* 
	* @Author: zhou qiao
	* @Date:   2019-01-17 11:18:42
	* @Last Modified by:   zhou qiao
	* @Last Modified time: 2019-01-17 14:11:12
	*/

	'use strict';
	__webpack_require__(95);

	var _mm = __webpack_require__(97);
	// 通过页面头部
	var header = {
	    init: function() {
	        this.bindEvent();
	    },
	    //如果keyword不为空，则回填输入框
	    onload: function() {
	        var keyword = _mm.getURLParam('keyword');
	        if(keyword) {
	            $('#search-input').val(keyword);
	        };
	    },
	    // 触发搜索提交
	    bindEvent: function() {
	        var _this = this;
	         //点击搜索按钮，触发搜索提交
	        $('#search-btn').click(function() {
	            _this.searchSubmit();
	        });
	        // 按下回车键（13），触发搜索提交
	        $('#search-input').keyup(function(e) {
	            if(e.keyCode === 13) {
	                _this.searchSubmit();
	            }
	        });
	    },
	    // 提交
	    searchSubmit: function() {
	        var keyword = $.trim($('#search-input').val());
	        //如果keyword不为空，跳转到list.html
	        if(keyword) {
	            window.location.href = './list.html?keyword=' + keyword;
	        }
	        //如果keyword为空，返回主页
	        else {
	            _mm.goHome();
	        }
	    }

	};

	header.init();

/***/ }),

/***/ 95:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

	/* 
	* @Author: zhou qiao
	* @Date:   2019-01-16 21:44:56
	* @Last Modified by:   zhou qiao
	* @Last Modified time: 2019-01-22 20:47:12
	*/

	/*
	* @Author: Rosen
	* @Date:   2017-05-17 14:17:01
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-22 12:21:05
	*/

	'use strict';
	__webpack_require__(102);
	var _mm     = __webpack_require__(97);
	var _user   = __webpack_require__(104);
	// var _cart   = require('service/cart-service.js');

	// 表单里的错误提示
	var formError = {
	    show: function(errMsg) {
	        $('.error-item').show().find('.error-msg').text(errMsg);
	    },
	    hide: function(errMsg) {
	        $('.error-item').hide().find('.error-msg').text('');
	    }
	};

	// 导航
	var nav = {
	    init : function(){
	        this.bindEvent();
	        this.loadUserInfo();
	        // this.loadCartCount();
	        return this;
	    },
	    bindEvent : function() {
	        // 登录点击事件
	        $('.js-login').click(function() {
	            _mm.doLogin();
	        });
	        // 注册点击事件
	        $('.js-register').click(function() {
	            window.location.href = './user-register.html';
	        });
	        // 退出点击事件
	        $('.js-logout').click(function() {
	            _user.loginOut(function(res) {
	                window.location.reload();
	            }, function(errMsg){
	                _mm.errorTips(errMsg);
	            });
	        });
	    },
	    // 加载用户信息
	    loadUserInfo : function() {
	        _user.checkLogin(function(res) {
	            $('.user .not-login').hide().siblings('.user .login').show()
	                .find('.username').text(res.username);
	        }, function(errMsg) {
	            formError.show(errMsg);
	        });
	    },
	    // // 加载购物车数量
	    // loadCartCount : function(){
	    //     _cart.getCartCount(function(res){
	    //         $('.nav .cart-count').text(res || 0);
	    //     }, function(errMsg){
	    //         $('.nav .cart-count').text(0);
	    //     });
	    // }
	};

	module.exports = nav.init();

/***/ }),

/***/ 102:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

	/* 
	* @Author: zhou qiao
	* @Date:   2019-01-17 11:18:42
	* @Last Modified by:   zhou qiao
	* @Last Modified time: 2019-01-17 20:52:12
	*/

	'use strict';
	__webpack_require__(106);

	var _mm = __webpack_require__(97);
	var templateIndex = __webpack_require__(108);

	// 侧边导航选中变红
	var nav_side = {
	    option: {
	        name: '',
	        navList: [
	            {name:'user-center', desc:'个人中心', href:'./user-center.html'},
	            {name:'order-list', desc:'我的订单', href:'./order-list.html'},
	            {name:'update-pwd', desc:'修改密码', href:'./update-pwd.html'},
	            {name:'about', desc:'关于MMALL', href:'./about.html'}
	        ]
	    },

	    init: function(option) {
	        //合并选项
	        $.extend(this.option, option);
	        this.renderNav();
	    },

	    //渲染导航菜单
	    renderNav: function() {
	        //计算active数量
	        for(var i = 0, iLength = this.option.navList.length;i < iLength;i ++) {
	            if(this.option.navList[i].name === this.option.name) {
	                //设置标志位
	                this.option.navList[i].isActive = true;
	            }
	        };

	        //渲染list数据
	        var navHtml = _mm.renderHtml(templateIndex, {
	            navList: this.option.navList
	        });

	        //把html放入容器：将navHtml注入到nav-side.html中
	        $('.nav-side').html(navHtml);

	    }

	};

	module.exports = nav_side;

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n   <a class=\"link\" href=\"{{href}}\">{{desc}}</a>              \r\n</li>\r\n{{/navList}}";

/***/ })

});