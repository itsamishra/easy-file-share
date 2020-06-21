import React, { Component } from "react";

export class FileTooLargeWarning extends Component {
  render() {
    return (
      <div style={fileTooLargeWarningStyle}>
        <p>
          Sorry, that file is too large! The max file size is{" "}
          <strong>
            {this.props.getBase64SizeLimitInBytes().toExponential()} bytes{" "}
          </strong>{" "}
          and that file's size is{" "}
          <strong>
            {this.props.getFilesBase64SizeInBytes().toExponential()} bytes
          </strong>
          !
        </p>
      </div>
    );
  }
}

const fileTooLargeWarningStyle = {
  color: "red",
  textAlign: "center",
};

export default FileTooLargeWarning;
