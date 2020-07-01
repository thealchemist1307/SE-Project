import React from "react";
import "../Stylesheets/main3.css";
import axios from "axios";
import EventApprovalCard from "./EventApprovalCard";

class AdminEvents extends React.Component {
    constructor() {
        super();
        this.state = { events: [] };
        this.onClick = this.onClick.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    onClick(event) {
        window.localStorage.removeItem("authToken");
        window.location.href = "/adminlogin";
    }

    goBack(event) {
        window.location.href = "/admin";
    }

    render() {
        axios
            .get("/api/events/getall")
            .then((response) => {
                const data = response.data;
                this.setState({ events: data });
            })
            .catch((err) => {
                console.log(err);
            });
        const myevents = this.state.events.map((item, index) => {
            return (
                <EventApprovalCard
                    key={index}
                    eventName={item.eventName}
                    status={item.status}
                    eventAddr={item.eventAddr}
                    action={this.forceUpdate}
                ></EventApprovalCard>
            );
        });

        return (
            <div>
                <div className="AdminPage">
                    <h1 id="header-text"></h1>
                    <button
                        className="btn btn-primary btn-large buttonlogout"
                        onClick={this.goBack}
                    >
                        Back
                    </button>
                    <button
                        className="btn btn-primary btn-large buttonlogout"
                        onClick={this.onClick}
                    >
                        LOGOUT
                    </button>
                    <div class="container25">{myevents}</div>
                </div>
            </div>
        );
    }
}

export default AdminEvents;
