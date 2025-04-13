import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function LivePage() {
  return (
    <>
      <div>Live Page</div>
    </>
  );
}
