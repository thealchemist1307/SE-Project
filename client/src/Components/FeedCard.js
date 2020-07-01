import React from "react";
import Axios from "axios";

class FeedCard extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(e) {
        const feedDetail = {
            name: this.props.name,
            email: this.props.email,
            message: this.props.message,
        };
        Axios.post("/deletefeedback", feedDetail)
            .then((res) => {
                console.log("Deleted Successfully: " + res);
                return window.alert("Deleted Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div className="card">
                    <h3 className="title">{this.props.name}</h3>
                    <p className="title2">{this.props.email}</p>
                    <div class="bar2">
                        <div className="emptybar2"></div>
                        <div className="filledbar2"></div>
                    </div>
                    <p className="message3">
                        FEEDBACK: <br></br>
                        {this.props.message}
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={this.delete}
                        id="buttonl"
                    >
                        X
                    </button>
                </div>
            </div>
        );
    }
}

export default FeedCard;
