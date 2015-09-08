/**
 * Created by nasa on 15/8/21.
 */
var React = require('react');

var Hammer = require('hammerjs');
var html2canvas = require('html2canvas');

require('../styles/PhotoBoard.scss');
require('../styles/ImageHolder.scss');
var PhotoBoardItem = require('./PhotoBoardItem');
var PhotoSelectBtn = require('./PhotoSelectBtn');
var LoadMask = require('./LoadMask');

var StyleObj = {
    position: "relative",
    width:"300px",
    height:"425.62px",
    background:"#bee2ea",
    borderRadius:"2px"
}
var PhotoBoard = React.createClass({
  getDefaultProps: function(){
    return {
      selectPhotoBtnImg:'img/PhotoSelectBtn.png'
    }
  },
  getInitialState:function(){
				return {
					targetImgSrc: null,
                    loading:false
				}
			},
    componentWillMount:function(){
        if (!Hammer) {
            throw new Error('PhotoBoard requires Hammer.');
        }
        //var imgSrc = $(this).children('img').attr('src');
        //$(this).css('background', 'url("' + imgSrc + '")');
        //$(this).children('img').hide();
        //$(this).css('background-position', 'initial');
    },
    onSelectImg: function(result){
        this.setState({
					targetImgSrc: result
				});
    },
    renderTargetPhoto:function(){
      var content;
      if(this.state.targetImgSrc != null){
        content = (<PhotoBoardItem src={ this.state.targetImgSrc } ></PhotoBoardItem>);
      }else{
        content = (<PhotoSelectBtn btnImg={ this.props.selectPhotoBtnImg } onSelectImg={ this.onSelectImg }/>);
      }
      return content;
    },
    renderControls: function(){
      var content;
      if(this.state.targetImgSrc != null && !this.state.loading){
      // if(this.state.targetImgSrc != null){
        content = (
          <div className="row" style={{paddingTop:"20px"}}>
            <div className="col-50">
              <a href="javascript:;" onClick={ this.onClickCancel } className="button button-big button-cancel">{this.props.buttonCancel}</a>
            </div>
            <div className="col-50">
              <a href="javascript:;" onClick={ this.onClickOk } className="button button-big button-ok">{this.props.buttonSure}</a>
            </div>
          </div>
        );
      }
      return content;
    },
    renderLoadMask: function(){
        var content;
        // if(this.state.loading){
        //     content = (
        //         <LoadMask />
        //     );
        // }
        return content;
    },
    onClickCancel: function(){


      this.setState({
        targetImgSrc: null,
          loading: false
      });
    },
    onClickOk: function(){


        if(this.props.onClickOk){
          this.props.onClickOk(null,this.refs.mainContainer.getDOMNode().outerHTML)
        }


        this.setState({
           loading: true
        });
    },
    render: function() {
        return (
            <div style={this.props.style}>
                <div ref="mainContainer" style={{overflow:"hidden"}}>
                    <div ref="photoContainer" style={StyleObj} className="PhotoBoard">
                        <div className="background-image-holder">
                            <img alt="image" className="background-image" src={ this.props.background } />
                        </div>

                        { this.renderTargetPhoto() }

                        <div className="cover-image-holder">
                            <img alt="image" className="cover-image" src={ this.props.cover } />
                        </div>

                        { this.renderLoadMask() }
                    </div>
                </div>
                { this.renderControls() }
            </div>
        )
    }
});


module.exports = PhotoBoard;
