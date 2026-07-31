const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title']
    },
    companyName: {
        type: String,
        required: [true, 'Please add a company name']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    salaryRange: {
        type: String
    },
    skillsRequired: {
        type: [String],
        default: []
    },
    experienceRequired: {
        type: String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Job', JobSchema);