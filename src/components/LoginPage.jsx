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

  //  LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/users`);
      const users = await res.json();
      const user = users.find(
        (u) => u.name === username && u.password === password
      );

      if (!user) {
        alert("Invalid username or password");
        return;
      }

      login(username); // store username or you can extend to store userID
      navigate("/skills");
    } catch (err) {
      alert("Login failed");
    }
  };

  //  DELETE ACCOUNT HANDLERS
  const handleDeleteAccountChange = (e) => {
    const { name, value } = e.target;
    if (name === "deleteAccountId") setDeleteAccountId(value);
    if (name === "deleteAccountName") setDeleteAccountName(value);
    if (name === "deleteAccountPassword") setDeleteAccountPassword(value);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/users/${deleteAccountId}`);
      const user = await res.json();

      if (
        user.name !== deleteAccountName ||
        user.password !== deleteAccountPassword
      ) {
        alert("Credentials do not match");
        return;
      }

      const deleteRes = await fetch(
        `http://localhost:3000/users/${deleteAccountId}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteRes.ok) throw new Error("Failed to delete");

      alert("Account deleted successfully");
      setDeleteAccount(false);
      resetDeleteAccountForm();
    } catch (err) {
      alert("Failed to delete account");
    }
  };

  const resetDeleteAccountForm = () => {
    setDeleteAccountId(null);
    setDeleteAccountName("");
    setDeleteAccountPassword("");
  };

  //  SIGNUP HANDLER
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const resUsers = await fetch("http://localhost:3000/users");
      const users = await resUsers.json();

      const nameTaken = users.some((u) => u.name === signupUsername);
      if (nameTaken) {
        alert("Username already taken");
        return;
      }

      const maxId = users.reduce(
        (max, user) => Math.max(max, Number(user.userID)),
        0
      );

      const newUser = {
        userID: String(maxId + 1),
        name: signupUsername,
        password: signupPassword,
      };

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Signup failed");

      alert("Account created successfully! You can now log in.");
      setShowSignup(false);
      setSignupUsername("");
      setSignupPassword("");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      {/* LOGIN FORM */}
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* CREATE ACCOUNT SECTION */}
      {!showSignup && (
        <button type="button" onClick={() => setShowSignup(true)}>
          Create Account
        </button>
      )}

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

      {/* DELETE ACCOUNT SECTION */}
      <button type="button" onClick={() => setDeleteAccount(true)}>
        Delete Account
      </button>

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
          <button type="button" onClick={() => setDeleteAccount(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;
