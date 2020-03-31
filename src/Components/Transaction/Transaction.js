import React from "react";
import "./transaction.css";
import IndividualDetail from "./IndividualDetail";
import axios from "axios";

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get("https://chennai-bank.herokuapp.com/transaction", {
        headers: {
          Authorization: token
        }
      })
      .then((result) => {
        this.setState({
          arr: result.data.arr.summary
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="transaction-summary">
        <h1>Transaction Summary</h1>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <IndividualDetail details={this.state.arr} />
          </tbody>
        </table>
      </div>
    );
  }
}
export default Transaction;
