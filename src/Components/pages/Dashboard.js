import React from "react";
// import axios from 'axios';
import {
     withRouter
  } from "react-router-dom";
import { Row, Col } from 'antd';

import Logo from "../.././Logo.png";
import { Bar } from 'ant-design-pro/lib/Charts';
import { Pie } from 'ant-design-pro/lib/Charts';
import { Gauge } from 'ant-design-pro/lib/Charts';



// import {baseURL} from "../../utils";

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}`,
    y: Math.floor(Math.random() * 100) + 20,
  });
}

class Dashboard extends React.Component {
    
  state = {
    patient: []
  }

  componentDidMount() {

  }
  render() {

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
      </div>
      <br></br>
    </Col>
    <Col span={12} style={{ marginTop: 24 }}>
      <div style={{display: 'flex', }}>

        <div style={{padding: "20px"}}>
        <h2 style={{textAlign: "center"}}>Doctors Subscription Rate:</h2>
        <br></br>
          <Gauge title="Doctors" height={164} percent={87} />
        </div>
        </div>
    </Col>
    </Row>
    <Row>
    <Col span={12} style={{ marginTop: 24 }}>
        <div style={{padding: "20px", }}>
        <h2 style={{textAlign: "center"}}>Total Reports Pending Ratio:</h2>
        <br></br>
          <Pie percent={28} subTitle="Reports Pending Ratio" total="28%" height={140} />
        </div>
    </Col>
    <Col span={12} style={{ marginTop: 24 }}>
        <div style={{padding: "20px", }}>
        <h2 style={{textAlign: "center"}}>Total Reports Pending Ratio:</h2>
        <br></br>
          <Pie percent={28} subTitle="Reports Pending Ratio" total="28%" height={140} />
        </div>
    </Col>
  </Row>
    </div>
    );
  }
};


export default withRouter(Dashboard);