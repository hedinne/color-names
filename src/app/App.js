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
      cameraAllowed: false,
      videoSources: ["default"],
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.setBackAndForgroundColor = this.setBackAndForgroundColor.bind(this);
    this.onMediaStream = this.onMediaStream.bind(this);
    this.rotateSources = this.rotateSources.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    let videoSources = [];
    navigator.mediaDevices
      .enumerateDevices()
      .then(device => device.filter(i => i.kind === "videoinput"))
      .then(i => i.forEach(d => videoSources.push(d.deviceId)));
    this.setState({ videoSources });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  onMediaStream() {
    this.setState({
      cameraAllowed: true,
    });
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  rotateSources() {
    let videoSources = this.state.videoSources;
    videoSources.push(videoSources.shift());
    this.setState({ videoSources });
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
    if (!this.state.cameraAllowed) {
      return;
    }
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
            onUserMedia={this.onMediaStream}
            videoSource={this.state.videoSources[0]}
          />
          {!this.state.cameraAllowed &&
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="app__placeholder"
            >
              <path
                className="app__svg"
                d="M29.996 4c0.001 0.001 0.003 0.002 0.004 0.004v23.993c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993zM30 2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2v0z"
              />
              <path
                className="app__svg"
                d="M26 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
              />
              <path className="app__svg" d="M28 26h-24v-4l7-12 8 10h2l7-6z" />
            </svg>}
        </div>
        {this.state.cameraAllowed && <div className="app__pointer" />}
        <div className="app__button">
          {this.state.videoSources.length > 22 &&
            <button className="app__switch" onClick={this.rotateSources}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  className="app__svg"
                  d="M6.984 2.016v10.5c0-1.688 3.328-2.531 5.016-2.531s5.016 0.844 5.016 2.531v-10.5h-10.031zM17.016 0c1.078 0 1.969 0.938 1.969 2.016v13.969c0 1.078-0.891 2.016-1.969 2.016h-7.031l3 3-3 3v-2.016h-4.969v-1.969h4.969v-2.016h-3c-1.078 0-1.969-0.938-1.969-2.016v-13.969c0-1.078 0.891-2.016 1.969-2.016h10.031zM12 8.016c-1.078 0-1.969-0.938-1.969-2.016s0.891-2.016 1.969-2.016 2.016 0.938 2.016 2.016-0.938 2.016-2.016 2.016zM14.016 20.016h4.969v1.969h-4.969v-1.969z"
                />
              </svg>
            </button>}

          <Button onClick={this.capture} />
        </div>
      </div>
    );
  }
}
