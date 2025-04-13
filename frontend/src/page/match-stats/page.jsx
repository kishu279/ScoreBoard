import { Suspense, useEffect, useState } from "react";
import { matchStats } from "./matches";
import { useSearchParams } from "react-router";

function fetchMatchDetails(matchId) {
  console.log("Inside fetchMatchdetails");
  let matchFound = {};

  matchStats.map((match) => {
    if (match.matchId == matchId) {
      matchFound = match.stats;
    }
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matchFound);
    }, 2000);
  });
}

export default function MatchStats() {
  const [searchParams] = useSearchParams();
  const [matchId, setMatchId] = useState();
  const [matchDetails, setMatchDetails] = useState({});

  useEffect(() => {
    const mid = searchParams.get("matchId");
    setMatchId(mid);
  }, [searchParams]);

  async function fetchData() {
    if (matchId > 0) {
      const response = await fetchMatchDetails(matchId);
      console.log("Response: ", response);
      setMatchDetails(response);
    }
  }

  useEffect(() => {
    fetchData();
  }, [matchId]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="bg-[var(--primary)] text-[var(--primary-foreground)] py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">Match Stats</h1>
      </header>

      {/* Content */}
      <div className="container mx-auto mt-10 px-4">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Stats matchDetails={matchDetails} />
        </Suspense>
      </div>
    </div>
  );
}

function Stats({ matchDetails }) {
  return (
    <div>
      {/* Tournament Name */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">
          {matchDetails?.matchDetails?.tournamentName}
        </h2>
        <p className="text-xl text-[var(--muted-foreground)] mt-2">
          {matchDetails?.matchDetails?.team1Name} vs{" "}
          {matchDetails?.matchDetails?.team2Name}
        </p>
      </div>

      {/* Teams and Players */}
      <div className="flex justify-center gap-16">
        {/* Team 1 */}
        <div className="w-1/3 bg-[var(--foreground)] text-[var(--primary-foreground)] shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-[var(--accent)] mb-4">
            {matchDetails?.matchDetails?.team1Name}
          </h3>
          <ul className="space-y-2">
            {matchDetails?.team1?.map((player) => (
              <li
                key={player?.firstName}
                className="p-3 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-lg shadow-sm"
              >
                <p className="font-bold">{player?.playerName}</p>
                <p className="text-sm">{player?.role}</p>
                <p className="text-sm">
                  Runs: {player?.runs || 0}, Wickets: {player?.wicket || 0}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Team 2 */}
        <div className="w-1/3 bg-[var(--foreground)] text-[var(--primary-foreground)] shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-[var(--accent)] mb-4">
            {matchDetails?.matchDetails?.team2Name}
          </h3>
          <ul className="space-y-2">
            {matchDetails?.team2?.map((player) => (
              <li
                key={player?.firstName}
                className="p-3 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-lg shadow-sm"
              >
                <p className="font-bold">{player?.playerName}</p>
                <p className="text-sm">{player?.role}</p>
                <p className="text-sm">
                  Runs: {player?.runs || 0}, Wickets: {player?.wicket || 0}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
