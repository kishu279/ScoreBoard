import { useState } from "react";
import { socket } from "../../../config";

export default function ControlPanel({ matchDetails }) {
  const [score, setScore] = useState("");
  const [bowler, setBowler] = useState("");
  const [batsman, setBatsMan] = useState("");
  const [balls, setBalls] = useState(0);
  const [inn, setInn] = useState("1");

  function sendData() {
    setBalls(balls + 1);
    const data = {
      tournamentName: matchDetails.tournamentName,
      matchname: matchDetails.matchName,
      inn: inn,
      score: score,
      over: Math.floor(balls / 6) + "." + (balls % 6),
      batsman: batsman,
      bowler: bowler,
    };

    console.log(data);
    socket.emit("match-now", data);
  }

  return (
    <div className="p-6 bg-[var(--card)] text-[var(--card-foreground)] rounded-lg shadow-lg">
      {/* Match Details */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {matchDetails.tournamentName}
        </h2>
        <p className="text-lg">{matchDetails.matchName}</p>
      </div>

      {/* Innings Selection */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold">Innings {`${inn}`}</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="Innings1"
              name="Innings"
              value={"1"}
              onChange={(e) => setInn(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="Innings1"
              className="cursor-pointer px-4 py-2 border border-[var(--muted-foreground)] rounded-lg peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)] transition"
            >
              First Inning
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="Innings2"
              name="Innings"
              value={"2"}
              onChange={(e) => setInn(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="Innings2"
              className="cursor-pointer px-4 py-2 border border-[var(--muted-foreground)] rounded-lg peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)] transition"
            >
              Second Inning
            </label>
          </div>
        </div>
      </div>

      {/* Select Runs */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold">Select Runs {`${score}`}</h3>
        <div className="flex gap-6">
          {["0", "1", "2", "4", "6", "Wicket"].map((run) => (
            <div key={run} className="flex items-center gap-2">
              <input
                type="radio"
                id={`Run${run}`}
                name="Runs"
                value={run}
                onChange={(e) => setScore(e.target.value)}
                className="hidden peer"
              />
              <label
                htmlFor={`Run${run}`}
                className="cursor-pointer px-4 py-2 border border-[var(--muted-foreground)] rounded-lg peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)] transition"
              >
                {run === "Wicket" ? "Wicket" : run}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Batsman Selection */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold">Select Batsman {`${batsman}`}</h3>
        <div className="flex gap-6 flex-wrap justify-center">
          {matchDetails.players[`team${inn == 1 ? "A" : "B"}`]?.map(
            (player) => {
              if (
                player.role.toLowerCase() === "batsman" ||
                player.role.toLowerCase() === "all-rounder"
              ) {
                return (
                  <div
                    key={player.playerName}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      id={`Batsman${player.playerName}`}
                      name="Batsman"
                      value={player.playerName}
                      onChange={(e) => setBatsMan(e.target.value)}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={`Batsman${player.playerName}`}
                      className="cursor-pointer px-4 py-2 border border-[var(--muted-foreground)] rounded-lg peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)] transition"
                    >
                      {player.playerName}
                    </label>
                  </div>
                );
              }
              return null;
            }
          )}
        </div>
      </div>

      {/* Bowler */}

      <div className="flex flex-col items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold">Select Bowler {`${bowler}`}</h3>
        <div className="flex gap-6 flex-wrap justify-center">
          {matchDetails.players[`team${inn == 1 ? "B" : "A"}`]?.map(
            (player) => {
              if (
                player.role.toLowerCase() === "bowler" ||
                player.role.toLowerCase() === "all-rounder"
              ) {
                return (
                  <div
                    key={player.playerName}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      id={`Bowler${player.playerName}`}
                      name="Bowler"
                      value={player.playerName}
                      onChange={(e) => setBatsMan(e.target.value)}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={`Bowler${player.playerName}`}
                      className="cursor-pointer px-4 py-2 border border-[var(--muted-foreground)] rounded-lg peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)] transition"
                    >
                      {player.playerName}
                    </label>
                  </div>
                );
              }
              return null;
            }
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={sendData}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2 rounded-lg shadow-md hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
