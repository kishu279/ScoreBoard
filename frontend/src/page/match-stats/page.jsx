import { Suspense, useEffect, useState } from "react";
import { matchStats } from "./matches";
import { useSearchParams } from "react-router";

function fetchMatchDetails(matchId) {
  // fetch according to the match id
  console.log("Inside fetchMatchdetails");
  var matchFound = {};

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

  // FetchFunction
  async function fetchData() {
    if (matchId > 0) {
      // fetch to the api
      const response = await fetchMatchDetails(matchId);
      console.log("Response: ", response);
      setMatchDetails(response);
    }
  }

  useEffect(() => {
    fetchData();
  }, [matchId]);

  return (
    <>
      <div>
        <p className="text-4xl display place-content-center flex">
          Match Stats
        </p>
        <Suspense fallback={<div>Loading ...</div>}>
          <Stats matchDetails={matchDetails} />
        </Suspense>
      </div>
    </>
  );
}

function Stats({ matchDetails }) {
  const [selectPid, setSelectPid] = useState("");
  return (
    <div>
      <div className="h-[80px]">
        <p className="text-4xl display place-content-center flex">
          {matchDetails?.matchDetails?.tournamentName}
        </p>
      </div>
      <div className="display flex justify-center text-3xl gap-20 font-sans">
        <p>{matchDetails?.matchDetails?.team1Name}</p>
        <p>VS</p>
        <p>{matchDetails?.matchDetails?.team2Name}</p>
      </div>

      <div className=" flex display justify-center gap-[100px] mt-[50px]">
        <div className=" w-[300px] text-2xl display flex-col place-items-center ">
          {matchDetails?.team1?.map((player) => (
            <div className="p-3" key={player?.firstName}>
              {player?.firstName}
            </div>
          ))}
        </div>
        <div className=" w-[300px] text-2xl display flex-col place-items-center">
          {matchDetails?.team2?.map((player) => (
            <div className="p-3" key={player?.firstName}>
              {player?.firstName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
