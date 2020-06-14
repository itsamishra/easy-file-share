import React, { Component, createRef } from "react";

export class UploadFile extends Component {
  state = {
    file: {
      name: "",
      data: "",
      sizeInBytes: 0,
    },
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
          dataType: fileReader.result.split(";")[0].split(":")[1],
          sizeInBytes: rawFile.size,
        },
      });

      this.distributeFile();
    };
    fileReader.readAsDataURL(rawFile);
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
