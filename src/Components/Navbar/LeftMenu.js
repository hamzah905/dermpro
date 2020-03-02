import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Menu } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
			<Menu mode="horizontal" onSelect={({ key }) => {
        this.props.changeMenu(key)
      }} selectedKeys={[this.props.menu]}>
      	<Menu.Item key="1">
          <Link to='/'>Dashboard</Link>
        </Menu.Item>
        {/* <SubMenu title={<span>Jobs</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu> */}
      	<Menu.Item key="2">
          <Link to='/patients'>Patients</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to='/contact_us'>Contact Us</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;
