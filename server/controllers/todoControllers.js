import Todo from "../models/todoModel.js";
import mongoose from "mongoose";

export const getTodos = async (req, res) => {
  console.log("Asked for todos");
  try {
    const todos = await Todo.find({ user_id: req.id });
    console.log("asking for todos");
    res.json(todos);
  } catch (err) {
    console.log("todo nhi mila");
    res.status(500).json({ error: err.message });
  }
};

export const addTodo = async (req, res) => {
  const { title } = req.body;
  console.log(title);
  try {
    const newTodo = new Todo({
      user_id: req.id,
      task: title,
    });
    console.log(newTodo);
    console.log("adding todo");
    const savedTodo = await newTodo.save(); // save to db
    console.log("added todo to db");
    res.json({ id: savedTodo._id, title: savedTodo.task });
  } catch (err) {
    console.log(err);
    console.log("nhi ho paya add todo");
    res.status(500).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await Todo.findByIdAndDelete(id);
    console.log("deleted todo");
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.log("nhi ho paya delete todo");
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      console.log("Todo not found");
      return res.status(404).json({ error: "Todo not found" });
    }
    console.log(todo);
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: { status: !todo.status } },
      { new: true } // returns the updated document
    );
    console.log(updatedTodo);
    
    //await Todo.updateOne({ _id: id }, { $set: { status: !todo.status } });
    console.log(todo.status);
    //todo.status = !todo.status;
    console.log("status updated");
    //await todo.save();
    console.log("updated todo");
    res.json({ message: "Task updated", todo: updatedTodo });
  } catch (err) {
    console.log("todo update nhi kr paye");
    res.status(500).json({ error: err.message });
  }
};













































































































// -------------------------------------------------------------------------------------------------------------------------------------------------------

                                                    // MYSQL DB QUERY

// --------------------------------------------------------------------------------------------------------------------------------------------------------


// import { db } from "../app.js";

// export const getTodos = (req, res) => {
//     console.log("asked for todos");
//     db.query('SELECT * FROM tasks WHERE users_id = ?', [req.id], (err, results) => {
//         if (err) return res.status(500).json(err);
//         return res.json(results);
//     });
// };

// export const addTodo = (req, res) => {
//     const { title } = req.body;
//     console.log(title);
//     db.query('INSERT INTO tasks (users_id, task) VALUES (?, ?)', [req.id, title], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ id: result.insertId, title });
//     });
// };

// export const deleteTodo = (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: 'Deleted successfully' });
//     });
// };

// export const updateTodo = (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     //  "UPDATE tasks SET status = ? WHERE id = ?";
//     const sql = 'UPDATE tasks SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = ?';
//     db.query(sql, [id], (err, result) => {
//         if (err) throw err;
//         res.send("Task Updated");
//     });
// };
