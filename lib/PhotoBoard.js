/**
 * Created by nasa on 15/8/21.
 */
var React = require('react');

var Hammer = require('hammerjs');

require('../styles/PhotoBoard.scss');
require('../styles/ImageHolder.scss');
var PhotoBoardItem = require('./PhotoBoardItem')

var StyleObj = {
    position: "relative",
    width:"300px",
    height:"425.62px",
    background:"#bee2ea",
    borderRadius:"2px"
}

var PhotoBoard = React.createClass({
    componentWillMount:function(){
        if (!Hammer) {
            throw new Error('PhotoBoard requires Hammer.');
        }
        //var imgSrc = $(this).children('img').attr('src');
        //$(this).css('background', 'url("' + imgSrc + '")');
        //$(this).children('img').hide();
        //$(this).css('background-position', 'initial');
    },
    render: function() {
        return (
            <div style={this.props.style}>
                <div style={{overflow:"hidden"}}>
                    <div ref="photoContainer" style={StyleObj} className="PhotoBoard">
                        <div className="background-image-holder">
                            <img alt="image" className="background-image" src={ this.props.background } />
                        </div>
                        <PhotoBoardItem></PhotoBoardItem>
                        <div className="cover-image-holder">
                            <img alt="image" className="cover-image" src={ this.props.cover } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = PhotoBoard;
