import React, { useEffect, useState } from "react";
import { authenticateBot, getOrder } from "./apiClient";

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
    console.log(userID);
  }, []);

  const handleSignIn = async () => {
    try {
      const data = await authenticateBot();
      setAuthStatus(`Authentication Successful`);
    } catch (error) {
      setAuthStatus(`Error signing in`);
    }
  };

  const handleRegistering = async () => {
    try {
      const response = await getOrder();
      console.log(response);
      setRegisterStatus("Order retrieved successfully");
      return response;
    } catch (error) {
      setRegisterStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Telegram Web App
        </h1>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Welcome</h2>
          <p className="text-sm text-gray-500">
            Telegram User ID: {telegramID ? telegramID : "Not available"}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Sign In</h2>
          <button
            onClick={handleSignIn}
            className="mt-2 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In with Telegram
          </button>
          {authStatus && (
            <p className="mt-2 text-sm text-gray-500">{authStatus}</p>
          )}
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Register Bot</h2>
          <div className="mt-2">
            <label className="block text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            onClick={handleRegistering}
            className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
          {registerStatus && (
            <p className="mt-2 text-sm text-gray-500">{registerStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
