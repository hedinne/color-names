import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Top.css";

export default class Top extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      nr: 0,
    };

    this.onLeft = this.onLeft.bind(this);
    this.onRight = this.onRight.bind(this);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
  };

  onLeft() {
    if (this.state.nr > 0) {
      this.setState({ nr: this.state.nr - 1 });
    } else {
      this.setState({ nr: this.props.data.length - 1 });
    }
  }

  onRight() {
    if (this.state.nr < this.props.data.length - 1) {
      this.setState({ nr: this.state.nr + 1 });
    } else {
      this.setState({ nr: 0 });
    }
  }

  render() {
    const { title, data } = this.props;
    console.log(this.state.nr);
    return (
      <div className="top">
        {data &&
          <button
            className="top__arrow"
            name="Left Arrow"
            onClick={this.onLeft}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 24 24"
            >
              <path
                fill="#eee"
                d="M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"
              />
            </svg>
          </button>}

        {!data
          ? <h1 className="top__heading">{title}</h1>
          : <h1 className="top__heading">{data[this.state.nr]}</h1>}

        {data &&
          <button
            className="top__arrow"
            name="Right Arrow"
            onClick={this.onRight}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 24 24"
            >
              <path
                fill="#eee"
                d="M8.578 16.359l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z"
              />
            </svg>

          </button>}
      </div>
    );
  }
}
