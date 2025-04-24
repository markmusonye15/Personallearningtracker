import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

 function LoginPage() {
  const [username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState(null);
  const [deleteAccountName, setDeleteAccountName] = useState("");
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    navigate("/skills");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    login(password);
  }
const handleDeleteAccount = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:3001/users/${deleteAccountId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: deleteAccountName,
        password: deleteAccountPassword,
      }),
    });

    if (!res.ok) throw new Error("Failed to delete account");

    alert("Account deleted successfully");
    setDeleteAccount(false);
  } catch (error) {
    alert("Failed to delete account");
  }
}
  const handleDeleteAccountChange = (e) => {
    const { name, value } = e.target;
    if (name === "deleteAccountId") {
      setDeleteAccountId(value);
    } else if (name === "deleteAccountName") {
      setDeleteAccountName(value);
    } else if (name === "deleteAccountPassword") {
      setDeleteAccountPassword(value);
    }
  }
  const handleDeleteAccountSubmit = (e) => {
    e.preventDefault();
    setDeleteAccount(true);
  }
  const handleCancelDelete = () => {
    setDeleteAccount(false);
    setDeleteAccountId(null);
    setDeleteAccountName("");
    setDeleteAccountPassword("");
  }
  const handleDeleteAccountClick = () => {
    setDeleteAccount(true);
  }
  const handleDeleteAccountCancel = () => {
    setDeleteAccount(false);
  }
  const handleDeleteAccountConfirm = () => {
    setDeleteAccount(false);
    handleDeleteAccount();
  }
  return (
    <form onSubmit={handleSubmit} >
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
      <button type="button" onClick={handleDeleteAccountClick}>
        Delete Account
      </button>
      {deleteAccount && (
        <div>
          <h2>Delete Account</h2>
          <form onSubmit={handleDeleteAccountSubmit}>
            <input
              type="text"
              name="deleteAccountId"
              placeholder="User ID"
              value={deleteAccountId}
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
        </div>
      )}
      <button type="submit">Login</button>
    </form>
  );
}
export default LoginPage;