import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import CabPage from "./Components/CabPage";
import SearchCabs from "./Components/SearchCabs";
import { connect } from "react-redux";
import { fetchUserAction } from "./actions/myaction";
import MyRequests from "./Components/MyRequests";
import AdminLogin from "./Components/AdminLogin";
import AdminEvents from "./Components/AdminEvents";
import SuggestEvents from "./Components/SuggestEvents";
import PrivateRoute from "./helpers/PrivateRoute";
import Feedback from "./Components/Feedback";
import AdminFeedback from "./Components/AdminFeedback";
import AdminOptions from "./Components/AdminOptions";
import CabGroup from "./Components/CabGroup.js";
import AdminDashboard from "./Components/AdminDashboard";
import Profile from "./Components/Profile";

function App(props) {
    useEffect(() => {
        props.fetch_user();
    }, []);
    return (
        <Router>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/cabs" component={CabPage}></Route>
            <Route exact path="/myrequests" component={MyRequests}></Route>
            <Route exact path="/searchcabs" component={SearchCabs}></Route>
            <Route exact path="/adminlogin" component={AdminLogin}></Route>
            <Route
                exact
                path="/suggestevents"
                component={SuggestEvents}
            ></Route>
            <PrivateRoute
                exact
                path="/admin"
                component={AdminOptions}
            ></PrivateRoute>
            <Route exact path="/cabgroup" component={CabGroup}></Route>
            <PrivateRoute
                exact
                path="/adminevents"
                component={AdminEvents}
            ></PrivateRoute>
            <PrivateRoute
                exact
                path="/adminfeedback"
                component={AdminFeedback}
            ></PrivateRoute>
            <PrivateRoute
                exact
                path="/admindashboard"
                component={AdminDashboard}
            ></PrivateRoute>
            <Route exact path="/feedback" component={Feedback}></Route>
            <Route exact path="/profile" component={Profile}></Route>
        </Router>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetch_user: () => {
            dispatch(fetchUserAction());
        },
    };
};
export default connect(null, mapDispatchToProps)(App);
