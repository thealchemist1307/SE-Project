import React from "react";
import Member from "../Components/Member.js";
import "../Stylesheets/maingroup.css";
import "../reducers/authReducer";
import { connect } from "react-redux";

class GroupCard extends React.Component {
    constructor(props) {
        super(props);
        this.getCcString = this.getCcString.bind(this);
        this.state = {
            ccLink: "",
        };
    }

    getCcString() {
        console.log(this.props.email);
        var tempString = "";
        if (this.props.email.length === 0 || this.props.email.length === 1) {
            return "";
        } else {
            const array = this.props.email;
            for (var i = 0; i < this.props.members.length; i++) {
                var string = array[i];
                if (string != this.props.loggedin.email) {
                    tempString = tempString.concat(string + ",");
                }
            }
            return tempString;
        }
    }

    render() {
        this.state = {
            ccLink:
                "https://mail.google.com/mail/?view=cm&fs=1&to=" +
                this.props.email[0] +
                "&su=" +
                this.props.name +
                " Group Has Sent Updates" +
                "&body=Enter your Cab Group Message Here&cc=" +
                this.getCcString(),
        };
        const membarr = this.props.members;
        const membcards = membarr.map((item, index) => {
            return (
                <Member
                    key={index}
                    name={item}
                    email={this.props.email[index]}
                    groupname={this.props.name}
                ></Member>
            );
        });
        return (
            <div>
                <div className="card6">
                    <h3 className="title">
                        Group: &nbsp;{this.props.name}{" "}
                        <button className="btn btn-primary but232">
                            <a
                                href={this.state.ccLink}
                                target="_blank"
                                className="buttonText"
                            >
                                Mail All Members
                            </a>
                        </button>
                    </h3>
                    <p className="title2">{this.props.date}</p>
                    <div className="barcont">
                        <div class="bar6">
                            <div className="emptybar6"></div>
                            <div className="filledbar6"></div>
                        </div>
                    </div>
                    <div className="message34">
                        <p className="mestext">Members (Click to mail) : </p>
                        <div className="bold23">{membcards}</div>
                    </div>
                    <button className="btn btn-primary" id="buttonl2">
                        X
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.auth,
    };
};

export default connect(mapStateToProps)(GroupCard);
