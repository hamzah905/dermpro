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
import Pieslice from './Pieslice'
import Customelabelpie from './Customelabelpie'

import {baseURL} from "../../utils";

class Dashboard extends React.Component {

  state = {
    salesData: [],
    user_satisfaction_rate: 0,
    reports_pending_ratio: 0,
    doctor_with_patient_percentage: {doctor: 0, patient: 0 }
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
        this.setState({ user_satisfaction_rate: res.data.data.user.user_satisfaction_rate });
        this.setState({ doctor_with_patient_percentage: res.data.data.user.doctor_with_patient_percentage });
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
        <br></br>
        <br></br>
        <br></br>
        <Bar height={250} data={salesData} color="#2BA2D6" />
        {console.log(salesData)}
      </div>
      <br></br>
    </Col>
    <Col span={12} style={{ marginTop: 24, marginBottom: -235 }}>
        <div>
        <h2 style={{textAlign: "center"}}>Total Reports Pending Ratio:</h2>
        <br></br>
        {console.log("sbaxj",this.state.reports_pending_ratio)}
          <Pieslice percent={100 - this.state.reports_pending_ratio} total={this.state.reports_pending_ratio} />
          {/* <Pie percent={100 - this.state.reports_pending_ratio} total={`${this.state.reports_pending_ratio}%`} height={140} color="#2BA2D6" /> */}
        </div>
    </Col>
    </Row>
    <Col span={12}>
        <h2 style={{textAlign: "center"}}>Patients Satisfaction Rate:</h2>
          <Gauge percent = {this.state.user_satisfaction_rate} />
    </Col>
    <Col span={12}>
        <h2 style={{textAlign: "center"}}>Doctors and Patients Ratio:</h2>
        <Customelabelpie doctor_with_patient_percentage={this.state.doctor_with_patient_percentage} />
    </Col>
    <Row>
  </Row>
    </div>
    );
  }
};


export default withRouter(Dashboard);