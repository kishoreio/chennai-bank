import React from "react";

const AccountDetails = (props) => {
  return (
    <div className="account-details">
      <label>{props.element.text}</label>
      <input
        value={props.element.details}
        disabled={props.element.isDisabled}
        name={props.element.text}
        className="account-input"
        onChange={(e) => {
          props.handleFormChange(e);
        }}
      />
    </div>
  );
};
export default AccountDetails;
