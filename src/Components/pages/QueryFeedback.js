import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Logo from "../.././Logo.png";
import { Form, Row, Col, Input, Button, message, Spin, Upload, Descriptions } from "antd";

import UpdateDisease from "./UpdateDisease";
import {baseURL} from "../../utils";

const { TextArea } = Input;

class ApplyJobForm extends React.Component {
  state = { imageFile: null, message: "", visible: false , loading: true, query_spot: { images: [], feedbacks: []} };
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
          debugger
          console.log(res);
          console.log(res.data);
          this.setState({ loading: false });
          this.props.history.push(`/query_spots/${parseInt(this.props.match.params.query_spot_id)}/feedback`);
          this.props.form.resetFields()
          message.success("Feedback given Sucessfully", 2);  
        })
        .catch(error => {
            this.setState({ loading: false });
            setTimeout(() => {
              this.props.history.push(`/query_spots/${parseInt(this.props.match.params.query_spot_id)}/feedback`);
            }, 500);
            this.props.form.resetFields()
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
          <Descriptions.Item label="Disease" className= "inline-desc">
            {query_spot.disease} 
            <UpdateDisease query_spot = {query_spot} />
          </Descriptions.Item>
          <Descriptions.Item label="Scan Side">{query_spot.scan_side}</Descriptions.Item>
          <Descriptions.Item label="Scan Place">{query_spot.query_spot_place}</Descriptions.Item>
          <Descriptions.Item label="Message">{query_spot.message}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {query_spot.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="Feedbacks">{query_spot.feedbacks.length}</Descriptions.Item>
        </Descriptions>
        </div>

        { query_spot.images.map((image, index)=>
          <div key = {index} className="custom-detail-section custom-blog-section">
            <div className="custom-spot-img">
            <a href={`${baseURL}/${image}`} target="_blank">
              <img src={`${baseURL}/${image}`} alt="new" className="custom-query-spot-image"/>
            </a>
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
          <Row className="custom-chat">
              <Col key="message"  span={16}>
                <Form.Item name={`message`} label={`Doctor's Feedback`} style={{marginBottom: "0px"}}>
                  {getFieldDecorator(`message`, {
                        initialValue: ""
                    }, {
                    rules: [
                      {
                        required: true,
                        message: "Feedback can't be blank!"
                      }
                    ]
                  })(<TextArea rows={2} placeholder="Put your descriptive feedback here..." />)}
                </Form.Item>
              </Col>
            <Col key="image"  span={4} className="custom-chat-image">
                <Form.Item name={`Image`}>
                  {getFieldDecorator(`image`, {
                        initialValue: null
                    })(
                    <Upload 
                      fileList={imageFile ? [imageFile] : []}
                      beforeUpload={f => {
                        this.onSelectImageFile(f);
                        return false;
                      }}
                      onRemove={file => {
                        console.log(file.status);
                        return true;
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
              <Col  span={4} className="custom-chat-submit">
                <div className="custom-bottom-btn custom-bottom-btnn" style={{textAlign: "right"}}>
                  <Button
                    type="primary  primary-btnn"
                    className="custom-apply-search-btn"
                    htmlType="submit"
                    style={{width: "54%"}}
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
                <Row className="custom-chat-roww">
                  <Col span={11} className="custom-chat-block">
                  <Descriptions style={{backgroundColor: "rgb(115, 167, 189)", borderRadius: "10px 0px 10px 10px" }}>
                    <Descriptions.Item className="custom-blog-content-right" style={{ borderRadius: "10px 0px 10px 10px" }}>
                    {/* <h4 style={{color:"#ffffff"}}>{feedback.user_name}:</h4> */}
                    <div style={{color:"#ffffff", paddingLeft: "12px"}}>{feedback.message}</div>
                    {
                    feedback.image ?
                    <div className="custom-blog-img">
                      <a href={`${baseURL}/${feedback.image}`} target="_blank">
                        <img src={`${baseURL}/${feedback.image}`} alt="new"/>
                      </a>
                    </div>
                    :
                    console.log("No image")
                    }
                    </Descriptions.Item>
                  </Descriptions>
                  <div style={{textAlign: "left"}}>
                    <span style={{color:"grey", margin: "5px"}}>{feedback.created_at}</span>
                  </div>
                  </Col>
                  <Col span={1}>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/41DB1yBEWIL.png" alt="new" style={{width: "100%", marginLeft: "10px"}}/>
                  </Col>
                </Row>
                :
                <Row className="custom-chat-roww">
                  <Col span={1}>
                    <img src="https://cdn0.iconfinder.com/data/icons/customicondesign-office6-shadow/256/doctor.png" alt="new" style={{width: "100%", marginRight: "10px"}}/>
                  </Col>
                  <Col span={11} className="custom-chat-block">
                    <Descriptions style={{backgroundColor: "rgb(167, 208, 112)", borderRadius:"0px 10px 10px 10px"}}>
                      <Descriptions.Item className="custom-blog-content-right" style={{ borderRadius: "0px 10px 10px 10px" }}>
                      {/* <h4 style={{color:"#ffffff"}}>{feedback.user_name}:</h4> */}
                      <div style={{color:"#ffffff", paddingLeft: "12px"}}>{feedback.message}</div>
                      {
                      feedback.image ?
                      <div className="custom-blog-img">
                        <a href={`${baseURL}/${feedback.image}`} target="_blank">
                          <img src={`${baseURL}/${feedback.image}`} alt="new"/>
                        </a>
                      </div>
                      :
                      console.log("No image")
                      }
                      </Descriptions.Item>
                    </Descriptions>
                      <div style={{textAlign: "right"}}>
                        <span style={{color:"grey", margin: "5px"}}>{feedback.created_at}</span>
                      </div>
                  </Col>
                </Row>
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