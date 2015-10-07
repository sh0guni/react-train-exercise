var React = require('react');
var moment = require('moment-timezone');
var DepartureDatePicker = require('./departure-datepicker.jsx');
var Actions = require('./actions');
var trainStore = require('./store');
var emptyTrain = require('./emptyTrain.json');
var exampleTrain = require('./exampleTrain.json');
var parseTime = require('./time-parser');

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

var TimeTableRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.data.stationShortCode}</td>
                <td>{this.props.data.type}</td>
                <td>{parseTime(this.props.data.scheduledTime)}</td>
            </tr>
        )
    }
});

var TimeTableRows = React.createClass({
    render: function () {
        var timeTableRows = this.props.data.map(function(ttr, id) {
            return (
                <TimeTableRow key={id} data={ttr} />
            )
        });
        return (
            <div className="timeTableRows">
                Time table:
                <table textAlign='left'>
                    <thead>
                    <tr>
                        <th>Station</th>
                        <th>Type</th>
                        <th>Scheduled time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {timeTableRows}
                    </tbody>
                </table>
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
                <TimeTableRows data={this.state.train.timeTableRows} />
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
