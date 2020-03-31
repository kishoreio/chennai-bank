import React from "react";
import "./footer.css";
import ssl from "../../Resources/ssl.png";

const Footer = () => {
  return (
    <div id="footer-bg">
      <div id="footer-content">
        <div>
          <img src={ssl} alt="ssl-logo" width="200px" height="70px" />
        </div>
        <div>
          <h3>Security Caution</h3>
          <p>
            NEVER respond to any popup,email, SMS or phone call, no matter how
            appealing or official looking, seeking your personal information
            such as username, password(s), mobile number, ATM Card details, etc.
            Such communications are sent or created by fraudsters to trick you
            into parting with your credentials.
          </p>
        </div>
        <div>
          <h3>Security Note</h3>
          <p>
            When you Login, your user ID and Passwords travels in an encrypted
            and highly secured mode
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
