import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const contents = [
    {
      link: "/dashboard/account",
      text: "Account"
    },
    {
      link: "/dashboard/summary",
      text: "Transaction Summary"
    },
    {
      link: "/dashboard/cards",
      text: "Cards"
    },
    {
      link: "/dashboard/transfer",
      text: "Transfer Fund"
    },
    {
      link: "/dashboard/pin",
      text: "Change Pin"
    }
  ];
  return (
    <div id="sidebar">
      {contents.map((element, index) => {
        return (
          <NavLink to={element.link} className="sidebar-content" key={index}>
            {element.text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default SideBar;
