import React from "react";
import axios from 'axios';
import {
     withRouter, Link
  } from "react-router-dom";

import { Row, Col, Descriptions, Spin, Button } from 'antd';
import Logo from "../.././Logo.png";
import {baseURL} from "../../utils";
import QuerySpotTable from './QuerySpotTable'

class PatitenDetail extends React.Component {
    
  state = {
    patient: [],
    loading: true
  }

  componentDidMount() {
    axios.get(`${baseURL}/api/v1/patients/${parseInt(this.props.match.params.patient_id)}`,
    {
      headers: {
        "Authorization": `${localStorage.getItem('auth_token')}`
      }
    })
      .then(res => {
        var patient = res.data.data.user;
        this.setState({ patient, loading: false });
      })
  }
  render() {

    var { patient } = this.state;
    return(
      <div className="container">
        <div className="custom-header">
          <div className="custom-logo">
            <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
            <h2 className="page-title">PATIENT DETAIL</h2>
          </div>
        </div>
       
        <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
      <div className="custom-detail-heading">
        <h1>{patient.title}</h1>
        <p>{patient.location}</p>
        </div>
        <div className="custom-detail-section custom-job-section">
        <Descriptions className="custom-desc">
          <Descriptions.Item label="Patient Name">{patient.first_name} {patient.last_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
          <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">{patient.dob}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {patient.created_at}
          </Descriptions.Item>
          <br></br>
        </Descriptions>
        <br></br>
        <br></br>
        <Row>
            <Col span={24}>
              <Row style={{display: "flex"}}>
                <h3>Patient Scans:</h3>
                <Button className="custom-apply-search-btn" style={{width: "10%", fontSize: "small", marginLeft: "72%"}}>
                  <Link to={`/patients/${parseInt(this.props.match.params.patient_id)}/reminder`} style={{color: "#ffffff"}} >Reminder</Link>
                </Button>
              </Row>
              <div className="custom-bottom-btn">
                <QuerySpotTable query_spots={patient.query_spots} patient_id={patient.id} />
              </div>
            </Col>
          </Row>
        </div>
       </Spin>
        
        </div>
    );
  }
};

export default withRouter(PatitenDetail);