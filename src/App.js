import React from "react";
import Main from "./components/Main";
import { AuthProvider } from "./contexts/AuthContext";
import "./firebase";

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
