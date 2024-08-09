
const express = require('express');
const { listAssignments, gradeAssignment } = require('../controllers/teacherController');
const router = express.Router();

router.get('/assignments', listAssignments);
router.post('/assignments/grade', gradeAssignment);

module.exports = router;
