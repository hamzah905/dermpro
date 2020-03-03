import React, { Component } from 'react';
import { Menu } from 'antd';
// import SignUp from './SignUp'
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class RightMenu extends Component {
  state = { visible: false };

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
    return (
			<Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/">Sign Up</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
