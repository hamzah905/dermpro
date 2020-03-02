import React from "react";
import axios from 'axios';
import { Table, Form, Row, Col, Input, Button, Spin} from 'antd';

import {
    Link, withRouter
  } from "react-router-dom";
// import queryString from 'query-string';

import Logo from "../.././Logo.png";
import {baseURL} from "../../utils";

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id - b.id,
      // multiple: 7,
    },
  },
    {
      title: 'Name',
      dataIndex: 'first_name',
      render: (text, record) => (
        <span>
          <p>{text+ " " +record.last_name}</p>
        </span>
      ),
      sorter: {
        compare: (a, b) => a.first_name - b.first_name,
        // multiple: 7,
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'Contact No',
      dataIndex: 'contact_no',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'id',
        render: (text, record) => (
          <span>
            <Link to={`/patients/${record.id}`} >Show</Link>
          </span>
        ),
      },
  ];
  

class Patients extends React.Component {
    state = {
      patients: [],
      loading: true,
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            this.setState({loading: true})
            var new_values = {}
            Object.entries(values).map(([key, val]) => {
                new_values[key] = (val === undefined) ? "" : val;
            })
            axios.get(`${baseURL}/search_patients?email=${new_values.email}&name=${new_values.name}`)
            .then(res => {
              var patients = res.data.data.users;
              this.setState({ patients, loading: false  });
            })
            .catch(error => {
                this.setState({ patients: [], loading: false  });
            });
        });
    }
  
    componentDidMount() {
    //   this.setState({loading: true})
      axios.get(`${baseURL}/all_patients`)
        .then(res => {
          var patients = res.data.data.users;
          this.setState({ patients, loading: false });
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var { patients } = this.state;
        console.log(patients);
        return(
        <div className="container">
            <div className="custom-header">
                <div className="custom-logo">
                <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
                <h2 className="page-title">Patients</h2>
                </div>
            </div>
            <div className="custom-detail-section">
                    <Form
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onSubmit={this.handleSubmit}>
                        <Row gutter={24}>
                            <Col span={8} key='name' className="ant-advanced-search-title" >
                                <Form.Item
                                    name={`Name`}
                                >
                                    {getFieldDecorator(`name`)(<Input placeholder="name" />)}
                                </Form.Item>
                            </Col>
                            <Col span={8} key='email' className="ant-advanced-search-title" >
                                <Form.Item
                                    name={`Email`}
                                >
                                    {getFieldDecorator(`email`)(<Input placeholder="email" />)}
                                </Form.Item>
                            </Col>
                            <Col
                                span={8}>
                                <div className="custom-bottom-btn" style={{margin: "5px 0px"}}>
                                    <Button type="primary primary-btnn" className="custom-apply-search-btn" htmlType="submit" style={{backgroundColor: this.props.layout_color}}>SEARCH</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
        <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
            <div className="row">
                <div className="custom-detail-section">
                    <Table columns={columns} dataSource={patients} onChange={onChange} rowKey={record=>record.id} />
                </div>
            </div>  
       </Spin>
        </div>
    );
    }
}
const Patientz = Form.create({ name: 'advanced_search' })(Patients);

export default withRouter(Patientz);