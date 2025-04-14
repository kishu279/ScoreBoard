import { useEffect, useState } from "react";
import { socket } from "../../../config";

export default function LivePage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [data, setData] = useState();

  useEffect(() => {
    // connection
    function onConnection() {
      console.log("Connected");
    }

    function onDisconnected() {
      console.log("Disconnected");
    }

    // event
    function matchDetails(value) {
      console.log(value);
      setData(value);
    }

    socket.on("connect", onConnection);
    socket.on("disconnect", onDisconnected);
    socket.on("match-now", matchDetails);

    return () => {
      socket.off("connect", onConnection);
      socket.off("disconnect", onDisconnected);
      socket.off("match-now", matchDetails);
    };
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      {/* Header */}
      <div className="text-center text-4xl font-bold mb-8">
        <h1 className="bg-[var(--primary)] text-[var(--primary-foreground)] inline-block px-6 py-3 rounded-lg shadow-md">
          Today's Live Match
        </h1>
      </div>

      {/* Match Details */}
      <div className="max-w-4xl mx-auto bg-[var(--card)] text-[var(--card-foreground)] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {data?.tournamentName || "Loading..."}
        </h2>
        <p className="text-lg text-center mb-6">
          {data?.matchname || "Match details will appear here"}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Innings
            </span>
            <span className="text-xl font-bold">{data?.inn || "-"}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Score
            </span>
            <span className="text-xl font-bold">{data?.score || "-"}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Over
            </span>
            <span className="text-xl font-bold">{data?.over || "-"}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Batsman
            </span>
            <span className="text-xl font-bold">{data?.batsman || "-"}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Bowler
            </span>
            <span className="text-xl font-bold">{data?.bowler || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
