import React from "react";
import axios from 'axios';
import { Table, Form, Row, Col, Input, Button, Spin, Tag} from 'antd';

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
      title: 'Name',
      dataIndex: 'first_name',
      key: "first_name",
      sorter: (a, b) => {
          a = a.first_name || '';
          b = b.first_name || '';
          return a.localeCompare(b);
      },
      render: (text, record) => (
        <span>
          {(text ? text : '') + " " + (record.last_name ? record.last_name : '' )}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: "email",
      sorter: (a, b) => {
          a = a.email || '';
          b = b.email || '';
          return a.localeCompare(b);
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: "gender",
      sorter: (a, b) => {
          a = a.gender || '';
          b = b.gender || '';
          return a.localeCompare(b);
      },
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: "dob",
      sorter: (a, b) => {
          a = a.dob || '';
          b = b.dob || '';
          return a.localeCompare(b);
      },
    },
    {
      title: 'Contact No',
      dataIndex: 'contact_no',
      key: "contact_no",
      sorter: (a, b) => {
          a = a.contact_no || '';
          b = b.contact_no || '';
          return a.localeCompare(b);
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: "created_at",
      sorter: (a, b) => {
          a = a.created_at || '';
          b = b.created_at || '';
          return a.localeCompare(b);
      },
    },
    {
      title: 'Feedback',
      key: 'pending_qs',
      dataIndex: 'pending_qs',
      sorter: (a, b) => a.pending_qs - b.pending_qs,
      render: pending_qs => (
        <span>
          {
          pending_qs ?
            <Tag color={'volcano'} key={"pending"}>
              Pending
            </Tag>
          :
            <Tag color={'green'} key={"done"}>
              Done
            </Tag>
          }
        </span>
      ),
    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'id',
        render: (text, record) => (
          <span>
            <Button className="custom-apply-search-btn" style={{width: "94%", fontSize: "small"}}>
              <Link to={`/patients/${record.id}`} style={{color: "#ffffff"}}>Detail</Link>
            </Button>
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
            axios.get(`${baseURL}/api/v1/search_patients?search=${new_values.search}`,
            {
              headers: {
                "Authorization": `${localStorage.getItem('auth_token')}`
              }
            })
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
      axios.get(`${baseURL}/api/v1/all_patients`,
      {
        headers: {
          "Authorization": `${localStorage.getItem('auth_token')}`
        }
      })
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
                            <Col span={8} key='search' className="ant-advanced-name-title" >
                                <Form.Item
                                    name={`search`}
                                >
                                    {getFieldDecorator(`search`)(<Input placeholder="search" />)}
                                </Form.Item>
                            </Col>
                            <Col
                                span={8}>
                                <div className="custom-bottom-btn" style={{margin: "5px 0px"}}>
                                    <Button type="primary primary-btnn" className="custom-apply-search-btn" htmlType="submit">SEARCH</Button>
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