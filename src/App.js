import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";

import { initializeAuth, getAuth } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { FireBaseProvider } from "./context/FireBaseContext";
import React, { useState } from "react";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyA177efoCcdX_mJ7y5ybkslFaCs24wsGdA",
    authDomain: "chat-project-9b158.firebaseapp.com",
    projectId: "chat-project-9b158",
    storageBucket: "chat-project-9b158.appspot.com",
    messagingSenderId: "807719644379",
    appId: "1:807719644379:web:2cb45cc81be3dbad5970fe",
    measurementId: "G-5WS6SC4PZH",
  };

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth() ? getAuth() : initializeAuth(app);
  const db = getFirestore(app);

  return (
    <FireBaseProvider db={db} app={app} auth={auth}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </FireBaseProvider>
  );
}

export default App;
