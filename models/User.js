const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, requied: true },
    role: {
        type:String,
        enum: ['candidate', 'recruite','admin'],
        default: 'candidate'
    }
}, { timestamps: true });  //Automatically tracks createdAt and dates

module.exports = mongoose.model('User', UserSchema);