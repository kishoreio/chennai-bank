import React from "react";
import "./changepin.css";
import axios from "axios";

class ChangePin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPin: "",
      changePin: "",
      message: ""
    };
  }
  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    axios
      .post(
        "https://chennai-bank.herokuapp.com/pin",
        {
          currentPin: this.state.currentPin,
          changePin: this.state.changePin
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then((result) => {
        this.setState({
          message: result.data.message
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { currentPin, changePin, message } = this.state;
    return (
      <div id="form-change">
        <h1>Change Pin</h1>
        <form onSubmit={this.handleFormSubmit} id="pin-form">
          <label htmlFor="currentPin">Current Pin</label>
          <input
            type="password"
            value={currentPin}
            placeholder="Enter Current Pin"
            name="currentPin"
            onChange={(e) => {
              this.handleFormChange(e);
            }}
            className="pin-input"
          />
          <label htmlFor="changePin">Change Pin</label>
          <input
            type="password"
            value={changePin}
            placeholder="Enter Pin to Change"
            name="changePin"
            onChange={(e) => {
              this.handleFormChange(e);
            }}
            className="pin-input"
          />
          <button>Change Pin</button>
        </form>
        {message !== "" ? <p className="pin-text">{message}</p> : ""}
      </div>
    );
  }
}
export default ChangePin;
