import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Logo from "../.././Logo.png";
import { Form, Row, Col, Input, Button, message, Spin } from "antd";

import {baseURL} from "../../utils";

const { TextArea } = Input;

class ContactUsForm extends React.Component {
  state = { imageFile: null, loading: false, user: [] };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('current_user'))
    this.setState({ user: user });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
      this.setState({loading: true})
      axios
        .post(
          `${baseURL}/api/v1/contact_us?title=${values.title}&description=${values.description}&user_id=${this.state.user.id}`
        )
        .then(res => {
          this.setState({ loading: false });
          this.props.history.push(`/`);
          message.success("Feedback given Sucessfully", 2);
        })
        .catch(error => {
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
                <h2 className="page-title">Contact Us</h2>
                </div>
            </div>
        </div>
    <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
    
        <div className="custom-detail-section">
          <Form
            name="user_update_profile"
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
                  {getFieldDecorator(`description`,{
                    rules: [
                      {
                        required: true,
                        message: "description can't be blank!"
                      }
                    ]
                  })(<TextArea rows={4} placeholder="description" />)}
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
                    style={{width: "14%", marginLeft: "43%"}}
                  >
                    Submit
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
const WrappedAdvancedSearchForm = Form.create({ name: "user_update_profile" })(
  ContactUsForm
);
export default withRouter(WrappedAdvancedSearchForm);