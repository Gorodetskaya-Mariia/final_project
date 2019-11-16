import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { Menu } from 'antd';

const { SubMenu } = Menu;

class Header extends React.Component {
  state = {
    currentPath: "home",
  };

	componentDidMount(){
		this.setState({ currentPath: this.getLocation() });
	};

	getLocation = () => {
		return window.location.pathname;
	};

  handleClick = e => {
    this.setState({
      currentPath: e.key,
    });
  };

  render() {
		const { currentPath } = this.state;

    return (
			<header className="container">
			<Menu 
				onClick={this.handleClick}
				selectedKeys={ currentPath }
				defaultSelectedKeys={currentPath}
				mode="horizontal"
			>
        <Menu.Item key="home">
					<Link to="/" className="">Home</Link>
        </Menu.Item>
				<SubMenu
          title={
            <span className="submenu-title-wrapper">
							Services
            </span>
          }
        >
					<Menu.ItemGroup title="">
					<Menu.Item key="for men">
							<Link to="/services-for-men" className="">for men</Link>
						</Menu.Item>
						<Menu.Item key="for women">
							<Link to="/services-for-women" className="">for women</Link>
						</Menu.Item>
					</Menu.ItemGroup>            
        </SubMenu>
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