import { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(()=>{
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null
  });
  const [registeredUsers, setRegisteredUsers] = useState(()=>{
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  }); // 🔐 Store "registered" users

  useEffect(()=>{
    localStorage.setItem('registeredUsers',JSON.stringify(registeredUsers),
    [registeredUsers])
  })

  const login = (username, password) => {
    const existingUser = registeredUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (existingUser) {
      setUser({ username });
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }

    return false;
  };

  const signup = (username, password) => {
    const exists = registeredUsers.find((u) => u.username === username);
    if (exists) return false; 

    setRegisteredUsers((prev) => [...prev, { username, password }]);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
