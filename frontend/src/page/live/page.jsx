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
    <div>
      <div>Today's Live Match</div>

      <div className="border">{data}</div>
    </div>
  );
}
