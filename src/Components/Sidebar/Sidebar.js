import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ContactUs from '../pages/ContactUs'
import Patients from '../pages/Patients'
import Payment from '../pages/Payment'
import PatientDetail from '../pages/PatientDetail'
import QueryFeedback from '../pages/QueryFeedback'
import UpdateProfile from '../pages/UpdateProfile'
import PatientReminder from '../pages/PatientReminder'
import Dashboard from '../pages/Dashboard'
import { Layout, Breadcrumb, Menu, Icon } from 'antd';
// const { SubMenu } = Menu;
// import {baseURL} from "../.././utils";
// import SideImage from "../.././careers-banner.png";
const { Content, Footer, Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false,
    user: {}
  };
  
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('current_user'))
    this.setState({ user: user });
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" onSelect={({ key }) => {
            this.props.changeMenu(key)
          }} selectedKeys={[this.props.menu]} mode="inline">
            <Menu.Item key={"1"}>
              <Link to='/'>
                <Icon type="desktop" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/patients'>
                <Icon type="team" />
                <span>Patients</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/contact_us'>
                <Icon type="contacts" />
                <span>Contact Us</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='/payment'>
                <Icon type="file" />
                <span>Get Subscription</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:1">
             <Link to={`/users/${this.state.user.id}/edit`}>
                <Icon type="user-add" />
                <span>Update Profile</span>
               </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>DermPro</Breadcrumb.Item>
              <Breadcrumb.Item>Patients</Breadcrumb.Item>
            </Breadcrumb>
            <div className="custom-section">
              <Switch>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/patients/:patient_id" exact>
                  <PatientDetail />
                </Route>
                <Route path="/patients/:patient_id/reminder" exact>
                  <PatientReminder />
                </Route>
                <Route path="/patients" exact>
                  <Patients />
                </Route>
                <Route path="/query_spots/:query_spot_id/feedback" exact>
                  <QueryFeedback />
                </Route>
                <Route path="/contact_us" exact>
                  <ContactUs />
                </Route>
                <Route path="/users/:user_id/edit" exact>
                  <UpdateProfile />
                </Route>
                <Route path="/payment" exact>
                  <Payment />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Derm Pro App footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;