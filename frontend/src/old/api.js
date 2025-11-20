const BASE_URL = "http://localhost:5000/api";

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  // Only send email and password for login
  const { email, password } = data;

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const getColleges = async () => {
  const res = await fetch(`${BASE_URL}/colleges`);
  return res.json();
};

export const getReviews = async (collegeId) => {
  const res = await fetch(`${BASE_URL}/reviews/college/${collegeId}`);
  return res.json();
};

export const createReview = async (token, data) => {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
