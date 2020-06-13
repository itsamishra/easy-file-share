import React, { Component } from "react";
import Header from "./components/Header";
import Files from "./components/Files";
import UploadFile from "./components/UploadFile";

export class App extends Component {
  state = {
    files: [],
  };

  addFile = (file) => {
    this.setState({ files: [...this.state.files, file] });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        {/* <Files /> */}
        <UploadFile addFile={this.addFile} />
      </React.Fragment>
    );
  }
}

export default App;
