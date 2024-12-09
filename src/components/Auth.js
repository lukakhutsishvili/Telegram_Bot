import React, { useState } from "react";
import { authenticateBot } from "../services/api";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    try {
      const data = await authenticateBot(username, password);
      setMessage(`Authenticated: ${data.status}`);
    } catch (error) {
      setMessage("Authentication failed.");
    }
  };

  return (
    <div>
      <h1>Authenticate Bot</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>Authenticate</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
