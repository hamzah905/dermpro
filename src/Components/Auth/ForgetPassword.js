import React from 'react';
import axios from "axios";
import {
  Form,
  Input,
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

  class ForgetPasswordForm extends React.Component {
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
          `${baseURL}/api/v1/users/forget_password?email=${values.email}`
        )
        .then(res => {
            debugger
          console.log(res);
          console.log(res.data);
          debugger
          if(res.data.data.success === false){
            this.props.history.push("/forget_password");
            this.setState({ loading: false });
            message.error(res.data.data.message, 2);
            return false;
          }
          else if(res.data.data.user.role !== "doctor"){
            this.props.history.push("/forget_password");
            this.setState({ loading: false });
            message.error("Email not found!", 2);
            return false;

          }
          this.setState({ loading: false });
          this.props.history.push("/login");
          message.success(res.data.data.message, 2);  
        })
        .catch(error => {
            debugger
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
    <div  className="custom-auth-page">
    <div className="custom-header custom-auth-header" style={{margin: "30px 0px 50px"}}>
        <div className="custom-logo">
          <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
          <h2 className="page-title">Forget Password</h2>
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
                        message: "Please enter your email here!"
                      }
                    ]
                  })(<Input placeholder="email" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col >
                <div className="custom-bottom-btn">
                <Button
                    type="primary  primary-btnn"
                    className="custom-apply-search-btn"
                    htmlType="submit"
                    style={{width: "17%", marginLeft: "43%"}}
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
  ForgetPasswordForm
);
export default withRouter(WrappedAdvancedSearchForm);