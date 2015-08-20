/**
 * Created by nasa on 15/8/19.
 */
var React = require('react');
var Phaser = require('phaser');
//Phaser.module('Wheel', []);


if (!Phaser) {
    throw new Error('Wheel requires Phaser.');
}

var Wheel = React.createClass({
    getDefaultProps:function(){
        return {
            wheel_img: "img/wheel.png",
            pin_img: "img/pin.png",
            backgroundColor:"#880044",
            slicePrizes:["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"],
            slices:8
        }
    },
    componentDidMount:function(){
        // the game itself
        var game;
        // the spinning wheel
        var wheel;
        // can the wheel spin?
        var canSpin;
        // slices (prizes) placed in the wheel
        var slices = this.props.slices;
        // prize names, starting from 12 o'clock going clockwise
        var slicePrizes = this.props.slicePrizes;
        // the prize you are about to win
        var prize;
        // text field where to show the prize
        var prizeText;
        // PLAYGAME STATE
        var wheel_img = this.props.wheel_img;
        var pin_img = this.props.pin_img;
        var backgroundColor = this.props.backgroundColor;
        var onCanSpin = this.props.onCanSpin;
        var onWinPrize = this.props.onWinPrize;
        var showRes = this.props.showRes;

        var playGame = function(game){};

        playGame.prototype = {
            // function to be executed once the state preloads
            preload: function(){
                // preloading graphic assets
                game.load.image("wheel", wheel_img);
                game.load.image("pin", pin_img);
            },
            // funtion to be executed when the state is created
            create: function(){
                // giving some color to background
                game.stage.backgroundColor = backgroundColor;
                // adding the wheel in the middle of the canvas
                wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
                wheel.width = 300;
                wheel.height = 300;
                // setting wheel registration point in its center
                wheel.anchor.set(0.5);
                // adding the pin in the middle of the canvas
                var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
                pin.width = 99;
                pin.height = 99;
                // setting pin registration point in its center
                pin.anchor.set(0.5);
                // adding the text field
                if(showRes){
                    prizeText = game.add.text(game.world.centerX, 480, "");
                    // setting text field registration point in its center
                    prizeText.anchor.set(0.5);
                    // aligning the text to center
                    prizeText.align = "center";
                }

                // the game has just started = we can spin the wheel
                canSpin = true;
                // waiting for your input, then calling "spin" function
                game.input.onDown.add(this.spin, this);
            },
            // function to spin the wheel
            spin(){
                // can we spin the wheel?
                if(canSpin){
                    if(!onCanSpin){throw new Error('Wheel need onCanSpin prop.');}
                    onCanSpin(game, slices, (function(_this) {
                        return  function(err, _degrees, _prize, _canSpin) {
                            if(err==null&&_canSpin){
                                if(showRes){
                                    // resetting text field
                                    prizeText.text = "";
                                }
                                // the wheel will spin round from 2 to 4 times. This is just coreography
                                var rounds = game.rnd.between(2, 4);



                                // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
                                var degrees = _degrees;
                                // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
                                prize = _prize;
                                // now the wheel cannot spin because it's already spinning
                                canSpin = false;
                                // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
                                // the quadratic easing will simulate friction
                                var spinTween = game.add.tween(wheel).to({
                                    angle: 360 * rounds + degrees
                                }, 3000, Phaser.Easing.Quadratic.Out, true);
                                // once the tween is completed, call winPrize function
                                spinTween.onComplete.add(_this.winPrize, _this);
                            }
                        };
                    })(this));

                }
            },
            // function to assign the prize
            winPrize(){
                // now we can spin the wheel again
                canSpin = true;
                if(showRes){
                    // writing the prize you just won
                    prizeText.text = slicePrizes[prize];
                }
                if(!onWinPrize){return null;}
                onWinPrize(prize,slicePrizes[prize]);
            }
        }


        // creation of a 458x488 game
        game = new Phaser.Game(300, 300, Phaser.AUTO, this.refs.gameContainer.getDOMNode(),null,true);
        // adding "PlayGame" state
        game.state.add("PlayGame",playGame);
        // launching "PlayGame" state
        game.state.start("PlayGame");
    },
    render: function() {
        return (
            <div style={this.props.style}>
                <div ref="gameContainer" style={{width:"300px",height:"300px"}}></div>
            </div>
        )
    }
});


module.exports = Wheel;