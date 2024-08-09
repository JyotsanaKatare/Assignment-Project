
const express = require('express');
const { createAssignment, editAssignment, submitAssignment, listAssignments } = require('../controllers/studentController');
const router = express.Router();

router.post('/assignments', createAssignment);
router.post('/assignments/edit', editAssignment);
router.post('/assignments/submit', submitAssignment);
router.get('/assignments', listAssignments);

module.exports = router;
