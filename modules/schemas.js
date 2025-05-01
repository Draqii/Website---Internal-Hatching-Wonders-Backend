var mongoose = require('mongoose');

const clockingSchema = new mongoose.Schema({
    email: String,
    timestamp: String,
    direction: String,
    employee_id: String
});

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    password: String,
    id: String
});

const newsletterSubscriberSchema = new mongoose.Schema({
    name: String,
    email: String
});

module.exports = {
    clockingSchema: clockingSchema,
    employeeSchema: employeeSchema,
    newsletterSubscriberSchema: newsletterSubscriberSchema
}