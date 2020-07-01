import React from "react";
import Logo from "./images/logo.png";
import { connect } from "react-redux";
import "../Stylesheets/nav.css";
import axios from "axios";

class VerticalNav extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      name:"",
      len:0
    };
   
  }
  render() {
    var notifbar
    axios
      .get("/notif/")
      .then(res => {
        this.setState({requests:res.data});
      })
      
    this.state.requests.map((item,index)=>{
      if(item.name===this.props.user.name )
      {
         notifbar=item.msg.map((nm,nmi)=>{
           if(nmi<=5){
           return(
         <a className="navbar-item">{nm}</a>
           
         )}
         else{
           const delReq  ={name:this.props.user.name}
           axios.post("/notif/delete",delReq)
         }
        })
      }
      
    })
   
  
    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        id="nav1in"
      >
        <div className="navbar-brand">
          <a href="/dashboard">
            <img src={Logo} width="112" height="100" />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/dashboard" className="navbar-item" id="tnav">
              Home
            </a>

            <a href="/profile" className="navbar-item" id="tnav">
              Profile
            </a>

            <a className="navbar-item" id="tnav" href="/cabgroup">
              Cab Groups
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" id="tnav">
                Notifications
              </a>
                
              <div className="navbar-dropdown">
              {notifbar}
              </div>
            </div>
          </div>
          <div className="navbar-brand">
            <figure class="image is-96x96" style={{ marginTop: "10px" }}>
              <img
                class="is-rounded"
                style={{ border: "10px solid #ddd" }}
                src={
                  this.props && this.props.user ? this.props.user.avatar : ""
                }
              />
            </figure>

            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className="navbar-item" id="bnavitem">
            <div className="buttons">
              <a
                href="/api/logout"
                className="button is-primary is-light is-danger"
              >
                <strong>Sign Out</strong>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(VerticalNav);
