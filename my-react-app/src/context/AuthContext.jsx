// // src/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";

// // Define possible roles
// export const Roles = {
//   USER: "USER",
//   ADMIN: "ADMIN",
// };

// const AuthContext = createContext();

// // Provider wraps the app
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");
//     setIsAuthenticated(!!token);
//     setRole(storedRole);
//   }, []);

//   const login = (token, userRole) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", userRole);
//     setIsAuthenticated(true);
//     setRole(userRole);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setIsAuthenticated(false);
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export default AuthContext;


import React, { createContext, useContext, useEffect, useState } from "react";

export const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }

    setLoading(false);
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
