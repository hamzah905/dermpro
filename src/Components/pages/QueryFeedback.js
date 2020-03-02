import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Form, Row, Col, Input, Button, message, Spin } from "antd";

// import LinkedinButton from "./LinkedinButton";
import {baseURL} from "../../utils";

const { TextArea } = Input;

class ApplyJobForm extends React.Component {
  state = { message: "", loading: false };

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
      this.setState({loading: true})
      debugger
      axios
        .post(
          `${baseURL}/query_spots/${parseInt(
            this.props.match.params.query_spot_id
          )}/feedback?message=${values.message}`
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({ loading: false });
          this.props.history.push("/patients");
          message.success("Feedback given Sucessfully", 2);  
        })
        .catch(error => {
            this.setState({ loading: false });
            this.props.history.push("/patients");
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

    <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
        <div className="custom-detail-section">
          <Form
            name="query_spot_feedback"
            onSubmit={this.handleSubmit}
            className="custom-feedback-form"
          >
            <Row>
             
              <Col key="message">
                <Form.Item name={`message`} label={`Description`}>
                  {getFieldDecorator(`message`)(<TextArea rows={4} placeholder="Put your descriptive feedback here..." />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col >
                <div className="custom-bottom-btn" style={{textAlign: "right"}}>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    Feedback
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
  ApplyJobForm
);
export default withRouter(WrappedAdvancedSearchForm);