import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Logo from "../.././Logo.png";
import { Form, Row, Col, Input, Button, message, Spin, Upload } from "antd";

// import LinkedinButton from "./LinkedinButton";
import {baseURL} from "../../utils";

class UpdateProfileForm extends React.Component {
  state = { imageFile: null, loading: false, user: [] };

  onSelectImageFile = file => {
    console.log(file,'image file')
    this.setState({ imageFile: file });
  };

  componentDidMount() {
    axios.get(`${baseURL}/api/v1/users/${parseInt(this.props.match.params.user_id)}`,
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
      const formData = new FormData();
      formData.append("avatar", this.state.imageFile);
      debugger
      axios.post(
          `${baseURL}/api/v1/update_user/${parseInt(
            this.props.match.params.user_id
          )}?first_name=${values.first_name}&last_name=${values.last_name}&contact_no=${values.contact_no}`,
          formData,
          {
            headers: {
                "Authorization": `${localStorage.getItem('auth_token')}`
            }
          }
        )
        .then(res => {
            debugger
          this.setState({ loading: false });
          this.props.history.push(`/`);
          message.success("Profile Updated Sucessfully!", 2);  
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
    const { imageFile } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { user } = this.state;
    return (
      <div className="container">
        <div className="row">
            <div className="custom-header">
                <div className="custom-logo" style={{marginRight: "6%"}}>
                <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
                <h2 className="page-title">Update Profile</h2>
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
              <Col key="first_name">
                <Form.Item name={`first_name`} label={`First Name`}>
                  {getFieldDecorator(`first_name`, {
                        initialValue: `${user.first_name ? user.first_name : ""}`
                    }, {
                    rules: [
                      {
                        required: true,
                        message: "First Name can't be blank!"
                      }
                    ]
                  })(<Input rows={4} placeholder="First Name" />)}
                </Form.Item>
              </Col>
              <Col key="last_name">
                <Form.Item name={`last_name`} label={`Last Name`}>
                  {getFieldDecorator(`last_name`, {
                        initialValue: `${user.last_name ? user.last_name : ""}`
                    }, {
                    rules: [
                      {
                        required: true,
                        message: "Last Name can't be blank!"
                      }
                    ]
                  })(<Input rows={4} placeholder="Last Name" />)}
                </Form.Item>
              </Col>
              <Col key="email">
                <Form.Item name={`email`} label={`Email`}>
                  {getFieldDecorator(`email`, {
                        initialValue: `${user.email ? user.email : ""}`
                    }, {
                    rules: [
                      {
                        required: true,
                        message: "Email can't be blank!"
                      }
                    ]
                  })(<Input rows={4} placeholder="example@example.com" disabled = "disabled" />)}
                </Form.Item>
              </Col>
              {/* <Col key="password">
                <Form.Item name={`password`} label={`Password`}>
                  {getFieldDecorator(`password`)(<Input.Password rows={4} placeholder="*******" />)}
                </Form.Item>
              </Col> */}
              <Col key="contact_no">
                <Form.Item name={`contact_no`} label={`Contact No`}>
                  {getFieldDecorator(`contact_no`, {
                        initialValue: `${user.contact_no ? user.contact_no : ""}`
                    }, {
                    rules: [
                      {
                        required: true,
                        message: "Contact No can't be blank!"
                      }
                    ]
                  })(<Input rows={4} placeholder="12345678910" disabled = "disabled" />)}
                </Form.Item>
              </Col>
            <Col key="avatar">
                <Form.Item name={`avatar`} label={`Profile Picture`}>
                  {getFieldDecorator(`avatar`)(
                    <Upload 
                      fileList={imageFile ? [imageFile] : []}
                      beforeUpload={f => {
                        this.onSelectImageFile(f);
                        return false;
                      }}
                      showUploadList={{
                        showPreviewIcon: false,
                        showRemoveIcon: false
                      }}
                    >
                      <Button
                        style={{ marginLeft: 10, color: 'grey', borderColor: 'grey' }}
                        type="default"
                        size="default"
                        ghost
                      >
                        {"Select File"}
                      </Button>
                    </Upload>
                  )}
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
                    Update
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
  UpdateProfileForm
);
export default withRouter(WrappedAdvancedSearchForm);