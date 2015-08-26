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
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
          ]
        });
      });

      wx.ready((function(_this) {
        return function() {
          changeWx();
        };
      })(this));

      var changeWx;

      changeWx = (function(_this) {
        return function() {
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

          function getProps(){
            return _this.props;
          }

          if(!_this.props.showOption){
            wx.hideOptionMenu();
          }
        };
      })(this);
    },
    render: function(){
      var content = (<div style={{display:'none'}}></div>);
      return content;
    }
})

module.exports = WeixinShare;
