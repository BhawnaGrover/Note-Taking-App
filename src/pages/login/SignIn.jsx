import React, { useState } from "react";
import "./signIn.css";
import user_icon from "../../components/Assets/person.png";
import email_icon from "../../components/Assets/email.png";
import password_icon from "../../components/Assets/password.png";
import { useNavigate } from "react-router-dom";
import auth from "../../components/auth/auth.js";
const SignIn = () => {
  const { http } = auth();
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitForm = () => {
    console.log(username + ' ' + email + ' ' + password);
    http.post('/auth/signup',{username:username,email:email,password:password}).then((res)=>{
        console.log(res.data);
    })
    // fetch("https://note-taking-backend-server.vercel.app/api/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({username:username,email:email,password:password}),
    // });
  };
  //   const navigate = useNavigate();

  //   const navigateHome = () => {
  //       navigate('/home');
  //   };
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
      <form onSubmit={submitForm}>
        <div className="input">
          <img src={user_icon} alt=""></img>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={email_icon} alt=""></img>
            <input
              type="email"
              placeholder="Email"
              required
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {action === "Login" ? (
          <div className="forgot_password">
            Forgot Password? <span>Click Here!</span>
          </div>
        ) : (
          <div></div>
        )}
        <button className="login-btn" type="submit" >
          {action}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
