import React from "react";
import "./transferfund.css";
import axios from "axios";

class TransferFund extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNo: "",
      amount: "",
      pin: "",
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
        "https://chennai-bank.herokuapp.com/transfer",
        {
          account: this.state.accountNo,
          amount: this.state.amount,
          pin: this.state.pin
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
    const { accountNo, amount, pin, message } = this.state;
    return (
      <div id="transfer-form">
        <h1>Transfer Fund</h1>
        <form id="fund-form">
          <label htmlFor="accountNo">Account No</label>
          <input
            type="text"
            value={accountNo}
            name="accountNo"
            placeholder="Enter account number"
            onChange={(e) => {
              this.handleFormChange(e);
            }}
            className="transfer-input"
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            value={amount}
            name="amount"
            placeholder="Enter the amount"
            onChange={(e) => {
              this.handleFormChange(e);
            }}
            className="transfer-input"
          />
          <label htmlFor="pin">Pin</label>
          <input
            type="password"
            value={pin}
            name="pin"
            placeholder="Enter Pin"
            onChange={(e) => {
              this.handleFormChange(e);
            }}
            className="transfer-input"
          />
          <button onClick={this.handleFormSubmit}>Transfer</button>
        </form>
        <p className="return-text">{message}</p>
      </div>
    );
  }
}
export default TransferFund;
