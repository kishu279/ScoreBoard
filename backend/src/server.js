import express from "express";
import cors from "cors";

import db from "./db.js";

const App = express();
const port = 3000;

App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cors());

App.get("/", (req, res) => {
    res.render("index.ejs");
});

App.post("/getMatchName", (req, res) => {
    const { matchName } = req.body;
    console.log(matchName);

    let query = "SELECT * FROM Matches WHERE Name LIKE (?)";

    db.query(query, [`%${matchName}%`], (err, resultSet) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(resultSet);
    });

    // return res.json({ result: resultSet });

    res.redirect("/");

    
});

App.post("/getMatchDetails", (req, res) => {
    const dataRecevied = {
        MatchId: 7,
        Tournament: 2,
        Team1: 5,
        Team2: 6,
        Result: "Rajasthan Won",
        Name: "Dc vs RR"
    };

    let result = [];

    let query = `SELECT 
                m.Name AS MatchName,
                m.Result,
                t.Name AS TournamentName,
                te1.Name AS Team1Name,
                te2.Name AS Team2Name
                FROM Matches m
                INNER JOIN Tournament t ON m.TournamentId = t.TournamentId
                INNER JOIN Team te1 ON m.Team1 = te1.TeamId
                INNER JOIN Team te2 ON m.Team2 = te2.TeamId
                WHERE m.MatchId = ?;`;

    let query1 = `SELECT
                p.Fname,
                p.Lname,
                p.Country,
                p.Role,
                t.Name AS TeamName
                FROM Player p
                INNER JOIN Team t ON p.TeamId = t.TeamId
                WHERE t.TeamId IN (?, ?);`;

    db.query(query, [dataRecevied.MatchId], (err, resultSet1) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send("Error fetching match details");
        }

        result.push({ matchDetails: resultSet1 });

        db.query(query1, [dataRecevied.Team1, dataRecevied.Team2], (err, resultSet2) => {
            if (err) {
                console.log(err.message);
                return res.status(500).send("Error fetching player details");
            }

            result.push({ players: resultSet2 });

            console.log(result);

            // res.json(result);
        });
    });
});

App.listen(port, () => {
    console.log(`Server Started at port ${port}`);
    console.log(`http://localhost:${port}/`);
});