var express = require('express');
var mongoose = require('mongoose');
var mongo = require('../modules/mongo.js')
var schemas = require('../modules/schemas.js')
var router = express.Router();

const Clockings = mongoose.model('Clocking', schemas.clockingSchema);

router.post('/add', async function (req, res, next) {
    try {
        const payload = req.body.payload
        await mongoose.connect(mongo.connection_string);
        const timestamp = new Date().toUTCString()
        const old_clockings = await Clockings.find({employee_id: payload.employee_id})
        const direction = old_clockings[old_clockings.length - 1].direction === "in" ? "out" : "in"
        const new_clocking = new Clockings({ timestamp: timestamp, employee_id: payload.employee_id, direction: direction });
        await new_clocking.save();
        const new_clockings = await Clockings.find({employee_id: payload.employee_id})
        res.json({
            status: "failure",
            payload: {
                clockings: new_clockings
            }
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "success",
            payload: {
                clockings: []
            }
        })
    }
});

router.post('/get', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const kitten = await Clockings.find({employee_id: payload.employee_id})
        res.json({
            status: "success",
            payload: {
                clockings: kitten
            }
        });
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure",
            payload: {
                clockings: []
            }
        })
    }
});


module.exports = router;
