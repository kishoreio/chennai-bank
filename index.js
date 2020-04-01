const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const mongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
let PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, function() {
  console.log("server is running");
});

let incomingId = null;
//authenticate
function authenticate(req, res, next) {
  var incomingToken = req.header("Authorization");
  jwt.verify(incomingToken, "your token", function(err, decoded) {
    if (decoded !== undefined) {
      incomingId = decoded.id;
      next();
    } else {
      res.json({
        message: "not authenicated"
      });
    }
  });
}

//Login
app.post("/login", function(req, res) {
  mongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("netDB");
    var result = db.collection("users").findOne({
      account: req.body.account,
      password: req.body.password
    });
    result
      .then(function(userData) {
        const id = userData._id;
        const name = userData.name;
        if (userData !== null) {
          jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              id
            },
            "your token",
            function(err, token) {
              if (err) throw err;
              res.json({
                name,
                token
              });
            }
          );
        } else {
          res.json({
            message: "Please check your account no and password"
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//account
app.get("/account", authenticate, function(req, res) {
  mongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("netDB");
    var result = db
      .collection("accountDetails")
      .findOne(
        { _id: ObjectID(incomingId) },
        { projection: { _id: false, accountDetails: true } }
      );
    result
      .then((data) => {
        if (data !== null) {
          res.json({
            data
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // client.close();
});

//transfer and transaction update
app.post("/transfer", authenticate, function(req, res) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  mongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("netDB");
    var result = db.collection("atm").findOne({ _id: ObjectID(incomingId) });
    result
      .then((data) => {
        if (data !== null) {
          if (data.pin == req.body.pin) {
            if (data.balance > req.body.amount) {
              var resultTwo = db
                .collection("atm")
                .findOne({ accountNo: req.body.account });
              resultTwo
                .then((data2) => {
                  let total = data2.balance + parseInt(req.body.amount);
                  var resultThree = db
                    .collection("atm")
                    .updateOne(
                      { accountNo: req.body.account },
                      { $set: { balance: total } }
                    );
                  resultThree
                    .then(() => {
                      let total = data.balance - req.body.amount;
                      var resultFour = db
                        .collection("atm")
                        .updateOne(
                          { _id: ObjectID(incomingId) },
                          { $set: { balance: total } }
                        );
                      resultFour
                        .then(() => {
                          var resultFive = db
                            .collection("transaction")
                            .findOne({ _id: ObjectID(incomingId) });
                          resultFive
                            .then((data4) => {
                              let summary = [
                                ...data4.summary,
                                {
                                  time: day + "/" + month + "/" + year,
                                  desc: "withdraw",
                                  debit: req.body.amount,
                                  credit: "",
                                  balance: total
                                }
                              ];
                              db.collection("transaction").updateOne(
                                { _id: ObjectID(incomingId) },
                                { $set: { summary } }
                              );
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                      res.json({
                        message: "Amount Transferred Successfully"
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              res.json({
                message: "Insufficient Balance"
              });
            }
          } else {
            res.json({
              message: "Wrong Pin"
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // client.close();
});

//change-pin
app.post("/pin", authenticate, function(req, res) {
  mongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("netDB");
    var result = db.collection("atm").findOne({ _id: ObjectID(incomingId) });
    result
      .then((data) => {
        if (
          data !== null &&
          parseInt(data.pin) == parseInt(req.body.currentPin)
        ) {
          var resultTwo = db
            .collection("atm")
            .updateOne(
              { _id: ObjectID(incomingId) },
              { $set: { pin: req.body.changePin } }
            );
          resultTwo
            .then(() => {
              res.json({
                message: "Pin Changed"
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json({
            message: "Incorrect Pin"
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // client.close();
});

//transaction-details
app.get("/transaction", authenticate, function(req, res) {
  mongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("netDB");
    var result = db
      .collection("transaction")
      .findOne(
        { _id: ObjectID(incomingId) },
        { projection: { _id: false, summary: true } }
      );
    result
      .then((data) => {
        if (data !== null) {
          res.json({
            arr: data
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // client.close();
});
