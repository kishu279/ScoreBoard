import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { liveMatch } from "./data.js";

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: { origin: "http://localhost:5173" },
});

app.use(express.json());

http.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// HTTP Routes
app.get("/", (req, res) => {
  res.send("<h1>Hii from Server</h1>");
});

const admin = { credentials: "abcd" };
const MatchScores = { inning1: 0, inning2: 0 };

// Socket Connection
io.on("connection", (socket) => {
  // User connected
  console.log("a user connected: ", socket.id);

  // User Disconnected
  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("match-now", (value) => {
    // operations
    const num = Number(value.score);
    if (value.inn == 1) {
      MatchScores.inning1 += num;
      value.totalScore = MatchScores.inning1;
    } else {
      MatchScores.inning2 += num;
      value.totalScore = MatchScores.inning2;
    }

    console.log(MatchScores);

    // console.log(value);
    socket.broadcast.emit("match-now", value);
  });

  socket.on("admin-login", (value, cb) => {
    if (value.adminId === admin.credentials) {
      socket.emit("match-details", liveMatch);
      cb({
        status: true,
      });
    }
  });
});
