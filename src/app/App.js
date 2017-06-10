import React, { Component } from "react";
import Webcam from "react-webcam";
import getPixels from "get-pixels";
import namer from "color-namer";
import getCenterish from "../Helpers/getCenterish.js";
import { rgbToHex } from "../Helpers/ColorNames.js";
import "./App.css";
import Button from "../button";

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      width: 0,
      height: 0,
      name: "",
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
      const rgb = getCenterish(pix);

      const name = namer(rgbToHex(rgb[0], rgb[1], rgb[2]));
      this.setState({
        //rgb: rgbToHex(rgb[0], rgb[1], rgb[2]).toUpperCase(),
        name: name.ntc[0].name,
      });
    });
  };

  render() {
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
        <h1 className="app__heading">{this.state.name}</h1>
        <div className="app__pointer" />
      </div>
    );
  }
}
