
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: { type: String, required: true, enum: ['principal', 'student', 'teacher'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

