import React, { Component } from 'react';

import { Spin, message } from "antd";
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar/Sidebar.js'
import './App.css';
import {
  withRouter
} from "react-router-dom";
// import axios from 'axios';
// import { baseURL } from './utils';

// first we will make a new context

class App extends Component {
  state = { loading: true, menu: "1"};
  componentDidMount() {
    if(!localStorage.getItem('auth_token')){
      this.props.history.push("/login");
      message.error("Login Required!", 2);  
    }
    setTimeout(() => { 
          this.setState({loading: false})
    }, 500);
}

changeMenu = key => this.setState({menu: key})

  render() {

    const {menu} = this.state;

    return(
      <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
          <Navbar menu={menu} changeMenu={this.changeMenu} />
          <Sidebar menu={menu} changeMenu={this.changeMenu} />
      </Spin>
    );
  }
}

export default withRouter(App);
