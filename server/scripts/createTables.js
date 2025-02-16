import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// SQL queries to create tables if they don’t exist
const createTodosTable = `
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    users_id INT NOT NULL,
    task VARCHAR(255) NOT NULL,
    status TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);`; // ON DELETE CASCADE ensures that when a user is deleted, all their tasks are also deleted

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)`;

// Function to execute queries
const createTables = () => {
    db.connect((err) => {
        if (err) {
            console.error("Database Connection Failed:", err);
            return;
        }
        console.log("Connected to MySQL ✅");

        db.query(createUsersTable, (err) => {
            if (err) console.error("Error creating Users table:", err);
            else console.log("Users table is ready ✅");
        });

        db.query(createTodosTable, (err) => {
            if (err) console.error("Error creating Todos table:", err);
            else console.log("Todos table is ready ✅");
        });

        db.end(); // Close connection after execution
    });
};

// Run table creation
createTables();