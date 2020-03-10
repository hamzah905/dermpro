import React from "react";
import axios from 'axios';
import {
     withRouter
  } from "react-router-dom";
import { Row, Col } from 'antd';

import Logo from "../.././Logo.png";
import { Bar } from 'ant-design-pro/lib/Charts';
import { Pie } from 'ant-design-pro/lib/Charts';
import Gauge from './Gauge'

import {baseURL} from "../../utils";

class Dashboard extends React.Component {
    
  state = {
    salesData: [],
    doctor_subscription_rate: 0,
    reports_pending_ratio: 0
  }

  componentDidMount() {
    axios.get(`${baseURL}/api/v1/dashboard_graphs_user`,
    {
      headers: {
        "Authorization": `${localStorage.getItem('auth_token')}`
      }
    })
      .then(res => {
        var user = res.data.data.user.user_per_day;
        const salesData = [];
        for (var index in user) {
          salesData.push({
            x: index,
            y: user[index],
          });
        }
        this.setState({ salesData: salesData });
        this.setState({ doctor_subscription_rate: res.data.data.user.doctor_subscription_rate });
        this.setState({ reports_pending_ratio: res.data.data.user.reports_pending_ratio });

        // debugger
      })

  }
  render() {
    const { salesData } = this.state;

    return(
      <div>
      <div className="custom-header">
          <div className="custom-logo">
            <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
            <h2 className="page-title">Dashboard</h2>
          </div>
      </div>
      <br></br>
      {/* <p style={{marginLeft: '2%', paddingTop: '4px'}}>Welcome to Dashboard page.</p> */}
    <Row>
      <Col span={12}>
      <div style={{padding: "20px"}}>
        <h2>Patients Per Week:</h2>
        <Bar height={200} data={salesData} />
        {console.log(salesData)}
      </div>
      <br></br>
    </Col>
    <Col span={12} style={{ marginTop: 24 }}>
        <div style={{padding: "20px", }}>
        <h2 style={{textAlign: "center"}}>Total Reports Pending Ratio:</h2>
        <br></br>
          <Pie percent={this.state.reports_pending_ratio} subTitle="Reports Pending Ratio" total={"79%"} height={140} />
        </div>
    </Col>
    </Row>
    <Col span={12}>
        <h2 style={{textAlign: "center"}}>Doctors Subscription Rate:</h2>
          <Gauge percent = {this.state.doctor_subscription_rate} />
    </Col>
    <Row>
  </Row>
    </div>
    );
  }
};


export default withRouter(Dashboard);