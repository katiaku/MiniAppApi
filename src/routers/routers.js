const { Router } = require('express');
const router = Router();
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../controller/students.controller');
const { getAvgGradeByStudent, getStudentsWithSubjects, getTeachersWithSubjects} = require('../controller/marks_subjects.controller');

router.get('/students', getStudents);

router.get('/grades', getAvgGradeByStudent);

router.get('/enrollment_info', getStudentsWithSubjects);

router.get('/subjects_taught', getTeachersWithSubjects);

router.post('/students', addStudent);

router.put('/students', updateStudent);

router.delete('/students', deleteStudent);

module.exports = router;
