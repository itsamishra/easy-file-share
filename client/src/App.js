import React, { Component } from "react";
import Header from "./components/Header";
import Files from "./components/Files";
import UploadFile from "./components/UploadFile";
import openSocket from "socket.io-client";

export class App extends Component {
  state = {
    files: [],
    socket: null,
    base64SizeLimitInBytes: null,
    maxNumberOfFilesInClient: null,
  };

  getBase64SizeLimitInBytes = () => {
    return this.state.base64SizeLimitInBytes;
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

  // If number of files is greater than max number, removes the first one
  removeExtraFile = () => {
    while (this.state.files.length > this.state.maxNumberOfFilesInClient) {
      let dummyFiles = this.state.files;
      dummyFiles.shift();
      this.setState({ files: dummyFiles });
    }
  };

  addNewFile = (file) => {
    this.setState({ files: [...this.state.files, file] });
    this.removeExtraFile();
  };

  sendFileToServer = (file) => {
    this.state.socket.emit("sendFileToServer", file);
  };

  componentDidMount() {
    // Creates socket
    const socket = openSocket(":4000");
    // const socket = openSocket("http://192.168.86.111:4000");
    this.setState({ socket: socket });

    socket.emit("askServerForAppInfo");
    socket.on("sendAppInfoToClient", (appInfo) => {
      this.setState({ base64SizeLimitInBytes: appInfo.base64SizeLimitInBytes });
      this.setState({
        maxNumberOfFilesInClient: appInfo.maxNumberOfFilesInClient,
      });
    });

    // Adds new file
    socket.on("sendFileToClient", (file) => {
      this.addNewFile(file);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <UploadFile
          addNewFile={this.addNewFile}
          sendFileToServer={this.sendFileToServer}
          generateRandomId={this.generateRandomId}
          getBase64SizeLimitInBytes={this.getBase64SizeLimitInBytes}
        />
        <Files files={this.state.files} />
      </React.Fragment>
    );
  }
}

export default App;
