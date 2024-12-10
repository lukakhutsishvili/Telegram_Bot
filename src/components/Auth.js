import React, { useState } from "react";
import axios from "axios";

const Auth = ({ setStep, setTelegramId }) => {
  const [telegramIdInput, setTelegramIdInput] = useState("");

  const handleAuth = async () => {
    try {
      const response = await axios.post("/auth", {
        telegram_id: telegramIdInput,
      });
      setTelegramId(telegramIdInput);
      alert("User authenticated successfully.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User not found. Proceed to phone input.");
        setTelegramId(telegramIdInput);
        setStep("phone");
      } else {
        alert("Authentication failed.");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Telegram ID"
        value={telegramIdInput}
        onChange={(e) => setTelegramIdInput(e.target.value)}
      />
      <button onClick={handleAuth}>Authenticate</button>
    </div>
  );
};

export default Auth;
