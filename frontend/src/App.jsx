import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
