import React, { Component } from "react";
import Webcam from "react-webcam";

import "./App.css";

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      width: 0,
      height: 0,
    };
  }
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageSrc });
  };

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          height={this.state.width}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={this.state.height}
        />
        <button onClick={this.capture}>Capture photo</button>
        {this.state.imageSrc && <img src={this.state.imageSrc} alt="Slefie" />}
      </div>
    );
  }
}
