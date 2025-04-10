import express from "express";

import db from "./db.js";

const App = express();
const port = 3000;

App.get("/", (req, res) => {
    const result = db.execute("SHOW TABLES;");
    console.log(result);
});

// /getPlayerInfo

App.listen(port, () => {
    console.log(`Server Started at port ${port}`);
    console.log(`http://localhost:${port}/`);
});