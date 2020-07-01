import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import UpcomingRideCard from "./UpcomingRideCard";

class UpcomingRide extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      flag: 0
    };
    var today = new Date();
    var tday=today.getDate();
    var tmonth=today.getMonth();
    var tyear=today.getFullYear();
    axios
      .get("/api/member")
      .then(response => {
        const data = response.data;
        this.setState({ requests: data });
      })
      .catch(err => console.log(err));

     this.state.requests.map((item, index) => {
      
      item.members.map(val => {
        
          if (val === this.props.user.name) {
            
            
            const dateobj = moment(item.date);
            var newDateObj = moment(dateobj).toDate();
            var day=moment(newDateObj).day()
            var month=moment(newDateObj).month()
            var year=moment(newDateObj).year()
            if(((tyear>year)||(tyear==year && tmonth>month)||(tyear==year && tmonth==month && tday>day))){
              const oldRequest={
                id:this.props.id,
                name:this.props.user.name,
                email:this.props.user.email
            }
            
            axios.post("/api/deleteride",oldRequest)
             .then((res)=>{
            console.log("Sucessful deleted old ride");
            
             })
             .catch((err)=>{console.log(err)});
            
              }
              
          }
          
        
      });

    })



  }

  render() {
    
    axios
      .get("/api/member")
      .then(response => {
        const data = response.data;
        this.setState({ requests: data });
      })
      .catch(err => console.log(err));

    const myrequests = this.state.requests.map((item, index) => {
      var flag = 0;
      item.members.map(val => {
        
          if (val === this.props.user.name) {
            flag=1
              
          }
          
        
      });
      if (flag === 1) {
        return (
          <UpcomingRideCard
            key={index}
            dateofrequest={item.date}
            from={item.from}
            to={item.to}
            id={item.id}
            length={item.members.length}
          ></UpcomingRideCard>
        );
      }
    });

    return <div>{myrequests}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(UpcomingRide);
