import { db } from "../app.js";

export const getTodos = (req, res) => {
    console.log("asked for todos");
    db.query('SELECT * FROM tasks WHERE users_id = ?', [req.id], (err, results) => {
        if (err) return res.status(500).json(err);
        return res.json(results);
    });
};

export const addTodo = (req, res) => {
    const { title } = req.body;
    console.log(title);
    db.query('INSERT INTO tasks (users_id, task) VALUES (?, ?)', [req.id, title], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title });
    });
};

export const deleteTodo = (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Deleted successfully' });
    });
};

export const updateTodo = (req, res) => {
    const { id } = req.params;
    console.log(id);
    //  "UPDATE tasks SET status = ? WHERE id = ?";
    const sql = 'UPDATE tasks SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send("Task Updated");
    });
};
