import React from "react";
import "../Stylesheets/main2.css";
import axios from "axios";

const initialstate = {
    email: "",
    password: "",
};

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        if (e.target.id === "email") {
            this.setState({ email: e.target.value });
        } else if (e.target.id === "password") {
            this.setState({ password: e.target.value });
        }
    };

    onSubmit(e) {
        console.log("Sending Post Request");
        e.preventDefault();
        const form = {
            email: this.state.email,
            password: this.state.password,
        };
        axios
            .post("/adminlogin", form)
            .then((response) => {
                console.log("Got the response:" + response);
                window.localStorage.setItem("authToken", response.token);
                return (window.location.href = "/admin");
            })
            .catch((err) => {
                console.log(err);
                return window.alert("Invalid email or password");
            });
    }

    goBack(e) {
        return (window.location.href = "/");
    }

    render() {
        return (
            <div>
                <div className="login">
                    <h1>Login as Admin</h1>
                    <input
                        type="text"
                        name="u"
                        placeholder="Admin Email"
                        required="required"
                        id="email"
                        onChange={this.onChange}
                    />
                    <input
                        type="password"
                        name="p"
                        placeholder="Admin Password"
                        required="required"
                        id="password"
                        onChange={this.onChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-large"
                        id="button1"
                        onClick={this.onSubmit}
                    >
                        Let me in.
                    </button>
                    <button
                        type="goback"
                        className="btn btn-primary"
                        id="buttonhome"
                        onClick={this.goBack}
                    >
                        Home
                    </button>
                </div>
            </div>
        );
    }
}

export default AdminLogin;
