import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready(); // Initialize Telegram Web App
    console.log("Telegram user:", tg.initDataUnsafe.user);
  }, []);

  return (
    <div>
      <h1>Welcome to Telegram Web App</h1>
      {/* Include Auth and RegisterBot Components */}
    </div>
  );
};

export default App;
