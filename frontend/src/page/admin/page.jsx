import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AdminLogin from "./adminLogin";

const socket = io("http://localhost:3000");

export default function AdminPage() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnection() {
      console.log("Connected");
    }

    function onDisconnected() {
      console.log("Disconnected");
    }

    socket.on("connect", onConnection);
    socket.on("disconnect", onDisconnected);

    return () => {
      socket.off("connect", onConnection);
      socket.off("disconnect", onDisconnected);
    };
  }, []);

  return (
    <>
      <div className="border h-20 flex justify-between">
        <p className="text-3xl p-5">Admin Panel</p>
      </div>

      {!isConnected && <AdminLogin setIsConnected={setIsConnected} />}

      {isConnected && <></>}
    </>
  );
}
