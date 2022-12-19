// index.js
// where your node app starts

// init project
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

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function timeConverter(UNIX_timestamp) {
  var a;
  if(UNIX_timestamp=="now"){
    a = new Date();
  }else a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate() > 9 ? a.getDate() : '0' + a.getDate();
  var hour = a.getHours() > 9 ? a.getHours() : '0' + a.getHours();
  var min = a.getMinutes() > 9 ? a.getMinutes() : '0' + a.getMinutes();
  var sec = a.getSeconds() > 9 ? a.getSeconds() : '0' + a.getSeconds();
  var day = days[a.getDay()];
  var time = day + ', ' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' GMT';
  return time;
}

app.get("/api/:time", function(req, res) {
  console.log(req.params.time);
  
  if (/\d{5,}/.test(req.params.time)) {

    const dateInt = parseInt(req.params.time);

    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });

  } else {

    let dateObject = new Date(req.params.time);

    if (dateObject.toString() === "Invalid Date") {

      res.json({ error: "Invalid Date" });

    } else {

      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });

    }

  }
});

// your first API endpoint... 
app.get("/api", function(req, res) {
  res.json({ unix: parseInt((new Date()).getTime()), utc: timeConverter("now") });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
