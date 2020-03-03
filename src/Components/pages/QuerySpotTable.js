import React from "react";
// import axios from 'axios';
import { Table, Form, Spin} from 'antd';

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
    title: 'ID',
    dataIndex: 'id',     
    sorter: {
      compare: (a, b) => a.id - b.id,
      // multiple: 7,
    },
  },
    {
      title: 'Message',
      dataIndex: 'message',     
      sorter: {
        compare: (a, b) => a.first_name - b.first_name,
        // multiple: 7,
      },
    },
    {
      title: 'images',
      dataIndex: 'images',
      render: (text, record) => (
      <p>{text.length}</p>
      ),  
      sorter: {
        compare: (a, b) => a.last_name - b.last_name,
        // multiple: 6,
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
            <Link to={`/query_spots/${record.id}/feedback`} >Feedback</Link>
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