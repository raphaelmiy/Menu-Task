const express = require("express");
const bodyParser = require("body-parser");

const UssdMenu = require("ussd-menu-builder");
const menu = new UssdMenu();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
  // Read the variables sent via POST from our API
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  menu.state("personDetails", {
    run: (args) => {
      let firstName = "";
      let lastName = "";
      let age = "";
      menu.con("Welcome please provide your first name,last name and age");
      menu.con("Enter first name");
      firstName = menu.val;
      menu.session.set("firstName", firstName).then(() => {
        menu.con("Enter your last name");
        lastName = menu.val;
        menu.session.set("lastName", lastName).then(() => {
          menu.con("Enter your age");
          age = menu.val;
          menu.session.set("age", age);
        });
      });
      if (age > 50) {
        menu.end("Please retire");
      }
      menu.end(
        `Your name is ${firstName} ${lastName} age ${age} continue working`
      );
    },
  });
});
