import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [telegramId, setTelegramId] = useState(null);
  const [inputNumber, setInputNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isPhoneFieldVisible, setIsPhoneFieldVisible] = useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    tg.ready(); // Initialize Telegram Web App
    const user = tg.initDataUnsafe?.user;

    if (user?.id) {
      setTelegramId(user.id); // Store the Telegram user ID
      console.log("Telegram user ID:", user.id);
      // Check Telegram ID in the database
      checkTelegramId(user.id);
    } else {
      console.warn("Telegram user ID not available");
    }

    setIsReady(true); // Trigger rendering after initialization
  }, []);

  const checkTelegramId = async (id) => {
    try {
      const response = await axios.post(
        "https://your-backend-url.com/check-telegram-id",
        { telegramId: id }
      );
      if (response.data.exists) {
        setIsPhoneFieldVisible(true); // Show phone number input field if ID is found
        setMessage("Telegram ID verified. Please enter your phone number.");
      } else {
        setMessage("Telegram ID not found. Please contact support.");
      }
    } catch (error) {
      console.error("Error checking Telegram ID:", error);
      setMessage("Error verifying Telegram ID. Please try again.");
    }
  };

  const handlePhoneNumberSubmit = async () => {
    try {
      const response = await axios.post(
        "https://your-backend-url.com/verify-phone-number",
        {
          phoneNumber: inputNumber,
          telegramId,
        }
      );
      if (response.data.success) {
        setMessage("Verification code sent to your phone number!");
      } else {
        setMessage("Phone number not found. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying phone number:", error);
      setMessage("Error sending verification code. Please try again.");
    }
  };

  if (!isReady) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      <h1>Welcome to Telegram Web App</h1>
      <h2>Your Telegram ID: {telegramId || "Unavailable"}</h2>
      {message && <p>{message}</p>}
      {isPhoneFieldVisible && (
        <>
          <h2>Enter Your Phone Number:</h2>
          <input
            type="text"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
          <button onClick={handlePhoneNumberSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default App;
