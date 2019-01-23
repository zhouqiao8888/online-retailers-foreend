/* 
* @Author: zhou qiao
* @Date:   2019-01-22 10:31:00
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-22 18:11:12
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.css');
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
        // 输入用户名后立即检查
        $('#username').blur(function() {
            // 用户名为空，不做验证
            var username = $.trim($('#username').val());
            if(!username) {
                return;
            }

            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res) {
                formError.hide();
            }, function(errMsg) {
                formError.show(errMsg);
            });
        });

        // 点击注册按钮
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
            password: $.trim($('#password').val()),
            // 注意不能定义password-confirm这样的属性，只能写成passwordConfirm
            passwordConfirm: $.trim($('#password-confirm').val()),  
            phone: $.trim($('#phone').val()), 
            email: $.trim($('#email').val()), 
            question: $.trim($('#question').val()), 
            answer: $.trim($('#answer').val()) 
        };
        // 表单验证结果
        var validateResult = this.formValidate(formData);
        // 验证成功，进行注册，并跳转到result.html
        if(validateResult.status) {
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register';
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

        // 校验密码长度 
        if(formData.password.length < 6) {
            result.msg = '密码长度不得少于6位';
            return result;
        }

        // 校验重新输入的密码长度
        if(formData.passwordConfirm.length < 6) {
            result.msg = '再次输入的密码长度不得少于6位';
            return result;
        }

        // 校验两次输入的密码是否一致
        if(formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }

        // 校验手机号格式
        if(!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }

        // 校验邮箱格式
        if(!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }

        // 校验密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }

        // 校验密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
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