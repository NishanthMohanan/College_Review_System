import React, { useEffect, useState } from "react";
import { getColleges } from "../api";

export default function Colleges({ setSelectedCollege, setView }) {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    getColleges().then((data) => setColleges(data.colleges || []));
  }, []);

  return (
    <div>
      <h2>Colleges</h2>
      {colleges.map((c) => (
        <div key={c._id}>
          <h3>{c.name}</h3>
          <p>{c.description}</p>
          <button onClick={() => { setSelectedCollege(c); setView("reviews"); }}>View Reviews</button>
        </div>
      ))}
    </div>
  );
}
