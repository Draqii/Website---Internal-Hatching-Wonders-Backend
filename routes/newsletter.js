var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const connection_string = "mongodb+srv://SilentDraqon:HsmdD6y1fKdV7F8k@silentcluster.gnfrz.mongodb.net/HatchingWonders"
const kittySchema = new mongoose.Schema({
    name: String,
    email: String
});
kittySchema.methods.speak = function speak() {
    const greeting = this.name
        ? 'Meow name is ' + this.name
        : 'I don\'t have a name';
    console.log(greeting);
};


router.post('/subscribe', async function (req, res, next) {
    try {
    const payload = req.body.payload
    console.log(payload)
    await mongoose.connect(connection_string);
    const Kitten = mongoose.model('NewsletterSubscriber', kittySchema);
    const fluffy = new Kitten({ name: payload.name, email: payload.email });
    await fluffy.save();
    }
    catch (err) {
        console.log(err)
    }
    res.json({ status: "hewo" });
});


router.post('/get-subscribers', async function (req, res, next) {
    try {
    const payload = req.body.payload
    console.log(payload)
    await mongoose.connect(connection_string);
    const Kitten = mongoose.model('NewsletterSubscriber', kittySchema);
    const kitten = await Kitten.find()
    res.json({ status: "hewo",
        payload: {
            subscribers: kitten
        }
     });
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;
