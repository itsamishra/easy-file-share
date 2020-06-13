import React, { Component } from "react";
import File from "./File";

export class Files extends Component {
  render() {
    return (
      <div>
        <br />
        <h2 style={uploadFilesTextStyle}>Uploaded Files</h2>
        {/* <br /> */}
        {this.props.files.map((file) => (
          <File file={file} key={file.id} />
        ))}
      </div>
    );
  }
}

const uploadFilesTextStyle = {
  textAlign: "center",
};

export default Files;
