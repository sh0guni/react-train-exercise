var moment = require('moment-timezone');

module.exports = function(time) {
    return time ? moment(time).tz("Europe/Helsinki").format() : '';
};