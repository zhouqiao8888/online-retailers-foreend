/* 
* @Author: zhou qiao
* @Date:   2019-01-22 21:40:26
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-23 19:59:28
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

// user-pass-reset页面逻辑
var page = {
    data : {
        username: '',
        question: '',
        answer: '',
        password: '',
        token: ''
    },
   
    init: function() {
        this.onload();
        this.bindEvent();
    },

    onload: function() {
        this.loadStepUsername();
    },

    bindEvent: function() {
        var _this = this;

        // 点击输入用户名提交按钮
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            // 若输入用户名不为空，请求相应的密保问题
            if(username) {
                _user.getSecurityQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepAnswer();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            else {
                formError.show('用户名不能为空');
            }
        });

        // 点击输入密码提示答案按钮
        $('#submit-answer').click(function() {
            var answer = $.trim($('#answer').val());
            // 若输入答案不为空，校验答案
            if(answer) {
                _this.data.answer = answer;
                _user.checkSecurityAnswer(_this.data, function(res) {
                   _this.data.token = res;
                   _this.loadStepNewPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            else {
                formError.show('密码提示答案不能为空');
            }
        });

        // 点击输入新密码那一步
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            // 若输入新密码不为空，则重置密码
            if(password && password.length >= 6) {
                _this.data.password = password;
                _user.forgetRestPassword(_this.data, function(res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            else {
                formError.show('新密码长度不得少于6位');
            }
        });
      
    },

    // 加载输入用户名的那一步
    loadStepUsername: function() {
        $('.step-username').show();
    },

    // 加载输入密码提示答案那一步
    loadStepAnswer: function() {
        formError.hide();
        $('.step-username').hide().siblings('.step-question').
        show().find('.tip-question').text(this.data.question);
    },

    // 加载输入新密码那一步  
    loadStepNewPassword: function() {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    }


    
};

$(function() {
    page.init();  
});