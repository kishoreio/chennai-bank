import React from "react";
import "./header.css";
import logo from "../../Resources/logo.png";

const Header = (props) => {
  const date = new Date();
  const loginTime = date.toLocaleTimeString();
  return (
    <div>
      <div id="header">
        <div id="header-logo">
          <img src={logo} alt="bank-logo" />
          <p className="logo-caption">Trusted Bank</p>
        </div>
        <div id="header-net">
          {props.isLogged ? (
            <div id="head-user">
              <img
                src="https://banner2.cleanpng.com/20180517/uzq/kisspng-computer-icons-user-profile-male-avatar-5afd8d7b2682b3.7338522715265662671577.jpg"
                width="50px"
                heigth="50px"
                alt="user"
                className="profile-pic"
              />
              <div className="login-detail">
                <p className="net-text">Hi, {props.name}</p>
                <p className="net-text">Logged At: {loginTime}</p>
                <button onClick={props.logoutButtonHandle} className="logout">
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <h3>Net Banking</h3>
          )}
        </div>
      </div>
      <div className="credential">
        <p className="demo-cred">
          Login Credential - [Account No: 123456789, Password: admin] and
          Transfer Fund - [Account No: 222222222, Pin: 1234]
        </p>
      </div>
    </div>
  );
};
export default Header;
