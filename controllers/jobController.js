const Job = require('../models/Job');
// @desc    Create a new job
// @route   POST /api/jobs
// @access  Public (or Private if you add auth middleware later)
const createJob = async (req, res) => {
    try {
        const { title, companyName, location, salaryRange, skillsRequired, experienceRequired } = req.body;
        const newJob = await Job.create({
            title,
            companyName,
            location,
            salaryRange,
            skillsRequired,
            experienceRequired
        });
        res.status(201).json({
            success: true,
            data: newJob
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}); // Fetches every job from MongoDB
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });

        }
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Job removed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
};