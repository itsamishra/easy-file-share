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
      <div style={fileStyle}>
        <img src={FileImage} alt="File" style={imageStyle} />
        <p style={{ fontWeight: "bold" }}> Name: {this.props.file.name}</p>
        <p>Size: {this.props.file.sizeInBytes} Bytes</p>
        <p>MIME Type: {this.props.file.dataType}</p>
        <p>Id: {this.props.file.id}</p>
        <button style={downloadFileButtonStyle} onClick={this.downloadFile}>
          Download File
        </button>
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
  maxWidth: "140px",
  height: "auto",
  float: "left",
};

const downloadATagStyle = {
  visibility: "hidden",
};

const downloadFileButtonStyle = {
  color: "black",
  backgroundColor: "white",
  fontSize: "15px",
  border: "5px solid black",
  padding: "15px 25px",
  borderRadius: "25px",
};

const fileStyle = {
  display: "block",
  // margin: "auto",
  margin: "0 auto",
  // width: "300px",
  width: "20%",
};

export default File;
