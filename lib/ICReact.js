/**
 * Created by nasa on 15/8/19.
 */
'use strict';

var React = require('react');

if (!React) {
    throw new Error('ICReact requires React.');
}

module.exports = {
    VERSION: '1.0.0-beta1',

    Wheel: require('./Wheel')
}