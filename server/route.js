import express from "express";
import { db } from "./app.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

import dotenv from 'dotenv';

dotenv.config();

export const router = express.Router();


export const signupSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});


// LOGIN Route
router.post('/login', async (req, res) => {

    const validatedData = loginSchema.parse(req.body);
    const {email, password } = validatedData;
   
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = results[0];

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: "3h",
            });
            console.log(token);
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ message: "Error during password verification" });
        }
    });
});

// SIGNUP Route
router.post('/signup', async (req, res) => {

    const validatedData = signupSchema.parse(req.body);
    const { username, email, password } = validatedData;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length > 0) return res.status(400).json({ message: "User already exists" });

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [username, email, hashedPassword],
                (err, result) => {
                    if (err) return res.status(500).json({ message: "Error creating user" });
                    res.status(201).json({ message: "User registered successfully" });
                }
            );
        } catch (error) {
            res.status(500).json({ message: "Error hashing password" });
        }
    });
});












































