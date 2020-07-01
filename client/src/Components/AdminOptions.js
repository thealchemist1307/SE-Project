import React from "react";
import "../Stylesheets/main2.css";

const initialstate = {
    email: "",
    password: "",
};

class AdminOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
        this.onEventClick = this.onEventClick.bind(this);
        this.onFeedbackClick = this.onFeedbackClick.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onDashboardClick = this.onDashboardClick.bind(this);
    }

    onEventClick(e) {
        console.log("Sending Post Request");
        e.preventDefault();
        return (window.location.href = "/adminevents");
    }

    onFeedbackClick(e) {
        return (window.location.href = "/adminfeedback");
    }

    onLogout(e) {
        window.localStorage.removeItem("authToken");
        window.location.href = "/adminlogin";
    }

    onDashboardClick(e) {
        return (window.location.href = "/admindashboard");
    }

    render() {
        return (
            <div>
                <div className="options">
                    <h1>Administrator Options</h1>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-large"
                        id="button1"
                        onClick={this.onDashboardClick}
                    >
                        Dashboard
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-large"
                        id="button23"
                        onClick={this.onEventClick}
                    >
                        Event Management
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-large"
                        id="button23"
                        onClick={this.onFeedbackClick}
                    >
                        View Feedback
                    </button>
                    <button
                        type="goback"
                        className="btn btn-primary"
                        id="buttonhome"
                        onClick={this.onLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }
}

export default AdminOptions;
