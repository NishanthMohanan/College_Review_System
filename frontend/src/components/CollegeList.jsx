import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCollege, setNewCollege] = useState({ name: "", location: "", description: "" });
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const fetchColleges = async () => {
    try {
      const res = await API.get("/colleges");
      console.log(" Colleges fetched:", res.data);
      setColleges(res.data.colleges || []);
    } catch (err) {
      console.error(" Error fetching colleges:", err.response?.data || err.message);
      setError("Failed to load colleges. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleAddCollege = async (e) => {
    e.preventDefault();
    try {
      await API.post("/colleges", newCollege, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCollege({ name: "", location: "", description: "" });
      fetchColleges();
    } catch (err) {
      console.error(" Error adding college:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add college");
    }
  };


  const handleDeleteCollege = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) return;
    try {
      await API.delete(`/colleges/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchColleges();
    } catch (err) {
      console.error(" Error deleting college:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to delete college");
    }
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading colleges...</p>;
  if (error) return <p style={{ color: "red", padding: "1rem" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🎓 Available Colleges</h2>

  
      {user.role === "admin" && (
        <form
          onSubmit={handleAddCollege}
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="College Name"
            value={newCollege.name}
            onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newCollege.location}
            onChange={(e) => setNewCollege({ ...newCollege, location: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newCollege.description}
            onChange={(e) => setNewCollege({ ...newCollege, description: e.target.value })}
            required
          />
          <button type="submit" style={{ background: "#16a34a", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px" }}>
             Add College
          </button>
        </form>
      )}

    
      {colleges.length === 0 ? (
        <p>No colleges found.</p>
      ) : (
        colleges.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              margin: "0.5rem 0",
              padding: "0.8rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{c.name}</h3>
              <p>{c.location}</p>
              <p> ⭐{c.averageRating || "No reviews yet"}</p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => navigate(`/college/${c._id}`)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>

      
              {user.role === "admin" && (
                <button
                  onClick={() => handleDeleteCollege(c._id)}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CollegeList;
