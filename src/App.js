import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { Spin } from "antd";
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar/Sidebar.js'
import './App.css';
// import axios from 'axios';
// import { baseURL } from './utils';

// first we will make a new context

class App extends Component {
  state = { loading: true, menu: "1"};
  componentDidMount() {
    setTimeout(() => { 
          this.setState({loading: false})
    }, 500);
}

changeMenu = key => this.setState({menu: key})

  render() {

    const {menu} = this.state;

    return(
      <Router>
          <Spin tip="Loading..." className="spiner" spinning={this.state.loading}>
              <Navbar menu={menu} changeMenu={this.changeMenu} />
              <Sidebar menu={menu} changeMenu={this.changeMenu} />
          </Spin>
    </Router>
    );
  }
}

export default App;
