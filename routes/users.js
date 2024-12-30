var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const createUserId = () => {
  const pool = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "_"]
  let result = ""
  for(let i=0; i<20; i++) result += pool[Math.floor(Math.random() * pool.length)]
  return result
}

router.post('/login', function(req, res, next) {
  try {
    let users = JSON.parse(JSON.stringify(fs.readFileSync("json/users.json", "utf-8")))
    users = JSON.parse(users)
    const loggedIn = req.body.password === users[req.body.name]?.password ? true : false
     console.log(loggedIn)
    res.json({loggedUserId: !loggedIn ? false : users[req.body.name].id})
  } catch (err) {
    console.log(err)
  }
});

router.post('/register', function(req, res, next) {
  try {
    let users = JSON.parse(JSON.stringify(fs.readFileSync("json/users.json", "utf-8")))
    users = JSON.parse(users)
    users[req.body.name] = ({password: req.body.password}) 
    users[req.body.name]["id"] = createUserId()
    fs.writeFileSync("json/users.json", JSON.stringify(users), {flag: "w"});
    res.json({status: 200})
  } catch (err) {
    console.log(err)
  }
});

router.options("/", function(req, res, next) {
  res.send(200)
})

module.exports = router;
