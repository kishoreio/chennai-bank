import React from "react";
import { Form, Button } from "react-bootstrap";
import "./login.css";
import Footer from "../Footer/Footer";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: ""
    };
    this.onFormInputChange = this.onFormInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onFormSubmit(event) {
    event.preventDefault();
    axios
      .post("https://chennai-bank.herokuapp.com/login", {
        account: this.state.account,
        password: this.state.password
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        this.props.isUserLogged(response.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { account, password } = this.state;
    return (
      <div>
        <div id="login-bg">
          <div id="form">
            <div id="form-elements">
              <Form onSubmit={this.onFormSubmit} id="form-bg">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="form-text">Account No</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Account No"
                    name="account"
                    value={account}
                    onChange={(event) => {
                      this.onFormInputChange(event);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="form-text">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={(event) => {
                      this.onFormInputChange(event);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Login;
