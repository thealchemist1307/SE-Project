import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

class Calendar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            startDate : new Date()
        };
    }

    handleChange = date =>{
        
        this.setState({
            startDate:date
        },()=>{
            this.sendData();
            console.log(this.state.startDate)

        })
        
    }

    sendData = () => {
        this.props.setDate(this.state.startDate);
    }

    render()
    {
        return(
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
            />
        )
    }
}

export default Calendar;