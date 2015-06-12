var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var DepartureDatePicker = require('./departure-datepicker.jsx');
var moment = require('moment-timezone');

var emptyTrain = { trainNumber: '', departureDate: '', timeTableRows: [{stationShortCode: '', type: '', scheduledTime: null}]};

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

var trainStore = Reflux.createStore({
    listenables: Actions,
    onTrainSearchCompleted: function(train) {
        this.trigger(train);
    }
});

var SearchBox = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var trainNumber = React.findDOMNode(this.refs.trainNumber).value.trim();
        if (!trainNumber || !this.state.departureDate) {
            return;
        }
        Actions.trainSearch({trainNumber: trainNumber, departureDate: this.state.departureDate});
    },
    handleDateChange: function(date) {
        this.setState({
            departureDate: date
        });
    },
    render: function () {
        return (
            <div className="searchBox">
                <form className="searchForm" onSubmit={this.handleSubmit}>
                    Train number:<br/>
                    <input type="text" ref="trainNumber" /><br/>
                    Departure date:<br/>
                    <DepartureDatePicker handleDateChange={this.handleDateChange} />
                    <input type="submit" value="Search" /><br/>
                    <br/>
                </form>
            </div>
        )
    }
});

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
        var scheduledTime = this.props.data.scheduledTime  ? moment(this.props.data.scheduledTime).tz("Europe/Helsinki").format() : '';
        return (
            <tr>
                <td>{this.props.data.stationShortCode}</td>
                <td>{this.props.data.type}</td>
                <td>{scheduledTime}</td>
            </tr>
        )
    }
});

var TimeTableRows = React.createClass({
    render: function () {
        var timeTableRows = this.props.data.map(function (ttr) {
            return (
                <TimeTableRow data={ttr} />
            )
        });
        return (
            <div className="timeTableRows">
                Time table:
                <table style={ttrStyle}>
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
        return { train: emptyTrain }
    },
    onTrainUpdate: function(newTrain) {
        this.setState({ train: newTrain });
    },
    componentDidMount: function() {
        this.unsubscribe = trainStore.listen(this.onTrainUpdate);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
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

var TrainSearchApp = React.createClass({
    render: function () {
        return (
            <div className="TrainSearchApp">
                <SearchBox />
                <ScheduleTable />
            </div>
        )
    }
});

var ttrStyle = {
    textAlign: 'left'
};

React.render(
    <TrainSearchApp />,
    document.getElementById('app')
);