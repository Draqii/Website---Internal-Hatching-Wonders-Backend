var express = require('express');
var mongoose = require('mongoose');
var mongo = require('../modules/mongo.js')
var schemas = require('../modules/schemas.js')
var cypher = require('../modules/cypher.js')
var router = express.Router();


router.post('/register', async function (req, res, next) {
    try {
        const payload = req.body.payload
        await mongoose.connect(mongo.connection_string);
        const Employees = mongoose.model('Employee', schemas.employeeSchema);
        const new_employee = new Employees({ 
            id: cypher.create_id(), 
            name: payload.name, 
            email: payload.email, 
            password: payload.password, 
            role: payload.role });
        await new_employee.save();
        res.json({
            status: "success"
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure"
        })
    }
});


router.post('/login', async function (req, res, next) {
    try {
        const payload = req.body.payload
        await mongoose.connect(mongo.connection_string);
        const Employees = mongoose.model('Employee', schemas.employeeSchema);
        const employees = await Employees.find({ 
            email: payload.email, 
            password: payload.password 
        })
        console.log(payload)
        console.log(employees)
        res.json({ status: "success", 
            payload: {
                id: employees.length > 0 ? employees[0].id : "none"
            }
        });

    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure"
        })
    }
});


router.post('/update', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const Employees = mongoose.model('Employee', schemas.employeeSchema);
        await Employees.findOneAndUpdate({id: payload.id}, { 
                name: payload.name, 
                email: payload.email, 
                password: payload.password, 
                role: payload.role,
                id: payload.id
            }
        );
        res.json({
            status: "success"
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure"
        })
    }
});


router.post('/delete', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const Employees = mongoose.model('Employee', schemas.employeeSchema);
        await Employees.findOneAndDelete({id: payload.id});
        res.json({
            status: "success"
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure"
        })
    }
});



router.post('/get', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const Kitten = mongoose.model('Employee', schemas.employeeSchema);
        const kitten = await Kitten.find()
        res.json({
            status: "success",
            payload: {
                employees: kitten
            }
        });
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure",
            payload: {
                employees: []
            }
        })
    }
});


module.exports = router;
