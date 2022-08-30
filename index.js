// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

//date
app.get("/api", (req, res) => {
  const dateNow = new Date();

  res.json({
    "unix": dateNow.getTime(),
    "utc": dateNow.toUTCString()
  });
})

// date with parameter
app.get("/api/:date", (req, res) => {
  let params = req.params.date;
  let date = new Date(params);
  let parseToInt = parseInt(params);

  if (parseToInt > 10000) {
    let unix = new Date(parseToInt);
    return res.json({
      "unix": unix.getTime(),
      "utc": unix.toUTCString()
    });
  }

  if (date == "Invalid Date") {
    return res.json({ error : "Invalid Date" });
  } else {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
