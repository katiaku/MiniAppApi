const { pool } = require('../db');

const getStudents = async (req, res) => {
    try {
        let params = [req.query.student_id];
        let sql;
        if (req.query.student_id == null)
            sql = "SELECT * FROM students";
        else
            sql = `SELECT * FROM students WHERE student_id = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

const addStudent = async (req, res) => {
    try {
        console.log(req.body);
        let params = [req.body.first_name, req.body.last_name, req.body.group_id, req.body.enrollment_year];
        let sql = `INSERT INTO students (first_name, last_name, group_id, enrollment_year) 
                    VALUES (?, ?, ?, ?)`;
        console.log(sql);

        let [result] = await pool.query(sql, params);
        console.log(result);

        if (result.insertId)
            res.send(String(result.insertId));
        else
            res.send('-1');
    } catch (err) {
        console.log(err);
    }
};

const updateStudent = async (req, res) => {
    try {
        let params = [req.body.first_name, req.body.last_name, req.body.group_id, 
            req.body.enrollment_year, req.body.student_id];
        let sql = `UPDATE students 
                    SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name), 
                    group_id = COALESCE(?, group_id), enrollment_year = COALESCE(?, enrollment_year) 
                    WHERE student_id = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

const deleteStudent = async (req, res) => {
    try {
        let params = [req.body.student_id];
        let sql = `DELETE FROM students WHERE student_id = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getStudents, addStudent, updateStudent, deleteStudent };
