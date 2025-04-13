import { useEffect, useState } from "react";
import { AdminLogin } from "./adminLogin";
import { socket } from "../../../config";
import ControlPanel from "./controlPanel";

export default function AdminPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentMatchDetails, setCurrentMatchDetails] = useState({});

  useEffect(() => {
    function onConnection() {
      console.log("Connected");
    }

    function onDisconnected() {
      console.log("Disconnected");
    }

    function currentMatch(value) {
      setCurrentMatchDetails(value);
      console.log(value);
    }

    socket.on("connect", onConnection);
    socket.on("disconnect", onDisconnected);
    socket.on("match-details", currentMatch);

    return () => {
      socket.off("connect", onConnection);
      socket.off("disconnect", onDisconnected);
      socket.off("match-details", currentMatch);
    };
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="bg-[var(--primary)] text-[var(--primary-foreground)] py-4 px-6 shadow-md">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
            <AdminLogin setIsConnected={setIsConnected} />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Control Panel</h2>
            <ControlPanel matchDetails={currentMatchDetails} />
          </div>
        )}
      </main>
    </div>
  );
}
