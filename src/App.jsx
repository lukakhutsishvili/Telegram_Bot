import React, { useEffect, useState } from "react";
import { handleSignIn } from "./api/handlers";

const App = () => {
  const [telegramID, setTelegramID] = useState(6087086146);
  const [authStatus, setAuthStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");


   const handleSignIn = async (telegramID) => {
    try {
      console.log(telegramID);
      if (telegramID) {
        const response = await getRequest("/bot/auth", { telegramID });
        console.log(response);
      }
    } catch (error) {
      setError(error.message)
      console.log(`Error: ${error.message}`);
    }
  };
  

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
        //   setError("Unable to fetch Telegram user data.");
         }
      } else {
        // setError("Telegram WebApp API is not available.");
      }
    } catch (err) {
      // setError(`Error: ${err.message}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Telegram Web App
        </h1>
        {error && (
          <p className="text-sm text-red-500 bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Welcome</h2>
          <p className="text-gray-600">Your Telegram Username</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Sign In</h2>
          <button
            onClick={() => handleSignIn(telegramID)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            Sign In with Telegram
          </button>
          {authStatus && (
            <p className="text-green-500 text-sm mt-2">
              Successfully signed in!
            </p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Register Bot
          </h2>
          <label className="block text-gray-600 text-sm mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full">
            Register
          </button>
          {registerStatus && (
            <p className="text-green-500 text-sm mt-2">{registerStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
