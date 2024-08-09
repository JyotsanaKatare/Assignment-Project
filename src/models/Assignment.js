
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    grade: { type: String, default: null },
    state: { type: String, default: 'DRAFT' },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

assignmentSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
