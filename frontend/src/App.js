import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Colleges from "./components/Colleges";
import Reviews from "./components/Reviews";

export default function App() {
  const [view, setView] = useState("login");
  const [token, setToken] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);

  return (
    <div>
      {view === "login" && <Login setToken={setToken} setView={setView} />}
      {view === "register" && <Register setView={setView} />}
      {view === "colleges" && <Colleges setSelectedCollege={setSelectedCollege} setView={setView} />}
      {view === "reviews" && <Reviews token={token} college={selectedCollege} setView={setView} />}
    </div>
  );
}
