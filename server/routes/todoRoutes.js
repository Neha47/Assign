import * as todoController from '../controllers/todoControllers.js';
import express from 'express';

export const todoRouter = express.Router();

todoRouter.get('/ask', todoController.getTodos);
todoRouter.post('/add', todoController.addTodo);
todoRouter.delete('/:id', todoController.deleteTodo);
todoRouter.put('/:id', todoController.updateTodo);
