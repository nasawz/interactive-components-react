/**
 * Created by nasa on 15/8/27.
 */

require('../styles/LoadMask.scss')
var React = require('react');



var LoadMask = React.createClass({
    render: function() {
        return (
            <div className="load-mask">
                <div className="loader"><div className="loader-inner ball-clip-rotate-pulse"><div></div><div></div><div></div><div></div></div></div>
            </div>
        )
    }
});


module.exports = LoadMask;
