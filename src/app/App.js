import React, { Component } from "react";
import Webcam from "react-webcam";
import getPixels from "get-pixels";
import getCenterish from "../Helpers/getCenterish.js";
import "./App.css";
import Button from "../button";

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      width: 0,
      height: 0,
      rgb: [0, 0, 0, 0],
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
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

    getPixels(imageSrc, (err, pix) => {
      if (err) {
        console.error("Bad image path");
        return;
      }

      this.setState({
        rgb: getCenterish(pix),
      });
    });
  };

  render() {
    const hh = {
      color: `rgb(${this.state.rgb[0]},${this.state.rgb[1]},${this.state
        .rgb[2]})`,
      position: "absolute",
      top: 0,
    };
    return (
      <div>
        <Webcam
          audio={false}
          height={this.state.height}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={this.state.width}
        />
        <Button onClick={this.capture} />
        <h1 style={hh}>
          {`${this.state.rgb[0]}, ${this.state.rgb[1]}, ${this.state.rgb[2]}`}
        </h1>
        <div className="pointer" />
      </div>
    );
  }
}
