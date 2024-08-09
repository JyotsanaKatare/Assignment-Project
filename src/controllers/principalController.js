
const Assignment = require('../models/Assignment');
const User = require('../models/User');

const listAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ state: { $in: ['SUBMITTED', 'GRADED'] } });
        res.status(200).json({ data: assignments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' });
        res.status(200).json({ data: teachers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const regradeAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.body.id);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        assignment.grade = req.body.grade;
        assignment.state = 'GRADED';
        await assignment.save();
        res.status(200).json({ data: assignment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { listAssignments, listTeachers, regradeAssignment };
