import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

 function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

 function useAuth() {
  return useContext(AuthContext);
}
export default { AuthProvider, useAuth };