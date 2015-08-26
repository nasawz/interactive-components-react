/**
 * Created by nasa on 15/8/25.
 */



var wxtitle = "丰田金融助你放飞青春 追逐梦想";
var wxdesc = "我的梦想小球准备起飞啦，大家来围观！";
var wxlink = "http://p.baleina.cn/ball/";
var wximgUrl = "http://p.baleina.cn/ball/game/images/share.jpg";
function onloadFun() {
    $.post('http://p.baleina.cn/puzzle/api/559e41a872dd5290337a136d/get_jsConfig',
        {
            url: window.location.href
        },
        function (json) {
            //console.log(json["appId"] + "|" + json["timestamp"] + "|" + json["nonceStr"] + "|" + json["signature"]);
            wx.config({
                debug: false,
                appId: json["appId"],
                timestamp: json["timestamp"],
                nonceStr: json["nonceStr"],
                signature: json["signature"],
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });

            wx.ready(function () {
                changeWx();
            });
        }, "json");
}

function changeWx() {
    var tline = wxtitle + "，" + wxdesc;
    wx.onMenuShareAppMessage({
        title: wxtitle,
        desc: wxdesc,
        link: wxlink,
        imgUrl: wximgUrl,
        trigger: function (res) { },
        success: function (res) { },
        cancel: function (res) { },
        fail: function (res) { }
    });

    wx.onMenuShareTimeline({
        title: tline,
        link: wxlink,
        imgUrl: wximgUrl,
        trigger: function (res) { },
        success: function (res) { },
        cancel: function (res) { },
        fail: function (res) { }
    });
}
window.addEventListener('load', onloadFun, false);