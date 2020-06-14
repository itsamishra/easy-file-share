import React, { Component } from "react";
import Header from "./components/Header";
import Files from "./components/Files";
import UploadFile from "./components/UploadFile";
import openSocket from "socket.io-client";

// TODO: Add size limit on file uploads
// TODO: Add "Remove All Files" component that clears all files saved in browser

export class App extends Component {
  state = {
    files: [],
    socket: null,
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

  addNewFile = (file) => {
    this.setState({ files: [...this.state.files, file] });
  };

  addFile = (file) => {
    this.addNewFile(file);
    this.state.socket.emit("sendFileToServer", file);
  };

  componentDidMount() {
    const socket = openSocket("http://localhost:4000");
    this.setState({ socket: socket });

    socket.on("sendFileToClient", (file) => {
      this.addNewFile(file);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <UploadFile
          addFile={this.addFile}
          generateRandomId={this.generateRandomId}
          // sendFile={sendFile}
        />
        <Files files={this.state.files} />
      </React.Fragment>
    );
  }
}

export default App;
