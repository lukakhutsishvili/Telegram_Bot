import React, { useEffect, useState } from "react";
import { authenticateBot, registerBot } from "./apiClient";

const App = () => {
  const [telegramID, setTelegramID] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [phone, setPhone] = useState("");

  // Initialize Telegram Web App
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Expands the WebApp to full screen
    const userID = tg.initDataUnsafe?.user?.id;
    setTelegramID(userID);
  }, []);

  const handleSignIn = async () => {
    if (!telegramID) {
      setAuthStatus("Telegram user data not available.");
      return;
    }
    try {
      const data = await authenticateBot();
      setAuthStatus(`Authentication Successful: ${JSON.stringify(data)}`);
      console.log(authStatus);
    } catch (error) {
      setAuthStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <h1>Telegram Web App</h1>
      <div>
        <h2>Welcome</h2>
        <p>Username</p>
      </div>
      <div>
        <h2>Sign In</h2>
        <button onClick={handleSignIn}>Sign In with Telegram</button>
        {authStatus && <p>{authStatus}</p>}
      </div>
      <div>
        <h2>Register Bot</h2>
        <label>
          Phone Number:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <button>Register</button>
        {registerStatus && <p>{registerStatus}</p>}
      </div>
    </div>
  );
};

export default App;
