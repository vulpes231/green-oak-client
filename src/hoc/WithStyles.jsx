import React, { Component } from "react";
import { Loader } from "../components";

const WithStyles = (WrappedComponent) => {
  class WithStyles extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 2000);
    }
    render() {
      return (
        <div className="min-h-screen w-full">
          {this.state.loading ? (
            <Loader />
          ) : (
            <WrappedComponent {...this.state} />
          )}
        </div>
      );
    }
  }
  return WithStyles;
};

export default WithStyles;
