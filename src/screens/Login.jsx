import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFireBase } from "../context/FireBaseContext";

import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const firebase = useFireBase();

  const onLoginClick = async () => {
    try {
      let response = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      response = JSON.parse(JSON.stringify(response));
      navigate("/", { state: { user: response.user } });

      console.log(response);
    } catch (error) {
      setError(true);
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {error && <div>Hata</div>}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Şifre"
        />
        <button onClick={onLoginClick}>Giriş</button>
      </div>
    </div>
  );
}
