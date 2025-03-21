import React, { useState, useEffect } from "react";
import "./App.css";

const goalAmount: number = 2500;

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      setBalance(parseInt(savedBalance, 10));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  const updateBalance = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const calculateProgress = () => {
    return Math.min(Math.round((balance / goalAmount) * 100), 100); // Round up percentage and limit to 100
  };

  return (
    <div className="container">
      <h1>Garmin Forerunner 965</h1>

      {/* Dark Mode Button */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
      </button>

      <div className="goal">
        <p>
          Goal: <span>{goalAmount} PLN</span>
        </p>
        <p>
          Raised: <span>{balance} PLN</span>
        </p>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${calculateProgress()}%`,
              transition: "width 0.5s ease-in-out", // Smooth fluid transition for the progress bar
            }}
          ></div>
        </div>

        <p>{calculateProgress()}% completed</p>
      </div>

      {/* Good Habits Section */}
      <div className="habits good-habits">
        <h2 className="habit-title">Good Habits (+10 PLN)</h2>
        <div className="habit-buttons">
          <button
            onClick={() => updateBalance(10)}
            className="habit-btn good-habit"
          >
            <i className="fas fa-sun"></i> Waking up on time
          </button>
          <button
            onClick={() => updateBalance(10)}
            className="habit-btn good-habit"
          >
            <i className="fas fa-running"></i> Training
          </button>
          <button
            onClick={() => updateBalance(10)}
            className="habit-btn good-habit"
          >
            <i className="fas fa-book"></i> Reading
          </button>
          <button
            onClick={() => updateBalance(10)}
            className="habit-btn good-habit"
          >
            <i className="fas fa-graduation-cap"></i> Learning
          </button>
        </div>
      </div>

      {/* Bad Habits Section */}
      <div className="habits bad-habits">
        <h2 className="habit-title">Bad Habits (-20 PLN)</h2>
        <div className="habit-buttons">
          <button
            onClick={() => updateBalance(-20)}
            className="habit-btn bad-habit"
          >
            <i className="fas fa-bed"></i> Waking up too late
          </button>
          <button
            onClick={() => updateBalance(-20)}
            className="habit-btn bad-habit"
          >
            <i className="fas fa-hamburger"></i> Fastfood
          </button>
          <button
            onClick={() => updateBalance(-20)}
            className="habit-btn bad-habit"
          >
            <i className="fas fa-share-alt"></i> Social Media
          </button>
          <button
            onClick={() => updateBalance(-20)}
            className="habit-btn bad-habit"
          >
            <i className="fas fa-times-circle"></i> Missing goals
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
