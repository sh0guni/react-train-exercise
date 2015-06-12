var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var DepartureDatePicker = React.createClass({
    getInitialState: function () {
        return {departureDate: null}
    },
    handleDateChange: function(date) {
        this.setState({
            departureDate: date
        });
        var formattedDate = moment(date).format("DD-MM-YYYY");
        this.props.handleDateChange(formattedDate);
    },
    render: function() {
        return (
            <div className="departureDatePicker">
                <DatePicker
                    key="example3"
                    placeholderText="Click to select a date"
                    dateFormat="DD-MM-YYYY"
                    selected={this.state.departureDate}
                    onChange={this.handleDateChange}
                    />
            </div>
        )
    }
});

module.exports = DepartureDatePicker;