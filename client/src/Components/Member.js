import React from "react";
import "../Stylesheets/maingroup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.goTo = this.goTo.bind(this);
    }

    goTo(e) {
        if (this.props.email === this.props.user.email) {
            toast.error("You can't mail to yourself", {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=" +
                    this.props.email +
                    "&su=" +
                    this.props.groupname +
                    " Group Has Sent Updates" +
                    "&body=Enter your Cab Group Message Here",
                "_blank"
            );
        }
    }

    render() {
        return (
            <div>
                <button className="button56" onClick={this.goTo}>
                    {this.props.name}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(Member);
