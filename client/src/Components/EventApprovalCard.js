import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Stylesheets/main4.css";
class EventApprovalCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: this.props.status };
        this.deleteLocation = this.deleteLocation.bind(this);
        this.approveLocation = this.approveLocation.bind(this);
    }

    deleteLocation() {
        console.log("METHOD FIRED");
        const deletedEvent = {
            id: this.props.id,
            status: this.state.status,
            eventName: this.props.eventName,
            eventAddr: this.props.eventAddr,
        };
        let deleteFlag = 0;
        axios
            .post("/api/events/delete", deletedEvent)
            .then((res) => {
                console.log(res.data);
                deleteFlag = 1;
            })
            .catch((err) => {
                console.log(err);
            });

        toast.error("Event deleted", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    approveLocation() {
        const approvedEvent = {
            id: this.props.id,
            status: this.state.status,
            eventName: this.props.eventName,
            eventAddr: this.props.eventAddr,
        };
        axios
            .post("/api/events/approve", approvedEvent)
            .then((res) => {
                console.log(res.data);
                console.log(this.state);
            })
            .catch((err) => {
                console.log(err);
            });
        toast.success("Event approved.Refresh the page.", {
            position: toast.POSITION.TOP_RIGHT,
        });

        this.setState({ status: "1" });
    }

    render() {
        let buttons;
        const status = this.state.status;
        if (status == "0") {
            buttons = (
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button
                        class="button is-success"
                        onClick={this.approveLocation}
                        id="bun12"
                    >
                        &#10004;
                    </button>

                    <button
                        class="button is-danger"
                        onClick={this.deleteLocation}
                        id="bun13"
                    >
                        X
                    </button>
                </div>
            );
        } else {
            buttons = (
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <a href="#" onClick={this.deleteLocation}>
                        <button class="btn btn-primary" id="buttonl25">
                            X
                        </button>
                    </a>
                </div>
            );
        }

        return (
            <div>
                <div className="card">
                    <h3 className="title">{this.props.eventName}</h3>
                    <p className="title2"></p>
                    <div class="bar">
                        <div className="emptybar"></div>
                        <div className="filledbar"></div>
                    </div>
                    <p className="message3">
                        Address: <br></br>
                        {this.props.eventAddr}
                    </p>
                    {buttons}
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

export default connect(mapStateToProps)(EventApprovalCard);
