import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button } from "reactstrap";
import "../Stylesheets/main2.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        window.localStorage.removeItem("authToken");
        window.location.href = "/adminlogin";
    }

    goBack(event) {
        window.location.href = "/admin";
    }

    toggleDataSeries(e) {
        if (
            typeof e.dataSeries.visible === "undefined" ||
            e.dataSeries.visible
        ) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    render() {
        const options = {
            theme: "dark2",
            animationEnabled: true,
            title: {
                text: "Number of Users vs Cab Requests",
            },
            subtitles: [
                {
                    text: "Last 10 days data",
                },
            ],
            axisX: {
                title: "Time in Days",
            },
            axisY: {
                title: "Users",
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                labelFontColor: "#6D78AD",
                tickColor: "#6D78AD",
                includeZero: true,
            },
            axisY2: {
                title: "Cab Requests",
                titleFontColor: "#51CDA0",
                lineColor: "#51CDA0",
                labelFontColor: "#51CDA0",
                tickColor: "#51CDA0",
                includeZero: true,
            },
            toolTip: {
                shared: true,
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries,
            },
            data: [
                {
                    type: "spline",
                    name: "Users",
                    showInLegend: true,
                    xValueFormatString: "DDD",
                    yValueFormatString: "##0",
                    dataPoints: [
                        { x: new Date(2020, 6, 1), y: 1 },
                        { x: new Date(2020, 6, 2), y: 5 },
                        { x: new Date(2020, 6, 3), y: 4 },
                        { x: new Date(2020, 6, 4), y: 3 },
                        { x: new Date(2020, 6, 5), y: 9 },
                        { x: new Date(2020, 6, 6), y: 9 },
                        { x: new Date(2020, 6, 7), y: 3 },
                        { x: new Date(2020, 6, 8), y: 6 },
                        { x: new Date(2020, 6, 9), y: 2 },
                        { x: new Date(2020, 6, 10), y: 6 },
                        { x: new Date(2020, 6, 11), y: 7 },
                        { x: new Date(2020, 6, 12), y: 2 },
                    ],
                },
                {
                    type: "spline",
                    name: "Cab Requests",
                    axisYType: "secondary",
                    showInLegend: true,
                    xValueFormatString: "DDD",
                    yValueFormatString: "##0",
                    dataPoints: [
                        { x: new Date(2020, 6, 1), y: 34 },
                        { x: new Date(2020, 6, 2), y: 15 },
                        { x: new Date(2020, 6, 3), y: 42 },
                        { x: new Date(2020, 6, 4), y: 38 },
                        { x: new Date(2020, 6, 5), y: 34 },
                        { x: new Date(2020, 6, 6), y: 34 },
                        { x: new Date(2020, 6, 7), y: 87 },
                        { x: new Date(2020, 6, 8), y: 23 },
                        { x: new Date(2020, 6, 9), y: 34 },
                        { x: new Date(2020, 6, 10), y: 34 },
                        { x: new Date(2020, 6, 11), y: 48 },
                        { x: new Date(2020, 6, 12), y: 34 },
                    ],
                },
            ],
        };
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <h1 style={{ color: "white" }}>Admin Dashboard</h1>
                </div>
                <div id="bordered" className="row mt-5">
                    <CanvasJSChart
                        options={options}
                        onRef={(ref) => (this.chart = ref)}
                    />
                </div>
                <div className="row mt-5 d-flex justify-content-center">
                    <Button className="btn-info" onClick={this.goBack}>
                        Go Back
                    </Button>
                    <Button className="btn-danger ml-3" onClick={this.onClick}>
                        Logout
                    </Button>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
