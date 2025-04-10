import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        console.log(`Error Connecting to Database: ${err.stack}`);
        return;
    }
    console.log(`Connected to Database: ${db.threadId}`);
});

export default db;