import React, { Component } from "react";
import Login from "../pages/Login"; // Assuming "Login" is the login page component

const WithAuth = (WrappedComponent) => {
  class WithAuthComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoggedIn: false,
      };
    }

    isUserLoggedIn(accessToken) {
      if (accessToken) {
        this.setState({
          isLoggedIn: true,
        });
      }
    }

    render() {
      if (!this.state.isLoggedIn) {
        return <Login isUserLoggedIn={this.isUserLoggedIn} />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthComponent;
};

export default WithAuth;
