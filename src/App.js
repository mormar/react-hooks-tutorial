import React, { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("dark");

  const toDark = () => setMode("dark");
  const toLight = () => setMode("light");

  return (
    <div className={`App ${mode === "dark" ? "dark" : "light"}`}>
      <header className={`App-header`}>
        <h1>React Hooks Tutorial</h1>
        {mode === "dark" ? (
          <button className="btn-dark" onClick={toLight}>
            Light
          </button>
        ) : (
          <button className="btn-ligth" onClick={toDark}>
            Dark
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
