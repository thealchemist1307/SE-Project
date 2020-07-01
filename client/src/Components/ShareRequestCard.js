import React from "react";
import moment from "moment"
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


class ShareRequestCard extends React.Component {
    constructor(props) {
        super(props);
        this.onAccept = this.onAccept.bind(this);
        this.onReject=this.onReject.bind(this);
        this.state = { count: 0,poolid:0};
    }
    onAccept() {
        var flag1=0;
        var flag2=0;
        axios.get("/api/counter/")
            .then(response => {
                const data = response.data.map((item, index) => {

                    if (item.Field === "CarPool") {
                        
                        return item.Counter 
                        
                    }
                });
                this.setState({ count: data[1] })
        axios.get("/api/member/")
            .then(res => {
                res.data.map((item) => {
                        item.members.map((value) => {
                        
                            if (value === this.props.user.name) {
                            flag1=1;
                        }
                    });
                    if (item.date === this.props.dateofrequest && item.from === this.props.from && item.to === this.props.to ) {
                        flag2=1;              
                        this.setState({poolid:item.id})
                    }
                });
                if (flag1 === 1 && flag2 === 1) {
                    const updateReq = { 
                        id:this.state.poolid,
                        member: this.props.requesterName,
                        email3:this.props.email }
                    axios
                        .post("/api/member/update", updateReq)
                    const updateShare = {
                        id: this.props.id,
                        status: "accepted"
                    }
                    axios
                        .post("/api/share/update", updateShare)     
                    toast.success("You have Accepted a Request Had a Request!", {
                        position: toast.POSITION.TOP_RIGHT
                    });    
                }
                else
                {
                    
                    const newReq={
                        id:this.state.count +1,
                        groupname: "Group" + this.state.count + 1,
                        member1:this.props.requesterName,
                        member2:this.props.user.name,    
                        email2:this.props.user.email,
                        email1:this.props.email,
                        date:this.props.dateofrequest,
                        to:this.props.to,
                        from:this.props.from,
                        status:"accepted"    
                    }
                    axios
                        .post("/api/member/request", newReq)
                    const updateCount={
                        Field:"CarPool",
                    }
                    axios
                        .post("/api/counter/update", updateCount)    
                    const updateShare = {
                        id: this.props.id,
                        status:"accepted"
                    }
                    axios
                        .post("/notifstatus/",newReq)
                    axios
                        .post("/api/share/update", updateShare)  
                    toast.success("You have Accepted a Request New Request !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                
            })
                
            .catch(err => {
                console.log(err);
            });
    });
}
    onReject()
    {
        const update={
            id:this.props.id,
            member1:this.props.requesterName,
            member2:this.props.user.name,
            status:"rejected"
        }
        axios
            .post("/api/share/update", update)
        axios
        .post("/notifstatus/",update)
            
    }

    render() {
        const dateobj = moment(this.props.dateofrequest);
        var newDateObj = moment(dateobj).toDate();
        var date = moment(newDateObj).format("DD/MM/YY");
        var time = moment(newDateObj).format("HH:mm");
        console.log(this.props);
        
        return (
            <div>
        <div class="card2">
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
          <div class="card-content contentcard">
            <div class="content">
              <p id="p1">
                <b>wants to ride with you </b>
              </p>
              <div class="bar2">
                <div className="emptybar2"></div>
                <div className="filledbar2"></div>
              </div>
              <br/>
              <time datetime="2016-1-1" id="d1">
                <b>DATE : </b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date}
              </time>
              <br />
              <time datetime="2016-1-1" id="t1">
                <b>TIME : </b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {time}
              </time>
              <br />
              <b>FROM : </b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.from}
              <br />
              <b>TO : </b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {this.props.to}
            </div>
          </div>

          <footer class="card-footer footcard">
            <a
              href="#"
              class="card-footer-item"
              id="lin1"
              onClick={this.onAccept}
            >
              Accept
            </a>
            <a
              href="#"
              class="card-footer-item"
              id="lin1"
              onClick={this.onReject}
            >
              Reject
            </a>
            {/* <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a> */}
          </footer>
                 
        </div>
        <br />
        <ToastContainer></ToastContainer>
      </div>
        );


    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps)(ShareRequestCard);