import React, { useEffect, useState } from "react";
import { getReviews, createReview } from "../api";

export default function Reviews({ token, college, setView }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ title: "", comment: "", rating: 5 });

  const loadReviews = async () => {
    const data = await getReviews(college._id);
    setReviews(data.reviews || []);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(token, { ...form, collegeId: college._id });
    loadReviews();
  };

  return (
    <div>
      <h2>Reviews for {college.name}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="comment" placeholder="Comment" onChange={handleChange} />
        <input name="rating" type="number" min="1" max="5" onChange={handleChange} />
        <button type="submit">Add Review</button>
      </form>
      <h3>All Reviews:</h3>
      {reviews.map((r) => (
        <div key={r._id}>
          <strong>{r.title}</strong> - {r.comment} ({r.rating}/5)
        </div>
      ))}
      <button onClick={() => setView("colleges")}>Back to Colleges</button>
    </div>
  );
}
