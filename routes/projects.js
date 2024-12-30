var express = require('express');
var router = express.Router();
var fs = require('fs')

const createIndex = () => {
  const pool = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "_"]
  let result = ""
  for(let i=0; i<20; i++) result += pool[Math.floor(Math.random() * pool.length)]
  return result
}



router.post('/get_all', function(req, res, next) {
  try {
    // Get All Projects
    let projects = JSON.parse(JSON.stringify(fs.readFileSync("json/projects.json", "utf-8")))
    projects = JSON.parse(projects)

    res.json({projects: projects})
  } catch (err) {
    console.log(err)
  }
});


router.post('/get_single', function(req, res, next) {
  try {
    // Get All Projects
    let projects = JSON.parse(JSON.stringify(fs.readFileSync("json/projects.json", "utf-8")))
    projects = JSON.parse(projects)

    // Get Single Project
    let project = projects.projects.map((project) => {
      if (req.body.project_id === project.id) return project
      else return null
    }).filter(x => !!x)[0];
    if (!project) res.json({status: 401})
    else res.json({status: 200, project: project})
  } catch (err) {
    console.log(err)
  }
});

router.post('/update_single', function(req, res, next) {
  try {
    // Get All Projects
    let projects = JSON.parse(JSON.stringify(fs.readFileSync("json/projects.json", "utf-8")))
    projects = JSON.parse(projects)

    // Filter Single Project And Overwrite It
    projects.projects = projects.projects.map((project) => req.body.project.id === project.id ? req.body.project : project)
    fs.writeFileSync("json/projects.json", JSON.stringify(projects), {flag: "w"});

    res.json({status: 200, projects: projects})
  } catch (err) {
    console.log(err)
  }
});

router.post('/new', function(req, res, next) {
  try {
    // Get All Projects
    let projects = JSON.parse(JSON.stringify(fs.readFileSync("json/projects.json", "utf-8")))
    projects = JSON.parse(projects)

    projects.projects.push({
      id: createIndex(),
      name: req.body.project.name
    })

    fs.writeFileSync("json/projects.json", JSON.stringify(projects), {flag: "w"});
    res.json({status: 200})
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
