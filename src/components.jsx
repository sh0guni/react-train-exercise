var React = require('react');
var DepartureDatePicker = require('./departure-datepicker.jsx');
var Actions = require('./actions');
var trainStore = require('./store');
var emptyTrain = require('./emptyTrain.json');
var parseTime = require('./time-parser');

var SearchBox = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var trainNumber = this.state.trainNumber;
        var departureDate = this.state.departureDate;
        if (!trainNumber || !departureDate) {
            return;
        }
        Actions.trainSearch({trainNumber: trainNumber, departureDate: departureDate});
    },
    handleDateChange: function(date) {
        this.setState({
            departureDate: date
        });
    },
    handleTrainNumberChange: function (event) {
        this.setState({
            trainNumber: event.target.value
        });
    },
    render: function () {
        return (
            <div className="searchBox">
                <form className="searchForm" onSubmit={this.handleSubmit}>
                    Train number:<br/>
                    <input type="text" onChange={this.handleTrainNumberChange}/>
                    <br/>
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

var TrainSearch = React.createClass({
    render: function () {
        return (
            <div className="TrainSearchApp">
                <SearchBox />
                <ScheduleTable />
            </div>
        )
    }
});

module.exports = TrainSearch;
