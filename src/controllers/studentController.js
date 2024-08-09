
const Assignment = require('../models/Assignment');

const createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment({
            content: req.body.content,
            student_id: req.principal.student_id
        });
        await assignment.save();
        res.status(201).json({ data: assignment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.body.id);
        if (!assignment || assignment.student_id.toString() !== req.principal.student_id.toString()) {
            return res.status(404).json({ error: 'Assignment not found or unauthorized' });
        }
        assignment.content = req.body.content;
        await assignment.save();
        res.status(200).json({ data: assignment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.body.id);
        if (!assignment || assignment.student_id.toString() !== req.principal.student_id.toString()) {
            return res.status(404).json({ error: 'Assignment not found or unauthorized' });
        }
        assignment.state = 'SUBMITTED';
        assignment.teacher_id = req.body.teacher_id;
        await assignment.save();
        res.status(200).json({ data: assignment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ student_id: req.principal.student_id });
        res.status(200).json({ data: assignments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createAssignment, editAssignment, submitAssignment, listAssignments };
