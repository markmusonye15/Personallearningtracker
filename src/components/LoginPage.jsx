import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState(null);
  const [deleteAccountName, setDeleteAccountName] = useState("");
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    navigate("/skills");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/users/${deleteAccountId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: deleteAccountName,
            password: deleteAccountPassword,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to delete account");

      alert("Account deleted successfully");
      setDeleteAccount(false);
      resetDeleteAccountForm();
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  const handleDeleteAccountChange = (e) => {
    const { name, value } = e.target;
    if (name === "deleteAccountId") setDeleteAccountId(value);
    if (name === "deleteAccountName") setDeleteAccountName(value);
    if (name === "deleteAccountPassword") setDeleteAccountPassword(value);
  };

  const handleCancelDelete = () => {
    setDeleteAccount(false);
    resetDeleteAccountForm();
  };

  const resetDeleteAccountForm = () => {
    setDeleteAccountId(null);
    setDeleteAccountName("");
    setDeleteAccountPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupUsername,
          password: signupPassword,
        }),
      });

      if (!res.ok) throw new Error("Failed to create account");

      alert("Account created successfully! You can now log in.");
      setShowSignup(false);
      setSignupUsername("");
      setSignupPassword("");
    } catch (error) {
      alert("Failed to create account");
    }
  };

  return (
    <div>
      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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

      {/* Create Account Button */}
      {!showSignup && (
        <button type="button" onClick={() => setShowSignup(true)}>
          Create Account
        </button>
      )}

      {/* Signup Form */}
      {showSignup && (
        <form onSubmit={handleSignup}>
          <h2>Create Account</h2>
          <input
            type="text"
            placeholder="New Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <button type="button" onClick={() => setShowSignup(false)}>
            Cancel
          </button>
        </form>
      )}

      {/* Delete Account Button */}
      <button type="button" onClick={() => setDeleteAccount(true)}>
        Delete Account
      </button>

      {/* Delete Account Form */}
      {deleteAccount && (
        <form onSubmit={handleDeleteAccount}>
          <h2>Delete Account</h2>
          <input
            type="text"
            name="deleteAccountId"
            placeholder="User ID"
            value={deleteAccountId || ""}
            onChange={handleDeleteAccountChange}
            required
          />
          <input
            type="text"
            name="deleteAccountName"
            placeholder="Username"
            value={deleteAccountName}
            onChange={handleDeleteAccountChange}
            required
          />
          <input
            type="password"
            name="deleteAccountPassword"
            placeholder="Password"
            value={deleteAccountPassword}
            onChange={handleDeleteAccountChange}
            required
          />
          <button type="submit">Confirm Delete</button>
          <button type="button" onClick={handleCancelDelete}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;
