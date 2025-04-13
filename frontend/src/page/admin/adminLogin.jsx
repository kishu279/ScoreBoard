import { useState } from "react";
import { socket } from "../../../config";

export function AdminLogin({ setIsConnected }) {
  const [credentials, setCredentials] = useState("");

  const handleLogin = () => {
    if (credentials.trim() === "") {
      alert("Please enter valid credentials.");
      return;
    }

    socket.emit("admin-login", { adminId: credentials }, (response) => {
      if (response.status) {
        setIsConnected(true);
        alert("Login successful!");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  };

  return (
    <div className="bg-[var(--card)] text-[var(--card-foreground)] p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-semibold mb-4">Enter Admin Credentials</h3>
      <input
        type="password"
        placeholder="Enter Credentials"
        value={credentials}
        onChange={(e) => setCredentials(e.target.value)}
        className="w-full border border-[var(--muted-foreground)] rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg shadow-md hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition"
      >
        Login
      </button>
    </div>
  );
}
