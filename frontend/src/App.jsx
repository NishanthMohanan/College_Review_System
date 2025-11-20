import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CollegePage from "./pages/CollegePage";
import AuthPage from "./pages/AuthPage";
import CollegeList from "./components/CollegeList";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/colleges"
        element={
          <ProtectedRoute>
            <CollegeList />
          </ProtectedRoute>
        }/>
      <Route
        path="/college/:id"
        element={
          <ProtectedRoute>
            <CollegePage />
          </ProtectedRoute>
        }/>
    </Routes>
  </BrowserRouter>
);

export default App;
