var React = require('react');
var moment = require('moment-timezone');
var DepartureDatePicker = require('./departure-datepicker.jsx');
var Actions = require('./actions');
var trainStore = require('./store');
var emptyTrain = require('./emptyTrain.json');
var exampleTrain = require('./exampleTrain.json');

var TrainInfo = React.createClass({
    render: function () {
        return (
            <div className="trainInfo">
                Train number: {this.props.data.trainNumber}
                <br/>Departure date: {this.props.data.departureDate}
            </div>
        )
    }
});

var ScheduleTable = React.createClass({
    getInitialState: function () {
        return { train: exampleTrain }
    },
    render: function() {
        return (
            <div className="ScheduleTable">
                <TrainInfo data={this.state.train} />
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
