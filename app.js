const express = require("express");
const app = express();

const https = require("https");

const request = require("request");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")

});

app.post("/", function(req, res) {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email_ID = req.body.emailID;

  const data = {
    members: [{
      email_address: email_ID,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/a28e78dab1";

  const options = {
    method: "post",
    auth: "tejas1:2ccc4d3d41da9a6cce716ce63a7092b2-us17"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })


  });

  request.write(jsonData);
  request.end();



});

app.post("/failure", function(req, res) {
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Welcome to the Facebook server!");
});
