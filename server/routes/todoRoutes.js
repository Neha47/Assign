import * as todoController from '../controllers/todoControllers.js';
import express from 'express';

export const todoRouter = express.Router();

// GET TODOS Route
todoRouter.get('/ask', todoController.getTodos);
// ADD TODO Route
todoRouter.post('/add', todoController.addTodo);
// DELETE TODO Route
todoRouter.delete('/:id', todoController.deleteTodo);
// UPDATE TODO Route
todoRouter.put('/:id', todoController.updateTodo);
