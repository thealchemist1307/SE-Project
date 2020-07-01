import React from "react";
import { connect } from 'react-redux'
import axios from "axios";
import "../Stylesheets/main4.css";
class RequestCard extends React.Component
{
    constructor(props)
    {
        super(props)
        this.deleteRequest = this.deleteRequest.bind(this);
    }

    deleteRequest()
    {
        
        const oldRequest={
            id:this.props.id,
            name:this.props.requesterName,
            msg:this.props.message,
            date:this.props.dateofrequest,
            email:this.props.user.email
        }
        console.log(oldRequest);
        axios.post("/api/deletemyrequests",oldRequest)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{console.log(err)});

    }
    render()
    {
        return(
            <div>
            <div class="card3">
          <header class="card-header" id="head4">
            <p class="card-header-title" id="head4t">
              {this.props.requesterName}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <p id="p1">
                <b>MESSAGE : </b>&nbsp;{this.props.message}
              </p>
              <div class="bar2">
                <div className="emptybar2"></div>
                <div className="filledbar2"></div>
              </div>
              <time datetime="2016-1-1" id="d1">{this.props.dateofrequest}</time>
              <br />
              <b>From :</b>
              {this.props.from}
              <br />
              <b>To :</b>
              {this.props.to}
            </div>
          </div>
          <footer class="card-footer">
            <a
              href="#"
              class="card-footer-item has-text-danger"
              onClick={this.deleteRequest}
            >
              Delete Request
            </a>
            {/* <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a> */}
          </footer>
        </div>
            <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.auth
    }
  }
  
  export default connect(mapStateToProps)(RequestCard);