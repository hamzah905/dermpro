import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Form, Row, Col, Input, Button, message, Spin } from "antd";

// import LinkedinButton from "./LinkedinButton";
import {baseURL} from "../../utils";

const { TextArea } = Input;

class ApplyJobForm extends React.Component {
  state = { message: "", loading: false, query_spot: { images: []} };

  componentDidMount() {
    axios.get(`${baseURL}/api/v1/query_spots/${parseInt(this.props.match.params.query_spot_id)}`,
    {
      headers: {
        "Authorization": `${localStorage.getItem('auth_token')}`
      }
    })
      .then(res => {
        var query_spot = res.data.data.query_spot;
        this.setState({ query_spot: query_spot });
        // debugger
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
      this.setState({loading: true})
      axios
        .post(
          `${baseURL}/api/v1/query_spots/${parseInt(
            this.props.match.params.query_spot_id
          )}/feedback?message=${values.message}`,
          {
            headers: {
              "Authorization": `${localStorage.getItem('auth_token')}`
            }
          }
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
    const { query_spot } = this.state;
    // var { images } = query_spotz.images;
    console.log(query_spot.iamges,"hjvbdsnalmfd l")
    return (
      <div className="container">
        <div className="row">
        { query_spot.images.map((image, index)=>
          <div key = {index} className="custom-detail-section custom-blog-section">
            <img src={`${baseURL}/${image}`} alt="new" className="custom-query-spot-image"/>
          </div>
        )}
        </div>
    <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
        <div className="custom-detail-section">
          <Form
            name="query_spot_feedback"
            onSubmit={this.handleSubmit}
            className="custom-feedback-form"
          >
            <Row>
             
              <Col key="message">
                <Form.Item name={`message`} label={`Doctor's Feedback`}>
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
  ApplyJobForm
);
export default withRouter(WrappedAdvancedSearchForm);