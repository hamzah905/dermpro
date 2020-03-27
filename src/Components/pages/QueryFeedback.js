import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Logo from "../.././Logo.png";
import { Form, Row, Col, Input, Button, message, Spin, Upload, Descriptions } from "antd";

// import LinkedinButton from "./LinkedinButton";
import {baseURL} from "../../utils";

const { TextArea } = Input;

class ApplyJobForm extends React.Component {
  state = { imageFile: null, message: "", loading: true, query_spot: { images: [], feedbacks: []} };

  onSelectImageFile = file => {
    console.log(file,'image file')
    this.setState({ imageFile: file });
  };

  async componentDidMount() {
    try {
      setInterval(async () => {

    axios.get(`${baseURL}/api/v1/query_spots/${parseInt(this.props.match.params.query_spot_id)}`,
    {
      headers: {
        "Authorization": `${localStorage.getItem('auth_token')}`
      }
    })
      .then(res => {
        var query_spot = res.data.data.query_spot;
        this.setState({ query_spot: query_spot, loading: false });
        // debugger
      })
      }, 3000);
          } catch(e) {
            console.log(e);
          }
        }

componentWillUnmount() {
  clearInterval(this.interval);
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
          this.props.history.push(`/query_spots/${parseInt(this.props.match.params.query_spot_id)}/feedback`);
          message.success("Feedback given Sucessfully", 2);  
        })
        .catch(error => {
            this.setState({ loading: false });
            setTimeout(() => {
              this.props.history.push(`/query_spots/${parseInt(this.props.match.params.query_spot_id)}/feedback`);
            }, 500);
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
    <div className="custom-header">
        <div className="custom-logo" style={{marginRight: "6%"}}>
          <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
          <h2 className="page-title">SCAN DETAIL</h2>
        </div>
    </div>

    <div className="custom-detail-section custom-job-section">
        <Descriptions className="custom-desc">
          <Descriptions.Item label="Disease">{query_spot.disease}</Descriptions.Item>
          <Descriptions.Item label="Scan Place">{query_spot.query_spot_place}</Descriptions.Item>
          <Descriptions.Item label="Message">{query_spot.message}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {query_spot.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="Feedbacks">{query_spot.feedbacks.length}</Descriptions.Item>
          <br></br>
        </Descriptions>
        </div>

        { query_spot.images.map((image, index)=>
          <div key = {index} className="custom-detail-section custom-blog-section">
            <div className="custom-spot-img">
            <img src={`${baseURL}/${image}`} alt="new" className="custom-query-spot-image"/>
            </div>
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
        <h3 style={{margin: "10px 50px"}}>Previous Chat History</h3>
        { query_spot.feedbacks.map((feedback, index)=>
        <div key = {index} className="custom-detail-section custom-blog-section">

            {
                feedback.user_role === "patient" ? 
                <Descriptions style={{backgroundColor: "#2BA2D6",borderRadius:"5px" }}>
                  <Descriptions.Item className="custom-blog-content-right">
                  <h4 style={{color:"#ffffff"}}>{feedback.user_name}:</h4>
                  <div style={{color:"#ffffff", paddingLeft: "12px"}}>{feedback.message}</div>
                  {
                  feedback.image ?
                  <div className="custom-blog-img">
                    <img src={`${baseURL}/${feedback.image}`} alt="new"/>
                  </div>
                  :
                  console.log("No image")
                  }
                  </Descriptions.Item>
                  <Descriptions.Item style={{textAlign: "right"}} className="custom-chat-style">
                    <span style={{color:"#ffffff"}}>{feedback.created_at}</span>
                  </Descriptions.Item>
                </Descriptions>
                :
                <Descriptions style={{backgroundColor: "rgb(175, 222, 112)", borderRadius:"5px"}}>
                  <Descriptions.Item className="custom-blog-content-right">
                  <h4 style={{color:"#ffffff"}}>{feedback.user_name}:</h4>
                  <div style={{color:"#ffffff", paddingLeft: "12px"}}>{feedback.message}</div>
                  {
                  feedback.image ?
                  <div className="custom-blog-img">
                    <img src={`${baseURL}/${feedback.image}`} alt="new"/>
                  </div>
                  :
                  console.log("No image")
                  }
                  </Descriptions.Item>
                  <Descriptions.Item style={{textAlign: "right"}} className="custom-chat-style">
                    <span style={{color:"#ffffff"}}>{feedback.created_at}</span>
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