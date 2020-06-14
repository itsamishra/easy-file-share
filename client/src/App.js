import React, { Component } from "react";
import Header from "./components/Header";
import Files from "./components/Files";
import UploadFile from "./components/UploadFile";
import openSocket from "socket.io-client";

// DONE: Change the way I call addFile (make it 2 calls, 1 to add file to current App's state and 1 to add file to other clients)
// TODO: Move server into its own directory (like client is in 'client' directory)
// TOOD: Add README.md
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

  sendFileToServer = (file) => {
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
          addNewFile={this.addNewFile}
          sendFileToServer={this.sendFileToServer}
          generateRandomId={this.generateRandomId}
        />
        <Files files={this.state.files} />
      </React.Fragment>
    );
  }
}

export default App;
