import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Named export for Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user = { name, userID }

  const login = (userObj) => {
    // Expecting: { name: string, userID: string }
    setUser(userObj);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Named export for hook
export function useAuth() {
  return useContext(AuthContext);
}
