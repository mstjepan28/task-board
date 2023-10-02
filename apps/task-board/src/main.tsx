import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const getApp = () => {
  const strictModeEnabled = false;
  if (strictModeEnabled) {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  return <App />;
};

createRoot(document.getElementById("root") as HTMLElement).render(getApp());
