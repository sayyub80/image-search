import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <main className="container max-w-7xl mx-auto mt-8 px-4">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* --- Protected Routes --- */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </main>
      <Toaster richColors />
    </>
  );
}

export default App;
