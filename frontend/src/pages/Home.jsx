import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
function Home() {
      const [msg, setMsg] = useState("");
      useEffect(() => {
      axios.get("/api/test").then(res => setMsg(res.data.message));
  }, []);
  return (
    <div>
        <h1>Welcome to Travel Website 🏝️</h1>
        <p>Backend says: {msg}</p>
    </div>
  )
}

export default Home
