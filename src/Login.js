import React from "react";
import "./Login.css";
import { auth, google } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

export default function Login() {
  const dispatch = useDispatch("");

  const Login = () => {
    auth
      .signInWithPopup(google)
      .then((data) => {
        dispatch(login({ data }));
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://seeklogo.com/images/D/discord-logo-134E148657-seeklogo.com.png"
          alt="logo"
        />
        <button className="login-btn" onClick={Login}>
          Login
        </button>
      </div>
    </div>
  );
}
