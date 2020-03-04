import React from 'react';
import axios from "axios";
import {
  Form,
  Input,
  Checkbox,
  Button,
  message,
  Spin,
  Col,
  Row
} from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    withRouter
  } from "react-router-dom";
  import Logo from "../.././Logo.png";
  import {baseURL} from "../../utils";


//   const [autoCompleteResult, setAutoCompleteResult] = useState([]);

//   const onWebsiteChange = value => {
//     if (!value) {
//       setAutoCompleteResult([]);
//     } else {
//       setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
//     }
//   };

//   const websiteOptions = autoCompleteResult.map(website => ({
//     label: website,
//     value: website,
//   }));

  class RegistrationForm extends React.Component {
    state = {loading: false};

  componentDidMount() {
      if(localStorage.getItem('auth_token')){

        localStorage.clear();
        message.success("Logged out Sucessfully!", 2);  
      }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
      this.setState({loading: true})
      axios
        .post(
          `${baseURL}/users/signup?email=${values.email}&password=${values.password}&password_confirmation=${values.confirm_password}&role=doctor`
        )
        .then(res => {
  
          console.log(res);
          console.log(res.data);
          if(res.data.data.success === false){
            this.props.history.push("/sign_up");
            this.setState({ loading: false });
            message.error(res.data.data.message, 2);
            return false;
          }
          debugger
          localStorage.setItem('auth_token', res.data.data.auth_token);
          localStorage.setItem('current_user', res.data.data.user);
          this.setState({ loading: false });
          this.props.history.push("/patients");
          message.success("SignUp Sucessfully!", 2);  
        })
        .catch(error => {
            this.setState({ loading: false });
            this.props.history.push("/login");
            message.error('Something went wrong!', 2);
            event.preventDefault();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

  return (
    <div>
    <div className="custom-header" style={{margin: "30px 0px 50px"}}>
        <div className="custom-logo">
          <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
          <h2 className="page-title">Login</h2>
        </div>
    </div>
    <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
        <div className="custom-detail-section">
          <Form
            name="query_spot_feedback"
            onSubmit={this.handleSubmit}
            className="custom-feedback-form"
          >
            <Row>
              <Col key="email">
                <Form.Item name={`Email`} label={`Email`}>
                  {getFieldDecorator(`email`, {
                    rules: [
                      {
                        required: true,
                        message: "email can't be blank!"
                      }
                    ]
                  })(<Input placeholder="email" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col key="password">
                <Form.Item name={`Password`} label={`Password`}>
                  {getFieldDecorator(`password`, {
                    rules: [
                      {
                        required: true,
                        message: "Password can't be blank!"
                      }
                    ]
                  })(<Input.Password placeholder="password" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col key="confirm_password">
                <Form.Item name={`Confirm Password`} label={`Confirm Password`}>
                  {getFieldDecorator(`confirm_password`, {
                    rules: [
                      {
                        required: true,
                        message: "Confirm Password can't be blank!"
                      }
                    ]
                  })(<Input.Password placeholder="confirm password" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col key="agreement">
              <Form.Item name="agreement">
              {getFieldDecorator(`agreement`, {
                    rules: [
                      {
                        required: true,
                        message: "agreement can't be blank!"
                      }
                    ]
                  })(
                <Checkbox>
                  I have read the <a href="/">agreement</a>
                </Checkbox>
                )}
              </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                  <a href="/login">Already have a account</a>
              </Col>
            </Row>
            <Row>
              <Col >
                <div className="custom-bottom-btn" style={{textAlign: "right"}}>
                  <Button
                    type="primary"
                    htmlType="submit"
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

const WrappedAdvancedSearchForm = Form.create({ name: "query_spot_feedback" })(
  RegistrationForm
);
export default withRouter(WrappedAdvancedSearchForm);