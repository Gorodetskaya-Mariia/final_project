import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { Menu } from 'antd';

const { SubMenu } = Menu;

class Header extends React.Component {
  state = {
    currentPath: '',
  };

	componentDidMount(){
		this.setState({ currentPath: this.getLocation() });
	};

	getLocation = () => {
		return window.location.pathname;
	};

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      currentPath: e.key,
    });
  };

  render() {
		const { currentPath } = this.state;

    return (
			<header>
			<Menu 
				onClick={this.handleClick}
				selectedKeys={ currentPath }
				defaultSelectedKeys={currentPath}
				mode="horizontal"
			>
        <Menu.Item key="home">
					<Link to="/" className="">Home</Link>
        </Menu.Item>
        <Menu.Item key="services">
					<Link to="/services" className="">Services</Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
							Sign in
            </span>
          }
        >
          <Menu.ItemGroup title="">
            <Menu.Item key="setting:1">
							<GoogleAuth></GoogleAuth>
						</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>        
      </Menu>
			</header>
    );
  }
}

export default Header;