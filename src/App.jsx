import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth_service";
import { login, logout } from "./store/authslice";
import { Outlet } from "react-router-dom";
import { HeaderComponent, Footer } from "./components";
import "./App.css";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-(--paper) text-(--ink)">
      <div className="min-h-screen flex flex-col">
        <HeaderComponent />

        <main className="flex-1 w-full">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
