// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp Microservice API
app.get("/api/timestamp/:date_string?", function (req, res) {
  var dateString = req.params.date_string;
  var date;
  
  if(dateString) {
    // date_string was provided, create a date from it
    // handle it as a UNIX timestamp if it consists entirely of numbers
    date = /^\d+$/.test(dateString) ? new Date(parseInt(dateString)) : new Date(dateString)
  } else {
    date = new Date();
  }
  
  if(isNaN(date)) {
    // date string was invalid
    res.json({"error" : "Invalid Date" })
  } else {
    // date_string was valid, return the UNIX and UTC dates
    res.json({"unix": date.getTime(), "utc": date.toUTCString() })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});