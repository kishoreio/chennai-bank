import React from "react";
import Login from "./Components/Login/Login";
import "./app.css";
import Header from "./Components/Header/Header";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Error from "./Components/404/Error";
import DashBoard from "./Components/DashBoard/DashBoard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      name: ""
    };
    this.isUserLogged = this.isUserLogged.bind(this);
  }
  isUserLogged(name) {
    this.setState({
      isLogged: true,
      name
    });
  }
  logoutButtonHandle = () => {
    this.setState({
      isLogged: false,
      name: ""
    });
    localStorage.clear();
  };

  render() {
    const { isLogged, name } = this.state;
    return (
      <div id="app">
        <Header
          isLogged={isLogged}
          name={name}
          logoutButtonHandle={this.logoutButtonHandle}
        />
        <HashRouter>
          <Switch>
            <Route exact path="/">
              {isLogged ? (
                <Redirect to="/dashboard/account" />
              ) : (
                <Login isUserLogged={this.isUserLogged} />
              )}
            </Route>
            <Route path="/dashboard">
              <DashBoard isLogged={isLogged} name={name} />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
