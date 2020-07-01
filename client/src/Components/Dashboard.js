import React from "react";
import VerticalNav from "./VerticalNav";
import HorizontalNav from "./HorizontalNav";
import "../Stylesheets/main.css";
import { connect } from "react-redux";
import Login from "./Login";
import ShareRequests from "./ShareRequests";
import UpcomingRide from "./UpcomingRide";
import "../Stylesheets/main4.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
        };
        this.renderContent = this.renderContent.bind(this);
    }
    renderContent() {
        switch (this.props.user) {
            case null:
                return <Login />;

            case false:
                return <Login />;
            default:
                return (
                    <div>
                        <div className="box" id="nav1">
                            <VerticalNav />
                        </div>
                        <div className="columns">
                            <div className="column is-one-fifth sideNav">
                                <HorizontalNav />
                            </div>
                            <div>
                                <div className="column box" id="nav1">
                                    <div id="content">
                                        <center>
                                            <b className="text1">
                                                Welcome {this.props.user.name}
                                                <hr />
                                            </b>
                                        </center>
                                        <div className="columns box cont1">
                                            <div className="column is-half cont1">
                                                <p className="textHead">
                                                    New Requests
                                                </p>
                                                <div className="column pic-container">
                                                    <ShareRequests></ShareRequests>
                                                </div>
                                            </div>
                                            <div className="column is-half cont1">
                                                <p className="textHead">
                                                    Upcoming
                                                </p>
                                                <div className="column pic-container">
                                                    <UpcomingRide></UpcomingRide>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(Dashboard);
