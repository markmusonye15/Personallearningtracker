import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

 function LoginPage() {
  const [username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/skills");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password. Please try again.");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="login-form" >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
  
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
export default LoginPage;