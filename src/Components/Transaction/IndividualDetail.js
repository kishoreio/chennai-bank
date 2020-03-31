import React from "react";

const IndividualDetail = ({ details }) => {
  const newArr = details.map((element, index) => {
    return (
      <tr key={index}>
        <td>{element.time}</td>
        <td>{element.desc}</td>
        <td>{element.debit}</td>
        <td>{element.credit}</td>
        <td>{element.balance}</td>
      </tr>
    );
  });
  return <React.Fragment>{newArr}</React.Fragment>;
};
export default IndividualDetail;
