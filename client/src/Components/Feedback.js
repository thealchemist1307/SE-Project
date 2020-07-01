import React from "react";
import "../Stylesheets/feedback.css";
import Axios from "axios";

const initialState = {
    name: "",
    email: "",
    message: "",
};

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    onChange = (e) => {
        if (e.target.id === "name") {
            this.setState({ name: e.target.value });
        } else if (e.target.id === "email2") {
            this.setState({ email: e.target.value });
        } else if (e.target.id === "message") {
            this.setState({ message: e.target.value });
        }
    };

    onSend = (e) => {
        console.log("Sending Feedback");
        const namefield = this.state.name;
        const emailfield = this.state.email;
        const messagefield = this.state.message;

        if (
            namefield.length === 0 ||
            emailfield.length === 0 ||
            messagefield.length === 0
        ) {
            return window.alert("One or more fields are empty");
        } else {
            const feed = {
                namefield: this.state.name,
                emailfield: this.state.email,
                messagefield: this.state.message,
            };
            Axios.post("/feedback", feed)
                .then((response) => {
                    console.log("Got the feed response:" + response);
                    return window.alert("Feedback sent successfully");
                })
                .catch((err) => {
                    return window.alert("Could not send feedback. Try Again");
                });
        }
    };

    goBack(e) {
        return (window.location.href = "/");
    }

    render() {
        return (
            <div>
                <div className="feedback">
                    <div className="text12">Feedback to Developers</div>
                    <input
                        type="text"
                        name="n"
                        placeholder="Name"
                        required="required"
                        id="name"
                        onChange={this.onChange}
                    />
                    <input
                        type="text"
                        name="e"
                        placeholder="Email"
                        required="required"
                        id="email2"
                        onChange={this.onChange}
                    />
                    <textarea
                        name="paragraph_text"
                        cols="50"
                        rows="10"
                        id="message"
                        onChange={this.onChange}
                    >
                        Your Feedback
                    </textarea>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-large"
                        id="button2"
                        onClick={this.onSend}
                    >
                        Send Feedback
                    </button>
                    <button
                        type="goback"
                        className="btn btn-primary"
                        id="buttonhome2"
                        onClick={this.goBack}
                    >
                        Home
                    </button>
                </div>
            </div>
        );
    }
}

export default Feedback;
