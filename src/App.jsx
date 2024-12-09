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
      const response = await axios.post("/api/check-telegram-id", {
        telegramId: id,
      });
      if (!response.data.exists) {
        setMessage("Success! Your Telegram ID is already registered.");
      } else {
        setIsPhoneFieldVisible(true);
      }
    } catch (error) {
      console.error("Error checking Telegram ID:", error);
      setMessage("An error occurred while checking your Telegram ID.");
    }
  };

  const handlePhoneNumberSubmit = async () => {
    if (!inputNumber) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await axios.post("/api/register-phone-number", {
        telegramId,
        phoneNumber: inputNumber,
      });

      if (response.data.success) {
        setMessage("Your phone number has been successfully registered!");
        setIsPhoneFieldVisible(false);
      } else {
        setMessage("Failed to register your phone number. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting phone number:", error);
      setMessage("An error occurred while submitting your phone number.");
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
