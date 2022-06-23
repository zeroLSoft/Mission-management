const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    userName: String,
    password: String,
    level: Boolean,
    taskArray:[{
        title: String,
        content: String,
        checked: Boolean,
        openDate: String,
        openTime: String,
        whoOpen: Boolean
    }],
})

const User = mongoose.model("User",userSchema);

module.exports = User;

