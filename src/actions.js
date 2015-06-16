var Reflux = require('reflux');
var request = require('superagent');
var emptyTrain = require('./emptyTrain.json');

function fetchTrain(train, callback) {
    var url = 'http://rata.digitraffic.fi/api/v1/schedules/' + train.trainNumber + '?departure_date=' + train.departureDate;
    request.get(url, function(err, res) {
        if (err) throw err;
        var newTrain = res.body.code ? emptyTrain : res.body;
        callback(newTrain);
    });
}
