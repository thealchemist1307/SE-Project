import React from "react";
import Calendar from "./Calendar";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

import "../Stylesheets/cabform.css";
import "../Stylesheets/main4.css";
import Select from "react-select";

class CabForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitRequest = this.submitRequest.bind(this);
    this.updateText = this.updateText.bind(this);
    this.setDate = this.setDate.bind(this);
    this.state = {
      value: "",
      date: Date.now,
      fromValue: "check",
      toValue: "check",
      options: []
    };
    this.fromSelect = this.fromSelect.bind(this);
    this.toSelect = this.toSelect.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/events/get")
      .then(response => {
        const data = response.data;
        console.log(data);
        const optionList = data.map((event, index) => {
          return { value: event.eventName, label: event.eventName };
        });
        this.setState({ options: optionList });
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateText(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }
  submitRequest(event) {
    console.log(this.props.user);
    event.preventDefault();
    console.log(this.state.value);
    const newRequest = {
      name: this.props.user.name,
      msg: this.state.value,
      date: this.state.date,
      emailID: this.props.user.email,
      from: this.state.fromValue,
      to: this.state.toValue
    };
    console.log(newRequest);
    var today = new Date();
    var tday=today.getDate();
    var tmonth=today.getMonth();
    var tyear=today.getFullYear();
    console.log("Today "+today)
    console.log("Today "+tday)
    const dateobj = moment(this.state.date);
      var newDateObj = moment(dateobj).toDate();
      var day=moment(newDateObj).date()
      var month=moment(newDateObj).month()
      var year=moment(newDateObj).year()
      console.log("Selected "+newDateObj)
      console.log("Selected "+day)
    if(((tyear>year)||(tyear==year && tmonth>month)||(tyear==year && tmonth==month && tday>day)))
    {
      toast.error("You cannot submit a request with a past date !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else if(this.state.toValue===this.state.fromValue){
      toast.error("You cannot have same To and From value !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else{
    axios
      .post("/api/cabs/request", newRequest)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
        console.log("CabForm");
      });
    axios
      .post("/calendarcreate")
      .then(res=>{console.log(res.data)})
      .catch(err=>{
        console.log(err);
      })
  
    }
  }
  setDate(childData) {
    this.setState({ date: childData });
    console.log(this.state.date);
  }
  fromSelect(event) {
    console.log(event);
    this.setState({ fromValue: event.label });
    console.log(this.state);
  }
  toSelect(event) {
    this.setState({ toValue: event.label });
    console.log(this.state);
  }
  render() {   
    const customStyles = {
      container: provided => ({
        ...provided,
        display: "inline-block",
        width: "250px",
        minHeight: "1px",
        textAlign: "left",
        border: "none"
      }),
      control: provided => ({
        ...provided,
        border: "2px solid #757575",
        borderRadius: "10px",
        minHeight: "1px",
        height: "40px",
      }),
      input: provided => ({
        ...provided,
        minHeight: "1px",
        height: "40px",
        marginLeft: "160px",
        background: "#fff"
      }),
      placeholder: provided => ({
        ...provided,
        marginTop: "0px"
      }),
      dropdownIndicator: provided => ({
        ...provided,
        minHeight: "1px",
        paddingTop: "0",
        paddingBottom: "0",
        color: "#757575"
      }),
      indicatorSeparator: provided => ({
        ...provided,
        minHeight: "1px",
        height: "24px"
      }),
      clearIndicator: provided => ({
        ...provided,
        minHeight: "1px"
      }),
      valueContainer: provided => ({
        ...provided,
        minHeight: "1px",
        height: "20px",
        paddingTop: "0",
        paddingBottom: "0"
      }),
      singleValue: provided => ({
        ...provided,
        minHeight: "1px",
        paddingTop: "95px",
        
      })
    };
    
    return (
      <div className="column is-half" id="cont2">
        <p className="text">Add a Cab Request</p>

        <div class="field" id="f1">
          <br />
          <label class="label">Departure Time</label>
          <Calendar setDate={this.setDate} />
        </div>
        <label class="label" id="l1">
          From
        </label>
        <div class="control">
          <div>
            <Select
              onChange={this.fromSelect}
              options={this.state.options}
              styles={customStyles}
              isSearchable={true}
            />
          </div>
          <label class="label" id="l2">
            To
          </label>
          <div class="field" id="f1">
            <Select
              onChange={this.toSelect}
              options={this.state.options}
              styles={customStyles}

              isSearchable={true}
            />
            <br />
          </div>
          <div class="field" id="f1">
            <label class="label" id="l3">
              Message
            </label>
            <div class="control">
              <textarea
                class="textarea"
                id="te1"
                placeholder="Textarea"
                onChange={this.updateText}
                value={this.state.value}
              ></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-link"
                id="buto1"
                onClick={this.submitRequest}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(CabForm);