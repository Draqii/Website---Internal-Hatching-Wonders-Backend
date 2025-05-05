var express = require('express');
var mongoose = require('mongoose');
var mongo = require('../modules/mongo.js')
var schemas = require('../modules/schemas.js')
var router = express.Router();

const Clockings = mongoose.model('Clocking', schemas.clockingSchema);

router.post('/add', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const timestamp = new Date().toUTCString()
        console.log(timestamp)
        const direction = ""
        const new_clocking = new Clockings({ timestamp: timestamp, email: payload.email, direction: direction });
        await new_clocking.save();
        const new_clockings = await Clockings.find({})
        res.json({
            status: "success",
            clockings: new_clockings
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
