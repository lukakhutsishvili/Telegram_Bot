import React, { useState } from "react";
import { registerBot } from "../services/api";

const RegisterBot = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const data = await registerBot(phone);
      setMessage(`Bot registered: ${data.status}`);
    } catch (error) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div>
      <h1>Register Bot</h1>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterBot;
