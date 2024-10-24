import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { FaArrowAltCircleRight } from "react-icons/fa";


import "./index.css"

const socket = io("https://threew-backend-assignment-chat-app.onrender.com");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  
    socket.on("message", (msg) => {
      console.log("Received message from server:", msg); 
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);
  

  const sendMessage = () => {
      socket.emit("message", message);
      setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.length > 0 ? 
            messages.map((msg, index) => (
                <p className="message" key={index}>{msg}</p>
            )):(<p className="no-message">No messages yet</p>)}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button className="btn" onClick={sendMessage}>
          <FaArrowAltCircleRight className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
