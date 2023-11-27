const { pool } = require('../db');

const getAvgGradeByStudent = async (req, res) => {
    try {
        let params = [req.query.student_id];
        let sql = `SELECT AVG(mark) AS average FROM marks WHERE student_id = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

const getStudentsWithSubjects = async (req, res) => {
    try {
        let params = [req.query.student_id];
        let sql;
        if ((req.query.student_id == null))
            sql = `SELECT first_name, last_name, title FROM students AS st
                    JOIN marks AS m ON (st.student_id = m.student_id)
                    JOIN subjects AS sb ON (m.subject_id = sb.subject_id)`;
        else
            sql = `SELECT title FROM marks AS m
                    JOIN subjects AS s ON (m.subject_id = s.subject_id)
                    WHERE student_id = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

const getTeachersWithSubjects = async (req, res) => {
    try {
        let params = [req.query.teacher_id];
        let sql;
        if ((req.query.teacher_id == null))
            sql = `SELECT first_name, last_name, title FROM teachers AS t
                    JOIN subject_teacher AS st ON (t.teacher_id = st.teacher_id)
                    JOIN subjects AS sb ON (st.subject_id = sb.subject_id)`;
        else
            sql = `SELECT title FROM subjects AS s
                    JOIN subject_teacher AS st ON (s.subject_id = st.subject_id)
                    WHERE teacher_id = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getAvgGradeByStudent, getStudentsWithSubjects, getTeachersWithSubjects };
