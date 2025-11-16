import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Travel Website 🏝️</h1>
      <p>Explore destinations and plan your trips easily.</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/register" style={{ marginRight: "20px" }}>
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
