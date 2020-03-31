import React from "react";
import "./cards.css";
import logo from "../../Resources/logo.png";
import chip from "../../Resources/chip.png";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          cardType: "Platinum Card",
          cardNo: "2342 4344 3434 4344",
          valid: "11/22",
          name: this.props.name,
          provider: "Visa"
        }
      ]
    };
  }
  render() {
    const cardArr = this.state.cards.map((element, index) => {
      return (
        <div id="card-layout" key={index}>
          <div id="card-head">
            <img src={logo} width="150px" heigth="50px" alt="logo" />
            <h3>{element.cardType}</h3>
          </div>
          <div id="card-detail">
            <div id="card-chip">
              <img src={chip} width="30px" heigth="20px" alt="logo" />
            </div>
            <div id="card-number">
              <p>{element.cardNo}</p>
            </div>
            <div id="card-valid">
              <p>Valid {element.valid}</p>
            </div>
            <div id="card-type">
              <p>{element.name}</p>
              <p>{element.provider}</p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div id="cards">
        <h1>Cards: </h1>
        {cardArr}
      </div>
    );
  }
}
export default Cards;
