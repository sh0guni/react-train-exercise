var Reflux = require('reflux');
var Actions = require('./actions');

var trainStore = Reflux.createStore({
    listenables: Actions,
    onTrainSearchCompleted: function(train) {
        this.trigger(train);
    }
});

module.exports = trainStore;