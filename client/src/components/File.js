import React, { Component, createRef } from "react";
import FileImage from "../file.png";

export class File extends Component {
  downloadFile = (e) => {
    console.log(this.downloadATag.current.click());
  };

  constructor(props) {
    super(props);
    this.downloadATag = createRef();
  }

  render() {
    return (
      <div>
        <img src={FileImage} alt="File" style={imageStyle} />
        <p>Name: {this.props.file.name}</p>
        <p>Size: {this.props.file.sizeInBytes} bytes</p>
        <p>MIME Type: {this.props.file.dataType}</p>
        <p>Id: {this.props.file.id}</p>
        <button onClick={this.downloadFile}>Download</button>
        <a
          href={this.props.file.data}
          download={this.props.file.name}
          style={downloadATagStyle}
          ref={this.downloadATag}
        >
          Download
        </a>
      </div>
    );
  }
}

const imageStyle = {
  maxWidth: "100px",
  height: "auto",
};

const downloadATagStyle = {
  visibility: "hidden",
};

export default File;
