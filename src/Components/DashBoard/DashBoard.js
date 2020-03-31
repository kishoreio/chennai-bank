import React from "react";
import SideBar from "../SideBar/SideBar";
import "./dashboard.css";
import Account from "../Account/Account";
import { Route } from "react-router-dom";
import Transaction from "../Transaction/Transaction";
import Cards from "../Cards/Cards";
import TransferFund from "../TransferFund/TransferFund";
import ChangePin from "../ChangePin/ChangePin";
import { Redirect } from "react-router-dom";

class DashBoard extends React.Component {
  render() {
    return (
      <div>
        {this.props.isLogged ? (
          <div id="dashboard">
            <SideBar />
            <div className="vertical-line"></div>
            <Route path="/dashboard/account">
              <Account />
            </Route>
            <Route path="/dashboard/summary">
              <Transaction />
            </Route>
            <Route path="/dashboard/cards">
              <Cards name={this.props.name} />
            </Route>
            <Route path="/dashboard/transfer">
              <TransferFund />
            </Route>
            <Route path="/dashboard/pin">
              <ChangePin />
            </Route>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}
export default DashBoard;
