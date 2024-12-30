var express = require('express');
var router = express.Router();
var fs = require('fs')

/* Get All Clockings Of User */
router.post('/', function(req, res, next) {
  try {
    let clockings = JSON.parse(JSON.stringify(fs.readFileSync("json/clockings.json", "utf-8")))
    clockings = JSON.parse(clockings)
    let user_clockings = clockings[req.body.uid]
    res.json({clockings: user_clockings})
  } catch (err) {
    console.log(err)
  }
});

router.post('/new', function(req, res, next) {
  try {
    let clockings = JSON.parse(JSON.stringify(fs.readFileSync("json/clockings.json", "utf-8")))
    clockings = JSON.parse(clockings)
    let user_clockings = clockings[req.body.uid]
    
    // 20.11.2024 03:00PM UTC
    // 'Thu, 21 Nov 2024 01:21:02 GMT'
    let currentDate = new Date() 
    let dayOfMonth = currentDate.getUTCDate()
    let monthOfYear = currentDate.getUTCMonth() + 1
    let year = currentDate.getUTCFullYear()

    let hours = currentDate.getUTCHours()
    let minutes = currentDate.getUTCMinutes()


    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    hours = hours < 10 ? '0'+hours : hours;

    const date = dayOfMonth + "." + monthOfYear + "." + year + " " + hours + ":" + minutes + ampm + " UTC"

    user_clockings.push({
      time: date,
      direction: user_clockings[user_clockings.length - 1].direction === "in" ? "out" : "in"
    })

    clockings[req.body.uid] = user_clockings
    fs.writeFileSync("json/clockings.json", JSON.stringify(clockings), {flag: "w"});
    res.json({status: 200})
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
