import React from "react"
import axios from 'axios'
import { connect } from 'react-redux'
import ShareRequestCard from './ShareRequestCard'
import "../Stylesheets/main4.css";
class ShareRequests extends React.Component {
    constructor() {
        super()
        this.state = {
            requests: []
        }
    }

    render() {
        axios.get("/api/sharing")
            .then((response) => {
                const data = response.data;
                this.setState({ requests: data })
            })
            .catch((err) => console.log(err));
        const myrequests = this.state.requests.map((item, index) => {
            if (item.requestee === this.props.user.name && item.status === "sent") {
                return (
                    <ShareRequestCard
                        key={index}
                        id={item.id}
                        email={item.email}
                        requesterName={item.requestor}
                        requesteeName={item.requestee}
                        dateofrequest={item.date} message={item.msg} from={item.from} to={item.to}
                    ></ShareRequestCard>
                );
            }
        });

        return (
            <div >
                {myrequests}
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        user: state.auth
        
    };
};

export default connect(mapStateToProps)(ShareRequests);