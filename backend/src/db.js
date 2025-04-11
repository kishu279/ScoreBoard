import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// pool.connect((err) => {
//     if (err) {
//         console.log(`Error Connecting to Database: ${err.stack}`);
//         return;
//     }
//     console.log(`Connected to Database: ${db.threadId}`);
// });

export default pool;