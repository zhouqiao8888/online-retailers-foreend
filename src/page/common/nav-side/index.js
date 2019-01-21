/* 
* @Author: zhou qiao
* @Date:   2019-01-17 11:18:42
* @Last Modified by:   zhou qiao
* @Last Modified time: 2019-01-17 20:52:12
*/

'use strict';
require('./index.css');

var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

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