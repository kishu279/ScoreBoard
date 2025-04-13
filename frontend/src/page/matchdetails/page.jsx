import { useState } from "react";

import { useNavigate } from "react-router";
import { fakeData } from "../match-stats/matches";

function fetchMatchId(matchName) {
  const normalizedMatchName = matchName.toLowerCase().replace(/\s+/g, ""); // Normalize input
  const matches = [];

  fakeData.map((match) => {
    const normalizedMatch = match.matchName.toLowerCase().replace(/\s+/g, ""); // Normalize match name
    if (normalizedMatch.includes(normalizedMatchName)) {
      matches.push(match);
    }
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matches); // Resolve the promise with the matches
    }, 1000); // Simulate a 2-second delay
  });
}

export default function MatchDetailsPage() {
  const [matchName, setMatchName] = useState("");
  const [matchDetails, setMatchDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  async function getMatchId() {
    try {
      if (matchName.length === 0) {
        alert("match name should not be empty string");
        return;
      }
      setLoading(true);
      const response = await fetchMatchId(matchName);
      setMatchDetails(response);
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-4xl font-bold text-center">Find Matches</h1>
      </div>

      {/* Search Section */}
      <div className="flex flex-col items-center mt-10">
        <div className="flex gap-4">
          <input
            className="border border-gray-300 rounded-full px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Match Name"
            type="text"
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
            onClick={getMatchId}
          >
            Search
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-10 flex flex-col items-center">
        {loading ? (
          <p className="text-lg text-gray-500">Loading...</p>
        ) : matchDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 ">
            {matchDetails.map((match) => (
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
                key={match.matchId}
                onClick={() => {
                  // redirect to the page
                  navigation(`/match-stats?matchId=${match.matchId}`);
                }}
              >
                <h2 className="text-xl font-semibold text-blue-600">
                  {match.matchName}
                </h2>
                <p className="text-gray-700 mt-2">
                  <strong>Tournament:</strong> {match.tournamentName}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Result:</strong> {match.result}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500">No matches found.</p>
        )}
      </div>
    </div>
  );
}
