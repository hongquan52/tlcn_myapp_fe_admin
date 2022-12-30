import React from "react";
import ReactDOM from "react-dom";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { DataProvider } from "./contexts/DataProvider";


ReactDOM.render(
  
  <DataProvider>
    <React.StrictMode>
    
      <ContextProvider>
        <App />
      </ContextProvider>{" "}
      
    </React.StrictMode>{" "}
  </DataProvider>
  ,
  document.getElementById("root")
);
