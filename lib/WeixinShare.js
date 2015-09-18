/**
 * Created by nasa on 15/8/25.
 */

var React = require('react');
var request = require('superagent');

var WeixinShare = React.createClass({
    getDefaultProps: function(){
      return {
        wxtitle:'',
        wxdesc:'',
        wxlink:'',
        wximgUrl:'',
        showOption:true
      }
    },
    changeWx:function () {

      var getProps = function(){
        return this.props;
      }.bind(this);


      wx.onMenuShareAppMessage({
          title: getProps().wxtitle,
          desc: getProps().wxdesc,
          link: getProps().wxlink,
          imgUrl: getProps().wximgUrl,
          trigger: function (res) { },
          success: function (res) { },
          cancel: function (res) { },
          fail: function (res) { }
      });

      wx.onMenuShareTimeline({
          title: getProps().wxtitle + "，" + getProps().wxdesc,
          link: getProps().wxlink,
          imgUrl: getProps().wximgUrl,
          trigger: function (res) { },
          success: function (res) { },
          cancel: function (res) { },
          fail: function (res) { }
      });


      if(!this.props.showOption){
        wx.hideOptionMenu();
      }
    },
    componentWillMount: function(){
      var url = 'http://p.baleina.cn/puzzle/api/559e41a872dd5290337a136d/get_jsConfig';
      request.post(url).send({ url: window.location.href }).end(function(err, res) {
        var json = res.body;
        wx.config({
          debug: false,
          appId: json["appId"],
          timestamp: json["timestamp"],
          nonceStr: json["nonceStr"],
          signature: json["signature"],
          jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'pauseVoice',
              'stopVoice',
              'onVoicePlayEnd',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'translateVoice',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard',
          ]
        });
      });

      wx.ready((function(_this) {
        return function() {
          _this.changeWx();
        };
      })(this));

    },
    render: function(){
      this.changeWx();
      var content = (<div />);
      return content;
    }
})

module.exports = WeixinShare;
