import React from "react";
// import axios from 'axios';
import { Table, Form, Spin, Button, Tag} from 'antd';

import {
    Link, withRouter
  } from "react-router-dom";
// import queryString from 'query-string';

// import {baseURL} from "../../utils";

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

const columns = [
  {
    title: 'Disease',
    dataIndex: 'disease',
    key: "disease",
    sorter: (a, b) => {
        a = a.disease || '';
        b = b.disease || '';
        return a.localeCompare(b);
    },
  },
  {
    title: 'Scan Side',
    dataIndex: 'scan_side',
    key: "scan_side",
    sorter: (a, b) => {
        a = a.scan_side || '';
        b = b.scan_side || '';
        return a.localeCompare(b);
    },
  },
  {
    title: 'Scan Place',
    dataIndex: 'query_spot_place',
    key: "query_spot_place",
    sorter: (a, b) => {
        a = a.query_spot_place || '';
        b = b.query_spot_place || '';
        return a.localeCompare(b);
    },
  },
    {
      title: 'Message',
      dataIndex: 'message',
      key: "message",
      sorter: (a, b) => {
          a = a.message || '';
          b = b.message || '';
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
      key: 'feedbacks',
      dataIndex: 'feedbacks',
      sorter: (a, b) => a.feedbacks - b.feedbacks,
      render: feedbacks => (
        <span>
          {
          feedbacks.length > 0 ? 

          <Tag color={'green'} key={"done"}>
            Done
          </Tag>
          :
          <Tag color={'volcano'} key={"pending"}>
            Pending
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
          <Button className="custom-apply-search-btn" style={{width: "74%", fontSize: "small"}}>
            <Link to={`/query_spots/${record.id}/feedback`} style={{color: "#ffffff"}} >View</Link>
          </Button>
          </span>
        ),
      },
  ];
  

class QuerySpot extends React.Component {
    state = {
      query_spots: [],
      loading: true,
    }
    // handleSubmit = event => {
    //     event.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         console.log('Received values of form: ', values);
    //         this.setState({loading: true})
    //         var new_values = {}
    //         Object.entries(values).map(([key, val]) => {
    //             new_values[key] = (val === undefined) ? "" : val;
    //         })
    //         axios.get(`${baseURL}/query_spots/search_by_name?url=${this.props.url_param}&profession=${new_values.profession}&title=${new_values.title}&location=${new_values.location}`, values)
    //         .then(res => {
    //           var query_spots = res.data.data;
    //           this.setState({ query_spots, loading: false  });
    //         })
    //         .catch(error => {
    //             this.setState({ query_spots: [], loading: false  });
    //         });
    //     });
    // }
  
    componentDidMount() {
      this.setState({query_spots: this.props.query_spots, loading: false})
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        var { query_spots } = this.state;
        console.log(query_spots);
        return(
        <div className="container">
            {/* <div className="custom-detail-section">
                    <Form
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onSubmit={this.handleSubmit}>
                        <Row gutter={24}>
                            <Col span={12} key='title' className="ant-advanced-search-title" >
                                <Form.Item
                                    name={`Title`}
                                >
                                    {getFieldDecorator(`title`)(<Input placeholder="title" />)}
                                </Form.Item>
                            </Col>
                            <Col
                                span={12}>
                                <div className="custom-bottom-btn" style={{margin: "5px 0px"}}>
                                    <Button type="primary primary-btnn" className="custom-apply-search-btn" htmlType="submit" style={{backgroundColor: this.props.layout_color}}>SEARCH</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div> */}
        <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
            <div className="row">
                <div className="custom-detail-section">
                    <Table columns={columns} dataSource={this.props.query_spots} onChange={onChange} />
                </div>
            </div>  
       </Spin>
        </div>
    );
    }
}
const Patientz = Form.create({ name: 'advanced_search' })(QuerySpot);

export default withRouter(Patientz);