import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("/api/test", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage("You are not authorized"));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
