const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const name = req.body.name;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    member: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: lname
        }
      }
    ]
  };
  // {
  //             skipMergeValidation: false
  //         }
  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/d576161dfb";

  const options = {
    method: "POST",
    auth: "Jayallstars:5245f8afc1de122ef8317f89f78926f5-us20"
  };

  const request = https.request(url, options, function(response) {
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.listen(3000, function() {
    console.log("Running on port 3000")
});

// AUDIENCE ID : d576161dfb

//API : 0d5584984ccadd2c1ef999b01eb478c7-us20
