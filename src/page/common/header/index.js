/* 
* @Author: zhou qiao
* @Date:   2019-01-17 11:18:42
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-17 14:11:12
*/

'use strict';
require('./index.css');

var _mm = require('util/mm.js');
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