var Reflux = require('reflux');
var request = require('superagent');

var Actions = Reflux.createActions({
    "trainSearch": {asyncResult: true}
});

Actions.trainSearch.listen(function (train) {
    var url = 'http://rata.digitraffic.fi/api/v1/schedules/' + train.trainNumber + '?departure_date=' + train.departureDate;
    request.get(url, function(err, res) {
        if (err) throw err;
        var newTrain = res.body.code ? emptyTrain : res.body;
        Actions.trainSearch.completed(newTrain);
    });
});

module.exports = Actions;