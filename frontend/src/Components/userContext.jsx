import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create UserContext (only user data will be fetched here)
const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {   //  here children is <App.jsx/> which we wrapped in main.jsx
  // userProvider is a wrapper component that will provide user data to all components inside it.

  const [user, setUser] = useState("Loading..."); // Store user info
  const [userId, setUserId] = useState(null)
  

  
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user", {
        withCredentials: true,
      });
      setUser(res.data.name)
      setUserId(res.data.id)
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use UserContext
export const useUser = () => useContext(UserContext);
