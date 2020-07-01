import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import VerticalNav from "./VerticalNav";
import HorizontalNav from "./HorizontalNav";
import "../Stylesheets/main4.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class SuggestEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            location: "",
            address: "",
        };
        this.updateText = this.updateText.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
    }

    updateText(event) {
        this.setState({ location: event.target.value });
    }

    updateAddress(event) {
        this.setState({ address: event.target.value });
    }

    submitEvent(event) {
        //api call to add it to mongodb
        const evt = {
            name: this.state.location,
            addr: this.state.address,
            status: "0",
        };
        console.log(evt);
        axios
            .post("/api/events/suggest", evt)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        toast.success("Event sent for approval!", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    render() {
        return (
            <div>
                <div className="box" id="nav1">
                    <VerticalNav />
                </div>
                <div className="columns">
                    <div className="column is-one-fifth sideNav">
                        <HorizontalNav />
                    </div>
                    <div class="box" id="cont3">
                        <input
                            class="input"
                            type="text"
                            placeholder="Enter event here"
                            onChange={this.updateText}
                            name="location"
                            width="250px"
                            id="in12"
                        ></input>

                        <br />
                        <p>
                            <div class="control">
                                <textarea
                                    class="textarea has-fixed-size"
                                    placeholder="Enter Event Address"
                                    onChange={this.updateAddress}
                                    name="address"
                                    id="in13"
                                ></textarea>
                            </div>
                        </p>
                        <br />
                        <button
                            class="button is-link"
                            onClick={this.submitEvent}
                            id="but25"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(SuggestEvents);
