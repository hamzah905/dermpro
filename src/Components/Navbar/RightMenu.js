import React, { Component } from 'react';
import { Menu } from 'antd';
// import SignUp from './SignUp'
const SubMenu = Menu.SubMenu;

class RightMenu extends Component {

  state = { visible: false, user: {}  };
  
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('current_user'))
    this.setState({ user: user });
  }

  render() {
    return (
			<Menu mode="horizontal">
        {/* <Menu.Item key="mail">
          <a href="/login">Logout</a>
        </Menu.Item> */}
        <SubMenu title={<span>Hello! {this.state.user.email}</span>}>
            <Menu.Item key="setting:1">
             <a href="/payment">Get Subscription</a>
            </Menu.Item>
            <Menu.Item key="setting:2">
             <a href="/login">Logout</a>
            </Menu.Item>
        </SubMenu> 
      </Menu>
    );
  }
}

export default RightMenu;
