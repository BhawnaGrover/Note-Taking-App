import React, { useState } from "react";
import "./signIn.css";
import user_icon from "../../components/Assets/person.png";
import email_icon from "../../components/Assets/email.png";
import password_icon from "../../components/Assets/password.png";

const SignIn = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://note-taking-backend-server.vercel.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup Successful");
        // You can redirect or perform other actions after successful signup
        window.location.href = "/";
      } else {
        alert(data.error || data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://note-taking-backend-server.vercel.app/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Login Successful");
        // You can redirect or perform other actions after successful login
        localStorage.setItem('x-auth-token', data.user.token);
        window.location.href = "/home";
      } else {
        alert(data.error || data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="header_login">
        <div className="text_login">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="submit_container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
      <form onSubmit={action === "Login" ? handleLogin : handleSignup} className="form-container">
        <div className="input">
          <img src={user_icon} alt=""></img>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {action === "Login" ? null : (
          <div className="input">
            <img src={email_icon} alt=""></img>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <img src={password_icon} alt=""></img>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {action === "Login" ? (
          <div className="forgot_password">
            Forgot Password? <span>Click Here!</span>
          </div>
        ) : null}
        <button className="login-btn" type="submit">
          {action}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
