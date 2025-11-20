import React, { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "auth/login" : "auth/register";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;
      console.log("payload",payload)

      const { data } = await API.post(`/${endpoint}`, payload);
      console.log("data",data)

     
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      
      navigate("/colleges");
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.response?.data?.error || "Failed try again");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                style={styles.input}
              />

              
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          {isLogin ? "No account?" : "Already registered?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "0.6rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  switchButton: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default LoginRegister;
