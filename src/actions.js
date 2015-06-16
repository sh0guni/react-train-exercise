var Reflux = require('reflux');
var request = require('superagent');

var emptyTrain = { trainNumber: '', departureDate: '', timeTableRows: [{stationShortCode: '', type: '', scheduledTime: null}]};

function fetchTrain(train, callback) {
    var url = 'http://rata.digitraffic.fi/api/v1/schedules/' + train.trainNumber + '?departure_date=' + train.departureDate;
    request.get(url, function(err, res) {
        if (err) throw err;
        var newTrain = res.body.code ? emptyTrain : res.body;
        callback(newTrain);
    });
}

var Actions = Reflux.createActions({
    "trainSearch": {asyncResult: true}
});

Actions.trainSearch.listen(function (train) {
    fetchTrain(train, function(newTrain) {
        Actions.trainSearch.completed(newTrain);
    });
});

module.exports = Actions;