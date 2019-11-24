import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GoogleAuth from "../GoogleAuth";
import { Menu } from "antd";
import "./Header.css";

const { SubMenu } = Menu;

class Header extends React.Component {
  state = {
    currentPath: "home"
  };

  componentDidMount() {
    this.setState({ currentPath: this.getLocation() });
  }

  getLocation = () => {
    return window.location.pathname;
  };

  handleClick = e => {
    this.setState({
      currentPath: e.key
    });
  };

  render() {
    const { currentPath } = this.state;

    return (
      <header className="container">
        <Menu
          onClick={this.handleClick}
          selectedKeys={currentPath}
          defaultSelectedKeys={currentPath}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/" className="">
              Home
            </Link>
          </Menu.Item>
          <SubMenu
            title={<span className="submenu-title-wrapper">Services</span>}
          >
            <Menu.ItemGroup title="">
              <Menu.Item key="for men">
                <Link to="/services-for-men" className="">
                  for men
                </Link>
              </Menu.Item>
              <Menu.Item key="for women">
                <Link to="/services-for-women" className="">
                  for women
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          {/* <SubMenu
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
        </SubMenu>   */}

          {this.props.isAuthencitaced && (
            <Menu.Item key="account">
              <Link to="/account" className="">
                My account
              </Link>
            </Menu.Item>
          )}

          <Menu.Item key="login">
            {!this.props.isAuthencitaced ? (
              <Link to="/login" className="">
                Login
              </Link>
            ) : (
              <Link to="/logout" className="">
                Logout
              </Link>
            )}
          </Menu.Item>
        </Menu>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthencitaced: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Header);
