import React, { useState } from "react";
import API from "../api/axiosInstance";

const ReviewForm = ({ collegeId, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    comment: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const res = await API.post(`/reviews`, {
      title: formData.title,
      comment: formData.comment,
      rating: formData.rating,
      collegeId, // 
    });
    console.log("res",res)
    if (res.status === 201 || res.status === 200) {
      setSuccess(" Review added successfully!");
      setFormData({ title: "", comment: "", rating: 5 });
      if (onReviewAdded) onReviewAdded(); 
    } else {
      setError("Unexpected response from server.");
    }
  } catch (err) {
    console.error("Error adding review:", err);
    setError(err.response?.data?.error || "Error adding review.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ marginTop: "2rem", padding: "1rem", background: "#f9f9f9", borderRadius: "6px" }}>
      <h4>Add a Review</h4>
      {error && <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "0.5rem" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Review Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{
            display: "block",
            marginBottom: "0.5rem",
            width: "100%",
            padding: "0.4rem",
          }}
        />
        <textarea
          name="comment"
          placeholder="Your review..."
          value={formData.comment}
          onChange={handleChange}
          required
          style={{
            display: "block",
            marginBottom: "0.5rem",
            width: "100%",
            height: "80px",
            padding: "0.4rem",
          }}
        />
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
          style={{
            display: "block",
            marginBottom: "0.5rem",
            width: "100%",
            padding: "0.4rem",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Add Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
