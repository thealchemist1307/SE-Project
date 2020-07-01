import React from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "../Stylesheets/main4.css";
import "react-toastify/dist/ReactToastify.css";

class CabCard extends React.Component {
  constructor(props) {
    super(props);

    this.onSend = this.onSend.bind(this);
    this.state = {
      requests: [],
      count: 0
    };
  }
  onSend() {
    axios
      .get("/api/counter/")
      .then(response => {
        const data = response.data.map((item, index) => {
          if (item.Field === "Sharing") {
            return item.Counter;
          }
        });
        this.setState({ count: data[0] });

        const sharing = {
          id: this.state.count + 1,
          requestor: this.props.user.name,
          requestee: this.props.requestee,
          email:this.props.user.email,
          msg: this.props.message,
          date: this.props.dateofrequest,
          from: this.props.from,
          to: this.props.to,
          status: "sent"
        };
        console.log(sharing);
        if (this.props.requestee === this.props.user.name) {
          toast.error("You cannot send a Request to yourself !", {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          axios
            .get("/api/sharing")
            .then(response => {
              const data = response.data;
              var flag = 0;
              this.setState({ requests: data });
              console.log(this.state.count);
              data.map(item => {
                console.log(item);
                if (
                  item.date === this.props.dateofrequest &&
                  item.from === this.props.from &&
                  item.to === this.props.to &&
                  item.requestor === this.props.user.name &&
                  item.requestee === this.props.requestee
                ) {
                  console.log(item.date);
                  console.log(this.props.dateofrequest);
                  flag = 1;
                }
                if (
                  item.requestor === this.props.user.name &&
                  item.status === "rejected"
                ) {
                  flag = 1;
                }
              });
              if (flag === 0) {
                axios
                  .post("/api/share/request", sharing)
                  .then(res => {})
                  .catch(err => {
                    console.log(err);
                  });
                  const update={
                    id:this.props.id,
                    member1:this.props.requestee,
                    member2:this.props.user.name,
                    status:"sent"
                }
                  axios.post("/notifstatus/",update)
                toast.success("Request Sent !", {
                  position: toast.POSITION.TOP_RIGHT
                });
                const updateCount = {
                  Field: "Sharing"
                };
                axios.post("/api/counter/update", updateCount);
              } else {
                toast.warn("You have already sent a Request !", {
                  position: toast.POSITION.TOP_RIGHT
                });
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // const dateinfo = this.props.dateofrequest.split('T');
    // const date = dateinfo[0];
    // const time = dateinfo[1];
    // const dateobj = date.parse(this.props.dateofrequest);
    const dateobj = moment(this.props.dateofrequest);
    var newDateObj = moment(dateobj).toDate();
    var date = moment(newDateObj).format("DD/MM/YY");
    var time = moment(newDateObj).format("HH:mm");
    console.log(moment(newDateObj).year())

    return (
      <div>
        <div class="card2">
          <header class="card-header" id="head4">
            <p class="card-header-title" id="head4t">
              {this.props.requestee}
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
                <b>MESSAGE : </b>&nbsp;{this.props.message}
              </p>
              <div class="bar2">
                <div className="emptybar2"></div>
                <div className="filledbar2"></div>
              </div>
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
              onClick={this.onSend}
            >
              Send Request
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

export default connect(mapStateToProps)(CabCard);
