import React, { useEffect, useState } from "react";
import { handleSignIn } from "./api/handlers";

const App = () => {
  const [telegramID, setTelegramID] = useState(6087086146);
  const [authStatus, setAuthStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Initialize Telegram Web App
  useEffect(() => {
    try {
      // Check if Telegram WebApp API is available
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;

        // Initialize the Telegram Web App
        tg.ready();

        // Fetch user data
        const userData = tg.initDataUnsafe?.user;
        if (userData && userData.id) {
          // setTelegramID(userData.id); // Set Telegram ID
        } else {
          setError("Unable to fetch Telegram user data.");
        }
      } else {
        setError("Telegram WebApp API is not available.");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  }, []);


  return (
    <div className="app-container">
      <h1>Telegram Web App</h1>
      <div>
        <h2>Welcome</h2>
        <p>Username</p>
      </div>
      <div>
        <h2>Sign In</h2>
        <button onClick={() => handleSignIn(telegramID)}>
          Sign In with Telegram
        </button>
        {authStatus && <p>succesfully </p>}
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
