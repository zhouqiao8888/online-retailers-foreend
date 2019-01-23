/* 
* @Author: zhou qiao
* @Date:   2019-01-21 20:36:32
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-23 16:45:10
*/

'use strict';
var _mm = require('util/mm.js');

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

    // 获取用户提示问题
    getSecurityQuestion: function(username, resolve, reject) {
        _mm.request({
            url: _mm.getServerURL('/user/getSecurityQuestion.do'),
            data: {
                username: username
            },
            method: 'post',
            success: resolve,
            error: reject    
        });           
    },

    // 校验用户提示问题答案
    checkSecurityAnswer: function(data, resolve, reject) {
        _mm.request({
            url: _mm.getServerURL('/user/checkSecurityAnswer.do'),
            data: {
                username: data.username,
                question: data.question,
                answer: data.answer
            },
            method: 'post',
            success: resolve,
            error: reject    
        });           
    },


    // 重置用户密码
    forgetRestPassword: function(data, resolve, reject) {
        _mm.request({
            url: _mm.getServerURL('/user/forgetRestPassword.do'),
            data: {
                username: data.username,
                newPassword: data.password,
                userToken: data.token
            },
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