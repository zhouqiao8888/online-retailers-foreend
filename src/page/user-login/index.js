/* 
* @Author: zhou qiao
* @Date:   2019-01-11 14:57:06
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-23 17:20:32
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

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