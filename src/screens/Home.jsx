import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { useFireBase } from "../context/FireBaseContext";

export default function Home() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const firebase = useFireBase();

  const scrollableDivRef = useRef(null);

  const navigate = useNavigate();
  const getMessages = async () => {
    setLoading(true);
    if (!location?.state?.user) {
      navigate("/login");
    } else {
      try {
        let getMessages = await getDocs(collection(firebase.db, "messages"));
        getMessages = getMessages.docs.map((item) => {
          return {
            ...item.data(),
            isMe: item.data().userId === location.state.user.uid,
          };
        });
        getMessages = getMessages.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setUser(location.state.user);
        setMessages(getMessages);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const addMessage = async () => {
    try {
      const messageRef = message;
      setMessage("");
      setMessages([
        ...messages,
        {
          userId: user?.uid,
          message,
          isMe: true,
        },
      ]);
      console.log({
        userId: user?.uid,
        message: messageRef,
        date: Date.now(),
      });
      await addDoc(collection(firebase.db, "messages"), {
        userId: user?.uid,
        message: messageRef,
        date: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getMessages();
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      scrollableDivRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }, [scrollableDivRef.current]);
  if (loading) return <div>yüklenior...</div>;
  return (
    <div className="home-container">
      <ul className="messages-container">
        {messages.map((item, key) => (
          <li key={key} className={`${item?.isMe ? "me" : ""}`}>
            <span>{item?.userId?.slice(0, 3)}</span>
            <p>{item.message}</p>
          </li>
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={scrollableDivRef}
        ></div>
      </ul>
      <div className="messages-input">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Mesaj yaz"
        />
        <button onClick={addMessage}>Gönder</button>
      </div>
    </div>
  );
}
