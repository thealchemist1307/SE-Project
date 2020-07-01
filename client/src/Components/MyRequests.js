import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import VerticalNav from "./VerticalNav";
import HorizontalNav from "./HorizontalNav";
import RequestCard from "./RequestCard";
import "../Stylesheets/main4.css"

class MyRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }

  render() {
    axios
      .get("/api/fetchrequests")
      .then(response => {
        const data = response.data;
        this.setState({ requests: data });
      })
      .catch(err => {
        console.log(err);
      });
    const myrequests = this.state.requests.map((item, index) => {
      if (item.email === this.props.user.email) {
        return (
          <RequestCard
            key={index}
            requesterName={item.name}
            dateofrequest={item.date}
            message={item.msg}
            from={item.from}
            to={item.to}
          ></RequestCard>
        );
      }
    });
    return (
      <div>
        <div className="box" id="nav1">
          <VerticalNav />
        </div>
        <div className="columns">
          <div className="column is-one-fifth sideNav">
            <HorizontalNav />
          </div>
          <div className="normal-container" id="cnt1">{myrequests}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(MyRequests);
