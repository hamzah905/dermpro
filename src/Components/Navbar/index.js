import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button } from 'antd';
import Logo from "../.././Logo.png";

class Navbar extends Component {
	state = {
    current: 'mail',
	visible: false,
	user: {}
  }
    
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('current_user'))
    this.setState({ user: user });
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
        <nav className="menuBar">
        	<div className="logo">
            { this.state.user.doctor_type === "derm_pro" ?
        		<a href="/">
			<img src={Logo} className="App-logo" alt="logo" width="40" height="40" style={{margin: "0px 4px 3px 0px"}} />DermPro</a>
			:
			<a href="/" style={{fontSize: "23px", marginBottom: "4px"}}>
			<img src={Logo} className="App-logo" alt="logo" width="40" height="40" style={{margin: "0px 4px 3px 0px"}} />WoundMed</a>
			}
        	</div>
        	<div className="menuCon">
        		<div className="leftMenu">
	        		<LeftMenu menu={this.props.menu} changeMenu={this.props.changeMenu}/>
				    </div>
				    <div className="rightMenu">
	        			<RightMenu />
				    </div>
				    <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
		          <span className="barsBtn"></span>
		        </Button>
				    <Drawer
		          title="Basic Drawer"
		          placement="right"
		          closable={false}
		          onClose={this.onClose}
		          visible={this.state.visible}
		        >
		          <LeftMenu />
		          <RightMenu />
		        </Drawer>

        	</div>
        </nav>
    );
  }
}

export default Navbar;
