import React from "react";
import { Form, Input, Button } from 'antd';
import Logo from "../.././Logo.png";

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 9,
  },
};
const validatemessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!',
  },
};


class ContactUsForm extends React.Component {
  state = { loading: true };
  componentDidMount() {
    setTimeout(() => { 
          this.setState({loading: false})
    }, 500);
}

  render() {
  const onSubmit = values => {
    console.log(values);
    values.preventDefault();
  };

  return (
    <Form {...layout} name="nest-messages" onSubmit={onSubmit} validatemessages={validatemessages}>

    <div className="custom-header">
        <div className="custom-logo" style={{marginRight: "6%"}}>
          <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
          <h2 className="page-title">Contact Us</h2>
        </div>
    </div>

    <br></br>
    <br></br>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tom Cruse" />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input placeholder="example@example.com" />
      </Form.Item>
      <Form.Item name={['user', 'description']} label="Description">
        <Input.TextArea placeholder="Your Description" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <div className="custom-bottom-btn custom-bottom-btnn" style={{textAlign: "right"}}>
          <Button
            type="primary  primary-btnn"
            className="custom-apply-search-btn"
            htmlType="submit"
            style={{width: "32%"}}
          >
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
};

export default ContactUsForm;