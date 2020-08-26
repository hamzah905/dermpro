import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Logo from "../.././Logo.png";
import { Form, Row, Col, Input, Button, message, Spin } from "antd";

import {baseURL} from "../../utils";

const { TextArea } = Input;
class PatientReminder extends React.Component {
  state = { loading: false };

  onSelectImageFile = file => {
    console.log(file,'image file')
    this.setState({ imageFile: file });
  };

  componentDidMount() {
    axios.get(`${baseURL}/api/v1/users/${parseInt(this.props.match.params.patient_id)}`,
    {
      headers: {
        "Authorization": `${localStorage.getItem('auth_token')}`
      }
    })
      .then(res => {
        var user = res.data.data.user;
        this.setState({ user });
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
      this.setState({loading: true})
      debugger
      axios.post(
          `${baseURL}/api/v1/users/create_reminder?user_id=${parseInt(this.props.match.params.patient_id)}&title=${values.title}&description=${values.description}`
        )
        .then(res => {
            debugger
          this.setState({ loading: false });
          this.props.history.push(`/`);
          message.success("Reminder sent Sucessfully!", 2);  
        })
        .catch(error => {
            debugger
            this.setState({ loading: false });
            this.props.history.push(`/`);
            message.error('Something went wrong!', 2);
            event.preventDefault();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <div className="row">
            <div className="custom-header">
                <div className="custom-logo" style={{marginRight: "6%"}}>
                <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
                <h2 className="page-title">Patient Reminder</h2>
                </div>
            </div>
        </div>
    <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
    
        <div className="custom-detail-section">
          <Form
            name="patient_reminder"
            onSubmit={this.handleSubmit}
            className="custom-feedback-form"
          >
            <Row>
              <Col key="title">
                <Form.Item name={`title`} label={`Title`}>
                  {getFieldDecorator(`title`,{
                    rules: [
                      {
                        required: true,
                        message: "Title can't be blank!"
                      }
                    ]
                  })(<Input rows={4} placeholder="Title" />)}
                </Form.Item>
              </Col>
              <Col key="description">
                <Form.Item name={`description`} label={`Description`}>
                  {getFieldDecorator(`description`, {
                    rules: [
                      {
                        required: true,
                        message: "Description can't be blank!"
                      }
                    ]
                  })(<TextArea rows={3} placeholder="Put your descriptive reminder here..." />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col >
                <div className="custom-bottom-btn custom-bottom-btnn" style={{textAlign: "right"}}>
                  <Button
                    type="primary  primary-btnn"
                    className="custom-apply-search-btn"
                    htmlType="submit"
                    style={{width: "12%", marginLeft: "43%"}}
                  >
                    SEND
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        </Spin>
      </div>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: "patient_reminder" })(
  PatientReminder
);
export default withRouter(WrappedAdvancedSearchForm);