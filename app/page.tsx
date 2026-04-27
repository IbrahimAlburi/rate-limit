"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  
  const styles = `
    .container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #3d3f41;
    }

    .title {
      margin-bottom: 20px;
    }

    .button {
      padding: 12px 24px;
      font-size: 16px;
      color: white;
      background-color: #0070f3;
      border: none;
      border-radius: 8px;
    }

    .message {
      margin-top: 20px;
      font-size: 16px;
      color: #e7f300
    }
  `;

  const sendRequest = async () => {
    const res = await fetch("/api/test");
    const data = await res.json();
    setMessage(`${res.status}: ${data.message}`);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="container">
        <h1 className="title">Rate Limit Demo</h1>

        <button className="button" onClick={sendRequest}>
          Send Request
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}