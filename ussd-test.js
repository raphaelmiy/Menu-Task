const express = require("express");

const UssdMenu = require("ussd-menu-builder");
const menu = new UssdMenu();

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

menu.state("personDetails", {
  run: (args) => {
    let firstName = "";
    let lastName = "";
    let age = "";
    menu.con("welcome please provide your 1st name,last name and age");
    menu.con("enter first name");
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
      menu.end("please retire");
    }
    menu.end(
      `your name is ${firstName} ${lastName} age ${age} continue working`
    );
  },
});
// Registering USSD handler with Express

app.post("/", function (req, res) {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});
// listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});