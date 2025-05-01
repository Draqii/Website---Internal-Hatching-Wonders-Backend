var express = require('express');
var mongoose = require('mongoose');
var mongo = require('../modules/mongo.js')
var schemas = require('../modules/schemas.js')
var router = express.Router();


router.post('/subscribe', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const Kitten = mongoose.model('NewsletterSubscriber', schemas.newsletterSubscriberSchema);
        const fluffy = new Kitten({ name: payload.name, email: payload.email });
        await fluffy.save();
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


router.post('/get-subscribers', async function (req, res, next) {
    try {
        const payload = req.body.payload
        console.log(payload)
        await mongoose.connect(mongo.connection_string);
        const Kitten = mongoose.model('NewsletterSubscriber', schemas.newsletterSubscriberSchema);
        const kitten = await Kitten.find()
        res.json({
            status: "success",
            payload: {
                subscribers: kitten
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


module.exports = router;
