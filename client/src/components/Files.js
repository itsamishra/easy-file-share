import React, { Component } from "react";
import File from "./File";

export class Files extends Component {
  render() {
    return (
      <div>
        <h2>Uploaded Files</h2>
        {this.props.files.map((file) => (
          <File file={file} key={file.id} />
        ))}
      </div>
    );
  }
}

export default Files;
