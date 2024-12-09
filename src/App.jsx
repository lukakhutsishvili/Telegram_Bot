import React, { useEffect, useState } from "react";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    tg.ready(); // Initialize Telegram Web App
    console.log("Telegram user:", tg.initDataUnsafe?.user);

    setIsReady(true); // Trigger rendering after initialization
  }, []);

  if (!isReady) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      <h1>Welcome to Telegram Web App</h1>
    </div>
  );
};

export default App;
