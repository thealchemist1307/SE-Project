import React from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";
class UpcomingRideCard extends React.Component {
    constructor(props) {
        super(props);
        this.onCompleted = this.onCompleted.bind(this);
        this.notifyMe = this.notifyMe.bind(this);
    }

    notifyMe() {
        console.log(this.props.user);
        const dateobj = moment(this.props.dateofrequest);
        console.log(dateobj);
        const information = {
            dateTime: dateobj,
            refreshToken: this.props.user.refreshToken,
        };
        toast.success("The event has been added to your Google Calendar", {
            position: toast.POSITION.TOP_RIGHT,
        });
        console.log(information);
        axios
            .post("/calendar/add", information)
            .then((res) => {
                console.log("information is " + information);
                console.log("event added");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onCompleted() {
        const oldRequest = {
            id: this.props.id,
            name: this.props.user.name,
            email: this.props.user.email,
        };
        console.log(oldRequest);
        console.log(this.props.length);
        axios
            .post("/api/deleteride", oldRequest)
            .then((res) => {
                console.log("Sucessful");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const dateobj = moment(this.props.dateofrequest);
        var newDateObj = moment(dateobj).toDate();
        var date = moment(newDateObj).format("DD/MM/YY");
        var time = moment(newDateObj).format("HH:mm");

        return (
            <div>
                <div class="card2">
                    <header class="card-header" id="head4">
                        <p class="card-header-title" id="head4t">
                            {this.props.requesterName}
                        </p>
                        <a
                            href="#"
                            class="card-header-icon"
                            aria-label="more options"
                        >
                            <span class="icon">
                                <i
                                    class="fas fa-angle-down"
                                    aria-hidden="true"
                                ></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-content contentcard">
                        <div class="content">
                            <p id="p1">
                                {/* <b>MESSAGE : </b>&nbsp;{this.props.message} */}
                            </p>
                            <div class="bar2">
                                <div className="emptybar2"></div>
                                <div className="filledbar2"></div>
                            </div>
                            <br />
                            <br />
                            <time datetime="2016-1-1" id="d1">
                                <b>DATE : </b>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {date}
                            </time>
                            <br />
                            <time datetime="2016-1-1" id="t1">
                                <b>TIME : </b>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {time}
                            </time>
                            <br />
                            <b>FROM : </b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {this.props.from}
                            <br />
                            <b>TO : </b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {this.props.to}
                        </div>
                    </div>

                    <footer class="card-footer footcard">
                        <a
                            href="#"
                            class="card-footer-item"
                            id="lin1"
                            onClick={this.onCompleted}
                        >
                            Ride Completed
                        </a>
                        {/* <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a> */}
                        <a
                            href="#"
                            class="card-footer-item"
                            id="lin1"
                            onClick={this.notifyMe}
                        >
                            Notify Me
                        </a>
                    </footer>
                </div>
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(UpcomingRideCard);
