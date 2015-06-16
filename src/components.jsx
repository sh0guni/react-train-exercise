var React = require('react');
var moment = require('moment-timezone');
var DepartureDatePicker = require('./departure-datepicker.jsx');
var Actions = require('./actions');
var trainStore = require('./store');
var emptyTrain = require('./emptyTrain.json');
var exampleTrain = require('./exampleTrain.json');

var ScheduleTable = React.createClass({
    getInitialState: function () {
        return { train: exampleTrain }
    },
    render: function() {
        return (
            <div className="ScheduleTable">
                Train number: {this.state.train.trainNumber}
                <br/>Departure date: {this.state.train.departureDate}
            </div>
        )
    }
});

var TrainSearch = React.createClass({
    render: function () {
        return (
            <div className="TrainSearchApp">
                <ScheduleTable />
            </div>
        )
    }
});

module.exports = TrainSearch;
