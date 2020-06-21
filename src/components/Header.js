import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <div>
        <a
          style={githubLinkStyle}
          href="https://github.com/itsamishra/easy-file-share"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

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

const githubLinkStyle = {
  textAlign: "center",
};

export default Header;
