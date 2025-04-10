import express from "express";

const App = express();
const port = 3000;

App.listen(port, () => {
    console.log(`Server Started at port ${port}`);
    console.log(`http://localhost:${port}/`);
});