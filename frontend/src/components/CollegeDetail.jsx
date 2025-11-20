import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  const handleReviewAdded = () => {
    setRefreshTrigger((prev) => prev + 1); 
    fetchCollege();
  };

  const fetchCollege = async () => {
    try {
      const res = await API.get(`/colleges/${id}`);
      setCollege(res.data);
    } catch (err) {
      console.error("Error fetching college:", err);
      setError("Failed to load college details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollege();
  }, [id]);

  const fetchReviews = async () => {
    if (!id) return;
    setLoading(true);

    try {
      const res = await API.get(`/reviews/college/${id}?page=${page}&limit=5`);
      console.log("check",res)
      setReviews(res.data.reviews[0] || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  console.log("College_det",college,reviews)

  if (loading) return <p>Loading college details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleBack = () => {
    navigate("/colleges"); 
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "1rem" }}>
      <button
        onClick={handleBack}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Colleges
      </button>

      <h2 style={{ marginTop: "1rem" }}>{college.name}</h2>
      <p>{college.description}</p>
      <p>
        <strong>Location:</strong> {college.location}
      </p>
      <p><strong>Average Rating:</strong>{" "}{college.averageRating !== undefined? Number(college.averageRating).toFixed(1): "N/A"} ⭐</p>

      <ReviewForm collegeId={id} onReviewAdded={handleReviewAdded} />
      <ReviewList collegeId={id} refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default CollegeDetail;
