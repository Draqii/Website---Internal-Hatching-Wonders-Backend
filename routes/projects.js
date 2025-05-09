var express = require('express');
var mongoose = require('mongoose');
var mongo = require('../modules/mongo.js')
var schemas = require('../modules/schemas.js')
var router = express.Router();


router.post('/add', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const Kitten = mongoose.model('Projects', schemas.projectSchema
        );
        const fluffy = new Kitten({ name: payload.name });
        await fluffy.save();
        const kitten = await Kitten.find()
        res.json({
            status: "success",
            payload: {
                projects: kitten
            }
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure",
            payload: {
                projects: []
            }
        })
    }
});


router.post('/get', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const Kitten = mongoose.model('Projects', schemas.projectSchema);
        const kitten = await Kitten.find()
        res.json({
            status: "success",
            payload: {
                projects: kitten
            }
        });
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "failure",
            payload: {
                projects: []
            }
        })
    }
});


module.exports = router;
