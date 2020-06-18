import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <div>
        <h1 style={headerStyle}>Easy File Share</h1>
      </div>
    );
  }
}

const headerStyle = {
  textAlign: "center",
  color: "black",
  padding: "60px",
  //   background: "#999",
};

export default Header;
