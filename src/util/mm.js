/* 
* @Author: zhou qiao
* @Date:   2019-01-15 19:22:20
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-17 13:27:30
*/

'use strict';
var conf = {
    serverHost: ''
};

// hogan新的引入方式要加.js
var Hogan = require('hogan.js');

var _mm = {
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
           
            success: function(res) {
                 // 请求数据成功
                if(0 == res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 需要强制登陆
                else if(10 == res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 == res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            // 请求失败：404/505等
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    // 获取服务器地址
    getServerURL: function(path) {
        return conf.serverHost + path;
    },

    // 获取url参数
    getURLParam: function(name) {
         var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
         var result = window.location.search.substr(1).match(reg);
         return result ? decodeURIComponent(result[2]) : null;
    },

    //渲染html模板
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data); 
        return result;   
    },

    //成功提示
    successTips: function(msg) {
        alert(msg || '操作成功');
    },

    //错误提示
    errorTips: function(msg) {
        alert(msg || '操作失败');
    },

    //姓名、电话等校验
    validate: function(value, type) {
        //非空验证，若非空，返回false
        if('require' == type) {
            return !!value;
        }
        //电话号码验证
        if('phone' == type) {
            var reg = /^1[34578]\d(9)$/;
            return reg.test(value);
        }
        //邮箱格式验证
        if('email' == type) {
            var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
            return reg.test(value);
        }     
    },

    // 通用登陆处理
    doLogin: function() {
        window.location.href = './login/login.html?redirect=' + encodeURIComponent(window.location.href);
    },

    //跳转到主页
    goHome: function() {
        window.location.href = './index.html';
    }
};

module.exports = _mm;