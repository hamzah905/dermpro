import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Form, Row, Col, Input, Button, message, Spin, Upload, Descriptions } from "antd";

// import LinkedinButton from "./LinkedinButton";
import {baseURL} from "../../utils";

const { TextArea } = Input;

class ApplyJobForm extends React.Component {
  state = { imageFile: null, message: "", loading: false, query_spot: { images: [], feedbacks: []} };

  onSelectImageFile = file => {
    console.log(file,'image file')
    this.setState({ imageFile: file });
  };

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
      const formData = new FormData();
      formData.append("image", this.state.imageFile);
      axios
        .post(
          `${baseURL}/api/v1/query_spots/${parseInt(
            this.props.match.params.query_spot_id
          )}/feedback?message=${values.message}`,
          formData,
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
    const { imageFile } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { query_spot } = this.state;
    // var { images } = query_spotz.images;
    console.log(query_spot.images,"hjvbdsnalmfd l")
    return (
      <div className="container">
        <div className="row">

    <div className="custom-detail-section custom-job-section">
        <Descriptions>
          <Descriptions.Item label="Disease">{query_spot.disease}</Descriptions.Item>
          <Descriptions.Item label="Scan Place">{query_spot.query_spot_place}</Descriptions.Item>
          <Descriptions.Item label="Message">{query_spot.message}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {query_spot.created_at}
          </Descriptions.Item>
          <br></br>
        </Descriptions>
        </div>

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
                  {getFieldDecorator(`message`, {
                    rules: [
                      {
                        required: true,
                        message: "Feedback can't be blank!"
                      }
                    ]
                  })(<TextArea rows={4} placeholder="Put your descriptive feedback here..." />)}
                </Form.Item>
              </Col>
            <Col key="image">
                <Form.Item name={`Image`} label={`Feedback Attachment`}>
                  {getFieldDecorator(`image`)(
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
        <h3 style={{margin: "10px 40px"}}>Previous Chat History</h3>
        { query_spot.feedbacks.map((feedback, index)=>
        <div key = {index} className="custom-detail-section custom-blog-section">

            {
                feedback.user_role === "patient" ? 
                <Descriptions style={{backgroundColor: "lightblue", textAlign: "left"}}>
                    <Descriptions.Item className="custom-blog-content-right">
                    <h2>{feedback.title}</h2>
                    <div>{feedback.message}</div>
                    </Descriptions.Item>
                    {
                     feedback.image ?
                    <Descriptions.Item className="custom-blog-img">
                    <img src={`${baseURL}/${feedback.image}`} alt="new"/>
                    </Descriptions.Item>
                    :
                    console.log("No image")
                    }
                </Descriptions>
                :
                <Descriptions style={{backgroundColor: "lightgrey", textAlign: "right"}}>
                {
                 feedback.image ?
                    <Descriptions.Item className="custom-blog-img">
                    <img src={`${baseURL}/${feedback.image}`} alt="new"/>
                    </Descriptions.Item>
                    :
                    console.log("No image")
                    }
                  
                    <Descriptions.Item className="custom-blog-content-left">
                    <h2>{feedback.title}</h2>
                    <div>{feedback.message}</div>
                    </Descriptions.Item>
                </Descriptions>
            }
        </div>
        )} 
        </Spin>
      </div>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: "query_spot_feedback" })(
  ApplyJobForm
);
export default withRouter(WrappedAdvancedSearchForm);