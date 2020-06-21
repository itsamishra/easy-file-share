import React, { Component, createRef } from "react";
import FileTooLargeWarning from "./FileTooLargeWarning";

export class UploadFile extends Component {
  state = {
    file: {
      name: "",
      data: "",
      sizeInBytes: 0,
      base64SizeInBytes: 0,
    },
    uploadTooLarge: false,
  };

  getFilesBase64SizeInBytes = () => {
    return this.state.file.base64SizeInBytes;
  };

  getUserFile = () => {
    this.fileInput.current.click();
  };

  // Parses uploaded file & sends
  processFile = (e) => {
    let rawFile = this.fileInput.current.files[0];

    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        file: {
          id: this.props.generateRandomId(),
          name: rawFile.name,
          data: fileReader.result,
          base64SizeInBytes: fileReader.result.length * 2,
          dataType: fileReader.result.split(";")[0].split(":")[1],
          sizeInBytes: rawFile.size,
        },
      });

      if (
        this.state.file.base64SizeInBytes <=
        this.props.getBase64SizeLimitInBytes()
      ) {
        this.setState({ uploadTooLarge: false });
        this.distributeFile();
      } else {
        this.setState({ uploadTooLarge: true });
      }
    };

    // As long as file has been uploaded, reads it
    if (rawFile !== undefined) {
      fileReader.readAsDataURL(rawFile);
    }
  };

  distributeFile = () => {
    this.props.addNewFile(this.state.file);
    this.props.sendFileToServer(this.state.file);
  };

  constructor(props) {
    super(props);
    this.fileInput = createRef();
  }

  render() {
    let fileTooLargeWarning = null;

    if (this.state.uploadTooLarge) {
      fileTooLargeWarning = (
        <FileTooLargeWarning
          getBase64SizeLimitInBytes={this.props.getBase64SizeLimitInBytes}
          getFilesBase64SizeInBytes={this.getFilesBase64SizeInBytes}
        />
      );
    } else {
      fileTooLargeWarning = null;
    }

    return (
      <div>
        <button style={uploadButtonStyle} onClick={this.getUserFile}>
          Upload File
        </button>
        <input
          style={uploadFileStyle}
          type="file"
          ref={this.fileInput}
          onChange={this.processFile}
        />

        {fileTooLargeWarning}
      </div>
    );
  }
}

const uploadFileStyle = {
  visibility: "hidden",
};

const uploadButtonStyle = {
  color: "black",
  backgroundColor: "white",
  fontSize: "25px",
  border: "5px solid black",
  padding: "15px 25px",
  borderRadius: "25px",
  fontWeight: "bold",
  display: "block",
  margin: "auto",
};

export default UploadFile;
