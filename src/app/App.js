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
      console.log(name);
      document.documentElement.style.setProperty("--title-color", hex);
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
      <div>
        <Top title="Color Names" data={this.state.colorData} />
        <Webcam
          audio={false}
          height={this.state.height}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={this.state.width}
        />
        <Button onClick={this.capture} />
        <div className="app__pointer" />
      </div>
    );
  }
}
