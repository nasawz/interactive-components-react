/**
 * Created by nasa on 15/8/21.
 */
var React = require('react');

var Hammer = require('hammerjs');

var PhotoBoardItem = React.createClass({
    componentWillMount:function(){
        if (!Hammer) {
            throw new Error('PhotoBoard requires Hammer.');
        }
    },
    initDrag: function(){
        /**
         * kind of messy code, but good enough for now
         */
        // polyfill
        var reqAnimationFrame = (function () {
            return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();


        var screen = {
            offsetWidth:300,
            offsetHeight:425.62
        }
        var el = this.refs.hitarea.getDOMNode();

        var START_X = Math.round((screen.offsetWidth - el.offsetWidth) / 2);
        var START_Y = Math.round((screen.offsetHeight - el.offsetHeight) / 2);

        var ticking = false;
        var transform;
        var timer;

        var mc = new Hammer.Manager(el);
        mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

        mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
        mc.add(new Hammer.Tap());

        mc.on("panstart panmove", onPan);
        mc.on("rotatestart rotatemove", onRotate);
        mc.on("pinchstart pinchmove", onPinch);
        //mc.on("swipe", onSwipe);
        mc.on("tap", onTap);
        //mc.on("doubletap", onDoubleTap);

        mc.on("hammer.input", function(ev) {
            if(ev.isFinal) {
                //resetElement();
                START_X = transform.translate.x;
                START_Y = transform.translate.y;
                initScale = transform.scale;
                initAngle = transform.angle;
            }
        });

        function logEvent(ev) {
            console.log(ev.type);
            //el.innerText = ev.type;
        }

        function resetElement() {
            el.className = 'animate';
            transform = {
                translate: { x: START_X, y: START_Y },
                scale: 1,
                angle: 0,
                rx: 0,
                ry: 0,
                rz: 0
            };
            requestElementUpdate();
        }


        function updateElementTransform() {
            var value = [
                'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
                'scale(' + transform.scale + ', ' + transform.scale + ')',
                'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
            ];

            value = value.join(" ");
            el.style.webkitTransform = value;
            el.style.mozTransform = value;
            el.style.transform = value;
            ticking = false;


        }

        function requestElementUpdate() {
            if(!ticking) {
                reqAnimationFrame(updateElementTransform);
                ticking = true;
            }
        }


        function onPan(ev) {
            el.className = '';
            console.log(el)
            transform.translate = {
                x: START_X + ev.deltaX,
                y: START_Y + ev.deltaY
            };

            logEvent(ev);
            requestElementUpdate();
        }

        var initScale = 1;
        function onPinch(ev) {
            if(ev.type == 'pinchstart') {
                initScale = transform.scale || 1;
            }

            el.className = '';
            transform.scale = initScale * ev.scale;

            logEvent(ev);
            requestElementUpdate();
        }

        var initAngle = 0;
        function onRotate(ev) {
            if(ev.type == 'rotatestart') {
                initAngle = transform.angle || 0;
            }

            el.className = '';
            transform.rz = 1;
            transform.angle = initAngle + ev.rotation;

            logEvent(ev);
            requestElementUpdate();
        }

        function onSwipe(ev) {
            var angle = 50;
            transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
            transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
            transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

            clearTimeout(timer);
            timer = setTimeout(function () {
                //resetElement();
            }, 300);

            logEvent(ev);
            requestElementUpdate();
        }

        function onTap(ev) {
            transform.rx = 1;
            //transform.angle = 25;

            clearTimeout(timer);
            timer = setTimeout(function () {
                //resetElement();
            }, 200);

            logEvent(ev);
            requestElementUpdate();
        }

        function onDoubleTap(ev) {
            transform.rx = 1;
            transform.angle = 80;

            clearTimeout(timer);
            timer = setTimeout(function () {
                resetElement();
            }, 500);

            logEvent(ev);
            requestElementUpdate();
        }

        resetElement();
    },
    componentDidMount:function(){
        var img = new Image ();


        img.onload = (function(_this) {
            return function() {
                _this.refs.photoTarget.getDOMNode().src = img.src;
                var scale = 300/img.width;
                // _this.refs.hitarea.getDOMNode().style.width = "300px";
                _this.refs.hitarea.getDOMNode().style.width = img.width*scale+"px";
                _this.refs.hitarea.getDOMNode().style.height = img.height*scale+"px";
                _this.refs.photoTarget.getDOMNode().style.width = _this.refs.hitarea.getDOMNode().style.width;
                _this.refs.photoTarget.getDOMNode().style.height = _this.refs.photoTarget.getDOMNode().style.height;
                _this.refs.photoTarget.getDOMNode().style.display = 'block';
                _this.initDrag();
            };
        })(this);


        img.src = "img/photo.jpg";

        //src="img/photo.jpg"
    },
    render: function() {
        return (
            <div ref="hitarea" style={{width:"150px",height:"150px",background:"#fff"}}>
                <img ref="photoTarget" alt="image" className="photo-image" style={{display:'none'}}/>
            </div>
        )
    }
});


module.exports = PhotoBoardItem;
