import { useState } from "react";

export default function AdminLogin({ setIsConnected }) {
  const [adminId, setAdminId] = useState("");

  return (
    <>
      <div className="border ">
        Admin Details
        <input
          type="text"
          placeholder="Credentials"
          value={adminId}
          onChange={(e) => {
            setAdminId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            socket.emit("verify", { adminId: adminId }, (response) => {
              if (!response.status) {
                alert("Incorrect Credentials");
                console.log("Incorrect Credentials");
              } else {
                alert("Admin Verified");
                setIsConnected(true);
              }
            });
          }}
        >
          verify
        </button>
      </div>
    </>
  );
}
