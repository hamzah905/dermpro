import React, { Component } from 'react';
import { Menu } from 'antd';
// import SignUp from './SignUp'
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class RightMenu extends Component {
  state = { visible: false };

  render() {
    return (
			<Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/login">Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
