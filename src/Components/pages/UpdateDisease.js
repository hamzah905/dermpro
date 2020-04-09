import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Form, Row, Col, Input, Button, message, Spin, Modal, Icon } from "antd";

import {baseURL} from "../../utils";


class UpdateDisease extends React.Component {
  state = { loading: false, visible: false };

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
      this.setState({loading: true})
      axios
        .post(
          `${baseURL}/api/v1/update_query_spot/${parseInt(this.props.match.params.query_spot_id)}?disease=${values.disease}`
        )
        .then(res => {
        debugger
          this.setState({ loading: false, visible: false });
          this.props.history.push(`/query_spots/${parseInt(this.props.match.params.query_spot_id)}/feedback`);
          message.success("Disease updated Sucessfully", 2);
        })
        .catch(error => {
            this.setState({ loading: false, visible: false });
            this.props.history.push(`/query_spots/${parseInt(this.props.match.params.query_spot_id)}/feedback`);
            message.error('Something went wrong!', 2);
            event.preventDefault();
        });
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div>
        <Icon type="edit"  onClick={this.showModal} className="edit-iconz" />
        <Modal
          title="Update Disease"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
      <div className="container">
    <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
    
        <div className="custom-style">
          <Form
            name="user_update_profile"
            onSubmit={this.handleSubmit}
            className="custom-feedback-form"
          >
            <Row>
              <Col key="disease">
                <Form.Item name={`disease`}>
                  {getFieldDecorator(`disease`, {
                        initialValue: `${this.props.query_spot.disease ? this.props.query_spot.disease : ""}`
                    },{
                    rules: [
                      {
                        required: true,
                        message: "disease can't be blank!"
                      }
                    ]
                  })(<Input placeholder="disease" />)}
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
                    style={{width: "18%", marginLeft: "43%"}}
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
            </Modal>
            </div>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: "user_update_profile" })(
    UpdateDisease
);
export default withRouter(WrappedAdvancedSearchForm);

