import React from "react";
import "./account.css";
import AccountDetails from "./AccountDetails";
import axios from "axios";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountDetails: [],
      email: "",
      mobile: ""
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get("https://chennai-bank.herokuapp.com/account", {
        headers: {
          Authorization: token
        }
      })
      .then((result) => {
        this.setState({
          accountDetails: result.data.data.accountDetails
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    console.log(this.state.email);
    console.log(this.state.mobile);
    const { accountDetails } = this.state;
    const accountInform = accountDetails.map((element, index) => {
      return (
        <AccountDetails
          key={index}
          element={element}
          handleFormChange={this.handleFormChange}
        />
      );
    });
    return (
      <div id="account">
        <h1>Account Details:</h1>
        <div>{accountInform}</div>
      </div>
    );
  }
}
export default Account;
