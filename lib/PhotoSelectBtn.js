
require('../styles/PhotoSelectBtn.scss')
var React = require('react');


var styleObj = {
  position: "absolute",
  width: "140px",
  top:"100",
  left:(300-140)/2
}

var PhotoSelectBtn = React.createClass({
  getDefaultProps:function(){
    return {
      btnImg:'img/PhotoSelectBtn.png'
    }
  },
  componentWillMount: function(){
    styleObj.background = "url("+this.props.btnImg+") no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)"
  },
  handelSelectFile: function(e){
    var file = e.target.files[0];
    var imageType = /image.*/
    if(!file.type.match(imageType)){
      console.log("Not an Image");
      return 0;
    }
    var image = document.createElement("img");
    image.file = file;
    var reader = new FileReader()
    reader.onload = function(e){
        image.src = e.target.result;
        if(this.props.onSelectImg){
          this.props.onSelectImg(e.target.result);
        }
    }.bind(this);
    reader.readAsDataURL(file);

    // var canvas = document.createElement("canvas");
    // ctx = canvas.getContext("2d");
    // image.onload= function(){
    //   canvas.width = image.width;
    //   canvas.height = image.height;
    //   ctx.drawImage(image,0,0);
    //   document.body.appendChild(image);
    //   console.log(canvas.toDataURL('image/png'))
    // }
  },
    render: function() {
        return (
            <span className="PhotoSelectBtn" style={ styleObj } >
                <input type="file" accept="image/*" onChange={ this.handelSelectFile } />
            </span>
        )
    }
});


module.exports = PhotoSelectBtn;
