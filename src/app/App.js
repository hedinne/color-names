import React, { Component } from "react";
import Webcam from "react-webcam";
import getPixels from "get-pixels";
import namer from "color-namer";
import getCenterish from "../Helpers/getCenterish.js";
import { rgbToHex } from "../Helpers/ColorNames.js";
import "./App.css";
import Button from "../button";
import Top from "../top";

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      width: 0,
      height: 0,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.setBackAndForgroundColor = this.setBackAndForgroundColor.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    // navigator.mediaDevices
    //   .enumerateDevices()
    //   .then(device => device.filter(i => i.kind === "videoinput"))
    //   .then(i => console.log(i));
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

  setBackAndForgroundColor(rgb) {
    const theDecider = Math.round(
      (parseInt(rgb[0], 10) * 299 +
        parseInt(rgb[1], 10) * 587 +
        parseInt(rgb[2], 10) * 114) /
        1000,
    );

    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    document.documentElement.style.setProperty("--bg-color", hex);
    if (theDecider > 125) {
      document.documentElement.style.setProperty("--font-color", "#000000");
    } else {
      document.documentElement.style.setProperty("--font-color", "#FFFFFF");
    }
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    getPixels(imageSrc, (err, pix) => {
      if (err) {
        console.error("Bad image path");
        return;
      }

      const rgb = getCenterish(pix);
      const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
      const name = namer(hex);

      this.setBackAndForgroundColor(rgb);

      const accuracy =
        name.ntc[0].distance / name.ntc[name.ntc.length - 1].distance;

      this.setState({
        name: name.ntc[0].name,
        colorData: [
          name.ntc[0].name,
          hex.toUpperCase(),
          `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
          `Accuracy: ${Math.round((100 - accuracy) * 100) / 100}%`,
        ],
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Top title="Color Names" data={this.state.colorData} />
        <div className="app__video">
          <Webcam
            audio={false}
            height={this.state.height - 160}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={this.state.width}
          />
        </div>
        <div className="app__pointer" />
        <div className="app__button">
          <Button onClick={this.capture} />
        </div>
      </div>
    );
  }
}
