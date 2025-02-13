import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'; 

export const app = express();

app.use(cors({
    origin:"*",
    credentials: true
}))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

import {middleware} from './middlewares/authMiddleware.js';
import {todoRouter} from './routes/todoRoutes.js';
app.use('/todos', middleware, todoRouter);

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  
  db.connect((err) => {
    if (err) {
      console.error("Database Connection Failed:", err);
    } else {
      console.log("Connected to MySQL Database ✅");
    }
  });


import {router} from './routes/userRoutes.js'; 
app.use("/u", router);