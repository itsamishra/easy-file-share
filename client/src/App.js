import React, { Component } from "react";
import Header from "./components/Header";
import Files from "./components/Files";
import UploadFile from "./components/UploadFile";

export class App extends Component {
  state = {
    files: [
      // {
      //   id: "9ff363ac-3d43",
      //   name: "main.c",
      //   data:
      //     "data:text/x-csrc;base64,I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbigpe3ByaW50ZigiSGVsbG8sIFdvcmxkXG4iKTtyZXR1cm4gMDt9Cg==",
      //   dataType: "text/x-csrc",
      //   sizeInBytes: 67,
      // },
      // {
      //   id: "9ff363ac-3d43",
      //   name: "main.c",
      //   data:
      //     "data:text/x-csrc;base64,I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbigpe3ByaW50ZigiSGVsbG8sIFdvcmxkXG4iKTtyZXR1cm4gMDt9Cg==",
      //   dataType: "text/x-csrc",
      //   sizeInBytes: 67,
      // },
      // {
      //   id: "9ff363ac-3d43",
      //   name: "main.c",
      //   data:
      //     "data:text/x-csrc;base64,I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbigpe3ByaW50ZigiSGVsbG8sIFdvcmxkXG4iKTtyZXR1cm4gMDt9Cg==",
      //   dataType: "text/x-csrc",
      //   sizeInBytes: 67,
      // },
      // {
      //   id: "9ff363ac-3d43",
      //   name: "main.c",
      //   data:
      //     "data:text/x-csrc;base64,I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbigpe3ByaW50ZigiSGVsbG8sIFdvcmxkXG4iKTtyZXR1cm4gMDt9Cg==",
      //   dataType: "text/x-csrc",
      //   sizeInBytes: 67,
      // },
    ],
  };

  addFile = (file) => {
    this.setState({ files: [...this.state.files, file] });
  };

  // Generates random ID
  // Taken from: https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/
  generateRandomId = () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <UploadFile
          addFile={this.addFile}
          generateRandomId={this.generateRandomId}
        />
        <Files files={this.state.files} />
      </React.Fragment>
    );
  }
}

export default App;
