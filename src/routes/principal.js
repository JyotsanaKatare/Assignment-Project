
const express = require('express');
const { listAssignments, listTeachers, regradeAssignment } = require('../controllers/principalController');
const router = express.Router();

router.get('/assignments', listAssignments);
router.get('/teachers', listTeachers);
router.post('/assignments/grade', regradeAssignment);

module.exports = router;
