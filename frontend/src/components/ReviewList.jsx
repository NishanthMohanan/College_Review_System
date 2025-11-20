import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const ReviewList = ({ collegeId, refreshTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchReviews = async () => {
    if (!collegeId) return;
    setLoading(true);

    try {
      const res = await API.get(`/reviews/college/${collegeId}?page=${page}&limit=5`);
      setReviews(res.data.reviews || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [collegeId, page, refreshTrigger]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4>Reviews</h4>

      {loading && <p>Loading reviews...</p>}

      {!loading && reviews.length === 0 && <p>No reviews yet.</p>}

      {!loading &&
        reviews.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              margin: "0.5rem 0",
              padding: "0.8rem",
              background: "#f9f9f9",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <strong style={{ fontSize: "1rem" }}>{r.title}</strong>
            <p style={{ margin: "0.3rem 0" }}>{r.comment}</p>
            <small>
              ⭐ {r.rating} — {r.user?.name || "Anonymous"}
            </small>
          </div>
        ))}

      
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1 || loading}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "4px",
              cursor: page <= 1 || loading ? "not-allowed" : "pointer",
              background: page <= 1 ? "#ccc" : "#3b82f6",
              color: "white",
              border: "none",
            }}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages || loading}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "4px",
              cursor: page >= totalPages || loading ? "not-allowed" : "pointer",
              background: page >= totalPages ? "#ccc" : "#3b82f6",
              color: "white",
              border: "none",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
