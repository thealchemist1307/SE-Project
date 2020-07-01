import React from "react";
import CabCard from "./CabCard";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import "../Stylesheets/main4.css";
class CabRequests extends React.Component {
  constructor() {
    super();
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
      .catch(err => console.log(err));
     
      const arr = this.state.requests.reverse();
      var today = new Date();
      var tday=today.getDate();
      var tmonth=today.getMonth();
      var tyear=today.getFullYear();
    const cabcards = arr.map((item, index) => {
      var flag=0
      const dateobj = moment(item.date);
      var newDateObj = moment(dateobj).toDate();
      var day=moment(newDateObj).date()
      var month=moment(newDateObj).month()
      var year=moment(newDateObj).year()
      if(item.email===this.props.user.email &&((tyear>year)||(tyear==year && tmonth>month)||(tyear==year && tmonth==month && tday>day))){
        const oldRequest={
          id:item.id,
          name:item.name,
          msg:item.msg,
          date:item.date,
          email:item.email
      }
      
      axios.post("/api/deletemyrequests",oldRequest)
          .then((res)=>{
              console.log(res.data);
          })
          .catch((err)=>{console.log(err)});
          flag=1
          console.log("Old Req");
        }
      if(flag===0){
      return (
        <CabCard
          key={index}
          email={item.email}
          requestee={item.name}
          dateofrequest={item.date}
          message={item.msg}
          from={item.from}
          to={item.to}
        ></CabCard>
      );
      }
    });

    return <div className="column is-half pic-container cont1">{cabcards}</div>;
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth
  };
};
export default connect(mapStateToProps)(CabRequests)
