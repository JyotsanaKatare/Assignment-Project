
const Assignment = require('../models/Assignment');

const listAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ teacher_id: req.principal.teacher_id, state: 'SUBMITTED' });
        res.status(200).json({ data: assignments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const gradeAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.body.id);
        if (!assignment || assignment.teacher_id.toString() !== req.principal.teacher_id.toString()) {
            return res.status(404).json({ error: 'Assignment not found or unauthorized' });
        }
        assignment.grade = req.body.grade;
        assignment.state = 'GRADED';
        await assignment.save();
        res.status(200).json({ data: assignment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { listAssignments, gradeAssignment };
